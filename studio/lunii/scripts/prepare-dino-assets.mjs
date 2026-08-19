// Prépare les assets Lunii d'un dino à partir des blocs audio CANON du site
// (site/audio/dinos/fr/<slug>-{nom,taille,regime,funfact,recap}.mp3) :
//
//   assets/audio/recits-dino/<slug>.mp3   = 4 blocs concaténés + pad 300 ms + loudnorm
//                                           (récap EXCLU du flux linéaire — EP-D-30, 2026-08-17 :
//                                           le récap = concat des 4 blocs, bouton « tout réécouter »
//                                           de l'app ; collé ici, toute la fiche rejouait à la fin)
//   assets/audio/noms-dino/nom-<slug>.mp3 = nom sec extrait du début du bloc « nom »
//                                           (cut au 1er silence) + pad 300 ms + loudnorm
//
// EMBALLE l'audio déjà canon — AUCUN TTS ici (règle d'or Lunii). Utile quand la
// clé ElevenLabs est indispo : le nom sec vient du bloc canon, pas d'une régénération.
//
// Usage : node studio/lunii/scripts/prepare-dino-assets.mjs <slug> [<slug>...]
// Prérequis : ffmpeg (winget Gyan.FFmpeg).
//
// Recette audio (cf. LESSONS-MOTEUR.md) : pad 300 ms de tête (1re syllabe coupée
// sinon) PUIS loudnorm — jamais l'inverse (le loudnorm compresse le silence).

import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

const ROOT = "c:/ProjetsPerso/Claude_Projects/MaxPlay";
const SRC = join(ROOT, "site/audio/dinos/fr");
const OUT_RECITS = join(ROOT, "studio/lunii/assets/audio/recits-dino");
const OUT_NOMS = join(ROOT, "studio/lunii/assets/audio/noms-dino");
const FFMPEG =
  "C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";

// Blocs du flux linéaire Lunii — le récap reste canon côté app mais n'entre PAS ici (EP-D-30).
const BLOCS = ["nom", "taille", "regime", "funfact"];

function run(args, label) {
  const r = spawnSync(FFMPEG, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) throw new Error(`${label} a échoué : ${r.stderr?.toString().slice(-300)}`);
  return r.stderr?.toString() || "";
}

// 1er silence après ≥0.6 s de parole, dans les 6 premières secondes.
// Deux passes : (-35 dB, 0.3 s) puis (-30 dB, 0.25 s) si rien trouvé.
function firstSpeechEnd(file) {
  for (const [noise, d] of [["-35dB", 0.3], ["-30dB", 0.25]]) {
    const err = run(["-t", "6", "-i", file, "-af", `silencedetect=noise=${noise}:d=${d}`, "-f", "null", "-"], "silencedetect");
    const m = err.match(/silence_start: ([0-9.]+)/);
    if (m && parseFloat(m[1]) >= 0.6) return parseFloat(m[1]);
  }
  throw new Error(`Pas de silence détecté dans les 6 premières secondes de ${file}`);
}

const slugs = process.argv.slice(2);
if (slugs.length === 0) {
  console.error("Usage : node prepare-dino-assets.mjs <slug> [<slug>...]");
  process.exit(1);
}

mkdirSync(OUT_RECITS, { recursive: true });
mkdirSync(OUT_NOMS, { recursive: true });

for (const slug of slugs) {
  const fichiers = BLOCS.map((b) => join(SRC, `${slug}-${b}.mp3`));
  for (const f of fichiers) if (!existsSync(f)) throw new Error(`Bloc canon manquant : ${f}`);

  // 1. Nom sec : début du bloc « nom » jusqu'au 1er silence (+120 ms de marge),
  //    léger fade-out pour éviter une coupe sèche, pad 300 ms, loudnorm.
  //    Si la détection de silence échoue (bloc sans pause exploitable) ET qu'un
  //    nom-sec existe déjà dans les assets, on le CONSERVE (il ne change pas avec
  //    le fix récap) au lieu de crasher le batch — sinon on jette (pas d'invention).
  let cut = null;
  try {
    cut = firstSpeechEnd(fichiers[0]) + 0.12;
  } catch (e) {
    if (existsSync(join(OUT_NOMS, `nom-${slug}.mp3`))) {
      console.log(`… ${slug} : nom-sec conservé (${e.message})`);
    } else {
      throw e;
    }
  }
  if (cut !== null) {
    // ⚠️ -t AVANT -i (trim d'entrée) : en option de sortie il tronquerait le pad 300 ms
    run(
      ["-y", "-t", cut.toFixed(3), "-i", fichiers[0],
       "-af", `afade=t=out:st=${(cut - 0.15).toFixed(3)}:d=0.15,adelay=300|300,loudnorm`,
       join(OUT_NOMS, `nom-${slug}.mp3`)],
      `nom ${slug}`
    );
  }

  // 2. Récit complet : concat des blocs du flux (filter concat = ré-encodage propre),
  //    pad 300 ms, loudnorm. Filtre construit sur BLOCS (source de vérité unique).
  const inputs = fichiers.flatMap((f) => ["-i", f]);
  const concat =
    fichiers.map((_, i) => `[${i}:a]`).join("") +
    `concat=n=${fichiers.length}:v=0:a=1[c];[c]adelay=300|300,loudnorm[out]`;
  run(
    ["-y", ...inputs, "-filter_complex", concat, "-map", "[out]",
     join(OUT_RECITS, `${slug}.mp3`)],
    `récit ${slug}`
  );

  console.log(`✔ ${slug}${cut !== null ? ` (nom coupé à ${cut.toFixed(2)} s)` : " (nom-sec conservé)"}`);
}
console.log(`${slugs.length} dino(s) préparé(s).`);
