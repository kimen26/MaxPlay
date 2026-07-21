// MJ-48 — Tout le monde monte ! (Spino S3 — bus 2 fenêtres de 5, montées/descentes, file ordinale)
// Vérifie : gabarit shell, bus SVG canonique, plan 2×5, QCM avec la bonne réponse,
// question ordinale (tap file, 1ᵉʳ près de l'arrêt), chemin gagnant complet, zéro punitif.

export async function run({ page, ok }) {
  // ── Gabarit : panneau règle auto à la 1ʳᵉ partie ──
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // ── Bus SVG canonique ──
  ok('Bus rendu via busSVG()', await page.locator('#bus-top svg').count() === 1);

  // ── Ligne 162 : couleur du bus = couleur officielle IDFM lue depuis LIGNES,
  // jamais le fallback codé en dur. Anti-régression du bug "162 est rouge au
  // lieu de bleu" (retour Papa Yann 2026-07-22) : `window.LIGNES` était TOUJOURS
  // undefined (LIGNES est un `const` top-level, jamais posé sur window), donc
  // toute lecture via `window.LIGNES` retombait silencieusement sur le fallback
  // `#E2001A` (rouge) au lieu du bleu réel `#0064B1` de data.js.
  const busPanelFill = await page.evaluate(() => {
    const rects = [...document.querySelectorAll('#bus-top svg rect[fill]')];
    // la fenêtre destination est le seul rect coloré par la ligne (ni gris ni turquoise carrosserie)
    return rects.map(r => r.getAttribute('fill')).find(f => /^#/.test(f) && f !== '#1abc9c' && f !== '#ecf0f1' && f !== '#7f8c8d' && f !== '#458bba' && f !== '#111' && f !== '#FF4444' && f !== '#FFCC00');
  });
  ok('mj-48 : bus 162 rendu dans la couleur officielle IDFM (bleu #0064B1, pas le fallback rouge)',
     busPanelFill && busPanelFill.toUpperCase() === '#0064B1', `fill=${busPanelFill}`);

  // ── Plan 2 fenêtres de 5 (🔒 figée : jamais le bazar) ──
  ok('10 sièges en 2 rangées de 5', await page.locator('.siege').count() === 10
    && await page.locator('#rangee1 .siege').count() === 5);

  // ── Anti-régression "double validation" (retour Papa Yann : la 3e réponse
  // se refait 2 fois) : après une bonne réponse, TOUS les boutons QCM doivent
  // être verrouillés immédiatement, sinon un tap rapide pendant la fenêtre de
  // victoire peut retomber sur une vieille tuile encore active et valider
  // 2 questions d'un coup. Timing RÉEL (pas testMode, qui enchaîne à 0ms et
  // masquerait la fenêtre de course qu'on vérifie ici).
  await page.waitForSelector('.mjk-choices:not(.hidden) .mjk-choice', { timeout: 4000 });
  await page.click('.mjk-choice[data-correct="1"]');
  await page.waitForTimeout(80);
  const allDisabled48 = await page.evaluate(() =>
    [...document.querySelectorAll('.mjk-choice')].every(b => b.disabled));
  ok('Toutes les tuiles QCM verrouillées juste après une bonne réponse', allDisabled48);
  await page.waitForTimeout(3000); // laisse la transition (2.6s) se terminer avant la suite

  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0 : question comptage, bonne réponse présente dans le QCM ──
  await page.evaluate(() => { window.__mjTest.forceType('count'); window.__mjTest.setDifficulty(0); });
  await page.waitForSelector('.mjk-choices:not(.hidden) .mjk-choice', { timeout: 4000 });
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N0 : type count, ≤5 passagers', s0.type === 'count' && s0.correctAnswer >= 1 && s0.correctAnswer <= 5,
     `answer=${s0.correctAnswer}`);
  ok('N0 : sièges occupés = réponse attendue', s0.seated === s0.correctAnswer);
  ok('QCM 3 choix avec la bonne réponse', s0.choices.length === 3 && s0.choices.includes(String(s0.correctAnswer)));

  // ── Zones tap ≥ 80px ──
  const box = await page.locator('.mjk-choice').first().boundingBox();
  ok('Bouton QCM ≥ 80px', !!box && box.width >= 80 && box.height >= 80,
     box ? `${Math.round(box.width)}×${Math.round(box.height)}` : 'no-box');

  // ── Erreur = retry doux (pas de punition), puis réussite ──
  await page.evaluate(() => window.__mjTest.answer(false));
  const afterWrong = await page.evaluate(() => window.__mjTest.state);
  ok('Erreur : la question reste ouverte (retry)', afterWrong.roundLock === false);
  // testMode : la bonne réponse enchaîne IMMÉDIATEMENT la question suivante
  const qBefore = afterWrong.qCount;
  await page.evaluate(() => window.__mjTest.answer(true));
  const afterRight = await page.evaluate(() => window.__mjTest.state);
  ok('Bonne réponse : la manche avance', afterRight.qCount === qBefore + 1,
     `q ${qBefore} → ${afterRight.qCount}`);

  // ── Question ordinale : tap direct dans la file, le plan se range ──
  await page.evaluate(() => { window.__mjTest.forceType('ordinal'); window.__mjTest.next(); });
  await page.waitForSelector('.scene-row.ordinal .perso', { timeout: 4000 });
  const so = await page.evaluate(() => window.__mjTest.state);
  ok('Ordinal : file de 3-5, rang cible 2+', so.type === 'ordinal' && so.fileCount >= 3 && so.ordRank >= 2,
     `file=${so.fileCount} rang=${so.ordRank}`);
  ok('Ordinal : plan caché (focus sur la file)', await page.locator('.scene-row.ordinal #plan').isHidden());
  await page.evaluate(() => window.__mjTest.answer(true));
  const soDone = await page.evaluate(() => window.__mjTest.state);
  ok('Ordinal : tap du bon rang gagne la question', soDone.qCount === so.qCount + 1,
     `q ${so.qCount} → ${soDone.qCount}`);

  // ── Chemin gagnant complet (type count) → écran de fin standard golden ──
  await page.evaluate(() => { window.__mjTest.forceType('count'); window.__mjTest.setDifficulty(0); });
  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.mjk-choices:not(.hidden) .mjk-choice', { timeout: 4000 }).catch(() => {});
    await page.evaluate(() => window.__mjTest.answer(true));
    await page.waitForTimeout(150);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);

  // ── Zéro mot punitif ──
  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif', punitive === false);
}
