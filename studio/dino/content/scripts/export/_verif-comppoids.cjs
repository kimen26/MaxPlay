// Vérif EP-DINO-PALIERS-COMPPOIDS : chaque dino doit tomber dans la plage honnête (±10 %) du repère utilisé.
// Usage : node studio/dino/content/scripts/export/_verif-comppoids.cjs   (depuis la racine du repo)
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '../../../../../site/js/dinos-data.js'), 'utf8');
// Expose DINOS + fonctions internes en évaluant le fichier dans une fonction.
const expose = src + '\n;module.exports = { DINOS, _compPoids };';
const m = { exports: {} };
new Function('module', 'exports', 'require', expose)(m, m.exports, require);
const { DINOS, _compPoids } = m.exports;

// Repères (t) — mot-clé de la phrase générée → poids implicite
const REPERES = [
  // Exceptions-additions (avant les motifs simples qui y sont contenus)
  [/petite voiture et une vache/, 1.65], [/hippopotame et un cheval/, 3.5], [/éléphant et un rhinocéros/, 7],
  [/(\d+) éléphants/, 5, true], [/un éléphant/, 5],
  [/(\d+) hippopotames/, 3, true], [/un hippopotame/, 3],
  [/(\d+) rhinocéros/, 2, true], [/un rhinocéros/, 2],
  [/(\d+) chevaux/, 0.5, true], [/un cheval/, 0.5],
  [/(\d+) ânes/, 0.16, true], [/un âne/, 0.16],
  [/(\d+) lions/, 0.2, true], [/un lion/, 0.2],
  [/une petite voiture/, 1], [/une vache/, 0.65],
  [/un tigre/, 0.25], [/un cochon/, 0.11],
  [/que Papa/, 0.08], [/un kangourou/, 0.07], [/un loup/, 0.05],
  [/enfant de 10 ans/, 0.035], [/un chien/, 0.025],
  [/un enfant de 4 ans/, 0.016], [/un gros chat/, 0.004],
];

let ok = 0, ko = 0, skip = 0;
const fails = [];
for (const d of DINOS) {
  if (d.poids_t == null) { skip++; continue; }
  const phrase = _compPoids(d.poids_t);
  if (/petit oiseau/.test(phrase)) { skip++; continue; }
  let implied = null;
  for (const [re, w, mult] of REPERES) {
    const hit = phrase.match(re);
    if (hit) { implied = mult ? Number(hit[1]) * w : w; break; }
  }
  if (implied == null) { fails.push(`${d.id}: PARSE "${phrase}"`); ko++; continue; }
  const ecart = Math.abs(d.poids_t - implied) / implied;
  if (ecart <= 0.101) ok++;
  else { fails.push(`${d.id}: ${d.poids_t} t vs "${phrase}" (implicite ${implied} t) = ${(ecart * 100).toFixed(1)} %`); ko++; }
}
console.log(`${ok} OK · ${ko} KO · ${skip} hors repère (oiseau/sans poids) · total ${DINOS.length}`);
if (fails.length) { console.log('--- KO ---'); fails.forEach(f => console.log(f)); process.exit(1); }
console.log('✅ 100 % des comparaisons dans la plage honnête (±10 %)');
