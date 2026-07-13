// Pilote MJ-17 — Le garage : réparer TOTAL_BUS (8) bus au garage (drag-drop outils).
// Pas de figée. Smoke + vérifie l'écran de fin (playEndSound branché 2026-07-13, ex-silencieux).
export async function run({ page, ok }) {
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
