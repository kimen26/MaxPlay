#!/usr/bin/env node
// Porte de vérification des Scripts audio dino (1 fichier .md par dino, format 4 blocs A/B/C/D).
// Usage : node studio/dino/content/scripts/export/_verif-scripts-audio.cjs [lang] [id ...]
//   lang par défaut : fr   ·   sans id : tous les <id>.md du dossier scripts-audio/<lang>/V3 (fr) ou scripts-audio/<lang> (autres)
// Vérifie (erreurs = exit 1) :
//   - en-tête « ## NOM — Latin » dont le 1er mot latin (minuscule) = id présent dans dinos-data.js
//   - 4 blocs « ### BLOC A|B|C|D », répliques « **NARRATEUR H** [tags] : … » / « **WEX** [tags] : … »
//   - FR : bloc B contient les 3 chiffres data ET la sortie EXACTE de _compLong/_compHaut/_compPoids (le « ! » final peut devenir « . »)
//   - greps interdits : max/doudou/peluche/nounours · regarde · bus hors bloc B · références adultes (Elvis, Ferrari, Jurassic Park, vroum)
//   - tags : uniquement ceux de la liste autorisée ; ≤ 2 tags collés en début de réplique ; jamais 2 tags adjacents au milieu ; jamais un tag en toute fin
//   - Wex : aucun « ! »
//   - budget caractères : ≤ 1900 par fiche (tags inclus) — pour tenir en un appel dialogue Lunii
//   - [R02, EP-D23, ferme L-D-84] bloc A dit CHAQUE racine de `racines.json` (son sens, normalisation NFD sans
//     accents/tirets/casse, table SENS_ALT pour les synonymes admis) ET nomme sa langue (grec|latin) ; id absent
//     de racines.json = ERREUR. Interdit dans une réplique : sang/tortur/agoni, et « Wex » prononcé (le
//     libellé machine « **WEX** » en tête de ligne ne compte pas).
//   - [R22, ferme L-D-85] la ligne « > Fact-check » d'un en-tête V3 ne peut pas dire CONFIRMÉ/confirmé sans
//     URL (« 404 » n'est jamais une confirmation) ; pour une espèce listée dans `_ESPECES-A-SOSIE.md`, elle
//     doit en plus citer un numéro de spécimen.
//   Les KO déjà présents le jour où ces deux règles sont branchées vivent dans LEGACY_ETYMO / LEGACY_FACTCHECK
//   (avertissement, jamais erreur) — à vider par EP-D22, n'y ajoute jamais un id neuf.
// Avertissements (n'arrêtent pas) : CAPS sur mot < 4 lettres · réplique Narrateur sans tag · « -sau-rus » syllabé latin · bloc > 700 car.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../..');
const argv = process.argv.slice(2);
const ETYMO_REPORT = argv.includes('--etymo-report');
const dirIdx = argv.indexOf('--dir');
const DIR_OVERRIDE = dirIdx !== -1 ? argv[dirIdx + 1] : null;
const rest = argv.filter((a, i) => a !== '--etymo-report' && (dirIdx === -1 || (i !== dirIdx && i !== dirIdx + 1)));
const [langArg, ...idsArg] = rest;
const LANG = langArg || 'fr';
const DIR = DIR_OVERRIDE
  ? path.resolve(DIR_OVERRIDE)
  : LANG === 'fr'
    ? path.join(ROOT, 'studio/dino/content/scripts-audio/fr/V3')
    : path.join(ROOT, 'studio/dino/content/scripts-audio', LANG);

// --- R02 : racines.json (généré par _etymo2racines.cjs — LECTURE seule) -----------------------
// Format réel : { racines: [{ cle, langue: 'grec'|'latin'|null, sens, type: 'racine'|'nom_propre', dinos: [id...] }] }
// On l'inverse en dino -> racines[] une fois au chargement.
let RACINES_BY_DINO = {};
try {
  const racinesJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'studio/dino/content/data/racines.json'), 'utf8'));
  for (const rac of racinesJson.racines || []) {
    for (const id of rac.dinos || []) (RACINES_BY_DINO[id] = RACINES_BY_DINO[id] || []).push(rac);
  }
} catch (e) { /* racines.json absent : R02 désactivé silencieusement, les autres checks tournent */ }

