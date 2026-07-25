#!/usr/bin/env node
// Générateur site/lecture-data.js à partir de studio/narration/stories/.
// Lecture SEULE des dossiers stories — n'écrit jamais dedans.
// Anonymat : le champ `source` est conservé dans les données (export brut) mais
// l'UI (lecture.html) ne doit JAMAIS l'afficher — règle gravée depuis la v1.
//
// Usage : node studio/narration/scripts/gen-lecture-data.mjs
//   → régénère site/lecture-data.js

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..'); // repo root
const STORIES_DIR = join(ROOT, 'studio', 'narration', 'stories');
const OUT_FILE = join(ROOT, 'site', 'lecture-data.js');

const MAX_VERSIONS = 10;
const MIN_VERSIONS_TOP = 5;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stripFrontmatter(raw) {
  // Supprime un bloc YAML --- ... --- en tête de fichier.
  const m = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return m ? raw.slice(m[0].length) : raw;
}

function cleanText(raw) {
  let t = stripFrontmatter(raw);
  // Retire les sections "Notes d'intention" / "note d'intention" en fin de fichier
  // (défaut de FORME documenté dans plusieurs synthèses lecteurs : pollue la lecture).
  t = t.split(/\n#{1,3}\s*Notes? d['’]intention/i)[0];
  t = t.split(/\n---\s*\n#{1,3}\s*Note/i)[0];
  return t.trim();
}

function toParagraphs(text) {
  return text
    .split(/\r?\n\r?\n+/)
    .map((p) => p.replace(/\r?\n/g, ' ').trim())
    .filter((p) => p.length > 0)
    // Ignore les lignes de titre isolées type "# Le Pont Cassé" ou "**Fin.**" vides de contenu
    .filter((p) => !/^#{1,3}\s/.test(p));
}

function readVersionFile(path) {
  const raw = readFileSync(path, 'utf8');
  return cleanText(raw);
}

function isRealCanon(path) {
  if (!existsSync(path)) return false;
  const raw = readFileSync(path, 'utf8');
  const body = stripFrontmatter(raw).trim();
  // Le gabarit vide contient "Le texte narratif complet va ici" — on l'exclut.
  if (body.length < 200) return false;
  if (/le texte narratif complet va ici/i.test(body)) return false;
  return true;
}

// Parse le tableau "## 1. TOP N CONSOLIDÉ" d'un fichier 5-synthese-lecteurs.md
// et retourne la liste ordonnée des slugs de version (colonne "Version"),
// dans l'ordre du classement (meilleur en premier).
function parseTopVersions(synthesePath) {
  if (!existsSync(synthesePath)) return [];
  const raw = readFileSync(synthesePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const startIdx = lines.findIndex((l) => /^##\s*1\./.test(l));
  if (startIdx === -1) return [];
  const out = [];
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    if (i > startIdx && /^##\s/.test(line)) break; // section suivante
    if (!line.trim().startsWith('|')) continue;
    const cells = line.split('|').map((c) => c.trim());
    // cells[0] = '', cells[1] = rang, cells[2] = Version, ...
    if (cells.length < 3) continue;
    const rangCell = cells[1];
    const versionCell = cells[2];
    if (!versionCell) continue;
    if (/^-+$/.test(rangCell) || /^rang/i.test(rangCell)) continue; // header/separator
    if (/^version$/i.test(versionCell)) continue;
    // Nettoie le markdown gras/emoji autour du nom de version
    const slug = versionCell.replace(/[*🥇🥈🥉]/g, '').trim();
    if (!slug || / /.test(slug) === false && slug.length < 2) continue;
    if (slug) out.push(slug);
  }
  return out;
}

function titleFromReadme(storyDir) {
  const readmePath = join(storyDir, 'README.md');
  if (!existsSync(readmePath)) return null;
  const raw = readFileSync(readmePath, 'utf8');
  const m = raw.match(/^#\s+(.+)$/m);
  if (!m) return null;
  // Certains README suffixent le titre avec un statut ("— Canon (date)") : on le retire.
  return m[1].split(/\s+—\s+/)[0].trim();
}

// ---------------------------------------------------------------------------
// Construction par histoire
// ---------------------------------------------------------------------------

function buildStory(dirName) {
  const storyDir = join(STORIES_DIR, dirName);
  const numMatch = dirName.match(/^(\d{3})-(.+)$/);
  if (!numMatch) return null;
  const numero = parseInt(numMatch[1], 10);
  const titre = titleFromReadme(storyDir) || numMatch[2].replace(/-/g, ' ');

  const writersDir = join(storyDir, '4-versions-writers');
  const writerFiles = existsSync(writersDir)
    ? readdirSync(writersDir).filter((f) => f.endsWith('.md') && statSync(join(writersDir, f)).isFile())
    : [];
  const writerSlugs = writerFiles.map((f) => f.replace(/\.md$/, ''));

  const synthesePath = join(storyDir, '5-synthese-lecteurs.md');
  const rankedSlugs = parseTopVersions(synthesePath).filter((s) => writerSlugs.includes(s));

  // Sélection : top classement (5 à 10) sinon toutes les versions writers disponibles.
  let selectedSlugs;
  if (rankedSlugs.length >= MIN_VERSIONS_TOP) {
    selectedSlugs = rankedSlugs.slice(0, MAX_VERSIONS);
  } else {
    selectedSlugs = writerSlugs.slice(0, MAX_VERSIONS);
  }

  const versions = [];
  let vNum = 1;

  // Canon FR résolu si disponible (variantes-culturelles/fr/texte.md) ou 10-texte.md direct.
  const frCanon = join(storyDir, 'variantes-culturelles', 'fr', 'texte.md');
  const directCanon = join(storyDir, '10-texte.md');
  let canonPath = null;
  if (isRealCanon(frCanon)) canonPath = frCanon;
  else if (isRealCanon(directCanon)) canonPath = directCanon;

  if (canonPath) {
    const texte = readVersionFile(canonPath);
    const paragraphes = toParagraphs(texte);
    if (paragraphes.length) {
      versions.push({
        id: `${numMatch[1]}-canon`,
        source: 'canon',
        titre: `Version canon`,
        canon: true,
        texte: paragraphes.join('\n\n'),
      });
    }
  }

  // Rewrite (étape 7) si présent — vaut d'être relu comme version distincte.
  const rewriteDir = join(storyDir, '7-rewrite');
  if (existsSync(rewriteDir)) {
    const rewriteFiles = readdirSync(rewriteDir).filter(
      (f) => f.endsWith('.md') && !f.startsWith('_') && statSync(join(rewriteDir, f)).isFile()
    );
    for (const rf of rewriteFiles) {
      const texte = readVersionFile(join(rewriteDir, rf));
      const paragraphes = toParagraphs(texte);
      if (!paragraphes.length) continue;
      versions.push({
        id: `${numMatch[1]}-rewrite-${rf.replace(/\.md$/, '')}`,
        source: rf.replace(/\.md$/, ''),
        titre: `Version rewrite`,
        canon: false,
        texte: paragraphes.join('\n\n'),
      });
    }
  }

  for (const slug of selectedSlugs) {
    const path = join(writersDir, `${slug}.md`);
    if (!existsSync(path)) continue;
    const texte = readVersionFile(path);
    const paragraphes = toParagraphs(texte);
    if (!paragraphes.length) continue;
    versions.push({
      id: `${numMatch[1]}-v${vNum}`,
      source: slug,
      titre: `Version ${vNum}`,
      canon: false,
      texte: paragraphes.join('\n\n'),
    });
    vNum++;
  }

  if (!versions.length) return null;

  return {
    story: dirName,
    numero,
    titre,
    versions,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const entries = readdirSync(STORIES_DIR).filter((d) => {
    if (!/^\d{3}-/.test(d)) return false;
    return statSync(join(STORIES_DIR, d)).isDirectory();
  });
  entries.sort();

  const histoires = [];
  for (const dirName of entries) {
    const story = buildStory(dirName);
    if (story) histoires.push(story);
  }
  histoires.sort((a, b) => a.numero - b.numero);

  // Chips inchangées (v3 validées — cf. ancien lecture-data.js)
  const chips = {
    positif: [
      ['lecture fluide', 'belle musique / poésie', 'bon vocabulaire', 'bonne longueur'],
      ['image forte', 'super description', 'super métaphore'],
      ['drôle / amusant', 'tendre / émotions', "super rappel d'idée", 'génial ⭐'],
    ],
    negatif: [
      ['enchaînement inexistant', 'trop long', 'trop court', 'ça sonne faux'],
      ['description inutile', 'description confuse', 'mauvaise métaphore'],
      ['incompréhensible', 'je ne comprends pas qui est qui', 'pas logique / incohérent'],
    ],
  };

  const data = {
    domaine: 'narration',
    genere: new Date().toISOString().slice(0, 10),
    histoires,
    chips,
  };

  const header = `// Lecture annotée — corpus généré automatiquement par
// studio/narration/scripts/gen-lecture-data.mjs (NE PAS ÉDITER À LA MAIN).
// Source : studio/narration/stories/<NNN-slug>/ — 5-synthese-lecteurs.md (top 5-10
// classement panel si présent, sinon toutes les versions writers) + 7-rewrite/ +
// canon (variantes-culturelles/fr/texte.md ou 10-texte.md) quand ils existent.
// ANONYMAT (règle gravée) : le champ 'source' est conservé dans les données pour
// l'export/traçabilité mais l'UI (lecture.html) ne doit JAMAIS l'afficher.
// Régénérer : node studio/narration/scripts/gen-lecture-data.mjs
`;

  const out = `${header}window.LECTURE_DATA = ${JSON.stringify(data, null, 1)};\n`;
  writeFileSync(OUT_FILE, out, 'utf8');

  console.log(`OK — ${histoires.length} histoires écrites dans ${OUT_FILE}`);
  for (const h of histoires) {
    console.log(`  ${String(h.numero).padStart(3, '0')} — ${h.titre} : ${h.versions.length} version(s)`);
  }
}

main();
