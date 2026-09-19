// mj-49-nid.spec.mjs — HO-MJ-21 (2026-09-19), porte "spec neuve obligatoire" du brief.
// mj-49 (Les barquettes de 10) ne charge JAMAIS js/gen/dinos-data.js en dur dans son
// HTML — c'est un jeu de calcul pur (mj-dice, mj-compte), pas un jeu à catalogue dino
// (contrairement à mj-24/mj-28, qui l'incluent à la main). Avant HO-MJ-21, mj-shell.js
// ne chargeait pas non plus dinos-data.js : sur ce jeu comme 28 autres sur 36,
// collection-dinos.js sortait en silence (DINOS jamais défini), le moteur collection.js
// tournait sans catalogue, et l'œuf gagné en fin de partie naissait famille:"_sans"
// (œuf gris) — puis son éclosion RETOURNAIT DOUBLON et DÉTRUISAIT l'œuf sans rien
// ajouter à owned (hatchEgg splice avant de vérifier qu'un item existe).
//
// Cette spec prouve la correction sur le terrain exact du bug : un jeu SANS
// dinos-data.js codé en dur doit maintenant recevoir le catalogue via mj-shell.js,
// donner un œuf à famille RÉELLE (jamais _sans), et une éclosion qui rend un
// vrai dino (jamais {type:'doublon'}).
//
// Usage : cd studio/minijeux/tests && node run.mjs mj-49-nid ../../../site/mj-49.html
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // le catalogue doit être chargé par mj-shell.js — mj-49.html ne l'inclut pas lui-même.
  // DINOS est un `const` top-level de dinos-data.js (identifiant nu du global lexical
  // scope, PAS une propriété de window) — piège documenté dans le brief HO-MJ-21,
  // d'où le typeof DINOS ci-dessous plutôt que window.DINOS (toujours undefined).
  const catalogueCharge = await page.evaluate(() => {
    try { return typeof DINOS !== 'undefined' && Array.isArray(DINOS) && DINOS.length > 0; }
    catch (e) { return false; }
  });
  ok('DINOS chargé sur mj-49 bien que le HTML ne l\'inclue pas en dur (mj-shell.js le charge désormais)', catalogueCharge);
  const skinConfigure = await page.evaluate(() => !!(window.Collection && window.Collection.eggs));
  ok('Collection.js présent et configuré (collection-dinos.js n\'est pas sorti en silence)', skinConfigure);

  // ── joue une partie complète, sans-faute (chemin gagnant scripté) ──────
  const panneau = page.locator('#ri-panneau.on');
  if (await panneau.count()) { await page.click('#ri-ok'); await page.waitForTimeout(200); }

  for (let i = 0; i < 10; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.mjk-choice[data-correct="1"]', { timeout: 6000 }).catch(() => {});
    await page.click('.mjk-choice[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1200);
  }
  await page.waitForSelector('.end-wrap', { timeout: 8000 });

  // ── nid vide → gain FORCÉMENT un œuf, avec une famille RÉELLE ──────────
  const collection = await page.evaluate(() => {
    const raw = localStorage.getItem('maxplay_collection_v1');
    return raw ? JSON.parse(raw) : null;
  });
  ok('partie terminée sur mj-49 (sans dinos-data en dur) → 1 œuf persisté',
     !!collection && Array.isArray(collection.eggs) && collection.eggs.length === 1,
     JSON.stringify(collection));
  const famille = collection && collection.eggs[0] && collection.eggs[0].famille;
  ok('l\'œuf a une famille RÉELLE, jamais "_sans" (preuve du bug L-143 corrigée)',
     !!famille && famille !== '_sans', `famille=${famille}`);

  // ── soin + éclosion : doit rendre un DINO, jamais un doublon ───────────
  // 1er œuf de l'histoire → seuil d'éclosion = 1 accessoire (théâtre rapide).
  const acc = await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('maxplay_collection_v1'));
    s.sac = ['paille'];
    localStorage.setItem('maxplay_collection_v1', JSON.stringify(s));
    return Collection.warmEgg(0, 'paille');
  });
  ok('warmEgg pose l\'accessoire et l\'œuf devient prêt (seuil 1er œuf = 1)', acc.ok === true && acc.ready === true, JSON.stringify(acc));

  const hatched = await page.evaluate(() => Collection.hatchEgg(0));
  ok('hatchEgg rend un DINO complet {id,nom,famille} — jamais {type:"doublon"}',
     !!(hatched && hatched.id && hatched.nom && !hatched.type), JSON.stringify(hatched));

  const stateAfter = await page.evaluate(() => Collection.state());
  ok('le dino éclos est bien ajouté à owned', stateAfter.owned.length === 1 && stateAfter.owned[0] === (hatched && hatched.id),
     JSON.stringify({ owned: stateAfter.owned, hatchedId: hatched && hatched.id }));
  ok('l\'œuf est consommé (nid vide après l\'unique éclosion)', stateAfter.eggs.length === 0, `eggs=${stateAfter.eggs.length}`);

  await page.screenshot({ path: new URL('.artifacts/mj-49-nid-fin.png', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:') });
}
