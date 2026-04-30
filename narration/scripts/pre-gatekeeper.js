#!/usr/bin/env node
/**
 * pre-gatekeeper.js — Vérification automatique des contraintes avant envoi au GateKeeper
 * Usage : node narration/scripts/pre-gatekeeper.js narration/workshop/003-la-confidence/rewrite.md
 */

const fs = require('fs');
const path = require('path');

function countWords(text) {
  // Nettoyer : enlever frontmatter, markdown, ponctuation
  const clean = text
    .replace(/^---\n[\s\S]*?\n---/, '')
    .replace(/[#*_\-\[\]\(\)]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function extractDialogues(text) {
  // Extraire les dialogues entre guillemets français ou anglais
  const matches = text.match(/["""']([^"""']+)["""']/g) || [];
  return matches.map(m => m.slice(1, -1).trim());
}

function loadCasting() {
  const lookupPath = path.join(__dirname, '..', 'personnages', 'lookup.yml');
  if (!fs.existsSync(lookupPath)) return [];
  const content = fs.readFileSync(lookupPath, 'utf8');
  const surnoms = [];
  const lines = content.split('\n');
  let inPrenomsSection = false;
  for (const line of lines) {
    if (line.trim().startsWith('prenoms_to_token:')) {
      inPrenomsSection = true;
      continue;
    }
    if (inPrenomsSection) {
      if (line.trim() === '' || line.trim().startsWith('#')) continue;
      // Fin de section si on revient au niveau racine (pas indenté)
      if (!line.startsWith(' ') && !line.startsWith('\t')) break;
      const match = line.match(/^\s+([\p{L}\p{M}'-]+):/u);
      if (match) {
        surnoms.push(match[1].trim());
      }
    }
  }
  return surnoms;
}

function checkExplicitMorale(text) {
  const patterns = [
    /il\s+comprit\s+que/i,
    /elle\s+comprit\s+que/i,
    /ce\s+jour-l[àa]/i,
    /depuis\s+ce\s+jour/i,
    /ils\s+comprirent\s+que/i,
    /elles\s+comprirent\s+que/i,
    /la\s+leçon\s+était/i,
    /moral\s*:/i,
  ];
  const found = [];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) found.push(m[0]);
  }
  return found;
}

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node narration/scripts/pre-gatekeeper.js <chemin/vers/rewrite.md>');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`Fichier introuvable : ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const textOnly = content.replace(/^---\n[\s\S]*?\n---/, '').trim();

  console.log('# Pré-validation GateKeeper\n');
  console.log(`Fichier : ${path.basename(filePath)}\n`);

  let errors = 0;
  let warnings = 0;

  // 1. Longueur
  const wordCount = countWords(textOnly);
  console.log(`## 1. Longueur`);
  console.log(`Mots comptés : ${wordCount}`);
  if (wordCount < 400) {
    console.log(`❌ ERREUR : ${wordCount} mots — minimum 400 mots pour P2`);
    errors++;
  } else if (wordCount > 700) {
    console.log(`❌ ERREUR : ${wordCount} mots — maximum 700 mots pour P2`);
    errors++;
  } else {
    console.log(`✅ OK : ${wordCount} mots (fourchette 400-700)`);
  }

  // 2. Prénoms / casting
  const casting = loadCasting();
  console.log(`\n## 2. Casting V1`);
  const foundNames = [];
  for (const name of casting) {
    const regex = new RegExp(`\\b${name}\\b`, 'i');
    if (regex.test(textOnly)) foundNames.push(name);
  }
  console.log(`Noms trouvés : ${foundNames.join(', ') || 'AUCUN'}`);
  if (foundNames.length === 0) {
    console.log(`⚠️ WARNING : Aucun prénom du casting V1 trouvé. Vérifier manuellement.`);
    warnings++;
  } else {
    console.log(`✅ OK : Au moins un nom du casting présent.`);
  }

  // 3. Dialogues
  const dialogues = extractDialogues(textOnly);
  console.log(`\n## 3. Dialogues`);
  console.log(`Répliques trouvées : ${dialogues.length}`);
  if (dialogues.length < 3) {
    console.log(`⚠️ WARNING : Seulement ${dialogues.length} répliques — objectif minimum 3`);
    warnings++;
  } else {
    console.log(`✅ OK : ${dialogues.length} répliques`);
  }

  // 4. Morale explicite
  const morales = checkExplicitMorale(textOnly);
  console.log(`\n## 4. Morale explicite`);
  if (morales.length > 0) {
    console.log(`❌ ERREUR : Morale explicite détectée !`);
    for (const m of morales) console.log(`   → "${m}"`);
    errors++;
  } else {
    console.log(`✅ OK : Aucune morale explicite détectée.`);
  }

  // 5. Kishōtenketsu (indicateur léger)
  console.log(`\n## 5. Kishōtenketsu (indicateur)`);
  const hasKi = textOnly.length > 100;
  const hasSho = dialogues.length > 0;
  const hasTen = /\b(mais|pourtant|alors|soudain|puis|et\s+puis|cependant)\b/i.test(textOnly);
  const hasKetsu = textOnly.toLowerCase().includes('fin');
  console.log(`Ki (exposition) : ${hasKi ? '✅' : '❌'}`);
  console.log(`Sho (développement) : ${hasSho ? '✅' : '❌'}`);
  console.log(`Ten (tournant) : ${hasTen ? '✅ (indicateur)' : '⚠️ (indicateur)'}`);
  console.log(`Ketsu (résolution) : ${hasKetsu ? '✅ (indicateur)' : '⚠️ (indicateur)'}`);
  console.log(`⚠️ NOTE : La validation Kishōtenketsu reste manuelle (GateKeeper).`);

  // Résumé
  console.log(`\n---\n`);
  console.log(`## Résumé`);
  console.log(`Erreurs : ${errors}`);
  console.log(`Warnings : ${warnings}`);
  if (errors === 0 && warnings === 0) {
    console.log(`\n🟢 PASS — Prêt pour le GateKeeper.`);
    process.exit(0);
  } else if (errors === 0) {
    console.log(`\n🟡 PASS avec warnings — Peut aller au GateKeeper, mais vérifier les warnings.`);
    process.exit(0);
  } else {
    console.log(`\n🔴 FAIL — Corriger les erreurs avant le GateKeeper.`);
    process.exit(1);
  }
}

main();
