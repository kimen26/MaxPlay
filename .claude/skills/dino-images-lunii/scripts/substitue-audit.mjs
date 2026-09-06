// Substitution : remplace l'image de production par sa version validée du staging.
// L'originale est SUPPRIMÉE (demande PY 2026-09-06 : « toute image que tu remplaces
// est purement et simplement supprimée »). Ne s'exécute que sur des fichiers
// explicitement listés, jamais en balayage automatique : la validation visuelle
// se fait en amont, image par image, par l'agent.
//
// Usage : node substitue-audit.mjs <Fichier1.jpg> [Fichier2.jpg ...]
import { existsSync, unlinkSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const PALEO = ROOT + '/site/img/dinos/paleoart';
const STAGE = ROOT + '/site/img/dinos/_new-audit';

const cibles = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!cibles.length) { console.log('usage: node substitue-audit.mjs <Fichier.jpg> [...]'); process.exit(1); }

let ok = 0, ko = 0;
for (const f of cibles) {
  const src = STAGE + '/' + f.replace(/\.(jpg|webp)$/, '.png');
  const dst = PALEO + '/' + f;
  if (!existsSync(src)) { console.log(`✗ staging absent : ${f}`); ko++; continue; }
  if (!existsSync(dst)) { console.log(`✗ production absente : ${f}`); ko++; continue; }
  const avant = statSync(dst).size;
  try {
    if (!/\.(jpg|webp)$/.test(f)) { console.log(`✗ extension non gérée : ${f}`); ko++; continue; }
    // ImageMagick absent du poste (`convert.exe` = utilitaire disque Windows) : Pillow.
    execFileSync('python', [ROOT + '/.claude/skills/dino-images-lunii/scripts/png2prod.py', src, dst], { stdio: 'pipe' });
  } catch (e) {
    console.log(`✗ conversion échouée : ${f} — ${e.message.split('\n')[0]}`); ko++; continue;
  }
  unlinkSync(src); // le staging est une inbox, pas un entrepôt (règle 2026-07-19)
  console.log(`✓ ${f}  ${(avant/1024).toFixed(0)} Ko → ${(statSync(dst).size/1024).toFixed(0)} Ko`);
  ok++;
}
console.log(`\n=== ${ok} substituée(s), ${ko} refusée(s)`);
process.exit(ko ? 1 : 0);
