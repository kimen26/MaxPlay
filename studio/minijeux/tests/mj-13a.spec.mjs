// Pilote MJ-13a — Le premier bus : paliers = nb de bus + écart (N1 = 2 bus, écart net).
// Migré gabarit js/mj-shell.js (2026-07-14).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  const splash = page.locator('.mp-intro-splash');
  if (await splash.count()) await splash.click({ timeout: 1500 }).catch(() => {});
  await page.waitForSelector('.mp-intro-splash', { state: 'detached', timeout: 4000 }).catch(() => {});

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie → on vérifie puis on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.fiche', { timeout: 5000 });
  const fiches = await page.locator('.fiche').count();
  ok('Niveau 1 = 2 bus', fiches === 2, `fiches=${fiches}`);

  // Win path : on tape les fiches jusqu'à la bonne (la plus tôt) → "Bravo"
  const ids = await page.locator('.fiche').evaluateAll(els => els.map(e => e.id));
  let bravo = false;
  for (const id of ids) {
    await page.click('#' + id).catch(() => {});
    await page.waitForTimeout(450);
    const qt = (await page.locator('#q-text').textContent()) || '';
    if (/bravo/i.test(qt)) { bravo = true; break; }
  }
  ok('un tap correct → Bravo', bravo);
}
