# HO-G06 — Skills craft → global + flags effets de bord

**Statut :** pret
**Depend de :** —

## Objectif
Les skills de savoir-faire pur (`narration-craft`, `game-design-enfant`) deviennent user-level (réutilisables hors MaxPlay, synchronisables via `claude_conf`), sans aucun chemin MaxPlay dedans ; les skills à effet de bord ne coûtent plus rien tant qu'on ne les appelle pas.

## Contexte a lire d'abord
- Doc officielle skills : `disable-model-invocation: true` = description absente du contexte, chargé seulement via `/nom` ; `user-invocable`, `paths:`, `allowed-tools`.
- `memory/audits/2026-09-03-archi-claude-infra.md` § 4, § 5 plan C étapes 5-6
- `~/.claude/skills/nouveau-projet/SKILL.md` (règle : un skill est global s'il n'embarque aucun chemin projet)
- `~/.claude/skills/claude-infra/references/checks-skills.md` et `checks-frontmatters.md` (contraintes name/description)

## Fichiers autorises
- `.claude/skills/narration-craft/**` et `.claude/skills/game-design-enfant/**` (déplacement = copie vers `~/.claude/skills/` puis suppression ici)
- `C:/Users/kimen/.claude/skills/narration-craft/**`, `C:/Users/kimen/.claude/skills/game-design-enfant/**` (création)
- `.claude/rules/narration-craft.md` (réécriture : pointeurs vers le skill global + rappels MaxPlay ; garder < 40 lignes)
- `.claude/skills/lunii-sync/SKILL.md`, `.claude/skills/dino-paleoart/SKILL.md`, `.claude/skills/dino-images-lunii/SKILL.md` (frontmatter seulement)

## Hors perimetre
- `studio/narration/CLAUDE.md` et `studio/minijeux/CLAUDE.md` (réécrits en vague 2 : lister dans le rapport les lignes qui devront pointer le nouveau chemin). Aucune commande git.

## Travail
1. `narration-craft` : copier le dossier entier vers `~/.claude/skills/narration-craft/`. Dans les fichiers copiés, retirer tout chemin MaxPlay (`../../studio/narration/...`, `personnages/theorie/...`, casting Wex/Melki…) : le craft reste générique (« casting du projet », « fiche personnage du projet »). Ce qui est spécifique MaxPlay (casting V1 figé, patte B+D+C, wiring PROCESS) reste dans `.claude/rules/narration-craft.md` réécrite en pointeurs. Vérifier le frontmatter (name = nom du dossier, description ≤ 1024 car., pas de `:` nu ni em-dash hors guillemets). Supprimer `.claude/skills/narration-craft/`.
2. `game-design-enfant` : même opération vers `~/.claude/skills/game-design-enfant/`. Retirer les chemins MaxPlay ; les « 10 règles d'or » restent génériques (3-5 ans). Supprimer le dossier projet.
3. `lunii-sync`, `dino-paleoart`, `dino-images-lunii` : ajouter `disable-model-invocation: true` au frontmatter (effets de bord : transfert boîte, génération images payante/longue). Ne rien changer d'autre. `lunii-pack-builder` et `nouveau-dino` restent auto-invocables.
4. Vérifier qu'aucun autre fichier du repo ne pointe encore `.claude/skills/narration-craft` ou `.claude/skills/game-design-enfant` : `grep -rn "skills/narration-craft\|skills/game-design-enfant" --include=*.md . | grep -v _archive` → lister dans le rapport (les CLAUDE.md de pôle seront corrigés en vague 2 ; corriger toi-même les autres fichiers listés SEULEMENT s'ils sont dans tes fichiers autorisés, sinon les lister).

## Portes de verification
```bash
ls ~/.claude/skills/narration-craft/SKILL.md ~/.claude/skills/game-design-enfant/SKILL.md
test ! -d .claude/skills/narration-craft && test ! -d .claude/skills/game-design-enfant && echo "projet: supprimés"
grep -rn "studio/\|MaxPlay\|Wex\|Melki" ~/.claude/skills/narration-craft ~/.claude/skills/game-design-enfant | wc -l   # 0
head -6 .claude/skills/lunii-sync/SKILL.md .claude/skills/dino-paleoart/SKILL.md .claude/skills/dino-images-lunii/SKILL.md | grep -c "disable-model-invocation: true"   # 3
wc -l .claude/rules/narration-craft.md   # < 40
for f in ~/.claude/skills/*/SKILL.md .claude/skills/*/SKILL.md; do n=$(grep -m1 '^name:' "$f" | cut -d' ' -f2); d=$(basename $(dirname "$f")); [ "$n" = "$d" ] || echo "NAME≠DIR $f"; done   # vide
```

## Rapport attendu
Fichiers créés/supprimés/modifiés, occurrences restantes à corriger en vague 2, sortie des portes.
