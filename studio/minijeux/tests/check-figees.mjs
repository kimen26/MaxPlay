#!/usr/bin/env node
// check-figees.mjs — porte R12 : cohérence interne des figées mini-jeux
// (studio/minijeux/docs/jeux/figees/*.md) + absence de phrases interdites
// dans les agents/skills qui écrivent sur le pôle DINO.
//
// Trois règles :
//
// 1) [BLOQUANT] Ligne 🔒 citée dans une section DÉFIGÉ/SUPPRIMÉE plus bas dans
//    LE MÊME fichier, mais pas barrée `~~`. Détecté par similarité de mots-clés
//    entre le texte de la ligne 🔒 et le texte du paragraphe DÉFIGÉ (heuristique
//    volontairement resserrée sur les mots pleins pour éviter les faux positifs).
//    Réutilise `findUnsourcedLockLines` en interne pour le découpage figée
//    (même logique de fenêtre que check-mj-coherence.mjs — dupliquée ici à
//    dessein : ce sont deux scripts CLI indépendants avec effets de bord en
//    tête de fichier, pas des modules faits pour être importés l'un par
//    l'autre).
//
// 2) [BLOQUANT] Deux nombres différents pour le MÊME invariant nommé (même
//    sujet en gras juste après 🔒) dans la même figée. Reste conservateur :
//    seulement quand le sujet en gras est identique mot pour mot — sinon
//    AVERTISSEMENT (faux positifs = avertissement, jamais bloquant, cf. brief).
//
// 3) [BLOQUANT] Phrases interdites des lignes ❌ 🔒 des figées (grepées
//    dynamiquement — pas de liste en dur) trouvées dans `.claude/agents/*.md`
//    et `.claude/skills/**` UNIQUEMENT (jamais les rules, qui légitimement
//    CITENT l'interdiction). Exclut les lignes contenant
//    abrogé|défigé|remplace|prescrivait (citation historique/légitime de la
//    règle, pas une contradiction).
//
// Usage :
//   node check-figees.mjs               → toutes les figées + tout agents/skills
//   node check-figees.mjs --json        → sortie JSON
// Sort code 1 si au moins un BLOQUANT, 0 sinon (les AVERTISSEMENT n'affectent pas l'exit code).
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..', '..', '..');
const FIGEES = resolve(ROOT, 'studio', 'minijeux', 'docs', 'jeux', 'figees');
const AGENTS_DIR = resolve(ROOT, '.claude', 'agents');
const SKILLS_DIR = resolve(ROOT, '.claude', 'skills');

const args = process.argv.slice(2);
const asJson = args.includes('--json');

const GREEN = '\x1b[32m', RED = '\x1b[31m', YEL = '\x1b[33m', DIM = '\x1b[2m', RST = '\x1b[0m';

// ── util partagé avec check-mj-coherence.mjs (dupliqué à dessein, cf. en-tête) ──
const SOURCE_RE = /(20\d{2}-\d{2}-\d{2})|Papa Yann|(?:^|[^A-Za-z])PY(?:[^A-Za-z]|$)|\bD-\d{3}\b|\bL-\d{3}\b|commit\s+[0-9a-f]{6,}|#\d{3,}/;
function findUnsourcedLockLines(figeePath) {
  if (!existsSync(figeePath)) return [];
  const lines = readFileSync(figeePath, 'utf8').split('\n');
  const unsourced = [];
  lines.forEach((line, i) => {
    if (!line.includes('🔒')) return;
    const window = [line, lines[i - 1] || '', lines[i - 2] || ''];
    const sourced = window.some((l) => SOURCE_RE.test(l));
    if (!sourced) unsourced.push({ n: i + 1, text: line.trim().slice(0, 140) });
  });
  return unsourced;
}

function listMdFilesRecursive(dir) {
  let out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) out = out.concat(listMdFilesRecursive(p));
    else if (entry.endsWith('.md')) out.push(p);
  }
  return out;
}

