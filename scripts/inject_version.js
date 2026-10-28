#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const repoRoot = path.join(__dirname, '..');
const pkgPath = path.join(repoRoot, 'package.json');
const indexPath = path.join(repoRoot, 'web', 'index.html');
const manifestPath = path.join(repoRoot, 'web', 'manifest.webmanifest');
const swPath = path.join(repoRoot, 'web', 'sw.js');

if (!fs.existsSync(pkgPath)) {
  console.error('package.json not found at', pkgPath);
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error('web/index.html not found at', indexPath);
  process.exit(1);
}

if (!fs.existsSync(manifestPath)) {
  console.error('web/manifest.webmanifest not found at', manifestPath);
  process.exit(1);
}

const pkg = readJSON(pkgPath);
const displayVersion = pkg.displayVersion || pkg.version || String(Date.now());
const originalHtml = fs.readFileSync(indexPath, 'utf8');
const originalManifestText = fs.readFileSync(manifestPath, 'utf8');
const originalSw = fs.readFileSync(swPath, 'utf8');
const assetPattern = /(?:href|src)=["'](\.\/[^"'?]+)(?:\?v=[^"']*)?["']/g;
const localAssets = [...new Set([...originalHtml.matchAll(assetPattern)].map((match) => match[1]))];
// Content changes must invalidate caches even when the display version stays the same.
// Normalize generated values so running this script twice produces identical files.
const fingerprint = crypto.createHash('sha256');
fingerprint.update(String(displayVersion));
fingerprint.update(originalHtml
  .replace(/<meta name="application-version" content="[^"]*"\s*\/?>/, '')
  .replace(/\?v=[^"']*/g, '').replace(/\r\n/g, '\n'));
fingerprint.update(originalManifestText.replace(/\?v=[^"']*/g, '').replace(/\r\n/g, '\n'));
fingerprint.update(originalSw
  .replace(/const CACHE_NAME = "[^"]*";/, 'const CACHE_NAME = "";')
  .replace(/const APP_SHELL = \[[\s\S]*?\];/, 'const APP_SHELL = [];')
  .replace(/\r\n/g, '\n'));
for (const asset of localAssets.filter((asset) => !asset.endsWith('.webmanifest'))) {
  fingerprint.update(asset);
  fingerprint.update(fs.readFileSync(path.join(repoRoot, 'web', asset)));
}
const version = process.env.GITHUB_SHA
  ? process.env.GITHUB_SHA.slice(0, 12)
  : fingerprint.digest('hex').slice(0, 12);

let html = originalHtml;

// Keep the visible release number independent of the deploy's cache key.
const escapedDisplayVersion = String(displayVersion).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const versionMeta = '<meta name="application-version" content="' + escapedDisplayVersion + '" />';
if (html.includes('name="application-version"')) {
  html = html.replace(/<meta name="application-version" content="[^"]*"\s*\/?>/, versionMeta);
} else {
  html = html.replace('</head>', '  ' + versionMeta + '\n  </head>');
}

// Give every local UI asset the same deploy key, including appearance overrides.
html = html.replace(assetPattern, (reference, asset) => reference.replace(
  /\.\/[^"']+/, asset + '?v=' + version,
));

if (html !== originalHtml) {
  fs.writeFileSync(indexPath, html, 'utf8');
}

const manifest = JSON.parse(originalManifestText);
if (Array.isArray(manifest.icons)) {
  manifest.icons = manifest.icons.map((icon) => {
    if (!icon || typeof icon.src !== 'string') {
      return icon;
    }

    return {
      ...icon,
      src: icon.src.replace(/(?:\?v=.*)?$/, '?v=' + version),
    };
  });
}

const manifestText = JSON.stringify(manifest, null, 2) + '\n';
if (manifestText !== originalManifestText) {
  fs.writeFileSync(manifestPath, manifestText, 'utf8');
}
// Precache the exact URLs used by HTML so an offline launch has matching CSS/JS.
const appShell = [...new Set([
  './', './index.html',
  ...localAssets.map((asset) => asset + '?v=' + version),
  './push-config.json',
])];
const sw = originalSw
  .replace(/const CACHE_NAME = "[^"]*";/, 'const CACHE_NAME = "we-simulator-pwa-' + version + '";')
  .replace(/const APP_SHELL = \[[\s\S]*?\];/, 'const APP_SHELL = ' + JSON.stringify(appShell, null, 2) + ';');
if (sw !== originalSw) {
  fs.writeFileSync(swPath, sw, 'utf8');
}
console.log('Injected cache version', version, 'into HTML, manifest and Service Worker');
