// Batch OMBRE CHINOISE — 1 silhouette par dino, style papier découpé noir.
// Base sur batch-dino-coloriage.mjs (memes fonctions fiche, champs, etc.)
//
// Usage: node batch-dino-ombre.mjs <id1> [id2] [id3] ...
//        node batch-dino-ombre.mjs --grok <id1> [id2] ...

import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createBatchState, checkSuccess } from './batch-helpers.mjs';

const ROOT = 'c:/ProjetsPerso/Claude_Projects/MaxPlay';
const SKILL = '.claude/skills/dino-images-lunii/scripts';
const FIELDS = SKILL + '/dino-fields.mjs';
const FICHES = ROOT + '/studio/dino/content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md';

const USE_GROK = process.argv.includes('--grok');
const GEN = USE_GROK ? SKILL + '/grok-gen-dino.mjs' : SKILL + '/gpt-gen-dino.mjs';
const GPTS = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project';

const OUTD = ROOT + '/site/img/dinos/_new-ombre';
const PROGRESS = OUTD + '/_PROGRESS.tsv';
mkdirSync(OUTD, { recursive: true });

const ids = process.argv.slice(2).filter(a => !a.startsWith('--'));
const fichesTxt = existsSync(FICHES) ? readFileSync(FICHES, 'utf8') : '';

// Signatures morphologiques manuelles pour les dinos sans fiche.
const MORPHO = {
  elasmosaurus: "cou immense d'environ 7 m, petite tete, corps en tonneau, 4 grandes nageoires en pagaie",
  ophthalmosaurus: "corps fuselé de dauphin, yeux enormes d'environ 23 cm, museau court et fin",
  liopleurodon: "pliosaure trapu, tete enorme avec machoires puissantes, 4 grandes nageoires",
  archelon: "tortue marine geante, carapace bombée, immenses nageoires en forme d'aile",
  shonisaurus: "ichtyosaure geant de 15 m, museau long, 4 nageoires fines",
  patagotitan: "titanosaure colossal de 37 m, tres long cou et queue, 4 pattes-piliers",
  centrosaurus: "ceratopsien avec une seule grande corne nasale, collerette osseuse bordee de crochets",
  ichthyosaurus: "reptile marin en forme de dauphin, museau long, grands yeux",
};

