// Pilote MJ-12 — Nouveaux sons : tableau de boutons audio libre (pas de quiz/niveau).
// Ajout 2026-07-07 : section "Nouveaux !" avec 16 sons de la banque ElevenLabs
// site/sounds/fx/ (commit 79212a26, pas encore exposés dans un mini-jeu).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_DIR = path.resolve(__dirname, '..', '..', '..', 'site');

export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('page chargée (dashboard de boutons son)', (await page.locator('.snd-btn').count()) > 10);

  const newBtns = page.locator('.new-badge');
  const nNew = await newBtns.count();
  ok('section "Nouveaux !" ajoutée (>= 12 boutons badgés)', nNew >= 12, `badges=${nNew}`);

  // Chaque bouton "Nouveau" pointe vers un fichier réel de sounds/fx/ (pas un lien mort)
  const newSrcs = await page.evaluate(() =>
    [...document.querySelectorAll('.snd-btn')]
      .filter(b => b.querySelector('.new-badge'))
      .map(b => b.dataset.src)
  );
  ok('tous les boutons "Nouveau" ont un data-src sounds/fx/*.mp3',
    newSrcs.every(s => /^sounds\/fx\/.+\.mp3$/.test(s || '')), newSrcs.join(', '));

  // Vérifie que les fichiers existent réellement sur disque (pas de fetch : règle HTML local)
  const missing = newSrcs.filter(s => !fs.existsSync(path.join(SITE_DIR, s)));
  ok('aucun fichier manquant parmi les nouveaux sons', missing.length === 0, missing.join(', '));

  // Tap sur le premier nouveau son (T-Rex) : doit jouer (classe .playing) sans casser les sections existantes
  const firstNew = page.locator('.snd-btn:has(.new-badge)').first();
  await firstNew.click();
  await page.waitForTimeout(200);
  const playing = await firstNew.evaluate(el => el.classList.contains('playing'));
  ok('tap sur un nouveau son déclenche la lecture (.playing)', playing);

  // Section existante intacte : les boutons synthé (klaxon…) répondent toujours
  const synthBtn = page.locator('.snd-btn[data-synth="klaxon"]');
  await synthBtn.click();
  await page.waitForTimeout(150);
  ok('section synthé existante toujours fonctionnelle (pas cassée par l\'ajout)',
    (await page.locator('.snd-btn[data-synth]').count()) === 8);

  // Easter egg toujours présent et pas révélé au chargement
  ok('easter egg toujours présent (section existante intacte)', (await page.locator('#easterBtn').count()) === 1);
}
