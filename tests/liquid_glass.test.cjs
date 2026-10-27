const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../web/liquid-glass.js"), "utf8");

function fixture({ reduced = false, blocked = false, hidden = false } = {}) {
  let selected = 0, activations = 0, now = 0, id = 0;
  const frames = new Map(), listeners = new Map(), captures = new Set();
  const classes = new Set();
  const buttons = Array.from({ length: 3 }, (_, index) => ({
    offsetLeft: 5 + index * 100,
    get offsetWidth() { return hidden ? 0 : 94; },
    closest: () => buttons[index],
    click() { activations++; if (!blocked) selected = index; },
  }));
  let lens;
  const container = {
    clientLeft: 1,
    classList: { add: (...items) => items.forEach((item) => classes.add(item)),
      remove: (...items) => items.forEach((item) => classes.delete(item)) },
    querySelectorAll: () => buttons,
    prepend: (element) => { lens = element; },
    getBoundingClientRect: () => ({ left: 10, top: 100, bottom: 160, width: hidden ? 0 : 300 }),
    addEventListener(type, callback, options) {
      const list = listeners.get(type) || [];
      list.push({ callback, capture: options === true });
      listeners.set(type, list);
    },
    setPointerCapture: (pointerId) => captures.add(pointerId),
    hasPointerCapture: (pointerId) => captures.has(pointerId),
    releasePointerCapture: (pointerId) => captures.delete(pointerId),
  };
  const context = vm.createContext({
    window: {}, document: { createElement: () => ({ style: {}, setAttribute() {} }) },
    matchMedia: () => ({ matches: reduced, addEventListener() {} }),
    performance: { now: () => now },
    requestAnimationFrame(callback) { frames.set(++id, callback); return id; },
    cancelAnimationFrame: (key) => frames.delete(key),
    setTimeout: () => ++id, clearTimeout() {},
    ResizeObserver: class { observe() {} }, MutationObserver: class { observe() {} },
  });
  vm.runInContext(source, context);
  const controller = context.window.setupLiquidGlassSelector(container, {
    buttonSelector: ".tab", lensClass: "lens", isSelected: (_, index) => selected === index,
  });
  const dispatch = (type, values = {}) => {
    const event = { target: buttons[0], isPrimary: true, button: 0, pointerId: 1,
      clientX: 63, clientY: 130, timeStamp: now, deltaX: 0, deltaY: 0, deltaMode: 0,
      detail: 1, isTrusted: true, prevented: false, stopped: false,
      preventDefault() { this.prevented = true; },
      stopImmediatePropagation() { this.stopped = true; }, ...values };
    const handlers = [...(listeners.get(type) || [])].sort((a, b) => b.capture - a.capture);
    for (const { callback } of handlers) { callback(event); if (event.stopped) break; }
    return event;
  };
  const settle = () => {
    for (let count = 0; frames.size && count < 200; count++) {
      now += 1000 / 60;
      const pending = [...frames.values()]; frames.clear();
      pending.forEach((callback) => callback(now));
    }
    assert.equal(frames.size, 0, "The spring must stop scheduling frames after it settles");
  };
  return { dispatch, settle, controller, buttons, captures,
    get selected() { return selected; }, get activations() { return activations; },
    get transform() { return lens.style.transform; }, get width() { return lens.style.width; },
    advance: (time) => { now += time; }, reveal: () => { hidden = false; controller.measure(); } };
}

test("scrubbing follows the finger, commits once and suppresses the native follow-up click", () => {
  const f = fixture();
  f.dispatch("pointerdown");
  f.dispatch("pointermove", { clientX: 263 });
  f.settle();
  assert.match(f.transform, /translate3d\(205px/);
  assert.equal(f.selected, 0, "Previewing must not navigate through intermediate menus");
  f.dispatch("pointerup", { clientX: 263 });
  f.dispatch("lostpointercapture", { clientX: 263 });
  assert.equal(f.selected, 2);
  assert.equal(f.activations, 1);
  assert.equal(f.dispatch("click").prevented, true);
  assert.equal(f.captures.size, 0);
});

test("vertical scrolling does not select a menu and a subsequent tap is still usable", () => {
  const f = fixture();
  f.dispatch("pointerdown");
  f.dispatch("pointermove", { clientX: 65, clientY: 170 });
  f.dispatch("pointerup", { clientX: 65, clientY: 170 });
  assert.equal(f.selected, 0);
  assert.equal(f.dispatch("click").prevented, true);
  f.dispatch("pointerdown", { target: f.buttons[1], clientX: 163 });
  f.dispatch("pointerup", { target: f.buttons[1], clientX: 163 });
  assert.equal(f.dispatch("click", { target: f.buttons[1] }).prevented, false);
});

test("cancelled and guarded navigation returns the lens to the accepted selection", () => {
  for (const blocked of [false, true]) {
    const f = fixture({ blocked });
    f.dispatch("pointerdown");
    f.dispatch("pointermove", { clientX: 263 });
    f.dispatch(blocked ? "pointerup" : "pointercancel", { clientX: 263 });
    f.settle();
    assert.equal(f.selected, 0);
    assert.match(f.transform, /translate3d\(5px/);
    assert.equal(f.captures.size, 0);
  }
});

test("a short fast flick advances while a slow scrub selects under the finger", () => {
  for (const [duration, expected] of [[50, 1], [500, 0]]) {
    const f = fixture();
    f.dispatch("pointerdown");
    f.advance(duration);
    f.dispatch("pointermove", { clientX: 93 });
    f.dispatch("pointerup", { clientX: 93 });
    assert.equal(f.selected, expected);
  }
});

test("horizontal wheel gestures switch tabs while vertical and pinch gestures remain native", () => {
  const f = fixture();
  assert.equal(f.dispatch("wheel", { deltaY: 80 }).prevented, false);
  assert.equal(f.dispatch("wheel", { deltaX: 80, ctrlKey: true }).prevented, false);
  assert.equal(f.dispatch("wheel", { deltaX: 60 }).prevented, true);
  assert.equal(f.selected, 1);
  f.dispatch("wheel", { deltaX: 60 });
  assert.equal(f.selected, 1, "Trackpad momentum must not immediately skip through menus");
  f.advance(300);
  f.dispatch("wheel", { deltaX: 60 });
  assert.equal(f.selected, 2);
});

test("hidden pages remeasure on reveal and reduced motion settles immediately", () => {
  const f = fixture({ hidden: true, reduced: true });
  assert.equal(f.width, undefined);
  f.reveal();
  assert.equal(f.width, "94px");
  f.dispatch("pointerdown");
  f.dispatch("pointermove", { clientX: 263 });
  f.dispatch("pointerup", { clientX: 263 });
  assert.equal(f.selected, 2);
  assert.match(f.transform, /translate3d\(205px/);
  f.settle();
});
