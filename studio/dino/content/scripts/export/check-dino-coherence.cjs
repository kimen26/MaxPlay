#!/usr/bin/env node
// check-dino-coherence.cjs — DoD mécanique dino, clone de check-mj-coherence.mjs (R04, vague
// 3 process militaire). Un id complet = coherent sur TOUS les axes ci-dessous, mesuré depuis
// le disque, jamais tenu à la main (cause racine du Scélidosaure oublié : 3 tables à la main
// qui pouvaient mentir séparément — R03 a supprimé la table UI, R04 verrouille le reste).
//
// Usage :
//   node check-dino-coherence.cjs                 → tous les ids de _ordre.json
//   node check-dino-coherence.cjs scelidosaurus    → un seul id
//   node check-dino-coherence.cjs --json           → sortie JSON (CI/agents)
//   node check-dino-coherence.cjs --md             → sortie Markdown (remplace _gen-etat-dinos.cjs)
//
// Axes vérifiés par id :
//   [BLOQUANT] fiche studio/dino/content/dinos/<id>.json conforme à _schema.json (champs requis)
//   [BLOQUANT] id présent dans _ordre.json, aucun json orphelin (json sur disque hors _ordre.json)
//   [BLOQUANT] script fr studio/dino/content/scripts-audio/fr/V3/<id>.md présent
//              + _verif-scripts-audio.cjs fr <id> OK (appelé en sous-process, pas réimporté)
//   [BLOQUANT] 5 MP3 fr présents (nom/taille/regime/funfact/recap) et chacun > 5 Ko
//   [BLOQUANT] hero + 4 scènes paléoart (manger/paris/ecosysteme/funfact) présentes
//   [BLOQUANT] coloriage présent
//   [BLOQUANT] ombre présente (img/dinos/ombres/<Base>_ombre.png)
//   [BLOQUANT] présence dans site/js/gen/dinos-ui.js (DINO_EXTRAS + DINO_AUDIO) — le bug du
//              Scélidosaure exactement : câblé nulle part malgré des assets complets
//   [BLOQUANT] entrée racines.json (étymologie) — réutilise le parsing de _verif-scripts-audio.cjs
//   [BLOQUANT] entrée dinos dans content/i18n/en/strings.json + script scripts-audio/en/<id>.md
//   [BLOQUANT] >= 2 scènes dans sources/combats/combats.json
//   [AVERT]    sprite + tête (img/dinos/sprites/<Base>_{sprite,tete}.{png,webp})
//   [AVERT]    bébé (img/dinos/bebes/<Base>_bebe.webp)
//   [AVERT]    dette référentiel dino.<id>.* (lue depuis studio/referentiel/_ETAT-CONTENU.md,
//              généré — jamais recalculée ici, cette dette bouge au fil des productions audio)
//
// Axes manquants pour de la dette EXISTANTE (jour du branchement de cette porte) : sets LEGACY
// nominatifs par axe ci-dessous, avertissement seul — n'y ajoute JAMAIS un id neuf (un id neuf
// en échec sur un axe LEGACY est une VRAIE erreur bloquante, pas de la dette).
//
// Sort code 1 si au moins un id a un manque BLOQUANT (hors _wip.json), 0 sinon. `_wip.json`
// (dinos en cours de création via un futur `dino:new`, jamais la dette existante) exempte
// totalement un id de la sortie BLOQUANTE en mode global (tous les ids) — jamais en mode
// id explicite (`check-dino-coherence.cjs <id>` reste bloquant même en wip, un `dino:new`
// veut voir l'état réel).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../../../../..');
const SITE = path.join(ROOT, 'site');
const DINOS_DIR = path.join(ROOT, 'studio/dino/content/dinos');
const SCRIPTS_FR_DIR = path.join(ROOT, 'studio/dino/content/scripts-audio/fr/V3');
const SCRIPTS_EN_DIR = path.join(ROOT, 'studio/dino/content/scripts-audio/en');
const AUDIO_FR_DIR = path.join(SITE, 'audio/dinos/fr');
const PALEOART_DIR = path.join(SITE, 'img/dinos/paleoart');
const OMBRES_DIR = path.join(SITE, 'img/dinos/ombres');
const SPRITES_DIR = path.join(SITE, 'img/dinos/sprites');
const BEBES_DIR = path.join(SITE, 'img/dinos/bebes');
const DINOS_UI_PATH = path.join(SITE, 'js/gen/dinos-ui.js');
const RACINES_PATH = path.join(ROOT, 'studio/dino/content/data/racines.json');
const COMBATS_PATH = path.join(ROOT, 'studio/dino/content/sources/combats/combats.json');
const EN_STRINGS_PATH = path.join(ROOT, 'studio/dino/content/i18n/en/strings.json');
const ETAT_CONTENU_PATH = path.join(ROOT, 'studio/referentiel/_ETAT-CONTENU.md');
const WIP_PATH = path.join(ROOT, 'studio/dino/content/dinos/_wip.json');
const VERIF_SCRIPTS_AUDIO = path.join(ROOT, 'studio/dino/content/scripts/export/_verif-scripts-audio.cjs');

