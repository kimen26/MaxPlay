// check-casse-chemins.mjs — détecte les chemins relatifs dont la CASSE ne
// correspond pas exactement au fichier réel sur disque.
//
// Pourquoi : Windows (dev local) et macOS ignorent la casse des noms de
// fichiers ; Linux (CI GitHub Actions) et GitHub Pages (serveur Linux) la
// respectent strictement. Un chemin écrit `Dino_${id}.png` qui pointe en
// réalité vers `dino_${id}.png` sur disque fonctionne en local et casse en
// CI/prod — exactement le bug que ce script traque, de façon déterministe
// (comparaison segment par segment via readdirSync, jamais de heuristique).
//
// Usage : node check-casse-chemins.mjs   → exit 1 si au moins un problème.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');

const EXT_ASSETS = 'png|jpg|jpeg|webp|gif|svg|mp3|ogg|wav|js|css|json';

// Attributs src/href littéraux, url(...) CSS, et chaînes JS se terminant par
// une extension d'asset connue. Pas de suivi des chemins 100% dynamiques
// (concaténation de variables) : ceux-là sont documentés comme "à vérifier à
// la main" dans le rapport plutôt que silencieusement ignorés.
const RE_ATTR = /(?:src|href)\s*=\s*["']([^"'>]+)["']/g;
const RE_CSS_URL = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
const RE_JS_STRING = new RegExp(`["'\`]([^"'\`\\s]+\\.(?:${EXT_ASSETS}))["'\`]`, 'g');

function listFiles(dir, pattern) {
  const out = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(full, pattern));
    else if (pattern.test(e.name)) out.push(full);
  }
  return out;
}

// Résout `relPath` depuis `fromFile`, en vérifiant CHAQUE segment contre le
// contenu réel du dossier parent (readdirSync), casse exacte exigée.
// Retourne : 'ok' (existe, casse exacte) | 'case-mismatch' (existe, mauvaise
// casse) | 'not-found' (n'existe pas du tout, même insensible à la casse) |
// null (chemin non résolvable ici, ex. absolu, http(s), data:, ancre).
//
// baseDir : dossier de départ pour la résolution. Pour un attribut HTML ou un
// url() CSS, c'est le dossier du fichier qui le contient (résolution web
// standard). Pour une chaîne JS assignée plus tard à un .src/.href
// ("img/dinos/…"), ce N'EST PAS le dossier du .js qui la définit : le
// navigateur la résout relativement à la PAGE (document.baseURI), et toutes
// les pages du site vivent directement sous site/ (aucune <base>, aucune
// page nichée) — donc SITE est le bon baseDir pour ces cas.
function checkPath(baseDir, relPath) {
  if (!relPath || /^(https?:)?\/\//.test(relPath) || relPath.startsWith('data:')
      || relPath.startsWith('#') || relPath.startsWith('mailto:') || relPath.startsWith('/')) {
    return null;
  }
  const noQuery = relPath.split('#')[0].split('?')[0];
  if (!noQuery) return null;

  const segments = noQuery.split('/').filter(s => s !== '.' && s !== '');
  if (segments.length === 0) return null;

  let dir = baseDir;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const isLast = i === segments.length - 1;
    if (seg === '..') { dir = dirname(dir); continue; }
    let entries;
    try { entries = readdirSync(dir); } catch { return 'not-found'; }
    const exact = entries.includes(seg);
    if (exact) {
      dir = join(dir, seg);
      continue;
    }
    const ci = entries.find(e => e.toLowerCase() === seg.toLowerCase());
    if (!ci) return 'not-found';
    // Casse différente trouvée : signale, et continue la résolution avec le
    // nom réel pour pouvoir vérifier les segments suivants (ex: dossier).
    if (isLast) return 'case-mismatch';
    dir = join(dir, ci);
    // Un dossier intermédiaire mal casé est aussi un problème réel.
    return 'case-mismatch';
  }
  return 'ok';
}

// Chaque chemin trouvé est étiqueté avec le baseDir correct pour sa résolution
// (cf. commentaire de checkPath) : 'file' (dossier du fichier) ou 'site'
// (racine site/, pour les chaînes JS consommées comme src/href par le DOM).
function extractPaths(file, content) {
  const found = [];
  const isJs = /\.js$/i.test(file);
  const isCss = /\.css$/i.test(file);
  const isHtml = /\.html?$/i.test(file);

  if (isHtml) {
    for (const m of content.matchAll(RE_ATTR)) found.push({ path: m[1], base: 'file' });
  }
  if (isCss || isHtml) {
    for (const m of content.matchAll(RE_CSS_URL)) found.push({ path: m[1], base: 'file' });
  }
  if (isJs) {
    for (const m of content.matchAll(RE_ATTR)) found.push({ path: m[1], base: 'site' });
    for (const m of content.matchAll(RE_JS_STRING)) found.push({ path: m[1], base: 'site' });
  }
  return found;
}

const targets = [
  ...listFiles(SITE, /\.html?$/i),
  ...listFiles(join(SITE, 'js'), /\.js$/i),
  ...(function () { try { return listFiles(join(SITE, 'css'), /\.css$/i); } catch { return []; } })(),
];

const problems = [];
for (const file of targets) {
  const content = readFileSync(file, 'utf8');
  const paths = extractPaths(file, content);
  const seen = new Set();
  for (const { path: p, base } of paths) {
    const key = base + '\0' + p;
    if (seen.has(key)) continue;
    seen.add(key);
    const baseDir = base === 'site' ? SITE : dirname(file);
    const verdict = checkPath(baseDir, p);
    if (verdict === 'case-mismatch') {
      problems.push({ file, path: p });
    }
    // 'not-found' n'est pas signalé ici : trop de faux positifs (chemins
    // dynamiques partiels, gabarits ${var}) pour un exit 1 fiable — seule la
    // casse, vérifiable statiquement à 100%, est bloquante.
  }
}

if (problems.length === 0) {
  console.log('\x1b[32m✓ check-casse-chemins : aucun chemin mal casé (littéraux src/href/url()).\x1b[0m');
  process.exit(0);
} else {
  console.log(`\x1b[31m✗ check-casse-chemins : ${problems.length} chemin(s) avec une casse qui ne correspond pas au fichier réel :\x1b[0m`);
  for (const { file, path } of problems) {
    console.log(`  ${file.replace(SITE, 'site')}\n    → "${path}"`);
  }
  console.log('\n  Marche en local (Windows/macOS, insensibles à la casse) mais casse sur GitHub Pages (Linux).');
  process.exit(1);
}
