// Pilote MJ-19 — Trouve le bus : paliers de difficulté + manches dino mélangées.
// Régression corrigée 2026-06-02 : N1 partait à 50-80 bus rapides (injouable, a énervé Max).
// Désormais N1 = 10-12 bus lents. On vérifie le palier d'entrée + un tap gagnant.
// 2026-08-10 (annotation #6311) : manches DINO mélangées aux manches bus
// (manche 0 TOUJOURS bus — entrée douce + stabilité harnais ; ≥2 manches dino
// garanties par partie au N0). Distracteurs dino de familles différentes.
export async function run({ page, ok }) {
  // Démarrage à froid (aucune étoile) → Niveau 1
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit mj-shell.js) → on ferme.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('piste golden (pips) présente', (await page.locator('#pips .pip').count()) === 7);

  // Manche 0 : TOUJOURS une manche bus (entrée douce, contrat 🔒 paliers)
  await page.waitForSelector('.bus-mover', { timeout: 5000 });
  const n = await page.locator('.bus-mover').count();
  ok('Niveau 1 = 10 à 12 bus (plus 50+)', n >= 10 && n <= 12, `count=${n}`);
  ok('manche 0 = manche bus (pas de dino)', (await page.locator('.dino-mover').count()) === 0);

  // Cible annoncée
  const target = ((await page.locator('.quest b').textContent()) || '').trim();
  ok('cible annoncée', target.length > 0, `target="${target}"`);

  // Un tap gagnant : dispatch direct sur la cible (repère data-correct posé par le jeu)
  const before = ((await page.locator('#pip0').textContent()) || '').trim();
  const targets = page.locator('.bus-mover[data-correct="1"]');
  ok('au moins une cible présente', (await targets.count()) > 0);
  await targets.first().dispatchEvent('click');
  await page.waitForTimeout(900);
  const after = ((await page.locator('#pip0').textContent()) || '').trim();
  ok('tap correct → bille golden avance', before !== after, `${before} -> ${after}`);

  // ── Partie complète : on clique la bonne cible à chaque manche ──
  // (cible mobile → dispatchEvent évite la flakiness d'un clic réel sur élément animé)
  let dinoRounds = 0, busRounds = 1; // manche 0 = bus déjà jouée
  let dinoTargetOk = false;
  for (let r = 1; r < 7; r++) {
    await page.waitForSelector('.bus-mover[data-correct="1"]', { timeout: 6000 });
    const isDino = (await page.locator('.dino-mover').count()) > 0;
    if (isDino) {
      dinoRounds++;
      // La cible dino est UNIQUE et annoncée par son nom dans la quest
      const q = ((await page.locator('.quest b').textContent()) || '').trim();
      const nCorrect = await page.locator('.dino-mover[data-correct="1"]').count();
      if (q.length > 0 && nCorrect === 1) dinoTargetOk = true;
    } else {
      busRounds++;
    }
    await page.locator('.bus-mover[data-correct="1"]').first().dispatchEvent('click');
    await page.waitForTimeout(1000);
  }
  ok('au moins 2 manches dino dans la partie (garanti par le plan)', dinoRounds >= 2, `dino=${dinoRounds} bus=${busRounds}`);
  ok('manche dino : cible unique + nom annoncé', dinoTargetOk);

  // Fin de partie standard
  await page.waitForSelector('.end-wrap', { timeout: 6000 }).catch(() => {});
  ok('écran de fin standard affiché après 7 manches', (await page.locator('.end-wrap').count()) === 1);
}
