// _check-mj-traduction.cjs — porte de verification d'une traduction du panneau regle MJ.
// Miroir de studio/dino/content/scripts/export/_check-traduction.cjs, adapte au corpus
// panneau regle (studio/minijeux/i18n/fr/strings.json, genere par _extract-mj-regles.mjs).
// Ne juge PAS la qualite de langue (role du relecteur natif) : verifie la structure,
// la completude, et les pieges mecaniques listes dans le brief HO-MJ-02.
// Usage : node studio/minijeux/tools/_check-mj-traduction.cjs <lang>
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../..');
const lang = process.argv[2];
if (!lang) { console.error('usage: node _check-mj-traduction.cjs <lang>'); process.exit(2); }

const corpusPath = path.join(ROOT, 'studio/minijeux/i18n/fr/strings.json');
if (!fs.existsSync(corpusPath)) { console.error(`ABSENT: ${corpusPath} (lancer _extract-mj-regles.mjs d'abord)`); process.exit(1); }
const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'));

const f = path.join(ROOT, 'studio/minijeux/i18n', lang, 'strings.json');
if (!fs.existsSync(f)) { console.error(`ABSENT: ${f}`); process.exit(1); }
const trad = JSON.parse(fs.readFileSync(f, 'utf8'));

// Unites imperiales (cible EN) et metriques (source FR) — charte dino reprise telle quelle.
const IMPERIAL = /\b(inch|inches|foot|feet|mph|pound|pounds|yard|yards|mile|miles)\b/i;
const METRIQUE_SRC = /\b(cm|m|km\/h|kg|t|metre|metres|mètre|mètres)\b/i;
const METRIQUE_RESIDUEL = /\d+\s*(cm|km\/h|kg)\b/i;

// Mots FR residuels : signal fort de traduction incomplete/oubliee.
const FR_MARQUEURS = /\b(le|la|les|des|une|dans|avec|pour|tape|regarde|trouve|compte|je\s)\b/i;

const err = [], warn = [];

function checkTexte(id, champ, src, dst) {
  if (typeof src === 'string' && !src.trim()) return; // FR vide -> pas de contrainte
  if (typeof dst !== 'string' || !dst.trim()) { err.push(`${id}.${champ} : vide`); return; }

  if (dst === src && src.length > 15) warn.push(`${id}.${champ} : identique au FR (non traduit ?)`);

  const eSrc = (src.match(/!/g) || []).length, eDst = (dst.match(/!/g) || []).length;
  if (eDst > eSrc) warn.push(`${id}.${champ} : ${eDst} "!" contre ${eSrc} en FR (charte : ne pas en ajouter)`);

  // Chiffres : doivent survivre, sauf conversion metrique->imperial (charte dino, EN).
  const conversion = IMPERIAL.test(dst) && METRIQUE_SRC.test(src);
  const nSrc = (src.match(/\d+/g) || []).join(',');
  const nDst = (dst.match(/\d+/g) || []).join(',');
  if (nSrc !== nDst && !conversion) warn.push(`${id}.${champ} : chiffres FR [${nSrc}] vs [${nDst}]`);

  if (conversion && /\d+\.\d/.test(dst)) warn.push(`${id}.${champ} : conversion non arrondie (${dst.match(/\d+\.\d+/)[0]}) — arrondir`);

  if (lang === 'en' && METRIQUE_RESIDUEL.test(dst)) warn.push(`${id}.${champ} : metrique non converti en EN (${dst.match(METRIQUE_RESIDUEL)[0]})`);
}

Object.keys(corpus).forEach(id => {
  const ref = corpus[id];
  const got = trad[id];
  if (!got) { err.push(`${id} : entree manquante`); return; }

  checkTexte(id, 'titre', ref.titre || '', got.titre || '');
  checkTexte(id, 'regle.texte', ref.regle.texte || '', (got.regle && got.regle.texte) || '');

  const refEtapes = ref.regle.etapes || [];
  const gotEtapes = (got.regle && got.regle.etapes) || [];
  if (gotEtapes.length !== refEtapes.length) {
    err.push(`${id}.regle.etapes : ${gotEtapes.length} etapes contre ${refEtapes.length} en FR (nombre doit etre identique)`);
  } else {
    refEtapes.forEach((e, i) => {
      checkTexte(id, `regle.etapes[${i}].t`, e.t || '', (gotEtapes[i] && gotEtapes[i].t) || '');
      checkTexte(id, `regle.etapes[${i}].d`, e.d || '', (gotEtapes[i] && gotEtapes[i].d) || '');
    });
  }
  if (ref.regle.etoiles) checkTexte(id, 'regle.etoiles', ref.regle.etoiles, (got.regle && got.regle.etoiles) || '');
});

// Cle inconnue (hors corpus) : signal d'un jeu retire/renomme depuis la derniere extraction.
Object.keys(trad).forEach(id => { if (!corpus[id]) warn.push(`${id} : cle INCONNUE (hors corpus FR — jeu retire/renomme ?)`); });

// Mots FR residuels : sur le champ texte le plus long (titre trop court -> faux positifs frequents).
Object.entries(trad).forEach(([id, d]) => {
  if (lang === 'fr') return;
  const t = (d.regle && d.regle.texte) || '';
  if (t && FR_MARQUEURS.test(t)) warn.push(`${id}.regle.texte : mot francais residuel probable`);
});

console.log(`--- check mj ${lang} ---`);
console.log(`jeux ${Object.keys(trad).length}/${Object.keys(corpus).length}`);
warn.slice(0, 60).forEach(w => console.log('  WARN ' + w));
if (warn.length > 60) console.log(`  ... +${warn.length - 60} warns`);
err.slice(0, 60).forEach(e => console.log('  ERR  ' + e));
if (err.length > 60) console.log(`  ... +${err.length - 60} erreurs`);
console.log(`${err.length} erreurs, ${warn.length} avertissements`);
process.exit(err.length ? 1 : 0);
