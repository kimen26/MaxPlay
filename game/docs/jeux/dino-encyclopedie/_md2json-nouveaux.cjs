// Convertit les scripts dialogue des NOUVEAUX dinos -> 1 JSON text-to-dialogue par bloc.
// Usage: node _md2json-nouveaux.cjs <fichier.md>
// Le mapping id<->NOM (MAJ tel qu'écrit dans les ##) est ci-dessous.
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'scripts-audio');
const OUT = path.join(DIR, 'json-top');
fs.mkdirSync(OUT, { recursive: true });

const NARR = 'cbRcktt2xvoeFpdvW2wg';
const WEX  = 'G54e8CyYslC2Y4ZupTlg';

// id dino -> NOM tel qu'écrit dans les ## (toutes les nouvelles fiches)
const MAP = {
  kosmoceratops:'KOSMOCÉRATOPS', diabloceratops:'DIABLOCÉRATOPS',
  pachyrhinosaurus:'PACHYRHINOSAURE', pentaceratops:'PENTACÉRATOPS',
  centrosaurus:'CENTROSAURE',
  chasmosaurus:'CHASMOSAURE', anchiceratops:'ANCHICÉRATOPS',
  utahceratops:'UTAHCÉRATOPS', einiosaurus:'EINIOSAURE',
  pteranodon:'PTÉRANODON',
};
const BLOCS = { 'A':'nom', 'B':'taille', 'C':'regime', 'D':'funfact' };

const file = process.argv[2];
if (!file) { console.error('Usage: node _md2json-nouveaux.cjs <fichier.md>'); process.exit(1); }
const txt = fs.readFileSync(path.join(DIR, file), 'utf8');
const lines = txt.split('\n');

function findDinoBlock(nameU) {
  const startRe = new RegExp('^## \\d+\\.\\s*' + nameU.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '\\b');
  let si = lines.findIndex(l => startRe.test(l));
  if (si < 0) return null;
  let ei = lines.length;
  for (let k = si + 1; k < lines.length; k++) { if (/^## \d+\./.test(lines[k])) { ei = k; break; } }
  return lines.slice(si, ei).join('\n');
}

let made = 0, missing = [];
for (const [id, nameU] of Object.entries(MAP)) {
  const sec = findDinoBlock(nameU);
  if (!sec) continue; // ce dino n'est pas dans CE fichier
  const blocRe = /^### BLOC ([ABCD])[^\n]*\n([\s\S]*?)(?=^### BLOC |$(?![\s\S]))/gm;
  let bm; const seen = {};
  while ((bm = blocRe.exec(sec)) !== null) {
    const letter = bm[1], body = bm[2];
    const blocName = BLOCS[letter];
    if (!blocName) continue;
    const lineRe = /^\*\*(NARRATEUR H|WEX)\*\*\s*((?:\[[^\]]+\]\s*)*):\s*(.+)$/gm;
    let lm; const inputs = [];
    while ((lm = lineRe.exec(body)) !== null) {
      const who = lm[1], tags = (lm[2]||'').trim(), text = lm[3].trim();
      if (!text) continue;
      inputs.push({ voice_id: who === 'WEX' ? WEX : NARR, text: (tags ? tags + ' ' : '') + text });
    }
    if (!inputs.length) continue;
    const payload = { inputs, model_id:'eleven_v3', output_format:'mp3_44100_128', language_code:'fr', apply_text_normalization:'auto' };
    fs.writeFileSync(path.join(OUT, `_seg-${id}-${blocName}.json`), JSON.stringify(payload, null, 2), 'utf8');
    seen[blocName] = inputs.length; made++;
  }
  console.log(id + ' -> ' + Object.keys(seen).join(' '));
}
console.log('Total JSON: ' + made);
