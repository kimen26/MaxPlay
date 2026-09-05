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
// Usage : node studio/minijeux/tools/_extract-mj-regles.mjs [mj-14 mj-48 ...]
// Playwright n'est installé que dans studio/minijeux/tests/ (paquet de test) : ce
// script n'a pas son propre node_modules, on importe donc depuis ce chemin plutôt
// que d'ajouter une seconde install (même paquet, même version, zéro duplication).
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../../..');
const { chromium } = await import(pathToFileURL(path.join(ROOT, 'studio/minijeux/tests/node_modules/playwright/index.mjs')).href);
const SITE = path.join(ROOT, 'site');
const OUT_DIR = path.join(ROOT, 'studio/minijeux/i18n/fr');
const OUT = path.join(OUT_DIR, 'strings.json');

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

const filtres = process.argv.slice(2);
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
const resultat = {};
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

  if (!capture) {
    manquants.push(id);
    console.log(`[MANQUANT] ${id} — RegleInfo.init jamais appelé (erreurs: ${erreurs.slice(0, 2).join(' | ') || 'aucune'})`);
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

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, JSON.stringify(resultat, null, 2) + '\n', 'utf8');

console.log(`\n${Object.keys(resultat).length}/${fichiers.length} jeux extraits -> ${OUT}`);
if (manquants.length) {
  console.log(`${manquants.length} manquant(s) : ${manquants.join(', ')}`);
  process.exit(1);
}
process.exit(0);
