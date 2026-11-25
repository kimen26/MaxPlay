# HO-MJ-25 — Nid v5 : trois nids construits, œufs habillés, cadeaux qui alternent

> Statut : **en cours** (ouvert 2026-11-25). Décision : D-041 (`studio/minijeux/memory/DECISIONS.md`).
> Proposition validée par Papa Yann (« Go ») : `docs/handoffs/nid-v5/proposition-nid-v5.html`.
> Concepts visuels : `docs/handoffs/nid-v5/*.png`. Tickets EP-158, EP-159, EP-160.

## 1. Ce que Max doit vivre

- Le nid s'ouvre sur un **terrain préhistorique** avec **3 emplacements côte à côte**.
  Au tout début : 3 cercles en pointillés, rien d'autre.
- Le **premier cadeau** de l'histoire est un **tas de cailloux** : le nid 1 se forme
  d'un coup. Ensuite les cailloux arrivent **par poignée de 2** ; un nid est fermé à
  **6 cailloux**. On voit chaque caillou posé (un sprite par emplacement sur l'ovale).
- Un **œuf** n'arrive que dans un **nid fermé et libre**. Il a la couleur de sa famille
  (règle actuelle, `familleMeta.color`), l'espèce reste la surprise.
- Max glisse un **lit** (brindilles, fougère, mousse, plumes) **dans** le nid : il se
  pose sous l'œuf. Le lit **reste** au nid après l'éclosion.
- Max glisse un **habit** n'importe où sur l'œuf : il se met tout seul à sa place
  (bonnet en haut, écharpe au milieu, cape sur le dos). Deux fois le même type :
  la tour de bonnets (le 2e plus haut, un peu penché), ou 2 tours d'écharpe.
  Un 3e du même type sur le même œuf : l'habit revient au sac en rebondissant, jamais d'erreur affichée.
- Toucher un objet du sac sans glisser : il va tout seul sur le bon nid (l'œuf qui
  en a besoin : lit si pas de lit, sinon habit à l'œuf le moins habillé).
- **Éclosion** : un œuf avec son lit et 2 habits (le tout premier œuf de l'histoire :
  lit + 1 habit) éclot ; le théâtre actuel (`hatchTheatre`, transport vers Padidi) est
  réutilisé. Le bébé emporte ses habits. Le nid et son lit restent.
- **Caresse** : toucher l'œuf = cœurs + petit frétillement ; les œufs des nids voisins
  se penchent vers lui. La caresse ne fait plus éclore (on retire `loveWarm`).
- Les **3 nids fermés**, les cadeaux « cailloux » deviennent des **cailloux peints**
  qui se posent autour d'un nid (décor, jusqu'à 4 par nid, au-delà rien de plus n'est donné).

## 2. Règles du tirage (moteur `site/js/collection.js`, pur, sans DOM)

`grantReward({gameId, perfect, mastered})` renvoie `{granted, gifts:[gift...], double}`
où `gift = {type:'cailloux'|'oeuf'|'lit'|'habit'|'peint', id, variante, rare, n?, nid?}`.
Garder la compat (`granted`, `type` du premier gift, `count`) pour les appelants existants.

1. **Toute première partie** (aucun nid commencé) : `cailloux` n=6 sur le nid 1. Toujours.
2. **Chance d'un cadeau** : 0,5 ; **0,7 si sans-faute** ; **forcé** si les 2 parties
   précédentes n'ont rien donné (compteur `dry`) ou si `mastered`. Le tirage utilise
   un `rng` injectable (`configure({rng})`) pour que les tests soient déterministes.
3. **Double** : 1 chance sur 10 quand un cadeau est donné, **jamais deux doubles de suite**.
4. **Quoi donner** — liste des besoins, tirage uniforme parmi ceux qui existent :
   - `lit` : un œuf est dans un nid sans lit, et le sac ne contient pas déjà de lit ;
   - `habit` : un œuf a son lit (ou en attend un dans le sac) et moins de 2 habits,
     et le sac ne contient pas déjà assez d'habits pour couvrir ce besoin ;
   - `oeuf` : un nid est fermé et libre ;
   - `cailloux` (n=2) : un nid n'est pas fermé (on complète le nid le plus avancé) ;
   - aucun besoin → `peint` (si un nid a moins de 4 cailloux peints), sinon rien.
5. **Sac de 3 places** (lits + habits). Sac plein : `lit` et `habit` sont exclus du
   tirage ; on ne jette jamais rien.
6. **Jamais deux fois de suite le même cadeau** (même type + id + variante).
7. **Variante** : sans-faute ou `mastered` → tirée dans la liste rare, sinon dans la
   liste commune (tableau §4).
8. **Fin de l'anti-farm** : un jeu à 3 étoiles suit la même règle.
9. Échec de `save()` : on ne rend jamais `granted:true` (règle HO-MJ-21 conservée).

API v3 à exposer : `nids()` (copie des 3 nids : cailloux, lit[], peints[], oeuf|null avec
habits[], ready), `sac()`, `poser(nidIndex, itemIndexDansSac)` → `{ok, ready, refus?}`,
`caresser(nidIndex)`, `eclore(nidIndex)` → item, `readyNidIndex()`. Compat à garder :
`eggs()` (œufs des nids, avec `index` = index du nid), `pending()`, `readyToHatch()`,
`hatch()`, `owned()`, `own()`, `state()`, `grantCapsule()`, `familleInfo()`.
`armoire.js:494` compte `Collection.eggs().length` : doit continuer de marcher.

**Migration v2 → v3** (silencieuse, écrite une fois) : chaque œuf v2 reçoit un nid fermé
(6 cailloux) ; `paille` → lit `fougere` ; `bonnet` → bonnet `rouge`, `echarpe` →
écharpe `rayee`, `couverture` → cape `ecossaise`, `etoile`/`etoile2` → cape `etoiles`
(rare) ; au plus 2 habits gardés sur l'œuf, le reste au sac ; le sac migré peut dépasser
3 (on ne jette rien), il ne se remplit simplement plus tant qu'il est plein. Nid v2 vide
avec dinos déjà possédés : nid 1 fermé d'office (Max n'a pas à recommencer de zéro).

## 3. Écran de fin (`site/js/mj-golden.js`, `showEnd`)

- Cadeau : une carte avec **l'image** de l'objet (caillou, œuf teinté famille, lit,
  habit), et une phrase courte dite à voix haute (« Des cailloux pour ton nid ! »,
  « Un œuf ! », « Un bonnet ! »). Double : les 2 cartes l'une après l'autre + fête.
- Pas de cadeau : **on n'en parle pas** (aucun « pas de cadeau »), l'écran reste celui
  de la partie. Retirer le message « déjà toutes les étoiles ici » (EP-132).
- Le bouton « Au nid » reste ; il pulse s'il y a un cadeau à poser ou un œuf prêt.

## 4. Images (`site/img/nid/`, WebP fond transparent, rognées, ≤ 40 Ko chacune)

| Fichier | Contenu | Rare |
|---|---|---|
| `sol.webp` | décor large : terre, mousse, fougères sur les bords, ciel doux (fond, pas transparent, ≤ 120 Ko) | |
| `caillou-1.webp` … `caillou-3.webp` | caillou gris rond, 3 formes | |
| `peint-etoile`, `peint-coeur`, `peint-raye`, `peint-pois`, `peint-arcenciel` | cailloux peints | oui |
| `lit-brindilles`, `lit-fougere`, `lit-mousse`, `lit-plumes` | lit vu de 3/4, forme ovale qui remplit l'intérieur d'un nid | |
| `lit-plume-doree` | lit de plumes dorées | oui |
| `bonnet-rouge`, `bonnet-bleu` | bonnet tricot à pompon, vue de face | |
| `bonnet-loup`, `bonnet-bus` | bonnet à oreilles de LOUP (pointues, grises), bonnet façade de bus | oui |
| `echarpe-rayee`, `echarpe-pois` | écharpe enroulée en anneau, pans qui pendent, vue de face | |
| `echarpe-bresil`, `echarpe-france` | écharpes drapeau | oui |
| `cape-ecossaise`, `cape-nuage` | petite cape boutonnée, vue de face | |
| `cape-etoiles`, `cape-empreintes` | cape étoiles, cape empreintes de dino | oui |

Production : ChatGPT via `.claude/skills/dino-images-lunii/scripts/gpt-gen.mjs`
(style des concepts `docs/handoffs/nid-v5/`), planches fond transparent, découpe +
détourage selon `HO-MJ-12` (trim alpha, `rembg` ou érosion choisi en regardant).

## 5. Écran du nid (nouveau module, `site/js/nid-v5.js` + `site/css/nid-v5.css`)

- Remplace la « chambre des œufs » de `nid-ui.js` (`openChambre` délègue au nouveau
  module ; `?open=nid`, `MurScene.markGainSeen`, `hatchTheatre` conservés).
- Fichiers < 400 lignes chacun (règle du poste) : découper si besoin.
- Mise en page : en-tête (retour 48 px), scène `sol.webp`, **rangée de 3 nids** sur la
  largeur, sac en bas (3 cases de 64 px). Aucune hauteur fixe sur du texte, aucun
  ascenseur. Doit tenir à **360×740**, **320×568**, **740×360** (paysage) et tablette.
- Œuf = CSS actuel teinté famille ; nid = 6 cailloux en `position:absolute` en % sur un
  ovale ; lit en dessous de l'œuf ; habits ancrés en % de la boîte de l'œuf.
- Glisser (pointer events) + toucher-pour-placer ; zone de dépôt = le nid entier ≥ 80 px.
- Sons existants (`sounds/fx/pop-apparition.mp3`) ; padding 250 ms déjà en place.
- `prefers-reduced-motion` respecté.

## 6. Portes avant livraison

```
cd studio/minijeux/tests
npx playwright test collection.spec.mjs mj-golden-nid.spec.mjs nid-v5.spec.mjs
node audit-gabarit.mjs mj-01 && npm run mj:test mj-01
npm run check
```

`collection.spec.mjs` réécrit pour v3 : premier cadeau = 6 cailloux ; jamais 3 parties
sans rien sur 200 parties simulées ; jamais 2 doubles de suite ; sac plein → aucun lit
ni habit ; 3e habit du même type refusé ; migration v2 → v3 sans perte ; échec de
save → `granted:false`. `nid-v5.spec.mjs` (nouveau) : scène vide → cailloux → œuf → lit →
2 habits → éclosion, captures 360/320/paysage. Recette visuelle (skill `recette-visuelle`).

## 7. Rapport

`docs/handoffs/rapports/HO-MJ-25-rapport.md` : fichiers touchés, sortie des portes,
captures, écarts au brief.
