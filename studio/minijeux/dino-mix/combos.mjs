// Contrôle Dinomino : planche des échanges tête/corps, 6 images d'un cycle par combinaison.
// Usage : node studio/minijeux/dino-mix/combos.mjs <sortie.png> file:///<chemin>/dino-mix-demo.html '[[tête,dos|null,"pieds"],...]'
import pw from 'playwright';
const [, , OUT, URL, COMBOS] = process.argv;
const browser = await pw.chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
await page.goto(URL);
await page.waitForFunction(() => window.__jambes && window.__jambes.ready);
const combos = JSON.parse(COMBOS);
await page.evaluate((combos) => {
  const J = window.__jambes, N = 6, cw = 150, rh = 170;
  const cv = document.createElement('canvas'); cv.width = cw * N; cv.height = rh * combos.length; cv.id = 'planche';
  const c = cv.getContext('2d'); c.fillStyle = '#fbf6ea'; c.fillRect(0, 0, cv.width, cv.height);
  combos.forEach(([h, b, f], r) => {
    J.state.head = h; J.state.back = b; J.state.feet = f;
    for (let i = 0; i < N; i++) J.draw(c, cw * (i + 0.5), rh * (r + 1) - 12, 100, i / N, f, 1);
    c.fillStyle = '#5e3b28'; c.font = '600 13px sans-serif'; c.fillText(h + ' / ' + (b || 'lisse') + ' / ' + f, 4, rh * r + 14);
  });
  document.body.prepend(cv);
}, combos);
await page.locator('#planche').screenshot({ path: OUT });
await browser.close();
