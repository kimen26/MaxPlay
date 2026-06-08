// Convertit les scripts md 4-blocs -> 1 JSON text-to-dialogue par bloc, pour le TOP audio.
// Usage: node _md2json.cjs
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', '..', 'scripts-audio');
const OUT = path.join(DIR, 'json-top');
fs.mkdirSync(OUT, { recursive: true });

const NARR = 'cbRcktt2xvoeFpdvW2wg';
const WEX  = 'G54e8CyYslC2Y4ZupTlg';

// id dino -> nom tel qu'écrit dans les ## (MAJ, sans accents gérés souples)
const TOP = {
  tyrannosaurus:'T-REX', velociraptor:'VÉLOCIRAPTOR', stegosaurus:'STÉGOSAURE',
  spinosaurus:'SPINOSAURE', giganotosaurus:'GIGANOTOSAURE', brachiosaurus:'BRACHIOSAURE',
  ankylosaurus:'ANKYLOSAURE', diplodocus:'DIPLODOCUS', allosaurus:'ALLOSAURE',
  carnotaurus:'CARNOTAURE', triceratops:'TRICÉRATOPS',
};
const BLOCS = { 'A':'nom', 'B':'taille', 'C':'regime', 'D':'funfact' };

const files = fs.readdirSync(DIR).filter(f => /^groupe-.*\.md$/.test(f));
let allText = {};
files.forEach(f => { allText[f] = fs.readFileSync(path.join(DIR, f), 'utf8'); });

function findDinoBlock(dinoNameUpper) {
  for (const f of Object.keys(allText)) {
    const txt = allText[f];
    // section ## N. NOM ... jusqu'au prochain ## ou fin
    const lines = txt.split('\n');
    const startRe = new RegExp('^## \\d+\\.\\s*' + dinoNameUpper.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '\\b');
    let si = lines.findIndex(l => startRe.test(l));
    if (si < 0) continue;
    let ei = lines.length;
    for (let k = si + 1; k < lines.length; k++) { if (/^## \d+\./.test(lines[k])) { ei = k; break; } }
    return lines.slice(si, ei).join('\n');
  }
  return null;
}

let made = 0, missing = [];
for (const [id, nameU] of Object.entries(TOP)) {
  let sec = findDinoBlock(nameU);
  if (!sec) { missing.push(id + ' ('+nameU+')'); continue; }
  // découpe par ### BLOC X
  const blocRe = /^### BLOC ([ABCD])[^\n]*\n([\s\S]*?)(?=^### BLOC |$(?![\s\S]))/gm;
  let bm;
  const seen = {};
  while ((bm = blocRe.exec(sec)) !== null) {
    const letter = bm[1], body = bm[2];
    const blocName = BLOCS[letter];
    if (!blocName) continue;
    // lignes **NARRATEUR H** [..] : txt / **WEX** [..] : txt
    const lineRe = /^\*\*(NARRATEUR H|WEX)\*\*\s*((?:\[[^\]]+\]\s*)*):\s*(.+)$/gm;
    let lm; const inputs = [];
    while ((lm = lineRe.exec(body)) !== null) {
      const who = lm[1], tags = (lm[2]||'').trim(), text = lm[3].trim();
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
    const fn = path.join(OUT, `_seg-${id}-${blocName}.json`);
    fs.writeFileSync(fn, JSON.stringify(payload, null, 2), 'utf8');
    seen[blocName] = inputs.length;
    made++;
  }
  console.log(id + ' -> blocs: ' + Object.entries(seen).map(([k,v])=>k+'('+v+')').join(' '));
}
console.log('\nTotal JSON: ' + made + ' (attendu ' + (Object.keys(TOP).length*4) + ' = 11 dinos x 4)');
if (missing.length) console.log('MANQUANTS: ' + missing.join(', '));
