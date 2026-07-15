import { chromium } from 'playwright'; import fs from 'fs';
const b64 = fs.readFileSync('C:/tmp/tritri_joyeux.png').toString('base64');
const html=`<body style="margin:0;height:440px;background:conic-gradient(#ccc 90deg,#fff 0 180deg,#ccc 0 270deg,#fff 0) 0 0/28px 28px;display:grid;place-items:center">
<img src="data:image/png;base64,${b64}" style="height:400px">`;
const br=await chromium.launch(); const p=await br.newPage({viewport:{width:460,height:440}});
await p.setContent(html); await p.screenshot({path:'C:/tmp/tritri_alpha.png'}); await br.close(); console.log('ok');
