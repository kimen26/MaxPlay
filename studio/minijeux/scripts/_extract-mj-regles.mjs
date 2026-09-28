// _extract-mj-regles.mjs — extraction MÉCANIQUE du FR canon des 36 panneaux règle.
// Principe (HO-MJ-02) : le FR reste en dur dans chaque site/mj-XX.html (RegleInfo.init(cfg.regle)
// appelé depuis mj-shell.js). On n'ouvre pas les 36 fichiers à la main : on ouvre chaque page
// dans Chromium (Playwright), on monkey-patch window.RegleInfo.init AVANT que mj-shell.js le
// définisse pour de vrai, on intercepte l'objet `opts` passé par le jeu, et on écrit
// studio/minijeux/i18n/fr/strings.json — la référence du checker (miroir corpus-fr.json dino).
//
// Le monkey-patch pose RegleInfo = { init: capture } sur `window` avant que mj-shell.js charge
// regle-info.js. Comme mj-shell.js ne (re)crée RegleInfo QUE si le script n'est pas déjà présent
// (hasScript), et que regle-info.js fait `window.RegleInfo = { init: init }` sans jamais tester
// si RegleInfo existe déjà, on capture l'appel réel autrement : on injecte le script via
// addInitScript pour patcher `MJ.init` lui-même (le point qui reçoit cfg.regle en un seul endroit,
// mj-shell.js ligne "if (cfg.regle && window.RegleInfo) RegleInfo.init(cfg.regle)"), en interceptant
// avant, la fonction RegleInfo.init une fois posée par regle-info.js (patch après coup, avant tout
// appel du jeu — le jeu appelle MJ.init APRÈS MJ.ready, donc après le chargement complet des scripts).
//
// Clé de stockage = gameId() de regle-info.js = nom de fichier sans extension (mj-14, mj-48, ...) :
// robuste, indépendant de cfg.id (absent dans 23/36 jeux).
//
// Usage : node studio/minijeux/scripts/_extract-mj-regles.mjs [mj-14 mj-48 ...] [--out <fichier>]
// Playwright est une dépendance du package.json RACINE (node_modules/ à la racine du repo) :
// ce script n'a pas son propre node_modules, on importe donc depuis la racine plutôt
// que d'ajouter une seconde install (même paquet, même version, zéro duplication).
//
// FUSION, jamais un remplacement total (correctif R20, 2026-09-28) : le fichier cible sert
// de référence FR pour les 36 jeux. Filtré sur un ou plusieurs id, ce script ne doit modifier
// QUE les clés des jeux traités — jamais effacer le FR des jeux non filtrés, ni celui d'un
// jeu filtré dont l'extraction échoue (page qui n'appelle jamais RegleInfo.init, ou capture
// vide). Une sauvegarde datée du fichier cible est écrite avant toute réécriture, dans un
// sous-dossier `_scratch/` déjà ignoré par git (patron `**/_scratch/` du .gitignore racine).
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../../..');
const { chromium } = await import(pathToFileURL(path.join(ROOT, 'node_modules/playwright/index.mjs')).href);
const SITE = path.join(ROOT, 'site');
const OUT_DIR = path.join(ROOT, 'studio/minijeux/i18n/fr');
const DEFAULT_OUT = path.join(OUT_DIR, 'strings.json');

// --out <fichier> : cible d'écriture alternative (le test l'utilise pour travailler sur
// une copie temporaire, jamais sur le vrai strings.json).
const argv = process.argv.slice(2);
const outIdx = argv.indexOf('--out');
const OUT = outIdx > -1 ? path.resolve(argv[outIdx + 1]) : DEFAULT_OUT;

// Titres canoniques : catalog.js (source de vérité du menu), pas le <title> HTML
// (ponctuation incohérente entre jeux — tiret court/long, "MJ-XX –" en préfixe).
// Fallback sur le <title> HTML nettoyé pour un jeu absent du catalogue (retiré/parental).
function loadCatalog() {
  const src = readFileSync(path.join(SITE, 'js/catalog.js'), 'utf8');
  const win = {};
  new Function('window', src + '\nreturn window;')(win);
  const map = {};
  (win.MAXPLAY_CATALOG || []).forEach(c => { map[c.id] = c.titre; });
  return map;
}
const TITRES = loadCatalog();

