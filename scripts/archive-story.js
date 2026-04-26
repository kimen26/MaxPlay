#!/usr/bin/env node
/**
 * archive-story.js — Promouvoir un workshop en canon
 * Usage : node scripts/archive-story.js WIP-002-parapluie-oublie
 */

const fs = require('fs');
const path = require('path');

const WORKSHOP_DIR = path.join(__dirname, '..', 'docs', 'narration', 'workshop');
const STORIES_DIR = path.join(__dirname, '..', 'docs', 'narration', 'stories');
const ARCHIVE_DIR = path.join(__dirname, '..', 'docs', 'narration', 'editorial-board', 'archive');

function getNextNumber() {
  const entries = fs.readdirSync(STORIES_DIR, { withFileTypes: true });
  const numbers = entries
    .filter(e => e.isDirectory() && /^\d{3}-/.test(e.name))
    .map(e => parseInt(e.name.split('-')[0], 10));
  const max = numbers.length > 0 ? Math.max(...numbers) : 0;
  return String(max + 1).padStart(3, '0');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const wipName = process.argv[2];
  if (!wipName) {
    console.error('Usage: node scripts/archive-story.js WIP-002-parapluie-oublie');
    process.exit(1);
  }

  const wipDir = path.join(WORKSHOP_DIR, wipName);
  if (!fs.existsSync(wipDir)) {
    console.error(`Erreur : Workshop ${wipDir} introuvable.`);
    process.exit(1);
  }

  // Extraire le slug (après WIP-NNN-)
  const slug = wipName.replace(/^WIP-\d+-/, '');
  const num = getNextNumber();
  const storyDir = path.join(STORIES_DIR, `${num}-${slug}`);

  if (fs.existsSync(storyDir)) {
    console.error(`Erreur : ${storyDir} existe déjà.`);
    process.exit(1);
  }

  // Copier le workshop vers stories/
  copyDir(wipDir, storyDir);

  // Déplacer le workshop vers archive/
  const archiveWipDir = path.join(ARCHIVE_DIR, `${new Date().toISOString().split('T')[0]}-${wipName}`);
  fs.mkdirSync(path.dirname(archiveWipDir), { recursive: true });
  fs.renameSync(wipDir, archiveWipDir);

  console.log(`✅ Canonisé : stories/${num}-${slug}/`);
  console.log(`   → Workshop archivé : ${archiveWipDir}`);
  console.log(`   → Pensez à :`);
  console.log(`     1. Éditer ${storyDir}/README.md (statut → canon, date_validation)`);
  console.log(`     2. Copier texte.md → archives/v1-YYYY-MM-DD.md`);
  console.log(`     3. Lancer node scripts/generate-index.js`);
}

main();
