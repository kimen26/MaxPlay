#!/usr/bin/env node
/**
 * validate-frontmatter.js — Valide la cohérence du frontmatter YAML des histoires
 * Usage : node scripts/validate-frontmatter.js docs/narration/stories/002-le-rire-qui-reste/README.md
 */

const fs = require('fs');
const path = require('path');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const lines = match[1].split('\n');
  const data = {};
  let current = data;
  const stack = [data];
  let lastIndent = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const indent = line.search(/\S/);

    while (stack.length > 0 && indent < lastIndent && stack.length > 1) {
      stack.pop();
      current = stack[stack.length - 1] || data;
    }
    lastIndent = indent;

    const keyMatch = trimmed.match(/^([\w-]+):\s*(.*)$/);
    if (keyMatch) {
      const [, key, val] = keyMatch;
      if (val === '') {
        current[key] = {};
        current = current[key];
        stack.push(current);
      } else if (val.startsWith('[') && val.endsWith(']')) {
        current[key] = val.slice(1, -1).split(',').map(s => s.trim()).filter(s => s.length > 0);
      } else {
        current[key] = val.replace(/^["'](.*)["']$/, '$1');
      }
    }
  }
  return data;
}

function validateStory(readmePath) {
  const content = fs.readFileSync(readmePath, 'utf8');
  const fm = parseFrontmatter(content);

  if (!fm) {
    return { ok: false, errors: ['Pas de frontmatter YAML trouvé'] };
  }

  const errors = [];
  const warnings = [];

  // Champs obligatoires
  const required = ['numero', 'slug', 'titre', 'statut'];
  for (const field of required) {
    if (!fm[field]) errors.push(`Champ obligatoire manquant : ${field}`);
  }

  // Statut valide
  const validStatuses = ['brouillon', 'canon', 'archive', 'v2-en-cours'];
  if (fm.statut && !validStatuses.includes(fm.statut)) {
    errors.push(`Statut invalide : "${fm.statut}" — attendu : ${validStatuses.join(', ')}`);
  }

  // Numéro cohérent avec dossier
  const dirName = path.basename(path.dirname(readmePath));
  const dirNum = dirName.split('-')[0];
  if (fm.numero && fm.numero !== dirNum) {
    errors.push(`Numéro incohérent : frontmatter="${fm.numero}" vs dossier="${dirNum}"`);
  }

  // Slug cohérent avec dossier
  const dirSlug = dirName.replace(/^\d+-/, '');
  if (fm.slug && fm.slug !== dirSlug) {
    errors.push(`Slug incohérent : frontmatter="${fm.slug}" vs dossier="${dirSlug}"`);
  }

  // Mots dans fourchette P2
  const mots = parseInt(fm.editorial?.mots, 10);
  if (mots) {
    if (mots < 400 || mots > 700) {
      warnings.push(`Mots hors fourchette P2 : ${mots} (attendu 400-700)`);
    }
  } else {
    warnings.push('Nombre de mots non renseigné dans editorial.mots');
  }

  // Ennéatype du héros
  const enneatype = fm.personnages?.enneatype_heros;
  if (enneatype) {
    const validTypes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'hors-systeme'];
    if (!validTypes.includes(enneatype)) {
      errors.push(`Ennéatype invalide : "${enneatype}" — attendu 1-9 ou hors-systeme`);
    }
    // Wex = hors-systeme
    const heros = fm.personnages?.heros;
    if (heros === 'Wex' && enneatype !== 'hors-systeme') {
      errors.push(`Wex est hors-système — ennéatype doit être "hors-systeme", pas "${enneatype}"`);
    }
  }

  // Personnages présents
  const liste = fm.personnages?.liste;
  if (!liste || liste.length === 0) {
    warnings.push('Aucun personnage listé');
  }

  return { ok: errors.length === 0, errors, warnings, fm };
}

function main() {
  const target = process.argv[2];

  if (!target) {
    // Validation globale
    const storiesDir = path.join(__dirname, '..', 'docs', 'narration', 'stories');
    const entries = fs.readdirSync(storiesDir, { withFileTypes: true });
    let totalErrors = 0;
    let totalWarnings = 0;

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('_')) continue;
      const readmePath = path.join(storiesDir, entry.name, 'README.md');
      if (!fs.existsSync(readmePath)) {
        console.log(`❌ ${entry.name} : README.md manquant`);
        totalErrors++;
        continue;
      }
      const result = validateStory(readmePath);
      const icon = result.ok ? '✅' : '❌';
      console.log(`${icon} ${entry.name}`);
      for (const e of result.errors) console.log(`   ❌ ${e}`);
      for (const w of result.warnings) console.log(`   ⚠️ ${w}`);
      totalErrors += result.errors.length;
      totalWarnings += result.warnings.length;
    }

    console.log(`\n---\nTotal : ${totalErrors} erreur(s), ${totalWarnings} warning(s)`);
    process.exit(totalErrors > 0 ? 1 : 0);
  } else {
    // Validation ciblée
    const result = validateStory(target);
    console.log(`# Validation frontmatter\n`);
    console.log(`Fichier : ${target}\n`);
    if (result.errors.length === 0 && result.warnings.length === 0) {
      console.log('✅ Frontmatter valide.');
      process.exit(0);
    } else {
      for (const e of result.errors) console.log(`❌ ${e}`);
      for (const w of result.warnings) console.log(`⚠️ ${w}`);
      process.exit(result.errors.length > 0 ? 1 : 0);
    }
  }
}

main();
