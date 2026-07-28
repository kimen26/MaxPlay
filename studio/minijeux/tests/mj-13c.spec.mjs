// Pilote MJ-13c — Combien avant ? : paliers = taille de la file (N1 = 3 bus).
// Rollout difficulté 2026-06-02/03 (catégorie Compter). Migré gabarit js/mj-shell.js (2026-07-14).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Fermer le splash d'intro s'il est là
  const splash = page.locator('.mp-intro-splash');
  if (await splash.count()) await splash.click({ timeout: 1500 }).catch(() => {});
  await page.waitForSelector('.mp-intro-splash', { state: 'detached', timeout: 4000 }).catch(() => {});

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie → on vérifie puis on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('piste golden (pips) présente', (await page.locator('#pips .pip').count()) === 8);

  await page.waitForSelector('.fiche', { timeout: 5000 });
  const fiches = await page.locator('.fiche').count();
  ok('Niveau 1 = file de 3 bus', fiches === 3, `fiches=${fiches}`);

  await page.waitForSelector('.btn-count[data-correct="1"]', { timeout: 5000 });
  await page.click('.btn-count[data-correct="1"]');
  await page.waitForTimeout(500);
  const qt = (await page.locator('#q-text').textContent()) || '';
  ok('réponse correcte → Bravo', /bravo/i.test(qt), `q="${qt.slice(0, 40)}"`);
}
