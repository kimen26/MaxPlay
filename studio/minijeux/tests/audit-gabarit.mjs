// audit-gabarit.mjs — AUDIT GABARIT ÉCLAIR des mini-jeux MaxPlay (< 1 min / batterie complète)
//
//  Complète le harnais Playwright (run.mjs, 1 spec/jeu, qui teste le GAMEPLAY).
//  Ce script-ci teste la FORME/CADRE, de façon 100% déterministe et statique
//  (lecture des fichiers HTML, zéro navigateur) → pas besoin d'un agent LLM
//  pour ça : les règles de conformité gabarit sont mécaniques.
//
//  Usage :
//    node audit-gabarit.mjs               → audite les jeux AU MENU (présents dans js/catalog.js)
//    node audit-gabarit.mjs --all         → audite TOUS les site/mj-*.html (menu + retirés)
//    node audit-gabarit.mjs mj-46 mj-48   → audite seulement ces jeux
//    node audit-gabarit.mjs --json        → sortie JSON (pour CI / agents)
//    node audit-gabarit.mjs --strict      → les checks C1 (EP-038 2026-07-28) sortent en BLOQUANT
//                                            au lieu de dette (voir plan de bascule ci-dessous)
//
//  Portée par défaut = catalog.js (source de vérité menu). Depuis la purge
//  2026-08-10 (décision PY), un jeu retiré est SUPPRIMÉ de site/ — seuls les
//  2 bacs à sable parentaux (retire:true + parental:true) restent hors audit.
//  Ajouté 2026-07-15 (scan militaire : rendre l'audit branchable bloquant en CI).
//
//  Sort code 1 si au moins un jeu a une violation BLOQUANTE (voir plus bas),
//  0 sinon. Les AVERTISSEMENTS (migration shell non faite, etc.) ne bloquent pas.
//
//  ── PLAN DE BASCULE --strict (C1, EP-038, 2026-07-28) ──────────────────────
//  Constat : 33/45 jeux ont un écran de fin maison (pas G.showEnd), 29/45 sans
//  golden alors que le catalogue promet des étoiles → ces checks casseraient la
//  CI d'un coup s'ils étaient BLOQUANT par défaut aujourd'hui. Donc :
//    - AUJOURD'HUI : les 5 nouveaux checks (showEnd / golden / titre / .hdr /
//      Cursif) sortent en `dette` par défaut → CI VERTE, mais visibles et tracés.
//    - Semaine par semaine, lot A (19 jeux 2-boutons) puis lot B (9 jeux
//      1-bouton) puis lot C (entêtes maison) migrent vers G.showEnd/golden
//      (voir studio/minijeux/docs/2026-07-28-plan-remise-au-propre.md § C1).
//    - Quand un jeu migré passe --strict sans BLOQUANT, il reste vert pour
//      toujours (aucune régression possible en arrière : le check bloque si
//      quelqu'un réintroduit un overlay maison).
//    - Quand TOUS les jeux du catalogue passent --strict → on bascule le
//      défaut : `--strict` devient le comportement normal (retirer le flag,
//      ou l'inverser en `--legacy` pour l'ancien comportement temporaire).
//    - Le débogage : `node audit-gabarit.mjs --strict` à tout moment donne
//      l'état réel migration (compte de bloquants restants par jeu).
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
const auditAll = args.includes('--all');
const strict = args.includes('--strict');
const wanted = args.filter(a => !a.startsWith('--'));

// Niveau des 5 nouveaux checks C1 (EP-038 2026-07-28) : 'dette' par défaut
// (CI verte pendant la migration), 'block' avec --strict. Voir plan de
// bascule en tête de fichier.
const C1 = strict ? 'block' : 'warn';

const GREEN = '\x1b[32m', RED = '\x1b[31m', YEL = '\x1b[33m', DIM = '\x1b[2m', RST = '\x1b[0m';

// ── liste des fichiers à auditer ────────────────────────────────────────────
// LEGACY écran de fin maison (état au tour de conformité 2026-08-01, sonde
// runtime ; purge 2026-08-10 : les 11 jeux legacy retirés du menu ont été
// supprimés de site/) : les SEULS jeux encore autorisés en avertissement sur
// le check « fin via G.showEnd ». Liste NOMINATIVE qui ne peut que RÉTRÉCIR :
// on en SORT un jeu quand il est migré (il devient alors bloquant à jamais),
// on n'en AJOUTE JAMAIS (un nouveau jeu naît conforme, directive PY
// mutualisation gravée en mémoire). 1 cas sandbox/continu (mj-32) : piste
// sans objet, fin standard à statuer PY.
const LEGACY_FIN_MAISON = new Set([
  'mj-32',
]);

