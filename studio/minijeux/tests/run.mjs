// Harnais de test headless mini-jeux MaxPlay — EP-038
// Usage : npm run mj:test mj-21            (teste site/mj-21.html)
//         npm run mj:test mj-21 <fichier>  (teste un fichier précis, ex: preuve rétro)
// But : sortir Papa Yann du rôle de débogueur. Vert = OK, Rouge = bug avant push.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync, existsSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const mj = process.argv[2];
if (!mj) { console.error('Usage: npm run mj:test <mj-XX> [fichier.html]'); process.exit(2); }

const htmlPath = process.argv[3]
  ? resolve(process.argv[3])
  : resolve(__dir, '..', '..', '..', 'site', `${mj}.html`);

// Certaines specs sont AUTONOMES (collection, mur-nid, cloud-merge…) : elles
// bâtissent leur propre harnais et n'ont pas de page site/<nom>.html. Les
// passer à ce runner produisait un rouge trompeur (ERR_FILE_NOT_FOUND lu
// comme "jeu cassé"). On oriente au lieu de mentir.
if (!existsSync(htmlPath)) {
  const ownSpec = resolve(__dir, `${mj}.spec.mjs`);
  if (existsSync(ownSpec)) {
    console.error(`\x1b[33m${mj} n'a pas de page site/${mj}.html : c'est une spec AUTONOME.\x1b[0m`);
    console.error(`Lance-la directement :  node studio/minijeux/tests/${mj}.spec.mjs`);
  } else {
    console.error(`\x1b[31mIntrouvable : ${htmlPath}\x1b[0m`);
  }
  process.exit(2);
}

