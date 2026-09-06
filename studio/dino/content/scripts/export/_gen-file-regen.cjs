// Construit la file de régénération : 1 entrée = 1 image recalée + son bloc de prompt.
// Généré, jamais tenu à la main (DEC-GED-001).
const fs = require('fs'), path = require('path');
const BASE = path.join(__dirname, '../../sources/_audit-images-2026-09');
const PALEO = path.join(__dirname, '../../../../../site/img/dinos/paleoart');

const file = [];
const anomalies = [];

for (const f of fs.readdirSync(path.join(BASE, 'verdicts')).sort()) {
  const id = f.replace(/\.tsv$/, '');
  const recales = fs.readFileSync(path.join(BASE, 'verdicts', f), 'utf8')
    .split(/\r?\n/).filter(Boolean)
    .map(l => l.split('\t'))
    .filter(c => c[1] === 'RECALE')
    .map(c => ({ fichier: c[0], motif: c[2], desc: c[3] || '' }));
  if (!recales.length) continue;

  const pf = path.join(BASE, 'prompts', id + '.md');
  if (!fs.existsSync(pf)) { anomalies.push(`prompts manquants : ${id}`); continue; }
  const md = fs.readFileSync(pf, 'utf8');

  // Découpe par titre de niveau 2 = nom de fichier image
  const blocs = {};
  const parts = md.split(/^## /m).slice(1);
  for (const p of parts) {
    const nl = p.indexOf('\n');
    // Titres non normalisés selon les agents : backticks, suffixe " — motif".
    // On extrait le premier nom de fichier image de la ligne de titre.
    const brut = p.slice(0, nl);
    const m = brut.match(/([A-Za-z]+_?[A-Za-z-]*\.(?:jpg|webp|png))/);
    if (m) blocs[m[1]] = ('## ' + p).trim();
  }

  for (const r of recales) {
    const bloc = blocs[r.fichier];
    if (!bloc) { anomalies.push(`bloc absent : ${id} / ${r.fichier}`); continue; }
    if (!fs.existsSync(path.join(PALEO, r.fichier))) {
      anomalies.push(`image absente du disque : ${r.fichier}`);
    }
    file.push({ id, fichier: r.fichier, motif: r.motif, desc: r.desc, prompt: bloc });
  }
}

// Priorité : erreurs factuelles d'abord (MORPHO, IDENTITE), puis contenu, puis clones.
const rang = m => m.includes('MORPHO') || m.includes('IDENTITE') ? 0
              : m.includes('CONTENU') ? 1 : 2;
file.sort((a, b) => rang(a.motif) - rang(b.motif) || a.fichier.localeCompare(b.fichier));
file.forEach((e, i) => e.rang = i + 1);

fs.writeFileSync(path.join(BASE, '_FILE-REGEN.json'), JSON.stringify(file, null, 2));
console.log(`file : ${file.length} images`);
console.log('par priorité :',
  [0,1,2].map(r => `P${r}=${file.filter(e => rang(e.motif) === r).length}`).join(' '));
if (anomalies.length) { console.log('ANOMALIES :'); anomalies.forEach(a => console.log('  ' + a)); }
else console.log('aucune anomalie');
