const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "authorization,content-type",
};

const LATEST_NOTIFICATION_KEY = "latest-notification";
const NOTIFICATION_HISTORY_KEY = "notification-history";
const NOTIFICATION_HISTORY_LIMIT = 80;
const NOTIFICATION_HISTORY_RETENTION_DAYS = 30;
const SUBSCRIPTION_PREFIX = "subscription:";
const TARGETED_NOTIFICATION_PREFIX = "subscription-notification:";
const MAINTENANCE_STATE_ID = "global";
const EARTHQUAKE_PRESET_DETAIL_COLUMNS = `
  id,
  label,
  date,
  time,
  epicenter_name AS epicenterName,
  latitude,
  longitude,
  depth_km AS depthKm,
  magnitude,
  max_intensity AS maxIntensity,
  observed_stations_json AS observedStationsJson,
  eew_forecast_areas_json AS eewForecastAreasJson,
  eew_reports_json AS eewReportsJson
`;

export default {
  async fetch(request, env, context) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    try {
      if (
        (request.method === "GET" || request.method === "HEAD") &&
        url.pathname === "/map/japan.pmtiles"
      ) {
        return serveR2Object(request, env, "map/japan.pmtiles");
      }

      if (request.method === "GET" && url.pathname === "/vapid-public-key") {
        return json({ publicKey: env.VAPID_PUBLIC_KEY || "" });
      }

      if (request.method === "GET" && url.pathname === "/latest-notification") {
        const notification = await env.PUSH_SUBSCRIPTIONS.get(LATEST_NOTIFICATION_KEY, "json");
        return json(notification || {});
      }

      if (request.method === "GET" && url.pathname === "/notification-history") {
        const notifications = await readNotificationHistory(env);
        return json({ notifications });
      }

      if (request.method === "GET" && url.pathname === "/subscription-notification") {
        const key = String(url.searchParams.get("key") || "");
        if (!/^[A-Za-z0-9_-]{20,100}$/.test(key)) {
          return json({ error: "invalid subscription key" }, 400);
        }
        const notification = await takeTargetedNotification(env, key);
        return json(notification || {});
      }

      if (request.method === "GET" && url.pathname === "/maintenance-status") {
        const status = await readMaintenanceStatus(env);
        return json({ ok: true, ...status });
      }

      if (request.method === "POST" && url.pathname === "/maintenance-action") {
        const body = await readRequestBody(request);
        const result = await handleMaintenanceAction(body, env, request, context);
        return json(result);
      }

      if (request.method === "GET" && url.pathname === "/earthquake-presets") {
        const presets = await listEarthquakePresetSummaries(env);
        return json({ presets });
      }

      if (request.method === "GET" && url.pathname === "/earthquake-statistics") {
        const statistics = await listEarthquakeStatistics(env, {
          startYear: url.searchParams.get("startYear"),
          endYear: url.searchParams.get("endYear"),
        });
        return json(statistics);
      }

      if (request.method === "POST" && url.pathname === "/community-accounts") {
        const account = await createCommunityAccount(request, env);
        return json({ ok: true, account }, 201);
      }

      if (request.method === "POST" && url.pathname === "/community-accounts/login") {
        const account = await loginCommunityAccount(request, env);
        return json({ ok: true, account });
      }

      if (request.method === "GET" && url.pathname === "/community-account") {
        const account = await readCommunityAccount(request, env);
        return json({ ok: true, account });
      }

      if (request.method === "PATCH" && url.pathname === "/community-account") {
        const account = await updateCommunityAccount(request, env);
        return json({ ok: true, account });
      }

      if (request.method === "DELETE" && url.pathname === "/community-account") {
        await deleteCommunityAccount(request, env);
        return json({ ok: true });
      }

      if (request.method === "DELETE" && url.pathname === "/community-session") {
        await logoutCommunityAccount(request, env);
        return json({ ok: true });
      }

      if (request.method === "GET" && url.pathname === "/community-accounts") {
        const accounts = await listCommunityAccounts(request, env);
        return json({ ok: true, accounts });
      }

      if (request.method === "GET" && url.pathname === "/community-posts") {
        const posts = await listCommunityPosts(env, request);
        return json({ posts });
      }

      if (request.method === "POST" && url.pathname === "/community-posts") {
        const post = await createCommunityPost(request, env, context);
        return json({ ok: true, post }, 201);
      }

      const communityPostLikeMatch = url.pathname.match(/^\/community-posts\/([^/]+)\/like$/);
      if (communityPostLikeMatch && request.method === "PUT") {
        const postId = decodeURIComponent(communityPostLikeMatch[1]);
        const result = await likeCommunityPost(request, env, postId);
        return json({ ok: true, ...result });
      }

      if (communityPostLikeMatch && request.method === "DELETE") {
        const postId = decodeURIComponent(communityPostLikeMatch[1]);
        const result = await unlikeCommunityPost(request, env, postId);
        return json({ ok: true, ...result });
      }

      const communityFollowMatch = url.pathname.match(/^\/community-accounts\/([^/]+)\/follow$/);
      if (communityFollowMatch && request.method === "PUT") {
        const accountId = decodeURIComponent(communityFollowMatch[1]);
        const result = await followCommunityAccount(request, env, accountId);
        return json({ ok: true, ...result });
      }

      if (communityFollowMatch && request.method === "DELETE") {
        const accountId = decodeURIComponent(communityFollowMatch[1]);
        const result = await unfollowCommunityAccount(request, env, accountId);
        return json({ ok: true, ...result });
      }

      const communityConnectionListMatch = url.pathname.match(
        /^\/community-accounts\/([^/]+)\/(following|followers)$/,
      );
      if (communityConnectionListMatch && request.method === "GET") {
        const accountId = decodeURIComponent(communityConnectionListMatch[1]);
        const kind = communityConnectionListMatch[2];
        const accounts = await listCommunityConnections(request, env, accountId, kind);
        return json({ ok: true, accounts });
      }

      if (request.method === "DELETE" && url.pathname.startsWith("/community-posts/")) {
        const id = decodeURIComponent(url.pathname.slice("/community-posts/".length));
        await deleteCommunityPost(request, env, id);
        return json({ ok: true });
      }

      if (
        (request.method === "GET" || request.method === "HEAD") &&
        url.pathname.startsWith("/community-media/")
      ) {
        const key = decodeURIComponent(url.pathname.slice("/community-media/".length));
        return serveCommunityMedia(request, env, key);
      }

      if (request.method === "GET" && url.pathname.startsWith("/earthquake-presets/")) {
        const id = decodeURIComponent(url.pathname.slice("/earthquake-presets/".length));
        const preset = await readEarthquakePreset(env, id);
        if (!preset) {
          return json({ error: "not found" }, 404);
        }
        return json({ preset });
      }

      if (request.method === "POST" && url.pathname === "/subscriptions") {
        const subscription = await request.json();
        validateSubscription(subscription);
        const key = await subscriptionKey(subscription.endpoint);
        const account = await readOptionalCommunityAccount(request, env);
        await env.PUSH_SUBSCRIPTIONS.put(`${SUBSCRIPTION_PREFIX}${key}`, JSON.stringify({
          ...subscription,
          accountId: account?.id || "",
        }));
        return json({ ok: true, key });
      }

      if (request.method === "DELETE" && url.pathname === "/subscriptions") {
        const body = await request.json();
        if (!body?.endpoint) {
          return json({ error: "endpoint is required" }, 400);
        }

        const key = await subscriptionKey(body.endpoint);
        await env.PUSH_SUBSCRIPTIONS.delete(`${SUBSCRIPTION_PREFIX}${key}`);
        return json({ ok: true });
      }

      if (request.method === "POST" && url.pathname === "/notify") {
        if (!(await isCommunityAdminRequest(request, env))) {
          requireAdmin(request, env);
        }
        const body = await request.json();
        const notification = normalizeNotification(body);
        await env.PUSH_SUBSCRIPTIONS.put(LATEST_NOTIFICATION_KEY, JSON.stringify(notification));
        await appendNotificationHistory(env, notification);
        const result = await sendNotificationToAll(request.url, env);
        return json({ ok: true, notification, ...result });
      }

      if (request.method === "POST" && url.pathname === "/admin/earthquake-presets") {
        requireAdmin(request, env);
        const preset = await request.json();
        await upsertEarthquakePreset(env, preset);
        return json({ ok: true, id: String(preset.id || "") });
      }

      return json({ error: "not found" }, 404);
    } catch (error) {
      const status = error.status || 500;
      return json({ error: error.message || "internal error" }, status);
    }
  },
};

