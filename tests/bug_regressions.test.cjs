const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { webcrypto } = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function workerHarness() {
  const context = vm.createContext({
    crypto: webcrypto, TextEncoder, Uint8Array, btoa, atob, console,
  });
  vm.runInContext(read("workers/push-worker.js").replace("export default {", "globalThis.worker = {"), context);
  return context;
}

test("a legacy fixed credential cannot replace a different stored admin password", async () => {
  const c = workerHarness();
  const account = {
    id: "admin-id", name: "haruka", is_admin: 1,
    password_salt: "test-salt", password_hash: await c.hashPassword("changed-password", "test-salt"),
  };
  let writes = 0;
  const db = { prepare() { return {
    bind() { return this; }, first: async () => ({ ...account }),
    run: async () => { writes += 1; },
  }; } };
  c.ensureCommunitySchema = async () => {};
  c.getAppDb = () => db;
  c.createCommunitySession = async () => { writes += 1; };
  c.withCommunityAccountCounts = async (_, value) => value;

  await assert.rejects(
    c.loginCommunityAccount({ json: async () => ({ name: account.name, password: "haru23" }) }, {}),
    (error) => error.status === 401,
  );
  assert.equal(writes, 0, "Rejected logins must not reset passwords or create sessions");

  const loggedIn = await c.loginCommunityAccount({
    json: async () => ({ name: account.name, password: "changed-password" }),
  }, {});
  assert.equal(loggedIn.isAdmin, true);
  assert.ok(loggedIn.token);
  assert.equal(writes, 1, "The stored password still permits a normal session");
});

test("public registration creates ordinary users and rejects reserved admin names", async () => {
  const c = workerHarness();
  let inserted;
  const db = { prepare(sql) { return {
    bind(...values) { this.values = values; return this; },
    first: async () => null,
    async run() { if (sql.includes("INSERT INTO community_accounts")) inserted = this.values; },
  }; } };
  c.ensureCommunitySchema = async () => {};
  c.getAppDb = () => db;
  c.createCommunitySession = async () => {};
  c.withCommunityAccountCounts = async (_, value) => value;
  const account = await c.createCommunityAccount({
    json: async () => ({ name: "ordinary-user", password: "haru23", isAdmin: true }),
  }, {});
  assert.equal(account.isAdmin, false);
  assert.equal(inserted[5], 0);
  for (const name of ["haruka", "Local 管理者"]) {
    await assert.rejects(c.createCommunityAccount({
      json: async () => ({ name, password: "validPassword1" }),
    }, {}), (error) => error.status === 400);
  }
});

function accountDatabase(t) {
  const sqlite = new DatabaseSync(":memory:");
  t.after(() => sqlite.close());
  const db = { prepare(sql) {
    const statement = sqlite.prepare(sql);
    let values = [];
    return {
      bind(...args) { values = args; return this; },
      first: async () => statement.get(...values) || null,
      all: async () => ({ results: statement.all(...values) }),
      run: async () => ({ meta: { changes: statement.run(...values).changes } }),
    };
  } };
  return { sqlite, db };
}

test("runtime and SQL migration grant only exact haruka while preserving account data", async (t) => {
  const c = workerHarness();
  const { sqlite, db } = accountDatabase(t);
  await c.ensureCommunityAccountsSchema(db);
  assert.equal(sqlite.prepare("SELECT COUNT(*) AS count FROM community_accounts").get().count, 0);
  const names = ["haruka", "other-admin", "ordinary-user", "Haruka", "local-admin", "Local 管理者"];
  for (const [index, name] of names.entries()) {
    sqlite.prepare(`INSERT INTO community_accounts
      (id, name, password_salt, password_hash, is_admin, created_at, updated_at)
      VALUES (?, ?, 'salt', 'original-hash', ?, 'created', 'updated')`)
      .run(`id-${index}`, name, name === "haruka" ? 0 : 1);
  }
  const checkRoles = () => {
    const rows = sqlite.prepare("SELECT * FROM community_accounts ORDER BY id").all();
    assert.equal(rows.length, names.length);
    rows.forEach((row, index) => {
      assert.equal(row.id, `id-${index}`);
      assert.equal(row.name, names[index]);
      assert.equal(row.is_admin, row.name === "haruka" ? 1 : 0);
      assert.equal(row.password_hash, "original-hash");
      assert.equal(row.updated_at, "updated");
    });
  };
  await c.ensureCommunityAccountsSchema(db);
  checkRoles();
  sqlite.exec("UPDATE community_accounts SET is_admin = 1 - is_admin");
  const migration = read("workers/migrations/0007_community_account_roles.sql");
  sqlite.exec(migration);
  sqlite.exec(migration);
  checkRoles();
});

