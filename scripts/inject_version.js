#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const repoRoot = path.join(__dirname, '..');
const pkgPath = path.join(repoRoot, 'package.json');
const indexPath = path.join(repoRoot, 'web', 'index.html');
const manifestPath = path.join(repoRoot, 'web', 'manifest.webmanifest');

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
const version = process.env.GITHUB_SHA
  ? process.env.GITHUB_SHA.slice(0, 12)
  : pkg.version || String(Date.now());

const originalHtml = fs.readFileSync(indexPath, 'utf8');
let html = originalHtml;

// Replace known local asset references to add ?v=version
html = html.replace(/\.\/styles\.css(?:\?v=[^"']*)?/g, './styles.css?v=' + version);
html = html.replace(/\.\/app\.js(?:\?v=[^"']*)?/g, './app.js?v=' + version);
html = html.replace(/\.\/manifest\.webmanifest(?:\?v=[^"']*)?/g, './manifest.webmanifest?v=' + version);
html = html.replace(/\.\/favicon\.png(?:\?v=[^"']*)?/g, './favicon.png?v=' + version);
html = html.replace(/\.\/apple-touch-icon\.png(?:\?v=[^"']*)?/g, './apple-touch-icon.png?v=' + version);

if (html !== originalHtml) {
  fs.writeFileSync(indexPath, html, 'utf8');
}

const originalManifestText = fs.readFileSync(manifestPath, 'utf8');
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
console.log('Injected version', version, 'into web/index.html and web/manifest.webmanifest');
