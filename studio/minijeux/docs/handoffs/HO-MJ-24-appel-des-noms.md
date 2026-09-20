# HO-MJ-24 — MJ « L'appel des noms » : le son initial d'un nom de dino

> Statut : **prêt, en attente du feu vert de Papa Yann** (question 5 du dossier
> `docs/research/2026-09-19-brainstorm-mj-dino.md`, idée E6). Ticket EP-137.
> Numéro de jeu : prochain libre dans `site/js/catalog.js` (ne pas recopier ici, D-012).
> Assets déjà là : ombres `site/img/dinos/ombres/`, MP3 `site/audio/dinos/fr/<id>-nom.mp3`,
> catalogue `site/js/gen/dinos-data.js`. Aucun asset à produire, sauf éventuellement les
> sons isolés des phonèmes s'ils n'existent pas déjà pour mj-50 (vérifier avant).
> Portée : un mini-jeu + son moteur de question réutilisable par le tourniquet (EP-136).

## 1. Pédagogie

Phase alphabétique (Ehri) : Max lit les 2-3 premières lettres d'un mot et infère le reste.
Le jeu travaille la correspondance **son → lettre → mot** sur un vocabulaire qu'il adore.
Règle absolue : on dit le **son** (« tttt », « sss »), jamais le nom de la lettre (« té »).
mj-50 fait déjà phonème → graphème ; ici on ajoute le mot entier et l'image, et on ne
demande pas d'écrire.

## 2. Mécanique

1. Trois ombres de dinos, grandes (≥ 96 px), bien séparées, noms aux sons initiaux
   distincts (jamais deux « T » ensemble : tirer parmi des initiales différentes).
2. La voix dit : « Lequel commence par… tttt ? » (son isolé, puis le son répété une fois).
3. Tap sur une ombre :
   - bonne : l'ombre se colore (paléoart headshot), le nom s'écrit en grand, première
     lettre surlignée, le MP3 `<id>-nom.mp3` joue. Bille verte.
   - autre : rien de rouge, l'ombre tremble doucement, la voix répète le son. Deuxième
     essai = bille jaune, troisième = orange. Jamais « perdu ».
4. Six questions par partie (3-5 min). Puis `shell.G.showEnd({replayUrl})`.
5. Niveau 2 (à débloquer à 2★, règle `unlock.js`) : quatre ombres, et la voix ne
   répète pas le son au deuxième essai.

Zéro pénalité, zéro chrono, zone tap ≥ 80 px, feedback < 200 ms, un seul son à la fois,
zéro score chiffré : contrat MJ v2.

## 3. Le moteur réutilisable

Isoler dans `site/js/quiz-son-initial.js` (ou dans la bibliothèque existante si une
brique de quiz à choix existe déjà, vérifier `docs/MECANIQUES.md` d'abord) une fonction
pure : `pickQuestion(dinos, {n:3, exclude:[]}) → {target, options, phoneme}`. Le
tourniquet avant fiche (EP-136) appellera la même fonction avec `target` imposé (le dino
qu'on va ouvrir) et `n:2`. Aucune logique DOM dans ce module.

Table phonème : dérivée de la première lettre du `nom` affiché, avec exceptions à écrire
à la main (« Ch » de Chasmosaure = « chchch », « Ps » de Psittacosaure = « sss », noms
commençant par une voyelle nasale à exclure du tirage). Vérifier avec le lexique
`js/gen/lexique-fr.js` et le ticket EP-D-Audio-Noms-Respell.

## 4. Livraison

Les 9 emplacements du STANDARD-MJ (html depuis `site/_template/mj-template.html`,
`catalog.js` zone dino, figée `docs/jeux/figees/mj-XX.md`, spec Playwright,
4 `strings.json`, référentiel de contenu), puis `check-mj-coherence.mjs`, `audit-gabarit`,
`mj:test`, `game-mj-reviewer`, captures 360 et 320 ouvertes.

## 5. Recette

Papa Yann avec Max : une partie, écouter si Max répète le son ou le nom de la lettre.
S'il dit « té », c'est la voix qui est mal réglée, pas Max.
