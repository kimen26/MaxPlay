// Pilote MJ-25 — Pareil pas pareil : trouver la silhouette identique à la référence.
// + progression Papa Yann 2026-07-07 ("zéro difficulté, but incompris") :
//   ★ niveau 0 = 2 choix très différents · ★★ niveau 1 = 3 choix cousins famille ·
//   ★★★ niveau 2 = leurres subtils (même image + filtre CSS hue-rotate/scaleX).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('data dinos chargée', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 50));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  ok('badge de palier affiché (★ Facile)', ((await page.locator('#tierBadge').textContent()) || '').includes('★'));
  ok('consigne visuelle "MÊME" affichée (jamais "Regarde")',
     ((await page.locator('.instruction-text').textContent()) || '').toLowerCase().includes('même')
     && !((await page.locator('.instruction-text').textContent()) || '').toLowerCase().includes('regarde'));

  await page.waitForSelector('#refCard img', { timeout: 5000 });
  ok('référence affichée', (await page.locator('#refCard img').count()) === 1);

  await page.waitForSelector('.dino-tile', { timeout: 5000 });
  const n = await page.locator('.dino-tile').count();
  ok('Niveau 1 = 2 choix', n === 2, `tiles=${n}`);
  ok('1 seule bonne réponse', (await page.locator('.dino-tile[data-correct="1"]').count()) === 1);

  // La bonne réponse a la même src que la référence
  const sameSrc = await page.evaluate(() => {
    const ref = document.querySelector('#refCard img').getAttribute('src');
    const good = document.querySelector('.dino-tile[data-correct="1"] img').getAttribute('src');
    return ref === good;
  });
  ok('la bonne tuile = la référence (même image)', sameSrc);

  // Chemin gagnant
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 4000 });
    await page.click('.dino-tile[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1400);
  }
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);

  // Vérifie le palier ★★★ (niveau 2) : leurres = MÊME image que la référence, avec un
  // filtre CSS (hue-rotate/scaleX) — pas juste "un autre dino". Sinon on n'aurait aucune
  // preuve de la progression de difficulté demandée par Papa Yann.
  // mj-25 est au catalogue (maxStars:3) → Stars.get dérive de tracker.js, pas d'un flag
  // direct : on sème 2 sessions "parfaites" dans maxplay_progress pour forcer le niveau 2.
  await page.evaluate(() => {
    localStorage.setItem('maxplay_progress', JSON.stringify({
      version: 1,
      sessions: [],
      games: { 'mj-25': {
        plays: 2, totalQuestions: 10, correctAnswers: 10, totalScore: 100, maxScore: 100,
        firstPlayed: new Date().toISOString(), lastPlayed: new Date().toISOString(), mastery: 'en-cours',
        history: [
          { questions: 4, correct: 4, score: 40, maxScore: 40 },
          { questions: 6, correct: 6, score: 60, maxScore: 60 },
        ],
      } },
    }));
  });
  await page.reload({ waitUntil: 'networkidle' });

  ok('badge ★★★ affiché au niveau max', ((await page.locator('#tierBadge').textContent()) || '').includes('★★★'));

  await page.waitForSelector('.dino-tile', { timeout: 5000 });
  const n3 = await page.locator('.dino-tile').count();
  ok('Niveau 3 (★★★) = 4 choix', n3 === 4, `tiles=${n3}`);

  const check = await page.evaluate(() => {
    const ref = document.querySelector('#refCard img').getAttribute('src');
    const tiles = [...document.querySelectorAll('.dino-tile img')];
    const sameSrcAll = tiles.every(im => im.getAttribute('src') === ref);
    const goodImg = document.querySelector('.dino-tile[data-correct="1"] img');
    const goodUnfiltered = getComputedStyle(goodImg).filter === 'none';
    const decoys = [...document.querySelectorAll('.dino-tile:not([data-correct="1"]) img')];
    const decoysFiltered = decoys.every(im => getComputedStyle(im).filter !== 'none');
    return { sameSrcAll, goodUnfiltered, decoysFiltered, decoyCount: decoys.length };
  });
  ok('★★★ : tous les leurres = MÊME image que la référence', check.sameSrcAll);
  ok('★★★ : la bonne réponse reste NON filtrée (image canon)', check.goodUnfiltered);
  ok('★★★ : tous les leurres portent un filtre CSS subtil (hue-rotate/scaleX)', check.decoysFiltered, `decoys=${check.decoyCount}`);
}
