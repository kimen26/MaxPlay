# Agents projet MaxPlay

## ⚠️ Règle critique frontmatter (ne plus jamais oublier)

Le harness Claude Code parse le YAML du frontmatter en mode strict. Dans la valeur `description:` **non quotée**, certains caractères font **rejeter silencieusement l'agent** (il disparaît de la liste sans erreur visible) :

| Interdit | Remplacer par |
|----------|---------------|
| `:` interne (ex: `Foo : bar`) | `-` ou `(parenthèses)` |
| Em-dash `—` (U+2014) | `-` (tiret simple) |
| `×` (U+00D7) | `x` |

**OK :** accents (é è à ç), apostrophes typographiques ('), virgules, points, parenthèses, tirets simples.

**Alternative** si on tient au caractère : quoter la description.
```yaml
description: "Foo : bar — baz"
```

## Symptôme du bug

- Agent présent sur disque, frontmatter visiblement valide
- Pas listé dans les `subagent_type` disponibles
- Aucune erreur dans la sortie Claude Code
- Reboot VSCode ne change rien

## Diagnostic en 30 secondes

```bash
grep -P '[—×]|: .* :' .claude/agents/*.md
```

Si match dans une ligne `description:` → cause probable.

## Historique

- **2026-05-02** : 5 agents (narration-pmo, narration-architecte, narration-audio, narration-gatekeeper, pixel-map-simplifier) absents pendant ~1 semaine. Cause identifiée et corrigée. Règle documentée ici.

## Liens

- Liste des agents narration et leur rôle : [`studio/narration/equipe/ORGANIGRAMME.md`](../../studio/narration/equipe/ORGANIGRAMME.md)
- Index équipe narration : [`studio/narration/equipe/INDEX.md`](../../studio/narration/equipe/INDEX.md)
- Process militaire 9 étapes : [`studio/narration/equipe/PROCESS.md`](../../studio/narration/equipe/PROCESS.md)
