#!/usr/bin/env bun
const apiKey = process.env.ELEVENLABS_API_KEY;
const WEX = "MvACGLim6BRvCWyH21A6";
const OUTPUT_DIR = "c:/ProjetsPerso/Claude_Projects/MaxPlay/narration/stories/001-le-pont-casse/assets/audio";

async function generate(name, inputs) {
  const r = await fetch("https://api.elevenlabs.io/v1/text-to-dialogue", {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ inputs, model_id: "eleven_v3", output_format: "mp3_44100_128" }),
  });
  if (!r.ok) {
    console.log(name, "ERR", r.status, await r.text());
    return;
  }
  const buf = await r.arrayBuffer();
  const dest = `${OUTPUT_DIR}/_TEST-${name}.mp3`;
  await Bun.write(dest, buf);
  console.log(name, "OK", buf.byteLength, "bytes -> _TEST-" + name + ".mp3");
}

// TEST 1 — [stammers] sur Wex excite
await generate("Wex-stammers", [
  { voice_id: WEX, text: "[excited] Regardez le bus !" },
  { voice_id: WEX, text: "[stammers] [excited] Regardez le bus !" },
  { voice_id: WEX, text: "[stammers] Oh non on est en retard pour le bus !" },
]);

// TEST 2 — [Brazilian accent] sur Wex
await generate("Wex-Brazilian-accent", [
  { voice_id: WEX, text: "Bonjour, je mappelle Wex. Aujourdhui il fait beau et je vais a la plage avec mes amis." },
  { voice_id: WEX, text: "[Brazilian accent] Bonjour, je mappelle Wex. Aujourdhui il fait beau et je vais a la plage avec mes amis." },
]);

// TEST 3 — graduation graphique entre-deux
await generate("Wex-graduation-huit", [
  { voice_id: WEX, text: "Il est huit heures." },
  { voice_id: WEX, text: "Il est 'huit heures." },
  { voice_id: WEX, text: "Il est HUIT heures." },
  { voice_id: WEX, text: "Il est hu-it heures." },
  { voice_id: WEX, text: "Il est ouitte heures." },
]);

// BONUS TEST 4 — modulation rires
await generate("Wex-soft-modulation", [
  { voice_id: WEX, text: "[laughs] Ah oui cest drole !" },
  { voice_id: WEX, text: "[laughs softly] Ah oui cest drole !" },
  { voice_id: WEX, text: "[chuckles] Ah oui cest drole !" },
  { voice_id: WEX, text: "[giggles] Ah oui cest drole !" },
]);
