# Idées de jeux MaxPlay — Backlog créatif

> Ce fichier est un bac à sable d'idées non filtrées. Pas de priorisation ici.
> Source de décision : tasks/BACKLOG.md

---

## 🚏 Idées — Interactions arrêt de bus

- Poteau de bus interactif : lire le numéro de ligne affiché
- Reconnaître son arrêt quand le TTS l'annonce et appuyer sur STOP
- Lire l'heure du prochain passage sur le panneau
- Choisir la bonne ligne pour aller à une destination donnée
- Compter combien de bus passent à cet arrêt
- Faire monter/descendre des passagers en tapant au bon moment

## 🕐 Idées — Apprentissage du temps

- Lire l'heure sur une horloge analogique
- Lire l'heure sur un affichage numérique (style panneau LED)
- Calculer le temps d'attente ("le bus arrive dans 12 min, il est 14h30, à quelle heure arrive-t-il ?")
- Lire un horaire de bus (tableau départs/arrivées)
- Faire avancer les aiguilles d'une horloge jusqu'à la bonne heure
- Comprendre matin/après-midi/soir via l'heure du bus

## 🚌 Idées — Bus en mouvement

- Bus qui arrive : taper au bon moment (timing)
- Trier les bus par vitesse d'arrivée (le plus loin = arrive le plus tard)
- Reconnaître le bon bus parmi plusieurs qui arrivent simultanément
- Mémoriser l'ordre de passage des bus (séquence)
- Bus manqué : calculer combien de temps avant le prochain

## 🗺️ Idées — Itinéraires / destinations

- Quelle ligne prendre pour aller de A à B ?
- Reconnaître le terminus affiché sur le bus
- Trouver le bon arrêt sur une mini-carte
- Compter le nombre d'arrêts avant la destination
- Correspondance : changer de bus pour atteindre l'objectif

## 🎨 Idées — Lecture / couleurs / chiffres

- Colorier un bus avec la bonne couleur IDFM
- Reconstituer le numéro de ligne masqué (chiffres mélangés)
- Puzzle bus : remettre les morceaux en place
- Trouver l'intrus parmi des bus (couleur ou numéro qui ne correspond pas)
- Lire le numéro affiché sur le panneau LED du bus

## 🔧 Idées — Mécanique / logique

- Réparer le bus : trouver la panne (roue, porte, numéro, couleur)
- Remettre les bus dans le bon ordre (croissant, décroissant)
- Estimer si assez de place dans le bus (addition/soustraction)
- Trier par type : bus / tram / métro / RER

## 🌍 Idées — Narration / univers

- Max attend son bus : mini-histoire interactive
- Le bus est en retard : que se passe-t-il ? (rebondissements drôles)
- Journée du conducteur : séquence d'actions dans l'ordre
- Le bus mystère : deviner où il va avec des indices

## 🎵 Idées — Audio / TTS

- Écouter l'annonce de l'arrêt et retrouver le bon panneau
- TTS lit le terminus : reconnaître parmi 4 bus lequel s'arrête ici
- Jingle de ligne : chaque ligne a son son, reconnaître la ligne
- Annonce de correspondance : "prenez la ligne X pour..."

## 💡 Idées — Combinaisons possibles

- Arrêt de bus + heure : "Le 162 passe à 14h45, dans combien de minutes ?"
- Carte + itinéraire + correspondance : voyage complet
- Timing + lecture numéro : taper sur le bon bus qui arrive
- Narration + comptage : "Max a besoin de 3 tickets, combien il en a ?"

---

## MJ-13 — Arrêt de bus (validé 2026-03-17)

### Composants visuels validés
- Poteau arrêt de bus avec header rond gris (même couleur poteau) + liseré blanc + bande turquoise + "BUS"
- Fiches V1 : bloc couleur + numéro + 3 cases LED + "min" (minuteur en secondes en jeu)
- 3 à 6 lignes aléatoires affichées sur le poteau (2 gauche + 2 droite ou adaptées)
- Visuel route horizontal avec bus qui roulent vers l'arrêt

### Jeux validés

**MJ-13A — "Quel est le prochain bus ?"**
- Minuteur en secondes qui descend sur chaque fiche
- Question : "Quel bus passe en premier ?"
- Max tape sur la bonne fiche
- Pédago : lecture comparative des temps, priorité

**MJ-13B — "Monte dans le bus !"**
- "Monte dans le 162 !" — annonce TTS
- Les compteurs descendent vite (2-3 sec réelles)
- Bus arrive avec animation depuis la route
- Max a ~2s pour taper le bon bus quand il arrive
- Rate = le bus repart sans lui
- Pédago : réactivité + reconnaissance numéro sous pression

**MJ-13C — "Combien de bus avant le tien ?"**
- Max attend toujours le 162
- Question : "Combien de bus vont passer avant le tien ?"
- Max compte les fiches dont le temps est inférieur au 162
- Pédago : comparaison de nombres, ordinalité, dénombrement
- Nombre de lignes : 3 à 6 aléatoire

### Visuel route
- Vue de côté : route horizontale
- Bus SVG (busSVG()) qui roulent de droite à gauche
- Arrivent à l'arrêt, s'arrêtent, repartent
- Poteau sur le côté gauche ou droite

---

## 🧪 Idée — Mélange de couleurs (tubes à essai) — 2026-04-22

Tubes à essai avec des quarts/tiers de couleur qu'on peut faire switcher d'un tube à l'autre pour obtenir des flacons monocolores.

**Variantes possibles :**
- **Jeu autonome** : puzzle de tri de couleurs (genre Water Sort Puzzle), progression en difficulté
- **Support d'un autre MJ** : une fois les couleurs triées, on obtient la peinture pour colorier un bus à la bonne couleur IDFM
- **Débloquage** : chaque tube monocolore résolu révèle un indice (lettre, chiffre, pièce de puzzle) pour trouver quelque chose

**Pédago** : logique, planification de coups, reconnaissance couleurs, patience
**Tech** : drag&drop (on a `attachDraggable()` depuis C2), animation de liquide SVG
**Âge** : à adapter pour 3.5-4 ans (versions simples 3-4 tubes, 2-3 couleurs)

---

## 🎯 Idée — "Trouve-le parmi la foule" (hidden in plain sight bus) — 2026-04-22

Plein de bus se déplacent à l'écran en même temps, Max doit retrouver une cible spécifique.

**Variantes de cible :**
- Un bus d'une couleur précise parmi plein d'autres couleurs proches
- Un bus avec un numéro de ligne spécifique
- Un petit bonhomme / personnage caché à une fenêtre d'un des bus
- Le seul bus qui roule dans le bon sens

**Variantes d'action :**
- Le taper pour le "capturer" / ramener au garage
- Le faire exploser (confetti + son)
- Le suivre du doigt pendant X secondes sans le lâcher

**Pédago** : attention visuelle soutenue, reconnaissance rapide couleurs/chiffres, discrimination visuelle
**Tech** : multiples bus SVG en mouvement simultané, détection de tap sur élément mobile
**⚠ À valider** : est-ce qu'on a les animations de personnages pour afficher un petit bonhomme à une fenêtre de bus ? (à vérifier dans ASSETS_INVENTORY.md — sinon, reprise de l'esthétique SVG simple)

**Question en suspens** : faire marcher des petits perso (walking cycle) = pas d'asset actuel côté HTML vanilla. Faisable via SVG inline + CSS animation, ou sprite sheet, à creuser si on veut des persos animés récurrents.