// filtres = ids de jeux demandés en CLI, hors --out et sa valeur (pas un id de jeu).
const filtres = argv.filter((a, i) => a !== '--out' && (outIdx === -1 || i !== outIdx + 1));
let fichiers = readdirSync(SITE).filter(f => /^mj-[a-z0-9]+\.html$/.test(f));
if (filtres.length) fichiers = fichiers.filter(f => filtres.includes(f.replace(/\.html$/, '')));
fichiers.sort();

// Script injecté AVANT tout script de la page (addInitScript) : patch RegleInfo.init
// dès que regle-info.js le pose sur window, en conservant l'original pour ne rien casser
// à l'écran (le panneau doit s'afficher normalement, capture avant/après du brief).
const PATCH = `
(function () {
  window.__MJ_REGLE_CAPTURE__ = null;
  var natif = null;
  Object.defineProperty(window, 'RegleInfo', {
    configurable: true,
    get: function () { return natif; },
    set: function (v) {
      var orig = v && v.init;
      natif = {
        init: function (opts) {
          window.__MJ_REGLE_CAPTURE__ = opts;
          return orig ? orig(opts) : undefined;
        }
      };
    }
  });
})();
`;

const browser = await chromium.launch({ headless: true });
// FUSION : on part du fichier cible existant (36 jeux + _commun) et on ne touche qu'aux
// clés des jeux effectivement extraits ci-dessous — jamais une réécriture à partir de zéro.
const resultat = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
let manquants = [];

for (const fichier of fichiers) {
  const id = fichier.replace(/\.html$/, '');
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const erreurs = [];
  page.on('pageerror', e => erreurs.push(String(e.message)));
  await page.addInitScript(PATCH);

  const url = pathToFileURL(path.join(SITE, fichier)).href;
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(600);
  } catch (e) {
    erreurs.push('goto: ' + e.message);
  }

  const capture = await page.evaluate(() => window.__MJ_REGLE_CAPTURE__ || null);
  let titre = TITRES[id];
  if (!titre) {
    // Fallback jeu absent du catalogue : nettoyer "MJ-XX – Titre" / "MJ-XX — Titre"
    // (tiret court ET long selon les fichiers — incohérence gravée, pas une erreur ici).
    const docTitle = await page.evaluate(() => document.title || '');
    const m = docTitle.match(/^MJ-\w+\s*[–—-]\s*(.+)$/i);
    titre = m ? m[1].trim() : docTitle.trim();
  }

  // "vide" = capture jamais reçue OU reçue sans aucune matière (texte ET étapes absents) :
  // dans les deux cas on NE TOUCHE PAS à la valeur existante de ce jeu dans `resultat`
  // (déjà fusionné depuis le fichier cible) plutôt que de l'écraser par du vide.
  const vide = !capture || (!capture.texte && (!capture.etapes || capture.etapes.length === 0));
  if (vide) {
    manquants.push(id);
    console.log(`[MANQUANT] ${id} — RegleInfo.init jamais appelé ou capture vide (erreurs: ${erreurs.slice(0, 2).join(' | ') || 'aucune'})`);
  } else {
    resultat[id] = {
      titre: titre,
      regle: {
        texte: capture.texte || '',
        etapes: (capture.etapes || []).map(e => (typeof e === 'string') ? { t: e, d: '' } : { t: e.t || '', d: e.d || '' }),
        etoiles: capture.etoiles || ''
      }
    };
    console.log(`[OK] ${id} — "${titre}" — ${(capture.etapes || []).length} étapes`);
  }
  await ctx.close();
}

await browser.close();

// Sauvegarde datée du fichier cible AVANT toute réécriture, dans un sous-dossier `_scratch/`
// déjà ignoré par git (patron `**/_scratch/`, .gitignore racine) — jamais commitée.
if (existsSync(OUT)) {
  const outDir = path.dirname(OUT);
  const scratchDir = path.join(outDir, '_scratch');
  mkdirSync(scratchDir, { recursive: true });
  const horodatage = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const backup = path.join(scratchDir, `${path.basename(OUT)}.bak-${horodatage}`);
  copyFileSync(OUT, backup);
  console.log(`[backup] ${backup}`);
}

mkdirSync(path.dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(resultat, null, 2) + '\n', 'utf8');

console.log(`\n${Object.keys(resultat).length}/${fichiers.length} jeux extraits -> ${OUT}`);
if (manquants.length) {
  console.log(`${manquants.length} manquant(s) : ${manquants.join(', ')}`);
  process.exit(1);
}
process.exit(0);
