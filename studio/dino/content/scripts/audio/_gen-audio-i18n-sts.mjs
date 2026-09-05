#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-audio-i18n-sts.mjs — Audio des Fiches dino dans une langue non-FR, multi-voix.
//
// Pipeline validée PY 2026-08-11 (journal skill audio-direction-elevenlabs), étendue au dialogue :
//   pour CHAQUE réplique du bloc : TTS voix NATIVE de la langue (Voice Library, 0 slot,
//   eleven_v3 + language_code + tags v3) → speech-to-speech eleven_multilingual_sts_v2
//   vers la voix MAISON de la réplique (narrateur_h ou wex, lue dans le JSON via voice-map)
//   → concat des répliques (silence 300 ms entre deux) + loudnorm → bloc MP3.
//   Recap = concat des 4 blocs + loudnorm (0 coût API).
//
// Source : studio/dino/content/scripts-audio/<lang>/json/_seg-<id>-<bloc>.json (produit par
//   node _md2json-v3.cjs <lang>), même forme que le FR : inputs[{voice_id,text}], language_code.
// Sortie : site/audio/dinos/<lang>/<id>-{nom,taille,regime,funfact,recap}.mp3
// Ledger : studio/dino/content/i18n/fiches-audio/<lang>.json — clé "<id>-<bloc>" + empreinte du
//   texte : un bloc au ledger avec la même empreinte est SKIPPÉ (reprise sur quota, jamais de
//   regénération d'un bloc sain). --force pour regénérer quand même.
//
//   node _gen-audio-i18n-sts.mjs --lang=en --ids=tyrannosaurus,spinosaurus            → simulation
//   node _gen-audio-i18n-sts.mjs --lang=en --ids=tyrannosaurus --pour-de-vrai [--blocs=nom,taille] [--force]
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(ICI, '..', '..', '..', '..', '..');

const arg = (n, def) => { const a = process.argv.find(x => x.startsWith(`--${n}=`)); return a ? a.slice(n.length + 3) : def; };
const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');
const FORCE = process.argv.includes('--force');
const LANG = arg('lang', '');
const IDS = arg('ids', '').split(',').filter(Boolean);
const BLOCS = arg('blocs', 'nom,taille,regime,funfact').split(',').filter(Boolean);
// Mode HORS FICHES (2026-09-05, HO-018/019) : --hors-fiche[=slug1,slug2] lit les payloads produits par
// _md2json-hors-fiche.cjs (content/i18n/<lang>/scripts-hors-fiche/json/_seg-<slug>.json) et écrit
// site/audio/dinos/<lang>/<slug>.mp3 en miroir exact des fichiers FR (menu-*, recit-*, special-*, dico-*, periodes/*).
// Sans liste = tous les clips. Pas de recap dans ce mode.
const HORS_FICHE = process.argv.some(x => x === '--hors-fiche' || x.startsWith('--hors-fiche='));
const SLUGS = arg('hors-fiche', '').split(',').filter(Boolean);
if (!LANG || (!IDS.length && !HORS_FICHE)) { console.error('Usage : --lang=<en|es-es|pt-br> (--ids=a,b,c [--blocs=..] | --hors-fiche[=slug,..]) [--pour-de-vrai] [--force]'); process.exit(2); }

// Voix sources natives (Voice Library, 0 slot) — arbitrages PY 2026-08-11 (journal audio-direction-elevenlabs).
const LANGUES = {
  en:      { code: 'en', voix: 'TX3LPaxmHKxFdv7VOQHJ', nom: 'Liam' },
  'es-es': { code: 'es', voix: 'LQDLKBDLh2L4weLEgCIE', nom: 'Gabriel Blanco' },
  'es-mx': { code: 'es', voix: 'sNINh5RgHLFf8rFhu1bI', nom: 'Jaime' },
  'pt-br': { code: 'pt', voix: 'H6h0eIkmytMwHWAqLwWR', nom: 'Kallil Paiva' },
  it:      { code: 'it', voix: 'lJylpTXX0sNdqq5EUv4M', nom: 'Valentino' },
};
const cfg = LANGUES[LANG];
if (!cfg) { console.error(`Langue inconnue : ${LANG} (connues : ${Object.keys(LANGUES).join(', ')})`); process.exit(2); }

const SRC = HORS_FICHE
  ? path.join(RACINE, 'studio', 'dino', 'content', 'i18n', LANG, 'scripts-hors-fiche', 'json')
  : path.join(RACINE, 'studio', 'dino', 'content', 'scripts-audio', LANG, 'json');
