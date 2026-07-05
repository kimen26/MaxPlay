// Pilote MJ-33 — Memory des ombres : associe l'ombre au dino en couleur.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('manifest dinos chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && Array.isArray(DINOS) && DINOS.length >= 8));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.card', { timeout: 5000 });
  const n = await page.locator('.card').count();
  ok('Niveau 1 = 4 paires = 8 cartes', n === 8, `cartes=${n}`);

  // Chaque dino apparaît exactement 2 fois (1 ombre + 1 couleur)
  const dinoCounts = await page.evaluate(() => {
    const counts = {};
    document.querySelectorAll('.card').forEach(c => {
      const id = c.dataset.dinoId;
      counts[id] = (counts[id] || 0) + 1;
    });
    return counts;
  });
  const allPairs = Object.values(dinoCounts).every(c => c === 2);
  ok('chaque dino a exactement 2 cartes (1 ombre + 1 couleur)', allPairs, JSON.stringify(dinoCounts));

  const kinds = await page.evaluate(() => {
    const map = {};
    document.querySelectorAll('.card').forEach(c => {
      const id = c.dataset.dinoId;
      (map[id] = map[id] || new Set()).add(c.dataset.kind);
    });
    return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, [...v].sort()]));
  });
  const allOmbreCouleur = Object.values(kinds).every(v => v.length === 2 && v[0] === 'couleur' && v[1] === 'ombre');
  ok('chaque paire = 1 ombre + 1 couleur (pas 2 images identiques)', allOmbreCouleur, JSON.stringify(kinds));

  ok('toutes les cartes dos visible au départ (aucune .flipped)', (await page.locator('.card.flipped').count()) === 0);

  // Chemin gagnant scripté : matche les paires programmatiquement via data-dino-id.
  for (let round = 0; round < 4; round++) {
    const dinoId = await page.evaluate(() => {
      const unmatched = [...document.querySelectorAll('.card:not(.matched)')];
      return unmatched[0]?.dataset.dinoId;
    });
    if (!dinoId) break;

    const [idxA, idxB] = await page.evaluate((id) => {
      return [...document.querySelectorAll('.card[data-dino-id="' + id + '"]')].map(c => c.dataset.index);
    }, dinoId);

    await page.click(`.card[data-index="${idxA}"]`);
    await page.waitForTimeout(150);
    await page.click(`.card[data-index="${idxB}"]`);
    await page.waitForTimeout(600); // laisse le flip 3D + resolveMatch tourner
  }

  const matched = await page.locator('.card.matched').count();
  ok('les 8 cartes (4 paires) sont matched après le chemin gagnant', matched === 8, `matched=${matched}`);

  const v1 = await page.locator('.pip.v1').count();
  ok('4 paires trouvées du 1er coup → 4 billes vertes', v1 === 4, `billes vertes=${v1}`);

  // Écran de fin (Golden.showEnd)
  const endShown = await page.waitForFunction(
    () => !!document.querySelector('.end-wrap'),
    null, { timeout: 5000 }
  ).then(() => true).catch(() => false);
  ok('écran de fin affiché (G.showEnd)', endShown);
}
