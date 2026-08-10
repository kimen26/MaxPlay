// Synchronise la boîte Lunii branchée avec la SOURCE DE VÉRITÉ (studio/lunii/packs-manifest.json).
// Script volontairement bête : VÉRIFICATION → TRANSFERT du manquant → VÉRIFICATION.
// N'efface JAMAIS ce qui n'est pas dans le manifest (enregistrements micro, etc.).
//
// Usage :
//   node studio/lunii/scripts/sync-lunii.mjs              # ajoute ce qui manque
//   node studio/lunii/scripts/sync-lunii.mjs --refresh D4E5F603   # supprime + réimporte ce pack
//   node studio/lunii/scripts/sync-lunii.mjs --refresh all        # réimporte tout le manifest
//
// Sources par type : zip/plainpk → lunii-pm -pi · library → STUdio POST /api/device/addFromLibrary.
// Sortie : rapport lisible, exit 0 = SYNC OK, 1 = problème.

import { existsSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

const ROOT = "c:/ProjetsPerso/Claude_Projects/MaxPlay";
const MANIFEST = join(ROOT, "studio/lunii/packs-manifest.json");
const STUDIO_CTL = join(ROOT, "studio/lunii/scripts/studio-ctl.ps1");
const LUNII_PM_DIR = "C:/ProjetsPerso/Tools/Lunii.PACKS";
const LUNII_PM_PY = join(LUNII_PM_DIR, "venv/Scripts/python.exe");
const LUNII_PM = join(LUNII_PM_DIR, "src/lunii-pm.py");
const API = "http://localhost:8080";

const args = process.argv.slice(2);
const refreshIdx = args.indexOf("--refresh");
const REFRESH = refreshIdx > -1 ? args[refreshIdx + 1] : null;

let failures = 0;
const ok = (m) => console.log(`  ✔ ${m}`);
const ko = (m) => { failures++; console.log(`  ✘ ${m}`); };
const info = (m) => console.log(`  ${m}`);

function ps(script) {
  return spawnSync("powershell", ["-NoProfile", "-File", script], { encoding: "utf8" });
}
async function studioUp() {
  try { const r = await fetch(`${API}/api/device/packs`, { signal: AbortSignal.timeout(4000) }); return r.ok; }
  catch { return false; }
}
async function ensureStudio(wantUp) {
  const up = await studioUp();
  if (up === wantUp) return true;
  const r = spawnSync("powershell", ["-NoProfile", "-File", STUDIO_CTL, wantUp ? "start" : "stop"], { encoding: "utf8", timeout: 60000 }); // timeout : studio-ctl start peut se figer après le lancement de java
  await new Promise((res) => setTimeout(res, wantUp ? 7000 : 2000));
  return (await studioUp()) === wantUp;
}

// ─── 1. VÉRIFICATIONS ─────────────────────────────────────────────────────────
console.log("\n═══ 1/3 VÉRIFICATION ═══");

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
for (const p of manifest.packs) {
  const src = p.type === "library" ? join(manifest.bibliotheque_maitre, p.src) : p.src;
  existsSync(src) ? ok(`source ${p.titre}`) : ko(`SOURCE INTROUVABLE : ${src}`);
}
if (failures) { console.log("\n⛔ Sources manquantes — corrige le manifest."); process.exit(1); }

// Détecter la boîte
let drive = null;
for (const d of ["D", "E", "F", "G", "H"]) {
  if (existsSync(`${d}:/.pi`) && existsSync(`${d}:/.content`)) { drive = `${d}:`; break; }
}
if (!drive) { console.log("  ✘ Aucune Lunii détectée (D: à H:). Branche-la et relance."); process.exit(1); }
ok(`boîte détectée sur ${drive}`);

// État du device : dossiers .content + cohérence .pi
const { readdirSync } = await import("fs");
const folders = readdirSync(`${drive}/.content`).map((f) => f.toUpperCase());
const piSize = statSync(`${drive}/.pi`).size;
piSize / 16 === folders.length
  ? ok(`cohérence .pi (${folders.length} packs, zéro orphelin)`)
  : ko(`.pi incohérent : ${piSize / 16} entrées vs ${folders.length} dossiers — diagnostic orphelin requis (LESSONS-MOTEUR BUG-4)`);

const onDevice = new Set(folders);
const missing = manifest.packs.filter((p) => !onDevice.has(p.id.toUpperCase()));
const toRefresh = REFRESH
  ? manifest.packs.filter((p) => REFRESH === "all" || p.id.toUpperCase() === REFRESH.toUpperCase())
  : [];
if (REFRESH && toRefresh.length === 0) { console.log(`  ✘ --refresh ${REFRESH} : id inconnu du manifest.`); process.exit(1); }

info(`${onDevice.size} packs sur la boîte · ${missing.length} manquant(s) · ${toRefresh.length} à rafraîchir`);
if (missing.length === 0 && toRefresh.length === 0) {
  console.log("\n═══ SYNC OK — rien à faire, la boîte est déjà à jour. ═══\n");
  process.exit(0);
}

// ─── 2. TRANSFERT ─────────────────────────────────────────────────────────────
console.log("\n═══ 2/3 TRANSFERT ═══");
const todo = [...new Map([...missing, ...toRefresh].map((p) => [p.id, p])).values()];

function luniiPm(pmArgs, input) {
  // PYTHONUTF8=1 : sinon le logging de lunii-pm crash sur ses emojis (🚧) en console
  // Windows cp1252 et fait échouer remove/import silencieusement.
  const r = spawnSync(LUNII_PM_PY, [LUNII_PM, "-d", `${drive}/`, ...pmArgs], { cwd: LUNII_PM_DIR, input, encoding: "utf8", timeout: 600000, env: { ...process.env, PYTHONUTF8: "1", PYTHONIOENCODING: "utf-8" } });
  return (r.stdout || "") + (r.stderr || "");
}

// Après un -pr (remove), la Lunii v2 se ré-énumère en USB : D:/ disparaît quelques
// secondes → un -pi lancé tout de suite échoue ("Directory 'D:/' does not exist").
// On attend donc le retour de la boîte (jusqu'à 90 s) avant chaque opération lunii-pm.
async function waitForDevice(timeoutMs = 90000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    for (const d of ["D", "E", "F", "G", "H"]) {
      if (existsSync(`${d}:/.pi`) && existsSync(`${d}:/.content`)) { drive = `${d}:`; return true; }
    }
    await new Promise((res) => setTimeout(res, 2000));
  }
  return false;
}

