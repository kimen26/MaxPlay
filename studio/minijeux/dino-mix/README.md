# Dinomino (ex-Dino-Mix) — l'atelier des personnages

Tout ce qu'il faut pour refaire, modifier et animer les bébés dinos de Dino-Mix. Le pourquoi (game
design, règle de jeu, choix validés) est dans [`../docs/specs/2026-10-09-dino-mix.md`](../docs/specs/2026-10-09-dino-mix.md).

## Ce que contient ce dossier

| Chemin | Rôle |
|---|---|
| `sources/` | Les dessins ChatGPT d'origine (projet « Dinosaure »), compressés. On ne les modifie pas : on les redécoupe. |
| `pieces/` | Les pièces découpées, prêtes à animer (voir la table ci-dessous). C'est la matière du jeu. |
| `decoupe.py` | Découpe une planche à fond crème en pièces WebP transparentes. |
| `build.py` | Construit la page de démonstration depuis `pieces/` et le gabarit `page.html`. |
| `sources/lego/` | Les dessins ChatGPT du lego : par espèce `-corps`, `-full`, `-tete` (voir règle 7). |
| `assemble.py`, `lego.py` | Recalent les dessins de `sources/lego/` sur le corps de base et écrivent `pieces/lego/` (têtes, corps, `kit.json`). |
| `page.html` | Gabarit : moteur d'animation (canvas) + vue « Toutes les poses ». |
| `dino-mix-demo.html` | Dernière page construite (autonome, s'ouvre sur téléphone). |
| `marche16.mjs` | Contrôle : 16 images du cycle de marche, la 16e doit rejoindre la 1re. |
| `oignon.mjs` | Contrôle : pelure d'oignon (32 images superposées + trajectoire de chaque pied). |
| `combos.mjs` | Contrôle : planche tête × corps × pieds, 6 images d'un cycle par combinaison. |

## Les pièces

| Pièce | Fichier | Source | Rôle |
|---|---|---|---|
| Têtes et corps lego, 8 espèces | `pieces/lego/tete-*`, `corps-*` | `sources/lego/` | Les pièces du jeu depuis le 2026-11-03, toutes dans le même cadre (`kit.json`). `entier-*` : contrôle seulement. |
| Anciens dinos entiers, 8 espèces | `dino-*` | `corps-distincts-1.webp`, `corps-distincts-2.webp`, `corps-raptor-lisse.webp` | Plus lus depuis le 2026-11-03 (lego). Servent de modèle d'espèce à ChatGPT. |
| Anciennes têtes au corps lisse | `corps-r1c1..6`, `corps-carno`, `corps-stego` | `sans-pattes.webp`, `carnotaure.webp`, `stegosaure.webp` | Plus lues depuis le 2026-10-29 : la tête vient du dessin distinctif, coupée au cou (L-159). À supprimer après accord de PY. |
| Anciennes pièces de dos | `dos-*`, `queue-*` | `ornements-dos.webp`, `ornement-*.webp`, `bouts-de-queue.webp` | Abandonnées le 2026-10-28 (L-158), plus lues par `build.py`. À supprimer après accord de PY. |
| Corps surfeur | `surf-r1c1` | `corps-surfeur.webp` | Bras écartés, pour le skate. Plus lu depuis le 2026-11-03 (style de l'ancien Tricératops), en attendant des bras en pièces. |
| Corps bras levés | `up-r1c1` | `corps-bras-leves.webp` | Tient le manche du parapluie-hélice. Plus lu depuis le 2026-11-03 (style de l'ancien Tricératops), en attendant des bras en pièces. |
| Corps de vol | `vol-r1c1` | `corps-vol.webp` | Pose de super-héros (bottes-fusées, météorite, nuages). Plus lu depuis le 2026-11-03 (style de l'ancien Tricératops), en attendant des bras en pièces. |
| Jambe nue, 5 poses | `jambe-r1c1..5` | `jambes-pieces.webp` | Seule la pose 2 (droite) sert : UN dessin pour tout le cycle. |
| Jambes chaussées | `chaus-r1c1..4` | `jambes-chaussees.webp` | Nus, baskets, rollers, ressort : jambe + accessoire d'une seule pièce. |
| Botte-fusée | `fusee-r1c1` | `jambe-botte-fusee.webp` | Jambe chaussée d'une botte futuriste à tuyère. |
| Hélice, parapluie | `prop-r1c1`, `parapluie-r1c1` | `helice-pales.webp`, `parapluie-ferme.webp` | Parapluie-canne qui devient hélice. |
| Objets | `acc-*` | `accessoires-seuls`, `oeuf-pieces`, `montures` | Skate, coquille (+ bord avant, roue), météorite, nuage, cendre. |

Tous les mélanges font les transports bras au repos, en attendant les bras en pièces.

## Refaire la page

```
python -I studio/minijeux/dino-mix/assemble.py         # après tout nouveau dessin dans sources/lego
python -I studio/minijeux/dino-mix/build.py            # Tricératops
python -I studio/minijeux/dino-mix/build.py 4          # ouvre sur l'Ankylosaure (ordre de BODIES dans build.py)
node studio/minijeux/dino-mix/marche16.mjs <sortie.png> file:///<chemin>/dino-mix-demo.html
node studio/minijeux/dino-mix/oignon.mjs   <sortie.png> file:///<chemin>/dino-mix-demo.html
```

Une nouvelle planche se découpe avec : `python -I studio/minijeux/dino-mix/decoupe.py <planche.png> <dossier> <rangées> <colonnes> <préfixe>`.

## Comment on anime (les règles qui ont marché, et pourquoi)

1. **Un corps sans pattes + des jambes en pièces.** Jamais de jambes découpées dans un dessin figé :
   raccord « recousu » (9 versions perdues, D-032). La jambe du fond passe DERRIÈRE le corps, sa cuisse
   cachée ; la jambe proche passe DEVANT, sa cuisse ronde posée sur le bas du ventre ; pivot à la hanche.
2. **Un seul dessin de jambe** pour tout le cycle (deux dessins = taches qui changent). Le pli se fait en
   raccourcissant la même jambe.
3. **Marche en 4 temps, sans saut d'angle** : appui (pied posé devant qui glisse vers l'arrière),
   lever, tendre (plus loin devant, en l'air), poser. Le corps se pose sur le pied le plus bas à chaque image.
4. **Un accessoire de pied se dessine PORTÉ** (jambe + botte d'une seule pièce), jamais posé par-dessus.
   Le ressort remplace le pied et se comprime sous sa bague.
5. **Vie du corps** : la tête (pièce à part) tourne un peu autour de son pivot, la queue fléchit (règle 7).
   Clignement dessiné sur l'œil repéré.
6. **Un transport, c'est en bas.** À l'arrêt, le dino est à la même hauteur que les copains et son
   pouvoir se lit au sol : nuages qui tournent autour des pieds, sol de gravier volcanique et pieds
   noircis, parapluie tenu comme une canne. Au départ, l'objet naît de ce signe (les nuages se
   réunissent, le parapluie monte et s'ouvre en hélice), en MOUVEMENT, jamais en simple fondu.
7. **Une tête, un corps, des pieds : trois choix indépendants. Un lego dessiné par ChatGPT** (2026-11-03, L-165).
   Un seul corps de base : le Tricératops sans tête, épaule refermée, dessiné par ChatGPT. Pour chaque espèce, dans
   UNE conversation du projet « Dinosaure » : (1) le dino entier sur CE corps (tête + dos + queue de l'espèce), (2) sa
   tête seule, (3) son corps sans tête. `assemble.py` recale tout sur le corps de base (`lego.py` : la tête seule sur
   le dessin entier par l'œil, le dessin entier et le corps sur le corps de base par la silhouette du ventre) et écrit
   les pièces dans UN cadre commun : toute tête se pose sur tout corps sans calcul, à la place où ChatGPT l'a dessinée.
   La tête seule a un bas de cou refermé par un trait : on n'en garde que ce que le dessin entier montre comme tête
   (le cou se fond dans le poitrail, le bras passe devant). Le code ne dessine aucun pixel : il recale et découpe.
   La queue FLÉCHIT (bandes verticales décalées en parabole) au lieu de tourner : un secteur tourné dédoublait les
   plaques à la jointure. Contrôle : la planche des mélanges en grand, à plusieurs phases de marche.
8. **Vérifier toutes les images**, pas trois : vue « Toutes les poses » de la page, `marche16`,
   `oignon`, et une capture en gros plan du dos.

## ChatGPT

Toujours dans le projet « Dinosaure » (jamais l'historique général) :
`node .claude/skills/dino-images-lunii/scripts/gpt-gen.mjs "<prompt>" <sortie.png> --new --ref <image(s)>`.
`--ref a.png,b.png` joint des images (style + espèce), `--text` récupère une réponse écrite (critique).
Prompts : nommer les traits qui font reconnaître la pièce, garder le cadrage de la référence, demander
« EXACTEMENT le même personnage … seule différence : … ».
