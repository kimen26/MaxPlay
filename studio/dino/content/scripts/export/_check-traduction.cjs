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

// Unites imperiales (cible EN) et metriques (source FR).
const IMPERIAL = /\b(inch|inches|foot|feet|mph|pound|pounds|yard|yards|mile|miles)\b/i;
const METRIQUE_SRC = /\b(cm|m|km\/h|kg|t|metre|metres|mètre|mètres)\b/i;
// Metrique residuel dans une cible anglaise : l'enfant US n'a aucun referentiel.
const METRIQUE_RESIDUEL = /\d+\s*(cm|km\/h|kg)\b/i;
// "4×4" est un nom de vehicule, pas une mesure : ses chiffres ne portent pas d'echelle.
const VEHICULE_4X4 = /4\s*[×x]\s*4/i;

const err = [], warn = [];
function scan(kind, ref, got) {
  Object.keys(ref).forEach(id => {
    if (!got[id]) { err.push(`${kind}/${id} : entree manquante`); return; }
    Object.keys(ref[id]).forEach(champ => {
      const src = ref[id][champ], dst = got[id][champ];
      if (dst === undefined) { err.push(`${kind}/${id}.${champ} : champ manquant`); return; }
      // Un champ vide en FR (ex. `continent` d'un animal marin) doit rester vide dans la langue cible.
      if (typeof src === 'string' && !src.trim()) { if (typeof dst === 'string' && dst.trim()) warn.push(`${kind}/${id}.${champ} : FR vide mais traduction non vide`); return; }
      if (typeof dst !== 'string' || !dst.trim()) { err.push(`${kind}/${id}.${champ} : vide`); return; }

      // Un binome latin (`full`) est identique dans toutes les langues : c'est normal.
      if (dst === src && src.length > 25 && champ !== 'full')
        warn.push(`${kind}/${id}.${champ} : identique au FR (non traduit ?)`);

      const eSrc = (src.match(/!/g) || []).length, eDst = (dst.match(/!/g) || []).length;
      if (eDst > eSrc) warn.push(`${kind}/${id}.${champ} : ${eDst} "!" contre ${eSrc} en FR (charte: ne pas en ajouter)`);

      // Les chiffres portent l'echelle : ils doivent survivre a la traduction.
      // Deux exceptions legitimes, ou l'ordre de grandeur est conserve :
      //  - conversion metrique -> imperial en anglais (charte, section "Unites de mesure") ;
      //  - "4x4", nom de vehicule dont les chiffres ne mesurent rien.
      const conversion = IMPERIAL.test(dst) && METRIQUE_SRC.test(src);
      const vehicule = VEHICULE_4X4.test(src);
      const nSrc = (src.match(/\d+/g) || []).join(','), nDst = (dst.match(/\d+/g) || []).join(',');
      // Un separateur de milliers ("1 000" -> "1,000") n'est pas un changement de valeur.
      const normalise = s => s.replace(/[\s,.](?=\d{3}\b)/g, '');
      if (normalise(nSrc) !== normalise(nDst) && !conversion && !vehicule)
        warn.push(`${kind}/${id}.${champ} : chiffres FR [${nSrc}] vs [${nDst}]`);

      // Une decimale dans une conversion trahit le calcul et casse l'oral (charte).
      if (conversion && /\d+\.\d/.test(dst))
        warn.push(`${kind}/${id}.${champ} : conversion non arrondie (${dst.match(/\d+\.\d+/)[0]}) — arrondir`);

      if (lang === 'en' && METRIQUE_RESIDUEL.test(dst))
        warn.push(`${kind}/${id}.${champ} : metrique non converti en EN (${dst.match(METRIQUE_RESIDUEL)[0]})`);
    });
    Object.keys(got[id]).forEach(champ => {
      // Un champ absent du corpus mais vide (ex. `continent` marin, que l'extracteur ne retient pas) n'est pas une erreur.

      if ((typeof got[id][champ] !== 'string' || got[id][champ].trim()) && !ref[id][champ]) err.push(`${kind}/${id}.${champ} : champ INCONNU (hors corpus)`);
    });
  });
}
scan('dinos', corpus.dinos, trad.dinos || {});
scan('familles', corpus.familles, trad.familles || {});
if (corpus.plantes) scan('plantes', corpus.plantes, trad.plantes || {});
if (corpus.racines) scan('racines', corpus.racines, trad.racines || {});
if (corpus.periodes) scan('periodes', corpus.periodes, trad.periodes || {});
if (corpus.categories) scan('categories', corpus.categories, trad.categories || {});
if (corpus.eres) scan('eres', corpus.eres, trad.eres || {});

// Pangee et Extinction : objets UNIQUES (pas des collections id -> fiche), donc pas
// passes a scan() (qui attend {id: {champ: valeur}}). On les adapte a la meme forme :
// une seule "entree" nommee d'apres la zone, ses sous-listes deja indexees par periode/id.
function scanUnique(kind, ref, got) {
  if (!ref) return;
  scan(kind, { [kind]: ref }, { [kind]: got || {} });
}
if (corpus.pangee) {
  const { etapes: refEtapes, ...refRest } = corpus.pangee;
  const gotPangee = trad.pangee || {};
  const { etapes: gotEtapes, ...gotRest } = gotPangee;
  scanUnique('pangee', refRest, gotRest);
  if (refEtapes) scan('pangee.etapes', refEtapes, gotEtapes || {});
}
if (corpus.extinction) {
  const { hypotheses: refHyp, ...refRest } = corpus.extinction;
  const gotExtinction = trad.extinction || {};
  const { hypotheses: gotHyp, ...gotRest } = gotExtinction;
  scanUnique('extinction', refRest, gotRest);
  if (refHyp) scan('extinction.hypotheses', refHyp, gotHyp || {});
}

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
