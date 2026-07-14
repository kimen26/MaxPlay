// Pilote MJ-18 — Tubes de couleurs : paliers = nb de couleurs (N1 = 2 couleurs → 4 tubes).
// Résolution du puzzle trop fragile à scripter → on valide la structure du palier + smoke.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit mj-shell.js) → on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.tube', { timeout: 5000 });
  const tubes = await page.locator('.tube').count();
  ok('Niveau 1 = 2 couleurs → 4 tubes (2 + 2 vides)', tubes === 4, `tubes=${tubes}`);

  const cnt = ((await page.locator('#tubeCountVal').textContent()) || '').trim();
  ok('compteur couleurs = 2', cnt === '2', `cnt=${cnt}`);
}