async function serveR2Object(request, env, key, contentType = "application/vnd.pmtiles") {
  if (!env.WE_SIMULATOR_DATA) {
    return json({ error: "R2 bucket is not configured" }, 503);
  }

  const requestedRange = request.headers.has("range");
  const object = await env.WE_SIMULATOR_DATA.get(key, {
    range: request.headers,
  });
  if (!object) {
    return json({ error: "not found" }, 404);
  }

  const headers = new Headers(CORS_HEADERS);
  object.writeHttpMetadata(headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800, immutable");
  headers.set("Content-Type", contentType);
  headers.set("ETag", object.httpEtag);

  let status = 200;
  if (requestedRange && object.range) {
    const offset = object.range.offset ?? 0;
    const length = object.range.length ?? object.size;
    headers.set("Content-Range", `bytes ${offset}-${offset + length - 1}/${object.size}`);
    headers.set("Content-Length", String(length));
    status = 206;
  } else {
    headers.set("Content-Length", String(object.size));
  }

  return new Response(request.method === "HEAD" ? null : object.body, { status, headers });
}

async function sendNotificationToAll(workerUrl, env) {
  const subscriptions = await listSubscriptions(env);
  const settled = await Promise.allSettled(
    subscriptions.map(async ({ key, subscription }) => {
      const response = await sendEmptyPush(subscription, workerUrl, env);
      if (response.status === 404 || response.status === 410) {
        await env.PUSH_SUBSCRIPTIONS.delete(key);
      }

      if (!response.ok && response.status !== 404 && response.status !== 410) {
        throw new Error(`push failed: ${response.status}`);
      }
    }),
  );

  return {
    subscribers: subscriptions.length,
    sent: settled.filter((item) => item.status === "fulfilled").length,
    failed: settled.filter((item) => item.status === "rejected").length,
  };
}

async function sendNotificationToAccounts(workerUrl, env, accountIds, notification) {
  const targets = new Set((accountIds || []).map((id) => String(id || "")).filter(Boolean));
  if (!targets.size) {
    return { subscribers: 0, sent: 0, failed: 0 };
  }
  const subscriptions = (await listSubscriptions(env))
    .filter(({ subscription }) => targets.has(String(subscription.accountId || "")));
  const settled = await Promise.allSettled(
    subscriptions.map(async ({ key, subscription, subscriptionKey: targetKey }) => {
      await saveTargetedNotification(env, targetKey, notification);
      const response = await sendEmptyPush(subscription, workerUrl, env);
      if (response.status === 404 || response.status === 410) {
        await Promise.all([
          env.PUSH_SUBSCRIPTIONS.delete(key),
          deleteTargetedNotification(env, targetKey),
        ]);
      }
      if (!response.ok && response.status !== 404 && response.status !== 410) {
        await deleteTargetedNotification(env, targetKey);
        throw new Error(`push failed: ${response.status}`);
      }
    }),
  );
  return {
    subscribers: subscriptions.length,
    sent: settled.filter((item) => item.status === "fulfilled").length,
    failed: settled.filter((item) => item.status === "rejected").length,
  };
}

async function ensureTargetedNotificationSchema(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS push_targeted_notifications (
      subscription_key TEXT PRIMARY KEY,
      payload TEXT NOT NULL,
      expires_at TEXT NOT NULL
    )
  `).run();
}

async function saveTargetedNotification(env, subscriptionKeyValue, notification) {
  const key = String(subscriptionKeyValue || "");
  const payload = JSON.stringify(notification);
  const db = getAppDb(env);
  await ensureTargetedNotificationSchema(db);
  await Promise.all([
    db.prepare(`
      INSERT INTO push_targeted_notifications (subscription_key, payload, expires_at)
      VALUES (?, ?, ?)
      ON CONFLICT(subscription_key) DO UPDATE SET
        payload = excluded.payload,
        expires_at = excluded.expires_at
    `).bind(key, payload, new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()).run(),
    env.PUSH_SUBSCRIPTIONS.put(
      `${TARGETED_NOTIFICATION_PREFIX}${key}`,
      payload,
      { expirationTtl: 24 * 60 * 60 },
    ),
  ]);
}

async function takeTargetedNotification(env, subscriptionKeyValue) {
  const key = String(subscriptionKeyValue || "");
  const db = getAppDb(env);
  await ensureTargetedNotificationSchema(db);
  const row = await db.prepare(`
    SELECT payload FROM push_targeted_notifications
    WHERE subscription_key = ? AND expires_at > ?
  `).bind(key, new Date().toISOString()).first();
  const kvNotification = row?.payload
    ? null
    : await env.PUSH_SUBSCRIPTIONS.get(`${TARGETED_NOTIFICATION_PREFIX}${key}`, "json");
  await Promise.all([
    db.prepare("DELETE FROM push_targeted_notifications WHERE subscription_key = ?").bind(key).run(),
    env.PUSH_SUBSCRIPTIONS.delete(`${TARGETED_NOTIFICATION_PREFIX}${key}`),
  ]);
  if (row?.payload) {
    try {
      return JSON.parse(String(row.payload));
    } catch (error) {
      console.warn("targeted notification payload parse failed", error);
    }
  }
  return kvNotification;
}

async function deleteTargetedNotification(env, subscriptionKeyValue) {
  const key = String(subscriptionKeyValue || "");
  const db = getAppDb(env);
  await ensureTargetedNotificationSchema(db);
  await Promise.all([
    db.prepare("DELETE FROM push_targeted_notifications WHERE subscription_key = ?").bind(key).run(),
    env.PUSH_SUBSCRIPTIONS.delete(`${TARGETED_NOTIFICATION_PREFIX}${key}`),
  ]);
}

async function listSubscriptions(env) {
  const subscriptions = [];
  let cursor;

  do {
    const page = await env.PUSH_SUBSCRIPTIONS.list({ prefix: SUBSCRIPTION_PREFIX, cursor });
    await Promise.all(
      page.keys.map(async ({ name }) => {
        const subscription = await env.PUSH_SUBSCRIPTIONS.get(name, "json");
        if (subscription?.endpoint) {
          subscriptions.push({
            key: name,
            subscriptionKey: name.slice(SUBSCRIPTION_PREFIX.length),
            subscription,
          });
        }
      }),
    );
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return subscriptions;
}

async function sendEmptyPush(subscription, workerUrl, env) {
  const audience = new URL(subscription.endpoint).origin;
  const jwt = await createVapidJwt(audience, workerUrl, env);

  return fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      Authorization: `vapid t=${jwt}, k=${env.VAPID_PUBLIC_KEY}`,
      TTL: "2419200",
      "Content-Length": "0",
    },
  });
}

async function createVapidJwt(audience, workerUrl, env) {
  if (!env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY) {
    throw httpError("VAPID keys are not configured", 500);
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      aud: audience,
      exp: now + 12 * 60 * 60,
      sub: env.VAPID_SUBJECT || `mailto:admin@${new URL(workerUrl).hostname}`,
    }),
  );
  const input = `${header}.${payload}`;
  const privateKey = await importVapidPrivateKey(env);
  const signature = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    privateKey,
    new TextEncoder().encode(input),
  );

  return `${input}.${arrayBufferToBase64Url(signature)}`;
}

async function importVapidPrivateKey(env) {
  const publicKey = base64UrlToUint8Array(env.VAPID_PUBLIC_KEY);
  if (publicKey.length !== 65 || publicKey[0] !== 4) {
    throw httpError("VAPID_PUBLIC_KEY must be an uncompressed P-256 public key", 500);
  }

  const x = arrayBufferToBase64Url(publicKey.slice(1, 33));
  const y = arrayBufferToBase64Url(publicKey.slice(33, 65));

  return crypto.subtle.importKey(
    "jwk",
    {
      kty: "EC",
      crv: "P-256",
      x,
      y,
      d: env.VAPID_PRIVATE_KEY,
      ext: false,
    },
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"],
  );
}

function normalizeNotification(body) {
  return {
    id: String(body?.id || `notification-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`),
    title: String(body?.title || "WE-Simulator"),
    body: String(body?.body || "新しい通知があります。"),
    url: String(body?.url || "./"),
    tag: String(body?.tag || "we-simulator-notification"),
    renotify: Boolean(body?.renotify),
    createdAt: body?.createdAt ? String(body.createdAt) : new Date().toISOString(),
    source: "remote",
  };
}

async function readNotificationHistory(env) {
  const notifications = await env.PUSH_SUBSCRIPTIONS.get(NOTIFICATION_HISTORY_KEY, "json");
  return pruneNotificationHistory(Array.isArray(notifications) ? notifications : []);
}

async function appendNotificationHistory(env, notification) {
  const notifications = await readNotificationHistory(env);
  const nextNotifications = pruneNotificationHistory([
    notification,
    ...notifications.filter((item) => item?.id !== notification.id),
  ]);
  await env.PUSH_SUBSCRIPTIONS.put(NOTIFICATION_HISTORY_KEY, JSON.stringify(nextNotifications));
}

async function readMaintenanceStatus(env) {
  const db = getAppDb(env);
  await ensureMaintenanceSchema(db);
  const row = await db.prepare(`
    SELECT maintenance, reason
    FROM maintenance_state
    WHERE id = ?
  `).bind(MAINTENANCE_STATE_ID).first();

  if (!row) {
    await writeMaintenanceStatus(env, false, "");
    return { maintenance: false, reason: "" };
  }

  return {
    maintenance: Boolean(Number(row.maintenance || 0)),
    reason: String(row.reason || ""),
  };
}

async function writeMaintenanceStatus(env, maintenance, reason) {
  const db = getAppDb(env);
  await ensureMaintenanceSchema(db);
  await db.prepare(`
    INSERT INTO maintenance_state (
      id,
      maintenance,
      reason,
      updated_at
    ) VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      maintenance = excluded.maintenance,
      reason = excluded.reason,
      updated_at = excluded.updated_at
  `).bind(
    MAINTENANCE_STATE_ID,
    maintenance ? 1 : 0,
    reason || "",
    new Date().toISOString(),
  ).run();
}

async function handleMaintenanceAction(body, env, request = null, context = null) {
  const action = String(body?.action || "").trim();
  if (!action) {
    return { ok: false, message: "action is required" };
  }
  const hasCommunityAdmin = request ? await isCommunityAdminRequest(request, env) : false;
  const hasWorkerAdmin = request ? isWorkerAdminRequest(request, env) : false;

  if (action === "adminLogin") {
    const result = await forwardToAppsScript(env, body);
    const token = String(result?.token || result?.parentToken || "").trim();
    if (result?.ok !== false && token) {
      await storeParentToken(env, token);
    }
    return { ok: result?.ok !== false, ...result };
  }

  if (action === "forceReleaseInvalidParent") {
    const token = String(body?.token || "").trim();
    await deleteParentToken(env, token);
    scheduleMaintenanceActionLog(env, body, context);
    return { ok: true };
  }

  const token = String(body?.token || "").trim();
  const hasValidToken = hasCommunityAdmin || hasWorkerAdmin || await isValidParentToken(env, token);
  if (!hasValidToken) {
    return {
      ok: false,
      invalidParentToken: true,
      message: "親端末の認証が無効です。もう一度ログインしてください。",
    };
  }

  if (action === "setMaintenance") {
    const maintenance = parseBoolean(body?.maintenance);
    const reason = maintenance ? normalizeMaintenanceReason(body) : "";
    await writeMaintenanceStatus(env, maintenance, reason);
    scheduleMaintenanceActionLog(env, body, context);
    return { ok: true, maintenance, reason };
  }

  if (action === "releaseParent") {
    const shouldReleaseMaintenance = parseBoolean(body?.releaseMaintenance);
    if (shouldReleaseMaintenance) {
      const currentStatus = await readMaintenanceStatus(env);
      if (currentStatus.maintenance) {
        await writeMaintenanceStatus(env, false, "");
        scheduleMaintenanceActionLog(env, {
          ...body,
          action: "setMaintenance",
          maintenance: false,
          parentRelease: true,
          releaseMaintenanceWithParent: true,
          reason: "",
          maintenanceReason: "",
          maintenanceDetail: "",
          details: "",
        }, context);
      }
    }
    await deleteParentToken(env, token);
    scheduleMaintenanceActionLog(env, body, context);
    return { ok: true };
  }

  return { ok: false, message: "unsupported maintenance action" };
}

async function storeParentToken(env, token) {
  const db = getAppDb(env);
  await ensureMaintenanceSchema(db);
  const now = new Date().toISOString();
  await db.prepare(`
    INSERT INTO admin_parent_tokens (
      token,
      created_at,
      last_seen_at
    ) VALUES (?, ?, ?)
    ON CONFLICT(token) DO UPDATE SET
      last_seen_at = excluded.last_seen_at
  `).bind(token, now, now).run();
}

async function isValidParentToken(env, token) {
  if (!token) {
    return false;
  }

  const db = getAppDb(env);
  await ensureMaintenanceSchema(db);
  const row = await db.prepare(`
    SELECT token
    FROM admin_parent_tokens
    WHERE token = ?
  `).bind(token).first();

  if (!row) {
    return false;
  }

  await db.prepare(`
    UPDATE admin_parent_tokens
    SET last_seen_at = ?
    WHERE token = ?
  `).bind(new Date().toISOString(), token).run();

  return true;
}

async function deleteParentToken(env, token) {
  if (!token) {
    return;
  }
  const db = getAppDb(env);
  await ensureMaintenanceSchema(db);
  await db.prepare(`
    DELETE FROM admin_parent_tokens
    WHERE token = ?
  `).bind(token).run();
}

async function ensureMaintenanceSchema(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS maintenance_state (
      id TEXT PRIMARY KEY CHECK (id = 'global'),
      maintenance INTEGER NOT NULL DEFAULT 0,
      reason TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL
    )
  `).run();
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS admin_parent_tokens (
      token TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL
    )
  `).run();
}

async function logMaintenanceAction(env, body) {
  try {
    await forwardToAppsScript(env, body);
  } catch (error) {
    console.warn("maintenance log failed", error);
  }
}

function scheduleMaintenanceActionLog(env, body, context) {
  const task = logMaintenanceAction(env, body);
  if (context?.waitUntil) {
    context.waitUntil(task);
    return;
  }
  task.catch((error) => console.warn("maintenance log scheduling failed", error));
}

async function forwardToAppsScript(env, body) {
  if (!env.APPS_SCRIPT_ENDPOINT_URL) {
    return { ok: false, message: "Apps Script endpoint is not configured" };
  }

  const response = await fetch(env.APPS_SCRIPT_ENDPOINT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      ...body,
      createdAt: body?.createdAt || new Date().toISOString(),
      source: "cloudflare-worker",
    }),
  });
  const text = await response.text();
  const data = parseJsonObject(text);

  if (!response.ok) {
    return {
      ok: false,
      message: data?.message || data?.error || `Apps Script error: ${response.status}`,
    };
  }

  return data || { ok: true };
}

async function readRequestBody(request) {
  const contentType = request.headers.get("Content-Type") || "";
  if (contentType.includes("application/json") || contentType.includes("text/plain")) {
    return request.json().catch(() => ({}));
  }

  if (contentType.includes("form")) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  return {};
}

function parseBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  return ["1", "true", "yes", "on"].includes(String(value || "").toLowerCase());
}

function normalizeMaintenanceReason(body) {
  const candidates = [
    body?.reason,
    body?.maintenanceReason,
    body?.maintenanceDetail,
    body?.maintenanceDetails,
    body?.details,
  ];

  for (const candidate of candidates) {
    const reason = normalizeMultilineText(candidate);
    if (reason) {
      return reason;
    }
  }

  return "";
}

function normalizeMultilineText(value) {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 500);
}

function parseJsonObject(text) {
  try {
    const data = JSON.parse(text || "{}");
    return data && typeof data === "object" ? data : null;
  } catch {
    return null;
  }
}

async function listEarthquakePresetSummaries(env) {
  const db = getEarthquakePresetDb(env);
  const result = await db.prepare(`
    SELECT
      id,
      label,
      date,
      time,
      epicenter_name AS epicenterName,
      latitude,
      longitude,
      depth_km AS depthKm,
      magnitude,
      max_intensity AS maxIntensity
    FROM earthquake_presets
    ORDER BY date DESC, time DESC, id ASC
  `).all();

  return (result.results || []).map((row) => ({
    id: String(row.id),
    label: String(row.label || ""),
    date: String(row.date || ""),
    time: String(row.time || ""),
    epicenterName: String(row.epicenterName || ""),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    depthKm: Number(row.depthKm),
    magnitude: Number(row.magnitude),
    maxIntensity: String(row.maxIntensity || ""),
  }));
}

async function listEarthquakeStatistics(env, options = {}) {
  const db = getEarthquakePresetDb(env);
  const startYear = normalizeStatisticsYear(options.startYear) || new Date().getUTCFullYear();
  const endYear = normalizeStatisticsYear(options.endYear) || startYear;
  const normalizedStartYear = Math.min(startYear, endYear);
  const normalizedEndYear = Math.max(startYear, endYear);
  let areaResult;
  try {
    areaResult = await db.prepare(`
      SELECT
        area_name AS areaName,
        SUM(count) AS count,
        MAX(latest_at) AS latestAt,
        MAX(source) AS source,
        MAX(updated_at) AS updatedAt
      FROM earthquake_statistics_area_years
      WHERE year BETWEEN ?1 AND ?2
      GROUP BY area_name
      HAVING SUM(count) > 0
      ORDER BY count DESC, area_name ASC
    `).bind(normalizedStartYear, normalizedEndYear).all();
  } catch (error) {
    console.warn("earthquake statistics table unavailable", error);
    return {
      source: "USGS Earthquake Catalog API",
      updatedAt: "",
      period: {
        startYear: normalizedStartYear,
        endYear: normalizedEndYear,
      },
      areas: [],
    };
  }

  const areas = areaResult.results || [];
  if (!areas.length) {
    return {
      source: "USGS Earthquake Catalog API",
      updatedAt: "",
      period: {
        startYear: normalizedStartYear,
        endYear: normalizedEndYear,
      },
      areas: [],
    };
  }

  const epicenterResult = await db.prepare(`
    SELECT
      area_name AS areaName,
      epicenter_name AS name,
      SUM(count) AS count,
      MAX(latest_at) AS latestAt
    FROM earthquake_statistics_epicenter_years
    WHERE year BETWEEN ?1 AND ?2
    GROUP BY area_name, epicenter_name
    HAVING SUM(count) > 0
    ORDER BY area_name ASC, count DESC, epicenter_name ASC
  `).bind(normalizedStartYear, normalizedEndYear).all();
  const epicentersByArea = new Map();
  for (const row of epicenterResult.results || []) {
    const areaName = String(row.areaName || "");
    if (!areaName) {
      continue;
    }
    const items = epicentersByArea.get(areaName) || [];
    items.push({
      name: String(row.name || ""),
      count: Number(row.count) || 0,
      latestAt: String(row.latestAt || ""),
    });
    epicentersByArea.set(areaName, items);
  }

  return {
    source: String(areas[0]?.source || "USGS Earthquake Catalog API"),
    updatedAt: String(areas[0]?.updatedAt || ""),
    period: {
      startYear: normalizedStartYear,
      endYear: normalizedEndYear,
    },
    areas: areas.map((row) => ({
      areaName: String(row.areaName || ""),
      count: Number(row.count) || 0,
      latestAt: String(row.latestAt || ""),
      epicenters: epicentersByArea.get(String(row.areaName || "")) || [],
    })),
  };
}

function normalizeStatisticsYear(value) {
  const year = Number(value);
  if (!Number.isInteger(year)) {
    return null;
  }
  return Math.min(Math.max(year, 1900), new Date().getUTCFullYear());
}

async function readEarthquakePreset(env, id) {
  if (!id) {
    return null;
  }

  const db = getEarthquakePresetDb(env);
  const row = await db.prepare(`
    SELECT ${EARTHQUAKE_PRESET_DETAIL_COLUMNS}
    FROM earthquake_presets
    WHERE id = ?
  `).bind(id).first();

  return row ? normalizeEarthquakePresetRow(row) : null;
}

async function upsertEarthquakePreset(env, preset) {
  const db = getEarthquakePresetDb(env);
  const normalized = normalizeEarthquakePresetForStorage(preset);
  await db.prepare(`
    INSERT INTO earthquake_presets (
      id,
      label,
      date,
      time,
      epicenter_name,
      latitude,
      longitude,
      depth_km,
      magnitude,
      max_intensity,
      observed_stations_json,
      eew_forecast_areas_json,
      eew_reports_json,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      label = excluded.label,
      date = excluded.date,
      time = excluded.time,
      epicenter_name = excluded.epicenter_name,
      latitude = excluded.latitude,
      longitude = excluded.longitude,
      depth_km = excluded.depth_km,
      magnitude = excluded.magnitude,
      max_intensity = excluded.max_intensity,
      observed_stations_json = excluded.observed_stations_json,
      eew_forecast_areas_json = excluded.eew_forecast_areas_json,
      eew_reports_json = excluded.eew_reports_json,
      updated_at = excluded.updated_at
  `).bind(
    normalized.id,
    normalized.label,
    normalized.date,
    normalized.time,
    normalized.epicenterName,
    normalized.latitude,
    normalized.longitude,
    normalized.depthKm,
    normalized.magnitude,
    normalized.maxIntensity,
    JSON.stringify(normalized.observedStations),
    JSON.stringify(normalized.eewForecastAreas),
    JSON.stringify(normalized.eewReports),
    new Date().toISOString(),
  ).run();
}

function getEarthquakePresetDb(env) {
  return getAppDb(env);
}

function getAppDb(env) {
  if (!env.EARTHQUAKE_PRESETS_DB) {
    throw httpError("EARTHQUAKE_PRESETS_DB is not configured", 500);
  }
  return env.EARTHQUAKE_PRESETS_DB;
}

async function listCommunityPosts(env, request) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const viewer = await readOptionalCommunityAccount(request, env);
  const viewerId = viewer?.id || "";
  const url = new URL(request.url);
  const limit = clampInteger(url.searchParams.get("limit"), 1, 200, 100);
  const result = await db
    .prepare(
      `SELECT
        p.id,
        p.latitude,
        p.longitude,
        p.location_mode AS locationMode,
        p.place_name AS placeName,
        p.tags_json AS tagsJson,
        p.text,
        p.media_key AS mediaKey,
        p.media_type AS mediaType,
        p.media_name AS mediaName,
        p.account_id AS accountId,
        p.created_at AS createdAt,
        COALESCE(a.name, p.author_name, '') AS authorName,
        COALESCE(a.icon, p.author_icon, '') AS authorIcon,
        (SELECT COUNT(*) FROM community_post_likes l WHERE l.post_id = p.id) AS likeCount,
        EXISTS(
          SELECT 1 FROM community_post_likes l
          WHERE l.post_id = p.id AND l.account_id = ?
        ) AS liked,
        EXISTS(
          SELECT 1 FROM community_follows f
          WHERE f.followed_id = p.account_id AND f.follower_id = ?
        ) AS following
      FROM community_posts p
      LEFT JOIN community_accounts a ON a.id = p.account_id
      ORDER BY p.created_at DESC
      LIMIT ?`,
    )
    .bind(viewerId, viewerId, limit)
    .all();

  return (result.results || []).map((row) => normalizeCommunityPostRow(row, request.url));
}

async function createCommunityPost(request, env, context) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const account = await requireCommunityAccount(request, env);
  const formData = await request.formData();
  const id = crypto.randomUUID();
  const latitude = Number(formData.get("latitude"));
  const longitude = Number(formData.get("longitude"));
  const locationMode = ["current", "vague", "map"].includes(String(formData.get("locationMode")))
    ? String(formData.get("locationMode"))
    : "map";
  const placeName = String(formData.get("placeName") || "").trim().slice(0, 120);
  const tags = normalizeCommunityPostTags(formData.getAll("tags"));
  const text = String(formData.get("text") || "").trim().slice(0, 1200);
  const media = formData.get("media");

  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    throw httpError("latitude is invalid", 400);
  }
  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    throw httpError("longitude is invalid", 400);
  }
  const primaryTags = tags.filter((tag) => !String(tag).startsWith("optional:"));
  if (primaryTags.length !== 1) {
    throw httpError("exactly one required tag is allowed", 400);
  }
  if (!text) {
    throw httpError("text is required", 400);
  }

  let mediaKey = "";
  let mediaType = "";
  let mediaName = "";
  if (media instanceof File && media.size > 0) {
    if (!env.WE_SIMULATOR_DATA) {
      throw httpError("R2 bucket is not configured", 500);
    }
    const allowedTypes = new Set(["image/png", "image/jpeg", "video/mp4"]);
    mediaType = String(media.type || "");
    if (!allowedTypes.has(mediaType)) {
      throw httpError("media type is not allowed", 400);
    }
    const maxBytes = mediaType === "video/mp4" ? 80 * 1024 * 1024 : 20 * 1024 * 1024;
    if (media.size > maxBytes) {
      throw httpError("media is too large", 400);
    }
    mediaName = String(media.name || "").slice(0, 160);
    const extension = mediaType === "image/png" ? "png" : mediaType === "image/jpeg" ? "jpg" : "mp4";
    mediaKey = `community-posts/${id}/media.${extension}`;
    await env.WE_SIMULATOR_DATA.put(mediaKey, media.stream(), {
      httpMetadata: {
        contentType: mediaType,
        cacheControl: "public, max-age=31536000, immutable",
      },
    });
  }

  const createdAt = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO community_posts (
        id,
        latitude,
        longitude,
        location_mode,
        place_name,
        tags_json,
        text,
        media_key,
        media_type,
        media_name,
        account_id,
        author_name,
        author_icon,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      latitude,
      longitude,
      locationMode,
      placeName,
      JSON.stringify(tags),
      text,
      mediaKey,
      mediaType,
      mediaName,
      account.id,
      account.name,
      account.icon,
      createdAt,
      createdAt,
    )
    .run();

  const notificationTask = notifyFollowersOfCommunityPost(env, request.url, db, account, id).catch((error) => {
    console.warn("community post follower notification failed", error);
  });
  if (context?.waitUntil) {
    context.waitUntil(notificationTask);
  } else {
    await notificationTask;
  }

  return normalizeCommunityPostRow({
    id,
    latitude,
    longitude,
    locationMode,
    placeName,
    tagsJson: JSON.stringify(tags),
    text,
    mediaKey,
    mediaType,
    mediaName,
    accountId: account.id,
    authorName: account.name,
    authorIcon: account.icon,
    createdAt,
    likeCount: 0,
    liked: 0,
    following: 0,
  }, request.url);
}

async function serveCommunityMedia(request, env, key) {
  if (!key || key.includes("..") || !key.startsWith("community-posts/")) {
    return json({ error: "not found" }, 404);
  }
  if (!env.WE_SIMULATOR_DATA) {
    return json({ error: "R2 bucket is not configured" }, 503);
  }
  const object = await env.WE_SIMULATOR_DATA.get(key);
  if (!object) {
    return json({ error: "not found" }, 404);
  }
  const headers = new Headers(CORS_HEADERS);
  object.writeHttpMetadata(headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("ETag", object.httpEtag);
  headers.set("Content-Length", String(object.size));
  return new Response(request.method === "HEAD" ? null : object.body, { headers });
}

async function createCommunityAccount(request, env) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const body = await request.json().catch(() => ({}));
  const name = normalizeCommunityAccountName(body.name);
  const icon = normalizeCommunityAccountIcon(body.icon);
  const password = String(body.password || "");
  if (!name) {
    throw httpError("name is required", 400);
  }
  validateCommunityPassword(password);
  if (name.toLowerCase() === "local 管理者".toLowerCase()) {
    throw httpError("reserved account name", 400);
  }
  const existing = await db.prepare("SELECT id FROM community_accounts WHERE name = ?").bind(name).first();
  if (existing) {
    throw httpError("name is already used", 409);
  }
  const id = crypto.randomUUID();
  const salt = randomBase64Url(16);
  const passwordHash = await hashPassword(password, salt);
  const token = randomBase64Url(32);
  const createdAt = new Date().toISOString();
  const isAdmin = isDefaultCommunityAdminCredential(name, password) ? 1 : 0;
  await db
    .prepare(
      `INSERT INTO community_accounts (
        id,
        name,
        icon,
        password_salt,
        password_hash,
        is_admin,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, name, icon, salt, passwordHash, isAdmin, createdAt, createdAt)
    .run();
  await createCommunitySession(db, id, token);
  return withCommunityAccountCounts(db, { id, name, icon, isAdmin: Boolean(isAdmin), token });
}

async function loginCommunityAccount(request, env) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const body = await request.json().catch(() => ({}));
  const name = normalizeCommunityAccountName(body.name);
  const password = String(body.password || "");
  const account = await db
    .prepare("SELECT * FROM community_accounts WHERE name = ?")
    .bind(name)
    .first();
  if (!account) {
    throw httpError("invalid account", 401);
  }
  let expectedHash = await hashPassword(password, account.password_salt);
  if (!safeEqual(expectedHash, String(account.password_hash || ""))) {
    if (!isDefaultCommunityAdminCredential(name, password)) {
      throw httpError("invalid account", 401);
    }
    const salt = randomBase64Url(16);
    expectedHash = await hashPassword(password, salt);
    await db
      .prepare("UPDATE community_accounts SET password_salt = ?, password_hash = ?, is_admin = 1, updated_at = ? WHERE id = ?")
      .bind(salt, expectedHash, new Date().toISOString(), account.id)
      .run();
    account.password_salt = salt;
    account.password_hash = expectedHash;
    account.is_admin = 1;
  }
  if (!safeEqual(expectedHash, String(account.password_hash || ""))) {
    throw httpError("invalid account", 401);
  }
  const token = randomBase64Url(32);
  await createCommunitySession(db, account.id, token);
  return withCommunityAccountCounts(db, {
    id: account.id,
    name: account.name,
    icon: account.icon || "",
    isAdmin: Boolean(account.is_admin),
    token,
  });
}

