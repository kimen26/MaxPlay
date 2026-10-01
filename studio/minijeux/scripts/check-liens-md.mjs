// check-liens-md.mjs — porte : tous les liens markdown relatifs (et, dans les
// fichiers de config Claude, tous les chemins cités en backticks/`paths:`)
// pointent-ils vers un fichier ou un dossier qui existe réellement ?
//
// Deux modes de scan, cumulés :
//
// 1) LIENS MARKDOWN `[texte](chemin)` — tout fichier .md sous chaque racine passée
//    en argument. Ignore : liens http(s)/mailto (externes), ancres pures (#xxx),
//    fragment #xxx retiré avant vérification (on vérifie le FICHIER, pas l'ancre).
//
// 2) CHEMINS EN BACKTICKS + `paths:` YAML — UNIQUEMENT dans
//    `.claude/agents/*.md`, `.claude/skills/**/SKILL.md`, `.claude/rules/*.md`
//    (R12) : tout chemin commençant par `studio/`, `site/`, `docs/`, `memory/`
//    ou `.claude/`, cité entre backticks (y compris à l'intérieur d'une commande,
//    ex. `node studio/x/y.cjs <id>` → on isole le token-chemin) ou en item de
//    liste `paths:` (frontmatter YAML des rules path-scoped). Gabarits tolérés :
//    `mj-XX`, `<id>`, `*`, `**` → convertis en glob, au moins UNE correspondance
//    sur disque suffit (sinon chemin mort). `*` seul (segment complet) = wildcard
//    libre — capture ex. `site/js/*.js`.
//
// Usage :
//   node check-liens-md.mjs <dossier> [<dossier> ...]
// Sortie : liste des chemins morts (fichier source -> chemin cassé), exit 1 si au moins un.
import { readdirSync, statSync, readFileSync, existsSync, globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, relative } from 'node:path';

const roots = process.argv.slice(2);
if (!roots.length) {
  console.error('Usage : node check-liens-md.mjs <dossier> [<dossier> ...]');
  process.exit(2);
}

const __dir = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dir, '..', '..', '..');
const YEL = '\x1b[33m', RST = '\x1b[0m';

function listMdFiles(dir) {
  let out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (entry === 'node_modules' || entry === '.git') continue;
      out = out.concat(listMdFiles(p));
    } else if (entry.endsWith('.md')) {
      out.push(p);
    }
  }
  return out;
}

// ── mode 1 : liens markdown [texte](chemin) ────────────────────────────────
const LINK_RX = /\]\(([^)]+)\)/g;
let dead = 0;
const allMdFiles = new Set();

for (const root of roots) {
  const rootAbs = resolve(root);
  if (!existsSync(rootAbs)) {
    console.error(`Racine introuvable : ${root}`);
    process.exit(2);
  }
  for (const f of listMdFiles(rootAbs)) allMdFiles.add(f);
}

for (const file of allMdFiles) {
  const txt = readFileSync(file, 'utf8');
  const base = dirname(file);
  let m;
  while ((m = LINK_RX.exec(txt))) {
    let link = m[1].trim();
    if (!link || link.startsWith('http://') || link.startsWith('https://') || link.startsWith('mailto:')) continue;
    if (link.startsWith('#')) continue; // ancre pure, pas un fichier
    link = link.split('#')[0].split(' ')[0]; // retire ancre + titre optionnel "url "titre""
    if (!link) continue;
    const target = resolve(base, link);
    if (!existsSync(target)) {
      console.log(`${file} -> ${m[1]}`);
      dead++;
    }
  }
}

// ── mode 2 : chemins studio/|site/|docs/|memory/|.claude/ en backticks ou
// `paths:` YAML, UNIQUEMENT dans les fichiers de config Claude (R12) ─────────
const CONFIG_GLOBS = [
  { dir: resolve(REPO_ROOT, '.claude', 'agents'), test: (f) => f.endsWith('.md') },
  { dir: resolve(REPO_ROOT, '.claude', 'rules'), test: (f) => f.endsWith('.md') },
];

function listSkillMdFiles(dir) {
  let out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) out = out.concat(listSkillMdFiles(p));
    else if (entry === 'SKILL.md') out.push(p);
  }
  return out;
}

