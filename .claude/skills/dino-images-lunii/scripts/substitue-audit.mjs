// Substitution : remplace l'image de production par sa version validée du staging.
// L'originale est SUPPRIMÉE (demande PY 2026-09-06 : « toute image que tu remplaces
// est purement et simplement supprimée »). Ne s'exécute que sur des fichiers
// explicitement listés, jamais en balayage automatique.
//
// GARDE-FOU (leçon L-D33) : la suppression étant irréversible, elle exige la preuve que
// l'image a été OUVERTE et JUGÉE. En session 2026-09-06, une image est partie en production
// sans avoir été regardée — glissée dans la commande par continuité après cinq autres —
// et elle portait justement le défaut morphologique interdit. Le journal des verdicts rend
// cet oubli impossible : on ne substitue que ce qui a été explicitement validé.
//
// Usage :
//   node substitue-audit.mjs --valide <Fichier.jpg> [...]   enregistre un verdict (après avoir vu l'image)
//   node substitue-audit.mjs <Fichier.jpg> [...]            substitue (refuse si non validé)
//   node substitue-audit.mjs --force <Fichier.jpg> [...]    passe outre (revue humaine hors journal)
import { existsSync, unlinkSync, statSync, readFileSync, appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const PALEO = ROOT + '/site/img/dinos/paleoart';
const STAGE = ROOT + '/site/img/dinos/_new-audit';
const VERDICTS = STAGE + '/_VERDICTS.tsv';

const cibles = process.argv.slice(2).filter(a => !a.startsWith('--'));
const FORCE = process.argv.includes('--force');
const VALIDE = process.argv.includes('--valide');

if (!cibles.length) {
  console.log('usage: node substitue-audit.mjs [--valide|--force] <Fichier.jpg> [...]');
  process.exit(1);
}

// Mode enregistrement : note les verdicts, ne substitue rien.
if (VALIDE) {
  const horodatage = new Date().toISOString();
  for (const f of cibles) appendFileSync(VERDICTS, [f, 'OK', horodatage].join('\t') + '\n');
  console.log(`✓ ${cibles.length} verdict(s) enregistré(s) dans _VERDICTS.tsv`);
  process.exit(0);
}

const juges = existsSync(VERDICTS)
  ? new Set(readFileSync(VERDICTS, 'utf8').split(/\r?\n/).filter(Boolean).map(l => l.split('\t')[0]))
  : new Set();

let ok = 0, ko = 0;
for (const f of cibles) {
  const src = STAGE + '/' + f.replace(/\.(jpg|webp)$/, '.png');
  const dst = PALEO + '/' + f;
  if (!existsSync(src)) { console.log(`✗ staging absent : ${f}`); ko++; continue; }
  if (!existsSync(dst)) { console.log(`✗ production absente : ${f}`); ko++; continue; }
  // L'originale va être supprimée : exiger le verdict visuel.
  if (!FORCE && !juges.has(f)) {
    console.log(`✗ ${f} : aucun verdict — ouvrir l'image et la juger, puis :`);
    console.log(`     node substitue-audit.mjs --valide ${f}`);
    ko++; continue;
  }
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