async function readCommunityAccount(request, env) {
  const db = getAppDb(env);
  const account = await requireCommunityAccount(request, env);
  return withCommunityAccountCounts(db, {
    id: account.id,
    name: account.name,
    icon: account.icon || "",
    isAdmin: Boolean(account.isAdmin),
  });
}

async function updateCommunityAccount(request, env) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const account = await requireCommunityAccount(request, env);
  const body = await request.json().catch(() => ({}));
  const name = normalizeCommunityAccountName(body.name || account.name);
  const icon = normalizeCommunityAccountIcon(body.icon ?? account.icon);
  if (!name) {
    throw httpError("name is required", 400);
  }
  const existing = await db
    .prepare("SELECT id FROM community_accounts WHERE name = ? AND id <> ?")
    .bind(name, account.id)
    .first();
  if (existing) {
    throw httpError("name is already used", 409);
  }
  await db
    .prepare("UPDATE community_accounts SET name = ?, icon = ?, updated_at = ? WHERE id = ?")
    .bind(name, icon, new Date().toISOString(), account.id)
    .run();
  return withCommunityAccountCounts(db, {
    id: account.id,
    name,
    icon,
    isAdmin: Boolean(account.isAdmin),
    token: getBearerToken(request),
  });
}

async function logoutCommunityAccount(request, env) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const token = getBearerToken(request);
  if (!token) {
    return;
  }
  await db.prepare("DELETE FROM community_sessions WHERE token_hash = ?")
    .bind(await sha256Base64Url(token))
    .run();
}

