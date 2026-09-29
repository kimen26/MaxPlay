#!/usr/bin/env node
/*
 * _gen-etat-dinos.cjs — OUTIL DE SUIVI GÉNÉRÉ (EP-D-GED-01, DEC-GED-001 §5)
 *
 * R04 (vague 3 process militaire) : un code, deux vues. Ce script n'est plus qu'un
 * appel à `check-dino-coherence.cjs --md`, qui porte désormais TOUS les axes de la
 * DoD dino (avant : 8 axes ici, aveugles au câblage dinos-ui.js — exactement le trou
 * qui a laissé passer le Scélidosaure). Garde son fichier de sortie historique.
 *
 *   node studio/dino/content/scripts/export/_gen-etat-dinos.cjs
 *
 * JAMAIS tenu à la main (décision figée). « Où en sont les dinos ? » → on régénère.
 */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..'); // → repo root
const OUT = path.resolve(__dirname, '..', '..', '..', 'memory', '_ETAT-DINOS.md');
const CHECK = path.join(__dirname, 'check-dino-coherence.cjs');

const md = execFileSync('node', [CHECK, '--md'], { cwd: ROOT, encoding: 'utf8' });
fs.writeFileSync(OUT, md);
console.log(`_ETAT-DINOS écrit : ${OUT}`);
