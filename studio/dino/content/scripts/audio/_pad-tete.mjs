// Règle transverse MaxPlay : tout MP3 court (voix, SFX) porte AU MOINS 250 ms de silence en tête,
// sinon la première syllabe est mangée sur tablette/iPhone (démarrage du décodeur). Rappel PY 2026-09-05 :
// « pour le silence des MP3 il faut absolument suivre les règles ».
// Ce script MESURE le silence de tête (ffmpeg silencedetect) et COMPLÈTE jusqu'à la cible, en place.
// Un fichier déjà conforme n'est pas touché (ré-encodage évité). Les musiques bouclées sont EXCLUES par
// l'appelant (un silence casserait la boucle). 0 crédit ElevenLabs.
// Usage :
//   node _pad-tete.mjs <fichier.mp3|dossier> [...] [--cible-ms=250] [--seuil-db=-45] [--simulation] [--recursif]
// Sortie : une ligne par fichier modifié (avant → après), puis un bilan. Code 1 si un fichier n'a pu être traité.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';

const arg = (n, def) => { const a = process.argv.find(x => x.startsWith(`--${n}=`)); return a ? a.slice(n.length + 3) : def; };
const CIBLE_MS = Number(arg('cible-ms', 250));
const SEUIL_DB = Number(arg('seuil-db', -45));
const SIMULATION = process.argv.includes('--simulation');
const RECURSIF = process.argv.includes('--recursif');
const cibles = process.argv.slice(2).filter(x => !x.startsWith('--'));
// (le contrôle « aucune cible » vit dans le bloc CLI plus bas : ce module est aussi importé par les pipelines)

function lister(p) {
  const st = fs.statSync(p);
  if (st.isFile()) return p.toLowerCase().endsWith('.mp3') ? [p] : [];
  return fs.readdirSync(p).flatMap(f => {
    const q = path.join(p, f);
    const s = fs.statSync(q);
    if (s.isDirectory()) return RECURSIF ? lister(q) : [];
    return q.toLowerCase().endsWith('.mp3') ? [q] : [];
  });
}

// Silence de tête en ms : premier segment silencedetect qui commence à 0, sinon 0.
export function silenceTeteMs(fichier) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-i', fichier, '-af', `silencedetect=noise=${SEUIL_DB}dB:d=0.02`, '-f', 'null', '-'], { encoding: 'utf8' });
  const out = (r.stderr || '') + (r.stdout || '');
  const debut = out.match(/silence_start:\s*(-?[\d.]+)/);
  const fin = out.match(/silence_end:\s*([\d.]+)/);
  if (!debut || Number(debut[1]) > 0.005) return 0;
  if (!fin) return Infinity; // tout le fichier est silence
  return Math.round(Number(fin[1]) * 1000);
}

export function padTete(fichier, cibleMs = CIBLE_MS) {
  const avant = silenceTeteMs(fichier);
  if (avant >= cibleMs - 10) return { fichier, avant, apres: avant, modifie: false }; // tolérance 10 ms (arrondi MP3)
  const ajout = cibleMs - avant;
  if (SIMULATION) return { fichier, avant, apres: cibleMs, modifie: true, simulation: true };
  const tmp = path.join(os.tmpdir(), `pad-${process.pid}-${path.basename(fichier)}`);
  // adelay ajoute du silence numérique en tête sur tous les canaux ; on garde le débit d'origine (128k par défaut maison).
  execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', fichier, '-af', `adelay=${ajout}:all=1`, '-codec:a', 'libmp3lame', '-b:a', '128k', tmp]);
  fs.copyFileSync(tmp, fichier);
  fs.unlinkSync(tmp);
  let apres = silenceTeteMs(fichier);
  // Le ré-encodage MP3 ajoute un peu de souffle en tête : si la mesure retombe sous la cible, on complète une 2e fois.
  if (apres < cibleMs - 10) {
    execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', fichier, '-af', `adelay=${cibleMs - apres}:all=1`, '-codec:a', 'libmp3lame', '-b:a', '128k', tmp]);
    fs.copyFileSync(tmp, fichier); fs.unlinkSync(tmp);
    apres = silenceTeteMs(fichier);
  }
  return { fichier, avant, apres, modifie: true };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))) {
  if (!cibles.length) { console.error('usage: node _pad-tete.mjs <mp3|dossier> [...] [--cible-ms=250] [--simulation] [--recursif]'); process.exit(2); }
  const fichiers = cibles.flatMap(lister);
  let modifies = 0, ok = 0, ko = 0;
  for (const f of fichiers) {
    try {
      const r = padTete(f);
      if (r.modifie) { modifies++; console.log(`${r.simulation ? 'SIM ' : 'PAD '} ${path.relative(process.cwd(), f)} : ${r.avant} → ${r.apres} ms`); }
      else ok++;
    } catch (e) { ko++; console.log(`KO   ${f} : ${e.message.split('\n')[0]}`); }
  }
  console.log(`\n=== ${fichiers.length} MP3 · déjà conformes ${ok} · complétés ${modifies}${SIMULATION ? ' (simulation)' : ''} · KO ${ko} · cible ${CIBLE_MS} ms ===`);
  process.exit(ko ? 1 : 0);
}
