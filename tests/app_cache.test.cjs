const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const swSource = fs.readFileSync(path.join(root, "web/sw.js"), "utf8");

function worker() {
  const handlers = new Map();
  const stores = new Map();
  const requests = [];
  const scope = "https://example.com/WE-Simulator/";
  const keyOf = (request) => new URL(request.url || request, scope).href;
  const cache = (name) => {
    if (!stores.has(name)) stores.set(name, new Map());
    const entries = stores.get(name);
    return {
      addAll: async (items) => { requests.push(...items); },
      put: async (request, response) => { entries.set(keyOf(request), response); },
      match: async (request) => entries.get(keyOf(request)),
    };
  };
  const context = vm.createContext({
    URL, Request, Response, console,
    self: {
      location: new URL(`${scope}sw.js`),
      registration: { scope },
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
      addEventListener: (type, handler) => handlers.set(type, handler),
    },
    caches: {
      open: async (name) => cache(name),
      keys: async () => [...stores.keys()],
      delete: async (name) => stores.delete(name),
    },
    fetch: async () => { throw new Error("offline"); },
  });
  vm.runInContext(swSource, context);
  const cacheName = vm.runInContext("CACHE_NAME", context);
  async function dispatch(type, request) {
    const pending = [];
    let response;
    handlers.get(type)({
      request,
      waitUntil: (promise) => pending.push(promise),
      respondWith: (promise) => { response = promise; },
    });
    const result = await response;
    await Promise.all(pending);
    return result;
  }
  return { context, stores, cache, cacheName, dispatch, requests, scope };
}

test("UI requests revalidate the HTTP cache and persist the fresh response", async () => {
  const w = worker();
  const request = new Request(`${w.scope}styles.css?v=current`);
  w.context.fetch = async (received, options) => {
    assert.equal(received, request);
    assert.equal(options.cache, "no-cache");
    return new Response("new UI");
  };
  const response = await w.dispatch("fetch", request);
  assert.equal(await response.text(), "new UI");
  assert.equal(await (await w.cache(w.cacheName).match(request)).text(), "new UI");
});

test("offline navigation with shared parameters falls back to the current cached index", async () => {
  const w = worker();
  await w.cache(w.cacheName).put(`${w.scope}index.html`, new Response("offline app"));
  const response = await w.dispatch("fetch", {
    url: `${w.scope}?scenario=shared`, mode: "navigate", method: "GET", headers: new Headers(),
  });
  assert.equal(await response.text(), "offline app");
});

test("offline assets never fall back to another app's stale cache", async () => {
  const w = worker();
  const request = new Request(`${w.scope}app.js?v=new`);
  await w.cache("other-app").put(request, new Response("stale"));
  assert.equal((await w.dispatch("fetch", request)).status, 503);
});

test("activation only removes old UI caches and preserves notifications and datasets", async () => {
  const w = worker();
  const preserved = [w.cacheName, "we-simulator-push-metadata", "we-simulator-earthquake-presets-v1", "other-app"];
  [...preserved, "we-simulator-pwa-old"].forEach(w.cache);
  await w.dispatch("activate");
  assert.deepEqual([...w.stores.keys()], preserved);
});

test("installation bypasses stale HTTP assets; range requests bypass the worker", async () => {
  const w = worker();
  await w.dispatch("install");
  assert.ok(w.requests.length > 0);
  assert.ok(w.requests.every((request) => request.cache === "reload"));
  assert.equal(await w.dispatch("fetch", new Request(`${w.scope}map/japan.pmtiles`)), undefined);
  assert.equal(await w.dispatch("fetch", new Request(`${w.scope}data.bin`, { headers: { Range: "bytes=0-15" } })), undefined);
});

test("version injection is stable, covers all UI assets, and invalidates on CSS changes", () => {
  const files = new Map();
  const read = (file, encoding) => {
    const value = files.has(file) ? files.get(file) : fs.readFileSync(file);
    return encoding ? value.toString() : Buffer.from(value);
  };
  const run = (env = {}) => vm.runInNewContext(fs.readFileSync(path.join(root, "scripts/inject_version.js"), "utf8"), {
    __dirname: path.join(root, "scripts"),
    require: (name) => name === "fs" ? {
      existsSync: fs.existsSync, readFileSync: read,
      writeFileSync: (file, value) => files.set(file, Buffer.from(value)),
    } : require(name),
    process: { env, exit: () => assert.fail("injection exited") },
    console: { log() {} },
  });
  run();
  const indexPath = path.join(root, "web/index.html");
  const manifestPath = path.join(root, "web/manifest.webmanifest");
  const swPath = path.join(root, "web/sw.js");
  const output = [indexPath, manifestPath, swPath].map((file) => read(file, "utf8"));
  run();
  assert.deepEqual([indexPath, manifestPath, swPath].map((file) => read(file, "utf8")), output);
  const refs = [...output[0].matchAll(/(?:href|src)="(\.\/[^"?]+)\?v=([^"]+)"/g)];
  assert.equal(new Set(refs.map((match) => match[2])).size, 1);
  for (const match of refs) assert.ok(output[2].includes(`"${match[1]}?v=${match[2]}"`));
  assert.ok(output[0].includes('class="bottom-tabs liquid-glass-nav"'));
  assert.ok(!output[0].includes("location.replace"));
  const cssPath = path.join(root, "web/interface-appearance.css");
  files.set(cssPath, Buffer.concat([read(cssPath), Buffer.from("\n/* updated */\n")]));
  run();
  assert.notEqual(read(indexPath, "utf8"), output[0]);
  assert.notEqual(read(swPath, "utf8"), output[2]);
  const pkgPath = path.join(root, "package.json");
  const pkg = JSON.parse(read(pkgPath, "utf8"));
  files.set(pkgPath, Buffer.from(JSON.stringify({ ...pkg, displayVersion: "2.0.01" })));
  run();
  const releaseHtml = read(indexPath, "utf8");
  assert.ok(releaseHtml.includes('name="application-version" content="2.0.01"'));
  run();
  assert.equal(read(indexPath, "utf8"), releaseHtml);
  run({ GITHUB_SHA: "abcdef0123456789" });
  assert.ok(read(swPath, "utf8").includes('"we-simulator-pwa-abcdef012345"'));
});
