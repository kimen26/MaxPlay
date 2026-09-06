# HO-MJ-07 — Rapport pt-br : pack complet i18n mini-jeux

Statut : fait. 0 erreur checker, bundle généré, Playwright 0 pageerror sur 4 jeux testés, captures
ouvertes et relues.

## Fichiers écrits

- `studio/minijeux/i18n/pt-br/strings.json` — 37 jeux + `_commun` (mêmes 37 clés top-level que le
  canon FR et le témoin EN), écrit en 6 passes (Write puis Edit par blocs de jeux) pour rester
  maîtrisable, JSON validé après chaque passe.
- `site/js/i18n/mj-strings.pt-br.js` — bundle généré (`_gen-mj-strings-bundle.cjs pt-br`).

Aucun fichier `es-es` ni `mj-XX.html` touché.

## Portes — sortie exacte

```
node studio/minijeux/tools/_check-mj-traduction.cjs pt-br
--- check mj pt-br ---
jeux 37/37
0 erreurs, 0 avertissements

node studio/minijeux/tools/_gen-mj-strings-bundle.cjs pt-br
C:\ProjetsPerso\Claude_Projects\MaxPlay\site\js\i18n\mj-strings.pt-br.js : 37 jeux
```

0 WARN à justifier — le checker n'a rien remonté.

## Playwright

Serveur statique node ad hoc sur `site/`, port 8792. 4 jeux testés en `?lang=pt-br` : mj-13a,
mj-30, mj-48, mj-24. Panneau règle (`#ri-overlay`) s'ouvre automatiquement à la 1ʳᵉ visite
(autoOpen), capturé sans action supplémentaire. **0 `pageerror`** sur les 4 runs.

Captures dans `studio/minijeux/docs/handoffs/rapports/captures/` :
- `HO-MJ-07-pt-br-mj-13a.png`, `-mj-30.png`, `-mj-48.png`, `-mj-24.png`

**Toutes ouvertes et relues (Read direct des PNG)** : titre du jeu traduit dans le header
("O primeiro ônibus", "Organiza por tamanho", "Todo mundo a bordo", "Acha o dino"), consigne
dynamique injectée avec placeholder résolu ("Rápido, acha a Diplodoco!" — nom du dino traduit par
le pipeline dino, hors périmètre de ce brief), panneau règle intégralement en portugais (onglets
"A regra"/"Opinião", bouton "Ouça todas as regras", étapes 1-4, encadré "Como ganhar as
estrelas? ★★★", bouton "Entendi! 👍"). Zéro mot français visible, tous les accents (ô, ã, ç, í, ú)
rendus correctement.

## Choix de traduction notables

- **Registre `você`** partout (jamais `tu`), conforme charte dino reprise dans le brief HO-MJ-07.
- **Langue pt-br dans mj-20** (`ui.langues["pt-br"]`) : traduit "Brésilien" (FR, point de vue
  français sur la langue enseignée) → **"Português"** (point de vue natif : un enfant brésilien
  n'apprend pas "le brésilien", il apprend/reconnaît sa propre langue nommée normalement).
- **Ordinaux mj-48** (`ui.ordinaux`) : "primeiro/segundo/terceiro/quarto/quinto" — tableau de même
  longueur (5) que le FR, consommé par `MJi18n.t` avec repli FR si absent/mauvaise longueur.
- **Onomatopées/interjections adaptées, pas calquées** : "Prrrout !" (mj-21, pot qui déborde) →
  "Ploft!" (bruit de liquide en pt-br, pas un décalque phonétique du FR) ; "PILE !" (mj-35, ovos
  tombant juste) → "CERTINHO!" (expression brésilienne courante pour "tombé pile", pas de faux-ami
  avec "pilha"/pile électrique).
- **mj-52 boîte à mots** : exemple FR "papa, maman, moto" → "papai, mamãe, moto" (mots d'usage
  courant pt-br pour un enfant de 4 ans, pas de calque "papa"/"mama" qui sonneraient datés/PT
  européen).
- **mj-50/51/52/53 (4 jeux phonétiques FR figés par décision PY 2026-09-05)** : `titre`, `regle`
  et `ui` traduits normalement en portugais ; seul le contenu strictement phonétique français à
  l'intérieur des `voix.regle-mj-5X` (le fragment qui répète les sons/lettres/mots FR eux-mêmes :
  « mmm », « pa | pa », « b, d, h et k », « maman ») a été laissé identique au FR — rien inventé
  pour du contenu qui désigne des sons ou lettres françaises spécifiquement. Le reste de la phrase
  vocale (chrome, transitions) est en portugais.
- **Unités et échelle** : métrique conservé partout (mj-30, mj-31), chiffres strictement
  identiques au FR — aucune conversion, conforme charte (pt-br = système déjà métrique).
- **Repères culturels** : aucun changement d'ordre de grandeur ; les seuls repères culturels du
  corpus panneau-règle (pays, dinos, ônibus) restent des noms propres ou données hors périmètre
  (mj-15/mj-22 gardent leurs valeurs `dinos-data.js`/pays brutes, cf. doctrine frontière
  autoring/produit).

## Contraintes respectées

Aucun `mj-XX.html` modifié, aucun fichier `es-es` touché, aucun `git`, aucun sous-agent lancé.
Fichiers temporaires (script Playwright ad hoc) supprimés du dossier `tests/` en fin de tour.
