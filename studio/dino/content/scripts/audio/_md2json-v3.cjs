// Convertit les scripts V3 (scripts-audio/V3/*.md, format dialogue 4 blocs A/B/C/D)
// -> 1 JSON text-to-dialogue par bloc, pour la production audio des 51 dinos.
// Usage: node _md2json-v3.cjs
//
// Diffère de _md2json.cjs : lit le dossier V3/, dérive l'id depuis le NOM LATIN
// du titre (## NOM — Latin species) au lieu d'une table codée en dur (couvre les 51).
// Format JSON identique (text-to-dialogue eleven_v3, narrateur_h + wex via voice-map).

const fs = require('fs');
const path = require('path');

const V3DIR = path.join(__dirname, '..', '..', 'scripts-audio', 'V3');
const OUT = path.join(V3DIR, 'json');
fs.mkdirSync(OUT, { recursive: true });

// voice_ids resolus via voice-map.json (source unique, jamais hardcoder ailleurs)
const voiceMap = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', '..', '..', '..', 'narration', 'personnages', 'voix-meta', 'voice-map.json'), 'utf8'));
const NARR = voiceMap.voices.narrateur_h;
const WEX  = voiceMap.voices.wex;

const BLOCS = { 'A': 'nom', 'B': 'taille', 'C': 'regime', 'D': 'funfact' };
const FILES = ['ceratopsiens', 'trex-lot1', 'trex-lot2', 'sauropodes', 'volants-marins', 'armes-bizarres', 'ornithopodes-raptors', 'megafaune'];

// id réels dinos-data.js pour validation
let s = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', '..', 'site', 'js', 'dinos-data.js'), 'utf8');
const idSet = new Set([...s.matchAll(/^\s*id:\s*'([a-z0-9_]+)'/gm)].map(m => m[1]));

function titleToId(latin) {
  return latin.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '');
}

let made = 0, dinos = 0, missing = [];
for (const f of FILES) {
  const txt = fs.readFileSync(path.join(V3DIR, f + '.md'), 'utf8').replace(/\r\n/g, '\n');
  const lines = txt.split('\n');
  // repère les sections de dino : ## [N.] NOM — Latin
  const secRe = /^##\s+(?:\d+\.\s*)?(.+?)\s+—\s+(.+)$/;
  const heads = [];
  lines.forEach((l, i) => {
    const m = l.match(secRe);
    if (m && !/Vérif/i.test(m[1])) heads.push({ i, name: m[1].trim(), latin: m[2].trim() });
  });
  heads.forEach((h, k) => {
    const ei = k + 1 < heads.length ? heads[k + 1].i : lines.length;
    const sec = lines.slice(h.i, ei).join('\n');
    const id = titleToId(h.latin);
    if (!idSet.has(id)) { missing.push(`${h.name} (${h.latin}) -> id "${id}" absent dinos-data.js`); return; }
    dinos++;
    // découpe par ### BLOC X
    const blocRe = /^### BLOC ([ABCD])[^\n]*\n([\s\S]*?)(?=^### BLOC |$(?![\s\S]))/gm;
    let bm; const seen = {};
    while ((bm = blocRe.exec(sec)) !== null) {
      const letter = bm[1], body = bm[2];
      const blocName = BLOCS[letter];
      if (!blocName) continue;
      const lineRe = /^\*\*(NARRATEUR H|WEX)\*\*\s*((?:\[[^\]]+\]\s*)*):\s*(.+)$/gm;
      let lm; const inputs = [];
      while ((lm = lineRe.exec(body)) !== null) {
        const who = lm[1], tags = (lm[2] || '').trim(), text = lm[3].trim();
        if (!text) continue;
        inputs.push({ voice_id: who === 'WEX' ? WEX : NARR, text: (tags ? tags + ' ' : '') + text });
      }
      if (!inputs.length) continue;
      const payload = {
        inputs,
        model_id: 'eleven_v3',
        output_format: 'mp3_44100_128',
        language_code: 'fr',
        apply_text_normalization: 'auto',
      };
      fs.writeFileSync(path.join(OUT, `_seg-${id}-${blocName}.json`), JSON.stringify(payload, null, 2), 'utf8');
      seen[blocName] = inputs.length;
      made++;
    }
    const got = Object.keys(seen);
    if (got.length !== 4) missing.push(`${id}: blocs incomplets (${got.join(',') || 'AUCUN'})`);
  });
}
console.log(`Dinos traités: ${dinos}/51 · JSON générés: ${made} (attendu ${dinos * 4})`);
if (missing.length) { console.log('\nPROBLÈMES:'); missing.forEach(x => console.log(' - ' + x)); }
else console.log('Tous les blocs OK (4/dino).');