async function deleteCommunityAccount(request, env) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const account = await requireCommunityAccount(request, env);
  await db.prepare("DELETE FROM community_sessions WHERE account_id = ?").bind(account.id).run();
  await db.prepare("DELETE FROM community_follows WHERE follower_id = ? OR followed_id = ?").bind(account.id, account.id).run();
  await db.prepare("DELETE FROM community_post_likes WHERE account_id = ?").bind(account.id).run();
  await db.prepare("DELETE FROM community_accounts WHERE id = ?").bind(account.id).run();
}

async function withCommunityAccountCounts(db, account) {
  const counts = await db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM community_follows WHERE follower_id = ?) AS followingCount,
      (SELECT COUNT(*) FROM community_follows WHERE followed_id = ?) AS followerCount
  `).bind(account.id, account.id).first();
  return {
    ...account,
    followingCount: Number(counts?.followingCount || 0),
    followerCount: Number(counts?.followerCount || 0),
  };
}

async function listCommunityAccounts(request, env) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const account = await requireCommunityAccount(request, env);
  if (!account.isAdmin) {
    throw httpError("admin account is required", 403);
  }
  const result = await db.prepare(
    `SELECT
      a.id,
      a.name,
      a.icon,
      a.is_admin AS isAdmin,
      a.created_at AS createdAt,
      COUNT(s.id) AS sessionCount
    FROM community_accounts a
    LEFT JOIN community_sessions s ON s.account_id = a.id
    GROUP BY a.id
    ORDER BY a.created_at DESC`,
  ).all();
  return (result.results || []).map((row) => ({
    id: String(row.id || ""),
    name: String(row.name || ""),
    icon: String(row.icon || ""),
    isAdmin: Boolean(row.isAdmin),
    createdAt: String(row.createdAt || ""),
    sessionCount: Number(row.sessionCount || 0),
  }));
}

async function deleteCommunityPost(request, env, postId) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const account = await requireCommunityAccount(request, env);
  const post = await db.prepare("SELECT id, account_id AS accountId, media_key AS mediaKey FROM community_posts WHERE id = ?")
    .bind(postId)
    .first();
  if (!post) {
    throw httpError("not found", 404);
  }
  if (!account.isAdmin && String(post.accountId || "") !== account.id) {
    throw httpError("forbidden", 403);
  }
  await db.prepare("DELETE FROM community_post_likes WHERE post_id = ?").bind(postId).run();
  await db.prepare("DELETE FROM community_posts WHERE id = ?").bind(postId).run();
  if (post.mediaKey && env.WE_SIMULATOR_DATA) {
    await env.WE_SIMULATOR_DATA.delete(String(post.mediaKey)).catch(() => {});
  }
}

async function likeCommunityPost(request, env, postId) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const account = await requireCommunityAccount(request, env);
  const post = await db.prepare("SELECT id, account_id AS accountId FROM community_posts WHERE id = ?")
    .bind(postId)
    .first();
  if (!post) {
    throw httpError("not found", 404);
  }
  const existing = await db.prepare(`
    SELECT 1 FROM community_post_likes WHERE post_id = ? AND account_id = ?
  `).bind(postId, account.id).first();
  await db.prepare(`
    INSERT OR IGNORE INTO community_post_likes (post_id, account_id, created_at)
    VALUES (?, ?, ?)
  `).bind(postId, account.id, new Date().toISOString()).run();
  if (!existing && post.accountId && String(post.accountId) !== account.id) {
    const notification = normalizeNotification({
      title: "WE-Simulator",
      body: `${account.name}さんがあなたの投稿にいいねしました`,
      tag: `community-like-${postId}-${account.id}`,
      renotify: true,
      url: "./",
    });
    await sendNotificationToAccounts(request.url, env, [String(post.accountId)], notification).catch((error) => {
      console.warn("community like notification failed", error);
    });
  }
  return { liked: true, likeCount: await readCommunityPostLikeCount(db, postId) };
}

async function unlikeCommunityPost(request, env, postId) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const account = await requireCommunityAccount(request, env);
  await db.prepare("DELETE FROM community_post_likes WHERE post_id = ? AND account_id = ?")
    .bind(postId, account.id)
    .run();
  return { liked: false, likeCount: await readCommunityPostLikeCount(db, postId) };
}

async function readCommunityPostLikeCount(db, postId) {
  const row = await db.prepare("SELECT COUNT(*) AS count FROM community_post_likes WHERE post_id = ?")
    .bind(postId)
    .first();
  return Number(row?.count || 0);
}

async function followCommunityAccount(request, env, followedId) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const follower = await requireCommunityAccount(request, env);
  if (!followedId || followedId === follower.id) {
    throw httpError("cannot follow this account", 400);
  }
  const followed = await db.prepare("SELECT id, name FROM community_accounts WHERE id = ?")
    .bind(followedId)
    .first();
  if (!followed) {
    throw httpError("account not found", 404);
  }
  const existing = await db.prepare(`
    SELECT 1 FROM community_follows WHERE follower_id = ? AND followed_id = ?
  `).bind(follower.id, followedId).first();
  if (!existing) {
    await db.prepare(`
      INSERT INTO community_follows (follower_id, followed_id, created_at)
      VALUES (?, ?, ?)
    `).bind(follower.id, followedId, new Date().toISOString()).run();
    const notification = normalizeNotification({
      title: "WE-Simulator",
      body: `${follower.name}さんにフォローされました`,
      tag: `community-follow-${follower.id}`,
      renotify: true,
      url: "./",
    });
    await sendNotificationToAccounts(request.url, env, [followedId], notification).catch((error) => {
      console.warn("community follow notification failed", error);
    });
  }
  const counts = await withCommunityAccountCounts(db, { id: follower.id });
  return { following: true, followingCount: counts.followingCount };
}

async function unfollowCommunityAccount(request, env, followedId) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const follower = await requireCommunityAccount(request, env);
  await db.prepare("DELETE FROM community_follows WHERE follower_id = ? AND followed_id = ?")
    .bind(follower.id, followedId)
    .run();
  const counts = await withCommunityAccountCounts(db, { id: follower.id });
  return { following: false, followingCount: counts.followingCount };
}

async function listCommunityConnections(request, env, accountId, kind) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const viewer = await readOptionalCommunityAccount(request, env);
  const target = await db.prepare("SELECT id FROM community_accounts WHERE id = ?").bind(accountId).first();
  if (!target) {
    throw httpError("account not found", 404);
  }
  const isFollowers = kind === "followers";
  const joinColumn = isFollowers ? "f.follower_id" : "f.followed_id";
  const filterColumn = isFollowers ? "f.followed_id" : "f.follower_id";
  const result = await db.prepare(`
    SELECT
      a.id,
      a.name,
      a.icon,
      a.is_admin AS isAdmin,
      EXISTS(
        SELECT 1 FROM community_follows mine
        WHERE mine.follower_id = ? AND mine.followed_id = a.id
      ) AS following
    FROM community_follows f
    JOIN community_accounts a ON a.id = ${joinColumn}
    WHERE ${filterColumn} = ?
    ORDER BY f.created_at DESC, a.name ASC
  `).bind(viewer?.id || "", accountId).all();
  return (result.results || []).map((row) => ({
    id: String(row.id || ""),
    name: String(row.name || ""),
    icon: String(row.icon || ""),
    isAdmin: Boolean(row.isAdmin),
    following: Boolean(row.following),
  }));
}

async function notifyFollowersOfCommunityPost(env, workerUrl, db, author, postId) {
  const result = await db.prepare("SELECT follower_id AS followerId FROM community_follows WHERE followed_id = ?")
    .bind(author.id)
    .all();
  const followerIds = (result.results || []).map((row) => String(row.followerId || "")).filter(Boolean);
  if (!followerIds.length) {
    return;
  }
  const notification = normalizeNotification({
    title: "WE-Simulator",
    body: `${author.name}さんが投稿しました`,
    tag: `community-post-${postId}`,
    renotify: true,
    url: "./",
  });
  await sendNotificationToAccounts(workerUrl, env, followerIds, notification);
}

async function requireCommunityAccount(request, env) {
  const db = getAppDb(env);
  await ensureCommunitySchema(db);
  const token = getBearerToken(request);
  if (!token) {
    throw httpError("community account is required", 401);
  }
  const tokenHash = await sha256Base64Url(token);
  const account = await db
    .prepare(
      `SELECT a.id, a.name, a.icon, a.is_admin AS isAdmin
      FROM community_sessions s
      JOIN community_accounts a ON a.id = s.account_id
      WHERE s.token_hash = ?`,
    )
    .bind(tokenHash)
    .first();
  if (!account) {
    throw httpError("community account is required", 401);
  }
  return {
    id: String(account.id),
    name: String(account.name || ""),
    icon: String(account.icon || ""),
    isAdmin: Boolean(account.isAdmin),
  };
}

async function readOptionalCommunityAccount(request, env) {
  const token = getBearerToken(request);
  if (!token) {
    return null;
  }
  try {
    return await requireCommunityAccount(request, env);
  } catch (error) {
    if (error.status === 401) {
      return null;
    }
    throw error;
  }
}

function getBearerToken(request) {
  return request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim() || "";
}

function normalizeCommunityAccountName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 32);
}

function normalizeCommunityAccountIcon(value) {
  const icon = String(value || "").trim();
  if (!icon) {
    return "";
  }
  if (!/^data:image\/(?:png|jpeg);base64,[A-Za-z0-9+/=]+$/i.test(icon)) {
    throw httpError("icon must be a PNG or JPEG image", 400);
  }
  if (icon.length > 262144) {
    throw httpError("icon is too large", 400);
  }
  return icon;
}

function validateCommunityPassword(password) {
  if (!/^[A-Za-z0-9]{6,64}$/.test(password)) {
    throw httpError("password must be 6-64 letters or numbers", 400);
  }
}

function isDefaultCommunityAdminCredential(name, password) {
  return String(name || "").toLowerCase() === "haruka" && password === "haru23";
}

async function createCommunitySession(db, accountId, token) {
  const now = new Date().toISOString();
  await db
    .prepare("INSERT INTO community_sessions (id, account_id, token_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), accountId, await sha256Base64Url(token), now, now)
    .run();
}

async function hashPassword(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: new TextEncoder().encode(salt),
      iterations: 100000,
    },
    keyMaterial,
    256,
  );
  return arrayBufferToBase64Url(bits);
}

async function sha256Base64Url(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return arrayBufferToBase64Url(digest);
}

function randomBase64Url(byteLength) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return arrayBufferToBase64Url(bytes);
}

function safeEqual(a, b) {
  const left = String(a || "");
  const right = String(b || "");
  if (left.length !== right.length) {
    return false;
  }
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return diff === 0;
}

function normalizeCommunityPostRow(row, requestUrl) {
  const tags = parseJsonArray(row.tagsJson);
  return {
    id: String(row.id || ""),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    locationMode: String(row.locationMode || "map"),
    placeName: String(row.placeName || ""),
    tags,
    text: String(row.text || ""),
    mediaType: String(row.mediaType || ""),
    mediaName: String(row.mediaName || ""),
    mediaUrl: row.mediaKey ? buildCommunityMediaUrl(requestUrl, String(row.mediaKey)) : "",
    accountId: String(row.accountId || ""),
    authorName: String(row.authorName || ""),
    authorIcon: String(row.authorIcon || ""),
    createdAt: String(row.createdAt || ""),
    likeCount: Number(row.likeCount || 0),
    liked: Boolean(row.liked),
    following: Boolean(row.following),
  };
}

function buildCommunityMediaUrl(requestUrl, key) {
  const url = new URL(requestUrl);
  url.pathname = `/community-media/${encodeURIComponent(key).replace(/%2F/g, "/")}`;
  url.search = "";
  return url.toString();
}

function normalizeCommunityPostTags(values) {
  const allowed = new Set(["weather", "disaster", "earthquake", "safety"]);
  const allowedOptional = new Set(["typhoon", "heat", "landslide"]);
  const normalized = [...new Set(values.flatMap((value) => {
    const text = String(value || "");
    return text.startsWith("optional:") ? [text] : text.split(",");
  }))]
    .map((value) => value.trim())
    .filter(Boolean);
  const primary = normalized.filter((value) => allowed.has(value));
  const optional = normalized
    .filter((value) => value.startsWith("optional:"))
    .map((value) => value.slice("optional:".length).trim().slice(0, 24))
    .map((value) => allowedOptional.has(value) ? value : value.replace(/[<>"'`\\]/g, ""))
    .filter(Boolean)
    .map((value) => `optional:${value}`);
  return [...new Set([...primary, ...optional])];
}

