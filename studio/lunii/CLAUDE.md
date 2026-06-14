# PÔLE LUNII — Règles auto-chargées

> **Canal de DISTRIBUTION**, pas de création. Pousse les histoires déjà produites
> (pôles [DINO](../dino/CLAUDE.md) + [NARRATION](../narration/CLAUDE.md)) sur la boîte
> à histoires **Lunii v2** de Max, via **STUdio** (logiciel communautaire).
> Chargé dès qu'un fichier sous `studio/lunii/` est touché. Détail complet + pipeline +
> pièges : [`README.md`](README.md) (sert aussi d'INDEX, le pôle est petit).
> ⚠️ Pas re-injecté après `/compact` — rechargera au prochain contact d'un fichier lunii.

---

## 🪶 Pôle volontairement LÉGER — pas de PMO, pas d'agents

C'est un **choix d'archi**, pas un oubli. Lunii n'accumule ni casting ni contenu : il
**assemble** des MP3 déjà canon en packs. Un PMO+agents serait de la sur-ingénierie
(cf. « Pas de prolifération », CLAUDE.md racine). Le **journal du pôle = le tableau
« Packs construits » du README**. Les décisions de *fond contenu* se loggent dans le
sprint-log du **pôle source** (dino ou narration), pas ici.

---

## Règles d'or (non négociables)

1. 🔒 **Packs = audio DÉJÀ CANON uniquement.** Jamais de contenu neuf créé ici hors
   process narration/dino. Lunii emballe, ne rédige pas.
2. 🔒 **Lunii de Max = v2** (pas de WiFi). Terrain sûr : pas de piège firmware 3.x ni
   d'écrasement WiFi. Ne pas appliquer les contournements v3 (`wifi.pref`…).
3. 🔒 **Luniistore FERMÉ pendant STUdio** — conflit sur le pilote USB. Règle absolue.
4. 🔒 **Formats média** : audio MP3/OGG **44100 Hz** (nos MP3 ElevenLabs sont OK) ·
   image **320x240** PNG/JPEG/BMP24. Loudnorm en post (règle audio projet).
5. 🔒 **UUIDs figés dans les scripts** → un rebuild ne crée pas de doublon côté Lunii.
6. 🔒 **Packs (zips) hors git** : ils vivent dans `~/.studio/library/`. Seuls les
   **scripts de build** (rejouables) sont versionnés dans `scripts/`.

---

## Comment on bosse

```
Audio canon (dino/narration) → scripts/build-<nom>-pack.mjs → ~/.studio/library/
   → STUdio (localhost:8080) → brancher Lunii USB → glisser-déposer → testé par Max
```

- **Lancer STUdio** : `C:\ProjetsPerso\Tools\studio-lunii\studio-web-ui-0.4.2\studio-windows.bat` → http://localhost:8080
- **Nouveau pack** : copier `scripts/build-tritri-pack.mjs` comme modèle (cover + récit + UUIDs figés).
- Après transfert validé par Papa Yann → noter le pack dans le tableau du README + sprint-log du pôle source.

---

## Pointeurs

- Doc complète (install, pipeline détaillé, pièges v3, sources) : [`README.md`](README.md)
- Pôles sources du contenu : [`../dino/CLAUDE.md`](../dino/CLAUDE.md) · [`../narration/CLAUDE.md`](../narration/CLAUDE.md)

---

_Créé 2026-06-14 : pôle de distribution léger (canal Lunii). Pas de gouvernance PMO — choix assumé vu la nature « assemblage » du pôle._
