// Convertit _RECITS-EPOQUES-DIALOGUE-V*.md -> 1 JSON text-to-dialogue par segment.
// Usage: node _md2json-recits-v3.cjs [fichier.md]
// Par défaut : _RECITS-EPOQUES-DIALOGUE-V4.md

const fs = require('fs');
const path = require('path');

const SRC_FILE = process.argv[2] || '_RECITS-EPOQUES-DIALOGUE-V4.md';
const SRC = path.join(__dirname, SRC_FILE);
const OUT = path.join(__dirname, 'json');
fs.mkdirSync(OUT, { recursive: true });

const voiceMap = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', '..', '..', '..', 'narration', 'personnages', 'voix-meta', 'voice-map.json'), 'utf8'));
const NARR_F = voiceMap.voices.narrateur_f;
const WEX = voiceMap.voices.wex;

const txt = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

// Segments : ## TITRE (recit-<id>.mp3)
const segRe = /^##\s+(.+?)\s+\(recit-([a-z0-9-]+)\.mp3\)\n([\s\S]*?)(?=^##\s+|$(?![\s\S]))/gm;

// Lignes : **NARRATRICE** [tag1] [tag2] : texte
const lineRe = /^\*\*(NARRATRICE|WEX)\*\*\s*((?:\[[^\]]+\]\s*)*):\s*(.+)$/gm;

let made = 0;
let m;
while ((m = segRe.exec(txt)) !== null) {
  const title = m[1].trim();
  const id = m[2].trim();
  const body = m[3];

  const inputs = [];
  let lm;
  while ((lm = lineRe.exec(body)) !== null) {
    const who = lm[1];
    const tags = (lm[2] || '').trim();
    const text = lm[3].trim();
    if (!text) continue;
    inputs.push({
      voice_id: who === 'WEX' ? WEX : NARR_F,
      text: (tags ? tags + ' ' : '') + text,
    });
  }

  if (!inputs.length) {
    console.log(`SKIP ${id}: aucune ligne de dialogue`);
    continue;
  }

  const payload = {
    inputs,
    model_id: 'eleven_v3',
    output_format: 'mp3_44100_128',
    language_code: 'fr',
    apply_text_normalization: 'auto',
  };

  fs.writeFileSync(path.join(OUT, `_seg-recit-${id}.json`), JSON.stringify(payload, null, 2), 'utf8');
  made++;
  console.log(`${id}: ${inputs.length} lignes -> _seg-recit-${id}.json`);
}

console.log(`\nSegments générés: ${made}`);
