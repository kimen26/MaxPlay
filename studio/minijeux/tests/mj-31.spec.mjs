// Pilote MJ-31 — Le grand voyage du temps : associer un dino (ombre) à sa bande d'époque.
//
// Note timing (2026-07-08, fix audio EP) : nextQuestion() n'est plus déclenché par un setTimeout
// à durée fixe mais attend la VRAIE fin de l'annonce d'époque (MP3 période -> TTS date -> onComplete),
// cf. goToNextAfterAnnounce() dans mj-31.html. En Chromium headless, speechSynthesis n'a aucune voix
// (0 voix dispo) donc l'utterance ne déclenche jamais onend naturellement : le filet de sécurité de
// ~12s (dans speak()) + le filet de ~12s de goToNextAfterAnnounce() prennent le relais. On attend donc
// large ici (jusqu'à 14s).
//
// IMPORTANT : on synchronise sur data-qcount (posé par nextQuestion() sur #app), PAS sur les billes
// .pip — celles-ci se colorent SYNCHRONE dans answer() dès la réponse correcte, bien AVANT que
// goToNextAfterAnnounce()/nextQuestion() n'aient fini leur chaîne audio. Attendre les billes fait
// cliquer une 2e fois pendant que la question précédente est encore verrouillée (qcm.locked) — le
// clic est ignoré, et le test attend alors sur la mauvaise transition (bug de synchro démasqué 2026-07-08).
async function waitQCount(page, expected) {
  await page.waitForFunction(
    (n) => document.getElementById('app').dataset.qcount === String(n),
    expected,
    { timeout: 14000 }
  );
}

export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('DINOS chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 40));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.band', { timeout: 5000 });
  const nBands = await page.locator('.band').count();
  ok('Niveau 1 (L0) = 4 bandes (pas de bande "avant les dinosaures")', nBands === 4, `bands=${nBands}`);
  ok('Pas de bande permien en niveau 1', (await page.locator('.band[data-periode="permien"]').count()) === 0);
  ok('1 seule bonne bande désignée', (await page.locator('.band[data-correct="1"]').count()) === 1);
  ok('ombre du dino affichée', await page.evaluate(() => {
    const img = document.querySelector('#dinoCard img');
    return !!img && img.getAttribute('src').includes('ombres') && img.getAttribute('src').includes('_ombre.png');
  }));
  ok('nom du dino écrit', (await page.textContent('#dinoName')).trim().length > 0);

  // Chemin gagnant : taper la bonne bande N fois de suite (N = questions niveau 1 = 4, standard golden)
  const totalQ = await page.locator('.pip').count();
  let sawWaitBeforeAnnounceEnd = false;
  for (let q = 1; q <= totalQ; q++) {
    await waitQCount(page, q); // attend que la question q soit vraiment démarrée (nextQuestion a tourné)
    const meteorUp = await page.locator('.meteor-screen').count();
    if (meteorUp > 0) break; // finale démarrée plus tôt que prévu (ne devrait pas arriver avant la fin)
    const btn = page.locator('.band[data-correct="1"]');
    await btn.waitFor({ state: 'visible', timeout: 4000 });
    await btn.click();
    // Verrou anti-régression : juste après le clic, la question SUIVANTE ne doit pas avoir déjà
    // démarré (data-qcount ne doit pas encore avoir avancé) — sinon l'annonce d'époque en cours
    // aurait été coupée par un nextQuestion() prématuré (ancien bug setTimeout à durée fixe).
    await page.waitForTimeout(200);
    const qcountRightAfterClick = await page.evaluate(() => document.getElementById('app').dataset.qcount);
    if (qcountRightAfterClick === String(q)) sawWaitBeforeAnnounceEnd = true;
    if (q < totalQ) await waitQCount(page, q + 1);
  }
  ok('nextQuestion() n\'est pas appelé avant la fin de l\'annonce d\'époque (pas de coupe audio)',
     sawWaitBeforeAnnounceEnd);

  // Toutes les billes doivent être vertes (sans-faute)
  const v1 = await page.locator('.pip.v1').count();
  ok(`${totalQ} bonnes réponses → ${totalQ} billes vertes`, v1 === totalQ, `billes vertes=${v1}`);

  // Au moins une vignette de dino s'est posée dans une bande (frise peuplée)
  const nSlots = await page.locator('.band-slot').count();
  ok('la frise se peuple de vignettes posées', nSlots >= totalQ, `slots=${nSlots}`);

  // Traverse la finale météorite : 4 tableaux plein écran, un tap chacun
  // (1er waitForSelector plus large : la dernière annonce d'époque doit d'abord finir sa chaîne
  //  MP3 + TTS + respiration avant que startMeteorFinale() ne démarre — même logique que waitQCount.)
  for (let i = 0; i < 4; i++) {
    await page.waitForSelector('.meteor-screen', { timeout: i === 0 ? 14000 : 4000 });
    const n = await page.locator('.meteor-screen').count();
    ok(`tableau météorite ${i + 1}/4 affiché`, n === 1);
    await page.click('.meteor-screen');
    await page.waitForTimeout(300);
  }

  // Écran de fin standard golden atteint (étoile sans-faute)
  await page.waitForSelector('.end-wrap', { timeout: 4000 });
  ok('écran de fin affiché après la finale météorite', (await page.locator('.end-wrap').count()) === 1);
}