// ── LEGACY nominatif par axe (dette EXISTANTE au jour du branchement, 2026-09-29 mesuré) ──
// N'ajoute jamais un id neuf ici : liste qui ne peut que rétrécir (pattern audit-gabarit.mjs).
const LEGACY_SPRITE = new Set(['scelidosaurus']);
const LEGACY_TETE = new Set(['scelidosaurus']);
const LEGACY_BEBE = new Set([]);

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const asMd = args.includes('--md');
const wanted = args.filter((a) => !a.startsWith('--'));

const has = (p) => fs.existsSync(p);
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

// ── charge le référentiel des ids ────────────────────────────────────────────────
const ordreData = readJson(path.join(DINOS_DIR, '_ordre.json'));
const ordre = ordreData.ordre || [];
const diskIds = fs.readdirSync(DINOS_DIR).filter((f) => f.endsWith('.json') && !f.startsWith('_')).map((f) => f.replace(/\.json$/, ''));
const orphelins = diskIds.filter((id) => !ordre.includes(id));

const wip = has(WIP_PATH) ? readJson(WIP_PATH) : [];
if (!Array.isArray(wip)) { console.error('✗ _wip.json doit être un tableau d\'ids'); process.exit(2); }

const racines = has(RACINES_PATH) ? readJson(RACINES_PATH) : { racines: [] };
const racinesByDino = new Set();
for (const rac of racines.racines || []) for (const id of rac.dinos || []) racinesByDino.add(id);

