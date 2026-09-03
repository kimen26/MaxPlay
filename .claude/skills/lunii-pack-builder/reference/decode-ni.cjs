// Décode le format ni (node index) Lunii v1 — structure du FsStoryTellerAsyncDriver (STUdio)
// Header (512 bytes) puis N stage nodes de 44 bytes chacun.
// Stage node (LE): imageAssetIndex(4), audioAssetIndex(4), okActionIndex(4), okOptionsCount(4),
//   okSelectedOption(4)?... + wheel(2), ok(2), home(2), pause(2), autoplay(2)... selon version.
// On lit le header pour le format, puis on dump.
const fs=require("fs");
const buf=fs.readFileSync(process.argv[2]);
// header v1 : versionMajor(2) au offset 4 etc. La doc dit: bytes 0-1 nbStageNodes? Essayons brut.
function u16(o){return buf.readUInt16LE(o);}
function i16(o){return buf.readInt16LE(o);}
function i32(o){return buf.readInt32LE(o);}
console.log("taille ni:", buf.length);
// Header 512 bytes en v1 FS. nodes ensuite.
const HEADER=512, NODE=44;
const nbNodes=Math.floor((buf.length-HEADER)/NODE);
console.log("header 512 + nodes 44 =>", nbNodes, "nodes (reste", (buf.length-HEADER)%NODE, ")");
// premiers champs du header
console.log("header[0..15]:", [...buf.slice(0,16)].map(b=>b.toString(16).padStart(2,"0")).join(" "));
for(let n=0;n<Math.min(nbNodes,12);n++){
  const o=HEADER+n*NODE;
  const img=i32(o), aud=i32(o+4), okA=i32(o+8), okOpt=i32(o+12), okIdx=i32(o+16);
  const homeA=i32(o+20), homeOpt=i32(o+24), homeIdx=i32(o+28);
  const wheel=i16(o+32), ok=i16(o+34), home=i16(o+36), pause=i16(o+38), auto=i16(o+40);
  console.log(`#${n} img=${img} aud=${aud} | ok[a=${okA} cnt=${okOpt} sel=${okIdx}] home[a=${homeA} cnt=${homeOpt}] | wheel=${wheel} ok=${ok} home=${home} pause=${pause} auto=${auto}`);
}
