const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const preferredPort = Number(process.env.PORT || 5173);
const root = path.resolve(__dirname);
const projectRoot = path.resolve(__dirname, "..");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pmtiles": "application/octet-stream",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

const server = http.createServer((request, response) => {
  request.on("error", (error) => {
    console.warn("request error", error);
  });
  response.on("error", (error) => {
    console.warn("response error", error);
  });

  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/api/notify") {
    handleNotificationProxy(request, response);
    return;
  }

  const requestPath =
    url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const filePath = path.resolve(root, requestPath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stat) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    if (!stat.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const contentType = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    const range = parseRangeHeader(request.headers.range, stat.size);

    if (range === null) {
      response.writeHead(200, {
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-store, max-age=0",
        "Content-Length": stat.size,
        "Content-Type": contentType,
      });
      streamFile(filePath, response);
      return;
    }

    if (range === false) {
      response.writeHead(416, {
        "Content-Range": `bytes */${stat.size}`,
      });
      response.end();
      return;
    }

    response.writeHead(206, {
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store, max-age=0",
      "Content-Length": range.end - range.start + 1,
      "Content-Range": `bytes ${range.start}-${range.end}/${stat.size}`,
      "Content-Type": contentType,
    });
    streamFile(filePath, response, range);
  });
});

server.on("clientError", (error, socket) => {
  console.warn("client error", error.message);
  if (socket.writable) {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  }
});

listen(preferredPort);

function listen(port) {
  const onError = (error) => {
    if (error.code === "EADDRINUSE") {
      server.off("listening", onListening);
      listen(port + 1);
      return;
    }

    throw error;
  };

  const onListening = () => {
    server.off("error", onError);
    console.log(`Serving http://127.0.0.1:${port}/`);
  };

  server.once("error", onError);
  server.once("listening", onListening);
  server.listen(port, "127.0.0.1");
}

function streamFile(filePath, response, range = null) {
  const stream = range ? fs.createReadStream(filePath, range) : fs.createReadStream(filePath);
  stream.on("error", (error) => {
    console.warn("file stream error", error);
    if (!response.headersSent) {
      response.writeHead(500);
    }
    response.end("Server error");
  });
  response.on("close", () => {
    stream.destroy();
  });
  stream.pipe(response);
}

async function handleNotificationProxy(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
    });
    response.end();
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  try {
    const [config, env] = await Promise.all([readPushConfig(), readLocalEnv()]);
    const workerUrl = String(config.workerUrl || "").replace(/\/+$/, "");
    const token = env.ADMIN_NOTIFY_TOKEN;

    if (!workerUrl) {
      sendJson(response, 500, { ok: false, message: "Worker URL is not configured" });
      return;
    }

    if (!token) {
      sendJson(response, 500, { ok: false, message: "ADMIN_NOTIFY_TOKEN is not configured" });
      return;
    }

    const body = await readRequestBody(request);
    const workerResponse = await fetch(`${workerUrl}/notify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body,
    });
    const text = await workerResponse.text();

    response.writeHead(workerResponse.status, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": workerResponse.headers.get("content-type") || "application/json; charset=utf-8",
    });
    response.end(text);
  } catch (error) {
    sendJson(response, 500, { ok: false, message: error.message || "Notification proxy failed" });
  }
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
}

function parseRangeHeader(header, size) {
  if (!header) {
    return null;
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match) {
    return false;
  }

  let start = match[1] === "" ? null : Number(match[1]);
  let end = match[2] === "" ? null : Number(match[2]);

  if (start === null && end === null) {
    return false;
  }

  if (start === null) {
    start = Math.max(size - end, 0);
    end = size - 1;
  } else if (end === null) {
    end = size - 1;
  }

  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || end < start || start >= size) {
    return false;
  }

  return { start, end: Math.min(end, size - 1) };
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

async function readPushConfig() {
  try {
    return JSON.parse(await fs.promises.readFile(path.join(root, "push-config.json"), "utf8"));
  } catch (error) {
    return {};
  }
}

async function readLocalEnv() {
  try {
    const text = await fs.promises.readFile(path.join(projectRoot, ".env"), "utf8");
    return Object.fromEntries(
      text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => {
          const index = line.indexOf("=");
          return [line.slice(0, index), line.slice(index + 1)];
        }),
    );
  } catch (error) {
    return {};
  }
}
