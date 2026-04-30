#!/usr/bin/env node
/**
 * new-story.js — Créer un nouveau dossier workshop pour une histoire
 * Usage : node scripts/new-story.js "titre-de-l-histoire"
 */

const fs = require('fs');
const path = require('path');

const WORKSHOP_DIR = path.join(__dirname, '..', 'docs', 'narration', 'workshop');
const GABARIT_DIR = path.join(WORKSHOP_DIR, '_gabarit');

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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

function main() {
  const title = process.argv[2];
  if (!title) {
    console.error('Usage: node scripts/new-story.js "titre-de-l-histoire"');
    process.exit(1);
  }

  const slug = slugify(title);
  const destDir = path.join(WORKSHOP_DIR, slug);

  if (fs.existsSync(destDir)) {
    console.error(`Erreur : ${destDir} existe déjà.`);
    process.exit(1);
  }

  copyDir(GABARIT_DIR, destDir);

  // Remplacer les placeholders dans pitch.md
  const pitchPath = path.join(destDir, 'pitch.md');
  let pitch = fs.readFileSync(pitchPath, 'utf8');
  pitch = pitch
    .replace(/\[Titre\]/g, title)
    .replace(/YYYY-MM-DD/g, new Date().toISOString().split('T')[0]);
  fs.writeFileSync(pitchPath, pitch);

  // Remplacer dans plan-histoire.md
  const planPath = path.join(destDir, 'plan-histoire.md');
  let plan = fs.readFileSync(planPath, 'utf8');
  plan = plan.replace(/\[Titre\]/g, title);
  fs.writeFileSync(planPath, plan);

  // Remplacer dans decision.md et gatekeeper-verdict.md
  const decisionPath = path.join(destDir, 'decision.md');
  let decision = fs.readFileSync(decisionPath, 'utf8');
  decision = decision.replace(/\[Titre\]/g, title);
  fs.writeFileSync(decisionPath, decision);

  const gkPath = path.join(destDir, 'gatekeeper-verdict.md');
  let gk = fs.readFileSync(gkPath, 'utf8');
  gk = gk.replace(/\[Titre\]/g, title);
  fs.writeFileSync(gkPath, gk);

  console.log(`✅ Workshop créé : workshop/${slug}/`);
  console.log(`   → Éditez ${destDir}/pitch.md pour l'idée`);
  console.log(`   → Éditez ${destDir}/plan-histoire.md pour le squelette`);
}

main();