function getFields(id) {
  return JSON.parse(execFileSync('node', [FIELDS, id], { encoding: 'utf8' }));
}
// ⚠️ Deux pièges corrigés 2026-07-30 (le bloc n'était JAMAIS trouvé) :
//  - dans une string, '[\s\S]' s'écrase en '[sS]' — il faut '[\\s\\S]' ;
//  - le délimiteur de fin est le caractère ❓, pas '?' ;
//  - '\\b' devant le nom, sinon Saurolophus attrape la fiche Parasaurolophus.
function ficheBlock(d) {
  const keys = [d.full, d.name].filter(Boolean);
  for (const k of keys) {
    const base = k.split(/[ (]/)[0];
    const re = new RegExp('## .*\\b' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?### ❓', 'i');
    const m = fichesTxt.match(re);
    if (m) return m[0].replace(/### ❓[\s\S]*$/, '').trim();
  }
  return null;
}
function fichePuce(d, label) {
  const b = ficheBlock(d);
  if (!b) return '';
  const line = b.split('\n').find(l => new RegExp('\\*\\*' + label + '\\*\\*', 'i').test(l));
  if (!line) return '';
  return line
    .replace(/^[-\s]*\*\*[^*]+\*\*\s*:?\s*/i, '')
    .replace(/\*\*/g, '')
    .replace(/\s*—.*$/, '')
    .replace(/[^.;,]*\b(?:pas|uniquement|plutôt|probables?|possibles?|ne\s)\b[^.;,]*/gi, '')
    .replace(/\s+/g, ' ').trim();
}
function ficheSignature(d) {
  const b = ficheBlock(d);
  if (!b) return '';
  const lines = b.split('\n').filter(l => /⭐\s*\*\*Signature/i.test(l));
  if (!lines.length) return '';
  return lines[0].replace(/^[-\s]*⭐\s*\*\*Signature\*\*\s*:?\s*/i, '').replace(/\*\*/g, '').trim();
}
function descPhysique(d) {
  const out = [];
  const seen = new Set();
  for (const label of ['Silhouette', 'Tête', 'Dents', 'Peau', 'Pieds', 'Bras']) {
    const p = fichePuce(d, label);
    if (p && !seen.has(p)) { seen.add(p); out.push(p); }
  }
  return out;
}
function mesuresGlobales(d) {
  const p = [];
  if (parseFloat(d.taille_m)) p.push(`${String(d.taille_m).replace('.', ',')} m de long`);
  if (parseFloat(d.hauteur_m)) p.push(`${String(d.hauteur_m).replace('.', ',')} m de haut`);
  if (parseFloat(d.poids_t)) p.push(`${String(d.poids_t).replace('.', ',')} tonnes`);
  return p.join(', ');
}

const PREVIEW = process.argv.includes('--preview');
function gen(prompt, outName, firstOfDino) {
  if (PREVIEW) { console.log(`\n--- [${outName}] ---\n${prompt}`); return 0; }
  const args = [GEN, prompt, OUTD + '/' + outName];
  if (firstOfDino) args.push(...(USE_GROK ? ['--new'] : ['--url', GPTS]));
  try {
    const out = execFileSync('node', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
    process.stdout.write(out);
    return 0;
  } catch (e) {
    const code = e.status || 1;
    if (code === 5) { console.log('⛔ ARRÊT : limite/crédits. Reprends plus tard.'); process.exit(5); }
    console.log(`(échoué code=${code} pour ${outName})`);
    return code;
  }
}

function logProgress(id, scene, status) {
  appendFileSync(PROGRESS, `${new Date().toISOString()}\t${id}\t${scene}\t${status}\n`);
}

const batch = createBatchState(OUTD, 20);
const state = batch.load();
batch.checkQuota(state);

const ENTETE = `CONTEXTE : illustration pour un mini-jeu de coloriage pour enfant de 4 ans.
RÔLE : illustrateur graphique, style ombre chinoise / papier découpé.`;

const STYLE_OMBRE = `STYLE : ombre chinoise / papier découpé. Silhouette NOIRE PLEINE uniquement, pas de contours blancs, pas de détails internes, pas de gris, pas de couleur. FORME PLEINE noire sur fond transparent. Style art papier, très épuré, très graphique, très contrasté. L'animal doit être instantanément reconnaissable comme une silhouette. Pas de texte ni de chiffre dans l'image.`;

function buildOmbrePrompt(d, id) {
  const regimeMot = d.regime ? d.regime.replace(/[^\p{L}\s]/gu, '').trim().toLowerCase() : '';
  const epoqueMot = d.epoque ? d.epoque.split('·')[0].trim() : 'son époque';
  
  const lignes = [
    ENTETE,
    `OBJECTIF : dessiner un ${d.name} en entier, de profil ou 3/4, sous forme d'ombre chinoise / silhouette noire pleine.`,
    `LE DINOSAURE : ${d.name}${d.full && d.full !== d.name ? ` (${d.full})` : ''}, ${regimeMot} du ${epoqueMot}.`,
  ];
  
  // Caractéristiques anatomiques reconnaissables
  const puces = descPhysique(d);
  if (puces.length) {
    lignes.push(`CARACTÉRISTIQUES (à simplifier en silhouette) :`);
    puces.forEach(p => lignes.push(`- ${p}.`));
  } else if (MORPHO[id]) {
    lignes.push(`SILHOUETTE : ${MORPHO[id]}.`);
  }
  
  const sig = ficheSignature(d);
  if (sig) lignes.push(`DÉTAIL LE PLUS RECONNAISSABLE : ${sig}.`);
  
  const mg = mesuresGlobales(d);
  if (mg) lignes.push(`Taille : ${mg}.`);
  
  lignes.push(`CAMÉRA : plan moyen, dinosaure entier visible, bien centré, posture naturelle.`);
  lignes.push(STYLE_OMBRE);
  
  return lignes.join('\n');
}

for (const id of ids) {
  // Skip si déjà complété aujourd'hui
  if (batch.isCompleted(state, id)) {
    console.log(`\n========== ${id} — DÉJÀ FAIT (skip) ==========`);
    continue;
  }
  
  const d = getFields(id);
  const baseName = batch.sanitizeFileName(d.png);
  console.log(`\n========== ${id} (${d.name}) — OMBRE CHINOISE ==========`);
  
  logProgress(id, 'ombre', 'start');
  const prompt = buildOmbrePrompt(d, id);
  
  if (PREVIEW) {
    console.log(`\n--- [${baseName}_ombre.png] ---\n${prompt}`);
  } else {
    const result = gen(prompt, `${baseName}_ombre.png`, true);
    const outPath = OUTD + '/' + baseName + '_ombre.png';
    const success = checkSuccess(outPath, result);
    
    if (success) {
      batch.recordSuccess(state, id);
      logProgress(id, 'ombre', 'done');
      console.log(`---------- ${id} ombre terminée ----------`);
      
      // Vérifier quota avant pause
      if (state.countToday >= batch.dailyLimit) {
        console.log(`\n⛔ Quota atteint après ${id}. Arrêt.`);
        batch.save(state);
        process.exit(5);
      }
      
      batch.adaptivePause(state);
    } else {
      batch.recordFailure(state, id);
      logProgress(id, 'ombre', 'failed');
      console.log(`⚠️ Échec pour ${id}, sera retenté plus tard.`);
      batch.save(state);
      // Si c'est un rate limit (exit 5), le script gen() a déjà arrêté le process
      // Sinon on continue avec le suivant
    }
  }
}

batch.save(state);
console.log('\n✅ Batch ombre chinoise terminé pour:', ids.join(', '));
console.log(`   Progression : ${state.completedIds.length} dinos complétés, ${state.failedIds.length} échecs.`);
