#!/usr/bin/env node
// webp-convert.mjs — convertit un dossier de PNG/JPG en WebP (même outil/qualité que les
// 82 webp existants du site : ffmpeg -c:v libwebp -quality 80). HO-R13, 2026-09-12.
//
// Usage :
//   node studio/dino/scripts/images/webp-convert.mjs <dossier> [--alpha] [--dry-run] [--keep]
//
//   <dossier>   chemin relatif à la racine repo (ex. site/img/dinos/sprites)
//   --alpha     source à canal alpha (sprites/têtes) : lossless si petite palette,
//               sinon q90 (évite le flou visible sur les bords transparents à q80)
//   --dry-run   liste ce qui serait fait, ne convertit rien
//   --keep      garde les sources après conversion (par défaut : supprimées une fois
//               le webp validé — dimensions identiques via ffprobe)
//
// Ne traite QUE .png/.jpg/.jpeg à la racine du dossier donné (pas de récursion —
// appeler une fois par sous-dossier si besoin).
import { readdirSync, statSync, unlinkSync } from 'node:fs';
import { resolve, extname, basename, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '../../../..');
const FFMPEG = 'C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe';
const FFPROBE = 'C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffprobe.exe';

const args = process.argv.slice(2);
const dirArg = args.find((a) => !a.startsWith('--'));
const ALPHA = args.includes('--alpha');
const DRY = args.includes('--dry-run');
const KEEP = args.includes('--keep');

if (!dirArg) {
  console.error('Usage: node webp-convert.mjs <dossier> [--alpha] [--dry-run] [--keep]');
  process.exit(1);
}

const dir = resolve(ROOT, dirArg);
const files = readdirSync(dir).filter((f) => ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()));

function dims(path) {
  const r = spawnSync(FFPROBE, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=s=x:p=0', path], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`ffprobe échoué sur ${path} : ${r.stderr}`);
  return r.stdout.trim();
}

let okCount = 0, failCount = 0, beforeBytes = 0, afterBytes = 0;

for (const f of files) {
  const src = join(dir, f);
  const outName = basename(f, extname(f)) + '.webp';
  const out = join(dir, outName);
  const srcSize = statSync(src).size;

  if (DRY) {
    console.log(`[dry-run] ${f} → ${outName}`);
    continue;
  }

  const qArgs = ALPHA
    ? ['-lossless', '1', '-compression_level', '6']
    : ['-quality', '80'];
  const r = spawnSync(FFMPEG, ['-y', '-i', src, '-c:v', 'libwebp', ...qArgs, out], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0) {
    console.error(`✗ ${f} : ffmpeg a échoué — ${r.stderr?.toString().slice(-300)}`);
    failCount++;
    continue;
  }

  // Validation : le webp s'ouvre et a les mêmes dimensions que la source.
  let srcDims, outDims;
  try {
    srcDims = dims(src);
    outDims = dims(out);
  } catch (e) {
    console.error(`✗ ${f} : ${e.message}`);
    failCount++;
    continue;
  }
  if (srcDims !== outDims) {
    console.error(`✗ ${f} : dimensions différentes (source ${srcDims} ≠ webp ${outDims}) — webp NON validé, source conservée.`);
    unlinkSync(out);
    failCount++;
    continue;
  }

  const outSize = statSync(out).size;
  beforeBytes += srcSize;
  afterBytes += outSize;
  okCount++;
  console.log(`✓ ${f} (${(srcSize / 1024).toFixed(0)} Ko) → ${outName} (${(outSize / 1024).toFixed(0)} Ko)`);

  if (!KEEP) unlinkSync(src);
}

if (!DRY) {
  console.log(`\n${okCount} converties, ${failCount} échouées.`);
  console.log(`Avant : ${(beforeBytes / 1024 / 1024).toFixed(1)} Mo · Après : ${(afterBytes / 1024 / 1024).toFixed(1)} Mo`);
}
