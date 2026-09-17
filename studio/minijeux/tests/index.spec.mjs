// index.spec.mjs — Smoke de la COQUE « L'Armoire » (HO-MJ-13, remplace La
// Vallée / Mur v2). Piloté par run.mjs :
//   npm run mj:test index
// Le détail multi-viewport/poids/casiers vit dans armoire.spec.mjs (lancé
// séparément, node studio/minijeux/tests/armoire.spec.mjs) — ici : la coque
// saine, header, gate parents, porte encyclo verrouillée → code TRITRI.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // ── fronton : identité + raccourcis œufs/album ─────────────────────────
  ok('profil : avatar présent', (await page.locator('#profil-avatar').count()) === 1);
  ok('profil : compteur ⭐ global', /⭐ \d+/.test((await page.locator('#stars-total').textContent()) || ''));
  ok('raccourci 🥚 (chambre) présent', (await page.locator('#hdr-oeufs').count()) === 1);
  ok('raccourci 📷 (Padidi) présent', (await page.locator('#hdr-padidi').count()) === 1);

  // ── l'armoire : grille de casiers, jamais d'ascenseur ──────────────────
  // HO-MJ-19 : l'armoire arrive PORTES FERMÉES, donc les cases existent mais
  // sont masquées — on attend qu'elles soient attachées, pas visibles, puis on
  // ouvre les deux zones comme le ferait l'enfant.
  await page.waitForSelector('.casier', { state: 'attached', timeout: 5000 });
  const nCasiers = await page.locator('.casier').count();
  ok('les 12 jeux sont rangés dans l\'armoire', nCasiers === 12, `count=${nCasiers}`);
  await page.click('.porte-haut.porte-g');
  await page.click('.porte-bas.porte-g');
  await page.waitForTimeout(800);
  ok('les deux zones s\'ouvrent à l\'appui sur un vantail',
     await page.locator('.casier').first().isVisible());
  const noScroll = await page.evaluate(() => {
    const de = document.documentElement;
    return de.scrollHeight <= innerHeight + 1 && de.scrollWidth <= innerWidth + 1;
  });
  ok('jamais d\'ascenseur sur la coque', noScroll);
  // La zone tactile est le calque `.tap`, pas la boîte du bouton : le bouton
  // FAIT la case du meuble (repère proportionnel 911 × 1480) et lui imposer un
  // plancher en pixels écrasait la géométrie — à 360 px les cases se
  // chevauchaient toutes (recette PY 2026-09-18). Plancher 48 px = règle
  // mobile (Material 48dp / Apple 44pt / WCAG AAA d'un coup).
  const tapOk = await page.evaluate(() =>
    [...document.querySelectorAll('.casier .tap, .objet .tap')].every(t => {
      const r = t.getBoundingClientRect();
      return r.width >= 48 && r.height >= 48;
    }));
  ok('zones tap des casiers ≥ 48×48 (règle mobile)', tapOk);

  // ── gate parents : dans le mini-menu de l'avatar, appui 3 s + question ─
  await page.click('#profil-avatar');
  ok('mini-menu avatar visible', await page.locator('#avatar-menu').isVisible());
  await page.click('#parents-btn');
  ok('modale gate ouverte', (await page.locator('#gate-modal.show').count()) === 1);
  ok('étape 1 = bouton à maintenir (pas d\'entrée directe)', await page.locator('#gate-hold').isVisible());
  await page.click('#gate-modal', { position: { x: 10, y: 10 } }); // referme (tap dehors)

  // ── porte verrouillée (encyclo) : le bouton « Dinos » de la vitrine
  // (HO-MJ-14 : Dinos/Monde vivent dans .objet de la vitrine, plus dans les
  // .casier de la grille de jeux tirée au hasard) ────────────────────────
  const locked = page.locator('#vit-dinos.locked');
  ok('Dinos (vitrine) verrouillé (encyclo tant que TRITRI non saisi)', (await locked.count()) === 1);
  await locked.click();
  ok('porte encyclo verrouillée → modale code ouverte (flux TRITRI inchangé)',
     (await page.locator('#code-modal.show').count()) === 1);
  // mauvais code → message, bon code → modale fermée + casier déverrouillé
  await page.fill('#code-input', 'NON');
  await page.click('#code-go');
  await page.waitForTimeout(200);
  ok('mauvais code → message affiché', (((await page.locator('#code-msg').textContent()) || '').trim().length) > 0);
  await page.fill('#code-input', 'tritri');
  await page.click('#code-go');
  await page.waitForTimeout(300);
  ok('bon code → modale fermée (dinos débloqués)', (await page.locator('#code-modal.show').count()) === 0);
  ok('après déblocage, Dinos (vitrine) n\'est plus verrouillé',
     (await page.locator('#vit-dinos.locked').count()) === 0);

  // ── deep-link ?open=nid (retour de mini-jeu, EP-120) ───────────────────
  await page.goto(page.url().split('?')[0] + '?open=nid', { waitUntil: 'networkidle' });
  const chambreOpen = await page.waitForSelector('#chambre-ov', { timeout: 5000 }).then(() => true).catch(() => false);
  ok('?open=nid ouvre la chambre des œufs au chargement', chambreOpen);
}
