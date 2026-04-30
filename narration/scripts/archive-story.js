#!/usr/bin/env node
/**
 * archive-story.js — Promouvoir un workshop en canon
 * Usage : node narration/scripts/archive-story.js 002-le-rire-qui-reste
 */

const fs = require('fs');
const path = require('path');

const WORKSHOP_DIR = path.join(__dirname, '..', 'workshop');
const STORIES_DIR = path.join(__dirname, '..', 'stories');
const WORKSHOP_ARCHIVE_DIR = path.join(__dirname, '..', 'archive', 'workshop');

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
  const workshopName = process.argv[2];
  if (!workshopName) {
    console.error('Usage: node narration/scripts/archive-story.js 002-le-rire-qui-reste');
    process.exit(1);
  }

  const workshopDir = path.join(WORKSHOP_DIR, workshopName);
  if (!fs.existsSync(workshopDir)) {
    console.error(`Erreur : Workshop ${workshopDir} introuvable.`);
    process.exit(1);
  }

  // Accepter aussi l'ancien format WIP-NNN-slug pour compatibilité
  const cleanName = workshopName.replace(/^WIP-\d+-/, '');
  const slug = cleanName.replace(/^\d+-/, '');
  const num = getNextNumber();
  const storyDir = path.join(STORIES_DIR, `${num}-${slug}`);

  if (fs.existsSync(storyDir)) {
    console.error(`Erreur : ${storyDir} existe déjà.`);
    process.exit(1);
  }

  // Copier le workshop vers stories/
  copyDir(workshopDir, storyDir);

  // Archiver le workshop (déplacer)
  const archiveWipDir = path.join(WORKSHOP_ARCHIVE_DIR, `${new Date().toISOString().split('T')[0]}-${workshopName}`);
  fs.mkdirSync(path.dirname(archiveWipDir), { recursive: true });
  fs.renameSync(workshopDir, archiveWipDir);

  console.log(`✅ Canonisé : stories/${num}-${slug}/`);
  console.log(`   → Workshop archivé : ${archiveWipDir}`);
  console.log(`   → Pensez à :`);
  console.log(`     1. Éditer ${storyDir}/README.md (statut → canon, date_validation)`);
  console.log(`     2. Copier texte.md → archives/v1-YYYY-MM-DD.md`);
  console.log(`     3. Lancer node narration/scripts/generate-index.js`);
}

main();
