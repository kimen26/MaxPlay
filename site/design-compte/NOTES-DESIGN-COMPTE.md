# Design Compte — Notes de conception & état des lieux

> Dossier de travail des maquettes de jeux de comptage / nombres pour Max (4-6 ans).
> Ce fichier sert de mémoire de la réflexion pour reprendre le travail dans une nouvelle conversation.
>
> 📖 Pendant lecture : [`../design-lecture/NOTES-DESIGN-LECTURE.md`](../design-lecture/NOTES-DESIGN-LECTURE.md) (créé 2026-07-19).

## Dernier besoin exprimé (point de reprise)

Le parent a validé le principe de la **série 3 v2** mais n'a PAS ENCORE VU les rendus :
la page `serie-3-concepts.html` a été **réécrite en v2** (10 concepts) suite à ses retours,
et il reste à faire :

1. **Capturer les 10 concepts en screenshots** (commande prête, voir plus bas) et les montrer au parent.
2. Recueillir ses retours sur la v2.
3. Transformer les concepts retenus en **mockups jouables** (comme séries 1 et 2).
4. À terme : brancher sur le vrai moteur `site/js/mj-compte.js` + gabarit `site/js/mj-shell.js`.

### Commande de capture (Chrome headless, fonctionne — chemins Windows absolus obligatoires)

```bash
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
BASE="file:///C:/ProjetsPerso/Claude_Projects/MaxPlay/site/design-compte/serie-3-concepts.html"
mkdir -p temp/shots-serie3-v2
for n in 1 2 3 4 5 6 7 8 9 10; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=560,900 \
    --screenshot="C:\ProjetsPerso\Claude_Projects\MaxPlay\temp\shots-serie3-v2\concept-$n.png" \
    "$BASE?only=$n"
done
```

La page supporte `?only=N` (N=1..10) pour n'afficher qu'une carte — prévu pour les captures.

⚠️ Le `--screenshot=` DOIT être un chemin Windows absolu (les chemins relatifs Git Bash échouent silencieusement).

## Fichiers du dossier

- `index.html` — sommaire des séries 1 & 2 (10 mockups jouables). **La série 3 n'y est pas encore référencée.**
- `mockup-1-oeufs.html` … `mockup-10-nids.html` — mockups jouables séries 1 & 2.
- `serie-3-concepts.html` — **planche de concepts v2 (10 cartes, scènes CSS statiques, non jouables)**.
- `NOTES-DESIGN-COMPTE.md` — ce fichier.
- Screenshots : `temp/shots-serie3/` (v1, 8 concepts) — la v2 n'est pas encore capturée.

---

## Série 1 — Comptage simple (mockups 1-5) — RETOURS PARENT

| # | Concept | Retour |
|---|---------|--------|
| 1 | Les Œufs Surprise (QCM → éclosion) | ✅ « super idée de remonter les avatars » |
| 2 | Le Tampon Magique (tap-to-count, tampons 1,2,3) | « simpliste mais pourquoi pas, l'idée de garder le compte à l'écran est intéressante » |
| 3 | Monte dans le Bus ! (compteur LED) | « bonne idée mais les places ne sont pas clairement définies → mettre des dés (6 places) par vitres ??? » |
| 4 | Les Bulles des Fonds Marins | « trop light et simpliste » |
| 5 | Le Projecteur du Musée | « images énormes, je ne comprends pas l'intérêt » |

**Redirection clé du parent** : aller au-delà du comptage 1 par 1 (max 3-7) →
**subitizing** (reconnaître sans compter, ex. 2 mains ouvertes = 10), **regroupements**
(dés, dominos, groupes de 5/10), **Montessori** (perle/barrette/plaque/cube — Max fait déjà
des additions de milliers en remontant les dizaines), petites additions/soustractions
incarnées (œufs cassés, places vides, passagers qui descendent) ≤ 20, multiplication
naissante ≤ 20. **Toujours de la représentation, jamais du calcul de tête.**

## Série 2 — Regroupements & petits calculs (mockups 6-10) — validée « ultra bien »

| # | Concept | Compétence |
|---|---------|-----------|
| 6 | Les Constellations d'Œufs | subitizing dés/dominos, additions ≤ 12 (groupes qui s'illuminent EN BLOC) |
| 7 | La Barrette d'Or | ancre 10 Montessori, nombres 11-20 |
| 8 | Le Bus aux 10 Places | plan de sièges 2×5 façon domino, addition/soustraction ≤ 10 |
| 9 | Les Œufs Cassés | soustraction narrative ≤ 10 (coquilles = trace du « en moins ») |
| 10 | Les Nids par Groupes | multiplication naissante ≤ 20, compte par groupes (« 4 ! 8 ! 12 ! ») |

