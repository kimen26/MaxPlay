# Backlog — Pôle DINO

> Tickets EP-xxx (chantiers) + Leçons L-xxx (patterns gravés). Tenu par `dino-pmo`.

## Tickets actifs

| ID | Sujet | Priorité | État |
|----|-------|----------|------|
| EP-D01 | ~~Vérifier count dinos (50 réel vs 60 ancien INDEX)~~ → **RÉSOLU 2026-06-03** : count autoritatif = **50** (`DINOS.length`). L'ancien « 60 » comptait des entrées non finalisées. Stale corrigés (INDEX, header data). | — | ✅ fermé |
| EP-D02 | Audio des ~28 dinos sans recap (génération progressive vs TTS) | 🟢 basse | ouvert |
| EP-D03 | Visuels/illustrations des écrans d'époque du voyage (optionnel) | 🟢 basse | idée |

## Leçons (L-xxx)

- **L-D01** — Un terme savant prononcé dans l'audio DOIT être expliqué dans la foulée (« ptérosaure » seul = incompris → « reptile volant comme le Ptéranodon »). L'enfant ne peut pas chercher un mot qu'il n'a pas.
- **L-D02** — Une catégorie d'onglet doit être **homogène** : « ce qu'il mange » = régimes alimentaires uniquement, pas de morphologie (« Volants & Marins » mélangeait les deux axes).
- **L-D03** — Un nom de famille = **nom scientifique honnête**. Ne pas renommer un groupe hétérogène d'un seul mot faux (ne pas appeler « Ptérosaures » un lot qui contient un mosasaure + un synapside).
- **L-D04** — Une accroche de menu s'écoute en **2-7 s** ; au-delà c'est un cours, l'enfant décroche. Le détail va dans les sections, pas dans l'accroche.
- **L-D05** — Tout audio doit passer le **grep-interdits** (`max|doudou|peluche|bus`) AVANT génération. L'incident « doudou de Max » venait d'un audio généré avant la consigne et jamais re-vérifié.

## Changelog

### Session 2026-06-03
Refonte UI + audio + création du pôle DINO (voir `sprint-log.md`). Décisions : pôle pair, Tritri sans méta, scission familles, régimes alimentaires, voix menus. Leçons L-D01→L-D05 gravées.