// Synonymes admis pour le « sens » d'une racine — le bloc A peut employer n'importe lequel de la liste
// au lieu du mot exact de racines.json (ex. « lézard » peut sortir en « reptile » ou « saure »).
// Clé = sens exact tel qu'il apparaît dans racines.json (comparé après normalisation NFD).
const SENS_ALT = {
  'lézard': ['lézard', 'reptile', 'saure'],
  'plaque de métal fine, tôle': ['plaque de métal fine', 'plaque de métal', 'tôle', 'plaque'],
};

const norm2 = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[-\s]+/g, ' ').trim();
const LANG_RE = /\b(grec\w*|latin\w*)\b/i;

// --- R22 : espèces à sosie (numéro de spécimen exigé dans la ligne Fact-check) ------------------
let ESPECES_A_SOSIE = new Set();
try {
  const txt = fs.readFileSync(path.join(ROOT, 'studio/dino/content/sources/_ESPECES-A-SOSIE.md'), 'utf8');
  for (const m of txt.matchAll(/^-\s+\*\*([a-z0-9_]+)\*\*/gm)) ESPECES_A_SOSIE.add(m[1]);
} catch (e) { /* fichier absent : cette portion de R22 est simplement vide */ }
const SPECIMEN_RE = /\b[A-Z]{1,5}\s?F?\d{3,}\b/;
const URL_RE = /https?:\/\/\S+/i;

// KO déjà présents le jour du branchement de ces deux règles (avertissement, jamais erreur — à vider par
// EP-D22, n'ajoute jamais un id neuf ici : un id neuf en KO est une vraie erreur, pas un legacy).
// Vidé EP-D22 (2026-09-29) : les 17 ids historiques (racines.json complété pour centrosaurus/
// pentaceratops/torosaurus + 14 blocs A réécrits nommant grec/latin explicitement) passent tous
// --etymo-report sans avertissement. Set gardé vide, prêt à recevoir un futur id neuf en régression.
const LEGACY_ETYMO = new Set([]);
const LEGACY_FACTCHECK = new Set([
  // Vidé 2026-10-08 (HO-T03) : les 27 lignes « CONFIRMÉ sans URL » sont toutes sourcées (15 le 2026-10-01,
  // 12 le 2026-10-08). Set gardé vide, prêt à recevoir un futur id neuf en régression (n'y ajoute jamais un id neuf).
]);

// Catalogue AUTORISÉ (✅ testés MaxPlay + tags officiels EL + tags déjà en prod dans la banque de sons).
// Un tag hors liste = ERREUR : « si tu as un doute, ne va pas plus loin » (Papa Yann 2026-09-05).
const TAGS_OK = new Set([
  'excited', 'happily', 'cheerfully', 'curious', 'serious', 'playful', 'hesitant', 'confident', 'calm',
  'warmly', 'gently', 'softly', 'whispers', 'slowly', 'quickly', 'shouts',
  'laughs', 'chuckles', 'giggles', 'sighs', 'gasps', 'exhales',
  'amazed', 'proud', 'delighted', 'encouraging', 'sad', 'scared', 'nervous', 'mischievously',
  'pauses', 'pause',
]);

// data canon
const src = fs.readFileSync(path.join(ROOT, 'site/js/gen/dinos-data.js'), 'utf8');
const m = { exports: {} };
new Function('module', 'exports', 'require', src + '\n;module.exports = { DINOS, _compLong, _compHaut, _compPoids, _compVitesse: typeof _compVitesse === "function" ? _compVitesse : null };')(m, m.exports, require);
const { DINOS, _compLong, _compHaut, _compPoids, _compVitesse } = m.exports;
const byId = Object.fromEntries(DINOS.map(d => [d.id, d]));

