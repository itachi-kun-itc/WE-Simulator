const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../web/app.js"), "utf8");
const declarations = [...source.matchAll(/^(?:async )?function (\w+)\(/gm)];

function fixture({ reducedMotion = false } = {}) {
  class Element {
    constructor(...classes) {
      const values = new Set(classes);
      this.classList = {
        add: (...names) => names.forEach(name => values.add(name)),
        remove: (...names) => names.forEach(name => values.delete(name)),
        contains: name => values.has(name),
      };
      this.children = [];
      this.scrollTop = 150;
      this.scrollLeft = 0;
      this.animations = [];
    }
    querySelectorAll(selector) {
      return this.children.filter(child => selector === "*" || child.classList.contains("menu-page-sliding"));
    }
    animate(frames, options) {
      const animation = { frames, options, cancelled: false,
        cancel() { this.cancelled = true; this.oncancel?.(); },
        finish() { this.onfinish?.(); },
      };
      this.animations.push(animation);
      return animation;
    }
    scrollTo({ top }) { this.scrollTop = top; }
  }
  const context = vm.createContext({ Element, menuPageTransitions: new WeakMap(),
    window: { matchMedia: () => ({ matches: reducedMotion }) } });
  for (const name of ["resetPageScrollPosition", "setMenuUnderlayCovered", "cancelMenuPageSlide", "slideMenuPage", "hidePageAndResetScroll",
    "closeCommunityAccountScreen"]) {
    const index = declarations.findIndex(match => match[1] === name);
    vm.runInContext(source.slice(declarations[index].index, declarations[index + 1].index), context);
  }
  return { context, Element };
}

test("a submenu enters from the left and releases its animation and compositing state", () => {
  const { context, Element } = fixture();
  const page = new Element();
  context.slideMenuPage(page);
  const animation = page.animations[0];
  assert.deepEqual(Array.from(animation.frames, frame => frame.translate), ["-100% 0", "0 0"]);
  assert.equal(page.classList.contains("menu-page-sliding"), true);
  animation.finish();
  assert.equal(animation.cancelled, true);
  assert.equal(context.menuPageTransitions.has(page), false);
  assert.equal(page.classList.contains("menu-page-sliding"), false);
});

test("Back exits to the left without resetting or hiding the page mid-animation", () => {
  const { context, Element } = fixture();
  const page = new Element();
  context.slideMenuPage(page, { back: true, onFinish: () => context.hidePageAndResetScroll(page) });
  const animation = page.animations[0];
  assert.deepEqual(Array.from(animation.frames, frame => frame.translate), ["0 0", "-100% 0"]);
  assert.equal(page.classList.contains("hidden"), false);
  assert.equal(page.scrollTop, 150);
  animation.finish();
  assert.equal(page.classList.contains("hidden"), true);
  assert.equal(page.scrollTop, 0);
});

test("reopening cancels the pending Back callback, even if its completion was already queued", () => {
  const { context, Element } = fixture();
  const page = new Element();
  context.slideMenuPage(page, { back: true, onFinish: () => context.hidePageAndResetScroll(page) });
  const previous = page.animations[0];
  const queuedFinish = previous.onfinish;
  context.slideMenuPage(page);
  queuedFinish();
  assert.equal(previous.cancelled, true);
  assert.equal(page.classList.contains("hidden"), false);
  assert.equal(context.menuPageTransitions.get(page), page.animations[1]);
});

test("switching tabs cancels animated descendants so they cannot complete later", () => {
  const { context, Element } = fixture();
  const root = new Element();
  const page = new Element();
  root.children.push(page);
  let completed = false;
  context.slideMenuPage(page, { onFinish: () => { completed = true; } });
  const queuedFinish = page.animations[0].onfinish;
  context.hidePageAndResetScroll(root);
  queuedFinish();
  assert.equal(completed, false);
  assert.equal(root.classList.contains("hidden"), true);
  assert.equal(page.classList.contains("menu-page-sliding"), false);
});

test("reduced motion completes the navigation immediately", () => {
  const { context, Element } = fixture({ reducedMotion: true });
  const page = new Element();
  let completed = false;
  context.slideMenuPage(page, { back: true, onFinish: () => { completed = true; } });
  assert.equal(completed, true);
  assert.equal(page.animations.length, 0);
});

test("account Back reveals the previous administrator menu before the exit animation completes", () => {
  const { context, Element } = fixture();
  const screen = new Element();
  const sheet = new Element("community-account-screen-open");
  const admin = new Element("admin-subpage-open");
  sheet.querySelector = () => screen;
  context.els = { settingsMenuSheet: sheet, settingsAdminPanel: admin };
  context.closeCommunityAccountScreen();
  assert.equal(sheet.classList.contains("community-account-screen-open"), false);
  assert.equal(admin.classList.contains("admin-subpage-open"), false);
  assert.equal(screen.classList.contains("hidden"), false);
  assert.equal(sheet.scrollTop, 150);
  screen.animations[0].finish();
  assert.equal(screen.classList.contains("hidden"), true);
});

test("settings details leave the menu scroll coordinates and Back reveals the existing menu immediately", () => {
  const { context, Element } = fixture();
  const sheet = new Element();
  const menu = new Element();
  const page = new Element("hidden");
  const button = { setAttribute() {} };
  sheet.append = child => { sheet.children.push(child); };
  sheet.querySelector = () => menu;
  context.els = { settingsMenuSheet: sheet };
  context.prepareSettingsDetailPanel = () => {};
  context.closeSettingsInlinePanels = () => {};
  const start = source.indexOf("  let activeSettingsDetailPanel = null;");
  const prepareStart = source.indexOf("  const prepareSettingsDetailPanel =", start);
  vm.runInContext(source.slice(start, prepareStart), context);
  const openStart = source.indexOf("  const openSettingsDetailPanel =", prepareStart);
  const openEnd = source.indexOf("\n  setSettingsRowLabels();", openStart);
  vm.runInContext(source.slice(openStart, openEnd), context);
  context.page = page;
  context.button = button;
  vm.runInContext("openSettingsDetailPanel(button, page, () => {}, 'Details')", context);
  assert.equal(sheet.children.includes(page), true);
  assert.equal(menu.scrollTop, 150);
  assert.equal(menu.inert, true);
  assert.equal(menu.classList.contains("menu-underlay-covered"), false);
  page.animations[0].finish();
  assert.equal(menu.classList.contains("menu-underlay-covered"), true);
  vm.runInContext("closeSettingsDetailPanel()", context);
  assert.equal(menu.classList.contains("menu-underlay-covered"), false);
  assert.equal(menu.inert, false);
  assert.equal(menu.classList.contains("hidden"), false);
  assert.equal(menu.scrollTop, 150);
  page.animations[1].finish();
  assert.equal(page.classList.contains("hidden"), true);
  assert.equal(sheet.classList.contains("settings-detail-open"), false);
});

test("menu descendants cannot escape above sibling detail pages with their positive z-index", () => {
  const css = fs.readFileSync(path.join(__dirname, "../web/interface-appearance.css"), "utf8");
  const group = css.match(/#settings-menu-sheet > \.settings-menu-list,\s*#info-full-panel > \.tool-home-page\s*\{([^}]+)\}/);
  assert.ok(group, "Both parent menus must establish their own stacking context");
  assert.match(group[1], /position:\s*relative\s*!important/);
  assert.match(group[1], /z-index:\s*0\s*!important/);
  assert.match(group[1], /isolation:\s*isolate\s*!important/);
});

test("covering a parent preserves its scroll, form values and selections without removing its layout", () => {
  const { context, Element } = fixture();
  const parent = new Element();
  const content = new Element();
  const form = new Element();
  form.value = "unfinished feedback";
  form.selectedIndex = 2;
  parent.children.push(content, form);
  context.setMenuUnderlayCovered(parent, true);
  assert.equal(parent.classList.contains("hidden"), false);
  assert.equal(parent.inert, true);
  assert.equal(parent.scrollTop, 150);
  assert.equal(content.scrollTop, 150);
  context.setMenuUnderlayCovered(parent, false);
  assert.equal(parent.inert, false);
  assert.equal(parent.scrollTop, 150);
  assert.equal(content.scrollTop, 150);
  assert.equal(form.value, "unfinished feedback");
  assert.equal(form.selectedIndex, 2);
});

test("submenu scroll bodies have a bounded height and the embedded admin overlay permits vertical touch", () => {
  const css = fs.readFileSync(path.join(__dirname, "../web/interface-appearance.css"), "utf8");
  const body = css.match(/#settings-menu-sheet \.settings-detail-panel > :is\([\s\S]*?\)\s*,[\s\S]*?#info-full-panel \.weather-quiz-content\s*\{([^}]+)\}/);
  assert.ok(body);
  assert.match(body[1], /height:\s*100%\s*!important/);
  assert.match(body[1], /min-height:\s*0\s*!important/);
  assert.match(body[1], /overflow-y:\s*auto\s*!important/);
  const admin = css.match(/#settings-menu-sheet #settings-admin-panel \.settings-admin-embedded,\s*#settings-menu-sheet #settings-admin-panel \.admin-mode-dialog\s*\{([^}]+)\}/);
  assert.ok(admin);
  assert.match(admin[1], /touch-action:\s*pan-y\s*!important/,
    "A child scrollport cannot restore panning blocked by the old overlay ancestor");
});

test("epicenter search exposes the map instead of the Tools home, and late loading cannot reopen it after Back", async () => {
  const { context, Element } = fixture();
  const info = new Element();
  const home = new Element();
  const station = new Element("hidden");
  const quiz = new Element("hidden");
  const history = new Element("hidden");
  const body = new Element();
  info.querySelector = selector => ({ "#tool-home-page": home, "#tool-station-page": station,
    "#tool-weather-quiz-page": quiz })[selector];
  let resolveAreas;
  const areas = new Promise(resolve => { resolveAreas = resolve; });
  const mapChanges = [];
  const noop = () => {};
  Object.assign(context, {
    els: { infoFullPanel: info, historyFullPanel: history, learningFullPanel: new Element("hidden") },
    document: { body }, ensureInfoToolShell: noop, closeEarthquakePresetPicker: noop,
    closeSettingsMenuSheet: noop, setSetupMenuOpen: noop, ensureToolPageHeader: noop,
    ensureHistoryFullPanel: () => history, renderPastEarthquakeStatsPanel: noop,
    loadLocalAreas: () => areas, loadEpicenterAreas: () => Promise.resolve(), console,
    setHistoryMapModeActive(active) {
      if (active) assert.equal(info.classList.contains("menu-underlay-covered"), true, "The opaque menu must not cover the map");
      mapChanges.push(active);
    },
  });
  const homeStart = source.indexOf("  const showInfoToolHome =");
  const homeEnd = source.indexOf("\n  const ensureToolPageHeader =", homeStart);
  vm.runInContext(source.slice(homeStart, homeEnd), context);
  const openStart = source.indexOf("  const openInfoSourceSearchPage =");
  const openEnd = source.indexOf("\n  const openInfoStationSearchPage =", openStart);
  vm.runInContext(source.slice(openStart, openEnd), context);
  vm.runInContext("openInfoSourceSearchPage()", context);
  assert.equal(info.classList.contains("menu-underlay-covered"), true);
  assert.equal(info.classList.contains("hidden"), false, "The parent must retain layout and scroll offsets");
  assert.equal(info.scrollTop, 150);
  assert.equal(history.classList.contains("hidden"), false);
  vm.runInContext("showInfoToolHome()", context);
  assert.equal(info.classList.contains("hidden"), false, "Back must reveal the previous screen immediately");
  assert.equal(info.classList.contains("menu-underlay-covered"), false);
  assert.equal(home.classList.contains("hidden"), false);
  history.animations.at(-1).finish();
  assert.equal(history.classList.contains("hidden"), true);
  resolveAreas();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(mapChanges, [true, false]);
});

test("administrator Back restores the scrolled menu before the nested page finishes exiting", () => {
  const { context, Element } = fixture();
  const menu = new Element();
  const adminPanel = new Element();
  const pages = ["notification", "maintenance"].map(id => {
    const page = new Element("hidden");
    page.dataset = { adminSectionPage: id };
    return page;
  });
  const button = page => ({ listeners: {},
    addEventListener(type, listener) { this.listeners[type] = listener; },
    closest() { return page; },
  });
  const rows = Object.fromEntries(["accounts", "notification", "maintenance"].map(id => [id, button()]));
  const backs = pages.map(button);
  menu.querySelector = selector => rows[selector.match(/"([^"]+)"/)[1]];
  adminPanel.querySelectorAll = selector => selector === ".admin-section-back" ? backs : pages;
  adminPanel.addEventListener = () => {};
  Object.assign(context, { menu, adminPanel, els: { settingsAdminPanel: new Element() },
    refreshAdminOverview() {}, openCommunityAccountScreen() {} });
  const start = source.indexOf("    const showMenu = () => {", source.indexOf("  const setupSettingsAdminMenu ="));
  const end = source.indexOf("\n    showMenu();", start) + "\n    showMenu();".length;
  vm.runInContext(source.slice(start, end), context);
  for (let index = 0; index < pages.length; index++) {
    menu.scrollTop = 430 + index * 50;
    rows[pages[index].dataset.adminSectionPage].listeners.click();
    pages[index].animations.at(-1).finish();
    assert.equal(menu.classList.contains("menu-underlay-covered"), true);
    assert.equal(menu.classList.contains("hidden"), false);
    backs[index].listeners.click();
    assert.equal(menu.classList.contains("menu-underlay-covered"), false);
    assert.equal(menu.scrollTop, 430 + index * 50);
    pages[index].animations.at(-1).finish();
    assert.equal(pages[index].classList.contains("hidden"), true);
    assert.equal(menu.scrollTop, 430 + index * 50);
  }
});
