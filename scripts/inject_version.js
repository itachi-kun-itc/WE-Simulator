#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const repoRoot = path.join(__dirname, '..');
const pkgPath = path.join(repoRoot, 'package.json');
const indexPath = path.join(repoRoot, 'web', 'index.html');

if (!fs.existsSync(pkgPath)) {
  console.error('package.json not found at', pkgPath);
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error('web/index.html not found at', indexPath);
  process.exit(1);
}

const pkg = readJSON(pkgPath);
const version = pkg.version || String(Date.now());

let html = fs.readFileSync(indexPath, 'utf8');

// Replace known local asset references to add ?v=version
html = html.replace(/\.\/styles\.css(?:\?v=[^"']*)?/g, './styles.css?v=' + version);
html = html.replace(/\.\/app\.js(?:\?v=[^"']*)?/g, './app.js?v=' + version);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Injected version', version, 'into web/index.html');