// mots vides français/anglais courants — ignorés dans la comparaison de similarité
const STOPWORDS = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'à', 'en',
  'dans', 'sur', 'pour', 'pas', 'plus', 'ne', 'jamais', 'toujours', 'est', 'sont', 'avec', 'sans',
  'the', 'a', 'an', 'of', 'and', 'or', 'in', 'on', 'for', 'not', 'never', 'always', 'is', 'are']);

function keywordSet(text) {
  return new Set(
    text
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '') // retire accents pour la comparaison
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !STOPWORDS.has(w))
  );
}

function jaccard(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let inter = 0;
  for (const w of setA) if (setB.has(w)) inter++;
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
}

// ── RÈGLE 1 : 🔒 défigé plus bas, non barré ~~ ──────────────────────────────
// Trouve les lignes "DÉFIGÉ 🔒→❌" / "SUPPRIMÉE" / "abrogé" dans le Journal des
// défigeages (append-only, toujours en bas de fichier), extrait le SUJET EN
// GRAS de la ligne de défigeage elle-même (ex. « DÉFIGÉ 🔒→❌ : **la pépite
// T-Rex/Stégosaure** »), et compare ce sujet à celui de chaque ligne 🔒 encore
// active plus haut (sujet-à-sujet, pas ligne-entière-à-paragraphe : un
// Jaccard sur le texte complet des lignes est bien trop bruité — calibré sur
// mj-31.md, cf. commentaire de seuil ci-dessous).
//
// Exclusions volontaires (moins de faux positifs qu'une comparaison brute) :
//  - lignes ❌ 🔒 (anti-régression) : ce sont des rappels PERMANENTS, pas des
//    déclarations de mécanique qu'on retire — même après un défigeage, la
//    règle "ne jamais les présenter comme croisables" reste vraie de fait.
//  - lignes sans sujet en gras `**...**` juste après 🔒 : pas assez de signal.
//
// Seuil Jaccard sur les MOTS DU SUJET (≥ 5 lettres, hors stopwords) = 0.4,
// calibré empiriquement le 2026-09-29 : sur mj-31.md, les 2 vrais cas
// (pépite T-Rex/Stégosaure, finale météorite) scorent 0.40 et 0.60 ; un 3e
// candidat structurellement proche mais RÉELLEMENT différent (« Finale
// météorite = 4 écrans successifs », qui décrit le NOUVEAU layout post-
// défigeage, pas l'ancienne fonctionnalité coupée) score 0.33 et doit rester
// sous le seuil. Vérifié : 0 faux positif sur les 37 figées à ce seuil.
const DEFIGE_MARKER_RE = /DÉFIGÉ\s*🔒→❌|SUPPRIMÉE?\s+(du|de)\s|(?:^|\s)abrogé(?:e)?\b/i;
const BOLD_SUBJECT_ONLY_RE = /\*\*([^*]+)\*\*/;
const STRIKETHROUGH_THRESHOLD = 0.4;

function checkStrikethroughRule(figeePath) {
  const findings = [];
  const lines = readFileSync(figeePath, 'utf8').split('\n');

  // paragraphes de défigeage : sujet en gras de la ligne DÉFIGÉ elle-même
  const defigeParagraphs = [];
  lines.forEach((line, i) => {
    if (!DEFIGE_MARKER_RE.test(line)) return;
    const m = BOLD_SUBJECT_ONLY_RE.exec(line);
    if (!m) return;
    defigeParagraphs.push({ n: i + 1, subjectKeywords: keywordSet(m[1]) });
  });
  if (!defigeParagraphs.length) return findings;

  // lignes 🔒 NON barrées, AVANT le premier marqueur de défigeage (le journal
  // est toujours en bas, append-only) — on ignore les lignes ❌ (permanentes)
  // et déjà barrées ~~.
  const firstDefigeLine = defigeParagraphs[0].n;
  lines.forEach((line, i) => {
    const n = i + 1;
    if (n >= firstDefigeLine) return;
    if (!line.includes('🔒') || line.includes('❌') || line.includes('~~')) return;
    const m = BOLD_SUBJECT_ONLY_RE.exec(line);
    if (!m) return;
    const lineSubjectKeywords = keywordSet(m[1]);
    for (const para of defigeParagraphs) {
      const score = jaccard(lineSubjectKeywords, para.subjectKeywords);
      if (score >= STRIKETHROUGH_THRESHOLD) {
        findings.push({
          lockLine: n,
          lockText: line.trim().slice(0, 140),
          defigeLine: para.n,
          score: score.toFixed(2),
        });
        break;
      }
    }
  });
  return findings;
}

