const CACHE_NAME = "we-simulator-pwa-v1";
const NOTIFICATION_HISTORY_DB_NAME = "we-simulator-notification-history";
const NOTIFICATION_HISTORY_DB_VERSION = 1;
const NOTIFICATION_HISTORY_STORE_NAME = "notifications";
const NOTIFICATION_HISTORY_LIMIT = 80;
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./push-config.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});

self.addEventListener("push", (event) => {
  event.waitUntil(showPushNotification(event));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "./";

  event.waitUntil(
    self.clients.matchAll({ includeUncontrolled: true, type: "window" }).then((clientList) => {
      const absoluteUrl = new URL(targetUrl, self.registration.scope).href;
      const client = clientList.find((item) => item.url === absoluteUrl);

      if (client) {
        return client.focus();
      }

      return self.clients.openWindow(absoluteUrl);
    }),
  );
});

async function showPushNotification(event) {
  const payload = event.data ? safeJsonParse(event.data.text()) : null;
  const notification = payload || (await fetchLatestNotification()) || {};
  const title = notification.title || "WE-Simulator";
  const historyItem = {
    id: notification.id || `notification-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title,
    body: notification.body || "新しい通知があります。",
    createdAt: notification.createdAt || new Date().toISOString(),
    source: "push",
  };
  await saveNotificationHistoryItem(historyItem);

  const options = {
    body: historyItem.body,
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    tag: notification.tag || "we-simulator-notification",
    renotify: Boolean(notification.renotify),
    data: {
      url: notification.url || "./",
    },
  };

  return self.registration.showNotification(title, options);
}

async function fetchLatestNotification() {
  const config = await loadPushConfig();
  if (!config.workerUrl) {
    return null;
  }

  try {
    const response = await fetch(`${config.workerUrl.replace(/\/+$/, "")}/latest-notification`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.warn("latest notification fetch failed", error);
    return null;
  }
}

async function loadPushConfig() {
  try {
    const response = await fetch("./push-config.json", { cache: "no-store" });
    if (!response.ok) {
      return {};
    }

    return response.json();
  } catch (error) {
    console.warn("push config fetch failed", error);
    return {};
  }
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

async function saveNotificationHistoryItem(notification) {
  if (!self.indexedDB || !notification?.id) {
    return;
  }

  try {
    const db = await openNotificationHistoryDb();
    await runNotificationHistoryTransaction(db, "readwrite", (store) => {
      store.put(notification);
    });
    await trimNotificationHistory(db);
    await notifyNotificationHistoryUpdated();
  } catch (error) {
    console.warn("notification history save failed", error);
  }
}

async function notifyNotificationHistoryUpdated() {
  const clientList = await self.clients.matchAll({ includeUncontrolled: true, type: "window" });
  clientList.forEach((client) => {
    client.postMessage({ type: "notification-history-updated" });
  });
}

function openNotificationHistoryDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(NOTIFICATION_HISTORY_DB_NAME, NOTIFICATION_HISTORY_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(NOTIFICATION_HISTORY_STORE_NAME)) {
        db.createObjectStore(NOTIFICATION_HISTORY_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function runNotificationHistoryTransaction(db, mode, callback) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION_HISTORY_STORE_NAME, mode);
    callback(transaction.objectStore(NOTIFICATION_HISTORY_STORE_NAME));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

async function trimNotificationHistory(db) {
  const items = await new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION_HISTORY_STORE_NAME, "readonly");
    const request = transaction.objectStore(NOTIFICATION_HISTORY_STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
  const extraItems = items
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    .slice(NOTIFICATION_HISTORY_LIMIT);
  if (extraItems.length === 0) {
    return;
  }

  await runNotificationHistoryTransaction(db, "readwrite", (store) => {
    extraItems.forEach((item) => store.delete(item.id));
  });
}
