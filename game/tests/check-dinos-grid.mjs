import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const devDinosPath = path.resolve(__dirname, '../../site/dev-dinos.html');
const fileUrl = `file:///${devDinosPath.replace(/\\/g, '/')}`;

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('📖 Ouverture:', fileUrl);
    await page.goto(fileUrl);

    // Attendre que le DOM soit prêt
    await page.waitForSelector('#menu-scroll', { timeout: 5000 });
    console.log('✓ Page chargée');

    // Attendre un peu pour que JS se charge
    await page.waitForTimeout(300);

    // Simuler un click sur "Herbivores"
    console.log('\n📍 Clic sur Herbivores...');
    const herbBtn = await page.locator('text=🌿 Herbivores');
    if (await herbBtn.count() > 0) {
      await herbBtn.click();
      await page.waitForTimeout(500);
    } else {
      console.log('❌ Bouton Herbivores non trouvé');
      console.log('Tentative avec tous les cat-card...');
      await page.locator('.cat-card').first().click();
      await page.waitForTimeout(500);
    }

    // Vérifier les dimensions du grid
    const gridScroll = await page.locator('#grid-scroll');
    const boundingBox = await gridScroll.boundingBox();
    const scrollHeight = await gridScroll.evaluate(el => el.scrollHeight);
    const clientHeight = await gridScroll.evaluate(el => el.clientHeight);
    const isScrollable = scrollHeight > clientHeight;

    console.log('\n📊 Dimensions du grid:');
    console.log(`  Position/Taille: ${JSON.stringify(boundingBox)}`);
    console.log(`  scrollHeight (contenu total): ${scrollHeight}px`);
    console.log(`  clientHeight (hauteur visible): ${clientHeight}px`);
    console.log(`  Scrollable? ${isScrollable ? '✓ OUI' : '✗ NON'}`);

    if (!isScrollable) {
      console.log('\n❌ PROBLÈME DÉTECTÉ!');
      console.log('   Le grid n\'est PAS scrollable');
      console.log('   scrollHeight devrait être > clientHeight');
    } else {
      console.log('\n✓ Grid scrollable OK');
    }

    // Vérifier le CSS appliqué
    const computedStyle = await gridScroll.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        flex: style.flex,
        minHeight: style.minHeight,
        overflowY: style.overflowY,
        height: style.height,
        maxHeight: style.maxHeight,
      };
    });

    console.log('\n🎨 CSS appliqué:');
    console.log(JSON.stringify(computedStyle, null, 2));

    // Prendre une screenshot
    await page.screenshot({ path: '/tmp/dinos-herbivores.png', fullPage: false });
    console.log('\n📸 Screenshot: /tmp/dinos-herbivores.png');

  } catch (err) {
    console.error('❌ Erreur:', err.message);
  } finally {
    await browser.close();
  }
}

test();
