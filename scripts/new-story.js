#!/usr/bin/env node
/**
 * new-story.js — Créer un nouveau module histoire depuis le gabarit
 * Usage : node scripts/new-story.js "titre-de-l-histoire"
 */

const fs = require('fs');
const path = require('path');

const STORIES_DIR = path.join(__dirname, '..', 'docs', 'narration', 'stories');
const GABARIT_DIR = path.join(STORIES_DIR, '_gabarit');

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

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
  const title = process.argv[2];
  if (!title) {
    console.error('Usage: node scripts/new-story.js "titre-de-l-histoire"');
    process.exit(1);
  }

  const slug = slugify(title);
  const num = getNextNumber();
  const dirName = `${num}-${slug}`;
  const destDir = path.join(STORIES_DIR, dirName);

  if (fs.existsSync(destDir)) {
    console.error(`Erreur : ${destDir} existe déjà.`);
    process.exit(1);
  }

  copyDir(GABARIT_DIR, destDir);

  // Remplacer les placeholders dans README.md
  const readmePath = path.join(destDir, 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf8');
  readme = readme
    .replace(/NNN/g, num)
    .replace(/slug-de-l-histoire/g, slug)
    .replace(/Titre de l'histoire/g, title)
    .replace(/YYYY-MM-DD/g, new Date().toISOString().split('T')[0]);
  fs.writeFileSync(readmePath, readme);

  // Remplacer dans orchestration.md
  const orchPath = path.join(destDir, 'orchestration.md');
  let orch = fs.readFileSync(orchPath, 'utf8');
  orch = orch.replace(/Titre de l'histoire/g, title);
  fs.writeFileSync(orchPath, orch);

  console.log(`✅ Module créé : stories/${dirName}/`);
  console.log(`   → Éditez ${destDir}/orchestration.md pour le brief`);
  console.log(`   → Éditez ${destDir}/texte.md pour le texte`);
}

main();
