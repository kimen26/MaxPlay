// MJ-52 — La boîte à mots (Galli G3 — alphabet mobile, écrire avant lire)
// Vérifie : gabarit, guide syllabique, N0 = lettres du mot uniquement, pose dans l'ordre,
// erreur douce + aide lumineuse (jamais posée à sa place), N2 distracteurs, fin golden.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0 : mot simple, pool = QUE les lettres du mot ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N0 : un mot avec syllabes', s0.word.length >= 4 && s0.sylls.length >= 2, s0.word);
  ok('Guide syllabique : cartes = syllabes, cases = lettres',
     s0.syllabes === s0.sylls.length && s0.slots === s0.word.length);
  ok('🔒 N0 : pool = exactement les lettres du mot',
     [...s0.pool].sort().join('') === s0.word.split('').sort().join(''), `pool=${s0.pool}`);

  // ── Zones tap ≥ 80px ──
  const box = await page.locator('.tuile').first().boundingBox();
  ok('Tuile ≥ 80px', !!box && box.width >= 80 && box.height >= 80);

  // ── Erreur douce ×3 → la bonne tuile s'illumine (jamais posée toute seule) ──
  let wrongPossible = true;
  for (let i = 0; i < 3; i++) {
    const did = await page.evaluate(() => window.__mjTest.tap(false));
    if (!did) { wrongPossible = false; break; }
  }
  const sErr = await page.evaluate(() => window.__mjTest.state);
  if (wrongPossible) {
    ok('3 erreurs → aide lumineuse', (await page.locator('.tuile.aide').count()) === 1);
    ok('Rien n’est posé à la place de l’enfant', sErr.pos === 0);
  } else {
    ok('(mot sans mauvaise tuile possible — skip aide)', true);
  }

  // ── Construire le mot en entier → la manche avance ──
  const q0 = sErr.qCount;
  for (let i = 0; i < 8; i++) {
    const st = await page.evaluate(() => window.__mjTest.state);
    if (st.qCount !== q0 || st.roundLock) break;
    await page.evaluate(() => window.__mjTest.tap(true));
  }
  const sDone = await page.evaluate(() => window.__mjTest.state);
  ok('Mot construit : la manche avance', sDone.qCount === q0 + 1, `q ${q0} → ${sDone.qCount}`);

  // ── N2 : distracteurs présents dans le pool ──
  await page.evaluate(() => window.__mjTest.setDifficulty(2));
  const s2 = await page.evaluate(() => window.__mjTest.state);
  ok('N2 : pool > lettres du mot (distracteurs)', s2.pool.length > s2.word.length,
     `pool=${s2.pool.length} mot=${s2.word.length}`);

  // ── Chemin gagnant complet → écran de fin golden ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  for (let i = 0; i < 60; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.evaluate(() => window.__mjTest.tap(true));
    await page.waitForTimeout(40);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);

  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif', punitive === false);
}
