// dinos-audio-manifest.js — GENERE depuis les fichiers reels de audio/dinos/<lang>/.
// Regenerer apres tout ajout audio : node -e "<voir studio/dino/content/scripts/export/>" ou re-executer la commande du commit.
// Usage : <script src="js/lang.js"></script> puis <script src="js/dinos-audio-manifest.js"></script>
//   -> window.DINO_NOM_AUDIO (Set des ids ayant noms/<id>.mp3 dans le pack de la langue active)
// Helper central : joue le NOM SEUL en voix reelle (noms/<id>.mp3, 1.5-2s), fallback TTS.
// ⚠ Retour PY 2026-07-27 (mj-30) : les <id>-nom.mp3 a plat sont des SEGMENTS DE FICHE
// (20-35s, nom + etymologie) — ne JAMAIS les jouer sur un tap en jeu. La banque
// courte vit dans audio/dinos/<lang>/noms/.
// Usage jeux : playDinoNom(dino.id, dino.name [, {then}]) — remplace speak(name).
// Garde-fou : si lang.js absent, pack FR par defaut (comportement historique).
window.AUDIO_DINOS = window.AUDIO_DINOS || 'audio/dinos/fr/';
window.playDinoNom = function (id, fallbackName, opts) {
  const done = opts && opts.then;
  if (window.DINO_NOM_AUDIO && window.DINO_NOM_AUDIO.has(id)) {
    try {
      const a = new Audio(window.AUDIO_DINOS + 'noms/' + id + '.mp3');
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

// Sets par langue — genere en scannant audio/dinos/<lang>/noms/*.mp3 (banque NOM SEUL).
// Une langue absente ici = 0 MP3 -> playDinoNom retombe sur TTS natif SANS tenter de fetch (anti-404).
window.DINO_NOM_AUDIO_BY_LANG = {};
window.DINO_NOM_AUDIO_BY_LANG.ru = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG.hi = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG["es-mx"] = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG["es-es"] = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG.de = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG.ar = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG.zh = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG["pt-br"] = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG.ja = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG.it = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);

window.DINO_NOM_AUDIO_BY_LANG.en = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO_BY_LANG.fr = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_NOM_AUDIO = window.DINO_NOM_AUDIO_BY_LANG[(window.Lang && window.Lang.current()) || 'fr'] || new Set();

// Sets par langue pour les segments fiche "-funfact.mp3" (fait amusant, dialogue 2 voix).
// Genere en scannant audio/dinos/<lang>/*-funfact.mp3. Meme garde-fou anti-404 que DINO_NOM_AUDIO.
window.DINO_FUNFACT_AUDIO_BY_LANG = {};
window.DINO_FUNFACT_AUDIO_BY_LANG.fr = new Set(["aenocyon","albertosaurus","allosaurus","amargasaurus","ankylosaurus","apatosaurus","archaeopteryx","archelon","baryonyx","brachiosaurus","camarasaurus","carcharodontosaurus","carnotaurus","centrosaurus","ceratosaurus","coelodonta","corythosaurus","cryolophosaurus","deinonychus","dilophosaurus","dimetrodon","diplodocus","edaphosaurus","edmontonia","edmontosaurus","elasmosaurus","euoplocephalus","gallimimus","giganotosaurus","glyptodon","gorgonops","hatzegopteryx","ichthyosaurus","iguanodon","kentrosaurus","liopleurodon","lystrosaurus","maiasaura","mammuthus","megatherium","microraptor","minmi","mosasaurus","moschops","ophthalmosaurus","oviraptor","pachycephalosaurus","paraceratherium","parasaurolophus","patagotitan","pentaceratops","plateosaurus","protoceratops","pteranodon","quetzalcoatlus","saurolophus","scelidosaurus","scutellosaurus","shonisaurus","smilodon","spinosaurus","stegosaurus","tarbosaurus","therizinosaurus","titanis","torosaurus","triceratops","troodon","tyrannosaurus","utahraptor","velociraptor"]);
window.DINO_FUNFACT_AUDIO = window.DINO_FUNFACT_AUDIO_BY_LANG[(window.Lang && window.Lang.current()) || 'fr'] || new Set();

// playDinoFunfact(id, fallbackText, opts) -- joue <id>-funfact.mp3 (2 voix, ~15-20s), fallback TTS.
window.playDinoFunfact = function (id, fallbackText, opts) {
  const done = opts && opts.then;
  if (window.DINO_FUNFACT_AUDIO && window.DINO_FUNFACT_AUDIO.has(id)) {
    try {
      const a = new Audio(window.AUDIO_DINOS + id + '-funfact.mp3');
      a.volume = 0.95;
      if (done) a.onended = done;
      a.play().catch(() => { if (window.TTS && fallbackText) TTS.speak(fallbackText, { pitch: 1.05, priority: true }); if (done) done(); });
      return a;
    } catch (e) { /* fallthrough */ }
  }
  if (window.TTS && fallbackText) TTS.speak(fallbackText, { pitch: 1.05, priority: true });
  if (done) setTimeout(done, 900);
  return null;
};

// Sets par langue pour les MP3 de PÉRIODES (audio/dinos/<lang>/periodes/<slug>.mp3, « Le Jurassique ! »).
// Genere en scannant audio/dinos/<lang>/periodes/*.mp3. Meme garde-fou anti-404 que DINO_NOM_AUDIO :
// une periode sans MP3 (ex. permien) n'est pas dans le Set -> repli TTS direct, jamais de fetch 404.
window.DINO_PERIODE_AUDIO_BY_LANG = {};
window.DINO_PERIODE_AUDIO_BY_LANG.fr = new Set(["cenozoique","cretace","jurassique","pangee","trias"]);
window.DINO_PERIODE_AUDIO = window.DINO_PERIODE_AUDIO_BY_LANG[(window.Lang && window.Lang.current()) || 'fr'] || new Set();

// playPeriode(id, fallbackLabel, opts) -- joue periodes/<id>.mp3 (nom de l'epoque en voix reelle), fallback TTS du label.
window.playPeriode = function (id, fallbackLabel, opts) {
  const done = opts && opts.then;
  if (window.DINO_PERIODE_AUDIO && window.DINO_PERIODE_AUDIO.has(id)) {
    try {
      const a = new Audio(window.AUDIO_DINOS + 'periodes/' + id + '.mp3');
      a.volume = 0.95;
      if (done) a.onended = done;
      a.play().catch(() => { if (window.TTS && fallbackLabel) TTS.speak(fallbackLabel, { pitch: 1.05, priority: true }); if (done) done(); });
      return a;
    } catch (e) { /* fallthrough */ }
  }
  if (window.TTS && fallbackLabel) TTS.speak(fallbackLabel, { pitch: 1.05, priority: true });
  if (done) setTimeout(done, 900);
  return null;
};
