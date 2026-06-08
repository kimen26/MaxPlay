// Convertit special-pangee.md / special-extinction.md -> JSON text-to-dialogue par bloc.
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', '..', 'scripts-audio');
const OUT = path.join(DIR, 'json-top');
fs.mkdirSync(OUT, { recursive: true });
const NARR = 'cbRcktt2xvoeFpdvW2wg';
const WEX  = 'G54e8CyYslC2Y4ZupTlg';

const SPEC = [
  { file: 'special-pangee.md',     id: 'pangee' },
  { file: 'special-extinction.md', id: 'extinction' },
];
const BLOCS = { 'A':'a', 'B':'b', 'C':'c', 'D':'d' };

let made = 0;
for (const { file, id } of SPEC) {
  const txt = fs.readFileSync(path.join(DIR, file), 'utf8');
  const lines = txt.split('\n');
  // découpe par ### BLOC X
  const idx = [];
  lines.forEach((l, i) => { const m = l.match(/^#{2,3} BLOC ([ABCD])\b/); if (m) idx.push({ i, letter: m[1] }); });
  idx.forEach((b, k) => {
    const end = (k + 1 < idx.length) ? idx[k + 1].i : lines.length;
    const body = lines.slice(b.i + 1, end).join('\n');
    const lineRe = /^\*\*(NARRATEUR H|WEX)\*\*\s*((?:\[[^\]]+\]\s*)*):\s*(.+)$/gm;
    let lm; const inputs = [];
    while ((lm = lineRe.exec(body)) !== null) {
      const who = lm[1], tags = (lm[2] || '').trim(), text = lm[3].trim();
      if (!text) continue;
      inputs.push({ voice_id: who === 'WEX' ? WEX : NARR, text: (tags ? tags + ' ' : '') + text });
    }
    if (!inputs.length) return;
    const payload = { inputs, model_id: 'eleven_v3', output_format: 'mp3_44100_128', language_code: 'fr', apply_text_normalization: 'auto' };
    const fn = path.join(OUT, `_seg-${id}-${BLOCS[b.letter]}.json`);
    fs.writeFileSync(fn, JSON.stringify(payload, null, 2), 'utf8');
    made++;
  });
  console.log(id + ' -> ' + idx.length + ' blocs');
}
console.log('Total: ' + made + ' JSON (attendu 8)');
