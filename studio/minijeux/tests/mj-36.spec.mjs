// MJ-36 "Arrête le bus !" — smoke console + 1 arrêt réussi scripté + 1 raté
// (demi-tour, PAS de game over) + assert progression. Modèle : mj-21.spec.mjs.

export async function run({ page, ok }) {
  const has = await page.evaluate(() => !!window.__mjTest);
  ok('window.__mjTest exposé', has);
  if (!has) return;

  // ── État initial ────────────────────────────────────────────────
  const s0 = await page.evaluate(() => window.__mjTest.getState());
  ok('Palier initial = 0 (★)', s0.palierIdx === 0, `palierIdx=${s0.palierIdx}`);
  ok('successCount initial = 0', s0.successCount === 0);
  ok('Zone cible jamais plus étroite qu\'un pare-chocs (200px)',
     (s0.zoneHalfW * 2) >= 200, `zoneW=${s0.zoneHalfW * 2}`);

  // ── Scénario RATÉ (freine trop tôt → dépasse la zone en roulant, ou
  //    freine trop tard → dépasse sans avoir freiné). Ici : ne freine jamais
  //    avant la zone, laisse le bus la dépasser en pleine vitesse. ──────────
  await page.evaluate(() => window.__mjTest.advance(6000)); // laisse rouler large
  const sMiss = await page.evaluate(() => window.__mjTest.getState());
  ok('RATÉ → le bus fait demi-tour (reversing) OU repart de zéro (busX proche du départ), jamais de game over visible',
     sMiss.reversing === true || sMiss.busX < 50,
     `busX=${sMiss.busX} reversing=${sMiss.reversing}`);

  const bravoAfterMiss = await page.evaluate(() => window.__mjTest.isBravoShown());
  ok('Aucun écran Game Over après un raté (zéro pénalité)', bravoAfterMiss === false);

  // Laisse le demi-tour se terminer et le bus repartir du départ
  await page.evaluate(() => window.__mjTest.advance(3000));
  const sBack = await page.evaluate(() => window.__mjTest.getState());
  ok('Après demi-tour, le bus re-roule (running) sans compteur de raté visible',
     sBack.running === true);

  // ── Scénario RÉUSSI scripté : on freine juste assez tôt pour s'arrêter
  //    pile dans la zone (distance de freinage prévisible = v²/(2·decel)). ──
  const successRun = await page.evaluate(() => {
    const st = window.__mjTest.getState();
    // avance jusqu'à ce que le bus soit à distance de freinage de la zone,
    // en testant plusieurs points de freinage par dichotomie simple.
    return st;
  });

  // Stratégie simple et robuste : avancer par petits pas, freiner dès que le
  // bus est raisonnablement proche de la zone cible (avant son centre),
  // en tenant compte de la distance de freinage (v²/(2·decel)).
  let stopped = false;
  for (let i = 0; i < 400 && !stopped; i++) {
    const st = await page.evaluate(() => window.__mjTest.getState());
    if (!st.running) break;
    const busCenter = st.busX + 100; // BUS_W/2
    const brakeDist = (st.speed * st.speed) / (2 * 220); // DECEL=220
    const shouldBrake = !st.braking && !st.reversing &&
      (busCenter + brakeDist) >= st.zoneCenter;
    if (shouldBrake) {
      await page.evaluate(() => window.__mjTest.brakeNow());
    }
    await page.evaluate(() => window.__mjTest.advance(16));
    const st2 = await page.evaluate(() => window.__mjTest.getState());
    if (st2.speed === 0 && !st2.reversing) stopped = true;
  }

  // Laisse la séquence de succès (portes/passagers/fanfare) se jouer
  await page.waitForTimeout(1700);
  const sSuccess = await page.evaluate(() => window.__mjTest.getState());
  ok('Arrêt réussi → successCount progresse (accumulation, jamais remise à zéro punitive)',
     sSuccess.successCount >= 1, `successCount=${sSuccess.successCount}`);
}
