const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../web/app.js"), "utf8");
const start = source.indexOf("function bindMenuBackSwipe(");
const end = source.indexOf("\nfunction cancelMenuPageSlide(", start);
assert.ok(start >= 0 && end > start);

function fixture() {
  class Element {
    constructor(parent = null, interactive = false) {
      this.parent = parent;
      this.interactive = interactive;
      this.dataset = {};
      this.classes = new Set();
      this.listeners = new Map();
      this.captures = [];
      this.backCount = 0;
    }
    closest(selector) {
      for (let node = this; node; node = node.parent) {
        if (selector === "[data-menu-back-swipe]" ? node.dataset.menuBackSwipe === "true"
          : selector === ".hidden, .menu-page-sliding" ? node.classes.has("hidden") || node.classes.has("menu-page-sliding")
            : node.interactive) return node;
      }
      return null;
    }
    addEventListener(type, listener, capture = false) {
      if (!this.listeners.has(type)) this.listeners.set(type, []);
      this.listeners.get(type).push({ listener, capture });
    }
    querySelector(selector) { return selector === ".back" ? this.back : null; }
    setPointerCapture(id) { this.captures.push(id); }
  }
  function dispatch(target, type, values = {}) {
    const event = { target, isPrimary: true, pointerId: 1, button: 0, clientX: 30, clientY: 100,
      detail: 1, defaultPrevented: false, stopped: false,
      preventDefault() { this.defaultPrevented = true; },
      stopPropagation() { this.stopped = true; }, ...values };
    const chain = [];
    for (let node = target; node; node = node.parent) chain.push(node);
    for (const capture of [true, false]) {
      for (const node of capture ? [...chain].reverse() : chain) {
        for (const handler of node.listeners.get(type) || []) {
          if (handler.capture === capture) handler.listener(event);
        }
        if (event.stopped) return event;
      }
    }
    return event;
  }
  const context = vm.createContext({});
  vm.runInContext(source.slice(start, end), context);
  function page(parent = null) {
    const host = new Element(parent);
    host.back = new Element(host, true);
    host.back.click = () => dispatch(host.back, "click", { detail: 0 });
    host.back.addEventListener("click", () => { host.backCount++; });
    context.bindMenuBackSwipe(host, ".back");
    return host;
  }
  function rightSwipe(host) {
    const content = new Element(host);
    dispatch(content, "pointerdown");
    dispatch(content, "pointermove", { clientX: 85, clientY: 104 });
    dispatch(host, "pointerup", { clientX: 150, clientY: 110 });
  }
  return { context, Element, dispatch, page, rightSwipe };
}

test("left-to-right swipe invokes the current page's Back exactly once and captures only after horizontal intent", () => {
  const f = fixture();
  const page = f.page();
  const content = new f.Element(page);
  f.dispatch(content, "pointerdown");
  assert.deepEqual(page.captures, []);
  f.dispatch(content, "pointermove", { clientX: 100, clientY: 104 });
  assert.deepEqual(page.captures, [1]);
  f.dispatch(page, "pointerup", { clientX: 150, clientY: 110 });
  f.dispatch(page, "pointerup", { clientX: 150, clientY: 110 });
  assert.equal(page.backCount, 1);
});

test("nested administrator swipe returns one level instead of also closing the parent menu", () => {
  const f = fixture();
  const outer = f.page();
  const inner = f.page(outer);
  f.rightSwipe(inner);
  assert.equal(inner.backCount, 1);
  assert.equal(outer.backCount, 0);
});

test("vertical scrolling cannot turn into Back after the finger changes direction", () => {
  const f = fixture();
  const page = f.page();
  const content = new f.Element(page);
  f.dispatch(content, "pointerdown");
  const scroll = f.dispatch(content, "pointermove", { clientX: 32, clientY: 150 });
  f.dispatch(content, "pointerup", { clientX: 200, clientY: 150 });
  assert.equal(page.backCount, 0);
  assert.equal(scroll.defaultPrevented, false);
  assert.deepEqual(page.captures, []);
});

