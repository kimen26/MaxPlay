# Dino-Mix — l'atelier des personnages

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

## Les pièces

| Pièce | Fichier | Source | Rôle |
|---|---|---|---|
| Corps sans pattes, 6 têtes | `corps-r1c1..6` | `sans-pattes.webp` | Tricératops, Parasaurolophus, Spinosaure, Diplodocus, Ankylosaure, Raptor à plumes. Ventre rond FERMÉ. |
| Corps surfeur | `surf-r1c1` | `corps-surfeur.webp` | Bras écartés, pour le skate. |
| Corps bras levés | `up-r1c1` | `corps-bras-leves.webp` | Tient le manche du parapluie-hélice. |
| Corps de vol | `vol-r1c1` | `corps-vol.webp` | Pose de super-héros (bottes-fusées, météorite, nuages). |
| Jambe nue, 5 poses | `jambe-r1c1..5` | `jambes-pieces.webp` | Seule la pose 2 (droite) sert : UN dessin pour tout le cycle. |
| Jambes chaussées | `chaus-r1c1..4` | `jambes-chaussees.webp` | Nus, baskets, rollers, ressort : jambe + accessoire d'une seule pièce. |
| Botte-fusée | `fusee-r1c1` | `jambe-botte-fusee.webp` | Jambe chaussée d'une botte futuriste à tuyère. |
| Hélice, parapluie | `prop-r1c1`, `parapluie-r1c1` | `helice-pales.webp`, `parapluie-ferme.webp` | Parapluie-canne qui devient hélice. |
| Objets | `acc-*` | `accessoires-seuls`, `oeuf-pieces`, `montures` | Skate, coquille (+ bord avant, roue), météorite, nuage, cendre. |

Pour l'instant seul le Tricératops a ses corps surfeur, bras levés et vol : pour une autre tête, il faut
les faire dessiner (même prompt, même projet ChatGPT).

## Refaire la page

```
python -I studio/minijeux/dino-mix/build.py            # Tricératops
python -I studio/minijeux/dino-mix/build.py 4          # Ankylosaure (index 0-5)
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
7. **Vérifier toutes les images**, pas trois : vue « Toutes les poses » de la page, `marche16`,
   `oignon`, et une capture en gros plan du dos.

## ChatGPT

Toujours dans le projet « Dinosaure » (jamais l'historique général) :
`node .claude/skills/dino-images-lunii/scripts/gpt-gen.mjs "<prompt>" <sortie.png> --new --ref <image(s)>`.
`--ref a.png,b.png` joint des images (style + espèce), `--text` récupère une réponse écrite (critique).
Prompts : nommer les traits qui font reconnaître la pièce, garder le cadrage de la référence, demander
« EXACTEMENT le même personnage … seule différence : … ».