## Série 3 v1 (8 concepts, screenshots `temp/shots-serie3/`) — RETOURS PARENT

1. **Banque de Perles** : « pourquoi pas » MAIS **proportions à respecter** : cube en vrai 3D (voir l'épaisseur), plaque avec épaisseur, barrette = longueur d'un côté de plaque.
2. **Dinos Mélangés** : « pas mal » — changer les couleurs/espèces pour éviter toute ressemblance.
3. **Dominos** : « ça s'affiche d'un coup, très bonne idée » (flash subitizing) — le domino troué : incompris, « on s'en fout ».
4. **Coloriage Magique** : « nul, je comprends pas » → **abandonné**.
5. **Machine à Faire 10** : « beaucoup d'espoir » — simplifier en regroupant par 5 ou 10 (ou par 2 en niveaux simples).
6. **Remplis le Bus** : ok MAIS l'enfant doit **sélectionner QUI monte**, et s'il se trompe « c'est le drame » : le dino pas content du tout (→ avatar `*_enerve_*`, drama rigolo, jamais punitif).
7. **Plaque de 100** : « pas compris le jeu ??? » → **abandonné/remplacé**.
8. **Miroir des Doubles** : ok, « pourquoi pas aller au ×3 aussi ? »

Source d'inspiration fournie par le parent : photos de fiches papier de Max (coloriage magique
dino « Je compte 9-15 → je colorie », constellations de dés/domino, « Dénombrer de grandes
quantités », « Additionner de petites quantités », distinguer nombres 1-30).

## Série 3 v2 — ÉTAT ACTUEL (dans `serie-3-concepts.html`, à montrer au parent)

10 cartes. Adaptations du feedback + 4 nouvelles idées (repérées ■ vert) :

| # | Concept | Statut |
|---|---------|--------|
| 1 | La Banque de Perles | **v2** : matériel Montessori à l'échelle (perle Ø u, barrette 10u, plaque 10u×10u + tranche d'épaisseur, cube 3 faces avec dessus/côté skew). Verse A + B (+C) dans le bol, échanges magiques 10→1. |
| 2 | Dinos Mélangés | **v2** : T-rex orange vs brachio bleu (contrastes forts). |
| 3 | Dominos Flash | **v2** : domino horizontal 5\|3, barre-timer 2 s qui défile, « c'était combien ? ». Troué supprimé. |
| 4 | ■ La Balance des Dinos | **NOUVEAU** : balance qui penche, équilibrer 6+4 ⚖️ 7+3 → sens du « = » et décompositions équivalentes. |
| 5 | La Machine à Faire 10 | **v2** : groupe de 5 teinté dans la barquette (on VOIT 15 = 10+5). Niveaux ★ par 2, ★★ par 5, ★★★ retenue complète (8+7). |
| 6 | Remplis le Bus ! | **v2** : l'enfant choisit QUI monte parmi 4 candidats ; erreur = dino `allo_enerve_1` « Grr ! plus de place pour MOI ! » ; trop peu = « le bus ne démarre pas ». |
| 7 | ■ Le Saut du Ptéro | **NOUVEAU** : droite numérique 0-20, le ptéro perché sur 8 fait 5 sauts dessinés en arcs → « 8+5=13 ». Version sauts de 10, soustraction = vol à reculons. |
| 8 | Le Miroir Magique | **v2** : miroir ×2 ET miroir d'angle ×3 (« 4×3=12 »), tuiles à débloquer, ≤ 20. |
| 9 | ■ La Maison des Nombres | **NOUVEAU** : maison avec « 10 » sur le toit, 6 œufs à gauche, « ? » à droite → décomposition 10 = 6+4. |
| 10 | ■ Quel Bus est le Plus Plein ? | **NOUVEAU** : deux plans de sièges 2×5 (7 vs 5), comparer « plus/moins/pareil », surplus illuminé, variantes écarts de 1. |

## Série 4 — 10 nouveaux concepts (proposés 2026-07-19, EN ATTENTE retour parent)

Territoires pas encore couverts par les séries 1-3 : ordinaux, estimation, pairs/impairs,
compte à rebours, suites, monnaie naissante, centaines (Max est aux milliers !), 2 dés,
addition cachée (étape CRA), partage/moitié. Mêmes règles : toujours de la représentation,
zéro pénalité, mécaniques existantes quand possible.

