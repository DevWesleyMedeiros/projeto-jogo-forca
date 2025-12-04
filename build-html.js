// build-html.js (ESM)
// Substitui a tag de script do projeto pela referência ao bundle gerado em dist
// Uso: node build-html.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = process.cwd();
const srcHtml = path.join(projectRoot, 'index.html');
const outHtml = path.join(projectRoot, 'dist', 'index.html');

let html = fs.readFileSync(srcHtml, 'utf8');

// substitui qualquer linha que importe o módulo de entrada por uma única tag apontando para assets-scripts/main.js
html = html.replace(/<script[^>]*src="assets-scripts\/.*?"[^>]*>\s*<\/script>/g, '<script type="module" src="assets-scripts/main.js"></script>');

// garante que dist existe
if (!fs.existsSync(path.join(projectRoot, 'dist'))){
  fs.mkdirSync(path.join(projectRoot, 'dist'), { recursive: true });
}

fs.writeFileSync(outHtml, html, 'utf8');
console.log('Wrote', outHtml);
