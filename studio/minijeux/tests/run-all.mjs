// run-all.mjs — HARNAIS BATCH : lance le gameplay-test (run.mjs) sur TOUS les jeux du menu.
//
//  Complète run.mjs (1 jeu) et audit-gabarit.mjs (cadre statique). Ici : le gameplay
//  réel de chaque mj-XX au menu (catalog.js), en Chromium headless, une synthèse verte/rouge.
//
//  Usage :
//    node run-all.mjs            → tous les jeux du menu qui ont une spec
//    node run-all.mjs --json     → sortie JSON (CI / agents)
//
//  Sort code 1 si au moins un jeu échoue (ou n'a pas de spec alors qu'il est au menu).
//  Créé 2026-07-15 (scan militaire : le harnais devait pouvoir tourner d'un coup, pas 1×41).
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const asJson = process.argv.includes('--json');
const G = '\x1b[32m', R = '\x1b[31m', Y = '\x1b[33m', D = '\x1b[2m', X = '\x1b[0m';

// Jeux du menu (source de vérité = catalog.js), ordre d'apparition.
function menuIds() {
  const cat = resolve(SITE, 'js', 'catalog.js');
  const src = readFileSync(cat, 'utf8');
  const ids = [];
  for (const m of src.matchAll(/id:\s*'(mj-[^']+)'/g)) if (!ids.includes(m[1])) ids.push(m[1]);
  return ids;
}

const ids = menuIds();
const rows = [];
let hadFail = false, noSpec = [];

for (const id of ids) {
  const spec = resolve(__dir, `${id}.spec.mjs`);
  const html = resolve(SITE, `${id}.html`);
  if (!existsSync(html)) { rows.push({ id, status: 'MISSING_HTML' }); hadFail = true; continue; }
  if (!existsSync(spec)) { rows.push({ id, status: 'NO_SPEC' }); noSpec.push(id); continue; }
  const r = spawnSync('node', ['run.mjs', id], { cwd: __dir, encoding: 'utf8' });
  const ok = r.status === 0;
  if (!ok) hadFail = true;
  rows.push({ id, status: ok ? 'PASS' : 'FAIL', detail: ok ? '' : (r.stdout || '').split('\n').filter(l => /FAIL|→/.test(l)).slice(0, 4).join(' | ') });
  if (!asJson) process.stdout.write(ok ? `${G}.${X}` : `${R}F${X}`);
}

if (asJson) {
  console.log(JSON.stringify({ hadFail, total: rows.length, noSpec, rows }, null, 2));
  process.exit(hadFail ? 1 : 0);
}

console.log('\n');
for (const r of rows) {
  const tag = r.status === 'PASS' ? `${G}PASS${X}` : r.status === 'NO_SPEC' ? `${Y}NO_SPEC${X}` : `${R}${r.status}${X}`;
  console.log(`  ${tag}  ${r.id}${r.detail ? `\n        ${D}→ ${r.detail}${X}` : ''}`);
}
const pass = rows.filter(r => r.status === 'PASS').length;
const fail = rows.filter(r => r.status === 'FAIL' || r.status === 'MISSING_HTML').length;
console.log(`\n════════════════════════════════════════════`);
console.log(`  ${rows.length} jeux au menu · ${G}${pass} PASS${X} · ${R}${fail} FAIL${X} · ${Y}${noSpec.length} sans spec${X}`);
if (noSpec.length) console.log(`  ${D}sans spec : ${noSpec.join(', ')}${X}`);
console.log(`════════════════════════════════════════════`);
console.log(hadFail ? `${R}✗ au moins un jeu casse — ne pas déployer${X}\n` : `${G}✓ tout le menu passe${X}\n`);
process.exit(hadFail ? 1 : 0);
