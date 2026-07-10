# Synthèse Lecteurs — STORY-002 « La Libellule impossible » (Panel v2, VAGUE 5, corpus 14 versions)

> **Re-panel COMPLET sur les 14 versions** (2026-07-03 soir). Remplace le panel partiel sur 11 versions
> (archivé `_archive/5-panel-partiel-11versions-2026-07-03/`, NE PAS réutiliser).
> **Motif du redo** : juger un sous-ensemble casse l'égalité du concours — les lecteurs doivent lire les 14.
> Barrière désormais gravée dans `equipe/PROCESS.md` étape 4.

---

## 0. Dispositif (Panel v2 hétérogène — DEC-PANEL-V2)

**12 appels = 4 groupes de profils × 3 modèles hétérogènes.** Chaque appel a lu **les 14 versions** et rendu 2 tranches d'âge (3-5 + 6-7) + un classement complet + retours texte libre (pas de note sur 10, pas de jargon).

| Groupe | Modèle 1 | Modèle 2 | Modèle 3 |
|--------|----------|----------|----------|
| 1 — Garçon seul | Sonnet 4.6 (agent) | **Kimi K2.7-Code** | Haiku 4.5 (agent) |
| 2 — Fille seule | Sonnet 4.6 (agent) | **Kimi K2.7-Code** | Haiku 4.5 (agent) |
| 3 — Dyade papa | Sonnet 4.6 (agent) | **Kimi K2.7-Code** | DeepSeek V4-Pro |
| 4 — Dyade maman | Sonnet 4.6 (agent) | **Kimi K2.7-Code** | DeepSeek V4-Pro |

**Statut canal Kimi : ✅ Kimi présent sur les 4 groupes.** Le MCP `ask_kimi` a le même timeout transport (~250 s) que les writers sur ces prompts lourds (~46 KB, 14 textes) → **bascule immédiate sur `infra/mcp/call-llm.mjs` (Bash timeout 540 s)**, comme prévu par le fallback obligatoire (leçon LP2). Les 4 appels Kimi CLI ont réussi (exit 0). **Aucune substitution Haiku/DeepSeek de l'axe Kimi** — les 3 modèles sont réellement hétérogènes dans chaque groupe. (Correction vs panel partiel précédent qui avait conclu à tort « Kimi indisponible ».)

12 fiches produites : `5-lecteurs-temoins/G{1-4}-<profil>-<modèle>.md`.

---

## 1. TOP 5 CONSOLIDÉ (sur 14, rang moyen des 12 fiches — plus bas = meilleur)

