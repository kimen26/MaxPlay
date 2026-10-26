# Dino-Mix — l'atelier des personnages

Tout ce qu'il faut pour refaire, modifier et animer les bébés dinos de Dino-Mix. Le pourquoi (game
design, règle de jeu, choix validés) est dans [`../docs/specs/2026-10-09-dino-mix.md`](../docs/specs/2026-10-09-dino-mix.md).

## Ce que contient ce dossier

| Chemin | Rôle |
|---|---|
| `sources/` | Les dessins ChatGPT d'origine (projet « Dinosaure »), compressés. On ne les modifie pas : on les redécoupe. |
| `pieces/` | Les pièces découpées, prêtes à animer (voir la table ci-dessous). C'est la matière du jeu. |
| `decoupe.py` | Découpe une planche à fond crème en pièces WebP transparentes. |
| `variantes.py` | Monte les corps surfeur / bras levés / vol des 5 autres têtes (tête d'origine + bras du Tricératops). |
| `build.py` | Construit la page de démonstration depuis `pieces/` et le gabarit `page.html`. |
| `page.html` | Gabarit : moteur d'animation (canvas) + vue « Toutes les poses ». |
| `dino-mix-demo.html` | Dernière page construite (autonome, s'ouvre sur téléphone). |
| `marche16.mjs` | Contrôle : 16 images du cycle de marche, la 16e doit rejoindre la 1re. |
| `oignon.mjs` | Contrôle : pelure d'oignon (32 images superposées + trajectoire de chaque pied). |

## Les pièces

| Pièce | Fichier | Source | Rôle |
|---|---|---|---|
| Corps sans pattes, 6 têtes | `corps-r1c1..6` | `sans-pattes.webp` | Tricératops, Parasaurolophus, Spinosaure, Diplodocus, Ankylosaure, Raptor à plumes. Ventre rond FERMÉ. |
| Corps surfeur | `surf-r1c1..6` | `corps-surfeur.webp` (1) + montage (2..6) | Bras écartés, pour le skate. |
| Corps bras levés | `up-r1c1..6` | `corps-bras-leves.webp` (1) + montage (2..6) | Tient le manche du parapluie-hélice. |
| Corps de vol | `vol-r1c1..6` | `corps-vol.webp` (1) + montage (2..6) | Pose de super-héros (bottes-fusées, météorite, nuages). |
| Jambe nue, 5 poses | `jambe-r1c1..5` | `jambes-pieces.webp` | Seule la pose 2 (droite) sert : UN dessin pour tout le cycle. |
| Jambes chaussées | `chaus-r1c1..4` | `jambes-chaussees.webp` | Nus, baskets, rollers, ressort : jambe + accessoire d'une seule pièce. |
| Botte-fusée | `fusee-r1c1` | `jambe-botte-fusee.webp` | Jambe chaussée d'une botte futuriste à tuyère. |
| Hélice, parapluie | `prop-r1c1`, `parapluie-r1c1` | `helice-pales.webp`, `parapluie-ferme.webp` | Parapluie-canne qui devient hélice. |
| Objets | `acc-*` | `accessoires-seuls`, `oeuf-pieces`, `montures` | Skate, coquille (+ bord avant, roue), météorite, nuage, cendre. |

Le numéro de colonne d'un corps surfeur / bras levés / vol est celui de sa tête (`surf-r1c3` = Spinosaure).
Seuls ceux du Tricératops (`r1c1`) sont dessinés. Ceux des 5 autres têtes sont MONTÉS par `variantes.py`
(2026-10-25) : on part du corps sans pattes de la tête (sa vraie tête, son cou, ses taches), on coupe le
petit bras du fond le long de la courbe du ventre, on recouvre le petit bras proche par le ventre de la
variante du Tricératops recalée par le bas du ventre et la queue, puis on pose ses bras détourés le long
du trait. Ça marche parce que les 6 corps et les 3 variantes partagent le même gabarit. Limite connue :
les bras levés passent devant la joue, et chez les têtes à l'œil plus en arrière (Parasaurolophus, Raptor)
ils le frôlent. Un vrai dessin (une planche de 6 têtes, même prompt, même projet ChatGPT) découpé par
`decoupe.py` sous le même nom remplace le montage sans toucher à `build.py`.

## Refaire la page

```
python -I studio/minijeux/dino-mix/build.py            # Tricératops
python -I studio/minijeux/dino-mix/build.py 4          # Ankylosaure (index 0-5), avec ses variantes
python -I studio/minijeux/dino-mix/variantes.py <planche.png>   # remonte les 15 variantes (~2 min) + planche de contrôle
node studio/minijeux/dino-mix/marche16.mjs <sortie.png> file:///<chemin>/dino-mix-demo.html
node studio/minijeux/dino-mix/oignon.mjs   <sortie.png> file:///<chemin>/dino-mix-demo.html
```

Une nouvelle planche se découpe avec : `python -I studio/minijeux/dino-mix/decoupe.py <planche.png> <dossier> <rangées> <colonnes> <préfixe>`.

## Ajouter une tête

Un seul dessin : le corps sans pattes, sur le gabarit de `sans-pattes.webp` (même corps, mêmes petits bras,
même taille). Exemple pour les théropodes à tête massive (EP-156), une planche T-Rex + Carnotaure :

```
node .claude/skills/dino-images-lunii/scripts/gpt-gen.mjs "Planche de 2 personnages côte à côte, fond crème uni, EXACTEMENT le même style et EXACTEMENT le même corps que les bébés dinos de la première image (corps sans pattes, ventre rond fermé, queue, deux petits bras, même taille, de profil tourné vers la droite). Seule différence : la tête. À gauche un bébé Tyrannosaure : grosse tête carrée et massive, mâchoire puissante, petites crêtes au-dessus des yeux, grand sourire avec de petites dents arrondies, pas effrayant. À droite un bébé Carnotaure : tête massive et courte, deux cornes épaisses au-dessus des yeux comme un petit taureau, peau à petites bosses. Même vert, mêmes joues roses, mêmes grands yeux noirs. Pas de pattes, pas d'ombre, pas de texte." studio/minijeux/inbox/dino-mix-theropodes.png --new --ref studio/minijeux/dino-mix/sources/sans-pattes.webp,site/img/dinos/sprites/Tyrannosaurus_tete.webp,site/img/dinos/sprites/Carnotaurus_tete.webp
```

Puis : découper avec `decoupe.py`, mettre le corps à l'échelle des autres (même largeur de ventre), le nommer
`corps-r1c7` (8…), l'ajouter à `HEADS` de `build.py` et à `FAR_ARM` de `variantes.py` (rangées de son petit
bras du fond), relancer `variantes.py` et regarder la planche.

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
7. **Vérifier toutes les images**, pas trois : vue « Toutes les poses » de la page, `marche16`,
   `oignon`, et une capture en gros plan du dos.

## ChatGPT

Toujours dans le projet « Dinosaure » (jamais l'historique général) :
`node .claude/skills/dino-images-lunii/scripts/gpt-gen.mjs "<prompt>" <sortie.png> --new --ref <image(s)>`.
`--ref a.png,b.png` joint des images (style + espèce), `--text` récupère une réponse écrite (critique).
Prompts : nommer les traits qui font reconnaître la pièce, garder le cadrage de la référence, demander
« EXACTEMENT le même personnage … seule différence : … ».
