const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const scanRoots = ["web", "scripts", "data"];
const textExtensions = new Set([
  ".cjs",
  ".cpg",
  ".csv",
  ".css",
  ".geojson",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".prj",
  ".tsv",
  ".txt",
  ".webmanifest",
  ".xml",
  ".yaml",
  ".yml",
]);
const textBasenames = new Set([
  ".editorconfig",
  ".gitattributes",
  ".gitignore",
  "CHANGELOG",
  "LICENSE",
  "package-lock.json",
  "package.json",
  "README",
  "VERSION",
]);
const skippedDirectories = new Set([
  ".agents",
  ".codex",
  ".git",
  "node_modules",
  "raw",
  "tmp",
]);
const decoder = new TextDecoder("utf-8", { fatal: true });

const suspiciousPatterns = [
  new RegExp(
    "[\\u7E3A\\u7E5D\\u8768\\u9AF4\\u8B5B\\u9695\\u9A3E\\u9082\\u8708\\u87DF\\u8373\\u7E32\\u90E2\\u90B5\\u965C\\u9677\\u9B2E\\u96CE\\u96B4\\u9711\\u8C7C\\u9A4D\\u86FB\\u96A7\\u8B41\\u7AD1\\u8ACF\\u839E\\u83A8\\u96B1\\u86CE\\u8B7D]{2,}",
    "u",
  ),
  new RegExp(
    "\\uFFFD",
    "u",
  ),
  new RegExp(
    "(?:[\\u3040-\\u30FF\\u4E00-\\u9FFF]E|E[\\u3040-\\u30FF\\u4E00-\\u9FFF\\u30FB]|\\u30C1EE|\\u30B5\\u30FC\\u30D0E|\\u6D41E|\\u80C1|\\u5581)",
    "u",
  ),
];

let failed = false;
let reportedErrors = 0;
let hiddenErrors = 0;
const maxReportedErrors = 40;
const targets = collectTextTargets();

for (const relativePath of targets) {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) {
    continue;
  }

  const buffer = fs.readFileSync(file);
  if (buffer.includes(0)) {
    reportError(`${relativePath}: contains a NUL byte`);
    continue;
  }

  let text = "";
  try {
    text = decoder.decode(buffer);
  } catch {
    reportError(`${relativePath}: is not valid UTF-8`);
    continue;
  }

  const match = suspiciousPatterns.map((pattern) => pattern.exec(text)).find(Boolean);
  if (!match) {
    continue;
  }

  const before = text.slice(0, match.index);
  const line = before.split(/\r?\n/).length;
  const column = before.length - before.lastIndexOf("\n");
  const lineText = text.split(/\r?\n/)[line - 1]?.trim() ?? "";
  reportError(
    `${relativePath}:${line}:${column} suspicious mojibake fragment ${JSON.stringify(match[0])}: ${lineText}`,
  );
}

if (failed) {
  if (hiddenErrors > 0) {
    console.error(`...and ${hiddenErrors} more encoding issue(s).`);
  }
  console.error("Text encoding check failed. Save files as UTF-8 and fix mojibake before running or deploying.");
  process.exit(1);
}

console.log("Text encoding check passed.");

function reportError(message) {
  failed = true;
  if (reportedErrors < maxReportedErrors) {
    console.error(message);
    reportedErrors += 1;
    return;
  }

  hiddenErrors += 1;
}

function collectTextTargets() {
  const targets = new Set();
  for (const rootEntry of scanRoots) {
    collectFromDirectory(path.join(root, rootEntry), targets);
  }
  for (const basename of textBasenames) {
    const file = path.join(root, basename);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      targets.add(basename);
    }
  }

  return [...targets].sort((a, b) => a.localeCompare(b, "en"));
}

function collectFromDirectory(directory, targets) {
  if (!fs.existsSync(directory)) {
    return;
  }

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) {
        collectFromDirectory(path.join(directory, entry.name), targets);
      }
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const filePath = path.join(directory, entry.name);
    const relativePath = path.relative(root, filePath).replace(/\\/g, "/");
    const extension = path.extname(entry.name);
    if (textExtensions.has(extension) || textBasenames.has(entry.name)) {
      targets.add(relativePath);
    }
  }
}
