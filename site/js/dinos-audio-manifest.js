// dinos-audio-manifest.js — GENERE depuis les fichiers reels de audio/dinos/.
// Regenerer apres tout ajout audio : node -e "<voir studio/dino/content/scripts/export/>" ou re-executer la commande du commit.
// Usage : <script src="js/dinos-audio-manifest.js"></script> -> window.DINO_NOM_AUDIO (Set des ids ayant <id>-nom.mp3)
// Helper central : joue le nom en voix reelle (<id>-nom.mp3), fallback TTS.
// Usage jeux : playDinoNom(dino.id, dino.name [, {then}]) — remplace speak(name).
window.playDinoNom = function (id, fallbackName, opts) {
  const done = opts && opts.then;
  if (window.DINO_NOM_AUDIO && window.DINO_NOM_AUDIO.has(id)) {
    try {
      const a = new Audio('audio/dinos/' + id + '-nom.mp3');
      a.volume = 0.95;
      if (done) a.onended = done;
      a.play().catch(() => { if (window.TTS) TTS.speak(fallbackName, { pitch: 1.05, priority: true }); if (done) done(); });
      return a;
    } catch (e) { /* fallthrough */ }
  }
  if (window.TTS) TTS.speak(fallbackName, { pitch: 1.05, priority: true });
  if (done) setTimeout(done, 900);
  return null;
};

window.DINO_NOM_AUDIO = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","mammuthus","megatherium","microraptor","mosasaurus","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
