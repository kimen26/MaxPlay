// MJ-51 — Le tri des lettres (Galli G2 — moteur tri-bacs mj-09, peau allographes)
// Vérifie : gabarit, N0 = 2 boîtes a/o + 6 tuiles 100% cursives, drop bon/mauvais,
// progression, victoire complète, zéro punitif.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);

  // ── 🔒 N0 : 2 boîtes (a/o), 6 tuiles, 100 % cursif ──
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('🔒 N0 : 2 boîtes a et o', s0.level === 0 && s0.boxes.join(',') === 'a,o', s0.boxes.join(','));
  ok('🔒 N0 : 6 tuiles', s0.deckSize === 6, `deck=${s0.deckSize}`);
  ok('🔒 N0 : toutes les tuiles en cursif', s0.allures.every(a => a === 'cur'), s0.allures.join(','));
  ok('Boîtes rendues', await page.locator('.lettre-box').count() === 2);
  ok('Tuiles rendues', await page.locator('.tile-lettre').count() === 6);

  // ── Zones tap ≥ 80px ──
  const box = await page.locator('.tile-lettre').first().boundingBox();
  ok('Tuile ≥ 80px', !!box && box.width >= 80 && box.height >= 80);

  // ── Mauvais drop : erreur comptée, la tuile revient ──
  await page.evaluate(() => window.__mjTest.drop(false));
  await page.waitForTimeout(500);
  const sErr = await page.evaluate(() => window.__mjTest.state);
  ok('Mauvais drop : erreur comptée, rien de rangé', sErr.errors === 1 && sErr.ranged === 0);

  // ── Chemin gagnant : tout ranger → overlay de fin ──
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.__mjTest.drop(true));
    await page.waitForTimeout(80);
  }
  const sFin = await page.evaluate(() => window.__mjTest.state);
  ok('Tout rangé (6/6)', sFin.ranged === 6);

  // ── Fin : converge directement vers l'écran STANDARD (gabarit golden),
  //     zéro overlay maison résiduel (mutualisation UI, ex .fin-overlay) ──
  await page.waitForSelector('.end-wrap', { timeout: 5000 });
  ok('écran de fin STANDARD (.end-wrap)', (await page.locator('.end-wrap').count()) === 1);
  ok('plus d’overlay maison (.fin-overlay)', (await page.locator('.fin-overlay').count()) === 0);

  // ── Plus de scorebar maison (remplacée par la piste golden) ──
  ok('plus de scorebar maison', (await page.locator('.scorebar').count()) === 0);

  // ── Zéro mot punitif ──
  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.body.innerText));
  ok('Zéro mot punitif', punitive === false);
}
