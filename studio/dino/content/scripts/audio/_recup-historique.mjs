// Un appel ElevenLabs coupé CÔTÉ CLIENT (socket fermé pendant le téléchargement) est quand même généré
// et facturé : l'audio complet attend dans l'historique du compte. Ce script le liste et le récupère
// SANS crédit (L-D-81, 2026-09-06 : 2 064 crédits « perdus » retrouvés ainsi).
// Usage : node _recup-historique.mjs                      → liste les 10 derniers items (id, heure, crédits, début du texte)
//         node _recup-historique.mjs <history_item_id> <sortie.mp3>   → télécharge l'audio puis pose le silence de tête
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const KEY = JSON.parse(fs.readFileSync('C:/Users/kimen/.claude/settings.json', 'utf8')).env.ELEVENLABS_API_KEY;
const H = { 'xi-api-key': KEY };
const [id, out] = process.argv.slice(2);

if (!id) {
  const r = await fetch('https://api.elevenlabs.io/v1/history?page_size=10', { headers: H });
  if (!r.ok) { console.error('KO', r.status, (await r.text()).slice(0, 200)); process.exit(1); }
  for (const h of (await r.json()).history || []) {
    const quand = new Date(h.date_unix * 1000).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
    const credits = (h.character_count_change_to || 0) - (h.character_count_change_from || 0);
    console.log(h.history_item_id, quand, `${credits} crédits`, h.model_id, (h.text || '').slice(0, 60).replace(/\s+/g, ' '));
  }
  process.exit(0);
}
if (!out) { console.error('usage: node _recup-historique.mjs <history_item_id> <sortie.mp3>'); process.exit(2); }
const a = await fetch(`https://api.elevenlabs.io/v1/history/${id}/audio`, { headers: H });
if (!a.ok) { console.error('audio KO', a.status, (await a.text()).slice(0, 200)); process.exit(1); }
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, Buffer.from(await a.arrayBuffer()));
execFileSync('node', [path.join(path.dirname(fileURLToPath(import.meta.url)), '_pad-tete.mjs'), out], { stdio: 'inherit' });
console.log('récupéré →', out);
