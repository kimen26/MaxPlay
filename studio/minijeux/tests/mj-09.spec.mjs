// Pilote MJ-09 — Trie les bus : paliers = nb familles + nb bus (N1 = 2 familles, 6 bus — passage 3★ 2026-07-14).
// Tri par drag trop fragile à scripter → on valide la structure du palier + smoke.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle (gabarit mj-shell) : s'ouvre TOUT SEUL à la 1ʳᵉ partie
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  await page.waitForSelector('.family-box', { timeout: 5000 });
  const boxes = await page.locator('.family-box').count();
  ok('Niveau 1 = 2 familles (boîtes)', boxes === 2, `boxes=${boxes}`);

  await page.waitForSelector('.bus-draggable', { timeout: 5000 });
  const buses = await page.locator('.bus-draggable').count();
  ok('Niveau 1 = 6 bus à trier', buses === 6, `buses=${buses}`);

  // ── Chemin gagnant : ranger tous les bus (programmatique, drag trop fragile) ──
  for (let i = 0; i < buses; i++) {
    await page.evaluate(() => window.__mjTest.parkNext());
    await page.waitForTimeout(60);
  }
  const sFin = await page.evaluate(() => window.__mjTest.state);
  ok('Tous les bus rangés', sFin.rangedCount === 6, `ranged=${sFin.rangedCount}`);

  // ── Défilé victoire (récap par famille) puis écran de fin STANDARD ──
  await page.waitForSelector('.parade-overlay.show', { timeout: 5000 });
  ok('Défilé de victoire affiché', (await page.locator('.parade-overlay.show').count()) === 1);
  await page.click('#paradeContinueBtn');
  await page.waitForSelector('.end-wrap', { timeout: 5000 });
  ok('écran de fin STANDARD (.end-wrap, plus d’écran maison)', (await page.locator('.end-wrap').count()) === 1);

  // ── Plus de scorebar/levelbar maison (remplacés par la piste golden) ──
  ok('plus de scorebar maison', (await page.locator('.scorebar').count()) === 0);
  ok('plus de bandeau levelbar maison', (await page.locator('#levelbar').count()) === 0);
}
