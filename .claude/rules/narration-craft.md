---
paths:
  - "studio/narration/stories/**"
  - "studio/narration/equipe/**"
  - "studio/narration/personnages/**"
---

# Craft narratif — pointeur auto-chargé (anti-pollution)

> Le **savoir d'écriture** (structures, voix, sensoriel, comédie, développement, prose…) vit dans le skill routeur **`narration-craft`** (`.claude/skills/narration-craft/`).
> Cette rule ne charge QUE des **pointeurs** — le contenu réel se charge à la demande via le sous-fichier pertinent. Ne PAS inliner le craft ici.

## Quel sous-fichier charger (les 15 + 2 gaps)
`01-storytelling` (structure/Kishōtenketsu) · `02-voix` (qui raconte) · `03-sensoriel` (ancrer dans le corps) · `04-comedie` (humour/timing) · `05-developpement` (calibrage âge 4-6) · `06-prose` · `07-scenario` · `08-micro` · `09-message` · `10-lieu` · `11-manga` · `12-theatre` · `13-musique` · `14-imperfection` · `15-jeu` · `16-oralite` *(gap P1)* · `17-refrains` *(gap P2)*.
Carte complète : [`.claude/skills/narration-craft/SKILL.md`](../skills/narration-craft/SKILL.md).

## Rappels MaxPlay (toujours valables en écrivant)
- **Casting V1 figé** : Melki/Mimi/Dadou/Madie/Lulu/Pierrot/Raph/Juju/Nono + Wex. JAMAIS l'ancien casting (Léo/Sam/Lila/Élia/Camille/Victor/Iris/Theo/Noa).
- **🛑 Cliffhanger / open-loop** : OK au milieu pour tenir l'attention, **JAMAIS à la fin** (patte = Kishōtenketsu apaisant, écoute au coucher).
- **Ennéagramme** : source de vérité = [`studio/narration/personnages/theorie/enneagramme/`](../../studio/narration/personnages/theorie/enneagramme/), pas le craft (qui ne fait qu'illustrer l'application).

## Wiring process (rappel)
Brief → `01`+`05` · Brainstorm → `17`+`01` · Briefs writers → `05` · Écriture → `03`+`04` (cliffhangers OFF) · Rewrite → `06`+`02` · Audio → `16`.
