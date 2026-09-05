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

  // Placeholders {cle} : memes cles des deux cotes (sinon MJi18n.t laisse {cle} visible a l'ecran).
  const phSrc = (src.match(/\{[a-zA-Z0-9_]+\}/g) || []).slice().sort().join(',');
  const phDst = (dst.match(/\{[a-zA-Z0-9_]+\}/g) || []).slice().sort().join(',');
  if (phSrc !== phDst) err.push(`${id}.${champ} : placeholders FR [${phSrc}] vs [${phDst}]`);
}

// Parcours recursif d'un sous-arbre "ui" : objets, tableaux (mj-24.phrase) et feuilles texte.
// Cle presente en FR mais absente en EN -> erreur (checkTexte gere deja le vide) ; cle presente
// en EN mais absente en FR -> avertissement (cle orpheline, jeu modifie sans regenerer le FR).
function checkUiTree(id, path, srcNode, dstNode) {
  if (srcNode == null) return;
  if (Array.isArray(srcNode)) {
    if (!Array.isArray(dstNode)) { err.push(`${id}.ui.${path} : tableau attendu, absent en ${lang}`); return; }
    if (dstNode.length !== srcNode.length) {
      err.push(`${id}.ui.${path} : ${dstNode.length} entrees contre ${srcNode.length} en FR`);
    }
    srcNode.forEach((v, i) => checkUiTree(id, `${path}[${i}]`, v, dstNode[i]));
    return;
  }
  if (typeof srcNode === 'object') {
    const dst = (dstNode && typeof dstNode === 'object') ? dstNode : {};
    Object.keys(srcNode).forEach(k => checkUiTree(id, path ? `${path}.${k}` : k, srcNode[k], dst[k]));
    return;
  }
  checkTexte(id, `ui.${path}`, srcNode, dstNode);
}

// _commun (HO-MJ-04) : chrome transverse du panneau regle (regle-info.js), pas un
// jeu — meme forme qu'un sous-arbre "ui" (objet plat cle -> texte), verifie a part.
// _commun.voix (HO-MJ-06) : phrases vocales partagees (slugs hors regle-mj-XX,
// site/js/textes-jeux.js) — sous-cle de _commun, deja couverte par le parcours
// recursif de checkUiTree (descend dans tout objet imbrique, "voix" y compris).
if (corpus._commun) {
  const gotCommun = trad._commun;
  if (!gotCommun) err.push('_commun : entree manquante');
  else checkUiTree('_commun', '', corpus._commun, gotCommun);
}

Object.keys(corpus).forEach(id => {
  if (id === '_commun') return;
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

  // Clés ui (HO-MJ-03) : optionnelles (tous les jeux n'en ont pas), mais quand le FR en a,
  // l'EN doit les couvrir a l'identique (memes cles, aucune vide, placeholders identiques).
  if (ref.ui) checkUiTree(id, '', ref.ui, got.ui || {});

  // Clé voix (HO-MJ-06) : consigne parlée regle-mj-XX (repli TTS du bouton « Écoute
  // toutes les règles », site/js/regle-info.js). Même sous-arbre plat que ui.
  if (ref.voix) checkUiTree(id, 'voix', ref.voix, got.voix || {});
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
