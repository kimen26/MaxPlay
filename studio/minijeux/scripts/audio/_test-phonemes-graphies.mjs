#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _test-phonemes-graphies.mjs — génère des VARIANTES d'écoute pour les phonèmes
// mal rendus (retour PY 2026-08-12) : be→« bi », de→« dee », eu→« u »,
// fe→« èff », ke→bruit de raquette, a/i trop courts, je à préciser.
//
// Deux voies testées côte à côte :
//   A. RESPELLING (graphie FR telle qu'elle sonne) — levier empirique classique
//   B. IPA EXACT via pronunciation dictionary (<phoneme alphabet="ipa">),
//      supporté par eleven_v3 hors anglais depuis mi-2026 (doc officielle).
//
// Sortie : site/sounds/phonemes-test/<slug>.mp3 (padding 250 ms + loudnorm,
// même post-prod que la prod). Page d'écoute : dev-sounds-ui.html (groupe test).
//
//   node studio/referentiel/_test-phonemes-graphies.mjs              → simulation
//   node studio/referentiel/_test-phonemes-graphies.mjs --pour-de-vrai
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { RACINE, lireJson } from '../../../referentiel/lib/socle.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');
const DEST = path.join(RACINE, 'site', 'sounds', 'phonemes-test');
const VOIX_H = 'cbRcktt2xvoeFpdvW2wg'; // narrateur_h (voice-map.json)
const VOIX_F = 'aHKEGRjW94hqXc6gaItG'; // narratrice_f (voice-map.json)
const MODELE = 'eleven_v3';
const REGLAGES = { stability: 0.4 };
const PAUSE_MS = 1200;

// ── Lettre NUE (demande PY 2026-08-12) × 2 voix × avec/sans tag [slowly] ────
// « juste la lettre, pas le euh/eu après » + doublon narratrice pour comparer.
// Tag testé : [slowly] (✅ validé catalog MaxPlay) — il module le DÉBIT,
// pas la prononciation ; la matrice sert à le vérifier empiriquement.
const LETTRES_NUES = ['a', 'b', 'c', 'd', 'eu', 'f', 'i', 'j', 'k', 'q'];

// ── Variantes respelling : [slug, texte envoyé] ─────────────────────────────
const RESPELL = [
  ['a-v1', 'aaa'], ['a-v2', 'aaah'],
  ['be-v1', 'beuh'], ['be-v2', 'beu'],
  ['de-v1', 'deuh'], ['de-v2', 'deu'],
  ['eu-v1', 'eux'], ['eu-v2', 'heu'],
  ['fe-v1', 'fff'], ['fe-v2', 'ffff'],
  ['i-v1', 'iii'], ['i-v2', 'iiii'], // « îî » = réponse vide du modèle (2026-08-12)
  ['je-v1', 'jji'], ['je-v2', 'jii'],
  ['ke-v1', 'keuh'], ['ke-v2', 'keu'], ['ke-v3', 'que'],
];

// ── Variantes IPA : [slug, grapheme envoyé, phonème IPA] ────────────────────
const IPA = [
  ['a-ipa', 'a', 'a'],
  ['be-ipa', 'be', 'bə'],
  ['de-ipa', 'de', 'də'],
  ['eu-ipa', 'eu', 'ø'],
  ['fe-ipa', 'fe', 'f'],
  ['i-ipa', 'i', 'iː'],
  ['je-ipa', 'je', 'ʒi'],
  ['ke-ipa', 'ke', 'kə'],
];

function cle() {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE'); process.exit(1); }
  return k;
}

