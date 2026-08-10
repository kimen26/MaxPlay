// Génère les 12 illustrations du pack « Histoires pour dodo » via ChatGPT (Brave debug 9222).
// MÊME chat que la cover (pas de --new) pour la cohérence de style — charte : BD enfants,
// contours blancs/gris clair sur fond noir natif, traits nets, ombrage simple, sans texte.
// Sortie HD dans studio/lunii/assets/images/histoires-dodo/ , post-traitement to-lunii.sh après.
//
// Usage : node studio/lunii/scripts/gen-dodo-images.mjs [slug ...]   (défaut : toutes)

import { spawnSync } from "child_process";
import { existsSync, writeFileSync, readFileSync } from "fs";

const GEN = "C:/Users/kimen/.claude/skills/dino-images-lunii/scripts/gpt-gen.mjs";
const OUT = "c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/lunii/assets/images/histoires-dodo";
const STATE = `${OUT}/_GEN-STATE.json`;
const PAUSE_S = 15;

const STYLE =
  "Dessin style BD pour enfants, contours blancs et gris clair sur fond noir profond " +
  "(composition pensée pour fond sombre), traits nets, ombrage gris simple, silhouette forte, " +
  "peu de micro-détails, aucun texte, sujet centré, ambiance douce de nuit : ";

const SCENES = [
  { slug: "petite-fille",   scene: "une petite fille en manteau à capuche qui rencontre un grand loup doux et amical dans une forêt de nuit étoilée" },
  { slug: "loup-livre",     scene: "un loup surpris qui bascule hors d'un grand livre ouvert magique, des étoiles et des pages qui s'envolent autour" },
  { slug: "ecole-loups",    scene: "des louveteaux sages assis à de petits pupitres dans une école de forêt, une maîtresse louve au tableau, clair de lune" },
  { slug: "secret-foret",   scene: "une clairière de nuit avec un grand arbre creux qui brille doucement, des lucioles, un petit lapin et un hibou curieux" },
  { slug: "gentillesse",    scene: "un petit loup qui aide un petit hérisson à remonter une pente en lui tendant la patte, grande lune ronde derrière eux" },
  { slug: "dispute",        scene: "deux petits animaux (un loup et un renard) assis dos à dos en boudant, une étoile filante au-dessus d'eux" },
  { slug: "bisous",         scene: "un petit enfant qui fait une grimace rigolote en esquivant le gros bisou d'une grand-mère toute douce, scène tendre et drôle" },
  { slug: "arc-en-ciel",    scene: "un magnifique poisson aux grandes écailles brillantes qui nage dans l'océan de nuit, entouré de petits poissons admiratifs et de bulles" },
  { slug: "adam",           scene: "un adorable bébé dinosaure tout rond qui sourit, assis dans l'herbe sous les étoiles" },
  { slug: "aurore",         scene: "une petite fille exploratrice avec un chapeau et des jumelles qui suit des empreintes de dinosaure géantes dans la nuit" },
  { slug: "eleonore",       scene: "une petite fille qui fait un gros câlin au cou d'un grand dinosaure gentil au long cou, tous les deux sourient" },
  { slug: "silence-dormir", scene: "un petit enfant dans son lit qui dit chut avec le doigt sur la bouche, des animaux endormis tout autour de la chambre" },
];

const only = process.argv.slice(2);
const todo = only.length ? SCENES.filter((s) => only.includes(s.slug)) : SCENES;
const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : {};

for (const s of todo) {
  const out = `${OUT}/${s.slug}-hd.png`;
  if (state[s.slug] === "done" && existsSync(out)) { console.log(`⏭  ${s.slug} déjà fait`); continue; }
  console.log(`▶ ${s.slug}…`);
  const r = spawnSync("node", [GEN, STYLE + s.scene, out], { stdio: "inherit" });
  if (r.status !== 0 || !existsSync(out)) {
    state[s.slug] = "fail";
    writeFileSync(STATE, JSON.stringify(state, null, 2));
    console.error(`✗ ${s.slug} échec — état sauvé, relancer pour reprendre`);
    process.exit(1);
  }
  state[s.slug] = "done";
  writeFileSync(STATE, JSON.stringify(state, null, 2));
  console.log(`✓ ${s.slug}`);
  if (todo.indexOf(s) < todo.length - 1) spawnSync("powershell", ["-NoProfile", "-Command", `Start-Sleep -Seconds ${PAUSE_S}`]);
}
console.log("TERMINE — " + todo.length + " images.");