| # | Version | Rang moyen | Meilleur / Pire | Top-3 | Fond-3 | Lecture |
|---|---------|-----------|-----------------|-------|--------|---------|
| **1** | **claude-opus-def** | **3.5** | 1 / 11 | **8/12** | 0/12 | **Écrasant. Le seul jamais dans le fond.** Clarté totale (Juju percute Nono, libellule sur le poignet *là où ses doigts serrent le bras de Nono*), fin sobre « Vas-y » sans pirouette, « elle sent le calme de Nono passer dans sa main ». Consensus inter-modèles le plus fort du corpus. |
| **2** | **claude-sonnet-reco** | 5.2 | 1 / 10 | 4/12 | 0/12 | Solide partout, jamais dans le fond. Taquineries vraies (« Elle triche ! »), pose limpide (main de Nono à un souffle de Juju), fin qui prolonge (l'étang « reprend son clapot »). Reproche récurrent : ouverture un peu dense à lire à voix haute. |
| **3** | **deepseek-reco** | 5.7 | 2 / 12 | 4/12 | 1/12 | Très fluide à l'oral (« phrases courtes, pas de subordonnées qui traînent »), pose claire sur la main de Nono, « elle est revenue nous voir toute seule ». Reproche : moment de pose un peu expédié, fin sobre. |
| **4** | **claude-sonnet-def** | 6.1 | 3 / 10 | 1/12 | 0/12 | **Le régulier sans éclat mais sans faute** — jamais top-3, jamais fond-3. « Ne bouge pas / Je bouge pas » marche très bien à l'oral, têtard qui ouvre et referme. Valeur sûre de consensus. |
| **5** | **kimi-reco** | 6.1 | **1** / 13 | 4/12 | 1/12 | **Polarisant mais haut de médiane.** #1 chez 2 fiches (garçon-sonnet, fille-kimi). « On l'a presque vue » (au lieu de « eue ») = trouvaille tendre plébiscitée. **DEUX réserves goût-auteur** : la fin qui **repart jouer** (« Recommence » → ils rejouent) et la libellule sur le **genou de Juju** (jugé « bizarre / trop bas » par 3 lectrices). |

*Suivent, hors top 5 :* 6. claude-opus-reco (6.3 — très polarisé : 6 top-3 MAIS 3 fond-3 ; l'image « bus qui pile » sort de l'univers nature pour plusieurs) · 7. deepseek-def (6.6) · 8. grok-def (7.5, pose sur le genou de *Nono* clivante) · **9. kimi-k26-thinking (8.8)** · 10. claude-haiku-reco (9.4 — top ET flop extrême : #1 chez la fille-haiku, dernier ailleurs, « sur rien, sur l'espace entre eux » perd les petits) · **11. kimi-reco-guide (9.6)** · 12. grok-reco (9.8) · 13. claude-haiku-def (10.1) · 14. kimi-k26-instant (10.2).

---

## 2. OÙ SE CLASSENT LES 3 KIMI QUI ÉTAIENT ABSENTS DU PANEL PRÉCÉDENT

Le panel partiel (11 versions) n'avait pas noté les 3 Kimi récupérés via CLI. Voici leur verdict **sous notation réelle des lecteurs** (et non plus une lecture Directeur hors panel) :

| Version | Rang consolidé | Rang moyen | Best/Pire | Verdict |
|---------|---------------|-----------|-----------|---------|
| **kimi-reco** | **#5 / 14** | 6.1 | **1** / 13 | **Entre dans le top 5.** Le mieux placé des 3 Kimi. Voix d'enfant très vraie, « presque vue » adoré. Plafonné par la **fin qui repart** + le **genou de Juju**. Grosse variance (best #1 garçon-sonnet & fille-kimi ; worst #13 dyade-papa-deepseek). |
| **kimi-k26-thinking** | **#9 / 14** | 8.8 | 3 / 14 | **Milieu de tableau.** Belle fin apaisée (« On était bien », « d'un gros champignon ») appréciée des grandes/observatrices (fille-haiku #3), mais **ouverture trop chargée** (crapaud + têtards + bourdon avant la libellule) et fin « un peu adulte » qui plombe chez les dyades (maman-deepseek #14). Réservoir de greffe pour l'apaisement final. |
| **kimi-reco-guide** | **#11 / 14** | 9.6 | **1** / 14 | **Bas de tableau.** Le plus clivant (best #1 garçon-haiku / worst #14 maman-kimi). Tué par **deux défauts goût-auteur** cumulés : la **fin en pirouette bruyante** (« Capitaine du monde et des libellules ! » + pirouette Wex juste après le silence) et la **pose sur un roseau tenu** (pas sur la peau → « moins fort », « c'est pas sur eux »). Le « Tsing » fait aussi buter à la lecture. |

**Conclusion sur les 3 Kimi absents** : ils **ne délogent aucune des 4 premières versions**. `kimi-reco` s'installe honorablement au **#5** (et confirme l'hypothèse goût « voix d'enfant vraie »). Les deux autres restent des **réservoirs de greffe** (fin apaisée de thinking) mais portent chacun un défaut qui parle directement aux contre-goûts de l'auteur (fin qui repart / pirouette).

---

## 3. PATTERNS TRANSVERSES (convergence inter-modèles = signal robuste)

**Ce qui gagne** (cité en positif par ≥ 6 fiches, tous modèles) :
- **La clarté de « qui fait quoi » au pivot** : Juju percute Nono par accident → elle se fige → la libellule vient. Le moment préféré, presque unanime.
- **La pose PRÉCISE et VISIBLE** de la libellule sur la peau (main de Nono / poignet de Juju au contact des deux). Les petits « retiennent l'image posée, pas le vol ».
- **La libération sobre** : Nono lève la main / ouvre les doigts, « Vas-y », la libellule repart d'elle-même. Personne ne la met en cage.
- **L'entrée par le corps** (eau tiède, boue entre les orteils) plutôt que par le décor.

**Ce qui perd** (cité en négatif par ≥ 5 fiches) :
1. **La pose FLOUE ou ABSTRAITE** : « sur rien, sur l'espace entre Juju et Nono » (haiku-reco), « sur la main de Nono, près du poignet de Juju, entre eux » (kimi-k26-instant) → les petits ne voient pas l'image, ils décrochent. **Tueur n°1 confirmé : la confusion.**
2. **La pose sur une surface « bizarre »** non-contact : **genou** (kimi-reco, grok-def) et **roseau tenu** (kimi-reco-guide) — « pourquoi le genou ? c'est trop bas », « c'est pas sur eux, ça touche moins ».
3. **La FIN qui repart / fait une pirouette / une vanne** juste après le silence magique : kimi-reco (« Recommence » → rejeu), kimi-reco-guide (pirouette + « Capitaine du monde »), kimi-k26-instant (dispute « sur MA / VOTRE main / On a »), kimi-k26-thinking (« gros champignon »). **Toutes les 4 sont des Kimi.** Confirme le contre-goût auteur « chute-pirouette ».
4. **L'ouverture trop descriptive / trop d'animaux** avant l'arrivée de la libellule (sonnet-reco, grok-reco, deepseek-reco, kimi-k26-thinking) → « le petit s'agite en attendant le truc bleu ».
5. **Les mots d'adulte** qui font buter la lecture à voix haute : « poser les armes » (haiku-def), « une seconde de trop » (sonnet-reco), « garde son genou tout droit » (grok-def), « bus qui pile à l'arrêt » (opus-reco, hors-univers nature), « Tsing » (kimi-reco-guide).

**Divergence d'âge notable** : sur `kimi-k26-instant`, la vanne finale « On a » / « sur VOTRE main » est perçue **inachevée et confuse par les 3-5 ans** mais **drôle (private joke) par les 6-7 ans**. La cible primaire (3-5) tranche : ça casse.

---

## 4. CITATIONS CLÉS (mots d'enfant / de parent)

- **claude-opus-def** (dyade-maman) : *« pourquoi il dit chut alors que personne parle fort ? » … le silence est écrit (« Personne ne respire »), je peux vraiment faire une pause. La fin est belle et ouverte, on referme le livre doucement.*
- **claude-opus-def** (dyade-papa) : *« La libellule qui pile net en l'air, comme un bus qui s'arrête sans bruit — image très parlante, fait mouche à l'oral. »* (l'image du freinage plaît quand elle reste implicite ; nommer « bus » gêne — cf. opus-reco).
- **kimi-reco** (fille-kimi) : *« Nono dit "On l'a presque vue" au lieu de "presque eue", c'est plus tendre … la plus belle phrase de toutes, on comprend qu'il ne fallait pas l'attraper, juste être là. »*
- **haiku-reco** (fille-haiku) : *« la plus tendre … "Elle est venue" — ça me fait presque pleurer »* — MAIS (dyade-papa DeepSeek) *« le petit a décroché, trop d'images avant l'action »* : le clivage top/flop en une image.
- **Contre-goût, kimi-k26-instant** (garçon-sonnet) : *« la blague "Sur ma main / sur VOTRE main" est trop maligne pour un enfant, ça casse le calme au lieu de finir tout doux. »*

---

## 5. LECTURE DIRECTEUR (pour préparer l'étape 6 — NON tranchée ici)

- **Base pressentie : `claude-opus-def`.** Dominant (rang moyen 3.5, 8 top-3, zéro fond-3, consensus inter-modèles maximal) ET **aligné sur le goût auteur** : clarté (tueur n°1 neutralisé), aucune pirouette finale, un vrai moment physique mimable (Juju qui perçoit le calme dans sa main + poignet au contact des deux), dialogues sobres et attribués. C'est la version qui coche à la fois le panel ET les contre-goûts de l'auteur.
- **Réservoir de greffes** :
  - `kimi-reco` : la trouvaille **« On l'a presque vue »** (à considérer pour la réplique de clôture — plus tendre que « on l'a eue »), SANS sa fin qui repart ni le genou.
  - `haiku-reco` : la phrase-image **« Elle est venue »** murmurée + le suspense « Une seconde. Deux secondes. » (attention : à ne pas surcharger l'ouverture).
  - `claude-sonnet-def` : le fil du **têtard qui ouvre et referme** (clôture sans morale).
- **Vigilance goût-auteur pour le rewrite** : (a) garder la pose sur la **peau au point de contact** (jamais genou/roseau flou) ; (b) **fin qui reste dans le silence**, zéro pirouette ; (c) surveiller « bus qui pile » (garder le *freinage* implicite, éviter le mot véhicule) ; (d) ouverture courte avant la libellule.

> ⚠️ **Rappel du goût auteur (mémoire-papa-yann)** : l'exigence de l'auteur est **au-dessus du panel** — sur STORY-002 vague 4, les 2 champions du panel ont été rejetés. Le classement ci-dessus mesure l'**acceptable robuste**, pas nécessairement l'**excellent selon Papa Yann**. L'arbitrage étape 6 pèsera ce top contre le goût, à égalité avec la patte. **Ne pas lancer l'étape 6 ici** (consigne : attendre / instruction séparée).

---

_Panel v2 hétérogène — 12 fiches, 4 groupes × 3 modèles, Kimi inclus sur les 4 (canal CLI). Corpus 14 versions. Test de calibration one-shot (TEST-PANEL-CALIBRATION) toujours à faire avant STORY-003._