const MOTS_NUM = { un: '1', une: '1', deux: '2', trois: '3', quatre: '4', cinq: '5', six: '6', sept: '7', huit: '8', neuf: '9', dix: '10', douze: '12', quatorze: '14' };
const norm = s => s.toLowerCase().replace(/\b(un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|douze|quatorze)\b/g, w => MOTS_NUM[w]).replace(/\s*!\s*$/, '').replace(/[\u2019']/g, "'").replace(/\s+/g, ' ').replace(/\s*[\u2014\u2013-]\s*/g, ' - ').trim();
const normComp = s => norm(s).replace(/qu'1 /g, "qu'un ").replace(/que 1 /g, "qu'un ").replace(/\b1 (?=[a-z\u00e9\u00e8])/g, 'un ');
const frNum = n => String(n).replace('.', ',');

function checkFile(file) {
  const id = path.basename(file, '.md');
  const errs = [], warns = [];
  const d = byId[id];
  if (!d) { errs.push(`id « ${id} » absent de dinos-data.js`); return { id, errs, warns }; }
  const txt = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

  const head = txt.match(/^##\s+(?:\d+\.\s*)?(.+?)\s+—\s+(.+)$/m);
  if (!head) errs.push('en-tête « ## NOM — Latin » introuvable');
  else if (head[2].trim().split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '') !== id) errs.push(`en-tête latin « ${head[2]} » ≠ id ${id}`);

  const blocs = {};
  const blocRe = /^### BLOC ([ABCD])[^\n]*\n([\s\S]*?)(?=^### BLOC |^## |^---\s*$|$(?![\s\S]))/gm;
  let bm; while ((bm = blocRe.exec(txt)) !== null) blocs[bm[1]] = bm[2];
  for (const L of 'ABCD') if (!blocs[L]) errs.push(`bloc ${L} manquant`);

  let total = 0;
  const lineRe = /^\*\*(NARRATEUR H|WEX)\*\*\s*((?:\[[^\]]+\]\s*)*):\s*(.+)$/gm;
  for (const [L, body] of Object.entries(blocs)) {
    let lm, n = 0, blocChars = 0;
    while ((lm = lineRe.exec(body)) !== null) {
      n++;
      const who = lm[1], full = ((lm[2] || '').trim() + ' ' + lm[3].trim()).trim();
      blocChars += full.length;
      const tags = [...full.matchAll(/\[([^\]]+)\]/g)].map(x => x[1].trim().toLowerCase());
      for (const t of tags) if (!TAGS_OK.has(t)) errs.push(`bloc ${L} ${who} : tag hors liste « [${t}] »`);
      const startTags = (full.match(/^(\s*\[[^\]]+\]\s*)+/) || [''])[0].match(/\[/g);
      if (startTags && startTags.length > 2) errs.push(`bloc ${L} ${who} : ${startTags.length} tags collés en début (max 2)`);
      const rest = full.replace(/^(\s*\[[^\]]+\]\s*)+/, '');
      if (/\]\s*\[/.test(rest)) errs.push(`bloc ${L} ${who} : deux tags adjacents au milieu de la réplique`);
      if (/\[[^\]]+\]\s*$/.test(full)) errs.push(`bloc ${L} ${who} : tag en toute fin de réplique (rien après)`);
      if (/\[[^\]]+\]\s*[,.;:!?]/.test(full)) errs.push(`bloc ${L} ${who} : tag suivi d'une ponctuation`);
      if (who === 'WEX' && /!/.test(lm[3])) errs.push(`bloc ${L} WEX : « ! » interdit chez Wex`);
      // Densité minimale (Papa Yann 2026-09-05 : « pas 2-3, PLEIN, au milieu des phrases ») — le tag de tête ne suffit pas.
      const texteSeul = lm[3].replace(/\[[^\]]+\]/g, '').trim();
      const tagsMilieu = (lm[3].match(/\[[^\]]+\]/g) || []).length; // tags posés APRÈS le début (dans le texte)
      if (/\bsang\w*|\btortur\w*|\bagoni\w*/i.test(texteSeul)) errs.push(`bloc ${L} ${who} : mot interdit (sang/tortur/agoni)`);
      if (/\bWex\b/.test(texteSeul)) errs.push(`bloc ${L} ${who} : « Wex » prononcé dans une réplique (le prénom ne se dit pas à voix haute — rules/dino.md § Tritri & Wex)`);
      if (who === 'NARRATEUR H') {
        if (tags.length === 0) errs.push(`bloc ${L} : réplique Narrateur sans tag`);
        else if (texteSeul.length > 70 && tags.length < 2) errs.push(`bloc ${L} Narrateur : ${texteSeul.length} car. et 1 seul tag (min 2, dont 1 au milieu)`);
        else if (texteSeul.length > 140 && tags.length < 3) errs.push(`bloc ${L} Narrateur : ${texteSeul.length} car. et ${tags.length} tags (min 3)`);
        else if (texteSeul.length > 70 && tagsMilieu === 0) errs.push(`bloc ${L} Narrateur : aucun tag au milieu de la réplique (tous collés en tête)`);
      } else {
        if (tags.length === 0) errs.push(`bloc ${L} WEX : réplique sans tag`);
        if (!/[.?…!»]$/.test(texteSeul)) errs.push(`bloc ${L} WEX : réplique sans ponctuation finale (« ${texteSeul.slice(-30)} ») — une question finit par « ? »`);
        if (/^(et |il |elle |c'est |ça |pourquoi|comment|combien|quoi|qui |où |quand|est-ce)/i.test(texteSeul) && texteSeul.includes(' ') && !/[?]/.test(texteSeul) && /\b(comment|pourquoi|combien|quoi|qui|où|quand|est-ce)\b/i.test(texteSeul)) errs.push(`bloc ${L} WEX : question sans « ? » (« ${texteSeul.slice(0, 40)} »)`);
      }
      const caps = lm[3].match(/\b[A-ZÀ-Ý]{2,3}\b/g);
      if (caps) warns.push(`bloc ${L} ${who} : CAPS sur mot court ${caps.join(',')} (L-D07)`);
      if (/sau-rus/i.test(lm[3])) warns.push(`bloc ${L} : « sau-rus » syllabé latin (S avalé) → syllaber « -saure »`);
    }
    if (n === 0) errs.push(`bloc ${L} : aucune réplique parsée (format « **NARRATEUR H** [tag] : … »)`);
    const autres = [...body.matchAll(/^\*\*([^*]+)\*\*/gm)].map(x => x[1]).filter(x => x !== 'NARRATEUR H' && x !== 'WEX');
    if (autres.length) errs.push(`bloc ${L} : locuteur inconnu « ${[...new Set(autres)].join(', ')} » — les libellés machine restent NARRATEUR H / WEX dans toutes les langues`);
    if (blocChars > 700) warns.push(`bloc ${L} : ${blocChars} car. (> 700, vise 15-35 s)`);
    total += blocChars;
    const plain = body.replace(/\[[^\]]+\]/g, '');
    if (/\b(max|doudou|peluche|nounours)\b/i.test(plain)) errs.push(`bloc ${L} : mot interdit (max/doudou/peluche/nounours)`);
    if (/\bregard/i.test(plain)) errs.push(`bloc ${L} : « regarde » (audio = écouter)`);
    if (L !== 'B' && /\bbus\b/i.test(plain)) errs.push(`bloc ${L} : « bus » hors échelle du bloc B`);
    if (/elvis|ferrari|jurassic park|vroum/i.test(plain)) errs.push(`bloc ${L} : référence adulte interdite`);
  }
  // Retour PY 2026-09-05 : le dino de la fiche est le centre. Tritri (le Tricératops de Wex) = 1 mention max par fiche
  // (2 pour le Tricératops lui-même). Les notes d'en-tête (lignes « > ») ne comptent pas.
  const corps = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(l => !l.startsWith('>') && !l.startsWith('- [')).join('\n');
  const nTritri = (corps.match(/tritri/gi) || []).length, maxTritri = id === 'triceratops' ? 2 : 1;
  if (nTritri > maxTritri) errs.push(`Tritri > ${maxTritri} mention(s) (${nTritri}) — le dino de la fiche reste le centre (PY 2026-09-05)`);
  if (total > 1900) errs.push(`fiche = ${total} car. (> 1900, ne tient plus en un appel dialogue)`);

  if (LANG === 'fr' && blocs.B) {
    const B = norm(blocs.B.replace(/\[[^\]]+\]/g, ''));
    const attendu = [['long', _compLong(d.taille_m)], ['poids', _compPoids(d.poids_t)]];
    if (d.hauteur_m) attendu.push(['haut', _compHaut(d.hauteur_m)]);
    const Bc = normComp(blocs.B.replace(/\[[^\]]+\]/g, ''));
    for (const [k, s] of attendu) if (!Bc.includes(normComp(s))) errs.push(`bloc B : comparaison ${k} attendue « ${s} » absente`);
    const nums = [['taille', d.taille_m], ['hauteur', d.hauteur_m], ['poids', d.poids_t >= 1 ? d.poids_t : Math.round(d.poids_t * 1000)]];
    for (const [k, v] of nums) {
      if (v == null) continue;
      const forms = [String(v), frNum(v), frNum(v).replace(',', ' virgule '), String(v).replace('.', ' virgule ')];
      if (!Number.isInteger(v)) { const [i, dec] = String(v).split('.'); const u = k === 'poids' ? 'tonnes' : 'mètres'; forms.push(`${i} ${u} ${dec}`, `${i} ${u} ${dec}0`, `${i} ${u.replace(/s$/, '')} ${dec}`); if (dec === '5') forms.push(`${i} ${u} et demi`, `${i} ${u.replace(/s$/, '')} et demi`); }
      if (k === 'poids' && d.poids_t >= 1) forms.push(String(Math.round(d.poids_t * 1000)), String(Math.round(d.poids_t * 1000)).replace(/(\d)(\d{3})$/, '$1 $2'), `${frNum(d.poids_t)} tonne`);
      if (!forms.some(f => B.includes(f.toLowerCase()))) errs.push(`bloc B : chiffre ${k} (${v}) introuvable`);
    }
  }
  if (LANG === 'fr' && d.vitesse_kmh && _compVitesse) {
    const tout = normComp(Object.values(blocs).join(' ').replace(/[[^]]+]/g, ''));
    const parle = /km\/h|kilom[eè]tres?[ -]heure|à l'heure/.test(tout);
    if (parle && !tout.includes(normComp(_compVitesse(d.vitesse_kmh)))) errs.push(`vitesse : le script parle de km/h mais la comparaison exacte « ${_compVitesse(d.vitesse_kmh)} » est absente`);
    if (parle && !tout.includes(String(d.vitesse_kmh))) errs.push(`vitesse : chiffre data ${d.vitesse_kmh} km/h introuvable`);
  }

  // --- R02 : étymologie dans le bloc A (LANG fr seulement — racines.json n'a que du FR) --------
  const etymoErrs = [], etymoManques = [];
  if (LANG === 'fr' && blocs.A) {
    const blocAPlain = blocs.A.replace(/\[[^\]]+\]/g, '');
    const normA = norm2(blocAPlain);
    const racines = RACINES_BY_DINO[id];
    if (!racines) {
      etymoErrs.push(`racines.json : id « ${id} » absent`);
    } else {
      let langueVue = false;
      for (const rac of racines) {
        if (rac.type === 'nom_propre') continue; // pas une racine grec/latin, pas de sens à retrouver
        const sensNorm = norm2(rac.sens);
        const candidats = (SENS_ALT[rac.sens] || rac.sens.split(/[,;]/).map(s => s.trim())).map(norm2);
        const trouve = candidats.some(c => c && normA.includes(c));
        if (!trouve) { etymoErrs.push(`bloc A : sens de « ${rac.cle} » absent (« ${rac.sens} »)`); etymoManques.push({ racine: rac.cle, sens: rac.sens, langue: rac.langue }); }
        if (rac.langue) langueVue = true;
      }
      if (langueVue && !LANG_RE.test(blocAPlain)) { etymoErrs.push('bloc A : aucune langue nommée (grec|latin)'); etymoManques.push({ racine: null, sens: null, langue: 'aucune langue nommée' }); }
    }
  }

  // --- R22 : provenance du fait de fiche (ligne « > Fact-check » de l'en-tête V3) ----------------
  const factcheckErrs = [];
  if (LANG === 'fr') {
    const headTxt = fs.readFileSync(file, 'utf8');
    const fcLine = (headTxt.match(/^> Fact-check.*$/m) || [null])[0];
    if (fcLine) {
      if (/confirm/i.test(fcLine) && !URL_RE.test(fcLine)) factcheckErrs.push(`ligne Fact-check : CONFIRMÉ sans URL (« ${fcLine.slice(0, 90)}… »)`);
      if (/404/.test(fcLine) && /confirm/i.test(fcLine)) factcheckErrs.push('ligne Fact-check : « 404 » ne vaut jamais confirmation');
      if (ESPECES_A_SOSIE.has(id) && !SPECIMEN_RE.test(fcLine)) factcheckErrs.push(`ligne Fact-check : espèce à sosie (_ESPECES-A-SOSIE.md) sans numéro de spécimen`);
    }
  }

  return { id, errs, warns, total, etymoErrs, etymoManques, factcheckErrs };
}

