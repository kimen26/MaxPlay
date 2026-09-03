// Porte de verification d'une traduction : structure, complétude, non-regression.
// Usage : node _check-traduction.cjs <lang>
// Ne juge PAS la qualite de langue (c'est le role du relecteur natif) — il juge que
// rien ne manque, que rien de neutre n'a bouge, et que les pieges mecaniques sont absents.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const lang = process.argv[2];
if (!lang) { console.error('usage: node _check-traduction.cjs <lang>'); process.exit(2); }

const corpus = JSON.parse(fs.readFileSync(path.join(ROOT, 'studio/dino/content/i18n/_corpus/corpus-fr.json'), 'utf8'));
const dir = path.join(ROOT, 'studio/dino/content/i18n', lang);
const f = path.join(dir, 'strings.json');
if (!fs.existsSync(f)) { console.error(`ABSENT: ${f}`); process.exit(1); }
const trad = JSON.parse(fs.readFileSync(f, 'utf8'));

const err = [], warn = [];
function scan(kind, ref, got) {
  Object.keys(ref).forEach(id => {
    if (!got[id]) { err.push(`${kind}/${id} : entree manquante`); return; }
    Object.keys(ref[id]).forEach(champ => {
      const src = ref[id][champ], dst = got[id][champ];
      if (dst === undefined) { err.push(`${kind}/${id}.${champ} : champ manquant`); return; }
      if (typeof dst !== 'string' || !dst.trim()) { err.push(`${kind}/${id}.${champ} : vide`); return; }
      if (dst === src && src.length > 25) warn.push(`${kind}/${id}.${champ} : identique au FR (non traduit ?)`);
      const eSrc = (src.match(/!/g) || []).length, eDst = (dst.match(/!/g) || []).length;
      if (eDst > eSrc) warn.push(`${kind}/${id}.${champ} : ${eDst} "!" contre ${eSrc} en FR (charte: ne pas en ajouter)`);
      // Les chiffres portent l'echelle : ils doivent survivre a la traduction.
      const nSrc = (src.match(/\d+/g) || []).join(','), nDst = (dst.match(/\d+/g) || []).join(',');
      if (nSrc !== nDst) warn.push(`${kind}/${id}.${champ} : chiffres FR [${nSrc}] vs [${nDst}]`);
    });
    Object.keys(got[id]).forEach(champ => {
      if (!ref[id][champ]) err.push(`${kind}/${id}.${champ} : champ INCONNU (hors corpus)`);
    });
  });
}
scan('dinos', corpus.dinos, trad.dinos || {});
scan('familles', corpus.familles, trad.familles || {});

// Mots francais laisses tels quels : signal fort de traduction incomplete.
const FR_MARQUEURS = /\b(dinosaure|lezard|griffes|plumes|aussi long que|il vivait|c'est|qui court)\b/i;
Object.entries(trad.dinos || {}).forEach(([id, d]) => Object.entries(d).forEach(([c, v]) => {
  if (lang !== 'fr' && FR_MARQUEURS.test(v)) warn.push(`dinos/${id}.${c} : mot francais residuel`);
}));

console.log(`--- check ${lang} ---`);
console.log(`dinos ${Object.keys(trad.dinos || {}).length}/${Object.keys(corpus.dinos).length} · familles ${Object.keys(trad.familles || {}).length}/${Object.keys(corpus.familles).length}`);
warn.slice(0, 40).forEach(w => console.log('  WARN ' + w));
if (warn.length > 40) console.log(`  ... +${warn.length - 40} warns`);
err.slice(0, 40).forEach(e => console.log('  ERR  ' + e));
if (err.length > 40) console.log(`  ... +${err.length - 40} erreurs`);
console.log(`${err.length} erreurs, ${warn.length} avertissements`);
process.exit(err.length ? 1 : 0);