| # | Concept | Compétence | Mécanique / notes |
|---|---------|-----------|-------------------|
| 1 | **La File du Toboggan** | Ordinaux (1er, 2ème…), rang ↔ position | Dinos/avatars en file au toboggan. « Le 3ème va glisser ! » Variantes : « à quel rang est le dino bleu ? », « le 5ème sort de la file, il en reste combien ? » (pont vers soustraction). QCM-tap classique. |
| 2 | **Le Bocal d'Œufs** | Estimation d'ordre de grandeur (10 / 20 / 50) | Bocal transparent rempli d'œufs. « À peu près combien ? » → après le choix, les œufs sortent et se rangent en paquets de 10 pour vérifier. L'erreur enseigne (écart grand au début, écarts resserrés ensuite). |
| 3 | **Main dans la Main** | Pairs / impairs ≤ 10 puis ≤ 20 | Les dinos se tiennent la main deux par deux ; un tout seul = impair. « Pair ou impair ? » La représentation (couples + éventuel solitaire) rend le concept visible sans le nommer d'abord. |
| 4 | **Décollage !** | Compte à rebours 10→0, puis 20→0 | Fusée/téléphérique : taper les chiffres à rebours dans l'ordre, chaque bon tap illumine le chiffre, à 0 → feu d'artifice. Variante « répare la banderole » : retrouver le chiffre manquant du rebours. |
| 5 | **La Banderole des Chiffres** | Suite 1-30, chiffre manquant, n+1 / n−1 | Banderole de festons numérotés dont des cartes sont tombées → les remettre à leur place (drag ou tap-2-choix). Soigner les transitions décennales (« après 19 → 20 ») qui coincent à cet âge. |
| 6 | **Le Guichet des Tickets** | Monnaie naissante ≤ 10 (payer, appoint, rendu) | Le ticket coûte 3 perles : prendre les perles dans le porte-monnaie et payer. Niveaux : appoint exact → payer 5 pour 3 et recevoir le rendu (perles rendues visibles, une à une). |
| 7 | **La Fabrique des Centaines** | Numération positionnelle : 10 barrettes = 1 plaque, 10 plaques = 1 cube | Complément direct de la Banque de Perles (série 3 #1). Fabriquer 100, 200, 300 à la demande ; version XXL pour Max (qui fait déjà des milliers) : assembler LE cube de 1000. Mêmes règles de proportions Montessori que la série 3. |
| 8 | **Les Dés Roulent** | Addition ≤ 12 (2 dés), subitizing instantané | Deux dés roulent, leurs constellations s'illuminent EN BLOC (comme série 2 #6), choisir le total. **Réutilise `site/js/mj-dice.js`** (solveur anti-deadlock inclus). Variante ★★★ : 3 dés ≤ 18. |
| 9 | **La Boîte Mystère** | Addition cachée ≤ 10 — passage Concret → Représentation (CRA) | On VOIT entrer 4 œufs dans la boîte, puis 2 de plus. « Combien dans la boîte ? » → ouvrir pour vérifier (la révélation est le feedback). L'étape clé entre « tout voir » (séries 1-3) et le calcul de tête : les objets sont cachés mais leur histoire est visible. |
| 10 | **Le Partage des Fraises** | Moitié / partage équitable / division naissante ≤ 20 | 8 fraises à partager « pareil ! » entre 2 dinos ; la balance confirme l'équité. Niveaux : partage en 3, partage avec reste → drama rigolo : « il en reste une… pour papa ! » (jamais punitif). |

Idées en réserve (non développées) : zéro incarné (le nid vide), « de combien de plus ? »
(compléments au-delà de 10), double entrée tableau (dinos × nids), comparaison rapide
« le plus grand gagne » (dés + suspense).

---

## Conventions projet (rappel)

- Fonts Google `Nunito:wght@700;900` + `Fredoka One` ; dark mode coloré ; or `#ffd166`/`#ffe066`.
- Zones tactiles ≥ 80px ; radius 16-22px / pilules 999px ; animations pop < 300 ms.
- Zéro pénalité punitive ; le drama rigolo (dino énervé) est OK.
- Bus : JAMAIS d'emoji 🚌 — `site/js/bus-svg.js` → `busSVG(color, textColor, num, width)`.
- Assets : avatars `site/img/avatars/*_{joyeux,enerve,original}_*.png` ; ombres `site/img/dinos/ombres/Xxx_ombre.png` ; décor `site/img/decor/` ; sons `site/sounds/`.
- Moteur existant pour la prod : `site/js/mj-compte.js` (« 1 moteur, N peaux ») + gabarit `site/js/mj-shell.js` ; docs `studio/minijeux/docs/STANDARD-MJ.md`, décisions figées par jeu dans `studio/minijeux/docs/jeux/figees/`.
- Jeux de comptage existants : `mj-04` (passagers), `mj-26` (dinos), `mj-gold-b` (bus).