const configFiles = [];
for (const { dir, test } of CONFIG_GLOBS) {
  if (!existsSync(dir)) continue;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isFile() && test(entry)) configFiles.push(p);
  }
}
configFiles.push(...listSkillMdFiles(resolve(REPO_ROOT, '.claude', 'skills')));

const PATH_ROOT_RX = /^(studio|site|docs|memory|\.claude)\//;
// token = suite de caractères "chemin" (pas d'espace, pas de guillemet/backtick) ;
// inclut { } , pour les accolades de brace-expansion façon shell (ex.
// `brief-{personnages,histoire}.template.md`).
const PATH_TOKEN_RX = /[A-Za-z0-9_./*<>{},-]+/g;

function isGabaritPath(p) {
  return /mj-XX|<[^>]+>|\*|\{[^}]+\}/.test(p);
}

// convertit un chemin-gabarit en pattern glob : mj-XX -> mj-*, <id> -> *,
// {a,b} brace-expansion -> déplié en plusieurs chemins concrets (glob ne
// gère pas nativement {a,b} ici), garde ** / *.
function toGlobPatterns(p) {
  const base = p.replace(/mj-XX/g, 'mj-*').replace(/<[^>]+>/g, '*');
  const braceMatch = base.match(/\{([^}]+)\}/);
  if (!braceMatch) return [base];
  const options = braceMatch[1].split(',');
  return options.map((opt) => base.replace(braceMatch[0], opt));
}

function pathExistsOrMatchesGlob(rawPath) {
  // chemin dossier explicite (trailing /) : on teste le dossier lui-même
  const isDirPath = /\/$/.test(rawPath);
  const cleanPath = rawPath.replace(/\/$/, '') || rawPath;
  const abs = resolve(REPO_ROOT, cleanPath);
  if (existsSync(abs)) return true;
  // Dossier de STAGING explicite (trailing /, pas de gabarit) : un script peut
  // créer ce dossier lui-même à l'exécution (mkdir -p) — on accepte si son
  // PARENT existe (le script a un endroit réel où écrire), sans exiger que le
  // dossier de sortie soit déjà présent sur disque avant toute génération.
  if (isDirPath && !isGabaritPath(rawPath)) {
    const parentAbs = resolve(abs, '..');
    return existsSync(parentAbs);
  }
  if (isGabaritPath(rawPath)) {
    const patterns = toGlobPatterns(rawPath);
    for (const pattern of patterns) {
      const matches = globSync(pattern, { cwd: REPO_ROOT });
      if (matches.length > 0) return true;
    }
    // Repli : le gabarit complet (fichier feuille inclus) ne matche rien sur
    // disque, mais son DOSSIER PARENT gabarit existe pour au moins une
    // instance — cas légitime d'un artefact PAR STORY optionnel/pas encore
    // produit (ex. `<NNN-slug>/9-relecture-rewrite/synthese.md`, étape
    // conditionnelle) ou d'une consigne de nommage prescriptive pour la
    // SORTIE de l'agent (« Enregistrer dans `<NNN>/4-versions-writers/
    // kimi-guide.md» — le nom est celui que l'agent DOIT donner à son
    // fichier, pas une lecture d'un fichier qui devrait déjà exister).
    // On exige au moins UN dossier réel qui matche le gabarit du parent,
    // sinon le chemin reste mort (dossier lui-même introuvable = vraie erreur).
    for (const pattern of patterns) {
      const parentPattern = pattern.split('/').slice(0, -1).join('/');
      if (!parentPattern) continue;
      const parentMatches = globSync(parentPattern, { cwd: REPO_ROOT });
      const ok = parentMatches.some((m) => {
        try { return statSync(resolve(REPO_ROOT, m)).isDirectory(); } catch { return false; }
      });
      if (ok) return true;
    }
    return false;
  }
  return false;
}

// retire les blocs ```...``` (fences) : ce sont des exemples de commandes/JSON,
// pas des affirmations de chemin — un chemin fixture dans un exemple de payload
// de test n'est pas un lien mort, contrairement à un chemin cité en prose.
function stripFencedCodeBlocks(text) {
  return text.replace(/```[\s\S]*?```/g, '');
}

function extractCandidatePaths(text) {
  const found = new Set();
  const prose = stripFencedCodeBlocks(text);

  // backticks inline : `...chemin...` ou `commande arg1 studio/x/y.js arg2`
  const BACKTICK_RX = /`([^`]+)`/g;
  let m;
  while ((m = BACKTICK_RX.exec(prose))) {
    const inner = m[1];
    const tokens = inner.match(PATH_TOKEN_RX) || [];
    for (const tok of tokens) {
      const cleaned = tok.replace(/[),.;:]+$/, '');
      if (PATH_ROOT_RX.test(cleaned)) found.add(cleaned);
    }
  }

  return [...found];
}

function extractYamlPaths(text) {
  const found = new Set();
  const lines = text.split(/\r?\n/);
  let inPathsBlock = false;
  for (const line of lines) {
    if (/^paths:\s*$/.test(line)) { inPathsBlock = true; continue; }
    if (inPathsBlock) {
      const itemMatch = line.match(/^\s*-\s*"?([^"]+?)"?\s*$/);
      if (itemMatch && PATH_ROOT_RX.test(itemMatch[1])) {
        found.add(itemMatch[1]);
        continue;
      }
      if (/^\S/.test(line)) inPathsBlock = false; // fin du bloc YAML
    }
  }
  return [...found];
}

// ── LEGACY nominatif — AVERTISSEMENT, jamais bloquant, N'EN AJOUTE JAMAIS ───
// Deux catégories réelles, chacune constatée le 2026-09-29 (vague 2 process
// militaire, R12) et volontairement PAS corrigée ici :
//  1) `.claude/rules/*.md` — hors du périmètre de fichiers autorisés à
//     l'écriture pour ce chantier (d'autres agents travaillent en parallèle
//     sur `rules/`) ; la cible évidente existe (mêmes fautes que dans les
//     agents pôle : `memory/X.md` bare au lieu de `studio/<pole>/memory/X.md`)
//     mais la correction revient à qui a la main sur ces fichiers.
//  2) `dino-paleoart/SKILL.md` → `site/img/dinos/_new-xxl/_REPRISE.md` —
//     fichier jamais créé (seul `_PROGRESS.tsv` existe dans ce dossier) ;
//     pas de cible de remplacement évidente (suppression de la phrase ?
//     pointer vers `_PROGRESS.tsv` ? autre convention perdue ?) — deviner
//     serait un pansement, pas une correction.
const LEGACY = new Set([
  '.claude/rules/dino.md -> `memory/INVARIANTS.md`',
  '.claude/rules/dino.md -> `memory/_ETAT-DINOS.md`',
  '.claude/rules/dino.md -> `site/js/dinos-images-grok.js`',
  '.claude/rules/dino.md -> `site/js/dinos-racines.js`',
  '.claude/rules/mini-jeux.md -> `memory/INVARIANTS.md`',
  '.claude/rules/mini-jeux.md -> `docs/jeux/INDEX.md`',
  '.claude/rules/personnages.md -> `memory/INVARIANTS.md`',
  '.claude/rules/sons.md -> `site/js/dinos-audio-manifest.js`',
  '.claude/rules/stories-process.md -> `memory/INVARIANTS.md`',
  '.claude/skills/dino-paleoart/SKILL.md -> `site/img/dinos/_new-xxl/_REPRISE.md`',
]);

let deadLegacy = 0;
for (const file of configFiles) {
  const txt = readFileSync(file, 'utf8');
  const candidates = new Set([...extractCandidatePaths(txt), ...extractYamlPaths(txt)]);
  for (const p of candidates) {
    if (!pathExistsOrMatchesGlob(p)) {
      const rel = relative(REPO_ROOT, file).split('\\').join('/');
      const key = `${rel} -> \`${p}\``;
      if (LEGACY.has(key)) {
        console.log(`${YEL}⚠ LEGACY${RST} ${file} -> \`${p}\` (chemin config, non bloquant)`);
        deadLegacy++;
      } else {
        console.log(`${file} -> \`${p}\` (chemin config)`);
        dead++;
      }
    }
  }
}

console.log(dead === 0
  ? `\n0 lien mort bloquant.${deadLegacy ? ` (${deadLegacy} LEGACY en avertissement)` : ''}`
  : `\n${dead} lien(s) mort(s).`);
process.exit(dead === 0 ? 0 : 1);