// Source de vérité du menu : tout id mj-* présent dans js/catalog.js, SAUF
// retire:true (2026-07-28, C0 tri qualité) — hors menu enfant, donc hors
// audit gabarit aussi (détail par jeu : voir js/catalog.js).
// Une entrée = 1 ligne (convention constante) → on cherche retire:true sur la
// MÊME ligne que l'id, pas juste n'importe où dans le fichier.
function catalogIds() {
  const cat = resolve(SITE, 'js', 'catalog.js');
  if (!existsSync(cat)) return null; // pas de catalog → on ne peut pas filtrer, audite tout
  const src = readFileSync(cat, 'utf8');
  const ids = new Set();
  for (const line of src.split('\n')) {
    const m = line.match(/id:\s*'(mj-[^']+)'/);
    if (!m) continue;
    if (/retire\s*:\s*true/.test(line)) continue;
    ids.add(m[1]);
  }
  return ids;
}

// Découpe catalog.js en lignes d'entrée ({ id:'mj-XX', … }) et extrait titre/maxStars
// proprement — gère les apostrophes échappées (L\'atelier) que le simple split sur
// quotes casse. Une entrée = tout ce qui suit `id:'mj-XX'` jusqu'à la fin de ligne
// (le catalogue est 1 objet = 1 ligne, convention constante depuis catalog.js v1).
function catalogEntry(id) {
  const cat = resolve(SITE, 'js', 'catalog.js');
  if (!existsSync(cat)) return null;
  const lines = readFileSync(cat, 'utf8').split('\n');
  const line = lines.find(l => new RegExp(`id:\\s*'${id}'`).test(l));
  if (!line) return null;
  const grab = (field) => {
    // valeur entre quotes, en tenant compte des \' internes (non-greedy sur \'|[^'])*
    const m = line.match(new RegExp(`${field}\\s*:\\s*'((?:\\\\'|[^'])*)'`));
    return m ? m[1].replace(/\\'/g, "'") : null;
  };
  const maxStarsM = line.match(/maxStars\s*:\s*(\d+)/);
  return {
    line,
    titre: grab('titre'),
    maxStars: maxStarsM ? Number(maxStarsM[1]) : null,
  };
}

let skipped = [];
function mjFiles() {
  if (wanted.length) return wanted.map(w => resolve(SITE, `${w.replace(/\.html$/, '')}.html`));
  const menu = auditAll ? null : catalogIds();
  const all = readdirSync(SITE)
    .filter(f => /^mj-.*\.html$/.test(f));
  if (!menu) return all.map(f => resolve(SITE, f));
  const kept = [], skip = [];
  for (const f of all) (menu.has(basename(f, '.html')) ? kept : skip).push(f);
  skipped = skip.map(f => basename(f, '.html'));
  return kept.map(f => resolve(SITE, f));
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

  // ── CONTRAT MJ v2 (2026-07-19) — catalogue complet + bibliothèque MaxFX ────
  const catPath = resolve(SITE, 'js', 'catalog.js');
  if (existsSync(catPath)) {
    const entryLine = readFileSync(catPath, 'utf8').split('\n')
      .find(l => l.includes(`id:'${id}'`) || l.includes(`id: '${id}'`));
    if (entryLine) {
      const missing = ['titre', 'emoji', 'desc', 'category']
        .filter(f => !new RegExp(`${f}\\s*:\\s*'[^']+'`).test(entryLine));
      add('block', 'entrée catalog.js complète — titre/emoji/desc/category (CONTRAT MJ v2)',
        missing.length === 0,
        missing.length ? `champs vides ou absents : ${missing.join(', ')}` : '');
    }
  }
  add('warn', 'célébrations via bibliothèque MaxFX (celebrations.js ou shell)',
    /js\/celebrations\.js/.test(html) || usesShell,
    'CONTRAT v2 : point → MaxFX.randomPoint, sans-faute → MaxFX.randomFinal');
  const adhocFx = /@keyframes\s+[a-z-]*(confetti|firework|celebr)/i.test(html)
    || /confettiBurst\s*\(/.test(scriptBlocks);
  add('warn', "pas d'animation de victoire ad-hoc (bibliothèque MaxFX only)", !adhocFx,
    'CONTRAT v2 : migrer vers MaxFX.randomFinal — on enrichit la bibliothèque, jamais le jeu');

  // ── C1 — GARDE-FOU RENFORCÉ (EP-038, 2026-07-28) ────────────────────────────
  // 5 checks qui manquaient et ont laissé la dérive silencieuse durer des mois
  // (voir studio/minijeux/docs/2026-07-28-plan-remise-au-propre.md § 0).
  // Niveau C1 = 'dette' par défaut, 'block' avec --strict (plan de bascule en tête de fichier).
  const lines = html.split('\n');
  const lineOf = (re) => { const i = lines.findIndex(l => re.test(l)); return i === -1 ? null : i + 1; };

  // 1. BLOQUANT (potentiel) — écran de fin MAISON au lieu de G.showEnd
  //    Piège mj-34 : réutilise la classe .end-wrap du vrai écran golden en CSS
  //    locale + JS maison, sans jamais appeler G.showEnd → se fier à L'APPEL,
  //    jamais au seul nom de classe.
  {
    const callsShowEnd = /\bG\.showEnd\s*\(|shell\.G\.showEnd\s*\(/.test(scriptBlocks);
    // Marqueurs d'écran de fin MAISON — présence d'UN SEUL suffit à indiquer que le
    // jeu construit sa propre UI de victoire. Piège mj-34 : réutilise .end-wrap (la
    // classe du VRAI écran golden) en CSS locale + JS maison (createElement + innerHTML
    // avec boutons "Rejouer"/"Palier suivant"), sans jamais appeler G.showEnd → on ne
    // se fie donc JAMAIS à .end-wrap seul comme preuve de conformité : seul l'appel
    // G.showEnd(...) fait foi. Si un marqueur maison est présent ET qu'il n'y a pas
    // d'appel G.showEnd ailleurs dans le fichier → BLOQUANT (potentiel).
    const homeMarkers = [
      { re: /#end-screen\b/, label: '#end-screen' },
      { re: /class\s*=\s*["'][^"']*\bvictory-overlay\b/, label: '.victory-overlay' },
      { re: /class\s*=\s*["'][^"']*\bfin-overlay\b/, label: '.fin-overlay' },
      { re: /#fin-overlay\b/, label: '#fin-overlay' },
      { re: /#victoryScreen\b/, label: '#victoryScreen' },
      { re: /class\s*=\s*["'][^"']*\bparade-overlay\b/, label: '.parade-overlay' },
      { re: /#fullScreen\b/, label: '#fullScreen' },
      { re: /class\s*=\s*["'][^"']*\bvictoire-overlay\b/, label: '.victoire-overlay' },
      { re: /\bshowEndScreen\s*\(/, label: 'showEndScreen()' },
      // .end-wrap / .end-btn : la classe du VRAI écran golden (mj-golden.js) — piège
      // mj-34, ne prouve PAS la conformité seule, seulement un candidat à vérifier.
      { re: /class\s*=\s*["'][^"']*\bend-wrap\b/, label: '.end-wrap (class réutilisée, cf. piège mj-34)' },
      { re: /\.className\s*=\s*['"]end-wrap['"]/, label: 'wrap.className = \'end-wrap\' (construit en JS, cf. mj-34)' },
      // function showEnd()/showTierEnd()/showVictory() locale : signe qu'un chemin
      // de fin de partie custom existe ; n'est problématique QUE combiné à l'absence
      // d'appel G.showEnd (sinon c'est le pattern normal function showEnd(){ G.showEnd(...) }).
      { re: /function\s+show(Tier)?End\s*\(|function\s+showVictory\s*\(/, label: 'function showEnd/showTierEnd/showVictory() locale' },
    ];
    const homeHits = homeMarkers.filter(m => m.re.test(html));
    const isHomeMade = !callsShowEnd && homeHits.length > 0;
    const firstHitLine = homeHits.length ? lineOf(homeHits[0].re) : null;
    const detail = isHomeMade
      ? `pas d'appel G.showEnd(...) dans tout le fichier ; marqueur(s) maison : ${homeHits.map(h => h.label).join(' ; ')}` +
        (firstHitLine ? ` (${basename(file)}:${firstHitLine})` : '')
      : '';
    // BASCULE 2026-08-01 (directive PY mutualisation, répétée 5×, gravée
    // memory feedback_mutualisation_ui_militaire) : ce check est BLOQUANT PAR
    // DÉFAUT. Le mode 'dette' silencieux a laissé le parc diverger 5 semaines.
    // Seuls les jeux de la liste LEGACY nominative ci-dessous restent en
    // avertissement — la liste ne peut que RÉTRÉCIR (un jeu migré en sort et
    // ne peut plus régresser). En AJOUTER un = violation de la directive PY.
    const lvl = LEGACY_FIN_MAISON.has(id) ? 'warn' : 'block';
    add(lvl, "écran de fin via G.showEnd (pas d'overlay maison)" + (lvl === 'warn' ? ' [legacy assumé]' : ''), !isHomeMade, detail);

    // 1bis. BLOQUANT TOUJOURS — DOUBLE écran de fin : le jeu appelle G.showEnd
    // ET garde un overlay de victoire local par-dessus/avant. C'était le trou
    // du check 1 (callsShowEnd=true → conforme), à l'origine des retours PY
    // 2026-07-27 sur mj-18/37/38/51 (« écran de victoire pas le bon »).
    // Marqueurs = overlays SÛRS uniquement (pas .end-wrap ni function showEnd,
    // légitimes en présence de G.showEnd).
    {
      const overlayOnly = [
        { re: /class\s*=\s*["'][^"']*\bvictory-overlay\b/, label: '.victory-overlay' },
        { re: /id\s*=\s*["']victoryOverlay["']/, label: '#victoryOverlay' },
        { re: /id\s*=\s*["']victory-overlay["']/, label: '#victory-overlay' },
        // #victory-zone (mj-37) EXCLU : bannière INTERMÉDIAIRE de fin de
        // niveau, protégée par figée mj-37.md 🔒 (≠ écran de fin de partie).
        { re: /class\s*=\s*["'][^"']*\bfin-overlay\b/, label: '.fin-overlay' },
        { re: /id\s*=\s*["']finOverlay["']/, label: '#finOverlay' },
        { re: /id\s*=\s*["']win-overlay["']/, label: '#win-overlay' },
        { re: /id\s*=\s*["']victoryScreen["']/, label: '#victoryScreen' },
        { re: /class\s*=\s*["'][^"']*\bvictoire-overlay\b/, label: '.victoire-overlay' },
      ];
      const dbl = callsShowEnd ? overlayOnly.filter(m => m.re.test(html)) : [];
      add('block', 'pas de DOUBLE écran de fin (overlay local en plus de G.showEnd)', dbl.length === 0,
        dbl.length ? `G.showEnd appelé MAIS overlay local présent : ${dbl.map(h => h.label).join(' ; ')}` : '');
    }
  }

  // 2. BLOQUANT (potentiel) — golden manquant alors que le catalogue promet des étoiles
  {
    const entry = catalogEntry(id);
    if (entry && entry.maxStars > 0) {
      const hasGoldenTrue = /\bgolden\s*:\s*true\b/.test(scriptBlocks);
      const hasGoldenSetup = /\bGolden\.setup\s*\(/.test(scriptBlocks);
      add(C1, `golden:true si maxStars>0 (catalog promet ${entry.maxStars}★)`,
        hasGoldenTrue || hasGoldenSetup,
        hasGoldenTrue || hasGoldenSetup ? '' : `maxStars:${entry.maxStars} dans catalog.js mais pas de golden:true / Golden.setup() dans MJ.init`);
    }
  }

  // 3. BLOQUANT (potentiel) — titre : longueur + cohérence catalog ↔ MJ.init ↔ <title>
  {
    const entry = catalogEntry(id);
    const normTitle = (s) => (s || '')
      .replace(/[’‘]/g, "'")
      .replace(/[.!?…]+$/g, '')
      .trim();
    if (entry && entry.titre) {
      const nbMots = entry.titre.trim().split(/\s+/).filter(Boolean).length;
      add(C1, 'titre catalog ≤ 4 mots et ≤ 22 caractères',
        nbMots <= 4 && entry.titre.length <= 22,
        `"${entry.titre}" → ${nbMots} mot(s), ${entry.titre.length} caractère(s)`);

      const initTitreM = scriptBlocks.match(/titre\s*:\s*'((?:\\'|[^'])*)'/);
      const initTitre = initTitreM ? initTitreM[1].replace(/\\'/g, "'") : null;
      const htmlTitreM = html.match(/<title>([^<]*)<\/title>/i);
      // <title> réel = "MJ-XX – Titre" ou "MJ-XX — Titre" : on retire le préfixe id + tiret
      const htmlTitreRaw = htmlTitreM ? htmlTitreM[1] : null;
      const htmlTitre = htmlTitreRaw
        ? htmlTitreRaw.replace(new RegExp(`^\\s*${id}\\s*[–—-]\\s*`, 'i'), '').trim()
        : null;

      const mismatches = [];
      if (initTitre && normTitle(initTitre) !== normTitle(entry.titre))
        mismatches.push(`catalog "${entry.titre}" ≠ MJ.init "${initTitre}"`);
      if (htmlTitre && normTitle(htmlTitre) !== normTitle(entry.titre))
        mismatches.push(`catalog "${entry.titre}" ≠ <title> "${htmlTitreRaw}"`);
      add(C1, 'titre cohérent catalog.js ↔ MJ.init ↔ <title>', mismatches.length === 0,
        mismatches.join(' ; '));
    }
  }

  // 4. BLOQUANT (potentiel) — .hdr canonique : zéro CSS locale, zéro élément ajouté à la main
  {
    const styleBlocks = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
    const localHdrCss = /(^|[\s,}])\.(hdr|htitle)\s*\{/m.test(styleBlocks) || /#(hdr|htitle)\s*\{/.test(styleBlocks);
    add(C1, 'aucune règle CSS locale .hdr/.htitle (mp-theme.css fait autorité)', !localHdrCss,
      localHdrCss ? `règle .hdr/.htitle redéclarée en <style> local (${basename(file)}:${lineOf(/\.(hdr|htitle)\s*\{/) || '?'})` : '');

    // éléments ajoutés à la main DANS le bloc .hdr (avant la fermeture </div> du header) :
    // on isole le markup du .hdr par une regex non-greedy sur son contenu.
    const hdrMatch = html.match(/<div\s+class\s*=\s*["'][^"']*\bhdr\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/);
    const hdrInner = hdrMatch ? hdrMatch[1] : '';
    const addedInHdr = ['levelbar', 'score-badge', 'score', 'mp-g-stars']
      .filter(sel => new RegExp(`id\\s*=\\s*["']${sel}["']|class\\s*=\\s*["'][^"']*\\b${sel}\\b`).test(hdrInner));
    add(C1, "aucun élément ajouté dans .hdr (levelbar/score/score-badge/mp-g-stars)", addedInHdr.length === 0,
      addedInHdr.length ? `détecté dans .hdr : ${addedInHdr.join(', ')} (${lineOf(new RegExp(addedInHdr[0]))||'?'})` : '');
  }

  // 5. DETTE (jamais bloquant, même en --strict) — débordement Cursif probable
  {
    const styleBlocks2 = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
    const cursifRules = [...styleBlocks2.matchAll(/\.[a-zA-Z0-9_-]+(?:[.\s][a-zA-Z0-9_-]+)*\s*\{([^}]*)\}/g)]
      .map(m => m[0])
      .filter(rule => /Cursif/.test(rule));
    const risky = cursifRules.filter(rule => {
      const sizeM = rule.match(/font-size\s*:\s*([\d.]+)rem/);
      if (!sizeM) return false;
      const size = parseFloat(sizeM[1]);
      if (size < 2) return false;
      const hasClamp = /font-size\s*:\s*clamp\(/.test(rule);
      const lhM = rule.match(/line-height\s*:\s*([\d.]+)/);
      const lhOk = lhM && parseFloat(lhM[1]) >= 1.2;
      return !hasClamp && !lhOk;
    });
    add('warn', 'Cursif ≥2rem avec clamp() ou line-height≥1.2 (dette débordement, jamais bloquant)',
      risky.length === 0,
      risky.length ? `${risky.length} règle(s) Cursif à risque sans clamp()/line-height (ex: ${risky[0].replace(/\s+/g, ' ').slice(0, 80)}…)` : '');
  }

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
  console.log(JSON.stringify({ hadBlock, skipped, results: summary }, null, 2));
} else {
  const nBlock = summary.filter(s => s.block).length;
  const nWarn = summary.filter(s => !s.block && s.warn).length;
  const nOk = summary.filter(s => !s.block && !s.warn).length;
  const nShell = results.filter(r => r.checks.some(c => c.name === 'utilise le gabarit js/mj-shell.js' && c.cond)).length;
  console.log(`\n════════════════════════════════════════════`);
  console.log(`  ${results.length} jeux audités`);
  console.log(`  ${GREEN}${nOk} cadre conforme${RST} · ${YEL}${nWarn} avec dette${RST} · ${RED}${nBlock} BLOQUANT${RST}`);
  console.log(`  migration gabarit shell : ${nShell}/${results.length}`);
  if (skipped.length) console.log(`  ${DIM}hors-menu (non audités, --all pour inclure) : ${skipped.join(', ')}${RST}`);
  console.log(`════════════════════════════════════════════`);
  console.log(hadBlock
    ? `${RED}✗ au moins un jeu a une violation bloquante — corriger avant push${RST}\n`
    : `${GREEN}✓ aucun bloquant — cadre sain (les dettes sont à résorber au fil de l'eau)${RST}\n`);
}

process.exit(hadBlock ? 1 : 0);
