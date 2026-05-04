#!/usr/bin/env node
/**
 * new-story.js — Créer un nouveau dossier d'histoire à partir du gabarit unifié.
 * Usage : node narration/scripts/new-story.js NNN "titre-de-l-histoire"
 *
 * Crée stories/<NNN-slug>/ depuis stories/_gabarit/ (réécrit 2026-04-30, format unifié post-suppression workshop/).
 */

const fs = require('fs');
const path = require('path');

const STORIES_DIR = path.join(__dirname, '..', 'stories');
const GABARIT_DIR = path.join(STORIES_DIR, '_gabarit');

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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

function replacePlaceholders(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [pattern, value] of Object.entries(replacements)) {
    content = content.split(pattern).join(value);
  }
  fs.writeFileSync(filePath, content);
}

function main() {
  const numero = process.argv[2];
  const title = process.argv[3];

  if (!numero || !title) {
    console.error('Usage: node narration/scripts/new-story.js NNN "titre-de-l-histoire"');
    console.error('Exemple: node narration/scripts/new-story.js 007 "La pierre tiède"');
    process.exit(1);
  }

  if (!/^\d{3}$/.test(numero)) {
    console.error(`Erreur : le numéro doit être 3 chiffres (ex: 007). Reçu : ${numero}`);
    process.exit(1);
  }

  const slug = slugify(title);
  const folderName = `${numero}-${slug}`;
  const destDir = path.join(STORIES_DIR, folderName);

  if (fs.existsSync(destDir)) {
    console.error(`Erreur : ${destDir} existe déjà.`);
    process.exit(1);
  }

  copyDir(GABARIT_DIR, destDir);

  const today = new Date().toISOString().split('T')[0];
  const replacements = {
    'NNN': numero,
    'slug-de-l-histoire': slug,
    'Titre de l\'histoire': title,
    '<slug>': folderName,
    'STORY-NNN': `STORY-${numero}`,
    'YYYY-MM-DD': today,
  };

  // Appliquer placeholders sur tous les .md du nouveau dossier
  function walkAndReplace(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkAndReplace(entryPath);
      } else if (entry.name.endsWith('.md')) {
        replacePlaceholders(entryPath, replacements);
      }
    }
  }

  walkAndReplace(destDir);

  console.log(`✅ Histoire créée : stories/${folderName}/`);
  console.log(`   → Éditez ${destDir}/pitch.md pour le pitch (étape 1)`);
  console.log(`   → Mettez à jour ${destDir}/kanban.md au fil des étapes`);
  console.log(`   → Workflow complet : narration/equipe/PROCESS.md`);
}

main();
