#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-lot-i18n-noms.mjs — noms des 70 dinos × 6 langues invitées.
//
//   node studio/referentiel/_gen-lot-i18n-noms.mjs              → simulation
//   node studio/referentiel/_gen-lot-i18n-noms.mjs --pour-de-vrai
//
// Texte = graphie phonétique du lexique de chaque langue (colonne 3 de la table
// §2 de studio/dino/content/i18n/lexiques-prononciation/<lang>.md), jamais le
// nom latin brut. language_code passé à l'API (articulation native, cf.
// _gen-humeur-invitee.mjs). Voix narrateur_h (voice-map.json), eleven_v3,
// tag [excited] comme les noms FR. Sortie site/audio/dinos/<lang>/noms/<id>.mp3
// + ledger studio/dino/content/i18n/noms-audio/<lang>.json (rejouabilité).
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { RACINE, lireJson } from './lib/socle.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');

const LEXIQUES = path.join(RACINE, 'studio', 'dino', 'content', 'i18n', 'lexiques-prononciation');
const LEDGERS = path.join(RACINE, 'studio', 'dino', 'content', 'i18n', 'noms-audio');
const LANGUES = { 'pt-br': 'pt', en: 'en', ja: 'ja', zh: 'zh', it: 'it', es: 'es' };

const TAILLE_MIN = 5 * 1024;
const DUREE_MIN = 0.4;
const DUREE_MAX = 15;
const PAUSE_MS = 1200;
const MAX_TENTATIVES = 3;

function cleApi() {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE'); process.exit(1); }
  return k;
}

function voixNarrateurH() {
  const m = lireJson(path.join(RACINE, 'studio', 'narration', 'personnages', 'voix-meta', 'voice-map.json'));
  const v = m.voices && m.voices.narrateur_h;
  if (!v) { console.error('narrateur_h introuvable dans voice-map.json'); process.exit(1); }
  return typeof v === 'string' ? v : v.voice_id;
}

/** Ids canoniques des 70 espèces depuis dinos-data.js. */
function idsCanon() {
  const src = fs.readFileSync(path.join(RACINE, 'site', 'js', 'dinos-data.js'), 'utf8');
  return new Set([...src.matchAll(/^\s*id:\s*'([a-z0-9_]+)'/gm)].map((m) => m[1]));
}

/** Parse la table §2 d'un lexique : { id → forme TTS } (colonne 3, gras ôté, variante entre parenthèses ignorée).
 *  Ne lit QUE la section « ## 2 » (la §1 = règles de conversion, pas des espèces)
 *  et ne garde que les ids du canon dinos-data.js. */