// D-014 (P30 Pro, 360 px) : captures dans .artifacts/ gitignoré, JAMAIS dans
// docs/handoffs/rapports/captures (72 PNG modifiés à chaque run sinon).
const artifacts = resolve(__dir, '.artifacts');
const captures = resolve(artifacts, 'captures');
mkdirSync(captures, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
const errors = [];

// D-015 : cibles de jeu de l'enfant → 80 px (norme STANDARD-MJ, non mesurée ici,
// contrat dessin). Tout AUTRE bouton → 48×48 plancher mesuré ci-dessous.
const TAP_MIN = 48;

// Jeux en défaut aujourd'hui sur le contrôle "fin de partie visible" (.end-wrap
// runtime). Liste NOMINATIVE, n'en ajoute jamais : seul un jeu déjà corrigé en sort.
const LEGACY_FIN_MAISON = [
  // HO-T02 (2026-10-08) : les 10 autres sont sortis (specs finissent sur l'écran standard).
  // mj-32 : atelier sandbox sans fin de partie par design (« Fini ! » = sauvegarde),
  // fin standard à statuer par Papa Yann (cf. audit-gabarit.mjs LEGACY_FIN_MAISON).
  'mj-32',
];

// Jeux en défaut aujourd'hui sur le contrôle "une seule voix à la fois". Liste
// NOMINATIVE, n'en ajoute jamais : bug produit réel (SFX de récompense/fanfare
// qui démarre sur un setTimeout fixe sans attendre la fin de la narration/du nom
// dino en cours — cf. mj-golden.js:655, mj-06/mj-24 « pop-apparition.mp3 » pendant
// une phrase TTS ou un MP3 de nom), hors périmètre de ce chantier (R06 = harnais,
// pas correction des jeux).
// mj-22 : chevauchement intermittent (course TTS "Bravo…" / pop-apparition.mp3 sur
// setTimeout fixe) — vert ou rouge selon la vitesse d'exécution Playwright ce jour-là.
const LEGACY_VOIX_CHEVAUCHEMENT = [
  // HO-T01 (2026-10-08) : le code partagé (SoundPool.quandLibre / voix qui coupe la
  // voix / TTS.isSpeaking) a réglé les chevauchements des sons décoratifs et des
  // voix. Restent UNIQUEMENT des chevauchements propres au jeu (son/Audio lancé
  // par le jeu lui-même, hors registre SoundPool) :
  'mj-09',  // tada.mp3 puis pop lancés par le jeu pendant le TTS « Métro … »
  'mj-13a', // applaudissements.mp3 du jeu par-dessus la phrase de consigne MP3
  'mj-13c', // tada/applaudissements du jeu par-dessus le TTS « Combien de bus… »
  'mj-15',  // trombone-oups + oups-doux : deux sons d'erreur empilés par le jeu
  'mj-19',  // nom dino via playDinoNom (js/gen/dinos-audio-manifest.js, généré par
            // studio/dino/.../_gen-audio-manifest.cjs, hors registre SoundPool)
  'mj-24',  // idem playDinoNom + klaxon/trombone du jeu sur le TTS de consigne
  'mj-28',  // idem playDinoNom + TTS « Bravo ! » du jeu
  'mj-38',  // intermittent : boing.mp3 (retour de tap du jeu) puis fanfare de fin, SFX sur SFX
  'mj-20',  // mj-20.html:744 : confirmation « N ! » en priority:false à +350 ms du mot du quiz, intermittent (course 350 ms vs durée du mot)
  'mj-32',  // deux fanfares victoire-v2/v3 : double fin de partie dans le jeu
  'mj-42',  // sifflet-glissant du jeu pendant la fanfare de victoire
  'mj-46',  // nombres/N-oeufs.mp3 du jeu pendant la consigne MP3
  'mj-51',  // phonème du jeu pendant le klaxon/oups d'erreur
  // specs orphelines pilotées par run.mjs (run-autonomes.mjs) :
  'mj-49-nid',          // nombres/il-en-manque-N.mp3 du jeu pendant la consigne
  'mj-golden-nid',      // mj-24 : klaxon du jeu + playDinoNom (cf. mj-24)
  'mj-golden-savefail', // mj-24 : pop pendant playDinoNom (cf. mj-19)
];

// Jeux (et coque "index") en défaut aujourd'hui sur le contrôle "cibles
// tactiles ≥ 48×48". Liste NOMINATIVE, n'en ajoute jamais : bouton existant
// sous le plancher (D-015 : ← 44×44 sur index, ↶ Recommencer 143×44 sur
// mj-38, 💡 Indice 94×33 sur mj-21…), hors périmètre de ce chantier.
const LEGACY_CIBLES_48 = [];

// --allow-file-access-from-files + --disable-web-security : en prod (GitHub Pages https),
// HTML + assets sont same-origin donc jamais de canvas taint. En file:// local, Chromium
// traite chaque fichier comme une origine opaque distincte (canvas tainted dès drawImage()
// d'une <img> même voisine) — ces flags répliquent fidèlement le comportement prod pour les
// MJ qui font du canvas+image (ex: mj-32 flood fill coloriage).
// --autoplay-policy=no-user-gesture-required : sans ce flag, Chromium bloque
// silencieusement l'audio non déclenché par un geste utilisateur en headless — le
// MP3 "joue" (play() résout, currentTime avance) mais ne déclenche jamais 'ended'
// ni 'pause' ni 'error', ce qui faisait ressortir un chevauchement fantôme sur
// quasi tous les MJ (contrôle (c) ci-dessous) : le clip précédent ne se marquait
// jamais "fini" avant le suivant.
const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security', '--autoplay-policy=no-user-gesture-required'] });

// D-014 : viewport par défaut 360×740 (P30 Pro), au lieu de 480×900 (hérité Phaser).
const page = await browser.newPage({ viewport: { width: 360, height: 740 } });

// Une seule voix à la fois (L-111) : on patche play() et speechSynthesis.speak()
// AVANT tout script du jeu pour détecter le chevauchement fanfare + MP3 + TTS.
await page.addInitScript(() => {
  window.__voixActives = [];
  window.__voixChevauchement = [];
  const noter = (source) => {
    const actives = window.__voixActives.filter(v => !v.finie);
    if (actives.length > 0) {
      window.__voixChevauchement.push(`${source} démarre pendant : ${actives.map(v => v.source).join(', ')}`);
    }
    const entry = { source, finie: false };
    window.__voixActives.push(entry);
    return entry;
  };
  const origPlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...args) {
    const src = this.currentSrc || this.src || 'media';
    const entry = noter(`audio:${src}`);
    const finir = () => { entry.finie = true; };
    this.__voixEntry = entry;
    this.addEventListener('ended', finir, { once: true });
    this.addEventListener('pause', finir, { once: true });
    this.addEventListener('error', finir, { once: true });
    return origPlay.apply(this, args);
  };
  // pause() émet son évènement 'pause' en différé (tâche suivante) : un
  // couper-puis-lancer synchrone (nouvelle voix qui coupe l'ancienne) ressortirait
  // à tort comme chevauchement. Même logique que synth.cancel ci-dessous.
  const origPause = HTMLMediaElement.prototype.pause;
  HTMLMediaElement.prototype.pause = function (...args) {
    if (this.__voixEntry) this.__voixEntry.finie = true;
    return origPause.apply(this, args);
  };
  if (window.speechSynthesis) {
    const synth = window.speechSynthesis;
    const ttsEntries = [];
    const origSpeak = synth.speak.bind(synth);
    synth.speak = function (utterance) {
      const entry = noter(`tts:${(utterance && utterance.text || '').slice(0, 30)}`);
      ttsEntries.push(entry);
      const finir = () => { entry.finie = true; };
      utterance.addEventListener('end', finir, { once: true });
      utterance.addEventListener('error', finir, { once: true });
      // Headless : aucun moteur vocal, 'end' ne vient jamais. On émule la fin
      // de parole (mots ÷ 140 mots/min ÷ rate, ×0.9 = un peu plus court que
      // l'estimation de tts.js, donc le code reste jugé sur une marge réelle).
      const nbMotsTts = String(utterance && utterance.text || '').trim().split(/\s+/).filter(Boolean).length || 1;
      const rateTts = (utterance && utterance.rate) || 1;
      setTimeout(finir, (nbMotsTts / 140 / rateTts) * 60000 * 0.9);
      return origSpeak(utterance);
    };
    // cancel() coupe la lecture en cours (contrat TTS.speak priority:true, tts.js:66) :
    // en headless, aucun moteur vocal réel ne tourne, donc 'end'/'error' ne se déclenchent
    // jamais tout seuls — sans ce hook, tout enchaînement légitime cancel-then-speak
    // ressortirait comme un chevauchement fantôme.
    const origCancel = synth.cancel.bind(synth);
    synth.cancel = function (...args) {
      for (const e of ttsEntries) e.finie = true;
      return origCancel(...args);
    };
  }
});