test("existing sessions immediately use the revised admin policy", async (t) => {
  const c = workerHarness();
  const { sqlite, db } = accountDatabase(t);
  c.getAppDb = () => db;
  await c.ensureCommunitySchema(db);
  for (const [name, isAdmin] of [["haruka", 0], ["former-admin", 1]]) {
    sqlite.prepare(`INSERT INTO community_accounts
      (id, name, password_salt, password_hash, is_admin, created_at, updated_at)
      VALUES (?, ?, 'salt', 'hash', ?, 'created', 'updated')`).run(name, name, isAdmin);
    await c.createCommunitySession(db, name, `session-${name}`);
  }
  for (const name of ["former-admin", "haruka"]) {
    const request = { headers: new Headers({ Authorization: `Bearer session-${name}` }) };
    assert.equal((await c.requireCommunityAccount(request, {})).isAdmin, name === "haruka");
    assert.equal(await c.isCommunityAdminRequest(request, {}), name === "haruka");
  }
  assert.equal(sqlite.prepare("SELECT COUNT(*) AS count FROM community_sessions").get().count, 2);
});

test("profile edits cannot claim or release the reserved administrator name", async (t) => {
  const c = workerHarness();
  const { sqlite, db } = accountDatabase(t);
  c.getAppDb = () => db;
  await c.ensureCommunitySchema(db);
  for (const name of ["haruka", "ordinary-user"]) {
    sqlite.prepare(`INSERT INTO community_accounts
      (id, name, password_salt, password_hash, created_at, updated_at)
      VALUES (?, ?, 'salt', 'hash', 'created', 'updated')`).run(name, name);
    await c.createCommunitySession(db, name, `session-${name}`);
  }
  const edit = (current, name) => c.updateCommunityAccount({
    headers: new Headers({ Authorization: `Bearer session-${current}` }),
    json: async () => ({ name }),
  }, {});
  await assert.rejects(edit("ordinary-user", "haruka"), (error) => error.status === 400);
  await assert.rejects(edit("ordinary-user", "Local 管理者"), (error) => error.status === 400);
  await assert.rejects(edit("haruka", "renamed-admin"), (error) => error.status === 400);
  assert.equal((await edit("haruka", "haruka")).isAdmin, true);
  assert.equal((await edit("ordinary-user", "renamed-user")).isAdmin, false);
});

