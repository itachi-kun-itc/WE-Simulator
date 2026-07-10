const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "authorization,content-type",
};

const LATEST_NOTIFICATION_KEY = "latest-notification";
const NOTIFICATION_HISTORY_KEY = "notification-history";
const NOTIFICATION_HISTORY_LIMIT = 80;
const NOTIFICATION_HISTORY_RETENTION_DAYS = 30;
const SUBSCRIPTION_PREFIX = "subscription:";
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
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    try {
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

      if (request.method === "GET" && url.pathname === "/earthquake-presets") {
        const presets = await listEarthquakePresetSummaries(env);
        return json({ presets });
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
        await env.PUSH_SUBSCRIPTIONS.put(`${SUBSCRIPTION_PREFIX}${key}`, JSON.stringify(subscription));
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
        requireAdmin(request, env);
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

async function listSubscriptions(env) {
  const subscriptions = [];
  let cursor;

  do {
    const page = await env.PUSH_SUBSCRIPTIONS.list({ prefix: SUBSCRIPTION_PREFIX, cursor });
    await Promise.all(
      page.keys.map(async ({ name }) => {
        const subscription = await env.PUSH_SUBSCRIPTIONS.get(name, "json");
        if (subscription?.endpoint) {
          subscriptions.push({ key: name, subscription });
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
  if (!env.EARTHQUAKE_PRESETS_DB) {
    throw httpError("EARTHQUAKE_PRESETS_DB is not configured", 500);
  }
  return env.EARTHQUAKE_PRESETS_DB;
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

function requireAdmin(request, env) {
  const expectedToken = env.ADMIN_NOTIFY_TOKEN;
  const actualToken = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");

  if (!expectedToken || actualToken !== expectedToken) {
    throw httpError("unauthorized", 401);
  }
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
