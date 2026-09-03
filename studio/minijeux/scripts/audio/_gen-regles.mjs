#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-regles.mjs — voix réelle des 55 panneaux de règles 🧑‍🔬
//
//   node studio/referentiel/_gen-regles.mjs                 (simulation)
//   node studio/referentiel/_gen-regles.mjs --pour-de-vrai
//
// Le panneau de règles est lu D'UN SEUL TENANT par regle-info.js : accroche +
// étapes + la phrase de l'étoile, concaténées. On génère donc UN MP3 par jeu
// (55), pas un par étape (493) — c'est ce que l'oreille entend réellement.
//
// L'extraction du texte vit dans lib/regles.mjs — la MÊME fonction sert au
// catalogue (catalogue/fr/regles.mjs). Toute divergence ferait mentir le MP3.
//
// Slug = regle-<id du jeu> : regle-info.js le dérive tout seul, aucun des 55
// jeux n'a besoin d'être modifié.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { SITE, RACINE, existe, lireJson } from '../../../referentiel/lib/socle.mjs';
import { listerRegles } from '../../../referentiel/lib/regles.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');
const iLimite = process.argv.indexOf('--limite');
const LIMITE = iLimite > -1 ? Number(process.argv[iLimite + 1]) : Infinity;
const SORTIE = path.join(SITE, 'sounds', 'voix', 'phrases');

const travaux = [];
for (const r of listerRegles()) {
  if (r.ignore) { console.log(`IGNORE ${r.id} — ${r.ignore}`); continue; }
  travaux.push({ ...r, dest: path.join(SORTIE, `${r.slug}.mp3`) });
}

const aFaire = travaux.filter((t) => !existe(t.dest)).slice(0, LIMITE);
const cout = aFaire.reduce((s, t) => s + t.texte.length + 12, 0);
console.log(`${travaux.length} panneaux · ${aFaire.length} à générer · ~${cout.toLocaleString('fr-FR')} caractères`);

if (!POUR_DE_VRAI) {
  aFaire.slice(0, 5).forEach((t) => console.log(`  [simulation] ${t.slug}.mp3 (${t.texte.length} c) — ${t.texte.slice(0, 90)}…`));
  console.log('\nSimulation — relancer avec --pour-de-vrai.');
  process.exit(0);
}

const map = lireJson(path.join(RACINE, 'studio', 'narration', 'personnages', 'voix-meta', 'voice-map.json'));
const apiKey = (() => {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE INTROUVABLE'); process.exit(1); }
  return k;
})();

let ok = 0;
const echecs = [];
for (const t of aFaire) {
  const brut = `${t.dest}.brut.mp3`;
  try {
    // [warmly] : le savant fou explique, il n'annonce pas une catastrophe.
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${map.voices.narrateur_h}`, {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `[warmly] ${t.texte}`,
        model_id: 'eleven_v3',
        voice_settings: { stability: 0.4, similarity_boost: 0.8 },
      }),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${(await r.text()).slice(0, 110)}`);
    fs.writeFileSync(brut, Buffer.from(await r.arrayBuffer()));
    execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
      '-codec:a', 'libmp3lame', '-b:a', '128k', t.dest, '-loglevel', 'error']);
    fs.unlinkSync(brut);
    ok += 1;
    console.log(`OK   ${t.slug}.mp3`);
  } catch (e) {
    echecs.push(`${t.slug} : ${e.message}`);
    console.log(`KO   ${t.slug} — ${e.message}`);
    if (existe(brut)) fs.unlinkSync(brut);
  }
  await new Promise((res) => setTimeout(res, 900));
}
console.log(`\n${ok} générés · ${echecs.length} en échec`);
