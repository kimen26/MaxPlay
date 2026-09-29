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
//   node check-mj-coherence.mjs --next-id      → imprime le prochain id mj libre et sort
//
// Sort code 1 si au moins un manque BLOQUANT, 0 sinon. Intégré à `npm run check`
// (package.json racine) et à .github/workflows/deploy.yml (via check).
//
// i18n (D-013, PY 2026-09-13) : seuls fr et en sont RÉELLEMENT servis
// (site/js/lang.js:9 SUPPORTED=['fr','en']) — es-es/pt-br restent vérifiées
// en AVERTISSEMENT (langues préparées mais non branchées), jamais bloquantes.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import vm from 'node:vm';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..', '..', '..');
const SITE = resolve(ROOT, 'site');
const FIGEES = resolve(ROOT, 'studio', 'minijeux', 'docs', 'jeux', 'figees');
const I18N_LANGS_BLOQUANT = ['fr', 'en']; // D-013 : langues réellement servies
const I18N_LANGS_AVERT = ['es-es', 'pt-br']; // préparées, non branchées (lang.js:9)
const I18N_LANGS = [...I18N_LANGS_BLOQUANT, ...I18N_LANGS_AVERT];
const REFERENTIEL = resolve(ROOT, 'studio', 'referentiel', 'textes-jeux.json');
const CATALOG_PATH = resolve(SITE, 'js', 'catalog.js');
const GEN_BUNDLE_SCRIPT = resolve(ROOT, 'studio', 'minijeux', 'scripts', '_gen-mj-strings-bundle.cjs');

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const nextIdOnly = args.includes('--next-id');
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

