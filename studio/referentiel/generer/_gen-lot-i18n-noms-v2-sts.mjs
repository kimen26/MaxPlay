#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-lot-i18n-noms-v2-sts.mjs — PROD : 70 noms × 6 langues via pipeline STS.
//
// Pipeline validée par PY le 2026-08-11 (journal skill audio-direction-elevenlabs) :
//   TTS voix NATIVE (Voice Library, 0 slot) eleven_v3 + language_code + [excited]
//   → STS eleven_multilingual_sts_v2 vers narrateur_h (timbre maison).
//
// Formes textuelles (arbitrage PY « le plat est bien ») :
//   en      → nom scientifique (col. 2 du lexique) — un anglophone le dit nativement
//   es/it/… → forme lexique (col. 3) DÉ-TIRETTÉE, casse normalisée, accents gardés
//             (« Ti-ra-no-SAU-rio » → « Tiranosaurio ») — les tirets syllabaient la voix
//   ja/zh   → forme lexique telle quelle (katakana / sinogrammes)
//
// Sortie : site/audio/dinos/<lang>/noms/<id>.mp3 (REMPLACE la v1 accentuée FR —
// backup préalable requis dans temp/noms-i18n-v1-accent-fr-2026-08-11/).
// Ledger : studio/dino/content/i18n/noms-audio/<lang>-v2.json (rejouabilité ;
// un id présent dans le ledger v2 est SKIPPÉ → relance = reprise sur échec/quota).
//
//   node studio/referentiel/_gen-lot-i18n-noms-v2-sts.mjs              → simulation
//   node studio/referentiel/_gen-lot-i18n-noms-v2-sts.mjs --pour-de-vrai
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { RACINE, lireJson } from '../lib/socle.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');

const LEXIQUES = path.join(RACINE, 'studio', 'dino', 'content', 'i18n', 'lexiques-prononciation');
const LEDGERS = path.join(RACINE, 'studio', 'dino', 'content', 'i18n', 'noms-audio');

const LANGUES = {
  en:      { code: 'en', voix: 'TX3LPaxmHKxFdv7VOQHJ', nom: 'Liam' },
  // es remplacé par les deux variantes validées PY 2026-08-11 (Javier = trop syllabé) :
  'es-es': { code: 'es', lexique: 'es', voix: 'LQDLKBDLh2L4weLEgCIE', nom: 'Gabriel Blanco' },
  'es-mx': { code: 'es', lexique: 'es', voix: 'sNINh5RgHLFf8rFhu1bI', nom: 'Jaime' },
  it:      { code: 'it', voix: 'lJylpTXX0sNdqq5EUv4M', nom: 'Valentino' },
  'pt-br': { code: 'pt', voix: 'H6h0eIkmytMwHWAqLwWR', nom: 'Kallil Paiva', lexique: 'pt-br' },
  ja:      { code: 'ja', voix: 'NAxeyUWAqw6FpqcuJJzW', nom: 'Benny' },
  zh:      { code: 'zh', voix: '5s3UifUu3OJ90z17rRMA', nom: 'Jun' },
  // Vague 2 (GO PY 2026-08-11) — lexiques draftés LLM + croisement, « à relire natif »
  de:      { code: 'de', voix: 'H3SlaMKe61Xu9asSseVc', nom: 'Tomas' },
  ru:      { code: 'ru', voix: 'KpYkbcjoTgQGyxsIFs6Y', nom: 'Aleksandr Matviy' },
  hi:      { code: 'hi', voix: 'ERMvs1ZN1ResVPKOv3da', nom: 'Ballu' },
  ar:      { code: 'ar', voix: 'vszNunPGBVqJg1Qd4H7Z', nom: 'Mohammad' },
};

// Filtre éventuel : --langues=es-es,es-mx (pour relancer une langue sans toucher aux autres)
const ARG_LANGUES = (process.argv.find((a) => a.startsWith('--langues=')) || '').replace('--langues=', '').split(',').filter(Boolean);

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

