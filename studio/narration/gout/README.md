# Duel de goût — gouvernance (créé 2026-07-03)

> ⚠️ **Outil duel retiré du pipeline** (DEC-INSTRUMENT-DUEL-RETRAIT, 2026-07-13 — cf. `../memory/DECISIONS.md`). Ce README décrit l'outil historique ; les captures de goût existantes vivent dans [`retours/`](retours/). — bandeau phase 1 cartographie, reconstruit 2026-08-10.

> Outil transverse de capture du goût de l'auteur (Papa Yann). Premier client : pôle NARRATION.
> Conçu data-driven : dino & co brancheront leur propre `duel-data.js` plus tard.

## 🎯 Rôle du duel (recadré par l'auteur, 2026-07-03)

Le duel est un **calibreur de goût** qui nourrit les briefs et prompts writers futurs —
**PAS un validateur de texte final**. La validation étape 6 reste une lecture classique
de la base candidate par l'auteur. Le « duel finale » (2 textes entiers) est donc
**optionnel et indicatif** : un refus des deux finalistes est un signal de goût précieux,
pas un blocage du process. REX STORY-002 : l'auteur a refusé les 2 champions du panel en
finale — donnée majeure pour les briefs, pas un veto formel.

## Le problème résolu

Lire 14 histoires entières = mur. Le goût de l'auteur n'entrait jamais dans la machine,
donc le pipeline optimisait contre la patte (abstraite) mais jamais contre l'auteur.
Le duel réduit son effort à ~12 taps de 10 secondes + 2 lectures complètes (la finale).

## Architecture

| Pièce | Chemin | Rôle |
|-------|--------|------|
| App duel | [`site/duel.html`](../../../site/duel.html) | UI mobile A/B (PWA GitHub Pages) — **COMPARER** des fragments anonymisés, chips craft, export JSON |
| App lecture | [`site/lecture.html`](../../../site/lecture.html) | **ANNOTER en 1re lecture** (2e instrument, créé 2026-07-04) : tap un passage → chips ✨j'aime/👎ça pèche + texte libre + verdict global par histoire, export JSON. Pour capter le goût SANS comparaison (« wow c'est nul » / « ÇA c'est génial ») |
| Données | [`site/duel-data.js`](../../../site/duel-data.js) · [`site/lecture-data.js`](../../../site/lecture-data.js) | Générées par le Directeur à l'étape 6 (duel : fragments top panel + pépites ; lecture : textes entiers anonymisés) |
| Mémoire de goût | [`memoire-papa-yann.md`](memoire-papa-yann.md) | Descripteurs craft cumulés — lecture OBLIGATOIRE du Directeur (étapes 3 et 6) |
| Palmarès writers | [`palmares-writers.md`](palmares-writers.md) | Qui gagne quoi, sur quel type de moment — alimente le menu d'angles |

**Deux instruments complémentaires** : le **duel** compare (signal relatif, rapide), la **lecture
annotée** calibre (signal absolu, riche — le POURQUOI au passage près, à la 1re lecture, sans
biais de comparaison). L'ingestion des deux alimente la même mémoire, mêmes règles anti-verbatim.

### 🔒 Doctrine instrument (verdict auteur, 2026-07-08)

**La lecture annotée est l'instrument PRINCIPAL** — verdict Papa Yann après vagues 4-5 STORY-002 :
« clairement le plus intéressant, pas forcément sur un full text mais même sur des bouts ».
- Prochaines vagues : **lecture.html par défaut**, y compris pour des FRAGMENTS (chargés comme
  mini-textes annotables dans `lecture-data.js`).
- Le **duel** devient secondaire : réservé aux arbitrages serrés (2 candidates proches où le
  signal relatif tranche mieux que deux lectures absolues).

## Protocole (cycle par histoire)

```
Étape 5 finie (panel) → Directeur génère duel-data.js :
   · ~10-12 duels de FRAGMENTS (ouvertures, dialogues, moments, chutes, fins)
     depuis le top 4 + pépites isolées des éliminées
   · 1 duel FINAL : les 2 histoires entières finalistes
→ commit + push (GitHub Pages)
→ Papa Yann joue sur téléphone (kimen26.github.io/MaxPlay/duel.html)
→ il colle le JSON exporté à Claude (Telegram ou session)
→ INGESTION par le Directeur :
   1. la finale + les duels confirment/infirment la base de 6-selection.md
   2. les fragments gagnants d'AUTRES versions → greffes candidates (max 2-3, réécrites
      par le writer de la base dans SA voix — jamais de collage verbatim)
   3. chaque choix + chips → ABSTRACTION en descripteur craft → memoire-papa-yann.md
   4. maj palmares-writers.md
```

## 🔒 RÈGLES DURES

1. **ANTI-VERBATIM (anti-Streisand du goût)** : la mémoire de goût ne stocke JAMAIS de
   phrases issues des histoires. On stocke le POURQUOI décrit en vocabulaire craft
   (rythme, sonorité, attaque, chute, voix narrative, fluidité orale, registre).
   ❌ « il aime "la belle libellule" » → la phrase contaminerait l'histoire de l'escargot.
   ✅ « entrée par sensation corporelle (chaleur, matière) avant le décor ».
   Corollaire : **les briefs writers ne citent jamais d'exemples verbatim tirés du corpus.**
2. **ANONYMAT** : l'UI n'affiche jamais quel writer a écrit quoi (anti-biais). Les sources
   voyagent dans le JSON pour l'ingestion seulement.
3. **PAS DE FRANKENSTEIN** : le duel ne fabrique pas une histoire par collage. Il désigne
   UNE base entière + des greffes d'intention absorbées au rewrite (mécanisme étape 6-7 existant).
4. Un descripteur entre dans la mémoire comme **hypothèse** (1 signal) et devient **confirmé**
   à partir de 3 signaux concordants sur ≥ 2 histoires. Un contre-signal le repasse en hypothèse.

## Journal des évolutions UI

- **2026-07-08** — *Chips v3 + panneau qui ne cache plus le texte* (lecture.html).
  (a) **Chips retravaillées EN DIRECT avec l'auteur** (session challenge) : positif 11 chips /
  3 lignes thématiques (rythme·langue / image / cœur·vie), négatif 10 chips / 3 lignes miroir
  (rythme / description / compréhension) + `trop court`. Retirés : « je le redirais à voix
  haute » (demande auteur), « je visualise direct » (0 usage). Le narrateur-qui-philosophe
  reste en texte libre (1 seul signal). Format data : tableau de tableaux = lignes.
  (b) **Fix bas de page** : panneau plafonné 55vh, padding-bas 60vh sur le texte à l'ouverture,
  passage tapé remonté auto au-dessus du panneau (scrollIntoView). Retour vague 5 : « au bas de
  la page je ne peux plus rien faire, la proposition de bouton se met devant ».
- **2026-07-03** — *Raisons de refus.* « aucun des deux 👎 » ouvre désormais un écran
  **« Pourquoi aucun des deux ? »** (puces de défauts) au lieu d'enchaîner à vide.
  Le JSON remonte alors `choix:"aucun"` + `defautsPerdant:[…]` (défauts communs des deux
  fragments), `pourquoi` restant vide. « ≈ égalité » reste sans raison (les deux tiennent).
  Retour vague 4 STORY-002 : sur `aucun`, on ne savait pas *pourquoi* ça ne passait pas.