// ── --next-id : id mj-XX libre, calculé depuis 3 sources (site/, catalog.js,
// figées) — pas depuis une doc qui peut mentir (constat brief : "la doc disait
// mj-54, la réalité est plus loin"). Ne compte que le numéro (mj-13a → 13).
function nextFreeId() {
  const figeeIds = existsSync(FIGEES)
    ? readdirSync(FIGEES).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
    : [];
  const allIds = [...diskIds, ...catalogIds, ...figeeIds];
  let max = 0;
  for (const id of allIds) {
    const m = /^mj-(\d+)/.exec(id);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `mj-${max + 1}`;
}

if (nextIdOnly) {
  console.log(nextFreeId());
  process.exit(0);
}

const targets = wanted.length ? wanted : [...catalogIds];

const i18nData = {};
for (const lang of I18N_LANGS) {
  const p = resolve(ROOT, 'studio', 'minijeux', 'i18n', lang, 'strings.json');
  i18nData[lang] = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
}

const referentiel = existsSync(REFERENTIEL) ? JSON.parse(readFileSync(REFERENTIEL, 'utf8')) : [];
const referentielGames = new Set(referentiel.map((e) => e.jeu));

// ── empreinte bundle i18n (BLOQUANT pour fr/en, D-013) : le bundle
// site/js/gen/i18n/mj-strings.<lang>.js est régénéré par `npm run build`
// (_gen-mj-strings-bundle.cjs) — un bundle périmé sert de vieilles chaînes
// en silence. On recalcule l'empreinte attendue (même format que le
// générateur : `window.MJ_STRINGS = ` + JSON.stringify(data, null, 1) + `;\n`)
// et on compare au fichier réel sans jamais écrire sur disque.
const BUNDLE_DIR = resolve(ROOT, 'site', 'js', 'gen', 'i18n');
const staleBundles = [];
for (const lang of I18N_LANGS_BLOQUANT) {
  if (!i18nData[lang]) continue; // pas de source → rien à comparer (autre check gère l'absence)
  const bundlePath = resolve(BUNDLE_DIR, `mj-strings.${lang}.js`);
  const expected = `// GENERE par studio/minijeux/scripts/_gen-mj-strings-bundle.cjs — ne pas editer a la main.\n`
    + `// Source : studio/minijeux/i18n/${lang}/strings.json\n`
    + `window.MJ_STRINGS = ${JSON.stringify(i18nData[lang], null, 1)};\n`;
  if (!existsSync(bundlePath)) {
    staleBundles.push({ lang, reason: 'bundle absent' });
    continue;
  }
  const actual = readFileSync(bundlePath, 'utf8');
  if (actual !== expected) {
    staleBundles.push({ lang, reason: 'bundle périmé — relancer npm run build' });
  }
}

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

// ── EP-043 (AVERTISSEMENT, non bloquant) : chaque ligne 🔒 d'une figée doit
// porter une source — une date (AAAA-MM-JJ), "Papa Yann"/"PY", un commit, une
// référence D-NNN/L-NNN, ou un numéro d'annotation (#NNNN). Le format réel
// des figées montre que la source est parfois sur la ligne 🔒 elle-même,
// parfois sur une ligne juste au-dessus (note de décision précédant un bloc
// de puces) — d'où une fenêtre de 2 lignes avant. Non bloquant : on liste,
// on ne fait pas échouer `npm run check` (décision : ne pas casser 37 figées
// existantes d'un coup, juste donner le décompte pour prioriser le gravage).
const SOURCE_RE = /(20\d{2}-\d{2}-\d{2})|Papa Yann|(?:^|[^A-Za-z])PY(?:[^A-Za-z]|$)|\bD-\d{3}\b|\bL-\d{3}\b|commit\s+[0-9a-f]{6,}|#\d{3,}/;

function findUnsourcedLockLines(figeePath) {
  if (!existsSync(figeePath)) return [];
  const lines = readFileSync(figeePath, 'utf8').split('\n');
  const unsourced = [];
  lines.forEach((line, i) => {
    if (!line.includes('🔒')) return;
    const window = [line, lines[i - 1] || '', lines[i - 2] || ''];
    const sourced = window.some((l) => SOURCE_RE.test(l));
    if (!sourced) unsourced.push({ n: i + 1, text: line.trim().slice(0, 140) });
  });
  return unsourced;
}

function auditGame(id) {
  const checks = [];
  const warns = [];
  const add = (name, cond, detail = '') => checks.push({ name, cond, detail });
  const addWarn = (name, cond, detail = '') => warns.push({ name, cond, detail });

  const inCatalog = catalogIds.has(id);
  add('présent dans catalog.js (retire != true)', inCatalog, inCatalog ? '' : 'absent ou retire:true');

  add('site/mj-XX.html existe', existsSync(resolve(SITE, `${id}.html`)));

  const figeePath = resolve(FIGEES, `${id}.md`);
  add('figée docs/jeux/figees/mj-XX.md existe', existsSync(figeePath));

  const specPath = resolve(__dir, `${id}.spec.mjs`);
  add('spec Playwright tests/mj-XX.spec.mjs existe', existsSync(specPath));

  // i18n : fr/en BLOQUANT (D-013, langues réellement servies) ; es-es/pt-br
  // AVERTISSEMENT (préparées, non branchées dans site/js/lang.js).
  for (const lang of I18N_LANGS_BLOQUANT) {
    const has = i18nData[lang] && Object.prototype.hasOwnProperty.call(i18nData[lang], id);
    add(`clé ${id} dans i18n/${lang}/strings.json`, !!has);
  }
  for (const lang of I18N_LANGS_AVERT) {
    const has = i18nData[lang] && Object.prototype.hasOwnProperty.call(i18nData[lang], id);
    addWarn(`clé ${id} dans i18n/${lang}/strings.json`, !!has);
  }

  // MP3 de consigne : repli TTS voulu par design (run.mjs:48-52) → jamais bloquant.
  const mp3Path = resolve(ROOT, 'site', 'sounds', 'voix', 'phrases', `${id}.mp3`);
  addWarn(`MP3 consigne sounds/voix/phrases/${id}.mp3 présent`, existsSync(mp3Path),
    `absent — repli TTS actif (voulu par design), MP3 à générer quand possible`);

  add('au moins une entrée référentiel (textes-jeux.json)', referentielGames.has(id),
    referentielGames.has(id) ? '' : `aucune ligne "jeu":"${id}" — lancer studio/referentiel/generer/_extraire-textes-jeux.mjs`);

  const entry = catalog.find((e) => e.id === id);
  if (entry && entry.zone) {
    add('murOrder défini (jeu avec zone Mur)', entry.murOrder !== undefined && entry.murOrder !== null);
  }

  return { checks, warns };
}

let totalFail = 0;
let totalWarn = 0;
const results = [];

for (const id of targets) {
  const { checks, warns } = auditGame(id);
  const fails = checks.filter((c) => !c.cond);
  const warnFails = warns.filter((c) => !c.cond);
  totalFail += fails.length;
  totalWarn += warnFails.length;
  results.push({ id, checks, fails, warns, warnFails });
}

if (staleBundles.length) totalFail += staleBundles.length;

// EP-043 devenu R07 : balaie TOUTES les figées présentes sur disque (pas
// seulement les `targets` demandés en CLI) — la vérification doit couvrir
// tout le dossier, y compris menu.md et les figées de jeux retirés du
// catalogue. Une figée CRÉÉE APRÈS AUJOURD'HUI (date de création = premier
// commit qui l'ajoute, `git log --diff-filter=A --format=%as`) est BLOQUANTE
// sur les 🔒 non sourcées ; une figée déjà existante avant aujourd'hui reste
// en AVERTISSEMENT (on ne casse pas 37 figées d'un coup d'un jugement rétroactif).
// Le marqueur 🟡 PROVISOIRE (D-015 : jeu neuf, non vu par Papa Yann) est ignoré
// ici — ce n'est pas une ligne 🔒, cette porte ne la voit jamais.
const TODAY = new Date().toISOString().slice(0, 10);

// Une seule invocation git pour TOUT le dossier figées (perf : 36 process
// `git log --follow` séparés coûtaient ~13 s sur Windows ; un seul `git log`
// sur le dossier coûte ~0.15 s). On construit une map chemin → plus ancienne
// date d'ajout (dernière ligne "COMMIT <date>" rencontrée pour ce chemin, car
// git log liste du plus récent au plus ancien).
function buildFigeeCreationDates() {
  const map = new Map();
  try {
    const out = execSync(
      `git log --diff-filter=A --format=COMMIT%x20%as --name-only -- "${FIGEES}"`,
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    let currentDate = null;
    for (const line of out.split('\n')) {
      if (line.startsWith('COMMIT ')) {
        currentDate = line.slice('COMMIT '.length).trim();
      } else if (line.trim() && currentDate) {
        map.set(line.trim(), currentDate); // écrasé par les commits plus anciens lus ensuite
      }
    }
  } catch {
    // pas de repo git → map vide, tous les fichiers traités comme "créés aujourd'hui"
  }
  return map;
}

const figeeCreationDates = buildFigeeCreationDates();

function figeeCreationDate(figeePath) {
  // chemin relatif POSIX, format que git log --name-only rend (depuis ROOT)
  const rel = figeePath.slice(ROOT.length + 1).split('\\').join('/');
  return figeeCreationDates.has(rel) ? figeeCreationDates.get(rel) : null;
}

let totalUnsourcedFail = 0;
let totalUnsourcedWarn = 0;
const unsourcedByGame = [];
if (existsSync(FIGEES)) {
  const figeeFiles = readdirSync(FIGEES).filter((f) => f.endsWith('.md'));
  for (const f of figeeFiles) {
    const figeePath = resolve(FIGEES, f);
    const unsourced = findUnsourcedLockLines(figeePath);
    if (unsourced.length) {
      const createdAt = figeeCreationDate(figeePath);
      // Fichier non encore commité (nouvelle figée dans ce tour) → pas de date
      // de création trouvable = traité comme "créé aujourd'hui" (le cas le
      // plus prudent pour une figée neuve, cohérent avec le sens de la règle).
      const treatedAsNew = createdAt === null ? true : createdAt >= TODAY;
      if (treatedAsNew) totalUnsourcedFail += unsourced.length;
      else totalUnsourcedWarn += unsourced.length;
      unsourcedByGame.push({ id: f.replace(/\.md$/, ''), unsourced, createdAt, blocking: treatedAsNew });
    }
  }
}
totalFail += totalUnsourcedFail;

// ── orphelins disque : un mj-XX.html sans entrée catalogue ──────────────────
const orphans = [...diskIds].filter((id) => !catalogIds.has(id));
if (orphans.length) totalFail += orphans.length;

// ── conflits murOrder ────────────────────────────────────────────────────
if (murOrderConflicts.length) totalFail += murOrderConflicts.length;

if (asJson) {
  console.log(JSON.stringify({
    results, orphans, murOrderConflicts, staleBundles, totalFail, totalWarn,
    unsourcedByGame, totalUnsourcedFail, totalUnsourcedWarn,
  }, null, 2));
} else {
  console.log(`\n── check-mj-coherence.mjs — ${targets.length} jeu(x) audité(s) ──\n`);
  for (const r of results) {
    const status = r.fails.length === 0 ? `${GREEN}OK${RST}` : `${RED}MANQUE${RST}`;
    console.log(`${status}  ${r.id}`);
    for (const f of r.fails) {
      console.log(`  ${RED}✗${RST} ${f.name}${f.detail ? DIM + ' — ' + f.detail + RST : ''}`);
    }
    for (const w of r.warnFails) {
      console.log(`  ${YEL}⚠${RST} ${w.name}${w.detail ? DIM + ' — ' + w.detail + RST : ''}`);
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
  if (staleBundles.length) {
    console.log(`\n${RED}Bundles i18n périmés (site/js/gen/i18n/mj-strings.<lang>.js) :${RST}`);
    staleBundles.forEach(({ lang, reason }) => console.log(`  ${RED}✗${RST} ${lang} — ${reason}`));
  }
  if (totalUnsourcedFail || totalUnsourcedWarn) {
    const blocking = unsourcedByGame.filter((g) => g.blocking);
    const legacy = unsourcedByGame.filter((g) => !g.blocking);
    if (blocking.length) {
      console.log(`\n${RED}BLOQUANT — lignes 🔒 sans source, figée créée après ${TODAY} (date/Papa Yann/PY/commit/D-NNN/L-NNN/#annotation) :${RST}`);
      blocking.forEach(({ id, unsourced }) => console.log(`  ${RED}✗${RST} ${id} — ${unsourced.length} ligne(s) non sourcée(s)`));
    }
    if (legacy.length) {
      console.log(`\n${YEL}⚠ AVERTISSEMENT (LEGACY — figées existantes avant ${TODAY}, n'en ajoute jamais) — lignes 🔒 sans source :${RST}`);
      legacy.forEach(({ id, unsourced }) => console.log(`  ${YEL}${id}${RST} — ${unsourced.length} ligne(s) non sourcée(s)`));
    }
  }
  console.log(totalFail === 0
    ? `\n${GREEN}✓ ${targets.length} jeu(x), 0 manque${totalWarn || totalUnsourcedWarn ? ` (${totalWarn + totalUnsourcedWarn} avertissement(s))` : ''}${RST}\n`
    : `\n${RED}✗ ${totalFail} manque(s) bloquant(s)${RST}\n`);
}

process.exit(totalFail === 0 ? 0 : 1);
