// Test ad-hoc — outil lecture annotée (site/lecture.html), pôle NARRATION.
// Pas un mj-XX (pas de run.mjs standard) : script Playwright autonome.
// Usage : node studio/minijeux/tests/lecture.spec.mjs
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dir, '..', '..', '..', 'site', 'lecture.html');
const artifacts = resolve(__dir, '.artifacts');
mkdirSync(artifacts, { recursive: true });

const PASS = '\x1b[32mPASS\x1b[0m', FAIL = '\x1b[31mFAIL\x1b[0m';
const errors = [];
let verdict = 0;
const checks = [];
const ok = (name, cond, detail = '') => { checks.push([cond, name, detail]); if (!cond) verdict = 1; };

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', m => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });

try {
  await page.evaluate(() => localStorage.clear()).catch(() => {});
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // 1. Chargement sans erreur + 8 histoires listées avec numéro + titre
  const cards = page.locator('#liste .hcard:not(.cta-finir)');
  const nCards = await cards.count();
  ok('8 histoires listées à l\'accueil', nCards === 8, `trouvé=${nCards}`);

  const firstNum = await page.locator('#liste .hcard:not(.cta-finir)').first().locator('.num').textContent();
  ok('badge numéro N°01 présent', (firstNum || '').includes('N°01'), `texte="${firstNum}"`);

  const firstTitre = await page.locator('#liste .hcard:not(.cta-finir)').first().locator('.t').textContent();
  ok('titre lisible (pas vide, pas "undefined")', !!firstTitre && !firstTitre.includes('undefined'), `titre="${firstTitre}"`);

  const badgeVersions = await page.locator('#liste .hcard:not(.cta-finir)').first().locator('.badge').first().textContent();
  ok('badge nb versions présent', /version/.test(badgeVersions || ''), `texte="${badgeVersions}"`);

  // 2. Anonymat : aucune source (nom de writer/modèle) visible dans l'accueil
  const bodyTextAccueil = await page.locator('#liste').textContent();
  const sourcesInterdites = ['claude-sonnet', 'claude-opus', 'claude-haiku', 'kimi-', 'deepseek', 'grok-'];
  const fuite = sourcesInterdites.filter(s => (bodyTextAccueil || '').toLowerCase().includes(s));
  ok('anonymat respecté à l\'accueil (aucune source visible)', fuite.length === 0, `fuite=${fuite.join(',')}`);

  // 3. Navigation histoire → versions
  await page.locator('#liste .hcard:not(.cta-finir)').first().click();
  await page.waitForSelector('#versions .vcard', { timeout: 3000 });
  const nVersions = await page.locator('#versions .vcard').count();
  ok('liste des versions affichée après clic histoire', nVersions >= 3, `versions+extras=${nVersions}`);

  const bodyTextVersions = await page.locator('#versions').textContent();
  const fuiteV = sourcesInterdites.filter(s => (bodyTextVersions || '').toLowerCase().includes(s));
  ok('anonymat respecté dans la liste des versions', fuiteV.length === 0, `fuite=${fuiteV.join(',')}`);

  // 4. Navigation version → lecture (segments tapables)
  await page.locator('#versions .vcard').first().click();
  await page.waitForSelector('#texte .seg', { timeout: 3000 });
  const nSegs = await page.locator('#texte .seg').count();
  ok('texte segmenté en spans tapables', nSegs > 3, `segments=${nSegs}`);

  // 5. Annotation : tap un segment → sheet s'ouvre → chip → valider
  await page.locator('#texte .seg').first().click();
  await page.waitForSelector('#sheet:not(.hidden)', { timeout: 2000 });
  ok('sheet annotation ouverte au tap', true);

  await page.locator('#chips-pos .chip').first().click();
  await page.locator('#sheet .btn-ok').click();
  await page.waitForTimeout(200);
  const segAnnote = await page.locator('#texte .seg.pos, #texte .seg.neg').count();
  ok('segment annoté visuellement après validation', segAnnote >= 1, `annotés=${segAnnote}`);

  // 6. Retour versions → état "annotée" visible
  await page.locator('#barre button').first().click(); // ← Versions
  await page.waitForSelector('#versions .vcard', { timeout: 2000 });
  const etatAnnotee = await page.locator('#versions .vcard .etat.annotee').count();
  ok('état "annotée" affiché sur la version après retour', etatAnnotee >= 1, `count=${etatAnnotee}`);

  // 7. Retour accueil → payload push simulé (structure vérifiée sans réseau)
  await page.locator('#versions .vcard').filter({ hasText: 'Toutes les histoires' }).click();
  await page.waitForSelector('#liste .hcard', { timeout: 2000 });
  await page.locator('.cta-finir').click();
  await page.waitForSelector('#final:not(.hidden)', { timeout: 3000 });
  const payloadStr = await page.locator('#json').inputValue();
  let payload = null;
  try { payload = JSON.parse(payloadStr); } catch (e) { /* laissera l'assert échouer */ }
  ok('payload JSON valide construit', !!payload && payload.outil === 'lecture-annotee', `payload=${payloadStr.slice(0,120)}`);
  ok('payload contient les 8 histoires', !!payload && payload.histoires && payload.histoires.length === 8, `n=${payload && payload.histoires && payload.histoires.length}`);
  const h1 = payload && payload.histoires[0];
  const hasAnno = h1 && h1.versions.some(v => v.annotations.length > 0);
  ok('annotation du tour présente dans le payload', !!hasAnno);

  await page.screenshot({ path: resolve(artifacts, 'lecture-final.png') }).catch(() => {});
} catch (e) {
  errors.push(`exception: ${e.message}`);
  verdict = 1;
}

ok('Aucune erreur JS / console (smoke)', errors.length === 0, errors.join(' | '));

await browser.close();

console.log(`\n── lecture.html ──`);
for (const [cond, name, detail] of checks)
  console.log(`  ${cond ? PASS : FAIL}  ${name}${!cond && detail ? `\n        → ${detail}` : ''}`);
console.log(verdict === 0 ? `\n\x1b[32m✓ lecture.html OK\x1b[0m\n` : `\n\x1b[31m✗ lecture.html CASSÉ\x1b[0m\n`);
process.exit(verdict);
