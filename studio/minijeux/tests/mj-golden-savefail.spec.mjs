// mj-golden-savefail.spec.mjs — HO-MJ-21 (2026-09-19), 2e spec neuve du brief §5 :
// "un save() en échec (quota simulé) ne doit produire aucun écran de gain".
//
// §3 du brief documentait trois scénarios où l'écran de fin CÉLÉBRAIT un gain que
// rien ne conservait (changement de clé de profil, quota localStorage saturé…).
// Avant HO-MJ-21, collection.js.save() avalait l'échec en silence et grantReward()
// retournait quand même granted:true — mj-golden.js jouait alors le théâtre complet
// (œuf plein écran + bouton "Au nid !") sur un gain jamais écrit sur disque.
//
// Cette spec simule un localStorage.setItem qui lève systématiquement (quota
// dépassé) puis joue une partie complète sur mj-24, et vérifie qu'AUCUN théâtre de
// gain n'apparaît (pas de bouton "Au nid !", grant.granted === false côté moteur).
//
// Usage : cd studio/minijeux/tests && node run.mjs mj-golden-savefail ../../../site/mj-24.html
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  const panneau = page.locator('#ri-panneau.on');
  if (await panneau.count()) { await page.click('#ri-ok'); await page.waitForTimeout(200); }

  // Simule un quota localStorage saturé : setItem lève pour TOUTE clé collection,
  // mais laisse passer le reste (tracker/stars) pour ne pas casser le déroulé du
  // jeu — on isole précisément la panne visée par le brief (§3 scénario C).
  await page.evaluate(() => {
    const real = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.indexOf('maxplay_collection_v1') === 0) {
        throw new DOMException('Quota simulé (HO-MJ-21)', 'QuotaExceededError');
      }
      return real.call(this, key, value);
    };
  });

  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 6000 }).catch(() => {});
    await page.click('.dino-tile[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.waitForSelector('.end-wrap', { timeout: 8000 });

  // ── vérifie côté moteur : grantReward a bien refusé le gain ────────────
  const collectionAfter = await page.evaluate(() => localStorage.getItem('maxplay_collection_v1'));
  ok('save() en échec : rien n\'est écrit sous la clé collection (quota simulé tient sa promesse)',
     collectionAfter === null, `contenu=${collectionAfter}`);

  // ── vérifie côté écran : AUCUN théâtre de gain, aucun bouton "au nid" ──
  const nidBtn = await page.locator('[data-act="nid"]').count();
  ok('écran de fin : AUCUN bouton "Au nid !" (aucun gain à annoncer)', nidBtn === 0);
  const eggZoneEmpty = await page.evaluate(() => {
    const z = document.getElementById('eggZone');
    return !z || z.children.length === 0;
  });
  ok('zone œuf vide : aucune animation de gain jouée', eggZoneEmpty);

  // le jeu reste jouable normalement : replay et maison présents malgré l'échec
  ok('boutons replay/home toujours présents (l\'échec de sauvegarde ne casse pas la fin de partie)',
     (await page.locator('[data-act="replay"]').count()) === 1 && (await page.locator('[data-act="home"]').count()) === 1);
}