const combats = has(COMBATS_PATH) ? readJson(COMBATS_PATH) : {};
const enStrings = has(EN_STRINGS_PATH) ? readJson(EN_STRINGS_PATH) : { dinos: {} };
const enDinoKeys = new Set(Object.keys(enStrings.dinos || {}));
const enScriptIds = new Set(has(SCRIPTS_EN_DIR) ? fs.readdirSync(SCRIPTS_EN_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')) : []);

const uiSrc = has(DINOS_UI_PATH) ? fs.readFileSync(DINOS_UI_PATH, 'utf8') : '';
const uiExtrasIds = new Set([...uiSrc.matchAll(/^  ([a-z0-9_]+):\[/gm)].map((m) => m[1]));
const uiAudioIds = new Set([...uiSrc.matchAll(/^  ([a-z0-9_]+): _audioSet\(/gm)].map((m) => m[1]));

// dette référentiel dino.<id>.* : comptée depuis le fichier généré _ETAT-CONTENU.md (jamais
// recalculée ici — ce fichier bouge à chaque production audio, ce n'est pas une porte figée).
const detteRefById = {};
if (has(ETAT_CONTENU_PATH)) {
  const txt = fs.readFileSync(ETAT_CONTENU_PATH, 'utf8');
  for (const m of txt.matchAll(/dino\.([a-z0-9_]+)\./g)) detteRefById[m[1]] = (detteRefById[m[1]] || 0) + 1;
}

// ── _verif-scripts-audio.cjs en sous-process (réutilisé tel quel, jamais réimporté) ──
function verifScriptAudio(id) {
  try {
    execFileSync('node', [VERIF_SCRIPTS_AUDIO, 'fr', id], { cwd: ROOT, stdio: 'pipe' });
    return { ok: true };
  } catch (e) {
    const out = (e.stdout ? e.stdout.toString() : '') + (e.stderr ? e.stderr.toString() : '');
    return { ok: false, detail: out.split('\n').filter((l) => l.includes('✖')).slice(0, 5).join(' | ') || 'KO (voir _verif-scripts-audio.cjs)' };
  }
}

const BLOCS5 = ['nom', 'taille', 'regime', 'funfact', 'recap'];
const audioFiles = has(AUDIO_FR_DIR) ? new Set(fs.readdirSync(AUDIO_FR_DIR)) : new Set();

function checkOne(id) {
  const errs = [], warns = [];
  const jsonPath = path.join(DINOS_DIR, `${id}.json`);
  if (!has(jsonPath)) { errs.push(`fiche ${id}.json absente`); return { id, errs, warns }; }
  const d = readJson(jsonPath);

  // ── fiche conforme (champs requis minimaux) ──
  for (const f of ['id', 'name', 'full', 'famille', 'cat', 'taille_m', 'poids_t', 'nom_etym', 'desc', 'fait', 'png']) {
    if (d[f] === undefined || d[f] === null || d[f] === '') errs.push(`champ « ${f} » manquant dans la fiche`);
  }
  if (!ordre.includes(id)) errs.push(`id absent de _ordre.json`);

  const base = d.png ? d.png.replace(/\.(jpg|jpeg|webp|png)$/i, '') : id.charAt(0).toUpperCase() + id.slice(1);
  const paleoart = (suffix) => {
    const webp = path.join(PALEOART_DIR, `${base}_${suffix}.webp`);
    const jpg = path.join(PALEOART_DIR, `${base}_${suffix}.jpg`);
    return has(webp) ? webp : (has(jpg) ? jpg : null);
  };

  // ── hero + 4 scènes paléoart + coloriage ──
  const heroWebp = path.join(PALEOART_DIR, `${base}.webp`);
  const heroJpg = path.join(PALEOART_DIR, `${base}.jpg`);
  if (!has(heroWebp) && !has(heroJpg)) errs.push('hero paléoart absent');
  for (const s of ['manger', 'paris', 'ecosysteme', 'funfact']) if (!paleoart(s)) errs.push(`scène paléoart « ${s} » absente`);
  if (!paleoart('coloriage')) errs.push('coloriage absent');

  // ── ombre ──
  if (!has(path.join(OMBRES_DIR, `${base}_ombre.png`))) errs.push('ombre absente');

  // ── script fr + 5 MP3 ──
  const scriptPath = path.join(SCRIPTS_FR_DIR, `${id}.md`);
  if (!has(scriptPath)) {
    errs.push('script audio fr V3 absent');
  } else {
    const v = verifScriptAudio(id);
    if (!v.ok) errs.push(`_verif-scripts-audio.cjs KO : ${v.detail}`);
  }
  for (const b of BLOCS5) {
    const f = `${id}-${b}.mp3`;
    if (!audioFiles.has(f)) { errs.push(`MP3 fr « ${b} » absent`); continue; }
    const taille = fs.statSync(path.join(AUDIO_FR_DIR, f)).size;
    if (taille < 5000) errs.push(`MP3 fr « ${b} » trop petit (${taille} o < 5 Ko)`);
  }

  // ── câblage dinos-ui.js (LE bug Scélidosaure) ──
  if (!uiExtrasIds.has(id)) errs.push('absent de DINO_EXTRAS (site/js/gen/dinos-ui.js)');
  if (!uiAudioIds.has(id)) errs.push('absent de DINO_AUDIO (site/js/gen/dinos-ui.js)');

  // ── étymologie (racines.json) ──
  if (!racinesByDino.has(id)) errs.push('racines.json : id absent (étymologie non référencée)');

  // ── i18n EN ──
  if (!enDinoKeys.has(id)) errs.push('content/i18n/en/strings.json : clé dinos.<id> absente');
  if (!enScriptIds.has(id)) errs.push('script audio EN absent (scripts-audio/en/<id>.md)');

  // ── combats (>= 2 scènes) ──
  const nScenes = ((combats[id] || {}).scenes || []).length;
  if (nScenes < 2) errs.push(`combats.json : ${nScenes} scène(s) (< 2)`);

  // ── AVERT : sprite / tête / bébé ──
  const sprite = (suffix) => has(path.join(SPRITES_DIR, `${base}_${suffix}.png`)) || has(path.join(SPRITES_DIR, `${base}_${suffix}.webp`));
  const isLegacySprite = LEGACY_SPRITE.has(id), isLegacyTete = LEGACY_TETE.has(id), isLegacyBebe = LEGACY_BEBE.has(id);
  if (!sprite('sprite')) (isLegacySprite ? warns : errs).push(`sprite absent${isLegacySprite ? ' [LEGACY_SPRITE]' : ''}`);
  if (!sprite('tete')) (isLegacyTete ? warns : errs).push(`tête absente${isLegacyTete ? ' [LEGACY_TETE]' : ''}`);
  if (!has(path.join(BEBES_DIR, `${base}_bebe.webp`))) (isLegacyBebe ? warns : errs).push(`bébé absent${isLegacyBebe ? ' [LEGACY_BEBE]' : ''}`);

  // ── AVERT : dette référentiel ──
  if (detteRefById[id]) warns.push(`dette référentiel : ${detteRefById[id]} entrée(s) dino.${id}.* (studio/referentiel/_ETAT-CONTENU.md)`);

  return { id, errs, warns };
}

// ── cible : id explicite (toujours bloquant, même en wip) ou tous (wip exempté du bloquant) ──
const targets = wanted.length ? wanted : ordre;
const results = targets.map(checkOne);

let ko = 0;
const lines = [];
for (const r of results) {
  const isWip = !wanted.length && wip.includes(r.id);
  const bloquant = r.errs.length > 0 && !isWip;
  if (bloquant) ko++;
  const st = r.errs.length === 0 ? 'OK' : (isWip ? 'WIP' : 'KO');
  lines.push({ ...r, st, isWip });
}

if (orphelins.length) console.error(`✗ ${orphelins.length} json orphelin(s) hors _ordre.json : ${orphelins.join(', ')}`);

if (asJson) {
  console.log(JSON.stringify({ results: lines, orphelins, ko }, null, 2));
} else if (asMd) {
  const N = results.length;
  const complets = results.filter((r) => r.errs.length === 0);
  const incomplets = results.filter((r) => r.errs.length > 0).sort((a, b) => a.errs.length - b.errs.length ? 0 : (b.errs.length - a.errs.length));
  let md = `# _ETAT-DINOS — suivi de complétude (GÉNÉRÉ, ne pas éditer à la main)\n\n`;
  md += `> Régénérer : \`node studio/dino/content/scripts/export/_gen-etat-dinos.cjs\` (appelle check-dino-coherence.cjs --md)\n`;
  md += `> Source : \`check-dino-coherence.cjs\` — un code, deux vues (CLI + ce fichier), R04 vague 3 process militaire.\n\n`;
  md += `## Synthèse\n\n- **${N} dinos** · **${complets.length} complets** · **${incomplets.length} avec un manque bloquant**\n\n`;
  if (incomplets.length) {
    md += `## Incomplets d'abord\n\n| Dino | Manques |\n|------|---------|\n`;
    for (const r of incomplets.sort((a, b) => b.errs.length - a.errs.length)) md += `| \`${r.id}\` | ${r.errs.join('; ')} |\n`;
  } else {
    md += `## Incomplets d'abord\n\n_Aucun — tous les dinos passent la porte bloquante._ 🎉\n`;
  }
  md += `\n## Complets (${complets.length})\n\n` + complets.map((r) => r.id).join(' · ') + '\n';
  if (orphelins.length) md += `\n## Orphelins\n\n${orphelins.join(', ')}\n`;
  md += `\n---\n_Généré le run — relancer le script pour rafraîchir._\n`;
  console.log(md);
} else {
  for (const r of lines) {
    console.log(`${r.st}  ${r.id}`);
    r.errs.forEach((e) => console.log(`     ✖ ${e}`));
    r.warns.forEach((w) => console.log(`     ⚠ ${w}`));
  }
  console.log(`\n${results.length - results.filter((r) => r.errs.length > 0).length} OK · ${results.filter((r) => r.errs.length > 0).length} avec manque (${ko} bloquant, ${results.filter((r) => r.errs.length > 0).length - ko} en wip) · ${results.length} dinos`);
}

process.exit(ko || orphelins.length ? 1 : 0);
