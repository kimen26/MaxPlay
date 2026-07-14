// Pilote MJ-08 — Le grand rangement (refonte 2026-07-07, ex "Au centre bus" doublon MJ-09).
// Vérifie : structure manche 1 (2 bacs), chemin gagnant scripté (drag réel via mouse events
// qui déclenchent les pointerdown/move/up du jeu), passage manche 2, absence d'erreur JS.

async function dragItemToBin(page, itemEl, binEl) {
  const iBox = await itemEl.boundingBox();
  const bBox = await binEl.boundingBox();
  const fromX = iBox.x + iBox.width / 2, fromY = iBox.y + iBox.height / 2;
  const toX = bBox.x + bBox.width / 2, toY = bBox.y + bBox.height / 2;

  await page.mouse.move(fromX, fromY);
  await page.mouse.down();
  // Plusieurs pas intermédiaires : le jeu recalcule le bac le plus proche à chaque move
  await page.mouse.move(fromX + (toX - fromX) * 0.5, fromY + (toY - fromY) * 0.5, { steps: 4 });
  await page.mouse.move(toX, toY, { steps: 4 });
  await page.mouse.up();
}

export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle (gabarit mj-shell) : s'ouvre TOUT SEUL à la 1ʳᵉ partie
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // ── Manche 1 : structure ──
  ok('bandeau manche présent', (await page.locator('#roundBar').count()) === 1);
  ok('démarre en Manche 1', ((await page.locator('#roundBar').textContent()) || '').includes('Manche 1'));

  await page.waitForSelector('.bin', { timeout: 5000 });
  const binsRound1 = await page.locator('.bin').count();
  ok('🔒 Manche 1 = 2 bacs (objets bien distincts)', binsRound1 === 2, `bins=${binsRound1}`);

  await page.waitForSelector('.item', { timeout: 5000 });
  const itemsRound1 = await page.locator('.item').count();
  ok('Manche 1 a des objets à ranger', itemsRound1 > 0, `items=${itemsRound1}`);

  // ── Chemin gagnant scripté : ranger chaque item dans SON bac (dataset.binId) ──
  async function playRoundToVictory(expectedBins) {
    const bins = await page.locator('.bin').count();
    ok(`manche a ${expectedBins} bac(s) attendu(s)`, bins === expectedBins, `bins=${bins}`);

    let guard = 0;
    while (guard++ < 40) {
      const remaining = await page.locator('.item:not(.parked)').count();
      if (remaining === 0) break;

      const itemHandle = page.locator('.item:not(.parked)').first();
      const binId = await itemHandle.evaluate(el => el.dataset.binId);
      const binHandle = page.locator(`.bin[data-bin="${binId}"]`);
      await dragItemToBin(page, itemHandle, binHandle);
      await page.waitForTimeout(120);
    }
    const stillRemaining = await page.locator('.item:not(.parked)').count();
    ok('tous les objets rangés (chemin gagnant)', stillRemaining === 0, `restants=${stillRemaining}`);
  }

  await playRoundToVictory(2);

  // Overlay de fin de manche 1 → bouton "manche suivante"
  const overlayShown = await page.waitForFunction(
    () => document.getElementById('victoryOverlay')?.classList.contains('show'),
    null, { timeout: 5000 }
  ).then(() => true).catch(() => false);
  ok('overlay fin de manche 1 affiché', overlayShown);

  await page.click('#btnNextRound');
  await page.waitForFunction(
    () => !document.getElementById('victoryOverlay')?.classList.contains('show'),
    null, { timeout: 3000 }
  ).catch(() => {});

  // ── Manche 2 : structure ──
  ok('passe en Manche 2', ((await page.locator('#roundBar').textContent()) || '').includes('Manche 2'));
  await page.waitForSelector('.bin', { timeout: 5000 });
  const binsRound2 = await page.locator('.bin').count();
  ok('🔒 Manche 2 = 3 bacs', binsRound2 === 3, `bins=${binsRound2}`);

  // Zéro pénalité punitive : pas de mot "perdu"/"raté" nulle part dans la page
  const bodyText = (await page.locator('body').innerText()) || '';
  ok('🔒 zéro pénalité punitive (pas de "perdu"/"raté")',
     !/perdu|raté|game over/i.test(bodyText), bodyText.slice(0, 60));
}
