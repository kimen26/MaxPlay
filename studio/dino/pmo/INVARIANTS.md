# INVARIANTS — Pôle DINO

> Source de vérité des **chiffres clés**. MAJ uniquement si un invariant change (par `dino-pmo`).
> Dernière vérif : 2026-06-08 (réorg content/ = structure uniquement, chiffres inchangés).

## Counts

| Quoi | Valeur | Source |
|------|--------|--------|
| Dinos (entrées `DINOS`) | **55** | `site/js/dinos-data.js` |
| Familles (`DINO_FAMILLES`) | **9** | idem |
| Régimes alimentaires (`DINO_CATEGORIES`) | **4** | idem |
| Récits d'époque (voyage) | **8** | `audio/dinos/recit-*.mp3` |
| Accroches menu (voix réelle) | **17** | `audio/dinos/menu-*.mp3` (4 onglets + 9 familles `menu-fam-*` + 4 régimes `menu-regime-*`) |
| Spéciaux (Pangée, Extinction) | **2** | `audio/dinos/special-*.mp3` |
| Dinos avec audio complet (recap+4 blocs) | **22** | `DINO_AUDIO` |

## 9 familles (nom scientifique = titre)

Théropodes (16) · Sauropodes (6) · Thyréophores (4) · Cératopsiens (6) · Ornithopodes (4) · Dromæosaures (10) · Ptérosaures (2) · **Énaliosaures (6)** · **Avant les dinosaures (1, Dimétrodon)**.
> Refonte taxo 2026-06-09 : famille **Énaliosaures** (6 reptiles marins) créée ; « Inclassables » dissoute (Therizinosaurus → Théropodes, Pachycéphalosaure → Cératopsiens) ; « Pas des dinosaures ! » recentrée sur Dimétrodon → « Avant les dinosaures ».
Champs par famille : `sci` (titre scientifique) · `label` (surnom) · `sci_sens` (origine grecque dite en entrant) · `explic` (explication longue 🔊).

## 4 régimes alimentaires

Carnivores (24) · Herbivores (21) · Piscivores (7) · Omnivores (3). **Pas de catégorie morphologique** ici (ex « Volants & Marins » retiré 2026-06-03).

## Échelle de comparaison HONNÊTE (référentiel figé)

> Règle : **aucune arrivée qui ment > 10 %**. Détail : `dino/content/_ECHELLE-REFERENTIEL.md`. Fonctions `_compLong`/`_compHaut`/`_compPoids` dans dinos-data.js.

| Repère | Taille |
|--------|--------|
| Enfant 4 ans | 1 m |
| Papa | 1,8 m |
| But de foot (haut) | 2,44 m |
| Panier de basket | 3,05 m |
| Bus anglais 2 étages (haut) | 4,4 m |
| Lampadaire | 6 m |
| Bus RATP (long) | 12 m |
| Bus accordéon (long) | 18 m |

Le **bus est autorisé en échelle de taille** (validé Papa Yann) mais **interdit dans les récits narrés**.

## Casting voix (audio)

| Rôle | voice_id | Usage |
|------|----------|-------|
| `narrateur_h` | `cbRcktt2xvoeFpdvW2wg` | Menus accueil / régime / familles |
| `narrateur_f` | `aHKEGRjW94hqXc6gaItG` | Voyage + les 8 récits d'époque |
| `wex` | `G54e8CyYslC2Y4ZupTlg` | Dialogue des récits (FR standard, sans tic écrit) |

Résolus via `narration/personnages/voix-meta/voice-map.json`. Modèle **eleven_v3**, **stability 0,4** (dialogue), loudnorm en post. Accroche menu **2-7 s**.

## Règles verrouillées (voir figees/encyclopedie.md)

- 🔒 Tritri = running gag Wex, JAMAIS Max/doudou/peluche.
- 🔒 3 onglets : Familles (défaut) · Ce qu'il mange · Le voyage.
- 🔒 Encyclopédie = vrais noms + vraies dates. Terme savant nouveau → expliqué (ex « ptérosaure » → « reptile volant comme le Ptéranodon »).
- 🔒 Voyage : vignettes décoratives (pas de lien), avancement reset session.
- 🔒 Fiche : bouton audio masqué si pas d'audio complet.
