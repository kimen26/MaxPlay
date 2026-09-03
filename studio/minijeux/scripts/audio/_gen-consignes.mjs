#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-consignes.mjs — génère les consignes de mini-jeu qui parlent encore en TTS
//
//   node studio/referentiel/_gen-consignes.mjs --pour-de-vrai
//
// Sans le drapeau : simulation, affiche ce qui serait fait, n'appelle rien.
//
// Slug = texte slugifié, EXACTEMENT la même fonction que `slugConsigne` dans
// site/js/mj-shell.js — c'est ce qui fait que le gabarit retrouve le fichier
// sans qu'aucun jeu n'ait à déclarer quoi que ce soit.
//
// Voix narrateur_h, eleven_v3, puis padding 250 ms + loudnorm (règles gravées
// dans site/sounds/_BANQUE-SONS.md § 3).
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { SITE, RACINE, existe, lireJson } from '../../../referentiel/lib/socle.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');
const SORTIE = path.join(SITE, 'sounds', 'voix', 'phrases');
const TAG = '[warmly]';

/** Doit rester identique à slugConsigne() de mj-shell.js. */
export const slug = (txt) => String(txt || '')
  .toLowerCase()
  .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’']/g, ' ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

/** Consignes fixes des mini-jeux qui n'ont pas encore de voix réelle. */
const CONSIGNES = [
  'Quel mot manque dans la phrase ?',
  'Combien de dinos ? Compte-les !',
  'Quel dino se cache dans le noir ?',
  'Trouve l’ombre et son dino !',
  'Trouve 2 tuiles avec le même dino !',
  'Combien d’œufs ?',
  'Combien en tout ?',
  'Combien d’œufs en tout ?',
  'Deux boîtes pleines… combien en tout ?',
  'La boîte est pleine. Il faut encore combien d’œufs ?',
  'Touche la lettre qui fait ce son !',
  'Construis le mot !',
  'Complète la grille : les 4 symboles partout !',
  'Un dino par ligne, colonne et enclos… jamais collés !',
  'Continue à faire éclore les œufs !',
  'Tape pour sauter par-dessus les cactus !',

  // ── 2e vague (2026-08-10, retour Papa Yann « ça répète en TTS ») ──────────
  // Ces consignes-là sont passées à travers le premier inventaire : leur appel
  // est `setConsigne(currentInstruction())`, `setConsigne(consigneManque)`,
  // `setConsigne(label)`… — le texte est CALCULÉ, pas écrit en clair dans
  // l'appel. Mon extracteur ne lisait que les chaînes littérales.
  // Ne sont reprises ici que celles dont le texte est FIXE une fois calculé ;
  // celles qui contiennent une valeur variable restent en TTS, à raison.
  'Range-les du plus petit au plus grand !',        // mj-30
  'Range-les du plus léger au plus lourd !',        // mj-30
  'Il en faut combien pour faire 10 ?',             // mj-49
  'Il en manque combien pour remplir la boîte ?',   // mj-49
  'Tous les œufs ont éclos !',                      // mj-57
  'Fais un territoire pour chaque pierre !',        // mj-59
];

// ── garde-fou projet : mots interdits dans un texte narré ───────────────────
const INTERDITS = /\b(max|doudou|peluche)\b/i;
for (const t of CONSIGNES) {
  if (INTERDITS.test(t)) {
    console.error(`STOP — mot interdit dans « ${t} »`);
    process.exit(2);
  }
}

function cle() {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE'); process.exit(1); }
  return k;
}

function voixNarrateurH() {
  const map = lireJson(path.join(RACINE, 'studio', 'narration', 'personnages', 'voix-meta', 'voice-map.json'));
  return map.voices.narrateur_h;
}

async function genererUn(texte, voiceId, apiKey) {
  const nom = slug(texte);
  const dest = path.join(SORTIE, `${nom}.mp3`);
  const brut = path.join(SORTIE, `_brut-${nom}.mp3`);

  const reponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `${TAG} ${texte}`,
      model_id: 'eleven_v3',
      voice_settings: { stability: 0.4, similarity_boost: 0.8 },
    }),
  });
  if (!reponse.ok) throw new Error(`HTTP ${reponse.status} — ${(await reponse.text()).slice(0, 160)}`);

  fs.writeFileSync(brut, Buffer.from(await reponse.arrayBuffer()));
  // Padding 250 ms (attaque coupée en Bluetooth sans lui) + loudnorm.
  execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
    '-codec:a', 'libmp3lame', '-b:a', '128k', dest, '-loglevel', 'error']);
  fs.unlinkSync(brut);
  return { nom, taille: fs.statSync(dest).size };
}

const aFaire = CONSIGNES.filter((t) => !existe(path.join(SORTIE, `${slug(t)}.mp3`)));
const cout = aFaire.reduce((s, t) => s + `${TAG} ${t}`.length, 0);

console.log(`${CONSIGNES.length} consignes · ${aFaire.length} à générer · ~${cout} caractères`);
if (!POUR_DE_VRAI) {
  aFaire.forEach((t) => console.log(`  [simulation] ${slug(t)}.mp3  ← « ${t} »`));
  console.log('\nSimulation — relancer avec --pour-de-vrai pour générer.');
  process.exit(0);
}

const apiKey = cle();
const voiceId = voixNarrateurH();
let ok = 0;
const echecs = [];
for (const texte of aFaire) {
  try {
    const r = await genererUn(texte, voiceId, apiKey);
    ok += 1;
    console.log(`OK   ${r.nom}.mp3 (${r.taille} o)`);
  } catch (e) {
    echecs.push(`${slug(texte)} : ${e.message}`);
    console.log(`KO   ${slug(texte)} — ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 1200));
}
console.log(`\n${ok} générées · ${echecs.length} en échec`);
if (echecs.length) process.exit(1);