const OUT = path.join(RACINE, 'site', 'audio', 'dinos', LANG);
const LEDGER_DIR = path.join(RACINE, 'studio', 'dino', 'content', 'i18n', 'fiches-audio');
const LEDGER = path.join(LEDGER_DIR, HORS_FICHE ? `${LANG}-hors-fiche.json` : `${LANG}.json`);
const TMP = path.join(os.tmpdir(), `maxplay-sts-${LANG}`);
const GAP_MS = 300;
const PAUSE_MS = 1000;
const MAX_TENTATIVES = 3;

const lireJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const empreinte = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);

function cleApi() {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE (settings.json env)'); process.exit(1); }
  return k;
}
// voice_id → rôle (pour le ledger) ; refuse les ids dépréciés
const voiceMap = lireJson(path.join(RACINE, 'studio', 'narration', 'personnages', 'voix-meta', 'voice-map.json'));
const roleDe = Object.fromEntries(Object.entries(voiceMap.voices).map(([r, v]) => [v, r]));
function roleOuStop(voiceId) {
  if (voiceMap.deprecated && voiceMap.deprecated[voiceId]) { console.error(`voice_id déprécié dans un JSON : ${voiceId}`); process.exit(1); }
  const r = roleDe[voiceId];
  if (!r) { console.error(`voice_id inconnu de voice-map.json : ${voiceId}`); process.exit(1); }
  return r;
}

function duree(f) {
  try { return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', f], { encoding: 'utf8' }).trim()); }
  catch { return NaN; }
}

async function appelTTS(texte, apiKey) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${cfg.voix}?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texte, model_id: 'eleven_v3', language_code: cfg.code, voice_settings: { stability: 0.4, similarity_boost: 0.8 } }),
  });
  if (!r.ok) { const e = new Error(`TTS HTTP ${r.status} — ${(await r.text()).slice(0, 200)}`); e.status = r.status; throw e; }
  return Buffer.from(await r.arrayBuffer());
}
async function appelSTS(audio, cibleVoiceId, apiKey) {
  const form = new FormData();
  form.append('audio', new Blob([audio], { type: 'audio/mpeg' }), 'source.mp3');
  form.append('model_id', 'eleven_multilingual_sts_v2');
  form.append('voice_settings', JSON.stringify({ stability: 0.4, similarity_boost: 0.8 }));
  const r = await fetch(`https://api.elevenlabs.io/v1/speech-to-speech/${cibleVoiceId}?output_format=mp3_44100_128`, { method: 'POST', headers: { 'xi-api-key': apiKey }, body: form });
  if (!r.ok) { const e = new Error(`STS HTTP ${r.status} — ${(await r.text()).slice(0, 200)}`); e.status = r.status; throw e; }
  return Buffer.from(await r.arrayBuffer());
}
const dormir = ms => new Promise(r => setTimeout(r, ms));
async function avecReprise(fn) {
  let dernier;
  for (let t = 1; t <= MAX_TENTATIVES; t++) {
    try { return await fn(); }
    catch (e) {
      dernier = e;
      if (e.status === 402) { e.quota = true; throw e; }
      if (e.status === 429 || e.status >= 500) { await dormir(8000 * t); continue; }
      throw e;
    }
  }
  dernier.quota = dernier.status === 429; throw dernier;
}

function gapFile() {
  const g = path.join(TMP, `_gap-${GAP_MS}.mp3`);
  if (!fs.existsSync(g)) execFileSync('ffmpeg', ['-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(GAP_MS / 1000), '-codec:a', 'libmp3lame', '-b:a', '128k', g, '-loglevel', 'error']);
  return g;
}
function concatLoudnorm(parties, dest, avecGap) {
  const liste = path.join(TMP, `_concat-${path.basename(dest, '.mp3')}.txt`);
  const gap = avecGap ? gapFile() : null;
  const lignes = [];
  parties.forEach((p, i) => { if (i && gap) lignes.push(`file '${gap.replace(/\\/g, '/')}'`); lignes.push(`file '${p.replace(/\\/g, '/')}'`); });
  fs.writeFileSync(liste, lignes.join('\n') + '\n');
  execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', liste, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-codec:a', 'libmp3lame', '-b:a', '128k', dest, '-loglevel', 'error']);
  fs.unlinkSync(liste);
}