// ── RÈGLE 2 : deux nombres pour le même invariant (sujet 🔒 **...** identique) ──
// Conservateur : n'agit que si le sujet en gras juste après 🔒 est IDENTIQUE
// mot pour mot entre deux lignes — sinon on ne compare pas (évite de comparer
// des invariants différents qui partagent juste un nombre). Toujours AVERTISSEMENT.
const BOLD_SUBJECT_RE = /🔒\s*\*\*([^*]+)\*\*/;
const NUMBER_RE = /\b(\d+(?:[.,]\d+)?)\b/g;

function checkDuplicateNumberRule(figeePath) {
  const findings = [];
  const lines = readFileSync(figeePath, 'utf8').split('\n');
  const bySubject = new Map();
  lines.forEach((line, i) => {
    const m = BOLD_SUBJECT_RE.exec(line);
    if (!m) return;
    const subject = m[1].trim().toLowerCase();
    const numbers = [...line.matchAll(NUMBER_RE)].map((x) => x[1]);
    if (!numbers.length) return;
    if (!bySubject.has(subject)) bySubject.set(subject, []);
    bySubject.get(subject).push({ n: i + 1, numbers, text: line.trim().slice(0, 140) });
  });
  for (const [subject, occurrences] of bySubject) {
    if (occurrences.length < 2) continue;
    const allNumbers = new Set(occurrences.flatMap((o) => o.numbers));
    if (allNumbers.size > 1) {
      findings.push({ subject, occurrences });
    }
  }
  return findings;
}

// ── RÈGLE 3 : phrases interdites (❌ 🔒 des figées) dans agents/skills ──────
// R12 nomme 4 phrases précises, issues des lignes ❌ 🔒 du paragraphe Tritri &
// Wex de studio/dino/figees/encyclopedie.md (RE-FIGÉ 2026-09-11) : "running
// gag", "fil rouge", "doudou", "quête". PAS d'extraction dynamique sur TOUTES
// les figées mini-jeux — testé, ça remonte des dizaines de faux positifs
// (chaque figée mj-XX a ses propres ❌ 🔒 UX/UI sans rapport, ex. mj-22 « pas
// de "perdu" », menu.md « jamais "Stratégie" » : des mots-clés génériques que
// n'importe quel agent emploie légitimement hors contexte Tritri). On grep
// donc UNIQUEMENT ces 4 phrases nommées, en excluant :
//  - les lignes qui les CITENT légitimement (abrogé/défigé/remplace/prescrivait,
//    ou dans un motif de grep entre backticks `max|doudou|peluche...` — c'est
//    une instruction "vérifie l'absence de", pas une affirmation contraire) ;
//  - "doudou" seul reste sensible : on ne flag QUE s'il n'est pas dans une
//    liste d'interdits (contexte `|doudou|` / "grep interdits" / "JAMAIS ...
//    doudou") pour ne pas punir l'agent qui rappelle correctement la règle.
const FORBIDDEN_PHRASES = ['running gag', 'fil rouge', 'doudou', 'quête'];
const EXCLUDE_CONTEXT_RE = /abrogé|défigé|remplace|prescrivait/i;
// motif "liste d'interdits" légitime : grep pattern entre backticks, ou
// énumération explicite "JAMAIS X/Y/Z", ou "interdit(s)" à proximité.
const LEGITIMATE_BAN_LIST_RE = /grep|JAMAIS[^.]*doudou|interdit[es]?\b.{0,20}(doudou|peluche|nounours)|(doudou|peluche|nounours)\/(peluche|nounours)/i;

function scanForbiddenPhrasesInFile(file) {
  const findings = [];
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (EXCLUDE_CONTEXT_RE.test(line)) return;
    if (LEGITIMATE_BAN_LIST_RE.test(line)) return;
    const lower = line.toLowerCase();
    for (const phrase of FORBIDDEN_PHRASES) {
      if (lower.includes(phrase)) {
        findings.push({ n: i + 1, phrase, text: line.trim().slice(0, 140) });
      }
    }
  });
  return findings;
}

