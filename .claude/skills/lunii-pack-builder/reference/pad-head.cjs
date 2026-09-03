const fs=require("fs"), {execFileSync}=require("child_process"), path=require("path");
const FFMPEG="C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
const PAD=process.env.PAD_MS ? (parseInt(process.env.PAD_MS)/1000) : 0.30; // 300ms défaut
const dirs=process.argv.slice(2);
const TMP="c:/tmp/pad-work"; fs.mkdirSync(TMP,{recursive:true});
let n=0;
for(const dir of dirs){
  for(const file of fs.readdirSync(dir).filter(f=>f.endsWith(".mp3"))){
    const src=path.join(dir,file), out=path.join(TMP,file);
    // adelay ajoute le silence en tête (mono => 1 canal), puis on réécrit en place
    execFileSync(FFMPEG,["-y","-i",src,"-af",`adelay=${Math.round(PAD*1000)}|${Math.round(PAD*1000)}`,"-ar","44100","-ac","1","-b:a","128k",out],{stdio:"ignore"});
    fs.copyFileSync(out,src);
    n++;
  }
}
console.log(`✅ ${n} fichiers re-paddés (+${Math.round(PAD*1000)}ms tête)`);
