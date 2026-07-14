// MJ-44 — La boîte à sons (tri de mots par phonème)
// Vérifie : boîtes + cartes, placement correct, placement faux refusé (zéro pénalité),
// résolution, progression des 3 paliers (initial→initial→voyelle) jusqu'à l'overlay,
// MP3 phonèmes présents sur disque, mot écrit masqué au ★3 (force l'écoute).

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

export async function run({ page, ok }) {
  // ── Gabarit mj-shell.js : le panneau règle s'ouvre TOUT SEUL à la 1ʳᵉ partie ──
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── État initial ─────────────────────────────────────────────────────
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('Palier initial = ★1', s0.paletteIdx === 0, `idx=${s0.paletteIdx}`);
  ok('Palier 1 = 2 boîtes (t / m)', s0.boxes.length === 2 && s0.boxes.map(b=>b.id).sort().join('') === 'mt',
     JSON.stringify(s0.boxes.map(b=>b.id)));
  ok('Des cartes-mots dans l\'étagère', s0.trayCount > 0, `tray=${s0.trayCount}`);
  ok('Chaque carte a une boîte cible connue', s0.cards.every(c => ['t','m'].includes(c.boxId)));

  // ── Bouton règles (i) ────────────────────────────────────────────────
  ok('Bouton règles 🧑‍🔬 présent', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Panneau règle ouvert au tap', await page.locator('#ri-panneau.on').count() === 1);
  await page.click('#ri-ok');
  ok('Panneau règle fermé au tap', await page.locator('#ri-panneau.on').count() === 0);

  // ── Placement CORRECT : la carte entre dans sa boîte ─────────────────
  const good = await page.evaluate(() => {
    const c = window.__mjTest.state.cards.find(c => c.loc === 'tray');
    const bi = window.__mjTest.boxIndexOf(c.boxId);
    window.__mjTest.place(c.id, bi);
    const after = window.__mjTest.state.cards.find(x => x.id === c.id);
    return { loc: after.loc, bi };
  });
  ok('Carte correctement rangée entre dans sa boîte', good.loc === good.bi);

  // ── Placement FAUX : refus doux, la carte reste dans l'étagère ───────
  const bad = await page.evaluate(() => {
    window.__mjTest.newRound();
    const st = window.__mjTest.state;
    const c = st.cards.find(c => c.loc === 'tray');
    const wrongBi = st.boxes.findIndex(b => b.id !== c.boxId);
    window.__mjTest.place(c.id, wrongBi);
    const after = window.__mjTest.state.cards.find(x => x.id === c.id);
    return { stillTray: after.loc === 'tray' };
  });
  ok('Mauvaise boîte refusée : la carte reste dans l\'étagère (zéro pénalité)', bad.stillTray === true);

  // ── Résolution complète d'un round ───────────────────────────────────
  await page.evaluate(() => { window.__mjTest.newRound(); window.__mjTest.solveRound(); });
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('solveRound range toutes les cartes', s1.cards.every(c => c.loc !== 'tray') && s1.trayCount === 0);
  ok('Round marqué terminé', s1.roundOver === true);

  // ── MP3 phonèmes : les 6 fichiers gravés existent sur disque ─────────
  const __dir = dirname(fileURLToPath(import.meta.url));
  const phonemes = await page.evaluate(() => window.__mjTest.phonemes);
  const missing = Object.values(phonemes)
    .filter(f => !existsSync(resolve(__dir, '..', '..', '..', 'site', 'sounds', 'phonemes', `${f}.mp3`)));
  ok('6 MP3 phonèmes ElevenLabs présents (sounds/phonemes/)', missing.length === 0,
     missing.join(', ') || 'tous présents');
  ok('Mapping phonèmes couvre les 6 sons', ['t','m','l','r','ou','a'].every(k => k in phonemes));

  // ── Palier 1 : mot écrit VISIBLE (graphie alignée au son initial) ────
  const wordsVisible1 = await page.evaluate(() => {
    window.__mjTest.setDifficulty(1); // round frais ★1 (le solveRound a vidé l'étagère)
    return document.querySelectorAll('.tray .card .card-mot').length > 0;
  });
  ok('★1 : mots écrits visibles sous les pictos', wordsVisible1 === true);

  // ── Palier 3 = voyelle interne (ou / a), 3 mots par boîte ────────────
  await page.evaluate(() => window.__mjTest.setDifficulty(3));
  const s3 = await page.evaluate(() => window.__mjTest.state);
  ok('Palier 3 = boîtes « ou » et « a »', s3.boxes.map(b=>b.id).sort().join('|') === 'a|ou',
     JSON.stringify(s3.boxes.map(b=>b.id)));
  ok('Palier 3 = 6 cartes (3 par boîte)', s3.cards.length === 6, `cards=${s3.cards.length}`);

  // ── ★3 : mot écrit MASQUÉ (anti-triche lettre initiale, force l'écoute) ──
  ok('★3 : hideWord actif', s3.hideWord === true);
  const wordsVisible3 = await page.evaluate(() =>
    document.querySelectorAll('.tray .card .card-mot').length);
  ok('★3 : aucun mot écrit sur les cartes (picto seul)', wordsVisible3 === 0, `visibles=${wordsVisible3}`);

  // ── Chemin gagnant complet : 2 rounds × 3 paliers → overlay ──────────
  const fin = await page.evaluate(() => {
    window.__mjTest.setTestMode(true);
    window.__mjTest.setDifficulty(1);
    for (let i = 0; i < 14; i++) {
      if (window.__mjTest.state.overlayShown) break;
      window.__mjTest.solveRound();
      if (!window.__mjTest.state.overlayShown) window.__mjTest.newRound();
    }
    return { overlay: window.__mjTest.state.overlayShown, starsOn: document.querySelectorAll('.star.on').length };
  });
  ok('Overlay final atteint après les 3 paliers', fin.overlay === true);
  ok('3 étoiles allumées à la fin', fin.starsOn === 3, `stars=${fin.starsOn}`);

  // ── Zéro mot punitif ─────────────────────────────────────────────────
  const punitive = await page.evaluate(() => {
    const t = document.getElementById('overlay-title').textContent
            + document.getElementById('overlay-text').textContent
            + document.getElementById('banner').textContent;
    return /perdu|raté|échec|nul|faux|erreur/i.test(t);
  });
  ok('Zéro mot punitif (overlay + bannière)', punitive === false);

  // ── Zone tap : cartes ≥ 80px de large ────────────────────────────────
  await page.evaluate(() => { window.__mjTest.setTestMode(false); window.__mjTest.setDifficulty(1); });
  const cardBox = await page.locator('.tray .card').first().boundingBox();
  ok('Carte tap ≥ 80px large', !!cardBox && cardBox.width >= 80, cardBox ? `${Math.round(cardBox.width)}px` : 'no-box');
}
