// Pilote la COQUE MaxPlay (index.html) : rendu data-driven, sections,
// étoiles, déblocage séquentiel, modale code dino. Vert = coque saine.
export async function run({ page, ok }) {
  const cls = async (id) => (await page.locator(`.card[data-id="${id}"]`).getAttribute('class')) || '';

  const cards = await page.locator('.card').count();
  ok('cartes générées depuis le catalogue (≥ 18)', cards >= 18, `count=${cards}`);

  const sections = await page.locator('h2.section').count();
  ok('sections par catégorie (≥ 8)', sections >= 8, `sections=${sections}`);

  ok('mj-04 ouvert (1er de Compter)',     !(await cls('mj-04')).includes('locked'));
  ok('mj-01 ouvert (1er de Couleurs)',    !(await cls('mj-01')).includes('locked'));
  ok('mj-13c verrouillé (2e de Compter)', (await cls('mj-13c')).includes('locked'));
  ok('mj-12 (accès libre) ouvert',        !(await cls('mj-12')).includes('locked'));
  ok('dino verrouillé + raison "code"',
     (await page.locator('.card[data-id="dinos"]').getAttribute('data-reason')) === 'code');
  ok('mj-01 sans étoile au départ',       (await page.locator('.card[data-id="mj-01"] .star.on').count()) === 0);

  // clic sur dino → modale code
  await page.locator('.card[data-id="dinos"]').click();
  ok('modale code ouverte au clic dino',  (await page.locator('#code-modal.show').count()) === 1);

  // mauvais code → reste verrouillé + message
  await page.fill('#code-input', 'NON');
  await page.click('#code-go');
  await page.waitForTimeout(150);
  ok('mauvais code → dino encore verrouillé', (await cls('dinos')).includes('locked'));
  ok('mauvais code → message affiché',        (((await page.locator('#code-msg').textContent()) || '').trim().length) > 0);

  // bon code (tolère minuscules) → débloqué + modale fermée
  await page.fill('#code-input', 'tritri');
  await page.click('#code-go');
  await page.waitForTimeout(250);
  ok('bon code → dino débloqué',  !(await cls('dinos')).includes('locked'));
  ok('bon code → modale fermée',  (await page.locator('#code-modal.show').count()) === 0);
}
