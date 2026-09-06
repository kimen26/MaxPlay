// Génère une image dino dans le GPTs "Dinosaure XXL" (Brave debug 9222) et récupère SEULEMENT la nouvelle image.
// Version durcie pour le batch série dino :
//  - attend une image VRAIMENT neuve (compare l'URL src, pas juste le compte)
//  - détecte le blocage modération (texte "enfreindre nos règles") -> exit 4
//  - détecte la limite de génération / crédits épuisés -> exit 5 (signal d'ARRÊT)
//  - détecte la MODAL rate limit (modal-conversation-history-rate-limit) -> exit 5
//  - --new ouvre un chat neuf DANS le GPTs (Control+Shift+O garde le GPTs courant si on est déjà dedans ;
//    sinon --url force le GPTs). Pour la 1re image d'un dino : --url. Scènes suivantes du même dino : rien.
//
//  - --ref <image> joint une image de RÉFÉRENCE VISUELLE au prompt (leçon L-D-59 :
//    sur un trait morphologique où le modèle a un a priori fort — la crête d'un
//    hadrosaure, le cou d'un ptérosaure — aucune reformulation chiffrée ne mord ;
//    seule une image de référence corrige la forme).
//
// Usage: node gpt-gen-dino.mjs "<prompt>" <out.png> [--url <gpts-url>] [--new] [--ref <image>]
import pw from 'file:///C:/ProjetsPerso/Claude_Projects/MaxPlay/studio/minijeux/tests/node_modules/playwright/index.js';
import { writeFileSync, existsSync } from 'node:fs';
const { chromium } = pw;

const PROMPT = process.argv[2];
const OUT = process.argv[3];
const NEW = process.argv.includes('--new');
const urlIdx = process.argv.indexOf('--url');
const URL = urlIdx > -1 ? process.argv[urlIdx + 1] : null;
const refIdx = process.argv.indexOf('--ref');
const REF = refIdx > -1 ? process.argv[refIdx + 1] : null;
if (!PROMPT || !OUT) {
  console.log('usage: node gpt-gen-dino.mjs "<prompt>" <out.png> [--url <gpts-url>] [--new] [--ref <image>]');
  process.exit(1);
}
if (REF && !existsSync(REF)) {
  console.log('✗ image de référence introuvable : ' + REF);
  process.exit(1);
}

// Port pilotable par CDP_PORT : deux navigateurs distincts permettent de faire
// tourner ChatGPT et Grok en parallele sans qu ils se volent l onglet actif.
const CDP = 'http://127.0.0.1:' + (process.env.CDP_PORT || '9222');
const ESTUARY = 'img[src*="backend-api/estuary/content"]';
const BLOCK_RE = /enfreindre nos règles|illustrations acceptables|violate our|content policy|n'avons pas pu générer|impossible de générer cette image/i;
const LIMIT_RE = /limite de génération|limite de créations d'images|plus de crédit|réessayez plus tard|try again later|usage cap|rate limit|vous avez atteint|image generation limit|reached your limit|hit the Plus plan limit|limit resets in|passez à une offre supérieure|passer à chatgpt pro/i;

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
let page = ctx.pages().find(p => p.url().includes('chatgpt.com'));
if (!page) { page = await ctx.newPage(); await page.goto('https://chatgpt.com/'); }
await page.bringToFront();

if (await page.getByRole('button', { name: /se connecter|log in/i }).count() > 0) {
  console.log('✗ PAS LOGUÉ — logue-toi dans Brave puis relance.');
  await browser.close(); process.exit(2);
}
try { await page.getByRole('button', { name: /tout accepter|accept all|refuser/i }).first().click({ timeout: 1500 }); } catch {}

if (URL) {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(7000); // la page ChatGPT met ~5s à s'afficher — attendre 7s avant de taper (sinon textarea pas prêt → faux "rate limit")
  console.log('✓ GPTs ciblé (chat neuf):', URL.slice(0, 64));
} else if (NEW) {
  await page.keyboard.press('Control+Shift+O');
  await page.waitForTimeout(7000);
  console.log('✓ nouveau chat (GPTs courant conservé)');
}

const MODAL_RE = /modal-conversation-history-rate-limit|rate limit|too many requests|trop de requêtes|temporairement restreint/i;

