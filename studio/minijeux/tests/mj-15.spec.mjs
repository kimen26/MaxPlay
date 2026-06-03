// Pilote MJ-15 — L'intrus : paliers par critère (N1 = couleur évidente) + retry.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.bus-btn', { timeout: 5000 });
  const buses = await page.locator('.bus-btn').count();
  ok('5 bus affichés', buses === 5, `bus=${buses}`);

  // Win path : on tape les bus jusqu'à trouver l'intrus → le round avance (Round 2)
  let advanced = false;
  for (let i = 0; i < 5; i++) {
    const sel = `.bus-btn[data-idx="${i}"]`;
    if ((await page.locator(sel).count()) === 0) continue;
    await page.click(sel).catch(() => {});
    await page.waitForTimeout(1100);
    const lvl = (await page.locator('#level-label').textContent()) || '';
    if (/Round\s*2/.test(lvl)) { advanced = true; break; }
  }
  ok('intrus correct → round avance', advanced);
}