// Smoke : toute erreur JS / console.error = échec immédiat (aurait tué la saga "Object.entries")
// EXCEPTION calibrée 2026-08-10 : les consignes MP3 sounds/voix/phrases/<slug>.mp3
// sont OPTIONNELLES par design (mj-shell.direConsigne retombe sur le TTS navigateur
// si le fichier est absent — comportement voulu, cf. backlog 2026-08-10). Le 404
// navigateur d'une consigne pas encore générée n'est donc PAS un crash : on l'ignore,
// tout le reste (JS, images, css) continue de bloquer.
// EXCEPTION calibrée 2026-09-10 (mj-32) : le catalogue de coloriage sonde
// `<base>_coloriage.webp` pour CHAQUE dino et CHAQUE plante, et retire de la grille
// les entrées dont l'image manque (`img.onerror`). L'absence est donc du contrôle de
// flux VOULU — 13 des 19 plantes n'ont pas encore de lineart — et non une panne. Seul
// ce suffixe est toléré : n'importe quel autre asset manquant reste bloquant.
const ASSET_OPTIONNEL = [
  /sounds\/voix\/phrases\//,   // consignes MP3, repli TTS (2026-08-10)
  /_coloriage\.webp$/          // sondes du catalogue de coloriage (2026-09-10)
];
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', m => {
  if (m.type() !== 'error') return;
  const loc = m.location();
  const url = (loc && loc.url) || '';
  if (/Failed to load resource/.test(m.text()) && ASSET_OPTIONNEL.some(re => re.test(url))) return;
  errors.push(`console.error: ${m.text()}`);
});

let verdict = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) verdict = 1; };

try {
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
  const spec = await import(pathToFileURL(resolve(__dir, `${mj}.spec.mjs`)).href);
  await spec.run({ page, ok });
} catch (e) {
  errors.push(`exception: ${e.message}`);
  verdict = 1;
}

ok('Aucune erreur JS / console (smoke)', errors.length === 0, errors.join(' | '));

// (a) capture 360 (viewport de rendu courant) — AVANT tout reload, l'état de
// jeu construit par la spec (fin de partie, chevauchement audio) doit encore
// être en place : un reload le remet à zéro (D-014, cause du faux FAIL initial).
const shot360 = resolve(captures, `${mj}-360.png`);
await page.screenshot({ path: shot360 }).catch(() => {});

