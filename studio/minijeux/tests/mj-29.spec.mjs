// Pilote MJ-29 — La fabrique de noms : assemble les racines grec/latin d'un dino dans l'ordre.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('DINO_RACINES chargé', await page.evaluate(() => typeof DINO_RACINES !== 'undefined' && Object.keys(DINO_RACINES.dinos).length >= 40));
  ok('DINOS chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length > 10));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.slot', { timeout: 5000 });
  const nSlots0 = await page.locator('.slot').count();
  ok('Niveau 1 : dino à 2 racines → 2 cases', nSlots0 === 2, `slots=${nSlots0}`);
  const nBricks0 = await page.locator('.brick').count();
  ok('Niveau 1 : 0 distracteur → autant de briques que de cases', nBricks0 === nSlots0, `briques=${nBricks0}`);

  // Chemin gagnant sur les 4 dinos : cliquer la brique data-next="1" jusqu'à compléter chaque dino.
  for (let q = 0; q < 4; q++) {
    // Nombre de cases pour ce dino (2 ou 3 selon niveau, mais niveau reste 0/L0 tant qu'aucune étoile)
    const nSlots = await page.locator('.slot').count();
    for (let s = 0; s < nSlots; s++) {
      await page.waitForSelector('.brick[data-next="1"]', { timeout: 4000 });
      await page.click('.brick[data-next="1"]');
      // laisse le temps au vol + TTS + passage à la case suivante
      await page.waitForTimeout(650);
    }
    // le dino est complet : nom réuni affiché + image (le dernier clic déclenche vol 500ms
    // puis setTimeout(completeDino, 1400) — on attend l'évènement plutôt qu'un délai fixe fragile)
    const shownEl = await page.waitForSelector('.full-name.show', { timeout: 3000 }).catch(() => null);
    ok(`dino ${q + 1}/4 : nom complet affiché à l'assemblage`, !!shownEl);
    const imgSrc = await page.getAttribute('#dinoImg', 'src');
    ok(`dino ${q + 1}/4 : image dino chargée`, /img\/dinos\/.+\.(jpg|png|webp)$/i.test(imgSrc || ''), imgSrc);
    // la bille de CE dino est notée dès completeDino (avant le fondu vers le dino suivant / la fin)
    const pipClass = await page.evaluate(i => { const p = document.getElementById('pip' + i); return p ? p.className : null; }, q);
    ok(`dino ${q + 1}/4 : bille verte (0 erreur)`, /\bv1\b/.test(pipClass || ''), pipClass);
    // attend le passage au dino suivant (ou fin de partie) : nextDino() est schedulé à +2600ms de completeDino
    await page.waitForTimeout(2900);
  }

  // Fin de partie : écran de fin golden affiché (les pips ont été remplacés par la zone de badges)
  const endShown = await page.waitForSelector('.end-wrap', { timeout: 3000 }).catch(() => null);
  ok('4 dinos assemblés sans erreur → écran de fin golden affiché', !!endShown);

  // ─── Régression 2026-07-07 : le tap doit lire ET placer, y compris hors-ordre ───
  // Avant le fix, seule la brique du tour courant (data-next="1") posait quelque chose ;
  // taper une autre racine du même dino (mais pas encore "son tour") ne faisait que buzzer.
  // On rejoue une partie et, sur le 1er dino (2 racines, niveau 0, 0 distracteur), on clique
  // la 2e brique cible AVANT la 1re : les deux doivent quand même se poser puis compléter le dino.
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.brick[data-order]', { timeout: 5000 });
  const secondBrick = page.locator('.brick[data-order="1"]');
  await secondBrick.click();
  await page.waitForTimeout(700);
  const slot1FilledEarly = await page.evaluate(() => {
    const s = document.getElementById('slot1');
    return !!s && s.classList.contains('filled');
  });
  ok('tap hors-ordre (racine #2 avant #1) place quand même la brique dans sa case', slot1FilledEarly);
  const firstBrick = page.locator('.brick[data-order="0"]');
  await firstBrick.click();
  await page.waitForTimeout(700);
  const fullNameShown = await page.waitForSelector('.full-name.show', { timeout: 3000 }).catch(() => null);
  ok('dino complété après la 2e brique (ordre de tap inversé) → nom réuni affiché', !!fullNameShown);
}
