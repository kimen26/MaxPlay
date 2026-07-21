// Pilote MJ-27 — Lis le nom du dino : nom découpé en syllabes STATIQUES (chips, sans audio)
// + 6 vraies images headshot de l'encyclopédie. Max lit et trouve.
// Migré gabarit js/mj-shell.js (2026-07-14) — consigne:false (lecture pure, EP-033).
// Audio retiré (retour Papa Yann 2026-07-19) : plus de TTS syllabe ni de bouton 🔊 nom entier.
// Images corrigées 2026-07-22 : chemin réel img/dinos/paleoart/<Nom>_headshot.jpg (bug retour
// Papa Yann "les images ne s'affichent pas" — l'ancien chemin img/dinos/<png> n'existait nulle part).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());

  // Spy sur speechSynthesis AVANT le premier chargement (TTS.speak() capte les voix au load).
  await page.addInitScript(() => {
    window.__ttsCalls = [];
    const orig = window.SpeechSynthesisUtterance;
    window.SpeechSynthesisUtterance = function (text) {
      window.__ttsCalls.push(text);
      return new orig(text);
    };
    window.SpeechSynthesisUtterance.prototype = orig.prototype;
  });
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 : s'ouvre TOUT SEUL à la 1ʳᵉ partie (n'appelle PAS speechSynthesis
  // tant qu'on ne tape pas "Écoute toutes les règles" — compatible EP-033).
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('DINOS chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length > 10));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

  await page.waitForSelector('#word', { timeout: 5000 });
  ok('pas de TTS au chargement (EP-033)', (await page.evaluate(() => window.__ttsCalls.length)) === 0);

  // Le nom est découpé en syllabes STATIQUES (chips, ni bouton ni TTS)
  await page.waitForSelector('.syl-chip', { timeout: 5000 });
  const nSyl = await page.locator('.syl-chip').count();
  ok('au moins 2 syllabes affichées', nSyl >= 2, `syllabes=${nSyl}`);
  const sylBox = await page.locator('.syl-chip').first().boundingBox();
  ok('syllabe ≥ 60px de haut (lisibilité enfant)', !!sylBox && sylBox.height >= 60, `h=${sylBox?.height}`);

  // Audio retiré : ni bouton son nom entier ni syllabes tapables (ancien .syl-btn)
  ok('aucun bouton 🔊 nom entier (audio retiré)', (await page.locator('#wordSoundBtn').count()) === 0);
  ok('aucune syllabe tapable ancienne (.syl-btn) résiduelle', (await page.locator('.syl-btn').count()) === 0);

  // Tap sur une syllabe → ne doit déclencher AUCUN speechSynthesis (lecture pure, zéro audio)
  await page.click('.syl-chip');
  await page.waitForTimeout(150);
  const afterSylTap = await page.evaluate(() => window.__ttsCalls.length);
  ok('tap syllabe ne déclenche aucun speechSynthesis', afterSylTap === 0, `calls=${afterSylTap}`);

  await page.waitForSelector('.dino-card', { timeout: 5000 });
  ok('6 images de choix', (await page.locator('.dino-card').count()) === 6, `cards=${await page.locator('.dino-card').count()}`);
  ok('1 seule bonne réponse', (await page.locator('.dino-card[data-correct="1"]').count()) === 1);
  ok('toutes les cartes pointent vers img/dinos/paleoart/', await page.evaluate(() =>
    [...document.querySelectorAll('.dino-card img')].every(i => /^img\/dinos\/paleoart\/[^/]+\.(png|jpg)$/.test(i.getAttribute('src')))
  ));
  // Preuve réelle que les images se CHARGENT (naturalWidth > 0), pas juste que l'attribut src est bien formé.
  await page.waitForTimeout(400); // laisse le temps aux <img> (+ fallback onerror) de résoudre
  const loadedCounts = await page.evaluate(() =>
    [...document.querySelectorAll('.dino-card img')].map(i => i.naturalWidth)
  );
  ok('toutes les images dino chargent réellement (naturalWidth > 0)',
    loadedCounts.every(w => w > 0), `naturalWidths=${loadedCounts.join(',')}`);

  // Chemin gagnant
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.dino-card[data-correct="1"]', { timeout: 4000 });
    await page.click('.dino-card[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1300);
  }
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);
}
