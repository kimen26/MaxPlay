// audit-gabarit.mjs — AUDIT GABARIT ÉCLAIR des mini-jeux MaxPlay (< 1 min / batterie complète)
//
//  Complète le harnais Playwright (run.mjs, 1 spec/jeu, qui teste le GAMEPLAY).
//  Ce script-ci teste la FORME/CADRE, de façon 100% déterministe et statique
//  (lecture des fichiers HTML, zéro navigateur) → pas besoin d'un agent LLM
//  pour ça : les règles de conformité gabarit sont mécaniques.
//
//  Usage :
//    node audit-gabarit.mjs               → audite TOUS les site/mj-*.html
//    node audit-gabarit.mjs mj-43 mj-45   → audite seulement ces jeux
//    node audit-gabarit.mjs --json        → sortie JSON (pour CI / agents)
//
//  Sort code 1 si au moins un jeu a une violation BLOQUANTE (voir plus bas),
//  0 sinon. Les AVERTISSEMENTS (migration shell non faite, etc.) ne bloquent pas.
//
//  Ce qu'il vérifie, par fichier :
//   [BLOQUANT] cloud.js présent SI comments.js présent, ET cloud.js avant comments.js
//              (règle 🚨 2026-07-14 : sans lui les 💬 ne montent jamais à Supabase)
//   [BLOQUANT] cloud.js APRÈS tracker.js (ordre de chargement)
//   [BLOQUANT] mp-theme.css chargé (via <link> direct OU via mj-shell.js qui l'injecte)
//   [BLOQUANT] pas d'emoji 🚌 en dur (règle bus SVG sacrée)
//   [BLOQUANT] charset utf-8 déclaré (EP-035 encoding)
//   [AVERT]    utilise le gabarit js/mj-shell.js (migration en cours 2026-07-14)
//   [AVERT]    header canonique .hdr présent, pas de variante .game-header inventée
//   [AVERT]    #app présent
//   [AVERT]    pas de fetch() JSON local (casse en file://)
//   [AVERT]    pas de hex couleur en dur type #RRGGBB dans le <script> inline (indice, pas preuve)
//   [AVERT]    a une spec de gameplay dans tests/ (studio/minijeux/tests/mj-XX.spec.mjs)
//
//  Créé 2026-07-14 (demande Papa Yann : batterie de test 2 vitesses). Réutilise le
//  vocabulaire de sortie du harnais run.mjs (PASS/FAIL colorés).

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const TESTS = __dir;

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const wanted = args.filter(a => !a.startsWith('--'));

const GREEN = '\x1b[32m', RED = '\x1b[31m', YEL = '\x1b[33m', DIM = '\x1b[2m', RST = '\x1b[0m';

// ── liste des fichiers à auditer ────────────────────────────────────────────
// Fichiers de démo/référence du package Design System — pas de vrais jeux, exclus de l'audit batterie.
const NOT_A_GAME = new Set(['mj-gold-a', 'mj-gold-b']);

function mjFiles() {
  if (wanted.length) return wanted.map(w => resolve(SITE, `${w.replace(/\.html$/, '')}.html`));
  return readdirSync(SITE)
    .filter(f => /^mj-.*\.html$/.test(f))
    .filter(f => !NOT_A_GAME.has(basename(f, '.html')))
    .map(f => resolve(SITE, f));
}

