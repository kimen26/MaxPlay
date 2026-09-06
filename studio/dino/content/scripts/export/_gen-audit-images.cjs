#!/usr/bin/env node
// Consolide les verdicts d'audit images paleoart en un tableau de bord.
// Usage : node studio/dino/content/scripts/export/_gen-audit-images.cjs
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const BASE = path.join(ROOT, 'studio/dino/content/sources/_audit-images-2026-09');
const VERD = path.join(BASE, 'verdicts');
const MOTIFS = ['MORPHO','IDENTITE','CLONE','ENVIRONNEMENT','CONTENU','TECHNIQUE'];

if (!fs.existsSync(VERD)) { console.error('Pas de dossier verdicts : ' + VERD); process.exit(1); }

const fiches = JSON.parse(fs.readFileSync(path.join(BASE, '_dinos-base.json'), 'utf8'));
const attendu = new Map(fiches.filter(f => f.images.length).map(f => [f.id, f.images.length]));

const parLot = [];
let vues = 0, ok = 0, recale = 0;
const parMotif = Object.fromEntries(MOTIFS.map(m => [m, 0]));
const recales = [];

for (const f of fs.readdirSync(VERD).filter(x => x.endsWith('.tsv')).sort()) {
  const id = f.replace(/\.tsv$/, '');
  const lignes = fs.readFileSync(path.join(VERD, f), 'utf8')
    .split(/\r?\n/).filter(l => l.trim());
  let o = 0, r = 0;
  for (const l of lignes) {
    const [fichier, verdict, motif, desc] = l.split('\t');
    vues++;
    if (verdict === 'RECALE') {
      r++; recale++;
      const m = (motif || '').trim().toUpperCase();
      if (parMotif[m] !== undefined) parMotif[m]++;
      recales.push({ id, fichier, motif: m, desc: (desc || '').trim() });
    } else { o++; ok++; }
  }
  parLot.push({ id, lignes: lignes.length, attendu: attendu.get(id) ?? '?', ok: o, recale: r });
}

const manquants = [...attendu.keys()].filter(id => !parLot.some(p => p.id === id));

const L = [];
L.push('# Tableau de bord — audit images paléoart (GÉNÉRÉ, ne pas éditer à la main)');
L.push('');
L.push('> Régénérer : `node studio/dino/content/scripts/export/_gen-audit-images.cjs`');
L.push('> Source : `sources/_audit-images-2026-09/verdicts/*.tsv` (écrits par les agents d\'audit).');
L.push('');
L.push('## Synthèse');
L.push('');
L.push('- **' + parLot.length + ' sujets audités** · **' + vues + ' images vues** · **' + ok + ' OK** · **' + recale + ' RECALE**');
L.push('');
L.push('| Motif | Images recalées |');
L.push('|---|---|');
for (const m of MOTIFS) L.push('| ' + m + ' | ' + parMotif[m] + ' |');
L.push('');
if (manquants.length) {
  L.push('## ⚠️ Sujets sans verdict (audit à relancer)');
  L.push('');
  for (const id of manquants) L.push('- `' + id + '`');
  L.push('');
}
const incomplets = parLot.filter(p => p.attendu !== '?' && p.lignes !== p.attendu);
if (incomplets.length) {
  L.push('## ⚠️ Verdicts incomplets (lignes ≠ images sur disque)');
  L.push('');
  L.push('| Sujet | Lignes | Images attendues |');
  L.push('|---|---|---|');
  for (const p of incomplets) L.push('| `' + p.id + '` | ' + p.lignes + ' | ' + p.attendu + ' |');
  L.push('');
}
L.push('## Images à régénérer');
L.push('');
L.push('| Sujet | Fichier | Motif | Ce qu\'on voit |');
L.push('|---|---|---|---|');
for (const r of recales) {
  L.push('| `' + r.id + '` | `' + r.fichier + '` | ' + r.motif + ' | ' + r.desc.replace(/\|/g, '/') + ' |');
}
L.push('');
L.push('## Détail par sujet');
L.push('');
L.push('| Sujet | Vues | OK | RECALE |');
L.push('|---|---|---|---|');
for (const p of parLot) L.push('| `' + p.id + '` | ' + p.lignes + ' | ' + p.ok + ' | ' + p.recale + ' |');
L.push('');
L.push('_Généré le run — relancer le script pour rafraîchir._');

fs.writeFileSync(path.join(BASE, '_TABLEAU-DE-BORD.md'), L.join('\n') + '\n', 'utf8');
console.log('sujets:', parLot.length, '| vues:', vues, '| OK:', ok, '| RECALE:', recale);
console.log('motifs:', JSON.stringify(parMotif));
if (manquants.length) console.log('SANS VERDICT:', manquants.join(' '));
if (incomplets.length) console.log('INCOMPLETS:', incomplets.map(p => p.id + '(' + p.lignes + '/' + p.attendu + ')').join(' '));
