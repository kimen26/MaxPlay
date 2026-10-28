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
| `page.html` | Gabarit : moteur d'animation (canvas) + vue « Toutes les poses ». |
| `dino-mix-demo.html` | Dernière page construite (autonome, s'ouvre sur téléphone). |
| `marche16.mjs` | Contrôle : 16 images du cycle de marche, la 16e doit rejoindre la 1re. |
| `oignon.mjs` | Contrôle : pelure d'oignon (32 images superposées + trajectoire de chaque pied). |
| `combos.mjs` | Contrôle : planche tête × corps × pieds, 6 images d'un cycle par combinaison. |

## Les pièces

| Pièce | Fichier | Source | Rôle |
|---|---|---|---|
| Corps distinctifs, 8 dinos | `dino-triceratops`, `-parasaurolophus`, `-spinosaure`, `-diplodocus`, `-ankylosaure`, `-raptor`, `-carnotaure`, `-stegosaure` | `corps-distincts-1.webp`, `corps-distincts-2.webp`, `corps-raptor-lisse.webp` | Dessin entier sans pattes, dos et queue intégrés, bas le long de la colonne (D-034, amendement 2026-10-28). Sert de CORPS, et de tête quand tête et corps sont du même dino. |
| Têtes à échanger | `corps-r1c1..6`, `corps-carno`, `corps-stego` | `sans-pattes.webp`, `carnotaure.webp`, `stegosaure.webp` | Même corps lisse pour tous : la tête posée sur un autre corps vient d'ici (`HEADS` dans `build.py`), sans emporter de plaques ni de carapace. Mises à l'échelle sur l'œil au build. |
| Anciennes pièces de dos | `dos-*`, `queue-*` | `ornements-dos.webp`, `ornement-*.webp`, `bouts-de-queue.webp` | Abandonnées le 2026-10-28 (L-158), plus lues par `build.py`. À supprimer après accord de PY. |
| Corps surfeur | `surf-r1c1` | `corps-surfeur.webp` | Bras écartés, pour le skate. |
| Corps bras levés | `up-r1c1` | `corps-bras-leves.webp` | Tient le manche du parapluie-hélice. |
| Corps de vol | `vol-r1c1` | `corps-vol.webp` | Pose de super-héros (bottes-fusées, météorite, nuages). |
| Jambe nue, 5 poses | `jambe-r1c1..5` | `jambes-pieces.webp` | Seule la pose 2 (droite) sert : UN dessin pour tout le cycle. |
| Jambes chaussées | `chaus-r1c1..4` | `jambes-chaussees.webp` | Nus, baskets, rollers, ressort : jambe + accessoire d'une seule pièce. |
| Botte-fusée | `fusee-r1c1` | `jambe-botte-fusee.webp` | Jambe chaussée d'une botte futuriste à tuyère. |
| Hélice, parapluie | `prop-r1c1`, `parapluie-r1c1` | `helice-pales.webp`, `parapluie-ferme.webp` | Parapluie-canne qui devient hélice. |
| Objets | `acc-*` | `accessoires-seuls`, `oeuf-pieces`, `montures` | Skate, coquille (+ bord avant, roue), météorite, nuage, cendre. |

Les corps surfeur, bras levés et vol sont ceux du Tricératops : ils ne servent qu'avec le corps du Tricératops
(n'importe quelle tête s'y pose). Les 7 autres corps font ces transports bras au repos, en attendant les bras en pièces.

## Refaire la page

```
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
5. **Vie du corps** : la queue et la tête sont des secteurs du dessin qui tournent autour de leur
   articulation ; le corps est dessiné PAR-DESSUS la queue (dos net), une petite sous-couche bouche la
   fente aux bords. Clignement dessiné sur l'œil repéré.
6. **Un transport, c'est en bas.** À l'arrêt, le dino est à la même hauteur que les copains et son
   pouvoir se lit au sol : nuages qui tournent autour des pieds, sol de gravier volcanique et pieds
   noircis, parapluie tenu comme une canne. Au départ, l'objet naît de ce signe (les nuages se
   réunissent, le parapluie monte et s'ouvre en hélice), en MOUVEMENT, jamais en simple fondu.
7. **Une tête, un corps, des pieds : trois choix indépendants.** Le corps distinctif est dessiné entier (L-158).
   La tête d'un autre dino vient de son dessin au corps lisse, calée par l'avant du ventre ; on n'en garde que
   le secteur de la tête. Le ventre se repère sous l'œil (une queue posée au sol n'en fait pas partie), la taille
   des objets (skate, coquille, nuage) suit celle du Tricératops pour tous, et une longue queue balance moins.
8. **Vérifier toutes les images**, pas trois : vue « Toutes les poses » de la page, `marche16`,
   `oignon`, et une capture en gros plan du dos.

## ChatGPT

Toujours dans le projet « Dinosaure » (jamais l'historique général) :
`node .claude/skills/dino-images-lunii/scripts/gpt-gen.mjs "<prompt>" <sortie.png> --new --ref <image(s)>`.
`--ref a.png,b.png` joint des images (style + espèce), `--text` récupère une réponse écrite (critique).
Prompts : nommer les traits qui font reconnaître la pièce, garder le cadrage de la référence, demander
« EXACTEMENT le même personnage … seule différence : … ».
