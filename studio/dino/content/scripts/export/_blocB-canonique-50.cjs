// Fige le Bloc B (Taille) canonique des 50 dinos depuis dinos-data.js (source de vérité validée + fact-checkée Grokipedia).
// narration-pmo DOIT recopier ce texte verbatim pour le Narrateur du Bloc B. Interdit de réinventer les chiffres/comparaisons.
const fs = require('fs');
let s = fs.readFileSync(__dirname + '/../../../../../site/js/dinos-data.js', 'utf8');
eval(s.replace(/const /g, 'var '));

let out = '# BLOC B CANONIQUE — 50 dinos (source: dinos-data.js, NE PAS RÉINVENTER)\n\n';
out += '_Le Narrateur du Bloc B dit EXACTEMENT cette phrase (chiffres + comparaisons validés/fact-checkés). Wex réagit après, sans répéter les chiffres._\n\n';
DINOS.forEach(d => {
  out += `## ${d.name} (${d.id})\n`;
  out += `NARRATEUR Bloc B : « ${_statsPhrase(d)} »\n\n`;
});
fs.writeFileSync(__dirname + '/../../sources/mesures/_BLOC-B-CANONIQUE.md', out, 'utf8');
console.log('OK ' + DINOS.length + ' Bloc B figés -> _BLOC-B-CANONIQUE.md');
