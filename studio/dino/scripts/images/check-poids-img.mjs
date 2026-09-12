#!/usr/bin/env node
// check-poids-img.mjs — refuse tout PNG/JPG > 300 Ko sous site/img/dinos/{sprites,paleoart}/
// (HO-R13, 2026-09-12). Règle : livrable image = webp ; un gros PNG/JPG qui entre dans ces
// dossiers est un oubli de conversion, pas un cas normal (cf.
// .claude/skills/dino-paleoart/SKILL.md § Règle de poids).
//
// Périmètre : sprites/ (140 PNG → webp) et paleoart/ (428 JPG → webp, complément HO-R13 —
// autorisation orchestrateur, champ png: des fiches canon mis à jour en conséquence).
// grok/, wiki/, _new-* restent hors périmètre (décision séparée, cf. brief HO-R13).
//
// Usage : node studio/dino/scripts/images/check-poids-img.mjs
import { readdirSync, statSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../../../..');
const DIRS = ['site/img/dinos/sprites', 'site/img/dinos/paleoart'].map(d => resolve(ROOT, d));
const LIMIT = 300 * 1024; // 300 Ko

function walk(dir, out = []) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (['.png', '.jpg', '.jpeg'].includes(extname(f.name).toLowerCase())) out.push(p);
  }
  return out;
}

const offenders = [];
for (const IMG_DIR of DIRS) {
  for (const f of walk(IMG_DIR)) {
    const size = statSync(f).size;
    if (size > LIMIT) offenders.push({ f: f.slice(ROOT.length + 1), size });
  }
}

if (offenders.length) {
  console.error(`✗ ${offenders.length} PNG/JPG > 300 Ko dans site/img/dinos/{sprites,paleoart}/ — convertir en webp (studio/dino/scripts/images/webp-convert.mjs) :`);
  for (const o of offenders) console.error(`   ${o.f} (${(o.size / 1024).toFixed(0)} Ko)`);
  process.exit(1);
}
console.log('✓ Aucun PNG/JPG > 300 Ko dans site/img/dinos/{sprites,paleoart}/.');