function lireLexique(lang, canon) {
  const fichier = path.join(LEXIQUES, `${lang}.md`);
  const lignes = fs.readFileSync(fichier, 'utf8').split('\n');
  const table = {};
  let dansSection2 = false;
  for (const ligne of lignes) {
    if (/^##\s/.test(ligne)) {
      dansSection2 = /^##\s*2[.\s]/.test(ligne);
      continue;
    }
    if (!dansSection2 || !ligne.startsWith('|')) continue;
    const cols = ligne.split('|').map((c) => c.trim());
    // cols[0] vide (avant le premier |), cols[1] = id, cols[3] = forme TTS
    const id = cols[1];
    if (!id || id === 'id' || /^-+$/.test(id) || !canon.has(id)) continue;
    let tts = cols[3] || '';
    tts = tts.split(' (')[0]                 // variante éventuelle entre parenthèses
      .replace(/\*\*/g, '')                  // gras markdown
      .replace(/—.*$/, '').trim();           // marqueurs de suivi éventuels
    if (tts) table[id] = tts;
  }
  return table;
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

async function appelEL(t, apiKey, voiceId) {
  const reponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: t.texte,
      model_id: 'eleven_v3',
      language_code: t.languageCode,
      voice_settings: { stability: 0.4, similarity_boost: 0.8 },
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

// ── construction des travaux ────────────────────────────────────────────────
const travaux = [];
const trous = {};
const canon = idsCanon();
console.log(`Canon dinos-data.js : ${canon.size} ids`);
for (const [lang, code] of Object.entries(LANGUES)) {
  const table = lireLexique(lang, canon);
  const ids = Object.keys(table);
  trous[lang] = ids.length;
  const manquantes = [...canon].filter((id) => !table[id]);
  if (manquantes.length) console.log(`  ⚠ ${lang} : ${manquantes.length} espèces absentes du lexique (${manquantes.slice(0, 5).join(', ')}…)`);
  for (const id of ids) {
    travaux.push({
      lang,
      languageCode: code,
      id,
      texte: `[excited] ${table[id]}`,
      dest: path.join(RACINE, 'site', 'audio', 'dinos', lang, 'noms', `${id}.mp3`),
    });
  }
}
console.log('Lexiques lus : ' + Object.entries(trous).map(([l, n]) => `${l}=${n}`).join(' · '));

const aFaire = [];
let skips = 0;
for (const t of travaux) {
  if (sain(t.dest).ok) { skips += 1; continue; }
  aFaire.push(t);
}
const cout = aFaire.reduce((s, t) => s + t.texte.length, 0);
console.log(`${travaux.length} travaux · ${skips} déjà sains · ${aFaire.length} à générer · ~${cout} caractères`);

if (!POUR_DE_VRAI) {
  // Échantillon de contrôle du parsing : 3 premiers par langue
  for (const lang of Object.keys(LANGUES)) {
    aFaire.filter((t) => t.lang === lang).slice(0, 3)
      .forEach((t) => console.log(`  [simulation] ${lang}/noms/${t.id}.mp3  ← « ${t.texte} »`));
  }
  console.log('\nSimulation — relancer avec --pour-de-vrai pour générer.');
  process.exit(0);
}

// ── exécution ───────────────────────────────────────────────────────────────
const apiKey = cleApi();
const voiceId = voixNarrateurH();
console.log(`Voix narrateur_h résolue via voice-map.json`);
let ok = 0;
let caracteres = 0;
const echecs = [];
const ledgers = {};
for (const t of aFaire) {
  const brut = t.dest.replace(/\.mp3$/, '._brut.mp3');
  try {
    fs.mkdirSync(path.dirname(t.dest), { recursive: true });
    let dernier;
    for (let tentative = 1; tentative <= MAX_TENTATIVES; tentative++) {
      try {
        fs.writeFileSync(brut, await appelEL(t, apiKey, voiceId));
        dernier = null;
        break;
      } catch (e) {
        dernier = e;
        if (e.status === 402 || e.status === 429) {
          if (tentative < MAX_TENTATIVES) { await new Promise((r) => setTimeout(r, 10000 * tentative)); continue; }
          const err = new Error(`QUOTA — ${e.message}`);
          err.quota = true;
          throw err;
        }
        throw e;
      }
    }
    if (dernier) throw dernier;
    execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
      '-codec:a', 'libmp3lame', '-b:a', '128k', t.dest, '-loglevel', 'error']);
    fs.unlinkSync(brut);
    const s = sain(t.dest);
    caracteres += t.texte.length;
    ok += 1;
    (ledgers[t.lang] ||= []).push({
      id: t.id, texte_envoye: t.texte, voice_id: voiceId,
      modele: 'eleven_v3', language_code: t.languageCode, date: new Date().toISOString(),
    });
    if (ok % 20 === 0) console.log(`  … ${ok}/${aFaire.length} (${caracteres} car.)`);
    if (!s.ok) console.log(`??   ${t.lang}/noms/${t.id}.mp3 — douteux (${s.raison})`);
  } catch (e) {
    if (fs.existsSync(brut)) fs.unlinkSync(brut);
    if (e.quota) {
      console.error(`\nARRÊT QUOTA après ${ok} fichiers · ${caracteres} caractères — ${e.message}`);
      ecrireLedgers();
      process.exit(3);
    }
    echecs.push(`${t.lang}/noms/${t.id}.mp3 : ${e.message}`);
    console.log(`KO   ${t.lang}/noms/${t.id}.mp3 — ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, PAUSE_MS));
}

function ecrireLedgers() {
  fs.mkdirSync(LEDGERS, { recursive: true });
  for (const [lang, entrees] of Object.entries(ledgers)) {
    const f = path.join(LEDGERS, `${lang}.json`);
    const existant = fs.existsSync(f) ? lireJson(f) : [];
    const parId = new Map([...existant, ...entrees].map((e) => [e.id, e]));
    fs.writeFileSync(f, JSON.stringify([...parId.values()], null, 2) + '\n');
  }
}
ecrireLedgers();

console.log(`\n${ok} générés · ${echecs.length} en échec · ${caracteres} caractères consommés · ${skips} skippés`);
if (echecs.length) { console.log('Échecs :\n  ' + echecs.join('\n  ')); process.exit(1); }
