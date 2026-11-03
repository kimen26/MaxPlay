// Preuve i18n audio — en ?lang=en, AUCUN fichier de voix française n'est demandé.
// Audit 2026-11 : victory-sounds (réactions « Bravo ! »), say-nombres (« sept »),
// mj-kit (phonèmes « èm ») jouaient des MP3 FR dans un jeu en anglais.
// On lit les REQUÊTES réseau réelles de Chromium (pas le code) + les textes TTS émis.
// Témoin : la même action en ?lang=fr doit, elle, demander des fichiers FR (sinon le
// détecteur serait aveugle et le vert ne prouverait rien).
//
// Usage : node studio/minijeux/tests/i18n-hors-fr.spec.mjs
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const SITE = path.resolve(import.meta.dirname, '../../../site');
// Dossiers de voix FRANÇAISE : voix/{f,h,wex,phrases}/, nombres/, phonemes/ (hors sous-dossier de langue)
const FR = /sounds\/(voix\/(f|h|wex|phrases)\/|nombres\/|phonemes\/)/;

const checks = [];
const ok = (nom, cond, detail = '') => checks.push([!!cond, nom, detail]);

const browser = await chromium.launch({
  args: ['--allow-file-access-from-files', '--autoplay-policy=no-user-gesture-required'],
});

