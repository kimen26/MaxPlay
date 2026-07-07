// Pilote MJ-30 — Range-les par taille : tri d'ombres dino du plus petit au plus grand (échelle honnête).
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

  ok('DINO_POOL chargé', await page.evaluate(() => typeof DINO_POOL !== 'undefined' && DINO_POOL.length >= 40));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('.shadow-tile', { timeout: 5000 });
  const nTiles = await page.locator('.shadow-tile').count();
  ok('Niveau 1 = 3 dinos à ranger', nTiles === 3, `tiles=${nTiles}`);
  const nSlots = await page.locator('.slot').count();
  ok('Autant de cases que de dinos', nSlots === nTiles);

  // Vérifie l'écart énorme L0 (ratio >= 3x entre voisins triés)
  const tailles = await page.$$eval('.shadow-tile', els => els.map(e => parseFloat(e.dataset.taille)).sort((a,b)=>a-b));
  for (let i = 1; i < tailles.length; i++) {
    ok(`L0 : ratio >= 3x entre voisins (${tailles[i-1]} → ${tailles[i]})`, tailles[i] / tailles[i-1] >= 3 - 1e-9);
  }

  // Bouton "C'est bon !" désactivé tant que tout n'est pas placé
  ok('Bouton validation désactivé au départ', await page.isDisabled('#validateBtn'));

  // Chemin gagnant scripté sur les 4 manches (mode tap : tuile puis case, dans l'ordre petit → grand)
  for (let q = 0; q < 4; q++) {
    await page.waitForSelector('.shadow-tile', { timeout: 4000 });
    const n = await page.locator('.shadow-tile').count();

    // Récupère les tuiles triées par data-taille croissant, puis tape tuile->case dans l'ordre
    const order = await page.$$eval('.shadow-tile', els =>
      els.map(e => ({ id: e.dataset.id, t: parseFloat(e.dataset.taille) }))
         .sort((a, b) => a.t - b.t)
         .map(e => e.id)
    );
    ok(`manche ${q + 1} : ${n} dinos à placer`, order.length === n);

    for (let i = 0; i < order.length; i++) {
      await page.click(`.shadow-tile[data-id="${order[i]}"]`);
      await page.click(`.slot[data-index="${i}"]`);
      await page.waitForTimeout(80);
    }

    if (q === 0) {
      // ── Audio (manche 1) : chaque placement annonce le nom du dino, et un 2e placement
      // stoppe le son du 1er (Papa Yann : "on ne voit pas bien qui c'est").
      const log = await page.evaluate(() => window.__audioLog);
      const plays = log.filter(e => e.action === 'play' && /-nom\.mp3$/.test(e.src));
      ok('chaque placement joue un MP3 "-nom.mp3" (au moins 3, un par dino placé)',
         plays.length >= order.length, JSON.stringify(log));
      ok('un 2e placement STOPPE le son du 1er avant de jouer le nouveau (pause() appelé)',
         log.some(e => e.action === 'pause'), JSON.stringify(log));
      const seq = log.map(e => e.action).join(',');
      ok('séquence attendue play→pause→play (stop-avant-jouer)', /play.*pause.*play/.test(seq), seq);
    }

    ok(`manche ${q + 1} : validation activée une fois tout placé`, !(await page.isDisabled('#validateBtn')));
    await page.click('#validateBtn');
    await page.waitForTimeout(500);

    // Révélation honnête : proportions réelles + mètres/tonnes affichés
    const revealShown = await page.evaluate(() => document.getElementById('revealWrap').style.display !== 'none');
    ok(`manche ${q + 1} : écran de révélation affiché`, revealShown);

    await page.waitForTimeout(1600); // laisse l'animation de redimensionnement se jouer
    const widths = await page.$$eval('.reveal-item img', els => els.map(e => e.getBoundingClientRect().width));
    ok(`manche ${q + 1} : les ombres ont des tailles visuellement distinctes à la révélation`,
      Math.max(...widths) - Math.min(...widths) > 20, `widths=${widths.join(',')}`);

    // Vérifie la bille verte de CETTE manche avant de passer à la suivante
    // (la 4e manche déclenche l'écran de fin qui remplace #pips — on lit donc avant le dernier clic next)
    const pipClass = await page.getAttribute(`#pip${q}`, 'class');
    ok(`manche ${q + 1} : bille verte (1er coup)`, /\bv1\b/.test(pipClass || ''), pipClass);

    await page.waitForSelector('#nextBtn.show', { timeout: 3000 });
    await page.click('#nextBtn');
    await page.waitForTimeout(400);
  }

  // Après la 4e manche, écran de fin golden (sans-faute → étoile)
  ok('écran de fin affiché après la dernière manche', await page.evaluate(() => !!document.querySelector('.end-wrap')));
}
