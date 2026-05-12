#!/usr/bin/env bun
const apiKey = process.env.ELEVENLABS_API_KEY;
const RAPH = "Te5RKnm9ebwdEvZ1S5pS";
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

// TEST 1 — Raph cris avec graphies extremes
await generate("Raph-cris-graphies", [
  // Reference 1 : cri standard
  { voice_id: RAPH, text: "[shouts] CATASTROPHE !" },
  // Cri detache par syllabes (CAPS + espaces)
  { voice_id: RAPH, text: "[shouts] CA TA STRO PHE !" },
  // Cri allongé (dashes)
  { voice_id: RAPH, text: "[shouts] CA-TAS-TRO-PHE !" },
  // Onomatopee : YOU HOU
  { voice_id: RAPH, text: "[shouts] YOU HOU !" },
  // YOU-HOU variant
  { voice_id: RAPH, text: "[playful] You-hou !" },
  // YOOOO HOOO etire
  { voice_id: RAPH, text: "[shouts] YOOO HOOO !" },
  // Houlou (mot du canon 001)
  { voice_id: RAPH, text: "[shouts] Houlou !" },
  // HOU-LOU !
  { voice_id: RAPH, text: "[shouts] HOU-LOU !" },
  // Avec [yells]
  { voice_id: RAPH, text: "[yells] HOU-LOU !" },
]);

// TEST 2 — Graphies pour autres mots (graduation Wex)
await generate("Wex-graphies-mots", [
  // Stylo - 5 graduations
  { voice_id: WEX, text: "Un stylo." },
  { voice_id: WEX, text: "Un 'stylo." },
  { voice_id: WEX, text: "Un STYLO." },
  { voice_id: WEX, text: "Un sty-lo." },
  { voice_id: WEX, text: "Un eh-stylo." },
  // Je sais pas - graduations
  { voice_id: WEX, text: "Je sais pas." },
  { voice_id: WEX, text: "'Je sais pas." },
  { voice_id: WEX, text: "Ze sais pas." },
  { voice_id: WEX, text: "Z'sais pas." },
  // Bus (passion Wex) - graduations
  { voice_id: WEX, text: "Le bus arrive !" },
  { voice_id: WEX, text: "Le BUS arrive !" },
  { voice_id: WEX, text: "Le bus-bus arrive !" },
  { voice_id: WEX, text: "Le b-bus arrive !" },
]);
