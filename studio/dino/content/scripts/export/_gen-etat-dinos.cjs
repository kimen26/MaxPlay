#!/usr/bin/env node
/*
 * _gen-etat-dinos.cjs — OUTIL DE SUIVI GÉNÉRÉ (EP-D-GED-01, DEC-GED-001 §5)
 *
 * Lecture seule : lit site/js/dinos-data.js + sonde le disque sur les 8 axes de la
 * checklist « dino complet », écrit studio/dino/pmo/_ETAT-DINOS.md (synthèse en tête,
 * « le plus incomplet d'abord », section orphelins/staging).
 *
 *   node studio/dino/content/scripts/export/_gen-etat-dinos.cjs
 *
 * JAMAIS tenu à la main (décision figée). « Où en sont les dinos ? » → on régénère.
 * Casse : images = champ `png:` (Majuscule, ex Tyrannosaurus.jpg) · audio = `id` (minuscule).
 * Créé 2026-07-15.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..'); // → repo root (site/, studio/)
const SITE = path.join(ROOT, 'site');
const DATA = path.join(SITE, 'js', 'dinos-data.js');
const OUT = path.resolve(__dirname, '..', '..', '..', 'pmo', '_ETAT-DINOS.md');

const has = (p) => fs.existsSync(p);
const paleoart = (f) => path.join(SITE, 'img', 'dinos', 'paleoart', f);
const ombre = (f) => path.join(SITE, 'img', 'dinos', 'ombres', f);
const audio = (f) => path.join(SITE, 'audio', 'dinos', 'fr', f);

// ── parse le tableau DINOS (regex, sans exécuter le JS navigateur) ──────────────
const src = fs.readFileSync(DATA, 'utf8');
const start = src.indexOf('const DINOS = [');
if (start < 0) { console.error('DINOS introuvable dans dinos-data.js'); process.exit(2); }
const slice = src.slice(start, src.indexOf('\n];', start));

const field = (block, name) => {
  const m = block.match(new RegExp(`${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`)) ||
            block.match(new RegExp(`${name}:\\s*([0-9.]+)`));
  return m ? m[1] : null;
};

// découpe en entrées par `id:` de premier niveau
const idPositions = [...slice.matchAll(/\n\s{4}id:\s*'([^']+)'/g)];
const dinos = idPositions.map((m, i) => {
  const from = m.index;
  const to = i + 1 < idPositions.length ? idPositions[i + 1].index : slice.length;
  const block = slice.slice(from, to);
  const id = m[1];
  const png = field(block, 'png');            // ex 'Tyrannosaurus.jpg'
  const base = png ? png.replace(/\.jpg$/i, '') : id.charAt(0).toUpperCase() + id.slice(1);
  return {
    id, base,
    name: field(block, 'name') || id,
    nom_etym: !!field(block, 'nom_etym'),
    taille: !!field(block, 'taille_m'),
    fiche: !!(field(block, 'desc') && field(block, 'fait')),
  };
});

// ── 8 axes de complétude ────────────────────────────────────────────────────────
const SCENES = ['headshot', 'manger', 'paris', 'ecosysteme', 'funfact'];
const SEGMENTS = ['nom', 'taille', 'regime', 'funfact', 'recap'];

const rows = dinos.map((d) => {
  const scenes = SCENES.filter((s) => has(paleoart(`${d.base}_${s}.jpg`)));
  const segs = SEGMENTS.filter((s) => has(audio(`${d.id}-${s}.mp3`)));
  const axes = {
    hero: has(paleoart(`${d.base}.jpg`)),
    paleoart: scenes.length === SCENES.length,
    coloriage: has(paleoart(`${d.base}_coloriage.webp`)),
    audio: segs.length === SEGMENTS.length,
    silhouette: has(ombre(`${d.base}_ombre.png`)),
    fiche: d.fiche,
    etymo: d.nom_etym,
    mesures: d.taille,
  };
  const done = Object.values(axes).filter(Boolean).length;
  const missing = [];
  if (!axes.hero) missing.push('hero');
  if (!axes.paleoart) missing.push(`paléoart(${SCENES.filter(s => !scenes.includes(s)).join('/') || '?'})`);
  if (!axes.coloriage) missing.push('coloriage');
  if (!axes.audio) missing.push(`audio(${SEGMENTS.filter(s => !segs.includes(s)).join('/') || '?'})`);
  if (!axes.silhouette) missing.push('silhouette');
  if (!axes.fiche) missing.push('fiche');
  if (!axes.etymo) missing.push('étymo');
  if (!axes.mesures) missing.push('mesures');
  return { ...d, axes, done, missing };
});

// ── orphelins : assets paléoart/ombre sans dino correspondant ────────────────────
const bases = new Set(dinos.map((d) => d.base));
const paleoartDir = path.join(SITE, 'img', 'dinos', 'paleoart');
const orphanImgs = has(paleoartDir)
  ? fs.readdirSync(paleoartDir)
      .filter((f) => /\.(jpg|webp)$/i.test(f))
      .map((f) => f.replace(/(_headshot|_manger|_paris|_ecosysteme|_funfact|_coloriage)?\.(jpg|webp)$/i, ''))
      .filter((b, i, a) => a.indexOf(b) === i)
      .filter((b) => !bases.has(b))
  : [];

// ── rendu ────────────────────────────────────────────────────────────────────────
const N = rows.length;
const AXES = ['hero', 'paleoart', 'coloriage', 'audio', 'silhouette', 'fiche', 'etymo', 'mesures'];
const complete = rows.filter((r) => r.done === 8);
const incomplete = rows.filter((r) => r.done < 8).sort((a, b) => a.done - b.done);
const tally = Object.fromEntries(AXES.map((a) => [a, rows.filter((r) => r.axes[a]).length]));

const bar = (n) => `${n}/${N}`;
let md = `# _ETAT-DINOS — suivi de complétude (GÉNÉRÉ, ne pas éditer à la main)\n\n`;
md += `> Régénérer : \`node studio/dino/content/scripts/export/_gen-etat-dinos.cjs\`\n`;
md += `> Source : \`site/js/dinos-data.js\` + sonde disque. Outil DEC-GED-001 §5 (EP-D-GED-01).\n`;
md += `> ⚠️ Chiffres ci-dessous = **générés**, ils ne violent pas « zéro chiffre en dur » (ce fichier EST le tracker).\n\n`;
md += `## Synthèse\n\n`;
md += `- **${N} dinos** · **${complete.length} complets (8/8)** · **${incomplete.length} incomplets**\n\n`;
md += `| Axe | Couverture |\n|-----|-----------|\n`;
for (const a of AXES) md += `| ${a} | ${bar(tally[a])} |\n`;
md += `\n## Incomplets d'abord\n\n`;
if (!incomplete.length) {
  md += `_Aucun — les ${N} dinos sont complets sur les 8 axes. 🎉_\n`;
} else {
  md += `| Dino | id | Score | Manque |\n|------|----|-------|--------|\n`;
  for (const r of incomplete) md += `| ${r.name} | \`${r.id}\` | ${r.done}/8 | ${r.missing.join(', ')} |\n`;
}
md += `\n## Complets (${complete.length})\n\n`;
md += complete.map((r) => r.name).join(' · ') + '\n';
md += `\n## Orphelins / staging\n\n`;
md += orphanImgs.length
  ? `Images paléoart sans dino dans DINOS : ${orphanImgs.join(', ')}\n`
  : `_Aucun asset paléoart orphelin._\n`;
md += `\n---\n_Généré le run — relancer le script pour rafraîchir._\n`;

fs.writeFileSync(OUT, md, 'utf8');
console.log(`_ETAT-DINOS écrit : ${OUT}`);
console.log(`${N} dinos · ${complete.length} complets · ${incomplete.length} incomplets`);
if (incomplete.length) console.log('incomplets:', incomplete.map((r) => `${r.id}(${r.done}/8)`).join(', '));
