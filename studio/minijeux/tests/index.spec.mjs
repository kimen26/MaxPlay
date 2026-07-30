// index.spec.mjs — Smoke de la COQUE « La Vallée » (Mur v2, spec 2026-07-29).
// Réécrit 2026-07-30 (l'ancien testait le menu accordéon v2, mort 2 refontes
// avant — dette tracée depuis le Mur). Piloté par run.mjs :
//   npm run mj:test index
// Le détail vallée/monde dino vit dans mur-nid.spec.mjs (mock) et
// nid-e2e.spec.mjs (réel) — ici : la coque saine, header, gate parents, code.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // ── header 1 ligne : identité + raccourcis collection ─────────────────
  ok('profil : avatar présent', (await page.locator('#profil-avatar').count()) === 1);
  ok('profil : compteur ⭐ global', /⭐ \d+/.test((await page.locator('#stars-total').textContent()) || ''));
  ok('raccourci 🥚 (chambre) présent', (await page.locator('#hdr-oeufs').count()) === 1);
  ok('raccourci 🦕 (Padidi) présent', (await page.locator('#hdr-padidi').count()) === 1);

  // ── la vallée : 6 copains, décor ──────────────────────────────────────
  await page.waitForSelector('.v-copain', { timeout: 5000 });
  ok('6 copains dans la vallée', (await page.locator('.v-copain').count()) === 6);
  ok('décor posé (≥5 éléments)', (await page.locator('.v-decor').count()) >= 5);
  ok('le Roi T-Rex lit son livre', (await page.locator('.v-roi .v-livre').count()) === 1);
  // Roi remonté (retour PY 2026-07-30) : jamais collé au bord bas
  const roiOk = await page.evaluate(() => {
    const r = document.querySelector('.v-roi').getBoundingClientRect();
    return r.bottom < innerHeight - 60;
  });
  ok('le Roi n\'est pas collé au bord bas de l\'écran', roiOk);

  // ── bulle copain : TOUT visible en lignes (wrap), pas d'ascenseur ─────
  await page.click('.v-copain[data-copain="troudi"]', { force: true });
  await page.waitForSelector('.v-bulle .vb-jeu', { timeout: 3000 });
  const noHScroll = await page.evaluate(() => {
    const el = document.querySelector('.vb-jeux');
    return el.scrollWidth <= el.clientWidth + 1;
  });
  ok('bulle : aucun défilement horizontal (tout en 2-3 lignes)', noHScroll);
  await page.click('.vb-close');

  // ── gate parents : dans le mini-menu de l'avatar, appui 3 s + question ─
  await page.click('#profil-avatar');
  ok('mini-menu avatar visible', await page.locator('#avatar-menu').isVisible());
  await page.click('#parents-btn');
  ok('modale gate ouverte', (await page.locator('#gate-modal.show').count()) === 1);
  ok('étape 1 = bouton à maintenir (pas d\'entrée directe)', await page.locator('#gate-hold').isVisible());
  await page.click('#gate-modal', { position: { x: 10, y: 10 } }); // referme (tap dehors)

  // ── modale code TRITRI : porte 📖 du Roi quand l'encyclo est verrouillée ─
  await page.click('.v-copain[data-copain="trex"]', { force: true });
  await page.waitForSelector('.vb-porte[data-porte="encyclo"]', { timeout: 3000 });
  await page.click('.vb-porte[data-porte="encyclo"]');
  ok('encyclo verrouillée → modale code ouverte (flux TRITRI inchangé)',
     (await page.locator('#code-modal.show').count()) === 1);
  // mauvais code → message, bon code → modale fermée (flux unlock.js complet)
  await page.fill('#code-input', 'NON');
  await page.click('#code-go');
  await page.waitForTimeout(200);
  ok('mauvais code → message affiché', (((await page.locator('#code-msg').textContent()) || '').trim().length) > 0);
  await page.fill('#code-input', 'tritri');
  await page.click('#code-go');
  await page.waitForTimeout(300);
  ok('bon code → modale fermée (dinos débloqués)', (await page.locator('#code-modal.show').count()) === 0);
}
