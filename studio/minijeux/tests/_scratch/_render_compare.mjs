import { chromium } from 'playwright';
import fs from 'fs';
const svg = fs.readFileSync('C:/tmp/test_sticker.svg','utf8');
const pngB64 = fs.readFileSync('C:/tmp/test_sticker.png').toString('base64');
const html = `<body style="margin:0;background:#0a0e2a;display:flex;align-items:center;justify-content:center;height:420px">
  <div style="text-align:center;color:#fff;font-family:sans-serif">
    <div style="font-size:13px;margin-bottom:6px">SOURCE PNG (3.5 Ko)</div>
    <img src="data:image/png;base64,${pngB64}" width="200" height="200">
  </div>
  <div style="text-align:center;color:#fff;font-family:sans-serif;margin-left:40px">
    <div style="font-size:13px;margin-bottom:6px">SVG VECTORISE (650 o)</div>
    <div style="width:200px;height:200px">${svg.replace('<svg ','<svg width="200" height="200" ')}</div>
  </div>
</body>`;
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:520,height:420}});
await p.setContent(html);
await p.screenshot({path:'C:/tmp/compare_vecto.png'});
await b.close();
console.log('rendu ok');
