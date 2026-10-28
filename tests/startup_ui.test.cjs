const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "../web/index.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "../web/styles.css"), "utf8");

test("the initial document places the single Start button inside the setup sheet", () => {
  const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "");
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  const stack = [];
  const buttons = [];
  for (const match of markup.matchAll(/<(\/)?([a-z][\w-]*)\b([^>]*)>/gi)) {
    const [, closing, tag, attributes] = match;
    if (closing) {
      assert.equal(stack.pop()?.tag, tag, `Unbalanced HTML near ${match[0]}`);
      continue;
    }
    const element = {
      tag,
      id: attributes.match(/\bid="([^"]*)"/)?.[1],
      classes: attributes.match(/\bclass="([^"]*)"/)?.[1].split(/\s+/) || [],
    };
    if (element.id === "simulation-start") buttons.push({ element, ancestors: [...stack] });
    if (!voidTags.has(tag) && !attributes.endsWith("/")) stack.push(element);
  }
  assert.equal(stack.length, 0);
  assert.equal(buttons.length, 1, "There must never be a second map-overlay Start button");
  assert.ok(buttons[0].element.classes.includes("sheet-simulation-start"));
  assert.ok(buttons[0].ancestors.some(element => element.id === "setup-panel"));
  assert.ok(buttons[0].ancestors.some(element => element.classes.includes("sim-panel-scroll")));
  assert.ok(buttons[0].ancestors.some(element => element.classes.includes("simulation-start-sheet-host")));
});

test("the Start button has no legacy play/stop pseudo-element during startup", () => {
  for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (rule[1].includes("#simulation-start") && /::(?:before|after)/.test(rule[1])) {
      assert.doesNotMatch(rule[2], /content\s*:\s*["']|border-left\s*:\s*\d+px/);
    }
  }
  assert.doesNotMatch(html, /class="bottom-tab-icon"[^>]*>[▶⌁]/);
});
