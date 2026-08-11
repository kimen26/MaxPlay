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

  // Panneau règle v3 (savant fou 🧑‍🔬) : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit
  // mj-shell) → on vérifie puis on le ferme pour dérouler le jeu.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('DINOS chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 40));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.band', { timeout: 5000 });
  const nBands = await page.locator('.band').count();
  // 2026-08-10 (#6381) : la bande « Avant les dinosaures » (permien) est là DÈS le niveau 1
  ok('Niveau 1 (L0) = 5 bandes (dont "avant les dinosaures")', nBands === 5, `bands=${nBands}`);
  ok('Bande permien ("avant les dinos") présente dès le niveau 1',
    (await page.locator('.band[data-periode="permien"]').count()) === 1);
  ok('1 seule bonne bande désignée', (await page.locator('.band[data-correct="1"]').count()) === 1);
  ok('ombre du dino affichée', await page.evaluate(() => {
    const img = document.querySelector('#dinoCard img');
    return !!img && img.getAttribute('src').includes('ombres') && img.getAttribute('src').includes('_ombre.png');
  }));
  ok('nom du dino écrit', (await page.textContent('#dinoName')).trim().length > 0);

  // ZÉRO ascenseur (règle transverse PY 2026-08-10) : tout tient dans la hauteur d'écran
  ok('pas d\'ascenseur : tout tient dans l\'écran au démarrage', await page.evaluate(() =>
    document.documentElement.scrollHeight <= window.innerHeight + 1),
    await page.evaluate(() => `scroll=${document.documentElement.scrollHeight} inner=${window.innerHeight}`));

  // Chemin gagnant : taper la bonne bande N fois de suite (N = questions niveau 1 = 4, standard golden)
  const totalQ = await page.locator('.pip').count();
  let sawWaitBeforeAnnounceEnd = false;
  for (let q = 1; q <= totalQ; q++) {
    await waitQCount(page, q); // attend que la question q soit vraiment démarrée (nextQuestion a tourné)
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

  // ZÉRO ascenseur même avec la frise peuplée (retour PY #6381 : « il faut scroller
  // pour voir le dernier élément en bas, terrible »)
  ok('pas d\'ascenseur avec la frise peuplée', await page.evaluate(() =>
    document.documentElement.scrollHeight <= window.innerHeight + 1),
    await page.evaluate(() => `scroll=${document.documentElement.scrollHeight} inner=${window.innerHeight}`));

  // 2026-08-10 (#6381, défigeage PY) : PLUS de finale météorite — sortie standard directe.
  // (1er waitForSelector large : la dernière annonce d'époque finit sa chaîne MP3 + TTS
  //  + respiration avant showEnd — même logique que waitQCount.)
  ok('plus de finale météorite (aucun tableau plein écran)', (await page.locator('.meteor-screen').count()) === 0);
  await page.waitForSelector('.end-wrap', { timeout: 14000 });
  ok('écran de fin standard atteint directement après la dernière question',
    (await page.locator('.end-wrap').count()) === 1);
}
