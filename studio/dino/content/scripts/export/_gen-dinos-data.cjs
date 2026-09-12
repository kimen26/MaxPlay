#!/usr/bin/env node
'use strict';
/**
 * HO-R12 — génère site/js/gen/dinos-data.js depuis studio/dino/content/dinos/*.json.
 *
 * Reconstruction par concaténation (préambule + filler+raw de chaque fiche, dans
 * l'ordre canonique `_ordre.json` + trailer). Garantit l'identité octet pour octet
 * avec l'ancien site/js/dinos-data.js au premier run : chaque fiche porte le texte
 * source exact (`_raw`) capturé par _split-dinos-data.cjs — aucune reformulation.
 *
 * Ordre des dinos : les fiches ne portent pas d'index de position (elles doivent
 * rester éditables indépendamment). L'ordre canonique du fichier généré vit dans
 * `_ordre.json` (liste des id dans l'ordre d'origine), écrit une fois par le split
 * et à respecter pour tout nouvel ajout (nouveau-dino ajoute son id à l'endroit
 * voulu dans cette liste).
 *
 * Usage : node studio/dino/content/scripts/export/_gen-dinos-data.cjs [--with-header]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../..');
const DINOS_DIR = path.join(ROOT, 'studio/dino/content/dinos');
const OUT = path.join(ROOT, 'site/js/gen/dinos-data.js');

const HEADER = '// GÉNÉRÉ par studio/dino/content/scripts/export/_gen-dinos-data.cjs — ne pas éditer à la main.\r\n// Source : studio/dino/content/dinos/*.json (une fiche canon par dino, D-009).\r\n';

function main() {
  const withHeader = process.argv.includes('--with-header');

  const preamble = JSON.parse(fs.readFileSync(path.join(DINOS_DIR, '_preamble.json'), 'utf8')).raw;
  const trailerDoc = JSON.parse(fs.readFileSync(path.join(DINOS_DIR, '_trailer.json'), 'utf8'));

  const ordreFile = path.join(DINOS_DIR, '_ordre.json');
  if (!fs.existsSync(ordreFile)) {
    throw new Error('_ordre.json manquant — lancer _split-dinos-data.cjs (one-shot) pour le créer');
  }
  const ordre = JSON.parse(fs.readFileSync(ordreFile, 'utf8')).ordre;

  const parts = [];
  for (const id of ordre) {
    const file = path.join(DINOS_DIR, `${id}.json`);
    const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
    parts.push(doc._filler);
    parts.push(doc._raw);
    parts.push(',');
  }
  // Chaque entrée garde sa virgule (le fichier d'origine termine la dernière
  // entrée par une virgule avant `];` : `},\r\n];`), jamais retirée ici.
  let body = parts.join('');
  body += trailerDoc.entryTrailingFiller;

  let out = preamble + 'const DINOS = [' + body + trailerDoc.raw;

  if (withHeader) out = HEADER + out;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`OK : ${OUT} écrit (${ordre.length} dinos, header=${withHeader})`);
}

main();
