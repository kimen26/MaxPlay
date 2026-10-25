// Génère une image dans ChatGPT (Brave debug 9222) et récupère SEULEMENT la nouvelle image.
// Usage: node gpt-gen.mjs "<prompt>" <out.png> [--new] [--url <chatgpt-url>] [--grab] [--ref <image>]
//   --text      = attend une réponse écrite et l'enregistre dans <out> (critique, avis)
//   --ref <img> = joint une image de référence au prompt (upload avant l'envoi)
//   --new       = ouvre un nouveau chat DANS LE PROJET « Dinosaure » (sinon reste dans le chat courant)
//   --url <u>   = navigue d'abord vers cette URL (ex. un GPTs custom) puis envoie le prompt.
//                 Démarre une conversation fraîche avec ce GPTs. Supplante --new.
//                 GPTs « Dinosaure XXL » (pour les fiches app) :
//                 https://chatgpt.com/g/g-6a2f05b2de7881919e856111c53cece2-dinosaure-xxl-encyclopedie-illustree
// Prérequis: Brave lancé via launch-brave.ps1, et logué à ChatGPT.
import pw from 'playwright';
import { writeFileSync } from 'node:fs';
const { chromium } = pw;

const PROMPT = process.argv[2];
const OUT = process.argv[3];
const NEW = process.argv.includes('--new');
const urlIdx = process.argv.indexOf('--url');
const URL = urlIdx > -1 ? process.argv[urlIdx + 1] : null;
if (!PROMPT || !OUT) {
  console.log('usage: node gpt-gen.mjs "<prompt>" <out.png> [--new] [--url <chatgpt-url>]');
  process.exit(1);
}

const CDP = 'http://127.0.0.1:9222';
const PROJET = 'https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project';
// Images générées : anciennement servies en backend-api/estuary, désormais en blob:
// (UI 2026-09). On repère une image NEUVE par son src, pleine résolution, stable.
const GEN_SEL = 'img[src*="backend-api/estuary/content"], img[src^="blob:https://chatgpt.com"]';
const genSrcs = () => page.$$eval(GEN_SEL, a => a.filter(i => i.naturalWidth >= 700).map(i => i.src));
const refIdx = process.argv.indexOf('--ref');
const REF = refIdx > -1 ? process.argv[refIdx + 1] : null; // image(s) de référence jointe(s), séparées par des virgules
const GRAB = process.argv.includes('--grab'); // récupère la dernière image du chat courant sans rien envoyer

// 2026-10-11 : un onglet Google vide (?zx=…) qui réapparaît dans ce profil bloque connectOverCDP. On le ferme d'abord.
try {
  const targets = await (await fetch(CDP + '/json/list')).json();
  for (const t of targets) if (t.type === 'page' && /^https:\/\/www\.google\.[a-z.]+\/(\?zx=.*)?$/.test(t.url)) await fetch(CDP + '/json/close/' + t.id);
} catch (e) { console.log('⚠ liste des onglets illisible :', e.message); }
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
let page = ctx.pages().find(p => p.url().includes('chatgpt.com'));
if (!page) { page = await ctx.newPage(); await page.goto('https://chatgpt.com/'); }
await page.bringToFront();

if (await page.getByRole('button', { name: /se connecter|log in/i }).count() > 0) {
  console.log('✗ PAS LOGUÉ — logue-toi dans la fenêtre Brave puis relance.');
  await browser.close(); process.exit(2);
}

// Bannière cookies éventuelle
try { await page.getByRole('button', { name: /tout accepter|accept all|refuser/i }).first().click({ timeout: 1500 }); } catch {}

if (URL) {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500); // laisser charger le GPTs
  console.log('✓ GPTs ciblé :', URL.slice(0, 70));
} else if (NEW) {
  // Toute nouvelle conversation s'ouvre DANS le projet « Dinosaure » (exigence PY 2026-10-16 : ne pas polluer
  // l'historique général). La page du projet a son propre champ : le premier message y crée le chat du projet.
  await page.goto(PROJET, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);
  // UI 2026-10 : le nouveau chat s'ouvre parfois en mode « Work » (pas de génération d'image fiable) → repasser en « Chat ».
  const chatTab = page.getByRole('button', { name: /^Chat$/ }).or(page.getByRole('tab', { name: /^Chat$/ })).first();
  if (await chatTab.isVisible().catch(() => false)) { await chatTab.click(); await page.waitForTimeout(1200); }
  console.log('✓ nouveau chat');
}

