// Porte des RÉCITS du Voyage (Narratrice + Wex) — pendant de _verif-scripts-audio.cjs pour les fiches.
// Vérifie un ou plusieurs fichiers au format RECITS-EPOQUES.md (`## TITRE (recit-<id>.mp3)` puis lignes
// `**NARRATRICE** [tag] [tag] : …` / `**WEX** [tag] : …`) et leurs sections `### EN` éventuelles :
//   - tags dans la liste blanche TAGS_OK (lue dans _verif-scripts-audio.cjs, source unique) ;
//   - locuteurs machine NARRATRICE / WEX uniquement, dans toutes les langues (L-D-72) ;
//   - densité (L-D-71) : Narratrice > 70 car. → ≥ 2 tags dont 1 au milieu ; > 140 → ≥ 3 ; ≤ 2 tags collés en tête ;
//     jamais 2 tags adjacents au milieu, jamais en fin, jamais avant une ponctuation ; Wex ≥ 1 tag, jamais « ! » ;
//   - interdits : max/doudou/peluche/nounours, « regarde », « bus », références adultes ;
//   - Tritri : ≤ 1 mention par récit hors Crétacé/Extinction (fil rouge, L-D-75 adapté au Voyage) ;
//   - taille : ≤ 3 000 caractères hors tags par récit (au-delà l'API text-to-dialogue coupe la réponse, constaté 2026-09-05).
// Usage : node studio/dino/content/scripts/export/_verif-recits.cjs <fichier.md> [...]
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const gate = fs.readFileSync(path.join(__dirname, '_verif-scripts-audio.cjs'), 'utf8');
const TAGS_OK = new Set([...gate.match(/TAGS_OK\s*=\s*new Set\(\[([\s\S]*?)\]\)/)[1].matchAll(/'([^']+)'/g)].map(x => x[1]));
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node _verif-recits.cjs <fichier.md> [...]'); process.exit(2); }
const TRITRI_LIBRE = new Set(['cretace', 'extinction', 'grande-extinction']);

let totalOk = 0, totalKo = 0;
for (const file of files) {
  const txt = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const sections = txt.split(/^## /m).slice(1);
  for (const sec of sections) {
    const head = sec.match(/^(.+?)\s+\(recit-([a-z0-9-]+)\.mp3\)/);
    if (!head) continue;
    const id = head[2];
    // FR = avant `### EN`, EN = après.
    const [frPart, ...enParts] = sec.split(/^### EN\s*$/m);
    for (const [lang, body] of [['fr', frPart], ['en', enParts.join('\n')]]) {
      if (!body.trim() || (lang === 'en' && !enParts.length)) continue;
      const errs = []; let chars = 0, charsTags = 0, n = 0, tritri = 0;
      for (const l of body.split('\n')) {
        if (l.startsWith('>') || !l.trim()) continue;
        const lm = l.match(/^\*\*([^*]+)\*\*\s*(.*?)\s*:\s*(.+)$/);
        if (!lm) { if (/^\*\*/.test(l)) errs.push(`ligne non parsée « ${l.slice(0, 40)} »`); continue; }
        const who = lm[1].trim(), full = (lm[2] + ' ' + lm[3]).trim(), texte = lm[3].trim();
        if (who !== 'NARRATRICE' && who !== 'WEX') { errs.push(`locuteur inconnu « ${who} »`); continue; }
        n++;
        const tags = [...full.matchAll(/\[([^\]]+)\]/g)].map(x => x[1]);
        for (const t of tags) if (!TAGS_OK.has(t)) errs.push(`tag hors liste « [${t}] »`);
        const start = (lm[2].match(/\[[^\]]+\]/g) || []).length;
        if (start > 2) errs.push(`${who} : ${start} tags collés en tête (max 2)`);
        if (/\]\s*\[/.test(texte)) errs.push(`${who} : deux tags adjacents au milieu`);
        if (/\[[^\]]+\]\s*$/.test(full)) errs.push(`${who} : tag en fin de réplique`);
        if (/\[[^\]]+\]\s*[,.;:!?]/.test(full)) errs.push(`${who} : tag suivi d'une ponctuation`);
        const seul = texte.replace(/\[[^\]]+\]\s*/g, '').trim();
        const milieu = (texte.match(/\[[^\]]+\]/g) || []).length;
        chars += seul.length; charsTags += full.length;
        if (who === 'NARRATRICE') {
          if (!tags.length) errs.push('Narratrice sans tag');
          else if (seul.length > 140 && tags.length < 3) errs.push(`Narratrice : ${seul.length} car. et ${tags.length} tags (min 3)`);
          else if (seul.length > 70 && tags.length < 2) errs.push(`Narratrice : ${seul.length} car. et 1 tag (min 2 dont 1 au milieu)`);
          else if (seul.length > 70 && milieu === 0) errs.push(`Narratrice : aucun tag au milieu (« ${seul.slice(0, 40)} »)`);
        } else {
          if (!tags.length) errs.push('Wex sans tag');
          if (/!/.test(seul)) errs.push(`Wex : « ! » interdit (« ${seul.slice(0, 40)} »)`);
          if (!/[.?…»"]$/.test(seul)) errs.push(`Wex : ponctuation finale manquante (« ${seul.slice(-25)} »)`);
        }
        if (/\b(max|doudou|peluche|nounours)\b/i.test(seul)) errs.push('mot interdit (max/doudou/peluche/nounours)');
        if (/\bregard/i.test(seul) && lang === 'fr') errs.push('« regarde » (audio = écouter)');
        if (/\bbus\b/i.test(seul)) errs.push('« bus » interdit dans un récit');
        if (/elvis|ferrari|jurassic park|vroum/i.test(seul)) errs.push('référence adulte');
        if (/tritri/i.test(seul)) tritri += (seul.match(/tritri/gi) || []).length;
      }
      if (!n) errs.push('aucune réplique parsée');
      // L-D-81 : l'API coupe (et facture) au-delà de ≈ 3 000 caractères TAGS COMPRIS. Entre 3 000 et 6 000 :
      // générer en 2 parts avec scripts/audio/_gen-recit-split.mjs (averti, pas bloqué) ; au-delà : réécrire.
      if (charsTags > 6000) errs.push(`${charsTags} caractères tags compris (> 6 000 : trop long même en 2 parts, réécrire)`);
      else if (charsTags > 3000) console.log(`     ⚠ ${id} : ${charsTags} caractères tags compris (> 3 000) → générer en 2 parts (_gen-recit-split.mjs)`);
      if (tritri > 1 && !TRITRI_LIBRE.has(id)) errs.push(`Tritri ${tritri} mentions (max 1 hors Crétacé/Extinction)`);
      if (errs.length) { totalKo++; console.log(`KO  ${id} [${lang}] (${chars} car.)`); [...new Set(errs)].forEach(e => console.log('     ✖ ' + e)); }
      else { totalOk++; console.log(`OK  ${id} [${lang}] (${chars} car., ${n} répliques)`); }
    }
  }
}
console.log(`\n${totalOk} OK · ${totalKo} KO`);
process.exit(totalKo ? 1 : 0);
