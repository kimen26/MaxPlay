# HO-023 — Flore : i18n en / es-es / pt-br

**Statut :** FAIT — en / es-es / pt-br livres et verifies a l'ecran
**Depend de :** HO-020 + HO-021 (merge `S.plantes` en place).

## Objectif
Traduire les champs texte de `DINO_PLANTES` (name, nom_etym, region, comp_hauteur recalculée en unités cibles, environnement, feuille, graines, mangee_comment, superpower, fait, vivant) selon `_CHARTE-TRADUCTION.md`, ajouter `plantes` au corpus + aux bundles `site/js/i18n/dinos-strings.<lang>.js`.

## Fichiers autorisés
- `content/i18n/_corpus/**`, `content/i18n/<lang>/strings.json`, `content/scripts/export/_extract-corpus-i18n.cjs`, `_gen-strings-bundle.cjs`, `site/js/i18n/dinos-strings.*.js`

## Portes
```bash
for l in en es-es pt-br; do node content/scripts/export/_check-traduction.cjs $l; done
```


---

## ✅ CLOS 2026-09-07

Les 19 plantes sont traduites dans les 3 langues, portes vertes (0 erreur), bundles produit
regeneres, rendu verifie en capture dans chaque langue.

| Langue | Porte | Particularite |
|---|---|---|
| en | 0 erreur (17 WARN justifies, chiffres ajoutes par la conversion imperiale) | Imperial verifie au calcul, ecart max 2,5 %. Noms d'usage : Monkey puzzle tree, Sycamore, Water lily, Tree fern, Wollemi pine. |
| es-es | 0 erreur | Metrique conserve, reperes `farola`/`piso`/`puerta`. « Plátano de sombra » pour eviter la confusion avec la banane. |
| pt-br | 0 erreur (2 WARN pre-existants sur `dinos`, hors lot) | Metrique conserve, `poste de luz`/`andar de prédio`. L'araucaria exploitee comme atout culturel : le pinheiro-do-parana du sud du Bresil. |

**Trois corrections d'orchestrateur, invisibles depuis les briefs :**

1. `_gen-strings-bundle.cjs` ne connaissait pas la cle `plantes` : sans cette ligne les 3
   traductions seraient restees dans `studio/` sans jamais descendre dans le site
   (frontiere DEC-GED-001).
2. `DinoUI.longueurTxt` arrondissait au pied : la mousse (0,05 m) affichait **« 0 feet »** et le
   nenuphar aussi. Sous 2 pieds on bascule en pouces ; le singulier a sa cle (`unite_metre_un`),
   ce qui corrige aussi 4 dinos qui disaient « 1 feet ». Grave en **L-D27** (le formateur casse
   sur la premiere donnee hors de son domaine d'origine).
3. Les bundles UI deployes dataient d'avant les cles `plantes_*` : une fiche espagnole affichait
   « Où elle pousse » au-dessus d'un contenu traduit. `_gen-ui-bundle.cjs` rejoue sur les 3.

**Verification du travail des agents** (regle : verifier les claims) : aucune cle pre-existante
modifiee dans les 3 `strings.json` (diff contre HEAD), 19/19 plantes, 12/12 champs, echelles
recalculees une a une contre `hauteur_m`.
