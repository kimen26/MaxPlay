import { chromium } from 'playwright';
const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = b.contexts()[0];
const pages = ctx.pages();
console.log('pages ouvertes:', pages.length);
for (const p of pages) {
  const url = p.url();
  if (url.includes('chatgpt.com') || url.includes('chat.openai')) {
    console.log('--- CHATGPT TAB:', url);
    // images générées ?
    const imgs = await p.locator('img[src*="backend-api/estuary/content"], img[src*="oaiusercontent"]').count();
    console.log('images estuary/oai:', imgs);
    // dernier texte assistant
    const txt = await p.evaluate(() => {
      const turns = document.querySelectorAll('[data-message-author-role="assistant"]');
      const last = turns[turns.length-1];
      return last ? last.innerText.slice(0,600) : '(aucun message assistant)';
    });
    console.log('DERNIER MSG ASSISTANT:\n', txt);
    // y a-t-il un bouton "regénérer" / indicateur d'erreur / streaming ?
    const streaming = await p.locator('[data-testid="stop-button"], button[aria-label*="Stop"]').count();
    console.log('en cours de streaming (stop button):', streaming);
  }
}
await b.close();
