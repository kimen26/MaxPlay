// gate.mjs — garde locale avant `git push` (R01/R08 vague 1, 2026-09-28).
//
//   1. npm run check (rapide, bloquant).
//   2. jeux touchés = union de :
//        - git diff --name-only origin/master...HEAD -- site/mj-*.html (committé, pas encore sur origin)
//        - git status --porcelain -- site/mj-*.html (pas encore committé)
//      pour chacun : node studio/minijeux/tests/run.mjs <mj-XX> (gameplay réel, Playwright).
//   3. si tout est vert : écrit studio/minijeux/tests/.artifacts/GREEN.json
//      { sha: <git rev-parse HEAD>, date: <ISO>, jeux: [...] }.
//      Ce fichier est lu par un hook `git push` (autre agent) : chemin et clé
//      `sha` à garder EXACTEMENT tels quels.
//      Si rouge : exit 1 sans écrire, et supprime un GREEN.json périmé s'il existe
//      (jamais laisser un push croire à un vert obsolète).
//
// Usage : npm run gate   (ou node studio/minijeux/tests/gate.mjs)

import { execSync, spawnSync } from 'node:child_process';
import { writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..', '..', '..');
const ARTIFACTS_DIR = resolve(__dir, '.artifacts');
const GREEN_PATH = resolve(ARTIFACTS_DIR, 'GREEN.json');

const GREEN = '\x1b[32m', RED = '\x1b[31m', DIM = '\x1b[2m', RST = '\x1b[0m';

function clearGreen() {
  if (existsSync(GREEN_PATH)) rmSync(GREEN_PATH);
}

function runInherit(cmd, args) {
  const r = spawnSync(cmd, args, {
    stdio: 'inherit',
    cwd: ROOT,
    shell: process.platform === 'win32',
  });
  return r.status ?? 1;
}

function sh(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: 'utf8' });
  } catch (e) {
    // git peut sortir non-zéro (ex: pas de remote joignable) — on récupère
    // quand même la sortie partielle plutôt que de planter le gate dessus.
    return e.stdout ? e.stdout.toString() : '';
  }
}

function extractMjIds(text) {
  const ids = new Set();
  for (const m of text.matchAll(/site\/(mj-[a-zA-Z0-9]+)\.html/g)) ids.add(m[1]);
  return ids;
}

// ── 1. npm run check ─────────────────────────────────────────────────────
console.log(`\n${DIM}── gate : npm run check ──${RST}`);
const checkExit = runInherit('npm', ['run', 'check']);
if (checkExit !== 0) {
  console.error(`\n${RED}✗ gate : npm run check a échoué${RST}`);
  clearGreen();
  process.exit(1);
}

// ── 2. jeux touchés ───────────────────────────────────────────────────────
const diffOut = sh('git diff --name-only origin/master...HEAD -- site/mj-*.html');
const statusOut = sh('git status --porcelain -- site/mj-*.html');
const touched = [...new Set([...extractMjIds(diffOut), ...extractMjIds(statusOut)])].sort();

console.log(`${DIM}── gate : jeux touchés = ${touched.length ? touched.join(', ') : '(aucun)'} ──${RST}`);

let allGreen = true;
const jeuxVerts = [];
for (const id of touched) {
  console.log(`\n${DIM}── gate : run.mjs ${id} ──${RST}`);
  const exit = runInherit('node', ['studio/minijeux/tests/run.mjs', id]);
  if (exit !== 0) {
    allGreen = false;
    console.error(`${RED}✗ gate : ${id} en échec${RST}`);
  } else {
    jeuxVerts.push(id);
  }
}

if (!allGreen) {
  console.error(`\n${RED}✗ gate : au moins un jeu touché a échoué — GREEN.json non écrit${RST}`);
  clearGreen();
  process.exit(1);
}

// ── 3. GREEN.json ────────────────────────────────────────────────────────
const sha = sh('git rev-parse HEAD').trim();
mkdirSync(ARTIFACTS_DIR, { recursive: true });
writeFileSync(GREEN_PATH, JSON.stringify({ sha, date: new Date().toISOString(), jeux: jeuxVerts }, null, 2) + '\n');
console.log(`\n${GREEN}✓ gate : vert (sha ${sha.slice(0, 8)}, ${jeuxVerts.length} jeu(x) rejoué(s)) — GREEN.json écrit${RST}\n`);
process.exit(0);
