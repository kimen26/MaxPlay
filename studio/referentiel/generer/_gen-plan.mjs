#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-plan.mjs — exécute les entrées de plan-generation.json
//
//   node studio/referentiel/_gen-plan.mjs --creer --type atome --pour-de-vrai
//   node studio/referentiel/_gen-plan.mjs --remplacer --verifie --pour-de-vrai
//   node studio/referentiel/_gen-plan.mjs --remplacer --non-verifie --strict --pour-de-vrai
//
// Sans --pour-de-vrai : simulation (liste + coût), aucun appel.
//
// Chaque entrée du plan porte déjà voix, modèle, réglages, texte et destination :
// ce script ne décide RIEN, il exécute. Traitement gravé : loudnorm + padding
// 250 ms (règle L-069). Garde-fous :
//   · action « creer » : jamais d'écrasement d'un fichier présent ;
//   · cohérence texte/destination : si aucun token commun entre le texte envoyé
//     et le nom du fichier, l'entrée est DOUTEUSE → skip + liste quand --strict,
//     sinon simple marquage dans le log ;
//   · --budget N : stop net si le cumul de caractères envoyés dépasse N ;
//   · chaque MP3 produit est contrôlé (> 10 Ko, durée ffprobe > 0,3 s).
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { RACINE, existe, lireJson } from '../lib/socle.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');
const STRICT = process.argv.includes('--strict');
const arg = (nom) => {
  const i = process.argv.indexOf(nom);
  return i > -1 ? process.argv[i + 1] : null;
};
const LIMITE = arg('--limite') ? Number(arg('--limite')) : Infinity;
const BUDGET = arg('--budget') ? Number(arg('--budget')) : Infinity;
const FILTRE_TYPE = arg('--type');
const FILTRE_CLE = arg('--cle'); // préfixe de clé, ex : humeur.positif
const F_ACTION = process.argv.includes('--creer') ? 'creer'
  : process.argv.includes('--remplacer') ? 'remplacer' : null;
const F_VERIF = process.argv.includes('--verifie') ? true
  : process.argv.includes('--non-verifie') ? false : null;

const slugify = (txt) => String(txt || '')
  .toLowerCase()
  .replace(/\[[a-z-]+\]/g, ' ') // tags v3
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

/** Doute : aucun token commun (≥ 3 lettres) entre texte et nom de fichier. */
function douteux(entree) {
  const base = path.basename(entree.destination, '.mp3');
  const tDest = new Set(slugify(base).split(' ').filter((t) => t.length >= 3));
  const tTxt = new Set(slugify(entree.texte_envoye).split(' ').filter((t) => t.length >= 3));
  if (!tDest.size) return false; // nom numérique (nombres, pièces) : pas d'avis
  for (const t of tTxt) if (tDest.has(t)) return false;
  return true;
}

const plan = lireJson(path.join(RACINE, 'studio', 'referentiel', 'plan-generation.json'));
let entrees = plan.appels;
if (F_ACTION) entrees = entrees.filter((e) => e.action === F_ACTION);
if (F_VERIF !== null) entrees = entrees.filter((e) => e.texte_verifie === F_VERIF);
if (FILTRE_TYPE) entrees = entrees.filter((e) => e.type === FILTRE_TYPE);
if (FILTRE_CLE) entrees = entrees.filter((e) => e.cle.startsWith(FILTRE_CLE));

const travaux = [];
const sautes = [];
for (const e of entrees) {
  const dest = path.join(RACINE, e.destination);
  if (e.action === 'creer' && existe(dest)) { sautes.push(`${e.cle} — déjà présent`); continue; }
  travaux.push({ ...e, dest });
}

const selection = travaux.slice(0, LIMITE);
const cout = selection.reduce((s, t) => s + t.cout_caracteres, 0);
console.log(`${selection.length} entrées · ~${cout.toLocaleString('fr-FR')} caractères (budget max ${BUDGET === Infinity ? '∞' : BUDGET})`);
sautes.forEach((s) => console.log(`  SKIP ${s}`));

if (!POUR_DE_VRAI) {
  selection.slice(0, 10).forEach((t) => console.log(`  [simulation] ${t.destination} (${t.cout_caracteres} c) — ${t.texte_envoye.slice(0, 70)}`));
  if (selection.length > 10) console.log(`  … et ${selection.length - 10} autres`);
  console.log('\nSimulation — relancer avec --pour-de-vrai.');
  process.exit(0);
}

const apiKey = (() => {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE'); process.exit(1); }
  return k;
})();

let ok = 0;
let envoyes = 0;
const echecs = [];
const douteuxSkips = [];
for (const t of selection) {
  if (envoyes + t.cout_caracteres > BUDGET) {
    console.log(`\nSTOP BUDGET — ${envoyes} caractères envoyés, prochaine entrée coûte ${t.cout_caracteres}`);
    break;
  }
  const doute = douteux(t);
  if (doute && STRICT) { douteuxSkips.push(`${t.cle} → ${t.destination} :: ${t.texte_envoye.slice(0, 70)}`); continue; }
  const brut = `${t.dest}.brut.mp3`;
  try {
    fs.mkdirSync(path.dirname(t.dest), { recursive: true });
    const corps = {
      text: t.texte_envoye,
      model_id: t.modele || 'eleven_v3',
      voice_settings: { similarity_boost: 0.8, ...(t.reglages || {}) },
    };
    if (t.langue && t.langue !== 'fr') corps.language_code = t.langue.split('-')[0];
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${t.voix_id}`, {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(corps),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${(await r.text()).slice(0, 110)}`);
    fs.writeFileSync(brut, Buffer.from(await r.arrayBuffer()));
    envoyes += t.cout_caracteres;
    execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
      '-codec:a', 'libmp3lame', '-b:a', '128k', t.dest, '-loglevel', 'error']);
    fs.unlinkSync(brut);
    const taille = fs.statSync(t.dest).size;
    const duree = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries',
      'format=duration', '-of', 'csv=p=0', t.dest], { encoding: 'utf8' }).trim());
    if (taille < 10240 || !(duree > 0.3)) throw new Error(`contrôle KO (${taille} o, ${duree} s)`);
    ok += 1;
    if (doute) console.log(`OK?  ${t.cle} — DOUTEUX mais généré (${taille} o, ${duree.toFixed(1)} s)`);
    else if (ok % 20 === 0) console.log(`  … ${ok}/${selection.length} · ${envoyes} caractères`);
  } catch (e) {
    echecs.push(`${t.cle} : ${e.message}`);
    console.log(`KO   ${t.cle} — ${e.message}`);
    if (existe(brut)) fs.unlinkSync(brut);
  }
  await new Promise((res) => setTimeout(res, 900));
}

console.log(`\n${ok} générés · ${echecs.length} en échec · ${douteuxSkips.length} douteux skippés · ${envoyes} caractères envoyés`);
if (douteuxSkips.length) {
  console.log('— douteux (non générés) :');
  douteuxSkips.forEach((d) => console.log(`  ${d}`));
}
if (echecs.length) process.exit(1);
