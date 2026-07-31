// Pilote MJ-33 — Memory des ombres : associe l'ombre au dino en couleur.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Espionne window.Audio : capture play()/pause() sans charger de vrai MP3 (offline-safe).
  await page.evaluate(() => {
    window.__audioLog = [];
    class FakeAudio {
      constructor(src) { this.src = src; this.paused = true; this.currentTime = 0; this.onended = null; }
      play() { this.paused = false; window.__audioLog.push({ src: this.src, action: 'play' }); return Promise.resolve(); }
      pause() { this.paused = true; window.__audioLog.push({ src: this.src, action: 'pause' }); }
    }
    window.Audio = FakeAudio;
  });

  // Panneau règle v3 (savant fou 🧑‍🔬) : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit
  // mj-shell) → on vérifie puis on le ferme pour dérouler le jeu.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

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

  // ── Audio : clic joue SEULEMENT le nom (pas tout le détail), et un 2e clic stoppe le 1er ──
  // On force volontairement un MISMATCH (2 dinos différents) pour observer play/pause sans
  // perturber les paires : le round est "raté" mais resolveMismatch remet tout à plat (aucune
  // carte matched), donc le chemin gagnant scripté ensuite repart d'un board intact.
  await page.evaluate(() => { window.__audioLog.length = 0; });
  const [idxFirst, idxSecond] = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.card')];
    const first = cards[0];
    const second = cards.find(c => c.dataset.dinoId !== first.dataset.dinoId);
    return [first.dataset.index, second.dataset.index];
  });
  await page.click(`.card[data-index="${idxFirst}"]`);
  await page.waitForTimeout(80);
  await page.click(`.card[data-index="${idxSecond}"]`);
  await page.waitForTimeout(1200); // laisse resolveMismatch tourner et tout remettre à plat

  const log = await page.evaluate(() => window.__audioLog);
  // Layout audio depuis la réorg : audio/dinos/<lang>/noms/<dino>.mp3
  // (ex-<dino>-nom.mp3 à plat). L'intention testée reste : le NOM seul,
  // jamais le détail long.
  ok('clic sur une carte joue le MP3 de NOM (noms/<dino>.mp3, pas le détail long)',
     log.some(e => e.action === 'play' && /noms\/[a-z0-9-]+\.mp3$/.test(e.src)), JSON.stringify(log));
  ok('cliquer une 2e carte STOPPE le son de la 1re avant de jouer le nouveau (pause() appelé)',
     log.some(e => e.action === 'pause'), JSON.stringify(log));
  // L'ordre doit être : play (carte 1), pause (stop carte 1), play (carte 2)
  const seq = log.map(e => e.action).join(',');
  ok('séquence attendue play→pause→play (stop-avant-jouer)', /play.*pause.*play/.test(seq), seq);
  ok('board intact après le mismatch de test (aucune carte matched, aucune flipped résiduelle)',
     (await page.locator('.card.matched').count()) === 0 && (await page.locator('.card.flipped').count()) === 0);

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

  // La toute 1re paire porte le flip raté du test audio (mismatch volontaire) → pas v1.
  // Les 3 paires suivantes sont trouvées du 1er coup → v1.
  const v1 = await page.locator('.pip.v1').count();
  ok('3 des 4 paires trouvées du 1er coup → 3 billes vertes (la 1re a le flip du test audio)', v1 === 3, `billes vertes=${v1}`);

  // Écran de fin (Golden.showEnd)
  const endShown = await page.waitForFunction(
    () => !!document.querySelector('.end-wrap'),
    null, { timeout: 5000 }
  ).then(() => true).catch(() => false);
  ok('écran de fin affiché (G.showEnd)', endShown);
}