// (b) cibles tactiles ≥ 48×48 (D-015 : plancher hors cibles de jeu enfant, non taguées ici)
const petitesCibles = await page.evaluate((min) => {
  const els = document.querySelectorAll('button, .tap, [data-act], a.btn');
  const petites = [];
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue; // masqué / display:none
    const style = window.getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none') continue;
    if (r.width < min || r.height < min) {
      const label = (el.textContent || el.getAttribute('data-act') || el.className || el.tagName).toString().trim().slice(0, 30);
      petites.push(`${label} (${Math.round(r.width)}x${Math.round(r.height)})`);
    }
  }
  return petites;
}, TAP_MIN);
if (LEGACY_CIBLES_48.includes(mj)) {
  console.log(`\x1b[33m⚠ ${mj} en LEGACY_CIBLES_48 : cible(s) < 48×48 connue(s), non bloquant (n'en ajoute jamais)\x1b[0m`);
  if (petitesCibles.length) console.log(`\x1b[2m  → ${petitesCibles.join(' | ')}\x1b[0m`);
} else {
  ok('Cibles tactiles visibles ≥ 48×48 (button, .tap, [data-act], a.btn)',
    petitesCibles.length === 0, petitesCibles.join(' | '));
}

// (c) une seule voix à la fois — chevauchement fanfare/MP3/TTS (L-111)
const chevauchement = await page.evaluate(() => window.__voixChevauchement || []).catch(() => []);
if (LEGACY_VOIX_CHEVAUCHEMENT.includes(mj)) {
  console.log(`\x1b[33m⚠ ${mj} en LEGACY_VOIX_CHEVAUCHEMENT : chevauchement audio/TTS connu, non bloquant (n'en ajoute jamais)\x1b[0m`);
} else {
  ok('Une seule voix à la fois (aucun chevauchement audio/TTS)',
    chevauchement.length === 0, chevauchement.join(' | '));
}

// (d) fin de partie visible au runtime (.end-wrap), sauf jeu LEGACY nominatif.
// Hors périmètre pour tout id qui n'est pas un mini-jeu (ex: "index" = la coque,
// jamais de fin de partie par design) : ni PASS ni LEGACY, juste hors contrat.
if (!/^mj-/.test(mj)) {
  console.log(`\x1b[2m— ${mj} n'est pas un mini-jeu : .end-wrap hors contrat, non vérifié\x1b[0m`);
} else if (LEGACY_FIN_MAISON.includes(mj)) {
  console.log(`\x1b[33m⚠ ${mj} en LEGACY_FIN_MAISON : .end-wrap non vérifié (n'en ajoute jamais)\x1b[0m`);
} else {
  const endWrapVisible = await page.evaluate(() => {
    const el = document.querySelector('.end-wrap');
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return r.width > 0 && r.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
  }).catch(() => false);
  ok('.end-wrap visible en fin de spec (runtime)', endWrapVisible);
}

// (e) non-régression 320 : recharge (état de jeu perdu, volontaire) et FAIL si
// débordement horizontal. Dernier, car il repart de zéro.
await page.setViewportSize({ width: 320, height: 568 });
await page.reload({ waitUntil: 'networkidle' }).catch(() => {});
const overflow320 = await page.evaluate(() => {
  const html = document.documentElement;
  return { scrollWidth: html.scrollWidth, innerWidth: window.innerWidth };
}).catch(() => ({ scrollWidth: 0, innerWidth: 320 }));
ok('320px : pas de débordement horizontal (non-régression)',
  overflow320.scrollWidth <= overflow320.innerWidth,
  `scrollWidth=${overflow320.scrollWidth} innerWidth=${overflow320.innerWidth}`);
const shot320 = resolve(captures, `${mj}-320.png`);
await page.screenshot({ path: shot320 }).catch(() => {});

await browser.close();

console.log(`\n── ${mj} ──`);
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(`  captures: ${shot360} | ${shot320}`);
console.log(verdict === 0 ? `\n\x1b[32m✓ ${mj} OK — push autorisé\x1b[0m\n`
                          : `\n\x1b[31m✗ ${mj} CASSÉ — ne pas pusher, corriger\x1b[0m\n`);
process.exit(verdict);
