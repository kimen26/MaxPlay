#!/usr/bin/env node
'use strict';
/**
 * HO-R12 — one-shot : découpe site/js/dinos-data.js en fiches canon JSON.
 *
 * Une fiche = studio/dino/content/dinos/<id>.json avec :
 *   - les champs "faits" (taille_m, hauteur_m, poids_t, vitesse_kmh, textes...)
 *   - `_raw` : le texte source EXACT de l'entrée JS (entre `{` et `},`), pour que
 *     _gen-dinos-data.cjs puisse reconstruire dinos-data.js OCTET POUR OCTET.
 *   - `_filler` : les lignes de commentaires/séparateurs qui précèdent l'entrée
 *     dans le fichier original (titres de section "══ 1. LES CHASSEURS ══" etc.),
 *     pour que le générateur les réémette au même endroit.
 *
 * Pourquoi `_raw` plutôt qu'un ré-écrivain JS générique : le fichier source est
 * formaté à la main (guillemets simples, largeurs d'alignement variables, gras
 * décoratif). Reconstruire ça avec un pretty-printer générique est fragile et
 * invérifiable ligne à ligne. Le texte source verbatim garantit l'identité
 * octet pour octet dès le premier run. Les champs structurés (hors _raw) sont
 * la vraie source pour tout script qui a besoin de lire une valeur (état des
 * dinos, contrôle de cohérence) : eux lisent le JSON, jamais une regex sur du JS.
 *
 * Usage : node studio/dino/content/scripts/export/_split-dinos-data.cjs
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..');
const SRC = path.join(ROOT, 'site', 'js', 'dinos-data.js');
const OUT_DIR = path.join(ROOT, 'studio', 'dino', 'content', 'dinos');

function extractField(raw, key) {
  const strRe = new RegExp(`\\b${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
  const strReDq = new RegExp(`\\b${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's');
  const numRe = new RegExp(`\\b${key}:\\s*(-?\\d+(?:\\.\\d+)?)`);
  const boolRe = new RegExp(`\\b${key}:\\s*(true|false)\\b`);
  let m = raw.match(strRe);
  if (m) return m[1].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  m = raw.match(strReDq);
  if (m) return m[1].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  m = raw.match(numRe);
  if (m) return Number(m[1]);
  m = raw.match(boolRe);
  if (m) return m[1] === 'true';
  return undefined;
}

const KNOWN_FIELDS = [
  'id', 'name', 'full', 'famille', 'cat', 'epoque', 'region',
  'taille_m', 'hauteur_m', 'poids_t', 'vitesse_kmh', 'taille_vol',
  'nom_etym', 'regime', 'superpower', 'chasseurs', 'proies', 'amis',
  'fait', 'desc', 'png', 'color', 'continent', 'periode',
];

function splitTopLevelEntries(block) {
  const entries = [];
  let depth = 0;
  let i = 0;
  let fillerStart = 0;
  let inString = false;
  let stringChar = '';
  let escaped = false;

  while (i < block.length) {
    const ch = block[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === stringChar) inString = false;
      i++;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inString = true; stringChar = ch; i++; continue; }
    if (ch === '{' && depth === 0) {
      const filler = block.slice(fillerStart, i);
      const entryStart = i;
      let d = 0, j = i, inStr2 = false, strCh2 = '', esc2 = false;
      for (; j < block.length; j++) {
        const c = block[j];
        if (inStr2) {
          if (esc2) esc2 = false;
          else if (c === '\\') esc2 = true;
          else if (c === strCh2) inStr2 = false;
          continue;
        }
        if (c === "'" || c === '"' || c === '`') { inStr2 = true; strCh2 = c; continue; }
        if (c === '{') d++;
        else if (c === '}') { d--; if (d === 0) break; }
      }
      const entryEnd = j + 1;
      entries.push({ filler, raw: block.slice(entryStart, entryEnd) });
      i = entryEnd;
      if (block[i] === ',') i++;
      fillerStart = i;
      continue;
    }
    i++;
  }
  return { entries, trailingFiller: block.slice(fillerStart) };
}

function main() {
  const src = fs.readFileSync(SRC, 'utf8');

  const startMarker = 'const DINOS = [';
  const startIdx = src.indexOf(startMarker);
  if (startIdx === -1) throw new Error('const DINOS = [ introuvable');
  const blockStart = startIdx + startMarker.length;
  const endIdx = src.lastIndexOf('\r\n];');
  if (endIdx === -1) throw new Error('fin de DINOS introuvable');
  const block = src.slice(blockStart, endIdx);

  const { entries, trailingFiller } = splitTopLevelEntries(block);

  const dinos = [];
  for (const { filler, raw } of entries) {
    const fields = {};
    for (const key of KNOWN_FIELDS) {
      const v = extractField(raw, key);
      if (v !== undefined) fields[key] = v;
    }
    if (!fields.id) throw new Error('Entrée sans id, filler=' + JSON.stringify(filler.slice(-80)));
    dinos.push({ id: fields.id, fields, filler, raw });
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const d of dinos) {
    const doc = { id: d.id, ...d.fields, _filler: d.filler, _raw: d.raw };
    fs.writeFileSync(path.join(OUT_DIR, `${d.id}.json`), JSON.stringify(doc, null, 2) + '\n', 'utf8');
  }

  fs.writeFileSync(
    path.join(OUT_DIR, '_ordre.json'),
    JSON.stringify({ generatedBy: '_split-dinos-data.cjs', ordre: dinos.map(d => d.id) }, null, 2) + '\n',
    'utf8'
  );

  const preamble = src.slice(0, startIdx);
  fs.writeFileSync(path.join(OUT_DIR, '_preamble.json'), JSON.stringify({ raw: preamble }, null, 2) + '\n', 'utf8');

  const trailer = src.slice(endIdx);
  fs.writeFileSync(
    path.join(OUT_DIR, '_trailer.json'),
    JSON.stringify({ raw: trailer, entryTrailingFiller: trailingFiller }, null, 2) + '\n',
    'utf8'
  );

  const parFamille = {};
  for (const d of dinos) {
    const fam = d.fields.famille || '_sans_famille';
    (parFamille[fam] = parFamille[fam] || []).push(d.id);
  }
  fs.writeFileSync(
    path.join(OUT_DIR, '_familles.json'),
    JSON.stringify({ generatedBy: '_split-dinos-data.cjs', parFamille }, null, 2) + '\n',
    'utf8'
  );

  const schema = {
    generatedBy: '_split-dinos-data.cjs (one-shot) — édité à la main ensuite',
    source_unique: 'studio/dino/content/dinos/<id>.json — dinos-data.js est GÉNÉRÉ, ne jamais éditer à la main',
    langue_canon: "FR inline dans chaque champ texte. i18n = overlay qui traduit le texte FR, ne duplique jamais un chiffre : taille_m/hauteur_m/poids_t/vitesse_kmh sont universels, seule la mise en phrase change par langue.",
    fields: {
      id: { type: 'string', desc: 'clé latine minuscule, unique, jamais renommée (norme assets 2026-07-27)' },
      name: { type: 'string', desc: 'nom affiché court (FR)' },
      full: { type: 'string', desc: 'nom scientifique complet' },
      famille: { type: 'string', desc: "clé vers DINO_FAMILLES (préambule), ex 'trex'" },
      cat: { type: 'string enum', desc: 'carnivores | herbivores | piscivores | omnivores' },
      epoque: { type: 'string', desc: "texte affiché, ex \"Crétacé · il y a 66 millions d'ans\"" },
      region: { type: 'string', desc: 'texte région (peut être composite)' },
      taille_m: { type: 'number', unit: 'mètres', desc: 'longueur nez-queue (ou envergure si taille_vol=true)' },
      hauteur_m: { type: 'number', unit: 'mètres', desc: 'hauteur debout, optionnel' },
      poids_t: { type: 'number', unit: 'tonnes' },
      vitesse_kmh: { type: 'number', unit: 'km/h', desc: 'optionnel, jamais inventée (audit HO-009)' },
      taille_vol: { type: 'boolean', desc: 'true si taille_m = envergure (ptérosaures)' },
      nom_etym: { type: 'string', desc: 'étymologie grecque/latine, lue à voix haute' },
      regime: { type: 'string', desc: 'emoji + libellé régime' },
      superpower: { type: 'string' },
      chasseurs: { type: 'string' },
      proies: { type: 'string' },
      amis: { type: 'string' },
      fait: { type: 'string', desc: 'anecdote' },
      desc: { type: 'string', desc: 'description longue' },
      png: { type: 'string', desc: 'nom de fichier asset, clé = id capitalisé (norme assets)' },
      color: { type: 'string', desc: 'hex' },
      continent: { type: 'string' },
      periode: { type: 'string', desc: 'clé vers DINO_PERIODES' },
      _filler: { type: 'string', desc: "texte source (commentaires/séparateurs) précédant l'entrée dans dinos-data.js — réémis tel quel par le générateur" },
      _raw: { type: 'string', desc: "texte source JS exact de l'entrée — vraie source pour la régénération octet-pour-octet" },
    },
    comp_fields_derives_pas_stockes: [
      'comp_taille = _compLong(taille_m)', 'comp_hauteur = _compHaut(hauteur_m)',
      'comp_poids = _compPoids(poids_t)',
      "Restent des APPELS DE FONCTION dans le JS généré (fonctions du préambule), jamais des chaînes figées.",
    ],
  };
  fs.writeFileSync(path.join(OUT_DIR, '_schema.json'), JSON.stringify(schema, null, 2) + '\n', 'utf8');

  console.log(`OK : ${dinos.length} fiches écrites dans ${OUT_DIR}`);
}

main();