// ── plan ────────────────────────────────────────────────────────────────────
fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(LEDGER_DIR, { recursive: true });
const ledger = fs.existsSync(LEDGER) ? lireJson(LEDGER) : {};
const travaux = [];
let caracteres = 0;
if (HORS_FICHE) {
  const fichiers = fs.readdirSync(SRC).filter(f => /^_seg-.*\.json$/.test(f))
    .map(f => f.replace(/^_seg-/, '').replace(/\.json$/, '').replace(/__/g, '/'))
    .filter(slug => !SLUGS.length || SLUGS.includes(slug));
  for (const slug of fichiers) {
    const payload = lireJson(path.join(SRC, `_seg-${slug.replace(/\//g, '__')}.json`));
    const texte = payload.inputs.map(i => i.text).join('\n');
    const emp = empreinte(texte);
    const dest = path.join(OUT, ...slug.split('/')) + '.mp3';
    if (!FORCE && ledger[slug] && ledger[slug].empreinte === emp && fs.existsSync(dest)) { console.log(`skip ${slug} (ledger, empreinte identique)`); continue; }
    payload.inputs.forEach(i => roleOuStop(i.voice_id));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    travaux.push({ id: slug, bloc: '', cle: slug, payload, emp, dest });
    caracteres += texte.length;
  }
}
for (const id of (HORS_FICHE ? [] : IDS)) {
  for (const bloc of BLOCS) {
    const j = path.join(SRC, `_seg-${id}-${bloc}.json`);
    if (!fs.existsSync(j)) { console.log(`KO   ${id}-${bloc} : JSON absent (${path.relative(RACINE, j)})`); continue; }
    const payload = lireJson(j);
    const texte = payload.inputs.map(i => i.text).join('\n');
    const emp = empreinte(texte);
    const cle = `${id}-${bloc}`;
    const dest = path.join(OUT, `${cle}.mp3`);
    if (!FORCE && ledger[cle] && ledger[cle].empreinte === emp && fs.existsSync(dest)) { console.log(`skip ${cle} (ledger, empreinte identique)`); continue; }
    payload.inputs.forEach(i => roleOuStop(i.voice_id));
    travaux.push({ id, bloc, cle, payload, emp, dest });
    caracteres += texte.length;
  }
}
console.log(`[${LANG} · ${cfg.nom}] ${travaux.length} blocs à générer · ${caracteres} caractères TTS (STS ≈ ×2 en crédits)`);
if (!POUR_DE_VRAI) { console.log('Simulation — relancer avec --pour-de-vrai.'); process.exit(0); }

// ── exécution ───────────────────────────────────────────────────────────────
const apiKey = cleApi();
let ok = 0; const echecs = [];
const sauverLedger = () => fs.writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + '\n');
for (const t of travaux) {
  const parties = [];
  try {
    for (let i = 0; i < t.payload.inputs.length; i++) {
      const inp = t.payload.inputs[i];
      const brut = await avecReprise(() => appelTTS(inp.text, apiKey));
      await dormir(PAUSE_MS);
      const converti = await avecReprise(() => appelSTS(brut, inp.voice_id, apiKey));
      const p = path.join(TMP, `${t.cle}-${i}.mp3`);
      fs.writeFileSync(p, converti);
      parties.push(p);
      await dormir(PAUSE_MS);
    }
    concatLoudnorm(parties, t.dest, true);
    const d = duree(t.dest);
    ledger[t.cle] = { empreinte: t.emp, repliques: parties.length, duree_s: Math.round(d * 10) / 10, pipeline: 'sts-v2-dialogue', voix_source: cfg.nom, voice_id_source: cfg.voix, language_code: cfg.code, date: new Date().toISOString() };
    sauverLedger();
    ok++;
    console.log(`OK   ${t.cle}.mp3 (${parties.length} répliques, ${d.toFixed(1)} s)`);
  } catch (e) {
    if (e.quota) { console.error(`\nARRÊT QUOTA après ${ok} blocs — ${e.message}`); sauverLedger(); process.exit(3); }
    echecs.push(`${t.cle} : ${e.message}`); console.log(`KO   ${t.cle} — ${e.message}`);
  } finally { parties.forEach(p => fs.existsSync(p) && fs.unlinkSync(p)); }
}

// ── recaps (0 coût) ─────────────────────────────────────────────────────────
let recaps = 0;
for (const id of (HORS_FICHE ? [] : IDS)) {
  const blocs = ['nom', 'taille', 'regime', 'funfact'].map(b => path.join(OUT, `${id}-${b}.mp3`));
  if (!blocs.every(f => fs.existsSync(f))) { console.log(`RECAP ${id} SKIP (blocs manquants)`); continue; }
  concatLoudnorm(blocs, path.join(OUT, `${id}-recap.mp3`), false);
  recaps++; console.log(`RECAP ${id} OK (${duree(path.join(OUT, `${id}-recap.mp3`)).toFixed(1)} s)`);
}
console.log(`\n=== ${LANG} : blocs OK=${ok} KO=${echecs.length} · recaps=${recaps} ===`);
echecs.forEach(e => console.log(' - ' + e));
process.exit(echecs.length ? 1 : 0);
