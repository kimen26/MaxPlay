#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-lot-nombres.mjs — lot « nombres / époques / atomes / pièces » du plan
// de génération (mission ponctuelle 2026-08-10).
//
//   node studio/referentiel/_gen-lot-nombres.mjs            → simulation
//   node studio/referentiel/_gen-lot-nombres.mjs --pour-de-vrai
//
// Périmètre STRICT : entrées de plan-generation.json dont la destination
// commence par l'un des 4 préfixes ci-dessous. Rien d'autre n'est touché.
//
// Anti-doublon : toute entrée dont le fichier destination a été modifié après
// le SEUIL est ignorée (un agent parallèle l'a déjà produite) — après contrôle
// de santé (> 10 Ko, durée ffprobe > 0). Un fichier skipé mais tronqué est
// remis dans la file.
//
// Priorité : créations (fichier absent) d'abord, remplacements ensuite.
// Traitement : eleven_v3, réglages de l'entrée, puis padding 250 ms + loudnorm
// (règles gravées dans site/sounds/_BANQUE-SONS.md § 3).
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { RACINE, existe, lireJson } from '../../../referentiel/lib/socle.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');

const PREFIXES = [
  'site/sounds/nombres/',
  'site/sounds/epoques/',
  'site/sounds/atomes/',
  'site/sounds/pieces/',
];
const SEUIL_MS = new Date('2026-08-10T23:40:00').getTime();
const TAILLE_MIN = 10 * 1024;
const PAUSE_MS = 1200;
const REESSAIS = 2;

function cle() {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE'); process.exit(1); }
  return k;
}

/** Durée en secondes via ffprobe, NaN si illisible. */
function duree(fichier) {
  try {
    const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
      '-of', 'csv=p=0', fichier], { encoding: 'utf8' });
    return parseFloat(out.trim());
  } catch { return NaN; }
}

/** Fichier sain : > 10 Ko et durée > 0. */
function sain(fichier) {
  if (!existe(fichier)) return false;
  if (fs.statSync(fichier).size <= TAILLE_MIN) return false;
  const d = duree(fichier);
  return Number.isFinite(d) && d > 0;
}

async function genererUn(entree, apiKey) {
  const dest = path.join(RACINE, entree.destination);
  const brut = dest.replace(/\.mp3$/i, '') + '_brut.mp3';

  const reponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${entree.voix_id}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: entree.texte_envoye,
      model_id: entree.modele || 'eleven_v3',
      voice_settings: entree.reglages || {},
    }),
  });
  if (!reponse.ok) {
    const corps = (await reponse.text()).slice(0, 160);
    const err = new Error(`HTTP ${reponse.status} — ${corps}`);
    err.status = reponse.status;
    throw err;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(brut, Buffer.from(await reponse.arrayBuffer()));
  try {
    execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
      '-codec:a', 'libmp3lame', '-b:a', '128k', dest, '-loglevel', 'error']);
  } finally {
    if (existe(brut)) fs.unlinkSync(brut);
  }
  return { taille: fs.statSync(dest).size, duree: duree(dest) };
}

// ── assemblage de la file ───────────────────────────────────────────────────
const plan = lireJson(path.join(RACINE, 'studio', 'referentiel', 'plan-generation.json'));
const entrees = (Array.isArray(plan) ? plan : plan.appels || []).filter(
  (e) => e.destination && PREFIXES.some((pr) => e.destination.startsWith(pr)),
);

const aFaire = [];
const skippes = [];
const recuperes = [];
for (const e of entrees) {
  const dest = path.join(RACINE, e.destination);
  if (existe(dest) && fs.statSync(dest).mtimeMs > SEUIL_MS) {
    if (sain(dest)) { skippes.push(e); continue; }
    recuperes.push(e); // skipé mais tronqué → on régénère
  }
  aFaire.push(e);
}
// Priorité : créations d'abord, remplacements ensuite.
aFaire.sort((a, b) => (a.action === 'creer' ? 0 : 1) - (b.action === 'creer' ? 0 : 1));

const coutTotal = aFaire.reduce((s, e) => s + e.texte_envoye.length, 0);
const nbCreer = aFaire.filter((e) => e.action === 'creer').length;
console.log(`${entrees.length} entrées · ${skippes.length} skipées (saines, post-seuil) · ` +
  `${recuperes.length} récupérées (skipées mais tronquées) · ${aFaire.length} à générer ` +
  `(${nbCreer} créations, ${aFaire.length - nbCreer} remplacements) · ~${coutTotal} caractères`);

if (!POUR_DE_VRAI) {
  for (const e of aFaire) console.log(`  [simulation] ${e.destination}  ← « ${e.texte_envoye} »`);
  console.log('\nSimulation — relancer avec --pour-de-vrai pour générer.');
  process.exit(0);
}

// ── exécution ───────────────────────────────────────────────────────────────
const apiKey = cle();
let ok = 0;
let caracteres = 0;
const echecs = [];
const restants = [];
let quotaMort = false;

for (const [i, entree] of aFaire.entries()) {
  if (quotaMort) { restants.push(entree); continue; }
  let fait = false;
  let derniereErreur = null;
  for (let essai = 0; essai <= REESSAIS && !fait; essai++) {
    try {
      const r = await genererUn(entree, apiKey);
      if (r.taille <= TAILLE_MIN || !(r.duree > 0)) {
        throw new Error(`fichier produit invalide (${r.taille} o, durée ${r.duree})`);
      }
      fait = true;
      ok += 1;
      caracteres += entree.texte_envoye.length;
      console.log(`OK   ${entree.destination} (${r.taille} o, ${r.duree.toFixed(2)} s)`);
    } catch (e) {
      derniereErreur = e;
      if (e.status === 402 || e.status === 429) {
        if (essai < REESSAIS) {
          console.log(`…quota ${e.status}, pause 30 s puis réessai (${entree.destination})`);
          await new Promise((r) => setTimeout(r, 30000));
        } else {
          quotaMort = true;
          console.log(`STOP quota — HTTP ${e.status} persistant sur ${entree.destination}`);
        }
      } else {
        console.log(`KO   ${entree.destination} — ${e.message}`);
        break; // erreur non-quota : inutile de réessayer
      }
    }
  }
  if (!fait && !quotaMort) echecs.push(`${entree.destination} : ${derniereErreur.message}`);
  if (!fait && quotaMort) restants.push(entree);
  if (!quotaMort && i < aFaire.length - 1) await new Promise((r) => setTimeout(r, PAUSE_MS));
}

console.log('\n── RAPPORT ─────────────────────────────────────────────');
console.log(`produits            : ${ok}`);
console.log(`skippés (sains)     : ${skippes.length}`);
console.log(`caractères consommés: ${caracteres} / ~${coutTotal} prévus`);
console.log(`échecs (non-quota)  : ${echecs.length}`);
echecs.forEach((e) => console.log(`  KO ${e}`));
console.log(`reste dans le lot   : ${restants.length}`);
restants.forEach((e) => console.log(`  … ${e.destination} (${e.texte_envoye.length} car.)`));
if (echecs.length || restants.length) process.exit(1);