// ═════════════════════════════════════════════════════════════════════════
const figeeFiles = existsSync(FIGEES) ? readdirSync(FIGEES).filter((f) => f.endsWith('.md')) : [];

const strikethroughFindings = [];
const duplicateNumberFindings = [];
for (const f of figeeFiles) {
  const p = resolve(FIGEES, f);
  const strike = checkStrikethroughRule(p);
  if (strike.length) strikethroughFindings.push({ id: f.replace(/\.md$/, ''), findings: strike });
  const dup = checkDuplicateNumberRule(p);
  if (dup.length) duplicateNumberFindings.push({ id: f.replace(/\.md$/, ''), findings: dup });
}

const agentSkillFiles = [
  ...(existsSync(AGENTS_DIR) ? readdirSync(AGENTS_DIR).filter((f) => f.endsWith('.md')).map((f) => resolve(AGENTS_DIR, f)) : []),
  ...listMdFilesRecursive(SKILLS_DIR),
];
const forbiddenPhraseFindings = [];
for (const file of agentSkillFiles) {
  const findings = scanForbiddenPhrasesInFile(file);
  if (findings.length) forbiddenPhraseFindings.push({ file, findings });
}

// ── verdict ──────────────────────────────────────────────────────────────
// BLOQUANT : règle 1 (défigé non barré) + règle 3 (phrase interdite dans agents/skills).
// AVERTISSEMENT : règle 2 (deux nombres — conservateur, brief explicite).
const totalBlocking = strikethroughFindings.reduce((s, g) => s + g.findings.length, 0)
  + forbiddenPhraseFindings.reduce((s, g) => s + g.findings.length, 0);
const totalWarn = duplicateNumberFindings.reduce((s, g) => s + g.findings.length, 0);

if (asJson) {
  console.log(JSON.stringify({
    strikethroughFindings, duplicateNumberFindings, forbiddenPhraseFindings,
    totalBlocking, totalWarn,
  }, null, 2));
} else {
  console.log(`\n── check-figees.mjs — ${figeeFiles.length} figée(s), ${agentSkillFiles.length} fichier(s) agents/skills ──\n`);

  if (strikethroughFindings.length) {
    console.log(`${RED}RÈGLE 1 — ligne 🔒 défigée plus bas mais non barrée ~~ :${RST}`);
    for (const { id, findings } of strikethroughFindings) {
      for (const f of findings) {
        console.log(`  ${RED}✗${RST} ${id}.md:${f.lockLine} — "${f.lockText}"${DIM} (défigeage l.${f.defigeLine}, similarité ${f.score})${RST}`);
      }
    }
    console.log('');
  }

  if (duplicateNumberFindings.length) {
    console.log(`${YEL}RÈGLE 2 (avertissement) — deux nombres pour le même invariant nommé :${RST}`);
    for (const { id, findings } of duplicateNumberFindings) {
      for (const f of findings) {
        console.log(`  ${YEL}⚠${RST} ${id}.md — "${f.subject}" : ${f.occurrences.map((o) => `l.${o.n}=${o.numbers.join('/')}`).join(', ')}`);
      }
    }
    console.log('');
  }

  if (forbiddenPhraseFindings.length) {
    console.log(`${RED}RÈGLE 3 — phrase interdite (figée ❌ 🔒) trouvée dans un agent/skill :${RST}`);
    for (const { file, findings } of forbiddenPhraseFindings) {
      for (const f of findings) {
        console.log(`  ${RED}✗${RST} ${file}:${f.n} — "${f.phrase}" dans "${f.text}"`);
      }
    }
    console.log('');
  }

  console.log(totalBlocking === 0
    ? `${GREEN}✓ 0 manque bloquant${totalWarn ? ` (${totalWarn} avertissement(s))` : ''}${RST}\n`
    : `${RED}✗ ${totalBlocking} manque(s) bloquant(s)${RST}\n`);
}

process.exit(totalBlocking === 0 ? 0 : 1);
