// Pilote MJ-24 — Trouve le dino : reconnaissance famille par nom.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (validé) → on vérifie puis on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('data dinos chargée', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 50));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.dino-tile', { timeout: 5000 });
  const n = await page.locator('.dino-tile').count();
  ok('Niveau 1 = 3 choix', n === 3, `tiles=${n}`);
  ok('1 seule bonne réponse', (await page.locator('.dino-tile[data-correct="1"]').count()) === 1);
  ok('toutes les silhouettes ont une image', (await page.locator('.dino-tile img.sil').count()) === n);

  // ── Anti-régression "double validation" (retour Papa Yann : la 3e réponse
  // se refait 2 fois) : après une bonne réponse, TOUTES les tuiles doivent
  // être verrouillées immédiatement (pas seulement la tuile tapée), sinon
  // un tap rapide pendant la fenêtre de victoire peut retomber sur une
  // vieille tuile encore active et valider 2 questions d'un coup.
  await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 4000 });
  await page.click('.dino-tile[data-correct="1"]');
  await page.waitForTimeout(80);
  const allDisabled = await page.evaluate(() =>
    [...document.querySelectorAll('.dino-tile')].every(b => b.disabled));
  ok('Toutes les tuiles verrouillées juste après une bonne réponse', allDisabled);
  await page.waitForTimeout(1200); // laisse nextQuestion() s'installer (Q2)

  // ── Son d'erreur audible (retour Papa Yann : "on entend pas bien quand on
  // a fauté" — sndBuzz() synthé trop discret remplacé par le pool SoundPool
  // 'error' partagé, qui inclut déjà le son "prout" culte de la banque). ──
  await page.waitForSelector('.dino-tile:not([data-correct="1"])', { timeout: 6000 });
  await page.evaluate(() => {
    const orig = SoundPool.play;
    window.__errCalls = [];
    SoundPool.play = function (theme, vol) { window.__errCalls.push(theme); return orig.call(SoundPool, theme, vol); };
  });
  await page.click('.dino-tile:not([data-correct="1"])');
  await page.waitForTimeout(150);
  const errCalls = await page.evaluate(() => window.__errCalls);
  ok('Mauvaise réponse joue SoundPool.play(\'error\', ...)', errCalls.includes('error'), `calls=${JSON.stringify(errCalls)}`);
  await page.waitForTimeout(2200); // laisse la révélation (1800ms) passer avant la suite

  // Chemin gagnant : taper la bonne tuile jusqu'à la fin → toutes les billes se remplissent
  for (let q = 0; q < 4; q++) {
    const done = await page.evaluate(() => !document.querySelector('.pip.todo, .pip.cur'));
    if (done) break;
    await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 4000 }).catch(() => {});
    await page.click('.dino-tile[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1500);
  }
  const doneAll = await page.evaluate(() => !document.querySelector('.pip.todo, .pip.cur'));
  ok('Toutes les questions restantes complétées (pips remplis)', doneAll);
}