async function ensureCommunitySchema(db) {
  await ensureCommunityAccountsSchema(db);
  await ensureCommunityPostsSchema(db);
  await ensureCommunitySocialSchema(db);
}

async function ensureCommunityAccountsSchema(db) {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS community_accounts (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        icon TEXT NOT NULL DEFAULT '',
        password_salt TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        is_admin INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
  await ensureColumn(db, "community_accounts", "is_admin", "INTEGER NOT NULL DEFAULT 0");
  await db
    .prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_community_accounts_name ON community_accounts(name)")
    .run();
  await ensureCommunitySessionsSchema(db);
  await ensureDefaultCommunityAdminAccount(db);
}

async function ensureCommunitySessionsSchema(db) {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS community_sessions (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_community_sessions_account_id ON community_sessions(account_id)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_community_sessions_token_hash ON community_sessions(token_hash)").run();
}

async function ensureDefaultCommunityAdminAccount(db) {
  const name = "haruka";
  const password = "haru23";
  const existing = await db.prepare("SELECT id, is_admin AS isAdmin FROM community_accounts WHERE name = ?").bind(name).first();
  if (existing) {
    if (!existing.isAdmin) {
      await db.prepare("UPDATE community_accounts SET is_admin = 1, updated_at = ? WHERE id = ?")
        .bind(new Date().toISOString(), existing.id)
        .run();
    }
    return;
  }
  const id = crypto.randomUUID();
  const salt = randomBase64Url(16);
  const now = new Date().toISOString();
  await db.prepare(
    `INSERT INTO community_accounts (
      id,
      name,
      icon,
      password_salt,
      password_hash,
      is_admin,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(id, name, "", salt, await hashPassword(password, salt), 1, now, now).run();
}

async function ensureCommunityPostsSchema(db) {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS community_posts (
        id TEXT PRIMARY KEY,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        location_mode TEXT NOT NULL DEFAULT 'map',
        place_name TEXT NOT NULL DEFAULT '',
        tags_json TEXT NOT NULL DEFAULT '[]',
        text TEXT NOT NULL DEFAULT '',
        media_key TEXT,
        media_type TEXT,
        media_name TEXT,
        account_id TEXT,
        author_name TEXT,
        author_icon TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
  await ensureColumn(db, "community_posts", "account_id", "TEXT");
  await ensureColumn(db, "community_posts", "author_name", "TEXT");
  await ensureColumn(db, "community_posts", "author_icon", "TEXT");
  await ensureColumn(db, "community_posts", "place_name", "TEXT NOT NULL DEFAULT ''");
  await db
    .prepare("CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at DESC)")
    .run();
  await db
    .prepare("CREATE INDEX IF NOT EXISTS idx_community_posts_account_id ON community_posts(account_id)")
    .run();
}

async function ensureCommunitySocialSchema(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS community_follows (
      follower_id TEXT NOT NULL,
      followed_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (follower_id, followed_id)
    )
  `).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_community_follows_followed_id ON community_follows(followed_id)").run();
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS community_post_likes (
      post_id TEXT NOT NULL,
      account_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (post_id, account_id)
    )
  `).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_community_post_likes_post_id ON community_post_likes(post_id)").run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_community_post_likes_account_id ON community_post_likes(account_id)").run();
}

async function ensureColumn(db, tableName, columnName, type) {
  const info = await db.prepare(`PRAGMA table_info(${tableName})`).all();
  const exists = (info.results || []).some((column) => column.name === columnName);
  if (!exists) {
    await db.prepare(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${type}`).run();
  }
}

