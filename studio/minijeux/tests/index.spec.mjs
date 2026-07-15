// Pilote la COQUE MaxPlay (index.html, Design System v1 juillet 2026) :
// tiroirs data-driven, profil, étoiles, déblocage séquentiel, modale code dino.
// Vert = coque saine.
export async function run({ page, ok }) {
  const cls = async (id) => (await page.locator(`.game[data-id="${id}"]`).getAttribute('class')) || '';

  const games = await page.locator('.game').count();
  ok('jeux générés depuis le catalogue (≥ 18)', games >= 18, `count=${games}`);

  // MENU v2 (2026-07-16) : 5 tiroirs (dinos, couleurs, compter&lire, casse-têtes, monde&libre)
  const drawers = await page.locator('.mp-drawer').count();
  ok('tiroirs par catégorie (= 5, menu v2)', drawers === 5, `drawers=${drawers}`);
  ok('un seul tiroir ouvert', (await page.locator('.mp-drawer.open').count()) === 1);
  const drawerLabels = await page.locator('.mp-drawer-head').allTextContents();
  ok('plus de tiroir 🆕 « nouveaux »', !drawerLabels.some(t => /nouveaux/i.test(t)), drawerLabels.join('|'));

  ok('profil : avatar présent', (await page.locator('#profil-avatar').count()) === 1);
  ok('profil : compteur ⭐ global', /⭐ \d+/.test((await page.locator('#stars-total').textContent()) || ''));

  ok('mj-04 ouvert (1er de Compter)',     !(await cls('mj-04')).includes('locked'));
  ok('mj-09 ouvert (1er de Couleurs)',    !(await cls('mj-09')).includes('locked'));
  ok('mj-13c verrouillé (2e de Compter)', (await cls('mj-13c')).includes('locked'));
  ok('mj-12 (accès libre) ouvert',        !(await cls('mj-12')).includes('locked'));

  // encyclopédie épinglée = entrée dinos, verrouillée par code
  ok('encyclopédie épinglée verrouillée + raison "code"',
     (await page.locator('#ency').getAttribute('data-reason')) === 'code');

  // clic sur l'encyclopédie → modale code
  await page.locator('#ency').click();
  ok('modale code ouverte au clic encyclopédie', (await page.locator('#code-modal.show').count()) === 1);

  // mauvais code → reste verrouillé + message
  await page.fill('#code-input', 'NON');
  await page.click('#code-go');
  await page.waitForTimeout(150);
  ok('mauvais code → encore verrouillé', ((await page.locator('#ency').getAttribute('class')) || '').includes('locked'));
  ok('mauvais code → message affiché',   (((await page.locator('#code-msg').textContent()) || '').trim().length) > 0);

  // bon code (tolère minuscules) → débloqué + modale fermée
  await page.fill('#code-input', 'tritri');
  await page.click('#code-go');
  await page.waitForTimeout(250);
  ok('bon code → encyclopédie débloquée', !((await page.locator('#ency').getAttribute('class')) || '').includes('locked'));
  ok('bon code → modale fermée',          (await page.locator('#code-modal.show').count()) === 0);

  // toggle tiroir : en ouvrir un autre ferme le premier
  await page.locator('.mp-drawer-head').nth(2).click();
  await page.waitForTimeout(150);
  ok('toggle tiroir : toujours 1 seul ouvert', (await page.locator('.mp-drawer.open').count()) === 1);

  // ── rangée ⭐ « Tes jeux » (menu v2) : jeu du jour toujours présent ──
  // Fresh state (aucun épinglé, aucun joué) → la rangée montre au moins le jeu du jour.
  const pinsVisible = await page.locator('#pins-wrap').isVisible();
  ok('rangée ⭐ visible (au moins le jeu du jour)', pinsVisible);
  if (pinsVisible) {
    ok('rangée ⭐ : carte « jeu du jour » mise en avant',
       (await page.locator('.pin-card.today').count()) === 1);
    // clic sur le jeu du jour → navigue vers un mj-XX.html
    const url = await page.locator('.pin-card.today').getAttribute('data-url');
    ok('jeu du jour pointe vers un jeu jouable', /^mj-\d/.test(url || ''), `url=${url}`);
  }
}
