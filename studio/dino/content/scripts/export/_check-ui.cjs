// Porte de verification du dictionnaire UI d'une langue.
// Usage : node _check-ui.cjs <lang>
// Verifie : completude vs le FR de dino-ui.js, variables {x} preservees,
// coherence des unites (une langue imperiale ne doit pas melanger metrique).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const lang = process.argv[2];
if (!lang) { console.error('usage: node _check-ui.cjs <lang>'); process.exit(2); }

// Le FR de reference vit dans le module produit : une seule source, pas de copie.
const src = fs.readFileSync(path.join(ROOT, 'site/js/dino-ui.js'), 'utf8');
const global_ = { window: {} };
global_.window.Lang = null;
new Function('window', src)(global_.window);
const FR = global_.window.DinoUI._fr;

const f = path.join(ROOT, 'studio/dino/content/i18n', lang, 'ui.json');
if (!fs.existsSync(f)) { console.error(`ABSENT: ${f}`); process.exit(1); }
const tr = JSON.parse(fs.readFileSync(f, 'utf8'));
delete tr._meta;

const err = [], warn = [];
const vars = s => (String(s).match(/\{\w+\}/g) || []).sort().join(',');

Object.keys(FR).forEach(cle => {
  if (!(cle in tr)) { err.push(`${cle} : MANQUANT`); return; }
  const v = tr[cle];
  if (typeof v !== 'string' || !v.trim()) { err.push(`${cle} : vide`); return; }
  if (vars(FR[cle]) !== vars(v))
    err.push(`${cle} : variables FR [${vars(FR[cle])}] vs [${vars(v)}]`);
  if (v === FR[cle] && FR[cle].length > 12)
    warn.push(`${cle} : identique au FR (non traduit ?)`);
});
Object.keys(tr).forEach(cle => {
  if (!(cle in FR)) err.push(`${cle} : cle INCONNUE (absente du FR)`);
});

// Coherence des unites : une langue qui dit "feet" ne doit plus parler de metres.
const imperial = tr.unite_metres === 'feet';
if (imperial) {
  ['stats_longueur', 'stats_envergure', 'stats_hauteur'].forEach(cle => {
    if (tr[cle] && /\bmeters?\b|\bmetres?\b/i.test(tr[cle]))
      err.push(`${cle} : melange imperial et metrique`);
  });
  if (tr.unite_kg && /\bkg\b/i.test(tr.unite_kg))
    err.push(`unite_kg : "kg" alors que la langue est imperiale`);
}

console.log(`--- check UI ${lang} ---`);
console.log(`${Object.keys(tr).length}/${Object.keys(FR).length} cles · ${imperial ? 'imperial' : 'metrique'}`);
warn.forEach(w => console.log('  WARN ' + w));
err.forEach(e => console.log('  ERR  ' + e));
console.log(`${err.length} erreurs, ${warn.length} avertissements`);
process.exit(err.length ? 1 : 0);
