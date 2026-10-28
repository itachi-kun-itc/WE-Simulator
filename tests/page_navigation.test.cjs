const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const app = fs.readFileSync(path.join(__dirname, "../web/app.js"), "utf8");
const declarations = [...app.matchAll(/^(?:async )?function (\w+)\(/gm)];

function fixture(activeTab = "bottom-settings-tab") {
  const events = [], frames = [];
  const classes = (...initial) => {
    const values = new Set(initial);
    return { add: (...items) => items.forEach(item => values.add(item)),
      remove: (...items) => items.forEach(item => values.delete(item)), contains: item => values.has(item) };
  };
  class Element {
    constructor(id, parent = null) {
      this.id = id;
      this.parent = parent;
      this.classList = classes();
      this.children = [];
      this.top = 40;
      this.left = 12;
      this.listeners = new Map();
    }
    get scrollTop() { return this.top; }
    set scrollTop(value) { this.recordReset(); this.top = value; }
    get scrollLeft() { return this.left; }
    set scrollLeft(value) { this.recordReset(); this.left = value; }
    recordReset() {
      const page = this.parent || this;
      events.push({ type: "reset", id: this.id, hidden: page.classList.contains("hidden") });
    }
    querySelectorAll() { return this.children; }
    addEventListener(type, listener) { this.listeners.set(type, listener); }
  }
  const owners = new Map([
    ["bottom-settings-tab", "settings-menu-sheet"], ["bottom-history-tab", "history-full-panel"],
    ["bottom-info-tab", "info-full-panel"], ["bottom-learning-tab", "learning-full-panel"],
  ]);
  const pages = [...owners.values()].map(id => new Element(id));
  for (const page of pages) {
    page.children.push(new Element(`${page.id}-scroller`, page));
    if (page.id !== owners.get(activeTab)) page.classList.add("hidden");
  }
  const tabs = ["earthquake-tab", ...owners.keys()].map(id => Object.assign(new Element(id), {
    dataset: id === "earthquake-tab" ? { panel: "earthquake-panel" } : {},
  }));
  const earthquakePanel = new Element("earthquake-panel");
  const setupPanel = new Element("setup-panel");
  const dataset = {};
  let currentTab = activeTab;
  Object.defineProperty(dataset, "activeBottomTab", {
    get: () => currentTab,
    set(next) {
      if (next !== currentTab) {
        assert.ok(pages.every(page => page.classList.contains("hidden")), "Every outgoing page must be hidden before the new tab becomes active");
      }
      events.push({ type: "activate", next });
      currentTab = next;
    },
  });
  const noop = () => {};
  const context = vm.createContext({
    Element, menuPageTransitions: new WeakMap(), document: {
      body: { dataset, classList: classes() },
      querySelector(selector) { return [...pages, ...tabs, earthquakePanel, setupPanel].find(item => `#${item.id}` === selector); },
      querySelectorAll(selector) { return selector === ".tab" ? tabs : selector === ".panel" ? [earthquakePanel] : pages; },
    },
    state: { simulationRunning: false, simulationCompleted: false },
    els: { setupPanel, settingsMenuSheet: pages[0] }, map: {},
    requestAnimationFrame: callback => frames.push(callback),
    resetBottomTabScrollPosition: noop, closeCommunityPostOverlay: noop, resetCommunityPostScrollPosition: noop,
    stopSimulation: noop, resetSimulationMenuState: noop, resetHistoryTabState: noop, setCommunityMapModeActive: noop,
    closeCommunityAccountRequiredPanel: noop, resetInfoTabState: noop, updateSimulationFaultSource: noop,
    closeMapLayerControlPanel: noop, closeEarthquakePresetPicker: noop, closeFullPanels: noop,
    ensureSimulationStartInsideSheet: noop, setSheetState: noop, activateSettingsTab: noop, setSetupMenuOpen: noop,
  });
  for (const name of ["resetPageScrollPosition", "cancelMenuPageSlide", "hidePageAndResetScroll", "hideBottomTabPages"]) {
    const index = declarations.findIndex(match => match[1] === name);
    assert.ok(index >= 0, `Missing ${name}`);
    vm.runInContext(app.slice(declarations[index].index, declarations[index + 1].index), context);
  }
  const start = app.indexOf("  const setActiveBottomTab = (selector) => {");
  const end = app.indexOf("\n  document.body.dataset.activeBottomTab =", start);
  assert.ok(start >= 0 && end > start);
  vm.runInContext(app.slice(start, end), context);
  return { context, pages, tabs, owners, events, frames,
    activate: selector => vm.runInContext(`setActiveBottomTab(${JSON.stringify(selector)})`, context) };
}

test("all bottom-tab transitions hide the outgoing page before activating the destination", () => {
  const tabIds = ["earthquake-tab", "bottom-history-tab", "bottom-info-tab", "bottom-learning-tab", "bottom-settings-tab"];
  for (const previous of tabIds) for (const next of tabIds) {
    if (previous === next) continue;
    const f = fixture(previous);
    f.activate(`#${next}`);
    const incoming = f.pages.find(page => page.id === f.owners.get(next));
    incoming?.classList.remove("hidden");
    assert.equal(f.pages.filter(page => !page.classList.contains("hidden")).length, incoming ? 1 : 0);
    assert.ok(f.events.filter(event => event.type === "reset").every(event => event.hidden));
    assert.equal(f.context.document.body.dataset.activeBottomTab, next);
  }
});

test("reselecting the current bottom tab does not blank its page", () => {
  const f = fixture("bottom-learning-tab");
  f.activate("#bottom-learning-tab");
  assert.equal(f.pages.find(page => page.id === "learning-full-panel").classList.contains("hidden"), false);
  assert.equal(f.events.some(event => event.type === "reset"), false);
});

test("the simulation-tab event handler also removes the outgoing menu before changing tabs", () => {
  const f = fixture("bottom-settings-tab");
  const start = app.indexOf('  document.querySelectorAll(".tab").forEach((tab) => {');
  const end = app.indexOf('\n  document.querySelector("#bottom-history-tab")?.addEventListener', start);
  assert.ok(start >= 0 && end > start);
  vm.runInContext(app.slice(start, end), f.context);
  f.tabs.find(tab => tab.id === "earthquake-tab").listeners.get("click")();
  assert.equal(f.context.document.body.dataset.activeBottomTab, "earthquake-tab");
  assert.ok(f.pages.every(page => page.classList.contains("hidden")));
  assert.ok(f.events.filter(event => event.type === "reset").every(event => event.hidden));
});