const files = (idsArg.length ? idsArg.map(i => path.join(DIR, i + '.md')) : fs.readdirSync(DIR).filter(f => /^[a-z0-9_]+\.md$/.test(f)).map(f => path.join(DIR, f)))
  .filter(f => fs.existsSync(f));
if (!files.length) { console.error(`aucun script trouvé dans ${DIR}`); process.exit(2); }
let ko = 0;
const etymoReport = [];
for (const f of files) {
  const r = checkFile(f);
  const isLegacyEtymo = LEGACY_ETYMO.has(r.id);
  const isLegacyFactcheck = LEGACY_FACTCHECK.has(r.id);

  // Les erreurs R02/R22 comptent comme KO SAUF pour un id du set LEGACY correspondant (avertissement).
  const realEtymoErrs = isLegacyEtymo ? [] : r.etymoErrs;
  const legacyEtymoWarns = isLegacyEtymo ? r.etymoErrs : [];
  const realFactcheckErrs = isLegacyFactcheck ? [] : r.factcheckErrs;
  const legacyFactcheckWarns = isLegacyFactcheck ? r.factcheckErrs : [];

  const allErrs = [...r.errs, ...realEtymoErrs, ...realFactcheckErrs];
  const allWarns = [...r.warns, ...legacyEtymoWarns.map(e => `[LEGACY_ETYMO] ${e}`), ...legacyFactcheckWarns.map(e => `[LEGACY_FACTCHECK] ${e}`)];

  const st = allErrs.length ? 'KO' : 'OK';
  if (allErrs.length) ko++;
  console.log(`${st}  ${r.id}${r.total ? ` (${r.total} car.)` : ''}`);
  allErrs.forEach(e => console.log(`     ✖ ${e}`));
  allWarns.forEach(w => console.log(`     ⚠ ${w}`));

  if (ETYMO_REPORT && r.etymoManques && r.etymoManques.length) etymoReport.push({ id: r.id, manques: r.etymoManques, legacy: isLegacyEtymo });
}
console.log(`\n${files.length - ko} OK · ${ko} KO · ${files.length} scripts (${LANG})`);

if (ETYMO_REPORT) {
  console.log(`\n--- --etymo-report : ${etymoReport.length} fiche(s) avec un manque étymologique ---`);
  for (const { id, manques, legacy } of etymoReport) {
    console.log(`${id}${legacy ? ' [LEGACY_ETYMO]' : ' [NEUF — à corriger avant push]'}`);
    for (const man of manques) {
      if (man.racine === null) console.log(`   - langue : ${man.langue}`);
      else console.log(`   - racine « ${man.racine} » → sens attendu « ${man.sens} »${man.langue ? ` (${man.langue})` : ''}`);
    }
  }
}

process.exit(ko ? 1 : 0);