test("taps, opposite-direction swipes and diagonal movement leave the menu open", () => {
  for (const point of [{ clientX: 36, clientY: 104 }, { clientX: -80, clientY: 102 }, { clientX: 120, clientY: 190 }]) {
    const f = fixture();
    const page = f.page();
    const content = new f.Element(page);
    f.dispatch(content, "pointerdown");
    f.dispatch(content, "pointermove", point);
    f.dispatch(content, "pointerup", point);
    assert.equal(page.backCount, 0);
  }
});

test("inputs, buttons, links and other interactive targets retain their normal operations", () => {
  const f = fixture();
  const page = f.page();
  const control = new f.Element(page, true);
  f.dispatch(control, "pointerdown");
  f.dispatch(control, "pointermove", { clientX: 150 });
  f.dispatch(control, "pointerup", { clientX: 150 });
  const click = f.dispatch(control, "click");
  assert.equal(page.backCount, 0);
  assert.equal(click.defaultPrevented, false);
  assert.deepEqual(page.captures, []);
});

test("cancelled and non-primary pointers cannot navigate Back", () => {
  for (const cancellation of ["pointercancel", "secondary", "lostpointercapture"]) {
    const f = fixture();
    const page = f.page();
    const content = new f.Element(page);
    f.dispatch(content, "pointerdown");
    f.dispatch(content, "pointermove", { clientX: 100 });
    if (cancellation === "secondary") f.dispatch(content, "pointerdown", { isPrimary: false, pointerId: 2 });
    else f.dispatch(page, cancellation);
    f.dispatch(page, "pointerup", { clientX: 150 });
    assert.equal(page.backCount, 0);
  }
});

test("pointer capture transferred from a child does not discard the swipe", () => {
  const f = fixture();
  const page = f.page();
  const content = new f.Element(page);
  f.dispatch(content, "pointerdown");
  f.dispatch(content, "pointermove", { clientX: 100 });
  f.dispatch(content, "lostpointercapture");
  f.dispatch(page, "pointerup", { clientX: 150 });
  assert.equal(page.backCount, 1);
});

test("the native click following a swipe is suppressed, while a new tap and keyboard Back remain usable", () => {
  const f = fixture();
  const page = f.page();
  f.rightSwipe(page);
  const followup = f.dispatch(page, "click");
  assert.equal(followup.defaultPrevented, true);
  assert.equal(followup.stopped, true);
  assert.equal(page.backCount, 1);
  page.back.click();
  assert.equal(page.backCount, 2);
  f.dispatch(page.back, "pointerdown");
  const tap = f.dispatch(page.back, "click");
  assert.equal(tap.defaultPrevented, false);
  assert.equal(page.backCount, 3);
});

test("hidden, animating and inert pages cannot start a Back swipe", () => {
  for (const state of ["hidden", "menu-page-sliding", "inert"]) {
    const f = fixture();
    const page = f.page();
    if (state === "inert") page.inert = true;
    else page.classes.add(state);
    f.rightSwipe(page);
    assert.equal(page.backCount, 0);
  }
});

test("hiding an ancestor during a swipe cancels navigation on release", () => {
  const f = fixture();
  const outer = f.page();
  const page = f.page(outer);
  const content = new f.Element(page);
  f.dispatch(content, "pointerdown");
  f.dispatch(content, "pointermove", { clientX: 100 });
  outer.classes.add("hidden");
  f.dispatch(page, "pointerup", { clientX: 150 });
  assert.equal(page.backCount, 0);
});

test("rebinding a reused account screen does not duplicate the Back action", () => {
  const f = fixture();
  const page = f.page();
  f.context.bindMenuBackSwipe(page, ".back");
  f.rightSwipe(page);
  assert.equal(page.backCount, 1);
});
