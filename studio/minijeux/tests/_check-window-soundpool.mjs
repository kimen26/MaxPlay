// Vérif empirique jetable : SoundPool/const top-level visible via window ?
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file:///C:/ProjetsPerso/Claude_Projects/MaxPlay/site/mj-13a.html');
await p.waitForTimeout(1500);
const r = await p.evaluate(() => ({
  bareConst: typeof SoundPool,
  onWindow: typeof window.SoundPool,
  phraseViaWindow: !!(window.SoundPool && window.SoundPool.phrase),
  textesJeux: typeof window.TEXTES_JEUX,
  nbEntrees: window.TEXTES_JEUX ? Object.keys(window.TEXTES_JEUX).length : 0,
}));
console.log(JSON.stringify(r, null, 2));
await b.close();