function idsCanon() {
  const src = fs.readFileSync(path.join(RACINE, 'site', 'js', 'dinos-data.js'), 'utf8');
  return new Set([...src.matchAll(/^\s*id:\s*'([a-z0-9_]+)'/gm)].map((m) => m[1]));
}

/** Table §2 → { id → { scientifique, tts } } (même parsing que le lot v1). */
function lireLexique(lang, canon) {
  const fichier = path.join(LEXIQUES, `${lang}.md`);
  const lignes = fs.readFileSync(fichier, 'utf8').split('\n');
  const table = {};
  let dansSection2 = false;
  for (const ligne of lignes) {
    if (/^##\s/.test(ligne)) { dansSection2 = /^##\s*2[.\s]/.test(ligne); continue; }
    if (!dansSection2 || !ligne.startsWith('|')) continue;
    const cols = ligne.split('|').map((c) => c.trim());
    const id = cols[1];
    if (!id || id === 'id' || /^-+$/.test(id) || !canon.has(id)) continue;
    const nett = (s) => (s || '').split(' (')[0].replace(/\*\*/g, '').replace(/\*/g, '').replace(/—.*$/, '').trim();
    const scientifique = nett(cols[2]);
    const tts = nett(cols[3]);
    if (tts) table[id] = { scientifique, tts };
  }
  return table;
}

/** Forme « plate » validée par PY : voir en-tête. */
function formePlate(lang, entree) {
  if (lang === 'en') return entree.scientifique || entree.tts;
  // ja/zh : présence de caractères hors alphabet latin → forme lexique telle quelle
  if (/[^\p{Script=Latin}\p{Mark}\s'\-]/u.test(entree.tts)) return entree.tts;
  const plat = entree.tts.replace(/-/g, '').toLowerCase();
  return plat.charAt(0).toUpperCase() + plat.slice(1);
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

async function appelTTS(t, apiKey) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${t.cfg.voix}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: t.texte, model_id: 'eleven_v3', language_code: t.cfg.code,
      voice_settings: { stability: 0.4, similarity_boost: 0.8 },
    }),
  });
  if (!r.ok) {
    const err = new Error(`TTS HTTP ${r.status} — ${(await r.text()).slice(0, 160)}`);
    err.status = r.status;
    throw err;
  }
  return Buffer.from(await r.arrayBuffer());
}
async function appelSTS(audio, narrH, apiKey) {
  const form = new FormData();
  form.append('audio', new Blob([audio], { type: 'audio/mpeg' }), 'source.mp3');
  form.append('model_id', 'eleven_multilingual_sts_v2');
  form.append('voice_settings', JSON.stringify({ stability: 0.4, similarity_boost: 0.8 }));
  const r = await fetch(`https://api.elevenlabs.io/v1/speech-to-speech/${narrH}?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': apiKey }, body: form,
  });
  if (!r.ok) {
    const err = new Error(`STS HTTP ${r.status} — ${(await r.text()).slice(0, 160)}`);
    err.status = r.status;
    throw err;
  }
  return Buffer.from(await r.arrayBuffer());
}

// ── construction des travaux ────────────────────────────────────────────────
const travaux = [];
const canon = idsCanon();
console.log(`Canon dinos-data.js : ${canon.size} ids`);
const languesActives = ARG_LANGUES.length
  ? Object.fromEntries(Object.entries(LANGUES).filter(([l]) => ARG_LANGUES.includes(l)))
  : LANGUES;
if (ARG_LANGUES.length) console.log(`Filtre --langues : ${Object.keys(languesActives).join(', ')}`);
for (const [lang, cfg] of Object.entries(languesActives)) {
  const table = lireLexique(cfg.lexique || lang, canon);
  const manquantes = [...canon].filter((id) => !table[id]);
  if (manquantes.length) console.log(`  ⚠ ${lang} : ${manquantes.length} espèces absentes (${manquantes.slice(0, 5).join(', ')}…)`);
  for (const [id, entree] of Object.entries(table)) {
    travaux.push({
      lang, cfg, id,
      texte: `[excited] ${formePlate(lang, entree)}`,
      dest: path.join(RACINE, 'site', 'audio', 'dinos', lang, 'noms', `${id}.mp3`),
    });
  }
}
console.log(`${travaux.length} travaux · ${travaux.reduce((s, t) => s + t.texte.length, 0)} caractères TTS`);

// Reprise : ids déjà au ledger v2 = faits
const faits = {};
for (const lang of Object.keys(languesActives)) {
  const f = path.join(LEDGERS, `${lang}-v2.json`);
  faits[lang] = new Set(fs.existsSync(f) ? lireJson(f).map((e) => e.id) : []);
}
const aFaire = travaux.filter((t) => !faits[t.lang].has(t.id));
console.log(`${travaux.length - aFaire.length} déjà au ledger v2 (skippés) · ${aFaire.length} à générer`);

// Échantillon de contrôle des formes plates
for (const lang of Object.keys(languesActives)) {
  aFaire.filter((t) => t.lang === lang).slice(0, 3)
    .forEach((t) => console.log(`  [forme] ${lang}/${t.id} ← « ${t.texte} »`));
}

if (!POUR_DE_VRAI) { console.log('\nSimulation — relancer avec --pour-de-vrai.'); process.exit(0); }

// ── exécution ───────────────────────────────────────────────────────────────
const apiKey = cleApi();
const narrH = voixNarrateurH();
console.log('Voix narrateur_h résolue via voice-map.json');
let ok = 0;
let caracteres = 0;
const echecs = [];
const ledgers = {};

function ecrireLedgers() {
  fs.mkdirSync(LEDGERS, { recursive: true });
  for (const [lang, entrees] of Object.entries(ledgers)) {
    const f = path.join(LEDGERS, `${lang}-v2.json`);
    const existant = fs.existsSync(f) ? lireJson(f) : [];
    const parId = new Map([...existant, ...entrees].map((e) => [e.id, e]));
    fs.writeFileSync(f, JSON.stringify([...parId.values()], null, 2) + '\n');
  }
}

for (const t of aFaire) {
  const brut = t.dest.replace(/\.mp3$/, '._brut.mp3');
  try {
    fs.mkdirSync(path.dirname(t.dest), { recursive: true });
    let audio = null;
    let dernier = null;
    for (let tentative = 1; tentative <= MAX_TENTATIVES; tentative++) {
      try {
        const src = await appelTTS(t, apiKey);
        await new Promise((r) => setTimeout(r, PAUSE_MS));
        audio = await appelSTS(src, narrH, apiKey);
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
    fs.writeFileSync(brut, audio);
    execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
      '-codec:a', 'libmp3lame', '-b:a', '128k', t.dest, '-loglevel', 'error']);
    fs.unlinkSync(brut);
    const s = sain(t.dest);
    caracteres += t.texte.length;
    ok += 1;
    (ledgers[t.lang] ||= []).push({
      id: t.id, texte_envoye: t.texte, pipeline: 'sts-v2',
      voix_source: t.cfg.nom, voice_id_source: t.cfg.voix,
      modele_tts: 'eleven_v3', language_code: t.cfg.code,
      modele_sts: 'eleven_multilingual_sts_v2', voix_finale: 'narrateur_h',
      date: new Date().toISOString(),
    });
    if (ok % 20 === 0) { console.log(`  … ${ok}/${aFaire.length} (${caracteres} car.)`); ecrireLedgers(); }
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
ecrireLedgers();

console.log(`\n${ok} générés · ${echecs.length} en échec · ${caracteres} caractères TTS consommés`);
if (echecs.length) { console.log('Échecs :\n  ' + echecs.join('\n  ')); process.exit(1); }