function clampInteger(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(Math.max(number, min), max);
}

function normalizeEarthquakePresetRow(row) {
  return {
    id: String(row.id),
    label: String(row.label || ""),
    date: String(row.date || ""),
    time: String(row.time || ""),
    epicenterName: String(row.epicenterName || ""),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    depthKm: Number(row.depthKm),
    magnitude: Number(row.magnitude),
    maxIntensity: String(row.maxIntensity || ""),
    observedStations: parseJsonArray(row.observedStationsJson),
    eewForecastAreas: parseJsonArray(row.eewForecastAreasJson),
    eewReports: parseJsonArray(row.eewReportsJson),
  };
}

function normalizeEarthquakePresetForStorage(preset) {
  const id = String(preset?.id || "").trim();
  if (!id) {
    throw httpError("preset.id is required", 400);
  }

  return {
    id,
    label: String(preset.label || ""),
    date: String(preset.date || ""),
    time: String(preset.time || ""),
    epicenterName: String(preset.epicenterName || ""),
    latitude: Number(preset.latitude),
    longitude: Number(preset.longitude),
    depthKm: Number(preset.depthKm),
    magnitude: Number(preset.magnitude),
    maxIntensity: String(preset.maxIntensity || ""),
    observedStations: Array.isArray(preset.observedStations) ? preset.observedStations : [],
    eewForecastAreas: Array.isArray(preset.eewForecastAreas) ? preset.eewForecastAreas : [],
    eewReports: Array.isArray(preset.eewReports) ? preset.eewReports : [],
  };
}

