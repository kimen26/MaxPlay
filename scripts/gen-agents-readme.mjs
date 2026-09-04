#!/usr/bin/env node
// Génère .claude/agents/README.md (table + garde-fou frontmatter) depuis les frontmatters
// des agents. Lecture seule sur .claude/agents/*.md, écrit uniquement README.md.
//
// Usage : node scripts/gen-agents-readme.mjs
//
// Créé 2026-09-03 (HO-G12) — catalogue unique d'équipe, remplace la double
// tenue manuelle EQUIPE.md (jeu) / ORGANIGRAMME.md (narration).

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";

const AGENTS_DIR = join(process.cwd(), ".claude", "agents");
const README_PATH = join(AGENTS_DIR, "README.md");

const POLE_PREFIXES = [
  ["dino-", "DINO"],
  ["game-", "JEU"],
  ["narration-", "NARRATION"],
];

function detectPole(name) {
  for (const [prefix, pole] of POLE_PREFIXES) {
    if (name.startsWith(prefix)) return pole;
  }
  if (name === "narration") return "NARRATION";
  return "TRANSVERSE";
}

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const block = m[1];
  const fields = {};
  // name / model / memory / tools / skills : valeurs simples sur une ligne,
  // "description" peut être multi-mots avec ou sans guillemets.
  for (const line of block.split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_]+):\s?(.*)$/);
    if (!kv) continue;
    const [, key, rawValue] = kv;
    let value = rawValue.trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    fields[key] = value;
  }
  return fields;
}

