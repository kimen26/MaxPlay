// Pilote MJ-41 — Les tuiles dinos : mahjong solitaire simplifié 4-8 ans.
// Vérifie : niveau 1 = 12 tuiles/6 paires, génération 100% solvable (résout tout via
// __mjTest.pick), progression des billes, écran de fin, et le filet anti-blocage
// (remélange) déclenché à la demande.
// Images corrigées 2026-07-22 : chemin réel img/dinos/paleoart/<Nom>_headshot.jpg (bug retour
// Papa Yann "les images ne s'affichent pas" — l'ancien chemin img/dinos/<png> n'existait nulle part).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // Panneau règle v3 (savant fou 🧑‍🔬) : s'ouvre TOUT SEUL à la 1ʳᵉ partie (gabarit
  // mj-shell) → on vérifie puis on le ferme pour dérouler le jeu.
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  ok('manifest dinos chargé', await page.evaluate(() => typeof DINOS !== 'undefined' && Array.isArray(DINOS) && DINOS.length >= 8));
  ok('hook de test présent (__mjTest)', await page.evaluate(() => typeof window.__mjTest !== 'undefined'));

  const state0 = await page.evaluate(() => window.__mjTest.state());
  ok('Niveau 1 (0★) = 12 tuiles (6 paires, 2 couches)', state0.tiles.length === 12 && state0.totalPairs === 6, `tiles=${state0.tiles.length} pairs=${state0.totalPairs}`);
  ok('Tricératops présent dans le tableau (dino préféré de Max)', state0.tiles.some(t => t.dino === 'triceratops'));

  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);
  ok('12 tuiles rendues dans le DOM', (await page.locator('.tile').count()) === 12);

  // Preuve réelle que les images des tuiles se CHARGENT (bug retour Papa Yann "les images
  // ne s'affichent pas" — l'ancien chemin img/dinos/<png> n'existait nulle part sur disque ;
  // fix : img/dinos/paleoart/<Nom>_headshot.jpg avec repli onerror vers l'image paleoart complète).
  await page.waitForTimeout(300);
  const tileWidths = await page.evaluate(() => [...document.querySelectorAll('.tile img')].map(i => i.naturalWidth));
  ok('toutes les images de tuiles chargent réellement (naturalWidth > 0)',
    tileWidths.length === 12 && tileWidths.every(w => w > 0), `naturalWidths=${tileWidths.join(',')}`);
  ok('toutes les tuiles pointent vers img/dinos/paleoart/', await page.evaluate(() =>
    [...document.querySelectorAll('.tile img')].every(i => /^img\/dinos\/paleoart\/[^/]+\.(png|jpg)$/.test(i.getAttribute('src')))
  ));

  // Chaque dino apparaît un nombre pair de fois (paires complètes)
  const evenCounts = await page.evaluate(() => {
    const s = window.__mjTest.state();
    const counts = {};
    s.tiles.forEach(t => counts[t.dino] = (counts[t.dino] || 0) + 1);
    return Object.values(counts).every(c => c % 2 === 0);
  });
  ok('chaque dino a un nombre PAIR de tuiles (paires complètes)', evenCounts);

  // ─── Chemin gagnant scripté : résout TOUT le tableau via __mjTest.pick(id) ───
  // Prouve que la génération "construction par retrait inverse" est 100% solvable :
  // à chaque tour, on demande une paire libre au jeu lui-même et on la joue (chemin
  // du jeu, pas un raccourci) — si le générateur produisait un board bloqué, cette
  // boucle finirait par ne plus trouver de paire libre alors qu'il reste des tuiles.
  let rounds = 0;
  while (rounds < 20) {
    const pair = await page.evaluate(() => window.__mjTest.findFreePair());
    const remaining = await page.evaluate(() => window.__mjTest.state().tiles.filter(t => !t.removed).length);
    if (remaining === 0) break;
    if (!pair) { ok('BLOCAGE inattendu avec tuiles restantes (board non solvable)', false, `remaining=${remaining}`); break; }
    await page.evaluate((id) => window.__mjTest.pick(id), pair[0]);
    await page.waitForTimeout(80);
    await page.evaluate((id) => window.__mjTest.pick(id), pair[1]);
    await page.waitForTimeout(400); // laisse resolveMatch tourner
    rounds++;
  }
  const finalRemaining = await page.evaluate(() => window.__mjTest.state().tiles.filter(t => !t.removed).length);
  ok('tableau généré 100% SOLVABLE — vidé entièrement via le chemin du jeu', finalRemaining === 0, `restant=${finalRemaining} rounds=${rounds}`);

  const v1 = await page.locator('.pip.v1').count();
  ok('6 paires trouvées du 1er coup → 6 billes vertes', v1 === 6, `billes vertes=${v1}`);

  const endShown = await page.waitForFunction(
    () => !!document.querySelector('.end-wrap'),
    null, { timeout: 5000 }
  ).then(() => true).catch(() => false);
  ok('écran de fin affiché (G.showEnd)', endShown);

  // ─── Filet anti-blocage : vérifie que le remélange existe et fonctionne (appel direct) ───
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  // panneau règle ré-ouvert auto (localStorage vidé) → on le referme avant de continuer
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  await page.waitForSelector('.tile', { timeout: 5000 });
  const beforeReshuffle = await page.evaluate(() => window.__mjTest.state().tiles.map(t => t.dino));
  await page.evaluate(() => window.__mjTest.forceReshuffle());
  await page.waitForTimeout(900); // durée de l'anim swirl + réassignation
  const afterReshuffle = await page.evaluate(() => window.__mjTest.state().tiles.map(t => t.dino));
  ok('remélange anti-blocage change bien la disposition des dinos', JSON.stringify(beforeReshuffle) !== JSON.stringify(afterReshuffle));
  const stillSolvable = await page.evaluate(() => window.__mjTest.anyFreePairAvailable());
  ok('après remélange, au moins une paire est de nouveau jouable', stillSolvable);

  // ─── Bouton règles 🧑‍🔬 (savant fou) — composant partagé RegleInfo v3 ───
  ok('Bouton règles présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Panneau règle ouvert au tap', (await page.locator('#ri-panneau.on').count()) === 1);
  const regleTexte = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexte === 'Trouve les 2 mêmes dinos sur les tuiles libres !', regleTexte);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('Panneau règle refermé', (await page.locator('#ri-panneau.on').count()) === 0);
}
