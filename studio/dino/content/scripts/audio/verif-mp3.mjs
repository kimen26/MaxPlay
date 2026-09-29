#!/usr/bin/env node
// verif-mp3.mjs — porte R13b (vague 3 process militaire) : vérifie que les 5 MP3 fr d'un dino
// EXISTENT et sont dans les bornes attendues, mesuré depuis le disque (ffprobe), jamais tenu
// à la main. Cause racine visée : nouveau-dino:169 « MP3 OK mais absents » et :107 « compter
// 5 MP3 … ffprobe à l'œil » — remplacés par un script appelé en fin de _gen-audio-v3.sh, KO
// si un MP3 manque au lieu d'un « OK » silencieux sur fichier absent.
//
// Vérifie par bloc (nom, taille, regime, funfact, recap) :
//   [BLOQUANT] fichier présent, taille > 5 Ko
//   [BLOQUANT] durée dans la fourchette attendue (bloc : 15-50 s · recap : 60-120 s)
//   [BLOQUANT] silence de tête >= 240 ms (pad 250 visé) (réutilise silenceTeteMs de _pad-tete.mjs, 0 crédit EL)
//
// --stt (reconstruction du texte depuis _seg-<id>-<bloc>.json puis diff via
// ~/.claude/skills/audio-verif/scripts/verif.mjs) coûte des crédits ElevenLabs (STT) —
// TODO(--stt) : pas implémenté ici volontairement, opt-in seulement, jamais par défaut.
// Voir L-D-81 (appel STT coupé facturé) et HO-019 (solde Creator serré).
//
// Usage :
//   node verif-mp3.mjs <id>            → un seul dino, sortie lisible
//   node verif-mp3.mjs <id> --json     → sortie JSON (CI/agents)
//   node verif-mp3.mjs <id1> <id2> ... → plusieurs dinos d'un coup
// Sort code 1 si au moins un bloc BLOQUANT sur au moins un id, 0 sinon.
import { existsSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..', '..', '..', '..', '..');
const AUDIO_DIR = resolve(ROOT, 'site', 'audio', 'dinos', 'fr');

const BLOCS = ['nom', 'taille', 'regime', 'funfact'];
const RECAP = 'recap';
const TAILLE_MIN_OCTETS = 5000;
const DUREE_BLOC = { min: 15, max: 50 }; // 50 s : un bloc A qui décompose le nom (EP-D22) dure ~40-45 s (décision main 2026-09-29)
const DUREE_RECAP = { min: 60, max: 120 };
const SILENCE_TETE_MIN_MS = 240; // pad visé 250 ms ; une trame MP3 (~26 ms) de tolérance de mesure, 248-249 ms mesurés sur des pads corrects

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const ids = args.filter(a => !a.startsWith('--'));

if (!ids.length) {
  console.error('usage: node verif-mp3.mjs <id> [id2 ...] [--json]');
  process.exit(2);
}

// Silence de tête en ms : premier segment silencedetect qui commence à 0, sinon 0.
// Dupliqué à dessein depuis _pad-tete.mjs (script CLI indépendant, même logique que
// check-figees.mjs vis-à-vis de check-mj-coherence.mjs — deux effets de bord en tête
// de fichier, pas des modules faits pour être importés l'un par l'autre).
function silenceTeteMs(fichier, seuilDb = -45) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-i', fichier, '-af', `silencedetect=noise=${seuilDb}dB:d=0.02`, '-f', 'null', '-'], { encoding: 'utf8' });
  const out = (r.stderr || '') + (r.stdout || '');
  const debut = out.match(/silence_start:\s*(-?[\d.]+)/);
  const fin = out.match(/silence_end:\s*([\d.]+)/);
  if (!debut || Number(debut[1]) > 0.005) return 0;
  if (!fin) return Infinity;
  return Math.round(Number(fin[1]) * 1000);
}

function dureeSec(fichier) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', fichier], { encoding: 'utf8' });
  const v = Number((r.stdout || '').trim());
  return Number.isFinite(v) ? v : null;
}

function verifBloc(id, bloc, fourchette) {
  const fichier = join(AUDIO_DIR, `${id}-${bloc}.mp3`);
  const manques = [];

  if (!existsSync(fichier)) {
    return { bloc, fichier, present: false, manques: [`fichier absent : ${fichier}`] };
  }

  const taille = statSync(fichier).size;
  if (taille <= TAILLE_MIN_OCTETS) manques.push(`taille ${taille} o <= ${TAILLE_MIN_OCTETS} o`);

  const duree = dureeSec(fichier);
  if (duree === null) manques.push('durée illisible (ffprobe KO)');
  else if (duree < fourchette.min || duree > fourchette.max) {
    manques.push(`durée ${duree.toFixed(1)} s hors bornes [${fourchette.min}-${fourchette.max}] s`);
  }

  const silence = silenceTeteMs(fichier);
  if (silence < SILENCE_TETE_MIN_MS) manques.push(`silence de tête ${silence} ms < ${SILENCE_TETE_MIN_MS} ms`);

  return { bloc, fichier, present: true, taille, duree, silenceTeteMs: silence, manques };
}

// TODO(--stt) : mode optionnel `--stt` (jamais par défaut, coûte des crédits ElevenLabs) :
// reconstruire le texte attendu depuis studio/dino/content/scripts-audio/fr/V3/json/_seg-<id>-<bloc>.json
// (champ texte des dialogue_blocks) et appeler ~/.claude/skills/audio-verif/scripts/verif.mjs
// pour un diff mot à mot transcription/texte source. Volontairement NON implémenté ici :
// cf. tête de fichier, L-D-81, HO-019.
if (args.includes('--stt')) {
  console.error('--stt non implémenté (coûte des crédits ElevenLabs) — voir TODO en tête de fichier.');
  process.exit(2);
}

const resultats = ids.map(id => {
  const blocs = [
    ...BLOCS.map(b => verifBloc(id, b, DUREE_BLOC)),
    verifBloc(id, RECAP, DUREE_RECAP)
  ];
  const ko = blocs.filter(b => b.manques.length > 0);
  return { id, blocs, ok: ko.length === 0 };
});

if (asJson) {
  console.log(JSON.stringify({ resultats }, null, 2));
} else {
  for (const r of resultats) {
    console.log(`\n${r.ok ? 'OK  ' : 'KO  '} ${r.id}`);
    for (const b of r.blocs) {
      if (b.manques.length === 0) {
        console.log(`  ✓ ${b.bloc.padEnd(8)} ${b.duree ? b.duree.toFixed(1) + 's' : ''} silence=${b.silenceTeteMs}ms`);
      } else {
        console.log(`  ✖ ${b.bloc.padEnd(8)} ${b.manques.join(' ; ')}`);
      }
    }
  }
  const nbKo = resultats.filter(r => !r.ok).length;
  console.log(`\n=== ${resultats.length - nbKo} OK · ${nbKo} KO sur ${resultats.length} dino(s) ===`);
}

process.exit(resultats.some(r => !r.ok) ? 1 : 0);