function loadFunctions(file, names, overrides) {
  const source = read(file);
  const declarations = [...source.matchAll(/^(?:async )?function (\w+)\(/gm)];
  const context = vm.createContext({ console, ...overrides });
  for (const name of names) {
    const index = declarations.findIndex((match) => match[1] === name);
    assert.ok(index >= 0, `Missing function ${name}`);
    vm.runInContext(source.slice(declarations[index].index, declarations[index + 1]?.index), context);
  }
  return context;
}

test("saved remote admin flags are restricted to haruka and local remains administrator", () => {
  let saved = { id: "old-admin", name: "former-admin", token: "token", isAdmin: true };
  const c = loadFunctions("web/app.js", ["loadCommunityAccountFromStorage"], {
    IS_LOCAL_DEV: false, COMMUNITY_ACCOUNT_STORAGE_KEY: "account",
    localStorage: { getItem: () => JSON.stringify(saved) },
  });
  assert.equal(c.loadCommunityAccountFromStorage().isAdmin, false);
  saved = { ...saved, name: "haruka" };
  assert.equal(c.loadCommunityAccountFromStorage().isAdmin, true);
  c.IS_LOCAL_DEV = true;
  const local = c.loadCommunityAccountFromStorage();
  assert.equal(local.isAdmin, true);
  assert.equal(local.localOnly, true);
  assert.equal(local.id, "local-admin");
});

for (const presetId of ["", "new-historical-event"]) {
  test(`loading a scenario clears the previous preset and pending detail state (${presetId || "custom"})`, async () => {
    const state = { selectedPresetId: "previous-historical-event" };
    let labelRefreshes = 0;
    const c = loadFunctions("web/app.js", ["applySimulationScenario", "clearSelectedPreset"], {
      state, els: {}, epicenterMarker: null,
      presetDetailLoadingId: "previous-historical-event",
      oldScaleSyntheticMunicipalityHydrationPromise: {},
      oldScaleSyntheticMunicipalityHydratingPresetId: "previous-historical-event",
      normalizeSimulationScenario: (value) => value,
      simulationModeScenarioApplyHandler() {}, simulationFaultScenarioApplyHandler: null,
      applyEarthquakePreset: async (id) => { state.selectedPresetId = id; },
      updateEarthquakePresetButtonLabel: () => { labelRefreshes += 1; }, updateLegendColors() {},
      invalidateIntensityEstimateCache() {}, syncInputs() {}, updateSimulationFaultSource() {},
      updateIntensityLayer() {}, updateSimulationAvailability() {}, setSetupMenuOpen() {}, setSheetState() {},
    });
    await c.applySimulationScenario({
      mode: "point", presetId, epicenter: { latitude: 35, longitude: 139, name: "saved" },
      magnitude: 6, depthKm: 10, magnitudeType: "Mw", earthquakeType: "crustal",
    }, { silent: true });
    assert.equal(state.selectedPresetId, presetId);
    assert.equal(c.presetDetailLoadingId, "");
    assert.equal(c.oldScaleSyntheticMunicipalityHydrationPromise, null);
    assert.equal(c.oldScaleSyntheticMunicipalityHydratingPresetId, "");
    assert.equal(labelRefreshes, 1);
    assert.equal(state.magnitude, 6);
  });
}

test("background notification pruning deletes expired and excess items, preserving recent ones", async () => {
  const now = Date.now();
  const items = [
    { id: "expired", createdAt: new Date(now - 40 * 86400000).toISOString() },
    ...Array.from({ length: 81 }, (_, index) => ({
      id: `recent-${index}`, createdAt: new Date(now - index * 1000).toISOString(),
    })),
  ];
  const removed = [];
  const db = { transaction() { return { objectStore() { return { getAll() {
    const request = {};
    queueMicrotask(() => { request.result = items; request.onsuccess(); });
    return request;
  } }; } }; } };
  const c = loadFunctions("web/sw.js", ["pruneNotificationHistory", "isNotificationHistoryExpired"], {
    self: { indexedDB: {} }, NOTIFICATION_HISTORY_STORE_NAME: "notifications",
    NOTIFICATION_HISTORY_RETENTION_DAYS: 30, NOTIFICATION_HISTORY_LIMIT: 80,
    runNotificationHistoryTransaction: async (_, mode, callback) => {
      assert.equal(mode, "readwrite");
      callback({ delete: (id) => removed.push(id) });
    },
  });
  await c.pruneNotificationHistory(db);
  assert.deepEqual(removed.sort(), ["expired", "recent-80"]);
});

test("malformed request URLs return 400 and the development server continues serving files", () => {
  let handler;
  const server = { on() {}, once() {}, listen() {}, off() {} };
  const c = vm.createContext({
    __dirname: path.join(root, "web"), process: { env: {} }, URL, console,
    require: (name) => name === "node:http" ? {
      createServer(callback) { handler = callback; return server; },
    } : name === "node:fs" ? {
      stat(_, callback) { callback(null, { isFile: () => true, size: 5 }); },
    } : require(name),
  });
  vm.runInContext(read("web/dev-server.js"), c);
  c.streamFile = (_, response) => response.end("index");
  function request(url, host = "localhost") {
    const response = { on() {}, writeHead(status) { this.status = status; }, end(body) { this.body = body; } };
    handler({ url, headers: { host }, on() {} }, response);
    return response;
  }
  for (const url of ["/%ZZ", "/%E0%A4%A"]) {
    assert.equal(request(url).status, 400);
  }
  assert.equal(request("/", "bad host").status, 400);
  const valid = request("/");
  assert.equal(valid.status, 200);
  assert.equal(valid.body, "index");
});
