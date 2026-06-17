---
paths:
  - "studio/lunii/**"
  - "studio/dino/content/lunii/**"
---

# Pôle LUNII — règles auto-chargées (path-scoped)

> Chargé dès qu'on touche un fichier Lunii, **où qu'il vive** : le pôle `studio/lunii/` (assemblage/distribution) OU les images Lunii produites côté dino (`studio/dino/content/lunii/`).
> C'est **le pont** : les images Lunii vivent sous `studio/dino/` (autoring dino) mais leur tâche relève du pôle Lunii — un CLAUDE.md imbriqué ne se charge que selon l'emplacement du fichier, d'où ce rule (même mécanisme que [`dino.md`](dino.md)).

## Réflexe à l'ouverture

1. **Point d'entrée = [`studio/lunii/CLAUDE.md`](../../studio/lunii/CLAUDE.md)** (process end-to-end : produire image → stocker → assembler pack → distribuer). Le lire en premier pour toute tâche Lunii.
2. Pièges moteur VÉRIFIÉS : [`studio/lunii/LESSONS-MOTEUR.md`](../../studio/lunii/LESSONS-MOTEUR.md) (autoplay+ok, home, silence de tête, fond noir natif).
3. Format pack : skill [`lunii-pack-builder`](C:/Users/kimen/.claude/skills/lunii-pack-builder/SKILL.md) (story.json v1, controlSettings, binaire FS).

## Images Lunii (côté dino)

- Production : skill [`dino-images-lunii`](C:/Users/kimen/.claude/skills/dino-images-lunii/SKILL.md). Charte 🔒 : [`studio/dino/figees/encyclopedie.md`](../../studio/dino/figees/encyclopedie.md) § IMAGES LUNII.
- 🔒 **320×240, 16 gris, FOND NOIR NATIF** (écran rétro-éclairé : le noir n'est pas allumé → le sujet clair ressort). Pas d'inversion post. Specs par dino : `studio/dino/content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md`.
- Catalogue images : [`studio/dino/content/lunii/INDEX.md`](../../studio/dino/content/lunii/INDEX.md).

## Doctrine pôle (rappel)

- Lunii **assemble et distribue**, ne crée pas de contenu (audio canon uniquement). Pôle **léger, sans PMO** (choix assumé) → le journal = tableau « Packs construits » du [`README.md`](../../studio/lunii/README.md). Les décisions de fond se loggent dans le sprint-log du **pôle source** (dino/narration).
- Lunii de Max = **v2** (pas de piège firmware 3.x). Luniistore fermé pendant STUdio.

---

_Créé 2026-06-17 : pont path-scoped Lunii (images dino + assemblage), même mécanisme que `dino.md`. Point d'entrée = `studio/lunii/CLAUDE.md`._
