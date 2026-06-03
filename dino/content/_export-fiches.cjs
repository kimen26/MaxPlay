// Génère FICHES-CONTENU.md : contenu réel des 50 fiches dino (relecture Papa Yann)
const fs = require('fs');
let s = fs.readFileSync(__dirname + '/../../game/web/js/dinos-data.js', 'utf8');
eval(s.replace(/const /g, 'var '));

const per = id => (DINO_PERIODES.find(p => p.id === id) || {}).label || id || '';
const rgm = r => (r || '').replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, '').replace(/\(.*?\)/g, '').trim();

let out = '# Contenu des 50 fiches dino — relecture\n\n';
out += '_Généré depuis dinos-data.js. L = longueur, H = hauteur, P = poids._\n\n';

// Tableau compact
out += '## Vue d\'ensemble (lieu / taille / régime / prédateur)\n\n';
out += '| Dino | Région | Continent | Période | L / H / P | Régime | Chassé par |\n';
out += '|---|---|---|---|---|---|---|\n';
DINOS.forEach(d => {
  out += `| **${d.name}** | ${d.region||''} | ${d.continent||''} | ${per(d.periode)} | ${d.taille_m}m / ${d.hauteur_m}m / ${d.poids_t}t | ${rgm(d.regime)} | ${(d.chasseurs||'').replace(/\|/g,'/')} |\n`;
});

// Détail par dino
out += '\n---\n\n## Détail complet par dino\n\n';
DINOS.forEach(d => {
  out += `### ${d.name} — _${d.full}_\n`;
  if (d.alias) out += `- **Alias** : ${d.alias}\n`;
  out += `- **Famille** : ${d.famille} · **Régime** : ${rgm(d.regime)}\n`;
  out += `- **Époque** : ${d.epoque}\n`;
  out += `- **Lieu** : ${d.region} (${d.continent}) · **Période** : ${per(d.periode)}\n`;
  out += `- **Taille** : ${d.taille_m} m long · ${d.hauteur_m} m haut · ${d.poids_t} t\n`;
  out += `  - Long : ${d.comp_taille}\n`;
  out += `  - Haut : ${d.comp_hauteur}\n`;
  out += `  - Poids : ${d.comp_poids}\n`;
  out += `- **Nom veut dire** : ${d.nom_etym}\n`;
  out += `- **Super-pouvoir** : ${d.superpower}\n`;
  out += `- **Mange** : ${d.proies}\n`;
  out += `- **Chassé par** : ${d.chasseurs}\n`;
  out += `- **Vit** : ${d.amis}\n`;
  out += `- **Le sais-tu** : ${d.fait}\n`;
  out += `- **Description** : ${d.desc}\n\n`;
});

fs.writeFileSync(__dirname + '/FICHES-CONTENU.md', out, 'utf8');
console.log('OK ' + DINOS.length + ' fiches -> game/docs/jeux/dino-encyclopedie/FICHES-CONTENU.md (' + out.length + ' car)');