async function checkModalRateLimit(page, browser) {
  // Vérifie si une modal de rate limit bloque l'interface
  const modal = await page.locator('[data-testid="modal-conversation-history-rate-limit"], [role="dialog"] .modal, [id*="rate-limit"]').first();
  if (await modal.count() > 0) {
    const modalText = await modal.innerText().catch(() => '');
    if (MODAL_RE.test(modalText)) {
      console.log('\n⛔ RATE LIMIT MODAL détectée. ChatGPT a temporairement restreint l\'accès. ARRÊT propre.');
      await browser.close(); process.exit(5);
    }
  }
  // Le composer met plusieurs secondes a monter apres une navigation : on l ATTEND.
  // Ne pas attendre faisait sortir en code 5 (signal quota) alors que ChatGPT etait
  // disponible — faux positif constate le 2026-09-06 sur la page projet.
  const box = page.locator('#prompt-textarea, div[contenteditable="true"]').first();
  try {
    await box.waitFor({ state: 'visible', timeout: 45000 });
  } catch {
    // Absence du composer = probleme local (page pas montee, overlay), PAS un quota :
    // exit 3 pour que le batch enchaine au lieu de s arreter net sur un faux signal.
    console.log('\n✗ composer introuvable apres 45 s (page pas montee ?) — on passe.');
    await browser.close(); process.exit(3);
  }
}

// URLs d'images déjà présentes AVANT envoi -> pour détecter une src vraiment neuve
const beforeUrls = await page.locator(ESTUARY).evaluateAll(els => els.map(e => e.getAttribute('src')));

// Vérifier rate limit modal AVANT d'envoyer le prompt (évite timeout de 220s)
await checkModalRateLimit(page, browser);

const box = page.locator('#prompt-textarea, div[contenteditable="true"]').first();
await box.click();

// Référence visuelle : on pousse le fichier dans l'input[type=file] caché du composer,
// puis on ATTEND que la vignette soit montée — envoyer avant la fin de l'upload part
// sans la pièce jointe (et le modèle retombe sur son a priori).
if (REF) {
  const input = page.locator('input[type="file"]').first();
  await input.setInputFiles(REF);
  const vignette = page.locator('img[alt*="chargé" i], img[alt*="upload" i], [data-testid*="attachment"], .group\\/imagegen-image img');
  try {
    await vignette.first().waitFor({ state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2500); // laisse l'upload se finaliser côté serveur
    console.log('✓ référence visuelle jointe : ' + REF.split(/[\\/]/).pop());
  } catch {
    console.log('⚠️ vignette de référence non détectée — envoi quand même (vérifier le résultat)');
  }
  await box.click();
}

await box.fill(PROMPT);
await page.waitForTimeout(400);
await page.keyboard.press('Enter');
console.log('✓ prompt envoyé, attente image…');

const start = Date.now();
let url = null;
while (Date.now() - start < 220000) {
// 1) blocage modération / limite ? (cibler la zone de contenu, pas la sidebar historique)
  const mainTxt = await page.evaluate(() => {
    const main = document.querySelector('main, [data-testid="conversation-turn-3"], .flex-col.items-center');
    return main ? main.innerText : document.body.innerText;
  }).catch(() => '');
  if (LIMIT_RE.test(mainTxt)) {
    console.log('\n⛔ LIMITE/CRÉDITS — ChatGPT signale une limite de génération. ARRÊT propre.');
    await browser.close(); process.exit(5);
  }
  if (BLOCK_RE.test(mainTxt)) {
    console.log('\n🚫 BLOQUÉ PAR MODÉRATION (prompt à reformuler — enfant habillé/terre ferme).');
    await browser.close(); process.exit(4);
  }
  // 2) nouvelle image (src absente du set initial) ?
  const cur = await page.locator(ESTUARY).evaluateAll(els => els.map(e => e.getAttribute('src')));
  const fresh = cur.find(u => u && !beforeUrls.includes(u));
  if (fresh) {
    await page.waitForTimeout(3000); // laisser finir le rendu HD
    const cur2 = await page.locator(ESTUARY).evaluateAll(els => els.map(e => e.getAttribute('src')));
    url = cur2.find(u => u && !beforeUrls.includes(u)) || fresh;
    break;
  }
  await page.waitForTimeout(2000);
  process.stdout.write('.');
}
console.log('');
if (!url) {
  console.log('✗ timeout (220s sans nouvelle image)');
  await page.screenshot({ path: OUT.replace(/\.png$/, '-timeout.png') });
  await browser.close(); process.exit(3);
}

const buf = await page.evaluate(async (u) =>
  Array.from(new Uint8Array(await (await fetch(u)).arrayBuffer())), url);
writeFileSync(OUT, Buffer.from(buf));
console.log('✓ →', OUT, `(${buf.length} o)`);
await browser.close();
