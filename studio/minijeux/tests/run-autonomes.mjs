// run-autonomes.mjs — HARNAIS BATCH des specs AUTONOMES (EP-038 / audit 2026-09-25).
//
// run-all.mjs ne lance que les mj-XX du menu (catalog.js) : les specs qui testent
// un moteur/écran transverse (armoire, mur-nid, collection, i18n dinos…) ou un
// mj-XX hors catalogue (mj-golden-nid, mj-49-nid…) n'ont jamais de filet — c'est
// ainsi que nid-e2e est resté rouge des semaines sans que personne ne le voie
// (HO-MJ-21). Ce lanceur les exécute TOUTES d'un coup, résume PASS/FAIL, sort en
// code ≠ 0 si une échoue.
//
// Usage :
//   node run-autonomes.mjs            → toutes les specs autonomes
//   node run-autonomes.mjs --json     → sortie JSON (CI / agents)
//
// Découverte : tout *.spec.mjs / *.test.mjs de ce dossier dont l'id ne figure PAS
// dans catalog.js (déjà couvert par run-all.mjs). Deux familles :
//   - AUTONOME pur : le fichier contient son propre `process.exit(...)` → lancé
//     directement (`node <fichier>`).
//   - Piloté par run.mjs (format `export async function run({page, ok})`) mais
//     jamais atteint par run-all car son id n'est pas un jeu du menu → lancé via
//     `node run.mjs <id> [html]` (chemin html donné dans RUN_MJS_SPECS ci-dessous,
//     copié des en-têtes "Usage :" de chaque fichier).
// Une spec qui ne rentre dans aucune des deux familles est signalée EN ÉCHEC
// plutôt qu'ignorée en silence — mieux vaut un faux rouge à trier qu'un trou.
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const asJson = process.argv.includes('--json');
const G = '\x1b[32m', R = '\x1b[31m', Y = '\x1b[33m', D = '\x1b[2m', X = '\x1b[0m';

function menuIds() {
  const cat = resolve(SITE, 'js', 'catalog.js');
  const src = readFileSync(cat, 'utf8');
  const ids = [];
  for (const m of src.matchAll(/id:\s*'(mj-[^']+)'/g)) if (!ids.includes(m[1])) ids.push(m[1]);
  return ids;
}

// Specs orphelines pilotées par run.mjs (jamais un id du menu) : id → html
// (relatif à ce dossier), ou omis pour laisser run.mjs prendre site/<id>.html.
const RUN_MJS_SPECS = {
  'index': null,
  'mj-golden-nid': '../../../site/mj-24.html',
  'mj-golden-savefail': '../../../site/mj-24.html',
  'mj-49-nid': '../../../site/mj-49.html',
};

const catalog = menuIds();
const files = readdirSync(__dir).filter(f => /\.(spec|test)\.mjs$/.test(f));

const rows = [];
let hadFail = false;

for (const file of files.sort()) {
  const id = file.replace(/\.(spec|test)\.mjs$/, '');
  if (catalog.includes(id)) continue; // déjà couvert par run-all.mjs

  const full = resolve(__dir, file);
  const src = readFileSync(full, 'utf8');
  let r, mode;

  if (/process\.exit\(/.test(src)) {
    mode = 'autonome';
    r = spawnSync('node', [file], { cwd: __dir, encoding: 'utf8' });
  } else if (Object.prototype.hasOwnProperty.call(RUN_MJS_SPECS, id)) {
    mode = 'run.mjs';
    const html = RUN_MJS_SPECS[id];
    const args = html ? ['run.mjs', id, html] : ['run.mjs', id];
    r = spawnSync('node', args, { cwd: __dir, encoding: 'utf8' });
  } else {
    // Format inconnu : ni process.exit propre, ni mapping run.mjs déclaré.
    // On ne l'ignore pas — signalé en échec pour forcer un tri explicite.
    rows.push({ id, file, mode: 'INCONNU', status: 'FAIL', detail: 'ni process.exit() ni entrée RUN_MJS_SPECS — ajouter le mapping ou vérifier le format' });
    hadFail = true;
    if (!asJson) process.stdout.write(`${R}?${X}`);
    continue;
  }

  const ok = r.status === 0;
  if (!ok) hadFail = true;
  const out = (r.stdout || '') + (r.stderr || '');
  rows.push({
    id, file, mode,
    status: ok ? 'PASS' : 'FAIL',
    detail: ok ? '' : out.split('\n').filter(l => /FAIL|✗|Error|error/.test(l)).slice(0, 4).join(' | '),
  });
  if (!asJson) process.stdout.write(ok ? `${G}.${X}` : `${R}F${X}`);
}

if (asJson) {
  console.log(JSON.stringify({ hadFail, total: rows.length, rows }, null, 2));
  process.exit(hadFail ? 1 : 0);
}

console.log('\n');
for (const r of rows) {
  const tag = r.status === 'PASS' ? `${G}PASS${X}` : `${R}${r.status}${X}`;
  console.log(`  ${tag}  ${r.id}${D} (${r.mode})${X}${r.detail ? `\n        ${D}→ ${r.detail}${X}` : ''}`);
}
const pass = rows.filter(r => r.status === 'PASS').length;
const fail = rows.filter(r => r.status === 'FAIL').length;
console.log(`\n════════════════════════════════════════════`);
console.log(`  ${rows.length} specs autonomes · ${G}${pass} PASS${X} · ${R}${fail} FAIL${X}`);
console.log(`════════════════════════════════════════════`);
console.log(hadFail ? `${R}✗ au moins une spec autonome cassée${X}\n` : `${G}✓ toutes les specs autonomes passent${X}\n`);
process.exit(hadFail ? 1 : 0);
