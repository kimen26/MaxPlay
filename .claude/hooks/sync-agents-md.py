# -*- coding: utf-8 -*-
"""Hook PostToolUse — sync infra Claude <-> Kimi (créé 2026-07-19, audit GED).

1. Si le fichier édité est le CLAUDE.md RACINE -> régénère AGENTS.md (miroir Kimi)
   via une table de substitutions exactes. Si une substitution ne matche plus
   (CLAUDE.md a changé sur un passage adapté), ALERTE au lieu de casser le miroir.
2. Si le fichier édité est un hook .claude/hooks/*.ps1 -> rappelle de vérifier
   le portage .kimi-code/hooks/<nom>.kimi.ps1 (parité messages, check 7 du skill
   env-compat-check).

AGENTS.md ne doit JAMAIS être édité à la main : toute modif se fait dans CLAUDE.md.
"""
import sys, json, io, os

ROOT = r"c:\ProjetsPerso\Claude_Projects\MaxPlay"

BANNER = (
    "<!-- MIROIR de CLAUDE.md — point d'entrée Kimi Code (AGENTS.md) et autres agents non-Claude.\n"
    "     CLAUDE.md reste la SOURCE : toute modif se fait là-bas, puis régénérer ce fichier à l'identique\n"
    "     (seul ce bandeau diffère). GÉNÉRÉ par .claude/hooks/sync-agents-md.py — ne pas éditer à la main. -->\n\n"
)

# (source exacte dans CLAUDE.md, version adaptée Kimi dans AGENTS.md)
SUBS = [
    (
        "touché. Ce CLAUDE.md racine est le SEUL re-injecté après `/compact`.",
        "touché. Sous Kimi Code, l'équivalent est le `AGENTS.md` du pôle — le lire explicitement. Ce fichier racine est le SEUL re-injecté après compaction.",
    ),
    (
        "Voir .claude/settings.json. -->",
        "Voir .claude/settings.json (Claude Code) et ~/.kimi-code/config.toml (Kimi Code). -->",
    ),
    (
        "├── CLAUDE.md             ← ce fichier (routage + commun)",
        "├── CLAUDE.md             ← source de vérité du routage (Claude Code)\n├── AGENTS.md             ← ce fichier (miroir pour Kimi Code & autres agents)",
    ),
    (
        "- **JAMAIS de `AskUserQuestion`** — questions **en texte dans la réponse**",
        "- **JAMAIS de formulaire dynamique de questions** (AskUserQuestion) — questions **en texte dans la réponse**",
    ),
    (
        "seul re-injecté après `/compact`._",
        "seul re-injecté après `/compact`. Miroir AGENTS.md créé 2026-07-18 pour Kimi Code._",
    ),
]


def regenerate():
    src_path = os.path.join(ROOT, "CLAUDE.md")
    dst_path = os.path.join(ROOT, "AGENTS.md")
    text = io.open(src_path, encoding="utf-8-sig").read()
    missed = []
    for src, dst in SUBS:
        if src in text:
            text = text.replace(src, dst)
        else:
            missed.append(src[:60])
    io.open(dst_path, "w", encoding="utf-8", newline="\n").write(BANNER + text)
    if missed:
        print("[sync-agents-md] AGENTS.md régénéré MAIS %d substitution(s) Kimi n'ont plus matché "
              "(passage source modifié) — mettre à jour SUBS dans .claude/hooks/sync-agents-md.py : %s"
              % (len(missed), "; ".join(missed)))
    else:
        print("[sync-agents-md] AGENTS.md régénéré depuis CLAUDE.md (miroir Kimi à jour).")


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return
    ti = data.get("tool_input", {}) or {}
    path = ti.get("file_path") or ti.get("path") or ""
    norm = path.replace("/", "\\").lower()
    if norm == os.path.join(ROOT, "CLAUDE.md").lower():
        regenerate()
    elif "\\.claude\\hooks\\" in norm and norm.endswith(".ps1"):
        stem = os.path.basename(norm)[:-4]
        kimi = os.path.join(ROOT, ".kimi-code", "hooks", stem + ".kimi.ps1")
        if os.path.exists(kimi):
            print("[sync-agents-md] Hook Claude modifié : vérifier la parité du portage Kimi "
                  ".kimi-code/hooks/%s.kimi.ps1 (messages identiques — check 7 env-compat-check)." % stem)


if __name__ == "__main__":
    main()