// ── un check = { level: 'block'|'warn', name, cond, detail } ────────────────
function auditOne(file) {
  const id = basename(file).replace(/\.html$/, '');
  if (!existsSync(file)) {
    return { id, missing: true, checks: [{ level: 'block', name: 'fichier existe', cond: false, detail: file }] };
  }
  const html = readFileSync(file, 'utf8');
  const checks = [];
  const add = (level, name, cond, detail = '') => checks.push({ level, name, cond, detail });

  const usesShell = /js\/mj-shell\.js/.test(html);
  const hasComments = /js\/comments\.js/.test(html);
  const hasCloud = /js\/cloud\.js/.test(html);
  const hasTracker = /js\/tracker\.js/.test(html);

  const idxOf = (needle) => html.indexOf(needle);

  // ── BLOQUANT ──────────────────────────────────────────────────────────────
  // 1. cloud.js requis dès qu'il y a des commentaires 💬 (sauf si le shell s'en charge)
  if (usesShell) {
    add('block', 'gabarit shell → cloud+comments gérés par mj-shell.js', true);
  } else {
    if (hasComments) {
      add('block', 'comments.js présent → cloud.js aussi présent (💬 remonte à Supabase)',
        hasCloud, hasCloud ? '' : 'comments.js SANS cloud.js : les avis restent en localStorage, jamais poussés');
      if (hasCloud) {
        add('block', 'cloud.js AVANT comments.js',
          idxOf('js/cloud.js') < idxOf('js/comments.js'),
          'comments.js appelle Cloud.schedulePush() → cloud.js doit être chargé avant');
      }
    }
    if (hasCloud && hasTracker) {
      add('block', 'cloud.js APRÈS tracker.js',
        idxOf('js/cloud.js') > idxOf('js/tracker.js'),
        'ordre de chargement : tracker.js puis cloud.js');
    }
  }

  // 2. thème design system chargé (link direct OU injecté par le shell)
  add('block', 'mp-theme.css chargé (link direct ou via mj-shell.js)',
    /mp-theme\.css/.test(html) || usesShell,
    'Design System v1 = source de vérité couleur/thème obligatoire');

  // 3. encoding
  add('block', 'charset utf-8 déclaré',
    /charset\s*=\s*["']?utf-8/i.test(html),
    'EP-035 : <meta charset="utf-8"> obligatoire');

  // ── AVERTISSEMENTS (n'empêchent pas le push, signalent une dette) ───────────
  add('warn', 'utilise le gabarit js/mj-shell.js', usesShell,
    'migration recommandée 2026-07-14 — charge tout le cadre dans le bon ordre');

  add('warn', 'header canonique .hdr présent', /class\s*=\s*["'][^"']*\bhdr\b/.test(html) || usesShell);

  const invented = ['game-header', 'header-text', 'header-title', 'header-sub']
    .filter(v => new RegExp(`class\\s*=\\s*["'][^"']*\\b${v}\\b`).test(html));
  add('warn', 'pas de variante header inventée', invented.length === 0,
    invented.length ? `détecté : .${invented.join(' .')}` : '');

  add('warn', '#app présent', /id\s*=\s*["']app["']/.test(html) || usesShell);

  add('warn', 'pas de fetch() JSON local',
    !/fetch\s*\(\s*["'`][^"'`]*\.json/.test(html),
    'HTML file:// ne peut pas fetch — utiliser <script src="data.js">');

  // hex en dur : uniquement dans le <script> inline (le CSS a le droit, c'est le gameplay qui ne doit pas hardcoder les couleurs de ligne)
  const scriptBlocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
  const hexHits = (scriptBlocks.match(/#[0-9a-fA-F]{6}\b/g) || []).length;
  add('warn', 'peu/pas de hex couleur en dur dans le JS inline', hexHits <= 3,
    hexHits ? `${hexHits} hex #RRGGBB dans le <script> — vérifier que ce ne sont pas des couleurs de ligne (→ LIGNES de data.js)` : '');

  const specPath = resolve(TESTS, `${id}.spec.mjs`);
  add('warn', 'a une spec de gameplay (harnais Playwright)', existsSync(specPath),
    existsSync(specPath) ? '' : `manque ${id}.spec.mjs — le gameplay n'est pas couvert`);

  return { id, missing: false, checks };
}

// ── run ─────────────────────────────────────────────────────────────────────
const results = mjFiles().map(auditOne);

let hadBlock = false;
const summary = [];

for (const r of results) {
  const blockFails = r.checks.filter(c => c.level === 'block' && !c.cond);
  const warnFails = r.checks.filter(c => c.level === 'warn' && !c.cond);
  if (blockFails.length) hadBlock = true;
  summary.push({ id: r.id, block: blockFails.length, warn: warnFails.length });

  if (asJson) continue;

  const tag = blockFails.length ? `${RED}BLOQUANT${RST}` : warnFails.length ? `${YEL}dette${RST}` : `${GREEN}OK${RST}`;
  console.log(`\n── ${r.id} ── ${tag}`);
  for (const c of blockFails)
    console.log(`  ${RED}✗ BLOQUANT${RST}  ${c.name}${c.detail ? `\n        → ${c.detail}` : ''}`);
  for (const c of warnFails)
    console.log(`  ${YEL}! dette${RST}     ${c.name}${c.detail ? `\n        ${DIM}→ ${c.detail}${RST}` : ''}`);
  if (!blockFails.length && !warnFails.length)
    console.log(`  ${GREEN}✓${RST} cadre conforme`);
}

if (asJson) {
  console.log(JSON.stringify({ hadBlock, results: summary }, null, 2));
} else {
  const nBlock = summary.filter(s => s.block).length;
  const nWarn = summary.filter(s => !s.block && s.warn).length;
  const nOk = summary.filter(s => !s.block && !s.warn).length;
  const nShell = results.filter(r => r.checks.some(c => c.name === 'utilise le gabarit js/mj-shell.js' && c.cond)).length;
  console.log(`\n════════════════════════════════════════════`);
  console.log(`  ${results.length} jeux audités`);
  console.log(`  ${GREEN}${nOk} cadre conforme${RST} · ${YEL}${nWarn} avec dette${RST} · ${RED}${nBlock} BLOQUANT${RST}`);
  console.log(`  migration gabarit shell : ${nShell}/${results.length}`);
  console.log(`════════════════════════════════════════════`);
  console.log(hadBlock
    ? `${RED}✗ au moins un jeu a une violation bloquante — corriger avant push${RST}\n`
    : `${GREEN}✓ aucun bloquant — cadre sain (les dettes sont à résorber au fil de l'eau)${RST}\n`);
}

process.exit(hadBlock ? 1 : 0);
