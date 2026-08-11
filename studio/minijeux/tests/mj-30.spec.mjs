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

  // Panneau règle v3 (savant fou 🧑‍🔬) : s'ouvre TOUT SEUL à la 1ʳᵉ partie (validé
  // package v3) → on vérifie puis on le ferme pour dérouler le jeu.
  await page.waitForTimeout(800);
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  ok('bouton savant fou présent dans l\'en-tête', (await page.locator('#btn-regle').count()) === 1);
  ok('onglet avis (violet parent) présent', (await page.locator('#ri-tab-avis-btn').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé par « J\'ai compris ! »', (await page.locator('#ri-panneau.on').count()) === 0);

  // DINO_POOL est une const dans la closure MJ.ready() (gabarit mj-shell) — plus visible
  // depuis window après migration, on vérifie son effet (billes + tuiles) à la place.
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

  // ── Régressions retour PY 2026-08-10 (#6385) ─────────────────────────────
  // (a) UNE SEULE LIGNE même sur écran très étroit : les cartes rétrécissent,
  //     jamais de wrap ni de superposition (avant : « l'affichage explose » >3 cartes).
  await page.setViewportSize({ width: 270, height: 900 });
  await page.waitForTimeout(300);
  const geom = await page.evaluate(() => ({
    tops: [...document.querySelectorAll('.shadow-tile')].map(t => Math.round(t.getBoundingClientRect().top)),
    topsS: [...document.querySelectorAll('.slot')].map(t => Math.round(t.getBoundingClientRect().top)),
    right: Math.max(...[...document.querySelectorAll('.shadow-tile')].map(t => t.getBoundingClientRect().right)),
    vw: window.innerWidth,
  }));
  ok('écran 270px : les ombres restent sur UNE ligne (pas de wrap)', new Set(geom.tops).size === 1, JSON.stringify(geom.tops));
  ok('écran 270px : les cases restent sur UNE ligne', new Set(geom.topsS).size === 1, JSON.stringify(geom.topsS));
  ok('écran 270px : rien ne déborde de l\'écran', geom.right <= geom.vw + 1, `right=${geom.right} vw=${geom.vw}`);
  await page.setViewportSize({ width: 480, height: 900 });
  await page.waitForTimeout(300);

  // (b) Plus JAMAIS de placement verrouillé : reprise + échange autant qu'on veut.
  const ids0 = await page.$$eval('.shadow-tile', els => els.map(e => e.dataset.id));
  await page.click(`.shadow-tile[data-id="${ids0[0]}"]`);
  await page.click('.slot[data-index="0"]');
  await page.click(`.shadow-tile[data-id="${ids0[1]}"]`);
  await page.click('.slot[data-index="1"]');
  await page.waitForTimeout(120);
  ok('2 cartes posées → 2 cases remplies', (await page.locator('.slot.filled').count()) === 2);

  // reprise : tap sur la case pleine → la carte retourne en haut
  await page.click('.slot[data-index="0"]');
  await page.waitForTimeout(120);
  ok('tap case pleine = on REPREND la carte (case vidée)', (await page.locator('.slot.filled').count()) === 1);
  ok('bouton validation re-désactivé après reprise', await page.isDisabled('#validateBtn'));
  // on la repose ailleurs (tap carte → tap autre case)
  await page.click(`.shadow-tile[data-id="${ids0[0]}"]`);
  await page.click('.slot[data-index="2"]');
  await page.waitForTimeout(120);
  ok('reprise replacée ailleurs (case 2)', await page.evaluate(() =>
    document.querySelector('.slot[data-index="2"]').classList.contains('filled')));

  // échange par DRAG : case 2 → case 1 (pleine) → les deux cartes s'échangent
  const avant = await page.evaluate(() => ({
    s1: (document.querySelector('.slot[data-index="1"] img') || {}).src || '',
    s2: (document.querySelector('.slot[data-index="2"] img') || {}).src || '',
  }));
  const c2 = await page.locator('.slot[data-index="2"]').boundingBox();
  const c1 = await page.locator('.slot[data-index="1"]').boundingBox();
  await page.mouse.move(c2.x + c2.width / 2, c2.y + c2.height / 2);
  await page.mouse.down();
  await page.mouse.move(c1.x + c1.width / 2, c1.y + c1.height / 2, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(150);
  const apres = await page.evaluate(() => ({
    s1: (document.querySelector('.slot[data-index="1"] img') || {}).src || '',
    s2: (document.querySelector('.slot[data-index="2"] img') || {}).src || '',
  }));
  ok('drag case pleine → case pleine = ÉCHANGE des deux cartes',
    apres.s1 === avant.s2 && apres.s2 === avant.s1, JSON.stringify({ avant, apres }));

  // échange par TAP : carte sélectionnée + tap case pleine → remplacement,
  // l'occupant retourne en haut (re-jouable)
  const libre = await page.evaluate(() => {
    const t = [...document.querySelectorAll('.shadow-tile')].find(t => !t.classList.contains('placed'));
    return t ? t.dataset.id : null;
  });
  await page.click(`.shadow-tile[data-id="${libre}"]`);
  const occAvant = await page.evaluate(() => (document.querySelector('.slot[data-index="1"] img') || {}).src || '');
  await page.click('.slot[data-index="1"]');
  await page.waitForTimeout(120);
  const etatTap = await page.evaluate(() => ({
    s1: (document.querySelector('.slot[data-index="1"] img') || {}).src || '',
    nbFilled: document.querySelectorAll('.slot.filled').length,
    nbLibres: [...document.querySelectorAll('.shadow-tile')].filter(t => !t.classList.contains('placed')).length,
  }));
  ok('tap case pleine avec carte en main = ÉCHANGE (nouvelle carte en place)',
    etatTap.s1 !== occAvant && etatTap.s1 !== '', JSON.stringify(etatTap));
  ok('l\'occupant échangé est retourné en haut (re-jouable)', etatTap.nbFilled === 2 && etatTap.nbLibres === 1, JSON.stringify(etatTap));

  // on vide tout pour dérouler le chemin gagnant standard
  for (let i = 0; i < 3; i++) {
    const filled = await page.evaluate(idx =>
      document.querySelector(`.slot[data-index="${idx}"]`).classList.contains('filled'), i);
    if (filled) {
      await page.click(`.slot[data-index="${i}"]`);
      await page.waitForTimeout(80);
    }
  }
  ok('reset : plus rien de posé', (await page.locator('.slot.filled').count()) === 0);

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
      // Banque NOM SEUL (noms/<id>.mp3, 1.5-2s) — les <id>-nom.mp3 à plat sont
      // des fiches de 20-35s, bannies sur un tap (retour PY 2026-07-27).
      const plays = log.filter(e => e.action === 'play' && /noms\/[a-z]+\.mp3$/.test(e.src));
      ok('chaque placement joue le NOM SEUL (noms/<id>.mp3, au moins 3)',
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
