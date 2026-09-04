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
// Avertissements (n'arrêtent pas) : CAPS sur mot < 4 lettres · réplique Narrateur sans tag · « -sau-rus » syllabé latin · bloc > 700 car.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../..');
const [langArg, ...idsArg] = process.argv.slice(2);
const LANG = langArg || 'fr';
const DIR = LANG === 'fr'
  ? path.join(ROOT, 'studio/dino/content/scripts-audio/fr/V3')
  : path.join(ROOT, 'studio/dino/content/scripts-audio', LANG);

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
const src = fs.readFileSync(path.join(ROOT, 'site/js/dinos-data.js'), 'utf8');
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
      if (who === 'NARRATEUR H' && tags.length === 0) warns.push(`bloc ${L} : réplique Narrateur sans tag`);
      const caps = lm[3].match(/\b[A-ZÀ-Ý]{2,3}\b/g);
      if (caps) warns.push(`bloc ${L} ${who} : CAPS sur mot court ${caps.join(',')} (L-D07)`);
      if (/sau-rus/i.test(lm[3])) warns.push(`bloc ${L} : « sau-rus » syllabé latin (S avalé) → syllaber « -saure »`);
    }
    if (n === 0) errs.push(`bloc ${L} : aucune réplique parsée (format « **NARRATEUR H** [tag] : … »)`);
    if (blocChars > 700) warns.push(`bloc ${L} : ${blocChars} car. (> 700, vise 15-35 s)`);
    total += blocChars;
    const plain = body.replace(/\[[^\]]+\]/g, '');
    if (/\b(max|doudou|peluche|nounours)\b/i.test(plain)) errs.push(`bloc ${L} : mot interdit (max/doudou/peluche/nounours)`);
    if (/\bregard/i.test(plain)) errs.push(`bloc ${L} : « regarde » (audio = écouter)`);
    if (L !== 'B' && /\bbus\b/i.test(plain)) errs.push(`bloc ${L} : « bus » hors échelle du bloc B`);
    if (/elvis|ferrari|jurassic park|vroum/i.test(plain)) errs.push(`bloc ${L} : référence adulte interdite`);
  }
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
  return { id, errs, warns, total };
}

const files = (idsArg.length ? idsArg.map(i => path.join(DIR, i + '.md')) : fs.readdirSync(DIR).filter(f => /^[a-z0-9_]+\.md$/.test(f)).map(f => path.join(DIR, f)))
  .filter(f => fs.existsSync(f));
if (!files.length) { console.error(`aucun script trouvé dans ${DIR}`); process.exit(2); }
let ko = 0;
for (const f of files) {
  const r = checkFile(f);
  const st = r.errs.length ? 'KO' : 'OK';
  if (r.errs.length) ko++;
  console.log(`${st}  ${r.id}${r.total ? ` (${r.total} car.)` : ''}`);
  r.errs.forEach(e => console.log(`     ✖ ${e}`));
  r.warns.forEach(w => console.log(`     ⚠ ${w}`));
}
console.log(`\n${files.length - ko} OK · ${ko} KO · ${files.length} scripts (${LANG})`);
process.exit(ko ? 1 : 0);
