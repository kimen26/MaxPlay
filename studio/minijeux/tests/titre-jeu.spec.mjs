// titre-jeu.spec.mjs — le titre du jeu est dit AU DÉBUT DU JEU (PY 2026-11-12,
// amende D-036 : avant, l'accueil le disait puis ouvrait le jeu, 2,3 s d'attente).
//
// 1. ACCUEIL réel (site/index.html, 360 × 740), pages de jeu simulées :
//    A. toucher une case ouvre le jeu TOUT DE SUITE, aucun son de titre sur
//       l'accueil, le titre à dire (id + texte FR + langue) est noté ;
//    B. ?lang=en : le texte noté est le titre ANGLAIS ;
//    C. double toucher : une seule ouverture ;
//    D. Musique (page fixe) : rien de noté.
// 2. LES JEUX RÉELS (tous les site/mj-*.html), titre noté comme par l'accueil :
//    le titre de CE jeu est dit en premier, et AUCUN autre son du jeu (MP3 ou
//    voix du navigateur) ne part avant sa fin ; aucune exception JS.
//    E. MP3 du titre absent : voix du navigateur avec le titre du catalogue ;
//    F. jeu ouvert sans passer par l'accueil : aucun titre.
// Les MP3 de titre sont simulés par un WAV muet de 600 ms (aucun appel ElevenLabs).
//
// Usage : node studio/minijeux/tests/titre-jeu.spec.mjs
import { chromium } from 'playwright';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const INDEX = pathToFileURL(resolve(SITE, 'index.html')).href;
const JEU = (id) => pathToFileURL(resolve(SITE, id + '.html')).href;
const CLE = 'maxplay_titre_a_dire';
const WAV_MS = 600;

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const ok = (name, cond, detail = '') => {
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? ' — ' + detail : ''}`);
  if (!cond) fail++;
};

// ── catalogue + pack EN lus tels que le site les voit ──────────────────────
const lire = (rel) => {
  const sb = { window: {} };
  vm.createContext(sb);
  vm.runInContext(readFileSync(resolve(SITE, rel), 'utf8'), sb);
  return sb;
};
const CAT = lire('js/catalog.js').window.MAXPLAY_CATALOG;
const EN = lire('js/gen/i18n/mj-strings.en.js').window.MJ_STRINGS;
const parId = Object.fromEntries(CAT.map((e) => [e.id, e]));
const idDe = (url) => url.split('/').pop().replace('.html', '');
const JEUX = readdirSync(SITE).filter((f) => /^mj-.*\.html$/.test(f)).map((f) => f.replace('.html', ''));

function wavMuet(ms) {
  const n = Math.round(8000 * ms / 1000), data = Buffer.alloc(n * 2);
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVEfmt ', 8);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(8000, 24); h.writeUInt32LE(16000, 28); h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}
const WAV = wavMuet(WAV_MS);

// Espion : journalise chaque son qui SORT vraiment (play réel) et chaque phrase TTS.
// Posé avant les scripts de la page : titre-jeu.js le capture comme « play d'origine ».
const ESPION = () => {
  window.__j = { sons: [], tts: [], fins: [] };
  const play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    const a = this;
    window.__j.sons.push({ src: (a.currentSrc || a.src).split('/sounds/')[1] || a.src, t: performance.now() });
    a.addEventListener('ended', () => window.__j.fins.push({ src: a.src, t: performance.now() }), { once: true });
    return play.apply(this, arguments);
  };
  if (window.speechSynthesis) {
    window.speechSynthesis.speak = (u) => { window.__j.tts.push({ text: u.text, lang: u.lang, t: performance.now() }); };
  }
};

const browser = await chromium.launch({
  args: ['--allow-file-access-from-files', '--disable-web-security', '--autoplay-policy=no-user-gesture-required'],
});

async function contexte({ mp3 = true, stubJeux = false, titre = null } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const page = await ctx.newPage();
  const d = { titres: [], navigations: [], erreur: '' };
  page.on('pageerror', (e) => { d.erreur += e.message + ' | '; });
  await page.addInitScript(() => { try { if (!sessionStorage.getItem('init')) { localStorage.clear(); sessionStorage.setItem('init', '1'); } } catch (e) {} });
  if (titre) await page.addInitScript(([cle, v]) => { if (!sessionStorage.getItem('seme')) { sessionStorage.setItem('seme', '1'); sessionStorage.setItem(cle, JSON.stringify({ ...v, t: Date.now() })); } }, [CLE, titre]);
  await page.addInitScript(ESPION);
  if (stubJeux) {
    await page.route(/\/(mj-[^/]+|lecture|musique)\.html$/, (r) => {
      d.navigations.push({ url: r.request().url(), t: Date.now() });
      return r.fulfill({ contentType: 'text/html', body: '<p>stub</p>' });
    });
  }
  await page.route(/\/sounds\/voix\/[a-z-]+\/titres\/[^/]+\.mp3$/, (r) => {
    d.titres.push(r.request().url().split('/sounds/')[1]);
    return mp3 ? r.fulfill({ contentType: 'audio/wav', body: WAV }) : r.fulfill({ status: 404, body: '' });
  });
  return { ctx, page, d };
}

async function ouvrirArmoire(page, query = '') {
  await page.goto(INDEX + query, { waitUntil: 'networkidle' });
  await page.waitForSelector('.casier', { state: 'attached', timeout: 5000 });
  await page.click('.am-porte-haut.am-g');
  await page.click('.am-porte-bas.am-g');
  await page.waitForTimeout(900);
}

const attendre = async (cond, ms = 4000) => {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) { if (await cond()) return true; await new Promise((r) => setTimeout(r, 50)); }
  return false;
};
const jeuxDe = (caseId) => CAT.filter((e) => e.armoire === caseId && !e.retire).map((e) => e.id);
const note = (page) => page.evaluate((cle) => { try { return JSON.parse(sessionStorage.getItem(cle) || 'null'); } catch (e) { return null; } }, CLE);

try {
  console.log('1. ACCUEIL');
  console.log('A. toucher une case (fr)');
  {
    const { ctx, page, d } = await contexte({ stubJeux: true });
    await ouvrirArmoire(page);
    const t0 = Date.now();
    await page.click('.casier[aria-label="Chiffres"]');
    const parti = await attendre(() => d.navigations.length > 0, 2000);
    ok('le jeu s\'ouvre tout de suite (< 600 ms)', parti && d.navigations[0].t - t0 < 600, parti ? (d.navigations[0].t - t0) + ' ms' : 'pas parti');
    const id = parti ? idDe(d.navigations[0].url) : '';
    ok('le jeu ouvert est un jeu de la case Chiffres', jeuxDe('chiffres').includes(id), id);
    ok('aucun titre dit sur l\'accueil', d.titres.length === 0, JSON.stringify(d.titres));
    await page.waitForLoadState('load');
    const n = await note(page);
    ok('le titre à dire est noté pour CE jeu, en FR', n && n.id === id && n.lang === 'fr' && n.texte === (parId[id].titreParle || parId[id].titre), JSON.stringify(n));
    ok('aucune exception JS', !d.erreur, d.erreur);
    await ctx.close();
  }

  console.log('B. ?lang=en');
  {
    const { ctx, page, d } = await contexte({ stubJeux: true });
    await ouvrirArmoire(page, '?lang=en');
    await page.waitForTimeout(300);
    await page.click('.casier[aria-label="Dino"]');
    const parti = await attendre(() => d.navigations.length > 0, 2000);
    const id = parti ? idDe(d.navigations[0].url) : '';
    await page.waitForLoadState('load');
    const n = await note(page);
    ok('texte noté = titre ANGLAIS, langue en', n && n.lang === 'en' && n.texte === (EN[id]?.titreParle || EN[id]?.titre), JSON.stringify(n));
    await ctx.close();
  }

  console.log('C. double toucher');
  {
    const { ctx, page, d } = await contexte({ stubJeux: true });
    await ouvrirArmoire(page);
    await page.click('.casier[aria-label="Puzzle"]');
    await page.click('.casier[aria-label="Grilles"]', { force: true, timeout: 500 }).catch(() => {});
    await attendre(() => d.navigations.length > 0);
    await page.waitForTimeout(600);
    ok('une seule ouverture', d.navigations.length === 1, String(d.navigations.length));
    await ctx.close();
  }

  console.log('D. Musique');
  {
    const { ctx, page, d } = await contexte({ stubJeux: true });
    await ouvrirArmoire(page);
    await page.click('.casier[aria-label="Musique"]');
    const parti = await attendre(() => d.navigations.length > 0, 1500);
    await page.waitForLoadState('load');
    ok('Musique s\'ouvre tout de suite, rien de noté', parti && !(await note(page)));
    await ctx.close();
  }

  console.log(`\n2. LES ${JEUX.length} JEUX RÉELS : titre d'abord, le reste après`);
  for (const id of JEUX) {
    const e = parId[id] || { titre: id };
    const { ctx, page, d } = await contexte({ titre: { id, texte: e.titreParle || e.titre, lang: 'fr' } });
    await page.goto(JEU(id), { waitUntil: 'load' });
    await page.waitForTimeout(WAV_MS + 2200);
    const j = await page.evaluate(() => window.__j);
    const tTitre = j.sons.find((s) => s.src.includes('/titres/'));
    const finTitre = j.fins.find((f) => f.src.includes('/titres/'));
    // 50 ms de tolérance : le son du jeu part DANS le même événement « ended »
    // que la fin du titre (le verrou s'ouvre avant que l'espion note la fin) ;
    // un vrai chevauchement se compterait en centaines de ms.
    const avant = finTitre ? [...j.sons.filter((s) => !s.src.includes('/titres/') && s.t < finTitre.t - 50),
      ...j.tts.filter((s) => s.t < finTitre.t - 50)] : [];
    const premier = j.sons[0];
    ok(`[${id}] titre dit en premier, rien avant sa fin` + (j.sons.length + j.tts.length > 1 ? ` (${j.sons.length - 1} son(s), ${j.tts.length} TTS ensuite)` : ''),
      d.titres.length === 1 && tTitre && premier === tTitre && finTitre && avant.length === 0 && !d.erreur,
      JSON.stringify({ titres: d.titres, premier: premier?.src, avant, erreur: d.erreur }));
    await ctx.close();
  }

  console.log('E. MP3 du titre absent -> voix du navigateur');
  {
    const id = 'mj-24';
    const { ctx, page, d } = await contexte({ mp3: false, titre: { id, texte: parId[id].titre, lang: 'fr' } });
    await page.goto(JEU(id), { waitUntil: 'load' });
    await page.waitForTimeout(800);
    const j = await page.evaluate(() => window.__j);
    ok('le titre du catalogue est dit par la voix du navigateur, en fr-FR',
      j.tts[0]?.text === parId[id].titre && j.tts[0]?.lang === 'fr-FR', JSON.stringify(j.tts));
    // l'espion ne fait pas finir la voix du navigateur : le verrou tient jusqu'au plafond
    ok('la consigne attend la fin du titre', j.sons.every((s) => s.src.includes('/titres/')) && j.tts.length === 1, JSON.stringify(j));
    await page.waitForTimeout(4000);
    const j2 = await page.evaluate(() => window.__j);
    ok('le jeu reprend la parole au plus tard au plafond (4 s)', j2.sons.length + j2.tts.length > 2, JSON.stringify(j2));
    ok('aucune exception JS', !d.erreur, d.erreur);
    await ctx.close();
  }

  console.log('F. jeu ouvert sans passer par l\'accueil');
  {
    const { ctx, page, d } = await contexte();
    await page.goto(JEU('mj-24'), { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    ok('aucun titre dit', d.titres.length === 0, JSON.stringify(d.titres));
    await ctx.close();
  }
} finally {
  await browser.close();
}

console.log(fail ? `\n${FAIL} ${fail} échec(s)` : `\n${PASS} titre-jeu.spec`);
process.exit(fail ? 1 : 0);