if (REF && !GRAB) {
  // Joindre l'image AVANT de relever les images existantes : sa vignette ne doit pas passer pour une image générée.
  // UI 2026-10 : les <input type=file> cachés ne joignent rien ; on passe par le menu « + » comme un humain.
  // La vignette jointe est une <img src="data:..."> visible : on la compte pour ne jamais envoyer sans image.
  // Chaque pièce jointe a un bouton « Supprimer <fichier> » : c'est lui qu'on compte (la vignette est un data: pleine taille).
  const DEL = 'button[aria-label^="Supprimer "]';
  const isFileBtn = l => /\.(png|jpe?g|webp|gif)$/i.test(l || '');
  const thumbs = () => page.$$eval(DEL, a => a.filter(x => x.offsetWidth > 0 && /\.(png|jpe?g|webp|gif)$/i.test(x.getAttribute('aria-label'))).length);
  // Les pièces jointes d'un brouillon précédent survivent au « nouveau chat » : on les retire d'abord.
  for (let k = 0; k < 20 && (await thumbs()) > 0; k++) {
    const btns = await page.$$(DEL);
    for (const btn of btns) { if (isFileBtn(await btn.getAttribute('aria-label')) ) { await btn.evaluate(e => e.click()); break; } }
    await page.waitForTimeout(500);
  }
  const files = REF.split(',');
  const base = await thumbs();
  for (let i = 0; i < files.length; i++) {
    const item = page.getByText('Ajouter des photos et fichiers', { exact: true });
    if (!(await item.isVisible())) { await page.locator('button[aria-label="Ajouter des fichiers et plus encore"]:visible').first().click(); await page.waitForTimeout(1000); }
    const [fc] = await Promise.all([page.waitForEvent('filechooser', { timeout: 10000 }), item.click()]);
    await fc.setFiles(files[i]);
    let ok = false;
    for (let t = 0; t < 60 && !ok; t++) { await page.waitForTimeout(1000); ok = (await thumbs()) >= base + i + 1; }
    if (!ok) { console.log('✗ image jointe non visible après 60 s :', files[i]); await browser.close(); process.exit(4); }
  }
  await page.waitForTimeout(4000); // fin de téléversement après l'apparition de la vignette
  console.log('✓ référence jointe :', REF);
}

const before = new Set(GRAB ? [] : await genSrcs());

if (!GRAB) {
  // UI 2026-10 : des invitations (« Autoriser ChatGPT à utiliser Gmail ? ») recouvrent le champ. Toujours refuser.
  for (const name of [/^Pas maintenant$/i, /^Not now$/i]) {
    const later = page.getByRole('button', { name }).first();
    if (await later.isVisible().catch(() => false)) { await later.click(); await page.waitForTimeout(500); }
  }
  // UI 2026-10 : deux éditeurs dans le DOM, le premier est caché → ne prendre que le visible.
  const box = page.locator('#prompt-textarea:visible, div[contenteditable="true"]:visible').first();
  await box.click();
  await box.fill(PROMPT);
  await page.waitForTimeout(400);
  await page.keyboard.press('Enter');
  if (REF) {
    // Les images jointes réapparaissent en grand dans le message envoyé : ce ne sont pas des images générées.
    await page.waitForTimeout(8000);
    for (const u of await genSrcs()) before.add(u);
  }
  console.log('✓ prompt envoyé, attente image…');
}

// --text : on attend une réponse écrite (critique, avis) et on l'écrit dans OUT (.txt) au lieu d'une image.
if (process.argv.includes('--text')) {
  const lastText = () => page.evaluate(() => { const a = [...document.querySelectorAll('[data-message-author-role="assistant"], .markdown')]; return a.length ? a[a.length - 1].innerText : ''; });
  const t0 = Date.now(); let prev = '', stable = 0;
  while (Date.now() - t0 < 300000) {
    await page.waitForTimeout(3000);
    const cur = await lastText();
    const busy = await page.$('button[data-testid="stop-button"], button[aria-label*="Arrêter"], button[aria-label*="Stop"]');
    if (cur && cur === prev && !busy) { if (++stable >= 2) break; } else stable = 0;
    prev = cur; process.stdout.write('.');
  }
  console.log('');
  writeFileSync(OUT, prev, 'utf-8');
  console.log('✓ texte →', OUT, `(${prev.length} car.)`);
  await browser.close(); process.exit(prev ? 0 : 3);
}

const start = Date.now();
let url = null;
let candidate = null;
while (Date.now() - start < 300000) {
  const fresh = (await genSrcs()).filter(u => !before.has(u));
  const last = fresh[fresh.length - 1] || null;
  // src identique sur 2 sondages = rendu terminé (évite le grab d'un rendu progressif)
  if (last && last === candidate) { url = last; break; }
  candidate = last;
  await page.waitForTimeout(2000);
  process.stdout.write('.');
}
console.log('');
if (!url) {
  console.log('✗ timeout (300s sans nouvelle image)');
  await page.screenshot({ path: OUT.replace(/\.png$/, '-timeout.png') });
  await browser.close(); process.exit(3);
}

const buf = await page.evaluate(async (u) =>
  Array.from(new Uint8Array(await (await fetch(u)).arrayBuffer())), url);
writeFileSync(OUT, Buffer.from(buf));
console.log('✓ →', OUT, `(${buf.length} o)`);
await browser.close(); // ne ferme PAS Brave, juste la connexion CDP
