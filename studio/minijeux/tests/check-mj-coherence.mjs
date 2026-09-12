#!/usr/bin/env node
// check-mj-coherence.mjs — CONTRÔLE BLOQUANT de cohérence catalogue ↔ disque
// (HO-R09, décision PY D-012).
//
// Livrer un mini-jeu touche 9 emplacements minimum (html, catalog, figée,
// spec Playwright, 4 strings.json i18n, entrée référentiel textes-jeux) —
// sans script, un oubli est invisible jusqu'à ce qu'un enfant tombe dessus
// (incident : mj-58 supprimé le 2026-08-10 est resté vivant dans mur.js).
//
// Ce script vérifie, pour CHAQUE jeu de site/js/catalog.js (source de vérité
// du menu, retire:true excepté) :
//   [BLOQUANT] site/mj-XX.html existe
//   [BLOQUANT] figée studio/minijeux/docs/jeux/figees/mj-XX.md existe
//   [BLOQUANT] spec Playwright studio/minijeux/tests/mj-XX.spec.mjs existe
//   [BLOQUANT] clé mj-XX présente dans les 4 strings.json i18n (fr/en/es-es/pt-br)
//   [BLOQUANT] au moins une entrée mj-XX dans studio/referentiel/textes-jeux.json
//     (sauf golden:false explicite en CLI --sans-golden, aucun jeu n'y échappe
//     aujourd'hui : tout jeu a au moins une consigne ou un texte de règle)
//   [BLOQUANT] si zone définie (Mur), murOrder défini et unique dans sa zone
//
// Et, dans l'autre sens, pour chaque site/mj-*.html sur disque :
//   [BLOQUANT] une entrée catalog.js existe (aucun fichier orphelin)
//
// Usage :
//   node check-mj-coherence.mjs               → tous les jeux du catalogue
//   node check-mj-coherence.mjs mj-46 mj-48    → seulement ces jeux
//   node check-mj-coherence.mjs --json         → sortie JSON (CI/agents)
//
// Sort code 1 si au moins un manque, 0 sinon. Intégré à `npm run check`
// (package.json racine) et à .github/workflows/deploy.yml (via check).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..', '..', '..');
const SITE = resolve(ROOT, 'site');
const FIGEES = resolve(ROOT, 'studio', 'minijeux', 'docs', 'jeux', 'figees');
const I18N_LANGS = ['fr', 'en', 'es-es', 'pt-br'];
const REFERENTIEL = resolve(ROOT, 'studio', 'referentiel', 'textes-jeux.json');
const CATALOG_PATH = resolve(SITE, 'js', 'catalog.js');

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const wanted = args.filter((a) => !a.startsWith('--'));

const GREEN = '\x1b[32m', RED = '\x1b[31m', YEL = '\x1b[33m', DIM = '\x1b[2m', RST = '\x1b[0m';

// ── charge catalog.js (module non-ESM : window.MAXPLAY_CATALOG) ────────────
function loadCatalog() {
  const src = readFileSync(CATALOG_PATH, 'utf8');
  const sandbox = { window: {} };
  // catalog.js est écrit en ES5 attaché à window — vm.runInContext l'exécute tel quel
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window.MAXPLAY_CATALOG || [];
}

const catalog = loadCatalog();
const catalogGames = catalog.filter((e) => e.id && e.id.startsWith('mj-') && !e.retire);
const catalogIds = new Set(catalogGames.map((e) => e.id));

const diskFiles = readdirSync(SITE).filter((f) => /^mj-.*\.html$/.test(f));
const diskIds = new Set(diskFiles.map((f) => f.replace(/\.html$/, '')));

const targets = wanted.length ? wanted : [...catalogIds];

const i18nData = {};
for (const lang of I18N_LANGS) {
  const p = resolve(ROOT, 'studio', 'minijeux', 'i18n', lang, 'strings.json');
  i18nData[lang] = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
}

const referentiel = existsSync(REFERENTIEL) ? JSON.parse(readFileSync(REFERENTIEL, 'utf8')) : [];
const referentielGames = new Set(referentiel.map((e) => e.jeu));

