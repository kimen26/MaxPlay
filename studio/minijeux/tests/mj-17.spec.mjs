// Pilote MJ-17 — Le garage : réparer TOTAL_BUS (8) bus au garage (drag-drop outils).
// Pas de figée. Smoke + vérifie l'écran de fin (playEndSound branché 2026-07-13, ex-silencieux).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit mj-shell.js) → on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  await page.waitForSelector('#bus-zone', { timeout: 5000 });

  ok('zone bus présente', (await page.locator('#bus-zone').count()) === 1);
  ok('score initial à 0', (((await page.locator('#score').textContent()) || '').trim()) === '0');

  // Déclenche l'écran de fin directement (chemin gagnant complet trop long à scripter en drag-drop).
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.evaluate(() => { window.showEnd(); });
  await page.waitForTimeout(300);

  const overlayText = (await page.locator('body').textContent()) || '';
  ok('écran de fin affiché (Bravo + score)', overlayText.includes('Bravo') && overlayText.includes('Score'));
  ok('aucune erreur JS au déclenchement de showEnd (playEndSound)', errors.length === 0, errors.join(' | '));
}
