#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// _gen-humeur-invitee.mjs — encouragements des langues invitées
//
//   node studio/referentiel/_gen-humeur-invitee.mjs                 (simulation)
//   node studio/referentiel/_gen-humeur-invitee.mjs --pour-de-vrai
//   node studio/referentiel/_gen-humeur-invitee.mjs --langue pt-BR --pour-de-vrai
//
// Lit le catalogue (catalogue/fr/humeur.mjs § HUMEUR_INVITEE) — aucun texte n'est
// écrit ici. Sortie : site/sounds/voix/<langue>/<f|h|wex>/<slug>.mp3
//
// ⚠️ DEUX RÉSERVES CONNUES, à trancher à l'oreille :
//   1. ACCENT — on réutilise les trois voix françaises. eleven_v3 les fait parler
//      toutes les langues, mais le skill elevenlabs-voice-design § 6 recommande
//      une voix NATIVE par langue en production : l'accent français transparaît.
//      Avec un drapeau 🇧🇷 affiché, c'est contradictoire. À juger en écoutant.
//   2. RELECTURE — aucun texte n'a été relu par un locuteur natif.
// Les deux sont réversibles : on régénère, les fichiers ne sont pas du canon.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { SITE, RACINE, existe, lireJson } from './lib/socle.mjs';
import { HUMEUR, HUMEUR_INVITEE } from './catalogue/fr/humeur.mjs';
import { TRIO } from './catalogue/voix.mjs';

const POUR_DE_VRAI = process.argv.includes('--pour-de-vrai');
const iLangue = process.argv.indexOf('--langue');
const FILTRE = iLangue > -1 ? process.argv[iLangue + 1] : null;

const DOSSIER = { narrateur_f: 'f', narrateur_h: 'h', wex: 'wex' };

const map = lireJson(path.join(RACINE, 'studio', 'narration', 'personnages', 'voix-meta', 'voice-map.json'));
const apiKey = (() => {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  const k = s && s.env && s.env.ELEVENLABS_API_KEY;
  if (!k || /^\$\{/.test(k)) { console.error('CLE ELEVENLABS INTROUVABLE'); process.exit(1); }
  return k;
})();

// ── construction des travaux depuis le CATALOGUE ────────────────────────────
const travaux = [];
for (const invite of HUMEUR_INVITEE) {
  if (FILTRE && invite.langue !== FILTRE) continue;
  const pool = HUMEUR.find((p) => p.cle === invite.cle);
  if (!pool || !pool.doublon_multilingue) continue; // positifs seulement (décision PY)
  for (const v of invite.variantes) {
    for (const role of TRIO) {
      travaux.push({
        langue: invite.langue,
        role,
        slug: v.slug,
        texte: (v.tags || []).map((t) => `[${t}]`).join('') + ' ' + v.texte,
        dest: path.join(SITE, 'sounds', 'voix', invite.langue, DOSSIER[role], `${v.slug}.mp3`),
      });
    }
  }
}

const aFaire = travaux.filter((t) => !existe(t.dest));
const cout = aFaire.reduce((s, t) => s + t.texte.length, 0);
console.log(`${travaux.length} fichiers prévus · ${aFaire.length} à générer · ~${cout} caractères`);

if (!POUR_DE_VRAI) {
  const parLangue = {};
  for (const t of aFaire) parLangue[t.langue] = (parLangue[t.langue] || 0) + 1;
  for (const [l, n] of Object.entries(parLangue)) console.log(`  [simulation] ${l} : ${n}`);
  console.log('\nSimulation — relancer avec --pour-de-vrai.');
  process.exit(0);
}

let ok = 0;
const echecs = [];
for (const t of aFaire) {
  fs.mkdirSync(path.dirname(t.dest), { recursive: true });
  const brut = `${t.dest}.brut.mp3`;
  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${map.voices[t.role]}`, {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: t.texte,
        model_id: 'eleven_v3',
        language_code: t.langue.split('-')[0],
        voice_settings: { stability: 0.35, similarity_boost: 0.8 },
      }),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${(await r.text()).slice(0, 120)}`);
    fs.writeFileSync(brut, Buffer.from(await r.arrayBuffer()));
    execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
      '-codec:a', 'libmp3lame', '-b:a', '128k', t.dest, '-loglevel', 'error']);
    fs.unlinkSync(brut);
    ok += 1;
    if (ok % 10 === 0) console.log(`  … ${ok}/${aFaire.length}`);
  } catch (e) {
    echecs.push(`${t.langue}/${DOSSIER[t.role]}/${t.slug} : ${e.message}`);
    if (existe(brut)) fs.unlinkSync(brut);
  }
  await new Promise((res) => setTimeout(res, 900));
}

console.log(`\n${ok} générés · ${echecs.length} en échec`);
echecs.slice(0, 10).forEach((e) => console.log(`  KO ${e}`));
if (echecs.length) process.exit(1);
