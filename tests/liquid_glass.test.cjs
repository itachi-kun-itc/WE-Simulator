const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../web/liquid-glass.js"), "utf8");

function fixture({ reduced = false, blocked = false, hidden = false, learning = false } = {}) {
  let selected = 0, activations = 0, now = 0, id = 0;
  const frames = new Map(), listeners = new Map(), captures = new Set();
  const classes = new Set();
  const buttons = Array.from({ length: learning ? 2 : 3 }, (_, index) => ({
    offsetLeft: 5 + index * 100,
    get offsetWidth() { return hidden ? 0 : 94; },
    closest: () => buttons[index],
    getAttribute: (name) => name === "aria-selected" ? String(selected === index) : null,
    click() { activations++; if (!blocked) selected = index; },
  }));
  let lens;
  const container = {
    clientLeft: 1,
    closest: () => null,
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
    buttonSelector: learning ? "[data-learning-category]" : ".tab", lensClass: "lens",
    isSelected: learning ? (button) => button.getAttribute("aria-selected") === "true"
      : (_, index) => selected === index,
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
  const nextFrame = () => {
    now += 1000 / 60;
    const pending = [...frames.values()]; frames.clear();
    pending.forEach((callback) => callback(now));
  };
  const settle = () => {
    for (let count = 0; frames.size && count < 200; count++) nextFrame();
    assert.equal(frames.size, 0, "The spring must stop scheduling frames after it settles");
  };
  return { dispatch, settle, nextFrame, controller, container, buttons, captures,
    get selected() { return selected; }, get activations() { return activations; },
    get transform() { return lens.style.transform; }, get width() { return lens.style.width; },
    get pendingFrames() { return frames.size; },
    advance: (time) => { now += time; }, reveal: () => { hidden = false; controller.measure(); } };
}

test("even a small drag follows the latest finger position in one animation frame", () => {
  const f = fixture();
  f.dispatch("pointerdown");
  for (const x of [67, 79, 133, 103, 213, 173]) {
    f.dispatch("pointermove", { clientX: x });
    f.nextFrame();
    const position = Number(f.transform.match(/translate3d\(([-\d.]+)px/)[1]);
    assert.equal(position, 5 + x - 63);
    assert.equal(f.pendingFrames, 0, "A stationary finger should not leave an idle animation loop");
  }
  assert.equal(f.activations, 0, "Dragging should preview without loading intermediate pages");
});

test("dragging preserves an off-centre grab instead of jumping to the finger's centre", () => {
  const f = fixture();
  f.dispatch("pointerdown", { clientX: 26 });
  f.dispatch("pointermove", { clientX: 126 });
  f.nextFrame();
  assert.match(f.transform, /translate3d\(105px/);
  f.dispatch("pointerup", { clientX: 126 });
  assert.equal(f.selected, 1);
});

test("touching during a selection animation does not snap the lens to its destination", () => {
  const f = fixture();
  f.dispatch("wheel", { deltaX: 60 });
  f.nextFrame();
  const inFlight = f.transform;
  assert.doesNotMatch(inFlight, /translate3d\(105px/);
  f.dispatch("pointerdown", { target: f.buttons[1], clientX: 163 });
  assert.equal(f.transform, inFlight);
  f.dispatch("pointermove", { clientX: 171 });
  f.nextFrame();
  assert.match(f.transform, /translate3d\(113px/);
  f.dispatch("pointerup", { clientX: 171 });
  f.settle();
  assert.match(f.transform, /translate3d\(105px/);
});

test("a drag can start in the gap between buttons", () => {
  const f = fixture();
  f.dispatch("pointerdown", { target: f.container, clientX: 112 });
  f.dispatch("pointermove", { target: f.container, clientX: 212 });
  f.nextFrame();
  assert.match(f.transform, /translate3d\(105px/);
  f.dispatch("pointerup", { clientX: 212 });
  assert.equal(f.selected, 1);
});

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

test("transferring touch capture from a button to the menu does not cancel selection", () => {
  const f = fixture();
  f.dispatch("pointerdown", { target: f.buttons[1], clientX: 163 });
  f.dispatch("pointermove", { target: f.buttons[1], clientX: 168 });
  // Touch buttons implicitly capture the pointer. Their capture-loss event
  // bubbles when the menu takes over a horizontal gesture.
  f.dispatch("lostpointercapture", { target: f.buttons[1], clientX: 168 });
  f.dispatch("pointerup", { target: f.container, clientX: 168 });
  f.settle();
  assert.equal(f.selected, 1);
  assert.equal(f.activations, 1);
  assert.match(f.transform, /translate3d\(105px/);
  assert.equal(f.dispatch("click", { target: f.container }).prevented, true);
});

test("minor pointer drift at a button edge still selects the pressed button once", () => {
  const f = fixture();
  f.dispatch("pointerdown", { target: f.buttons[1], clientX: 117 });
  f.dispatch("pointermove", { target: f.buttons[1], clientX: 112 });
  f.dispatch("pointerup", { target: f.container, clientX: 112 });
  f.settle();
  assert.equal(f.selected, 1);
  assert.equal(f.activations, 1);
  assert.match(f.transform, /translate3d\(105px/);
  assert.equal(f.dispatch("click", { target: f.container }).prevented, true);
});

test("losing the menu's own pointer capture cancels an unfinished drag", () => {
  const f = fixture();
  f.dispatch("pointerdown");
  f.dispatch("pointermove", { clientX: 263 });
  f.container.releasePointerCapture(1);
  f.dispatch("lostpointercapture", { target: f.container, clientX: 263 });
  f.dispatch("pointerup", { target: f.container, clientX: 263 });
  f.settle();
  assert.equal(f.selected, 0);
  assert.equal(f.activations, 0);
  assert.match(f.transform, /translate3d\(5px/);
  assert.equal(f.dispatch("click", { target: f.container }).prevented, true);
});

test("earthquake and weather selection survives capture handoff and small edge drift in both directions", () => {
  const f = fixture({ learning: true });
  // Start near each segment's inner edge, then drift across its boundary.
  for (const [index, downX, upX] of [[1, 117, 112], [0, 109, 114]]) {
    f.dispatch("pointerdown", { target: f.buttons[index], clientX: downX });
    f.dispatch("pointermove", { target: f.buttons[index], clientX: upX });
    f.dispatch("lostpointercapture", { target: f.buttons[index], clientX: upX });
    f.dispatch("pointerup", { target: f.container, clientX: upX });
    assert.equal(f.dispatch("click", { target: f.container }).prevented, true);
    f.settle();
    assert.equal(f.selected, index);
    assert.equal(f.buttons[index].getAttribute("aria-selected"), "true");
    assert.equal(f.buttons[1 - index].getAttribute("aria-selected"), "false");
    assert.ok(f.transform.startsWith(`translate3d(${5 + index * 100}px`));
  }
  assert.equal(f.activations, 2, "Each category change must commit exactly once");
});

test("earthquake and weather support dragging back and forth without reverting on release", () => {
  const f = fixture({ learning: true });
  for (const [index, downX, upX] of [[1, 63, 163], [0, 163, 63]]) {
    f.dispatch("pointerdown", { target: f.buttons[1 - index], clientX: downX });
    f.dispatch("pointermove", { clientX: upX });
    f.nextFrame();
    f.dispatch("lostpointercapture", { target: f.buttons[1 - index], clientX: upX });
    f.dispatch("pointerup", { target: f.container, clientX: upX });
    f.settle();
    assert.equal(f.selected, index);
    assert.ok(f.transform.startsWith(`translate3d(${5 + index * 100}px`));
  }
  assert.equal(f.activations, 2);
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
