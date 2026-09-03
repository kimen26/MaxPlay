#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-lot-dinos.mjs — régénère les 94 audios du plan dont la destination est
// sous site/audio/dinos/ (70 noms · 19 menus · 5 périodes).
//
//   node studio/referentiel/_gen-lot-dinos.mjs              → simulation
//   node studio/referentiel/_gen-lot-dinos.mjs --pour-de-vrai
//
// Mécanique copiée de _gen-consignes.mjs : clé API dans ~/.claude/settings.json,
// POST text-to-speech eleven_v3, puis padding 250 ms + loudnorm via ffmpeg.
//
// Différences spécifiques à ce lot :
//   - texte, voix et réglages viennent de l'entrée du plan, envoyés TELS QUELS
//     (les noms portent le tag [excited] et la graphie phonétique du lexique) ;
//   - skip anti-doublon : toute destination modifiée après le 2026-08-10 23:40
//     (heure locale) est ignorée — mais vérifiée saine (> 10 Ko, durée ffprobe
//     plausible) ; si tronquée, elle est régénérée quand même ;
//   - priorité interne : noms d'abord, puis menus, puis périodes ;
//   - arrêt propre sur erreur de quota persistante (402/429).
//
// NE FAIT PAS : build.mjs, couverture.mjs, plan-generation.mjs, acquitter.mjs,
// ni la régénération du manifest audio — réconciliation par le thread principal.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { RACINE, lireJson } from '../../../referentiel/lib/socle.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');
const SEUIL_SKIP = new Date('2026-08-10T23:40:00'); // heure locale
const PLAN = path.join(RACINE, 'studio', 'referentiel', 'plan-generation.json');

const TAILLE_MIN = 10 * 1024;   // 10 Ko
const DUREE_MIN = 0.8;          // un nom ≈ 1-3 s, menus/périodes plus longs
const DUREE_MAX = 60;
const PAUSE_MS = 1200;
const MAX_TENTATIVES = 3;

function cle() {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE'); process.exit(1); }
  return k;
}

/** Durée en secondes via ffprobe, NaN si illisible. */
function duree(fichier) {
  try {
    const sortie = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1', fichier], { encoding: 'utf8' });
    return parseFloat(sortie.trim());
  } catch { return NaN; }
}

/** Fichier sain : existe, > 10 Ko, durée plausible. */
function sain(fichier) {
  if (!fs.existsSync(fichier)) return { ok: false, raison: 'absent' };
  const taille = fs.statSync(fichier).size;
  if (taille <= TAILLE_MIN) return { ok: false, raison: `${taille} o ≤ 10 Ko` };
  const d = duree(fichier);
  if (!Number.isFinite(d) || d < DUREE_MIN || d > DUREE_MAX) return { ok: false, raison: `durée ${d} s` };
  return { ok: true, taille, duree: d };
}

async function appelEL(entree, apiKey) {
  const reponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${entree.voix_id}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: entree.texte_envoye,
      model_id: entree.modele,
      voice_settings: { ...entree.reglages },
    }),
  });
  if (!reponse.ok) {
    const corps = (await reponse.text()).slice(0, 160);
    const err = new Error(`HTTP ${reponse.status} — ${corps}`);
    err.status = reponse.status;
    throw err;
  }
  return Buffer.from(await reponse.arrayBuffer());
}

async function genererUn(entree, apiKey) {
  const dest = path.join(RACINE, entree.destination);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const brut = dest.replace(/\.mp3$/, '._brut.mp3');

  let dernier;
  for (let tentative = 1; tentative <= MAX_TENTATIVES; tentative++) {
    try {
      fs.writeFileSync(brut, await appelEL(entree, apiKey));
      dernier = null;
      break;
    } catch (e) {
      dernier = e;
      if (e.status === 402 || e.status === 429) {
        if (tentative < MAX_TENTATIVES) {
          await new Promise((r) => setTimeout(r, 10000 * tentative));
          continue;
        }
        const err = new Error(`QUOTA — ${e.message}`);
        err.quota = true;
        throw err;
      }
      throw e;
    }
  }
  if (dernier) throw dernier;

  // Padding 250 ms (attaque coupée en Bluetooth sans lui) + loudnorm.
  execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
    '-codec:a', 'libmp3lame', '-b:a', '128k', dest, '-loglevel', 'error']);
  fs.unlinkSync(brut);
  return sain(dest);
}

// ── sélection et tri ────────────────────────────────────────────────────────
const plan = lireJson(PLAN);
const lot = plan.appels.filter((e) => e.destination && e.destination.startsWith('site/audio/dinos/'));
const rang = (e) => (e.destination.includes('/noms/') ? 0 : e.destination.includes('/periodes/') ? 2 : 1);
lot.sort((a, b) => rang(a) - rang(b));

const aFaire = [];
const skips = [];
for (const e of lot) {
  const dest = path.join(RACINE, e.destination);
  if (fs.existsSync(dest) && fs.statSync(dest).mtime > SEUIL_SKIP) {
    const s = sain(dest);
    if (s.ok) { skips.push(`${e.destination} (${s.taille} o, ${s.duree.toFixed(1)} s)`); continue; }
    console.log(`Skip demandé mais fichier douteux (${s.raison}) → régénération : ${e.destination}`);
  }
  aFaire.push(e);
}

const cout = aFaire.reduce((s, e) => s + e.texte_envoye.length, 0);
console.log(`${lot.length} entrées dinos dans le plan · ${skips.length} skippées · ${aFaire.length} à générer · ~${cout} caractères`);
skips.forEach((s) => console.log(`  [skip sain] ${s}`));

if (!POUR_DE_VRAI) {
  aFaire.forEach((e) => console.log(`  [simulation] ${e.destination}  ← « ${e.texte_envoye.slice(0, 60)} »`));
  console.log('\nSimulation — relancer avec --pour-de-vrai pour générer.');
  process.exit(0);
}

// ── exécution ───────────────────────────────────────────────────────────────
const apiKey = cle();
let ok = 0;
let caracteres = 0;
const echecs = [];
const douteux = [];
for (const entree of aFaire) {
  try {
    const s = await genererUn(entree, apiKey);
    caracteres += entree.texte_envoye.length;
    if (s.ok) {
      ok += 1;
      console.log(`OK   ${entree.destination} (${s.taille} o, ${s.duree.toFixed(1)} s)`);
    } else {
      douteux.push(`${entree.destination} : ${s.raison}`);
      console.log(`??   ${entree.destination} — fichier douteux (${s.raison})`);
    }
  } catch (e) {
    if (e.quota) {
      console.error(`\nARRÊT QUOTA après ${ok} fichiers · ${caracteres} caractères envoyés — ${e.message}`);
      console.error(`Reste dans le lot : ${aFaire.length - ok - douteux.length} entrées (à partir de « ${entree.destination} »)`);
      process.exit(3);
    }
    echecs.push(`${entree.destination} : ${e.message}`);
    console.log(`KO   ${entree.destination} — ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, PAUSE_MS));
}

console.log(`\n${ok} générés sains · ${douteux.length} douteux · ${echecs.length} en échec · ${caracteres} caractères consommés · ${skips.length} skippés`);
if (douteux.length) console.log('Douteux :\n  ' + douteux.join('\n  '));
if (echecs.length) { console.log('Échecs :\n  ' + echecs.join('\n  ')); process.exit(1); }
if (douteux.length) process.exit(1);