function plsXml(regles) {
  const corps = regles.map(([, g, p]) =>
    `  <lexeme><grapheme>${g}</grapheme><phoneme alphabet="ipa">${p}</phoneme></lexeme>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<lexicon version="1.0" xmlns="http://www.w3.org/2005/01/pronunciation-lexicon" xml:lang="fr-FR">
${corps}
</lexicon>`;
}

async function uploadDict(apiKey) {
  const form = new FormData();
  form.append('file', new Blob([plsXml(IPA)], { type: 'application/pls+xml' }), 'maxplay-phonemes-test.pls');
  form.append('name', 'maxplay-phonemes-test');
  form.append('description', 'Test IPA phonèmes lecture (2026-08-12) — jetable');
  const r = await fetch('https://api.elevenlabs.io/v1/pronunciation-dictionaries/add-from-file', {
    method: 'POST', headers: { 'xi-api-key': apiKey }, body: form,
  });
  if (!r.ok) throw new Error(`dict HTTP ${r.status} — ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  let versionId = j.latest_version_id;
  if (!versionId) { // le POST ne renvoie pas toujours la version → GET de suivi
    const d = await fetch(`https://api.elevenlabs.io/v1/pronunciation-dictionaries/${j.id}`, { headers: { 'xi-api-key': apiKey } });
    if (d.ok) versionId = (await d.json()).latest_version_id;
  }
  return { id: j.id, version_id: versionId };
}

async function appelEL(texte, apiKey, dict, voix) {
  const body = { text: texte, model_id: MODELE, voice_settings: { ...REGLAGES } };
  if (dict) {
    body.pronunciation_dictionary_locators = [
      { pronunciation_dictionary_id: dict.id, version_id: dict.version_id },
    ];
  }
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voix || VOIX_H}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} — ${(await r.text()).slice(0, 160)}`);
  return Buffer.from(await r.arrayBuffer());
}

async function generer(slug, texte, apiKey, dict, voix) {
  fs.mkdirSync(DEST, { recursive: true });
  const dest = path.join(DEST, `${slug}.mp3`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 5 * 1024) return -1; // skip anti-doublon
  const brut = path.join(DEST, `${slug}._brut.mp3`);
  const buf = await appelEL(texte, apiKey, dict, voix);
  if (!buf.length) throw new Error('réponse vide du modèle');
  fs.writeFileSync(brut, buf);
  execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
    '-codec:a', 'libmp3lame', '-b:a', '128k', dest, '-loglevel', 'error']);
  fs.unlinkSync(brut);
  return fs.statSync(dest).size;
}

// ── plan ────────────────────────────────────────────────────────────────────
const NUES = [];
for (const l of LETTRES_NUES) {
  for (const [v, voix] of [['h', VOIX_H], ['f', VOIX_F]]) {
    NUES.push([`lettre-${l}-${v}`, l, voix]);
    NUES.push([`lettre-${l}-${v}-lent`, `[slowly] ${l}`, voix]);
  }
}
const total = RESPELL.length + IPA.length + NUES.length;
console.log(`${total} variantes (${RESPELL.length} respelling + ${IPA.length} IPA + ${NUES.length} lettres nues) → ${path.relative(RACINE, DEST)}`);
RESPELL.forEach(([s, t]) => console.log(`  [respell] ${s}.mp3  ← « ${t} »`));
IPA.forEach(([s, g, p]) => console.log(`  [ipa]     ${s}.mp3  ← « ${g} » + dict IPA [${p}]`));
NUES.forEach(([s, t, v]) => console.log(`  [nue]     ${s}.mp3  ← « ${t} » (voix ${v === VOIX_H ? 'H' : 'F'})`));

if (!POUR_DE_VRAI) {
  console.log('\nSimulation — relancer avec --pour-de-vrai pour générer.');
  process.exit(0);
}

// ── exécution ───────────────────────────────────────────────────────────────
const apiKey = cle();
let dict = null;
const besoinDict = IPA.some(([s]) => !fs.existsSync(path.join(DEST, `${s}.mp3`)));
if (besoinDict) try {
  dict = await uploadDict(apiKey);
  console.log(`\nDict IPA uploadé : ${dict.id} (version ${dict.version_id})`);
} catch (e) {
  console.error(`\nÉCHEC upload dict IPA (${e.message}) — les variantes -ipa seront sautées.`);
}

let ok = 0;
const echecs = [];
for (const [slug, texte] of RESPELL) {
  try { const t = await generer(slug, texte, apiKey, null); ok++; console.log(`OK   ${slug} (${t} o)`); }
  catch (e) { echecs.push(`${slug} : ${e.message}`); console.log(`KO   ${slug} — ${e.message}`); }
  await new Promise((r) => setTimeout(r, PAUSE_MS));
}
if (dict) {
  for (const [slug, grapheme] of IPA) {
    try { const t = await generer(slug, grapheme, apiKey, dict); ok++; console.log(`OK   ${slug} (${t} o)`); }
    catch (e) { echecs.push(`${slug} : ${e.message}`); console.log(`KO   ${slug} — ${e.message}`); }
    await new Promise((r) => setTimeout(r, PAUSE_MS));
  }
}
for (const [slug, texte, voix] of NUES) {
  try { const t = await generer(slug, texte, apiKey, null, voix); ok++; console.log(`OK   ${slug} (${t} o)`); }
  catch (e) { echecs.push(`${slug} : ${e.message}`); console.log(`KO   ${slug} — ${e.message}`); }
  await new Promise((r) => setTimeout(r, PAUSE_MS));
}
console.log(`\n${ok}/${total} générés${echecs.length ? ' · échecs : ' + echecs.join(' | ') : ''}`);
if (echecs.length) process.exit(1);
