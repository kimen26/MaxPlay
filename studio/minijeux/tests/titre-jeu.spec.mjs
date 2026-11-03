// titre-jeu.spec.mjs — le menu DIT le titre du jeu au toucher (PY 2026-11-03).
//
// Accueil réel (site/index.html, 360 × 740). Prouve :
//   A. MP3 présent : le titre sonore du BON jeu est demandé (voix/fr/titres/<id>.mp3),
//      UNE seule voix à la fois, le jeu ne s'ouvre qu'APRÈS la fin du titre
//      (rien ne joue encore au départ de la page : la consigne ne sera pas coupée) ;
//   B. MP3 absent : repli TTS navigateur avec le titre du catalogue, ouverture ≤ 2,5 s ;
//   C. ?lang=en : MP3 voix/en/titres/, repli TTS avec le titre ANGLAIS (jamais le français) ;
//   D. double toucher : un seul titre, une seule ouverture, un seul tirage dans le sac ;
//   E. Musique (page fixe) : aucun titre dit, ouverture directe.
// Les MP3 sont simulés par un WAV muet de 600 ms (aucun appel ElevenLabs).
//
// Usage : node studio/minijeux/tests/titre-jeu.spec.mjs
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE = resolve(__dir, '..', '..', '..', 'site');
const INDEX = pathToFileURL(resolve(SITE, 'index.html')).href;
const ARTIFACTS = resolve(__dir, '.artifacts');
mkdirSync(ARTIFACTS, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
let fail = 0;
const ok = (name, cond, detail = '') => {
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? ' — ' + detail : ''}`);
  if (!cond) fail++;
};

// ── catalogue + pack EN lus tels que le site les voit ──────────────────────
const lire = (rel, extra = {}) => {
  const sb = { window: {}, ...extra };
  vm.createContext(sb);
  vm.runInContext(readFileSync(resolve(SITE, rel), 'utf8'), sb);
  return sb;
};
const CAT = lire('js/catalog.js').window.MAXPLAY_CATALOG;
const EN = lire('js/gen/i18n/mj-strings.en.js').window.MJ_STRINGS;
const parId = Object.fromEntries(CAT.map((e) => [e.id, e]));
const idDe = (url) => url.split('/').pop().replace('.html', '');

// WAV muet 600 ms (8 kHz, 16 bits, mono) : assez pour « jouer » puis « finir ».
function wavMuet(ms) {
  const n = Math.round(8000 * ms / 1000), data = Buffer.alloc(n * 2);
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVEfmt ', 8);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(8000, 24); h.writeUInt32LE(16000, 28); h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}
const WAV = wavMuet(600);

// Espion injecté dans la page (et dans la page suivante : la mémoire passe par
// sessionStorage). Journalise chaque lecture audio et chaque phrase TTS.
const ESPION = () => {
  const lire = () => { try { return JSON.parse(sessionStorage.getItem('tj') || 'null'); } catch (e) { return null; } };
  const etat = lire() || { audios: [], tts: [], maxSimultanes: 0, actifsAuDepart: null, fins: [] };
  const sauver = () => { try { sessionStorage.setItem('tj', JSON.stringify(etat)); } catch (e) {} };
  const actifs = new Set();
  const play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    const a = this;
    etat.audios.push({ src: a.src.split('/sounds/')[1] || a.src, t: Date.now() });
    actifs.add(a);
    // seules les VOIX comptent : le jingle d'accueil (index.html, moteur/klaxon) est un SFX décoratif
    etat.maxSimultanes = Math.max(etat.maxSimultanes, [...actifs].filter((x) => x.src.includes('/voix/')).length);
    const fin = () => { if (actifs.delete(a)) { etat.fins.push({ src: a.src, t: Date.now() }); sauver(); } };
    a.addEventListener('ended', fin, { once: true });
    a.addEventListener('pause', fin, { once: true });
    a.addEventListener('error', fin, { once: true });
    sauver();
    return play.apply(this, arguments);
  };
  if (window.speechSynthesis) {
    window.speechSynthesis.speak = (u) => { etat.tts.push({ text: u.text, lang: u.lang, t: Date.now() }); sauver(); };
  }
  addEventListener('pagehide', () => { etat.actifsAuDepart = [...actifs].filter((x) => x.src.includes('/voix/')).length; etat.tDepart = Date.now(); sauver(); });
};

const browser = await chromium.launch({
  args: ['--allow-file-access-from-files', '--disable-web-security', '--autoplay-policy=no-user-gesture-required'],
});

async function nouvellePage({ mp3 }) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const page = await ctx.newPage();
  const demandes = { titres: [], navigations: [] };
  page.on('pageerror', (e) => demandes.erreur = (demandes.erreur || '') + e.message);
  await page.addInitScript(() => { try { if (!sessionStorage.getItem('init')) { localStorage.clear(); sessionStorage.setItem('init', '1'); } } catch (e) {} });
  await page.addInitScript(ESPION);
  await page.route(/\/(mj-[^/]+|lecture|musique)\.html$/, (r) => {
    demandes.navigations.push({ url: r.request().url(), t: Date.now() });
    return r.fulfill({ contentType: 'text/html', body: '<p>stub</p>' });
  });
  await page.route(/\/sounds\/voix\/[a-z-]+\/titres\/[^/]+\.mp3$/, (r) => {
    demandes.titres.push(r.request().url().split('/sounds/')[1]);
    return mp3 ? r.fulfill({ contentType: 'audio/wav', body: WAV }) : r.fulfill({ status: 404, body: '' });
  });
  return { ctx, page, demandes };
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

try {
  // ── A. MP3 présent ──────────────────────────────────────────────────────
  console.log('A. MP3 présent (fr)');
  {
    const { ctx, page, demandes } = await nouvellePage({ mp3: true });
    await ouvrirArmoire(page);
    const t0 = Date.now();
    await page.click('.casier[aria-label="Chiffres"]');
    await page.waitForTimeout(250);
    ok('la carte s\'anime pendant le titre', await page.locator('.casier.titre-dit').count() === 1);
    await page.screenshot({ path: resolve(ARTIFACTS, 'titre-jeu-360x740.png') });
    ok('le jeu n\'est PAS encore ouvert pendant le titre', demandes.navigations.length === 0);
    const parti = await attendre(() => demandes.navigations.length > 0);
    ok('le jeu s\'ouvre à la fin du titre', parti);
    const id = parti ? idDe(demandes.navigations[0].url) : '';
    ok('le jeu ouvert est un jeu de la case Chiffres', jeuxDe('chiffres').includes(id), id);
    ok('le titre sonore du bon jeu est demandé (voix/fr/titres/<id>.mp3)',
      demandes.titres.length === 1 && demandes.titres[0] === `voix/fr/titres/${id}.mp3`, JSON.stringify(demandes.titres));
    ok('ouverture en moins de 2,5 s', parti && demandes.navigations[0].t - t0 < 2500);
    await page.waitForLoadState('load');
    const j = await page.evaluate(() => JSON.parse(sessionStorage.getItem('tj')));
    ok('une seule voix à la fois (jamais 2 voix simultanées)', j.maxSimultanes === 1, 'max=' + j.maxSimultanes + ' ' + JSON.stringify(j.audios));
    ok('aucun TTS en plus du MP3', j.tts.length === 0);
    ok('rien ne joue encore quand la page du jeu prend la main (consigne non coupée)', j.actifsAuDepart === 0, 'actifs=' + j.actifsAuDepart);
    ok('le titre est fini AVANT le départ de la page', j.fins.some((f) => f.src.includes('/titres/') && f.t <= j.tDepart), JSON.stringify(j.fins));
    ok('aucune exception JS', !demandes.erreur, demandes.erreur);
    await ctx.close();
  }

  // ── B. MP3 absent -> repli TTS ──────────────────────────────────────────
  console.log('B. MP3 absent -> TTS navigateur');
  {
    const { ctx, page, demandes } = await nouvellePage({ mp3: false });
    await ouvrirArmoire(page);
    const t0 = Date.now();
    await page.click('.casier[aria-label="Lettres"]');
    const parti = await attendre(() => demandes.navigations.length > 0, 4000);
    ok('le jeu s\'ouvre quand même (plafond ≤ 2,5 s)', parti && demandes.navigations[0].t - t0 < 2500);
    const id = parti ? idDe(demandes.navigations[0].url) : '';
    await page.waitForLoadState('load');
    const j = await page.evaluate(() => JSON.parse(sessionStorage.getItem('tj')));
    ok('TTS : le titre du catalogue est dit', j.tts.length === 1 && j.tts[0].text === parId[id]?.titre, JSON.stringify(j.tts));
    ok('TTS en fr-FR', j.tts[0]?.lang === 'fr-FR');
    await ctx.close();
  }

  // ── C. langue anglaise ──────────────────────────────────────────────────
  console.log('C. ?lang=en');
  {
    const { ctx, page, demandes } = await nouvellePage({ mp3: false });
    await ouvrirArmoire(page, '?lang=en');
    await page.waitForTimeout(300);
    await page.click('.casier[aria-label="Dino"]');
    const parti = await attendre(() => demandes.navigations.length > 0, 4000);
    const id = parti ? idDe(demandes.navigations[0].url) : '';
    await page.waitForLoadState('load');
    const j = await page.evaluate(() => JSON.parse(sessionStorage.getItem('tj')));
    ok('MP3 anglais demandé (voix/en/titres/<id>.mp3)', demandes.titres[0] === `voix/en/titres/${id}.mp3`, JSON.stringify(demandes.titres));
    ok('TTS : le titre ANGLAIS est dit, pas le français', j.tts.length === 1 && j.tts[0].text === EN[id]?.titre, JSON.stringify(j.tts));
    ok('TTS en en-US', j.tts[0]?.lang === 'en-US');
    await ctx.close();
  }

  // ── D. double toucher ───────────────────────────────────────────────────
  console.log('D. double toucher');
  {
    const { ctx, page, demandes } = await nouvellePage({ mp3: true });
    await ouvrirArmoire(page);
    await page.click('.casier[aria-label="Puzzle"]');
    await page.click('.casier[aria-label="Grilles"]', { force: true }).catch(() => {});
    await attendre(() => demandes.navigations.length > 0);
    await page.waitForTimeout(900);
    ok('un seul titre demandé', demandes.titres.length === 1, JSON.stringify(demandes.titres));
    ok('une seule ouverture', demandes.navigations.length === 1, String(demandes.navigations.length));
    await ctx.close();
  }

  // ── E. Musique : page fixe, pas de titre de jeu ─────────────────────────
  console.log('E. Musique');
  {
    const { ctx, page, demandes } = await nouvellePage({ mp3: true });
    await ouvrirArmoire(page);
    await page.click('.casier[aria-label="Musique"]');
    const parti = await attendre(() => demandes.navigations.length > 0, 1500);
    ok('Musique s\'ouvre tout de suite, sans titre', parti && demandes.titres.length === 0);
    await ctx.close();
  }
} finally {
  await browser.close();
}

console.log(fail ? `\n${FAIL} ${fail} échec(s)` : `\n${PASS} titre-jeu.spec`);
process.exit(fail ? 1 : 0);