function parseJsonArray(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function pruneNotificationHistory(notifications, now = Date.now()) {
  return notifications
    .filter((item) => {
      if (!item?.id) {
        return false;
      }
      const createdAtMs = Date.parse(item.createdAt || "");
      return !Number.isFinite(createdAtMs) || now - createdAtMs < NOTIFICATION_HISTORY_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    })
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    .slice(0, NOTIFICATION_HISTORY_LIMIT)
    .map((item) => ({
      id: String(item.id),
      title: String(item.title || "WE-Simulator").slice(0, 80),
      body: String(item.body || "").slice(0, 300),
      createdAt: item.createdAt || new Date().toISOString(),
      source: item.source || "remote",
    }));
}

function validateSubscription(subscription) {
  if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
    throw httpError("invalid push subscription", 400);
  }
}

async function isCommunityAdminRequest(request, env) {
  try {
    const account = await requireCommunityAccount(request, env);
    return Boolean(account?.isAdmin);
  } catch (error) {
    return false;
  }
}

function requireAdmin(request, env) {
  const expectedToken = env.ADMIN_NOTIFY_TOKEN;
  const actualToken = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");

  if (!expectedToken || actualToken !== expectedToken) {
    throw httpError("unauthorized", 401);
  }
}

function isWorkerAdminRequest(request, env) {
  const expectedToken = String(env.ADMIN_NOTIFY_TOKEN || "");
  const actualToken = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "") || "";
  return Boolean(expectedToken) && actualToken === expectedToken;
}

async function subscriptionKey(endpoint) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(endpoint));
  return arrayBufferToBase64Url(digest);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function httpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function base64UrlEncode(value) {
  return arrayBufferToBase64Url(new TextEncoder().encode(value));
}

function arrayBufferToBase64Url(value) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToUint8Array(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}
