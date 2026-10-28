// armoire-cases.spec.mjs — une case = un thème (EP-156, PY 2026-10-28).
//
// Vérifie, sur l'accueil réel (site/index.html, 360 × 740) :
//   - les 12 cases portent les étiquettes attendues, dans l'ordre ;
//   - chaque case à thème ouvre un jeu de SON thème (champ armoire de catalog.js) ;
//   - Dessin ouvre toujours le coloriage, Musique la page musique, Histoires la lecture ;
//   - le tour par tour : sur une case de N jeux, N touchers ouvrent N jeux
//     différents (tous passent avant qu'un revienne) ;
//   - la page Musique liste les 5 chansons, leurs fichiers existent, et un
//     toucher lance la lecture.
//
// Usage : node studio/minijeux/tests/armoire-cases.spec.mjs
import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const INDEX = pathToFileURL(resolve(SITE, 'index.html')).href;
const MUSIQUE = pathToFileURL(resolve(SITE, 'musique.html')).href;

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const ok = (name, cond, detail = '') => {
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? ' — ' + detail : ''}`);
  if (!cond) fail++;
};

const ETIQUETTES = ['Dessin', 'Couleurs', 'Chiffres', 'Lettres', 'Dino', 'Puzzle',
  'Grilles', 'Cherche', 'Pays', 'Musique', 'Histoires', 'Surprise'];

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(readFileSync(resolve(SITE, 'js', 'catalog.js'), 'utf8'), sandbox);
const W = sandbox.window;
const jeuxDe = (caseId) => W.MAXPLAY_CATALOG.filter((e) => e.armoire === caseId && !e.retire).map((e) => e.url);

const browser = await chromium.launch({
  args: ['--allow-file-access-from-files', '--disable-web-security', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 360, height: 740 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

async function ouvrirArmoire() {
  await page.goto(INDEX, { waitUntil: 'networkidle' });
  await page.waitForSelector('.casier', { state: 'attached', timeout: 5000 });
  await page.click('.am-porte-haut.am-g');
  await page.click('.am-porte-bas.am-g');
  await page.waitForTimeout(900);
}

// Touche la case et rend le fichier ouvert (sans le charger : la navigation
// est interceptée, seule l'URL demandée compte ici).
async function toucher(label) {
  await ouvrirArmoire();
  const [req] = await Promise.all([
    page.waitForRequest((r) => r.isNavigationRequest() && !r.url().endsWith('index.html'), { timeout: 5000 }),
    page.click(`.casier[aria-label="${label}"]`),
  ]);
  return req.url().split('/').pop();
}

try {
  await page.addInitScript(() => { try { if (!sessionStorage.getItem('init')) { localStorage.clear(); sessionStorage.setItem('init', '1'); } } catch (e) {} });
  await page.route(/\/(mj-[^/]+|lecture|musique)\.html$/, (route) => route.fulfill({ contentType: 'text/html', body: '<p>stub</p>' }));

  await ouvrirArmoire();
  const labels = await page.$$eval('.casier', (cs) => cs.map((c) => c.getAttribute('aria-label')));
  ok('les 12 cases portent les bonnes étiquettes, dans l\'ordre', JSON.stringify(labels) === JSON.stringify(ETIQUETTES), labels.join(', '));

  for (const c of W.MAXPLAY_ARMOIRE) {
    const attendus = jeuxDe(c.id);
    const vus = [];
    for (let i = 0; i < attendus.length; i++) vus.push(await toucher(c.label));
    const tousDuTheme = vus.every((u) => attendus.includes(u));
    const tousDifferents = new Set(vus).size === attendus.length;
    ok(`${c.label} : ${attendus.length} touchers ouvrent les ${attendus.length} jeux du thème`, tousDuTheme && tousDifferents, vus.join(', '));
  }

  ok('Dessin ouvre le coloriage', (await toucher('Dessin')) === 'mj-32.html');
  ok('Musique ouvre la page musique', (await toucher('Musique')) === 'musique.html');
  ok('Histoires ouvre la lecture', (await toucher('Histoires')) === 'lecture.html');
  const surprise = await toucher('Surprise');
  ok('Surprise ouvre un jeu du catalogue', W.MAXPLAY_CATALOG.some((e) => e.url === surprise && e.id !== 'dinos'), surprise);

  await page.unroute(/\/(mj-[^/]+|lecture|musique)\.html$/);
  await page.goto(MUSIQUE, { waitUntil: 'networkidle' });
  const chansons = await page.evaluate(() => window.__musique.chansons.map((c) => c.fichier));
  ok('Musique : 5 chansons listées', chansons.length === 5 && (await page.$$('.chanson')).length === 5);
  const manquants = chansons.filter((f) => !existsSync(resolve(SITE, 'sounds', 'music', 'chansons', f)));
  ok('Musique : tous les fichiers existent', manquants.length === 0, manquants.join(', '));
  await page.click('.chanson >> nth=0');
  await page.waitForTimeout(1200);
  const lecture = await page.evaluate(() => {
    const a = window.__musique.lecteur;
    return { joue: !a.paused, t: a.currentTime, marque: document.querySelectorAll('.chanson.joue').length };
  });
  ok('Musique : un toucher lance la chanson', lecture.joue && lecture.t > 0 && lecture.marque === 1, JSON.stringify(lecture));
  await page.click('.chanson >> nth=0');
  ok('Musique : un 2e toucher met en pause', await page.evaluate(() => window.__musique.lecteur.paused));
  const cibles = await page.$$eval('.chanson, .retour', (bs) => bs.every((b) => { const r = b.getBoundingClientRect(); return r.width >= 48 && r.height >= 48; }));
  ok('Musique : boutons ≥ 48 × 48', cibles);
  const deborde = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  ok('Musique : pas de défilement horizontal à 360 px', !deborde);

  ok('aucune erreur JS', errors.length === 0, errors.join(' | '));
} finally {
  await browser.close();
}

console.log(fail ? `\n\x1b[31m✗ armoire-cases : ${fail} échec(s)\x1b[0m` : '\n\x1b[32m✓ armoire-cases OK\x1b[0m');
process.exit(fail ? 1 : 0);