function main() {
  const files = readdirSync(AGENTS_DIR)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .sort();

  const rows = [];
  const warnings = [];

  for (const file of files) {
    const path = join(AGENTS_DIR, file);
    const text = readFileSync(path, "utf-8");
    const fm = parseFrontmatter(text);
    const fileBase = basename(file, ".md");

    if (!fm) {
      warnings.push(`${file} — pas de frontmatter YAML détecté`);
      continue;
    }
    if (!fm.name) {
      warnings.push(`${file} — champ "name" manquant`);
    } else if (fm.name !== fileBase) {
      warnings.push(`${file} — name (${fm.name}) != nom de fichier (${fileBase})`);
    }
    if (!fm.model) {
      warnings.push(`${file} — champ "model" manquant`);
    }
    if (fm.description) {
      // Détection du piège frontmatter documenté en tête de ce README : dans une valeur
      // description: NON quotée, un ":" interne, un em-dash (—) ou un "×" font rejeter
      // l'agent silencieusement par le parseur YAML strict du harness.
      const rawDescLine = text.split(/\r?\n/).find((l) => l.startsWith("description:")) || "";
      const isQuoted = /^description:\s*"/.test(rawDescLine);
      const value = rawDescLine.replace(/^description:\s*/, "");
      // ":" dangereux = un ":" suivi d'un espace, APRÈS le premier caractère de la valeur
      // (le "description:" lui-même ne compte pas — on regarde uniquement la valeur).
      const hasInternalColon = /: /.test(value);
      const hasEmDash = /—/.test(value);
      const hasMultiply = /×/.test(value);
      if (!isQuoted && (hasInternalColon || hasEmDash || hasMultiply)) {
        const why = [
          hasInternalColon && '":" interne',
          hasEmDash && 'em-dash "—"',
          hasMultiply && '"×"',
        ]
          .filter(Boolean)
          .join(", ");
        warnings.push(`${file} — description non quotée contient ${why} (risque de rejet silencieux — voir § règle frontmatter)`);
      }
    } else {
      warnings.push(`${file} — champ "description" manquant`);
    }

    rows.push({
      name: fm.name || fileBase,
      model: fm.model || "?",
      pole: detectPole(fm.name || fileBase),
      description: fm.description || "",
      memory: fm.memory === "project" ? "project" : "—",
      skills: fm.skills || "—",
    });
  }

  rows.sort((a, b) => a.pole.localeCompare(b.pole) || a.name.localeCompare(b.name));

  const lines = [];
  lines.push("# Agents projet MaxPlay");
  lines.push("");
  lines.push("> **Catalogue généré** par `scripts/gen-agents-readme.mjs` depuis les frontmatters de `.claude/agents/*.md`.");
  lines.push("> Ne pas éditer la table à la main — elle sera écrasée au prochain run. Régénérer après tout ajout/retrait/renommage d'agent :");
  lines.push("> ```bash");
  lines.push("> node scripts/gen-agents-readme.mjs");
  lines.push("> ```");
  lines.push("");
  lines.push("## ⚠️ Règle critique frontmatter (ne plus jamais oublier)");
  lines.push("");
  lines.push("Le harness Claude Code parse le YAML du frontmatter en mode strict. Dans la valeur `description:` **non quotée**, certains caractères font **rejeter silencieusement l'agent** (il disparaît de la liste sans erreur visible) :");
  lines.push("");
  lines.push("| Interdit | Remplacer par |");
  lines.push("|----------|---------------|");
  lines.push("| `:` interne (ex: `Foo : bar`) | `-` ou `(parenthèses)` |");
  lines.push("| Em-dash `—` (U+2014) | `-` (tiret simple) |");
  lines.push("| `×` (U+00D7) | `x` |");
  lines.push("");
  lines.push("**OK :** accents (é è à ç), apostrophes typographiques ('), virgules, points, parenthèses, tirets simples.");
  lines.push("");
  lines.push("**Alternative** si on tient au caractère : quoter la description.");
  lines.push("```yaml");
  lines.push('description: "Foo : bar — baz"');
  lines.push("```");
  lines.push("");
  lines.push("### Symptôme du bug");
  lines.push("");
  lines.push("- Agent présent sur disque, frontmatter visiblement valide");
  lines.push("- Pas listé dans les `subagent_type` disponibles");
  lines.push("- Aucune erreur dans la sortie Claude Code");
  lines.push("- Reboot VSCode ne change rien");
  lines.push("");
  lines.push("### Diagnostic en 30 secondes");
  lines.push("");
  lines.push("```bash");
  lines.push("grep -P '[—×]|: .* :' .claude/agents/*.md");
  lines.push("```");
  lines.push("");
  lines.push("Si match dans une ligne `description:` → cause probable. Ce script (`gen-agents-readme.mjs`) fait la même détection automatiquement et liste les fichiers suspects ci-dessous si besoin.");
  lines.push("");
  lines.push("### Historique");
  lines.push("");
  lines.push("- **2026-05-02** : 5 agents (narration-pmo, narration-architecte, narration-audio, narration-gatekeeper, pixel-map-simplifier) absents pendant ~1 semaine. Cause identifiée et corrigée. Règle documentée ici.");
  lines.push("- **2026-09-03** (HO-G12) : fusion des 3 agents pipeline tile en `game-tile.md` (3 modes, **abandonné et archivé le 2026-09-05** avec tout le sous-domaine tile, cf. `_archive/INDEX.md`) ; fusion `narration-lecteur` + `narration-lecteur-dyade` en `narration-lecteur.md` (2 modes) ; archivage `narration-science` + `narration-sensibilite` (0 usage tracé) ; passage à `memory: project` pour conseillers + PMO + directeur + gatekeeper narration ; `EQUIPE.md` / `ORGANIGRAMME.md` réduits à ce que ce catalogue ne couvre pas.");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Catalogue des agents");
  lines.push("");
  lines.push("| Agent | Modèle | Pôle | Mémoire | Skills préchargés | Description |");
  lines.push("|-------|--------|------|---------|--------------------|--------------|");
  for (const r of rows) {
    lines.push(
      `| \`${r.name}\` | ${r.model} | ${r.pole} | ${r.memory} | ${r.skills} | ${r.description.replace(/\|/g, "\\|")} |`
    );
  }
  lines.push("");

  if (warnings.length) {
    lines.push("---");
    lines.push("");
    lines.push("## ⚠️ Avertissements de la dernière génération");
    lines.push("");
    for (const w of warnings) lines.push(`- ${w}`);
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push("## Liens");
  lines.push("");
  lines.push("- Pôle JEU — équipe et workflows détaillés : [`../../studio/minijeux/EQUIPE.md`](../../studio/minijeux/EQUIPE.md)");
  lines.push("- Pôle NARRATION — chaîne de commandement et cérémonies : [`../../studio/narration/equipe/ORGANIGRAMME.md`](../../studio/narration/equipe/ORGANIGRAMME.md)");
  lines.push("- Index équipe narration : [`../../studio/narration/equipe/INDEX.md`](../../studio/narration/equipe/INDEX.md)");
  lines.push("- Process militaire narration (11 étapes 0-10) : [`../../studio/narration/equipe/PROCESS.md`](../../studio/narration/equipe/PROCESS.md)");
  lines.push("- Mémoires officielles des agents (`memory: project`) : [`../agent-memory/`](../agent-memory/)");
  lines.push("");

  writeFileSync(README_PATH, lines.join("\n"), "utf-8");

  console.log(`README généré : ${rows.length} agents, ${warnings.length} avertissement(s).`);
  if (warnings.length) {
    console.log("Avertissements :");
    for (const w of warnings) console.log(`  - ${w}`);
  }
}

main();
