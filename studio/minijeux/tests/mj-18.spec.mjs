// Pilote MJ-18 — Tubes de couleurs : paliers = nb de couleurs (N1 = 2 couleurs → 4 tubes).
// Résolution du puzzle trop fragile à scripter → on valide la structure du palier + smoke.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.tube', { timeout: 5000 });
  const tubes = await page.locator('.tube').count();
  ok('Niveau 1 = 2 couleurs → 4 tubes (2 + 2 vides)', tubes === 4, `tubes=${tubes}`);

  const cnt = ((await page.locator('#tubeCountVal').textContent()) || '').trim();
  ok('compteur couleurs = 2', cnt === '2', `cnt=${cnt}`);
}
