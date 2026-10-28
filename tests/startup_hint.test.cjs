const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../web/app.js"), "utf8");
const declarations = [...source.matchAll(/^(?:async )?function (\w+)\(/gm)];

function fixture({ enabled = false, geolocation = true, toggle = true } = {}) {
  const notices = [], frames = [], timers = [];
  let overlay = null;
  const context = vm.createContext({
    els: { currentLocationToggle: toggle ? {} : null },
    navigator: { geolocation: geolocation ? {} : undefined },
    localStorage: { getItem: () => enabled ? "true" : null },
    CURRENT_LOCATION_ENABLED_KEY: "location",
    document: {
      querySelector(selector) {
        if (selector === "#startup-location-permission-overlay") return overlay;
        if (selector === ".fault-mode-switch-notice") return notices.find(notice => !notice.removed) || null;
        throw new Error(`Unexpected selector: ${selector}`);
      },
      createElement() {
        const classes = new Set();
        return { classes, classList: {
          add: name => classes.add(name), remove: name => classes.delete(name),
          toggle: (name, selected) => selected ? classes.add(name) : classes.delete(name),
        }, setAttribute() {}, remove() { this.removed = true; } };
      },
      body: { append: notice => notices.push(notice) },
    },
    requestAnimationFrame: callback => frames.push(callback),
    window: { setTimeout: (callback, duration) => { timers.push({ callback, duration }); return timers.length; } },
  });
  const initializer = source.match(/let startupLocationPromptPending = Boolean\([\s\S]*?\n\);/);
  assert.ok(initializer);
  vm.runInContext("let startupFaultModeHintShown = false;\n" + initializer[0], context);
  for (const name of ["showFaultModeSwitchNotice", "showStartupFaultModeHint",
    "finishStartupLocationPromptCheck", "closeStartupLocationPermissionPrompt"]) {
    const index = declarations.findIndex(match => match[1] === name);
    assert.ok(index >= 0);
    vm.runInContext(source.slice(declarations[index].index, declarations[index + 1].index), context);
  }
  return { context, notices, frames, timers,
    openPrompt() { overlay = { remove() { overlay = null; } }; },
  };
}

test("a pending location prompt defers the startup hint before the permission query finishes", () => {
  const f = fixture();
  f.context.showStartupFaultModeHint();
  assert.equal(f.notices.length, 0);
  assert.equal(f.frames.length, 0);
  assert.equal(f.timers.length, 0);
});

test("the hint starts only after the location popup closes, with its full three-second visible lifetime", () => {
  const f = fixture();
  f.context.showStartupFaultModeHint();
  f.openPrompt();
  f.context.finishStartupLocationPromptCheck();
  assert.equal(f.notices.length, 0, "Finishing the check must not run the timer behind the popup");
  f.context.closeStartupLocationPermissionPrompt();
  assert.equal(f.notices.length, 1);
  assert.equal(f.timers.length, 0, "The countdown starts when the next frame reveals the notice");
  f.frames.shift()();
  assert.equal(f.notices[0].classes.has("is-visible"), true);
  assert.equal(f.timers[0].duration, 3000);
  f.timers[0].callback();
  assert.equal(f.notices[0].classes.has("is-visible"), false);
  assert.equal(f.timers[1].duration, 220);
});

test("without a location popup the hint is available immediately at startup", () => {
  for (const options of [{ enabled: true }, { geolocation: false }, { toggle: false }]) {
    const f = fixture(options);
    f.context.showStartupFaultModeHint();
    assert.equal(f.notices.length, 1);
    assert.equal(f.frames.length, 1);
  }
});

test("an unexpected permission restore failure without a popup releases the pending hint", () => {
  const f = fixture();
  f.context.showStartupFaultModeHint();
  f.context.finishStartupLocationPromptCheck();
  assert.equal(f.notices.length, 1);
});

test("closing a nonexistent popup cannot prematurely consume a pending hint", () => {
  const f = fixture();
  f.context.closeStartupLocationPermissionPrompt();
  f.context.showStartupFaultModeHint();
  assert.equal(f.notices.length, 0);
});

test("repeated permission refreshes and close calls do not restart the startup hint", () => {
  const f = fixture();
  f.openPrompt();
  f.context.closeStartupLocationPermissionPrompt();
  f.context.finishStartupLocationPromptCheck();
  f.context.closeStartupLocationPermissionPrompt();
  f.context.showStartupFaultModeHint();
  assert.equal(f.notices.length, 1);
  assert.equal(f.frames.length, 1);
});