// ── murOrder unique par zone (sur tout le catalogue, pas seulement `targets`) ──
const murOrderConflicts = [];
{
  const byZone = {};
  catalogGames.forEach((e) => {
    if (!e.zone) return;
    const key = e.zone + ':' + (e.murOrder === undefined ? 'undefined' : e.murOrder);
    (byZone[key] = byZone[key] || []).push(e.id);
  });
  Object.entries(byZone).forEach(([key, ids]) => {
    if (ids.length > 1) murOrderConflicts.push(`${key} partagé par ${ids.join(', ')}`);
  });
}

function auditGame(id) {
  const checks = [];
  const add = (name, cond, detail = '') => checks.push({ name, cond, detail });

  const inCatalog = catalogIds.has(id);
  add('présent dans catalog.js (retire != true)', inCatalog, inCatalog ? '' : 'absent ou retire:true');

  add('site/mj-XX.html existe', existsSync(resolve(SITE, `${id}.html`)));

  add('figée docs/jeux/figees/mj-XX.md existe', existsSync(resolve(FIGEES, `${id}.md`)));

  const specPath = resolve(__dir, `${id}.spec.mjs`);
  add('spec Playwright tests/mj-XX.spec.mjs existe', existsSync(specPath));

  for (const lang of I18N_LANGS) {
    const has = i18nData[lang] && Object.prototype.hasOwnProperty.call(i18nData[lang], id);
    add(`clé ${id} dans i18n/${lang}/strings.json`, !!has);
  }

  add('au moins une entrée référentiel (textes-jeux.json)', referentielGames.has(id),
    referentielGames.has(id) ? '' : `aucune ligne "jeu":"${id}" — lancer studio/referentiel/generer/_extraire-textes-jeux.mjs`);

  const entry = catalog.find((e) => e.id === id);
  if (entry && entry.zone) {
    add('murOrder défini (jeu avec zone Mur)', entry.murOrder !== undefined && entry.murOrder !== null);
  }

  return checks;
}

let totalFail = 0;
const results = [];

for (const id of targets) {
  const checks = auditGame(id);
  const fails = checks.filter((c) => !c.cond);
  totalFail += fails.length;
  results.push({ id, checks, fails });
}

// ── orphelins disque : un mj-XX.html sans entrée catalogue ──────────────────
const orphans = [...diskIds].filter((id) => !catalogIds.has(id));
if (orphans.length) totalFail += orphans.length;

// ── conflits murOrder ────────────────────────────────────────────────────
if (murOrderConflicts.length) totalFail += murOrderConflicts.length;

if (asJson) {
  console.log(JSON.stringify({ results, orphans, murOrderConflicts, totalFail }, null, 2));
} else {
  console.log(`\n── check-mj-coherence.mjs — ${targets.length} jeu(x) audité(s) ──\n`);
  for (const r of results) {
    const status = r.fails.length === 0 ? `${GREEN}OK${RST}` : `${RED}MANQUE${RST}`;
    console.log(`${status}  ${r.id}`);
    for (const f of r.fails) {
      console.log(`  ${RED}✗${RST} ${f.name}${f.detail ? DIM + ' — ' + f.detail + RST : ''}`);
    }
  }
  if (orphans.length) {
    console.log(`\n${RED}Orphelins disque (site/mj-*.html sans entrée catalog.js) :${RST}`);
    orphans.forEach((id) => console.log(`  ${RED}✗${RST} ${id}.html`));
  }
  if (murOrderConflicts.length) {
    console.log(`\n${RED}Conflits murOrder (deux jeux au même rang dans la même zone) :${RST}`);
    murOrderConflicts.forEach((c) => console.log(`  ${RED}✗${RST} ${c}`));
  }
  console.log(totalFail === 0
    ? `\n${GREEN}✓ ${targets.length} jeu(x), 0 manque${RST}\n`
    : `\n${RED}✗ ${totalFail} manque(s)${RST}\n`);
}

process.exit(totalFail === 0 ? 0 : 1);
