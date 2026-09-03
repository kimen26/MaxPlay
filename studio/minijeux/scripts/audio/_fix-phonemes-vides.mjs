#!/usr/bin/env node
// _fix-phonemes-vides.mjs — one-shot 2026-08-11 : 4 phonèmes (ke, o, se, te)
// pour lesquels eleven_v3 renvoie un corps VIDE (200, 0 octet) sur le texte nu.
// Retente avec variantes (« ke. » puis « ke ke »), padding + loudnorm, remplace
// le MP3 seulement si le résultat est sain.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { RACINE, lireJson } from '../../../referentiel/lib/socle.mjs';

const CIBLES = ['son-ke', 'son-o', 'son-se', 'son-te'];
const PLAN = path.join(RACINE, 'studio', 'referentiel', 'plan-generation.json');

const apiKey = (() => {
  const s = lireJson(path.join(process.env.USERPROFILE || process.env.HOME, '.claude', 'settings.json'));
  return s.env.ELEVENLABS_API_KEY;
})();

async function tts(texte, entree) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${entree.voix_id}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texte, model_id: entree.modele, voice_settings: { ...entree.reglages } }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} — ${(await r.text()).slice(0, 120)}`);
  return Buffer.from(await r.arrayBuffer());
}

const plan = lireJson(PLAN);
for (const slug of CIBLES) {
  const entree = plan.appels.find((a) => a.destination === `site/sounds/phonemes/${slug}.mp3`);
  if (!entree) { console.log(`?? ${slug} : pas dans le plan`); continue; }
  const dest = path.join(RACINE, entree.destination);
  const brut = dest.replace(/\.mp3$/, '._brut.mp3');
  const variantes = [entree.texte_envoye, `${entree.texte_envoye}.`, `${entree.texte_envoye} ${entree.texte_envoye}`];
  let fait = false;
  for (const texte of variantes) {
    const buf = await tts(texte, entree);
    console.log(`  ${slug} ← « ${texte} » : ${buf.length} octets`);
    if (buf.length < 1000) { await new Promise((r) => setTimeout(r, 1200)); continue; }
    fs.writeFileSync(brut, buf);
    execFileSync('ffmpeg', ['-y', '-i', brut, '-af', 'adelay=250:all=1,loudnorm',
      '-codec:a', 'libmp3lame', '-b:a', '128k', dest, '-loglevel', 'error']);
    fs.unlinkSync(brut);
    console.log(`OK ${slug}.mp3 (${fs.statSync(dest).size} o, texte « ${texte} »)`);
    fait = true;
    break;
  }
  if (!fait) console.log(`KO ${slug} : 3 variantes vides — à régénérer autrement`);
  await new Promise((r) => setTimeout(r, 1200));
}
