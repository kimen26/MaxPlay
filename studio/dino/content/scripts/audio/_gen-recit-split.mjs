// Génère un récit du Voyage trop long pour UN appel text-to-dialogue (L-D-77 / L-D-81 : au-delà de
// ≈ 3 000 caractères TAGS COMPRIS, l'API coupe la réponse et facture quand même) en 2 parts,
// puis les concatène (300 ms de silence, loudnorm, silence de tête 250 ms).
// Les parts vivent dans content/sources/recits/audio-wip/ (non déployé) tant que les deux n'existent pas ;
// le MP3 final va dans site/audio/dinos/fr/recit-<id>.mp3.
//
// Usage : node _gen-recit-split.mjs <id> [--part=1|2] [--concat]
//   --part=N  : ne génère que la part N (quota serré : une part aujourd'hui, l'autre au reset)
//   --concat  : ne génère rien, assemble les 2 parts déjà présentes dans audio-wip/
//   sans option : part 1, part 2, puis concat.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../..');
const id = process.argv[2];
if (!id) { console.error('usage: node _gen-recit-split.mjs <id> [--part=1|2] [--concat]'); process.exit(2); }
const partOpt = (process.argv.find(a => a.startsWith('--part=')) || '').slice(7);
const concatOnly = process.argv.includes('--concat');

const KEY = JSON.parse(fs.readFileSync('C:/Users/kimen/.claude/settings.json', 'utf8')).env.ELEVENLABS_API_KEY;
const segFile = path.join(ROOT, 'studio/dino/content/sources/recits/json', `_seg-recit-${id}.json`);
const body = JSON.parse(fs.readFileSync(segFile, 'utf8'));
const wip = path.join(ROOT, 'studio/dino/content/sources/recits/audio-wip');
fs.mkdirSync(wip, { recursive: true });
const partFile = n => path.join(wip, `recit-${id}-part${n}.mp3`);
const finalFile = path.join(ROOT, 'site/audio/dinos/fr', `recit-${id}.mp3`);
const padTete = f => execFileSync('node', [path.join(ROOT, 'studio/dino/content/scripts/audio/_pad-tete.mjs'), f], { stdio: 'inherit' });

// Coupe au plus près de la moitié des caractères, toujours entre deux répliques.
const total = body.inputs.reduce((a, i) => a + i.text.length, 0);
let cut = 0, acc = 0;
for (let i = 0; i < body.inputs.length; i++) { acc += body.inputs[i].text.length; if (acc >= total / 2) { cut = i + 1; break; } }
const parts = [body.inputs.slice(0, cut), body.inputs.slice(cut)];
parts.forEach((p, i) => console.log(`part ${i + 1} : ${p.length} répliques, ${p.reduce((a, x) => a + x.text.length, 0)} caractères (tags compris)`));

async function genPart(n) {
  const inputs = parts[n - 1];
  const r = await fetch('https://api.elevenlabs.io/v1/text-to-dialogue', {
    method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, inputs }),
  });
  if (!r.ok) { console.error(`KO part ${n}`, r.status, (await r.text()).slice(0, 300)); process.exit(1); }
  fs.writeFileSync(partFile(n), Buffer.from(await r.arrayBuffer()));
  padTete(partFile(n));
  console.log(`part ${n} → ${path.relative(ROOT, partFile(n))} · ${duree(partFile(n))} s`);
}
function duree(f) { return execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim(); }
function concat() {
  for (const n of [1, 2]) if (!fs.existsSync(partFile(n))) { console.error(`part ${n} absente (${partFile(n)})`); process.exit(1); }
  execFileSync('ffmpeg', ['-y', '-i', partFile(1), '-i', partFile(2),
    '-filter_complex', '[0:a]apad=pad_dur=0.3[a0];[a0][1:a]concat=n=2:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11[out]',
    '-map', '[out]', '-ar', '44100', '-b:a', '128k', finalFile], { stdio: ['ignore', 'ignore', 'inherit'] });
  padTete(finalFile);
  console.log(`final → ${path.relative(ROOT, finalFile)} · ${duree(finalFile)} s`);
}

if (concatOnly) concat();
else if (partOpt) await genPart(Number(partOpt));
else { await genPart(1); await genPart(2); concat(); }
