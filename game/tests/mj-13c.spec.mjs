// Pilote MJ-13c — Combien avant ? : paliers = taille de la file (N1 = 3 bus).
// Rollout difficulté 2026-06-02/03 (catégorie Compter).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Fermer le splash d'intro s'il est là
  const splash = page.locator('.mp-intro-splash');
  if (await splash.count()) await splash.click({ timeout: 1500 }).catch(() => {});
  await page.waitForSelector('.mp-intro-splash', { state: 'detached', timeout: 4000 }).catch(() => {});

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.fiche', { timeout: 5000 });
  const fiches = await page.locator('.fiche').count();
  ok('Niveau 1 = file de 3 bus', fiches === 3, `fiches=${fiches}`);

  await page.waitForSelector('.btn-count[data-correct="1"]', { timeout: 5000 });
  await page.click('.btn-count[data-correct="1"]');
  await page.waitForTimeout(500);
  const qt = (await page.locator('#q-text').textContent()) || '';
  ok('réponse correcte → Bravo', /bravo/i.test(qt), `q="${qt.slice(0, 40)}"`);
}
