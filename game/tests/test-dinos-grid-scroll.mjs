import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const devDinosPath = path.resolve(__dirname, '../../site/dev-dinos.html');
const fileUrl = `file:///${devDinosPath.replace(/\\/g, '/')}`;

test('Grid de dinosaures doit avoir un scrollable visible', async ({ page }) => {
  await page.goto(fileUrl);

  // Attendre que le grid soit prêt
  await page.waitForSelector('#grid-scroll', { timeout: 5000 });

  // Vérifier que le grid est visible
  const gridScroll = await page.locator('#grid-scroll');
  await expect(gridScroll).toBeVisible();

  // Vérifier les dimensions du grid
  const gridBox = await gridScroll.boundingBox();
  console.log('Grid dimensions:', gridBox);

  // Vérifier que le contenu dépasse la hauteur du grid
  const scrollHeight = await gridScroll.evaluate(el => el.scrollHeight);
  const clientHeight = await gridScroll.evaluate(el => el.clientHeight);

  console.log(`scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

  // Vérifier qu'il y a du débordement
  expect(scrollHeight).toBeGreaterThan(clientHeight);

  // Vérifier que la scrollbar peut se déplacer
  const initialScrollTop = await gridScroll.evaluate(el => el.scrollTop);
  console.log(`scrollTop initial: ${initialScrollTop}`);

  // Scroller vers le bas
  await gridScroll.evaluate(el => el.scrollTop = 100);
  const newScrollTop = await gridScroll.evaluate(el => el.scrollTop);
  console.log(`scrollTop après scroll: ${newScrollTop}`);

  expect(newScrollTop).toBeGreaterThan(initialScrollTop);

  // Prendre une screenshot pour vérifier visuellement
  await page.screenshot({ path: '/tmp/dinos-grid-scroll.png' });
});