// a) type library → via STUdio (doit tourner)
const libPacks = todo.filter((p) => p.type === "library");
if (libPacks.length) {
  if (await ensureStudio(true)) {
    for (const p of libPacks) {
      if (toRefresh.includes(p)) { info(`(library déjà présent ignoré au refresh : ${p.titre} — inchangé côté source)`); continue; }
      const r = await fetch(`${API}/api/device/addFromLibrary`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid: p.src, path: p.src }),
      });
      if (!r.ok) { ko(`addFromLibrary ${p.titre} : HTTP ${r.status}`); continue; }
      // attendre l'apparition du dossier (gros packs = long)
      let seen = false;
      for (let i = 0; i < 60 && !seen; i++) {
        await new Promise((res) => setTimeout(res, 5000));
        seen = readdirSync(`${drive}/.content`).map((f) => f.toUpperCase()).includes(p.id.toUpperCase());
      }
      seen ? ok(`transféré (bibliothèque) : ${p.titre}`) : ko(`timeout transfert : ${p.titre}`);
    }
  } else ko("STUdio injoignable — packs 'library' non transférés");
}

// b) types zip/plainpk → via lunii-pm (STUdio arrêté)
const pmPacks = todo.filter((p) => p.type !== "library");
if (pmPacks.length) {
  if (await ensureStudio(false)) ok("STUdio arrêté (device libéré)");
  else { ko("STUdio ne s'arrête pas — abandon"); process.exit(1); }
  for (const p of pmPacks) {
    if (toRefresh.includes(p) && onDevice.has(p.id.toUpperCase())) {
      luniiPm(["-pr", p.id], "y\n");
      info(`ancien retiré : ${p.titre}`);
      if (await waitForDevice()) info(`boîte de retour sur ${drive}`);
      else { ko(`boîte perdue après retrait de ${p.titre} — rebranche et relance`); continue; }
    }
    const out = luniiPm(["-pi", p.src]);
    /Stories imported/.test(out) ? ok(`importé : ${p.titre}`) : ko(`import ${p.titre} : ${out.slice(-200)}`);
  }
  await ensureStudio(true);
}

// ─── 3. VÉRIFICATION FINALE ───────────────────────────────────────────────────
console.log("\n═══ 3/3 VÉRIFICATION FINALE ═══");
const foldersAfter = readdirSync(`${drive}/.content`).map((f) => f.toUpperCase());
const piAfter = statSync(`${drive}/.pi`).size;
piAfter / 16 === foldersAfter.length
  ? ok(`cohérence .pi (${foldersAfter.length} packs)`)
  : ko(`.pi incohérent après sync (${piAfter / 16} vs ${foldersAfter.length})`);
for (const p of manifest.packs) {
  foldersAfter.includes(p.id.toUpperCase()) ? ok(p.titre) : ko(`TOUJOURS MANQUANT : ${p.titre}`);
}

console.log(failures ? `\n⛔ SYNC INCOMPLÈTE (${failures} problème(s)) — voir ✘ ci-dessus.\n` : `\n═══ SYNC OK — ${foldersAfter.length} packs sur la boîte, tout le manifest présent. ═══\n`);
process.exit(failures ? 1 : 0);