async function ouvrir(jeu, lang) {
  const page = await browser.newPage({ viewport: { width: 360, height: 740 } });
  const reqs = [];
  const erreurs = [];
  page.on('request', r => { if (/\.mp3(\?|$)/.test(r.url())) reqs.push(decodeURIComponent(r.url())); });
  page.on('pageerror', e => erreurs.push(e.message));
  await page.goto(pathToFileURL(path.join(SITE, `${jeu}.html`)).href + `?lang=${lang}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    window.__tts = [];
    if (window.TTS && TTS.speak) {
      const o = TTS.speak.bind(TTS);
      TTS.speak = (t, opts) => { window.__tts.push(String(t)); return o(t, opts); };
    }
  });
  return { page, reqs, erreurs };
}
const laisserPartir = p => p.waitForTimeout(600); // les requêtes média partent après le retour de evaluate
const frVus = reqs => reqs.filter(u => FR.test(u));

// ── 1. Réactions vocales (victory-sounds) — mj-14 ────────────────────────────
{
  const en = await ouvrir('mj-14', 'en');
  await en.page.evaluate(async () => {
    const pause = ms => new Promise(r => setTimeout(r, ms));
    for (let i = 0; i < 8; i++) { SoundPool.voice('positif'); await pause(150); }
    SoundPool.voice('doux'); await pause(150);
    playEndSound(8, 8); // chemin réel de fin de partie (voix à +1,4 s)
    await pause(4000);
  });
  await laisserPartir(en.page);
  const tts = await en.page.evaluate(() => window.__tts);
  ok('EN réactions : aucun MP3 de voix FR demandé', frVus(en.reqs).length === 0, frVus(en.reqs).join(' | '));
  ok('EN réactions : les MP3 positifs sont ceux de la langue (sounds/voix/en/)',
    en.reqs.some(u => /sounds\/voix\/en\/(f|h|wex)\/(well-done|awesome|you-did-it|brilliant|way-to-go)\.mp3/.test(u)), en.reqs.join(' | '));
  ok('EN réactions : « doux » = TTS du texte du pack, sans emoji',
    tts.includes('Oops, try again'), JSON.stringify(tts));
  ok('EN : aucune erreur JS', en.erreurs.length === 0, en.erreurs.join(' | '));
  await en.page.close();

  const fr = await ouvrir('mj-14', 'fr');
  await fr.page.evaluate(async () => {
    const pause = ms => new Promise(r => setTimeout(r, ms));
    for (let i = 0; i < 3; i++) { SoundPool.voice('positif'); await pause(150); }
  });
  await laisserPartir(fr.page);
  ok('TÉMOIN FR : le détecteur voit bien des MP3 FR (sinon le vert EN ne prouve rien)',
    frVus(fr.reqs).length > 0, fr.reqs.join(' | '));
  await fr.page.close();
}

// ── 2. Nombres (say-nombres) — mj-49 ─────────────────────────────────────────
{
  const en = await ouvrir('mj-49', 'en');
  await en.page.evaluate(() => {
    SayNombres.say(7); SayNombres.say(3, { fete: true }); SayNombres.say(25);
    SayNombres.manque(3); SayNombres.faut(5); SayNombres.oeufs(1); SayNombres.oeufs(4);
  });
  await laisserPartir(en.page);
  const tts = await en.page.evaluate(() => window.__tts);
  ok('EN nombres : aucun MP3 sounds/nombres/ demandé', frVus(en.reqs).length === 0, frVus(en.reqs).join(' | '));
  for (const t of ['7', '25', 'You need 3 more!', 'You need 5 in all!', '1 egg!', '4 eggs!'])
    ok(`EN nombres : TTS dit « ${t} »`, tts.includes(t), JSON.stringify(tts));
  ok('EN nombres : jamais de mot français (sept, trois, œufs…)', !tts.some(t => /sept|trois|œuf|manque|faut/i.test(t)), JSON.stringify(tts));
  await en.page.close();

  const fr = await ouvrir('mj-49', 'fr');
  await fr.page.evaluate(() => { SayNombres.say(7); });
  await laisserPartir(fr.page);
  ok('TÉMOIN FR nombres : n-7.mp3 demandé', fr.reqs.some(u => /sounds\/nombres\/n-7\.mp3/.test(u)), fr.reqs.join(' | '));
  await fr.page.close();
}

// ── 3. Phonèmes (mj-kit) — mj-50 ─────────────────────────────────────────────
{
  const en = await ouvrir('mj-50', 'en');
  await en.page.evaluate(() => { for (const l of Object.keys(MJKit.PHONEMES)) MJKit.sayPhoneme(l); });
  await laisserPartir(en.page);
  const tts = await en.page.evaluate(() => window.__tts);
  ok('EN phonèmes : aucun MP3 sounds/phonemes/ demandé', frVus(en.reqs).length === 0, frVus(en.reqs).join(' | '));
  ok('EN phonèmes : TTS en sons anglais (« mmm », « buh »), pas les graphies FR (« èm », « eu »)',
    tts.includes('mmm') && tts.includes('buh') && !tts.some(t => /^(èm|èf|eu|ès)$/.test(t)), JSON.stringify(tts));
  await en.page.close();

  const fr = await ouvrir('mj-50', 'fr');
  await fr.page.evaluate(() => { MJKit.sayPhoneme('m'); });
  await laisserPartir(fr.page);
  ok('TÉMOIN FR phonèmes : son-me.mp3 demandé', fr.reqs.some(u => /sounds\/phonemes\/son-me\.mp3/.test(u)), fr.reqs.join(' | '));
  await fr.page.close();
}

// ── 4. Jeux chargés en EN : consignes (mj-14, mj-48, mj-55) sans MP3 FR ──────
for (const jeu of ['mj-14', 'mj-48', 'mj-55']) {
  const en = await ouvrir(jeu, 'en');
  await en.page.waitForTimeout(1500);
  ok(`EN ${jeu} au chargement : aucun MP3 de voix FR`, frVus(en.reqs).length === 0, frVus(en.reqs).join(' | '));
  ok(`EN ${jeu} : aucune erreur JS`, en.erreurs.length === 0, en.erreurs.join(' | '));
  await en.page.close();
}

await browser.close();
let bad = 0;
for (const [c, n, d] of checks) { if (!c) bad++; console.log(`  ${c ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m'}  ${n}${!c && d ? `\n        → ${d}` : ''}`); }
console.log(bad ? `\n✗ ${bad} échec(s)` : `\n✓ i18n-hors-fr OK (${checks.length} contrôles)`);
process.exit(bad ? 1 : 0);
