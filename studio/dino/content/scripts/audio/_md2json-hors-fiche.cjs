// Convertit les scripts audio HORS FICHES d'une langue (menus, périodes, récits, spéciaux, dico)
// en payloads text-to-dialogue eleven_v3, un JSON par clip, prêts pour le pipeline STS i18n.
// Source : content/i18n/<lang>/scripts-hors-fiche/*.md (format HO-018 : `### <slug>` puis lignes
// `**NARRATEUR H** [tag] : …` / `**WEX** [tag] : …`, libellés machine jamais traduits — L-D-72).
// Sortie : content/i18n/<lang>/scripts-hors-fiche/json/_seg-<slug>.json (les « / » du slug → « __ »),
//          le MP3 final devra s'appeler site/audio/dinos/<lang>/<slug>.mp3 (miroir exact du FR).
// Porte intégrée : tags hors liste blanche, locuteur inconnu, « ! » chez Wex, tag en fin de réplique,
// clip vide → le clip est REFUSÉ (rien d'écrit pour lui) et compté en KO.
// Usage : node studio/dino/content/scripts/audio/_md2json-hors-fiche.cjs <lang> [fichier.md ...]
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const lang = process.argv[2];
if (!lang) { console.error('usage: node _md2json-hors-fiche.cjs <lang> [fichier.md ...]'); process.exit(2); }
const LANG_CODE = { 'es-es': 'es', 'pt-br': 'pt' }[lang] || lang;

const voiceMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'studio/narration/personnages/voix-meta/voice-map.json'), 'utf8'));
const VOIX = { 'NARRATEUR H': voiceMap.voices.narrateur_h, WEX: voiceMap.voices.wex };

// Liste blanche des tags = celle de la porte des fiches (source unique, lue dans son code).
const gateSrc = fs.readFileSync(path.join(ROOT, 'studio/dino/content/scripts/export/_verif-scripts-audio.cjs'), 'utf8');
const m = gateSrc.match(/TAGS_OK\s*=\s*new Set\(\[([\s\S]*?)\]\)/);
if (!m) { console.error('TAGS_OK introuvable dans _verif-scripts-audio.cjs'); process.exit(2); }
const TAGS_OK = new Set([...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]));

const dir = path.join(ROOT, 'studio/dino/content/i18n', lang, 'scripts-hors-fiche');
const files = process.argv.length > 3 ? process.argv.slice(3) : fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
const outDir = path.join(dir, 'json');
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, ko = 0, caracteres = 0;
for (const file of files) {
  const txt = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const blocs = txt.split(/^### /m).slice(1);
  for (const bloc of blocs) {
    const lignes = bloc.split('\n');
    const slug = lignes[0].trim().replace(/\s.*$/, '');
    const errs = [], inputs = [];
    for (const l of lignes.slice(1)) {
      const lm = l.match(/^\*\*([^*]+)\*\*\s*(.*?)\s*:\s*(.+)$/);
      if (!lm) { if (/^\*\*/.test(l)) errs.push(`ligne non parsée « ${l.slice(0, 40)} »`); continue; }
      const who = lm[1].trim(), body = lm[3].trim();
      if (!VOIX[who]) { errs.push(`locuteur inconnu « ${who} »`); continue; }
      const full = (lm[2] + ' ' + body).trim();
      const tags = [...full.matchAll(/\[([^\]]+)\]/g)].map(x => x[1]);
      for (const t of tags) if (!TAGS_OK.has(t)) errs.push(`tag hors liste « [${t}] »`);
      if (/\[[^\]]+\]\s*$/.test(full)) errs.push('tag en fin de réplique');
      if (who === 'WEX' && /!/.test(body)) errs.push('« ! » chez Wex');
      if (tags.length === 0) errs.push(`réplique ${who} sans tag`);
      inputs.push({ voice_id: VOIX[who], text: full });
      caracteres += full.replace(/\[[^\]]+\]\s*/g, '').length;
    }
    if (!inputs.length) errs.push('clip vide');
    if (errs.length) { ko++; console.log(`KO  ${slug} :: ${errs.join(' · ')}`); continue; }
    const out = path.join(outDir, `_seg-${slug.replace(/\//g, '__')}.json`);
    fs.writeFileSync(out, JSON.stringify({ model_id: 'eleven_v3', language_code: LANG_CODE, inputs }, null, 2) + '\n');
    ok++;
  }
}
console.log(`\n=== ${lang} hors fiches : ${ok} clips OK · ${ko} KO · ${caracteres} caractères (hors tags) → ${path.relative(ROOT, outDir)} ===`);
process.exit(ko ? 1 : 0);
