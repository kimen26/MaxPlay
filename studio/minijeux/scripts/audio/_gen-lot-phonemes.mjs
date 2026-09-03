#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-lot-phonemes.mjs — régénère les 21 phonèmes du plan
// (site/sounds/phonemes/ — oubliés de la première parallélisation 2026-08-10).
//
//   node studio/referentiel/_gen-lot-phonemes.mjs              → simulation
//   node studio/referentiel/_gen-lot-phonemes.mjs --pour-de-vrai
//
// Mécanique copiée de _gen-lot-dinos.mjs : texte/voix/réglages de l'entrée du
// plan envoyés tels quels, padding 250 ms + loudnorm, skip anti-doublon.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { RACINE, lireJson } from '../../../referentiel/lib/socle.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');
const SEUIL_SKIP = new Date('2026-08-10 23:40:00'); // heure locale
const PLAN = path.join(RACINE, 'studio', 'referentiel', 'plan-generation.json');
const PREFIXE = 'site/sounds/phonemes/';

const TAILLE_MIN = 5 * 1024;    // 5 Ko — un phonème est très court
const DUREE_MIN = 0.4;
const DUREE_MAX = 15;
const PAUSE_MS = 1200;
const MAX_TENTATIVES = 3;

function cle() {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE'); process.exit(1); }
  return k;
}

function duree(fichier) {
  try {
    const sortie = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1', fichier], { encoding: 'utf8' });
    return parseFloat(sortie.trim());
  } catch { return NaN; }
}

function sain(fichier) {
  if (!fs.existsSync(fichier)) return { ok: false, raison: 'absent' };
  const taille = fs.statSync(fichier).size;
  if (taille <= TAILLE_MIN) return { ok: false, raison: `${taille} o ≤ 5 Ko` };
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

  execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
    '-codec:a', 'libmp3lame', '-b:a', '128k', dest, '-loglevel', 'error']);
  fs.unlinkSync(brut);
  return sain(dest);
}

// ── sélection ───────────────────────────────────────────────────────────────
const plan = lireJson(PLAN);
const lot = plan.appels.filter((e) => e.destination && e.destination.startsWith(PREFIXE));

const aFaire = [];
const skips = [];
for (const e of lot) {
  const dest = path.join(RACINE, e.destination);
  if (fs.existsSync(dest) && fs.statSync(dest).mtime > SEUIL_SKIP) {
    const s = sain(dest);
    if (s.ok) { skips.push(e.destination); continue; }
    console.log(`Skip demandé mais fichier douteux (${s.raison}) → régénération : ${e.destination}`);
  }
  aFaire.push(e);
}

const cout = aFaire.reduce((s, e) => s + e.texte_envoye.length, 0);
console.log(`${lot.length} entrées phonèmes · ${skips.length} skippées · ${aFaire.length} à générer · ~${cout} caractères`);

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
for (const entree of aFaire) {
  try {
    const s = await genererUn(entree, apiKey);
    caracteres += entree.texte_envoye.length;
    ok += 1;
    console.log(`OK   ${entree.destination} (${s.taille} o, ${(s.duree || 0).toFixed(1)} s)`);
  } catch (e) {
    if (e.quota) {
      console.error(`\nARRÊT QUOTA après ${ok} fichiers · ${caracteres} caractères — ${e.message}`);
      process.exit(3);
    }
    echecs.push(`${entree.destination} : ${e.message}`);
    console.log(`KO   ${entree.destination} — ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, PAUSE_MS));
}

console.log(`\n${ok} générés · ${echecs.length} en échec · ${caracteres} caractères consommés · ${skips.length} skippés`);
if (echecs.length) { console.log('Échecs :\n  ' + echecs.join('\n  ')); process.exit(1); }
