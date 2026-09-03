# Triage des POC design — retours Papa Yann compilés (2026-07-19)

> Compilation des retours de Papa Yann sur les 20 mockups `site/design-compte/` (série 4)
> et les 19 mockups `site/design-lecture/`, faits en session chat 2026-07-19 (soir).
> Chaque entrée : **retour brut résumé** → **interprétation** → **verdict**.
> Verdicts : ✅ garder · 🔧 adapter · 🔀 fusionner · 🗑️ jeter · 🕐 plus tard · 🐛 bug à corriger.
> Alimente la spec menu : [`../../docs/specs/2026-07-19-menu-mur-copains.md`](../../docs/specs/2026-07-19-menu-mur-copains.md).

---

## 1. Design-Compte (mockup-01 → 20)

| # | Retour Papa Yann | Interprétation | Verdict |
|---|------------------|----------------|---------|
| 01 Éclosion d'œufs | Super idée, fun de voir les avatars sortir, mais aucune difficulté. Peut être un **niveau 1** du comptage, ou variante « combien d'œufs cachés dans ce dessin ? » | Le fun (animation éclosion) est un atout à réutiliser partout ; comme jeu, c'est la porte d'entrée du comptage 1→5 | ✅ **niveau 1 comptage** + animation « pas chère » réutilisable |
| 02 Compter avec le rond | Très intéressant pour qui ne sait PAS DU TOUT compter, mais le jeu n'a aucun intérêt au-delà | Pas un jeu — une **mécanique** (le pointage 1-à-1 avec rond de validation) à intégrer dans les autres jeux de comptage | 🔀 mécanique « rond de pointage » absorbée par les jeux comptage |
| 03 Fenêtres du bus | Mettre 4-5 persos par fenêtre max (pas un bazar). Le jeu seul n'a pas d'intérêt, MAIS les regroupements de 4-5 = bonne idée de variante | La **fenêtre-groupe de 5** devient une brique visuelle (pré-dizaine) — à fusionner avec le mockup-08 (monte/descend) | 🔀 → mockup-08 / jeu bus unifié |
| 04 Bulles sous l'eau | Juste pour l'idée des bulles, et le design sous-marin stylé. Le jeu en lui-même… non | Garder l'**habillage** (bulles + ambiance sous l'eau) comme skin possible ; pas de jeu | 🔀 habillage gardé, mécanique jetée |
| 05 | Nul, aucun intérêt + **les images ne s'affichent pas** | Rien à sauver | 🗑️ + 🐛 images cassées (informatif) |
| 06 Constellations (dés/dominos) | **Coup de cœur.** Le nombre avec une forme géométrique (on « voit » le 5 ou le 4), + rappeler le calcul après. Plein d'idées dedans | Subitizing par constellations dé/domino = cœur pédagogique validé (correspond au skill game-design : CRA, doigts/dés avant chiffres) | ✅ **cœur du comptage** — absorbe mockup-18 |
| 07 Barquettes | Super bien. Montrer que la barquette fait 10 (pas 12 — même si œufs = douzaine, **10 c'est ce qu'on veut** : « 10 + 4 », comme les barrettes Montessori). Les additions se feront avec les dominos | Décision pédagogique : **base 10 partout** (barquette = 10, 5×2). Aligné perles Montessori / dizaines | ✅ avec règle « barquette = 10 » |
| 08 Bus monte/descend | Idée sympa. Combiner avec les fenêtres (mockup-03) : qui monte, qui descend, combien de places libres… Plein de variantes (5+5 places aussi) | Devient LE **jeu bus unifié** du comptage : fenêtres-groupes + montée/descente + places libres | ✅ fusion 03+08 → absorbe mj-04/05/45 |
| 09 Œufs animés (histoire) | Le dessin de l'œuf est moche/aplat 🐛, MAIS jeu méga fun : dynamique, y'a une histoire, animé — ça fait son effet | La narration courte + animation = moteur d'engagement validé. Refaire l'asset œuf | ✅ + 🐛 asset œuf à refaire |
| 10 Paniers (×) | Bonne idée pour la multiplication, MAIS : expliquer que c'est **le même nombre par panier**, commencer à 2 (4×5 = trop loin), ou décomposition 5+5=10… Peut-être le format barquette | Multiplication = **niveau ++**, introduite par décomposition additive et groupes égaux, format barquette | 🕐 niveau ++ (multiplication), à affiner |
| 11 Toboggan | Aucun défi tel quel (1er, 2e, 3e…). SAUF variante : « le 2e Tritri », « le 3e bleu » → ça serait bien | Devient le **jeu ordinal** : position + attribut (couleur/perso) | 🔧 garder en version ordinale |
| 12 Bocal (masses) | Étonnamment bien pour voir les masses. Variantes : pas jusqu'à 30 mais **10 / 50 / 100** ; faire briller les paquets de 10 dans le bocal, qui « descendent » en barquettes (5×2) | Estimation de grandeur + pont visuel masse → dizaines. Boucle : estime → vérifie en paquets de 10 | ✅ avec paliers 10/50/100 |
| 13 Pair/impair | Intérêt moyen. Pair/impair = une idée de jeu… mais pas là | La notion est bonne, le wrapper non | 🕐 pair/impair à recaser plus tard |
| 14 | Aucun intérêt | — | 🗑️ |
| 15 | Très léger, à sortir. (Utile seulement pour vérifier que l'enfant **maîtrise et ne récite pas**) | Pas un jeu menu ; potentiel **outil de vérif parent** (récitation vs maîtrise) | 🗑️ du menu · 🕐 idée outil parent |
| 16 Porte-monnaie | Intérêt léger, c'est pas le délire | Hors cœur (monnaie = plus tard, école) | 🕐 plus tard |
| 17 Le 100 | Bien pour **expliquer** que ça fait 100 — mais ABSOLUMENT PAS UN JEU | C'est un **panneau pédagogique**/animation de transition (ex. quand le bocal atteint 100), pas une entrée de menu | 🔀 animation explicative absorbée par bocal/barquettes |
| 18 | C'est le même jeu que les constellations | Doublon de mockup-06 | 🔀 → mockup-06 |
| 19 Par paquets | Très bonne idée : faire rentrer **par paquets** d'abord (le 1er bloc), puis un par un ou par bloc. Et pas que des œufs | Comptage par groupements (pré-multiplication) : drag de blocs + unités. Varier les objets | ✅ mécanique blocs+unités, objets variés |
| 20 Partage | Très intéressant MAIS aucun défi tel quel. Reformuler : « j'ai 8 fraises, combien j'en donne à chacun pour partager à égalité ? », 3 copains / 3 bonbons… | **Partage équitable** (pré-division), pas de fractions | 🔧 reformuler en défi de partage à égalité |

**Bilan compte** : ✅ 6 jeux (01, 06+18, 07, 08+03, 09, 12, 19) · 🔧 2 (11 ordinal, 20 partage) · 🕐 3 (10 multi, 13 pair/impair, 16 monnaie) · 🔀 3 (02 mécanique, 04 habillage, 17 animation) · 🗑️ 2 (05, 14, +15 du menu).

## 2. Design-Lecture (mockup-01 → 19)

| # | Retour Papa Yann | Interprétation | Verdict |
|---|------------------|----------------|---------|
| 01 | Bof, on a déjà « range les sons », moyen fan. ⚠️ police | Doublon de mj-44 (boîte à sons) | 🔀 → mj-44 adaptée |
| 02 Bus qui transporte | Nul — l'idée du bus transporteur est innovante (originalité appréciée) mais impact douteux | L'habillage bus ne sauve pas une mécanique vide | 🗑️ |
| 03 Trouve la lettre | **J'aime beaucoup** — pas sûr de sa maîtrise des lettres. Peut être LE niveau 1 qui ouvre la lecture. Question : dire « trouve le M » ou le son /m/ ? | **Niveau 0/1 lecture** = reconnaissance de lettres. Tranché par la recherche (§3) : **le SON d'abord** (Montessori/Borel-Maisonny), le nom de la lettre en palier 2 | ✅ **porte d'entrée lecture** |
| 04 Sons complexes (associations) | Un début de quelque chose pour sons complexes, mais ça ne marche pas très bien. Adapter UX/UI ou juste le design ? | Bon fond (graphèmes complexes), exécution à reprendre | 🔧 refonte UX |
| 05 Traçage cursive (screen envoyé) | J'aime bien MAIS **absolument pas précis** 🐛. Ajouter flèches d'ordre des traits, halo qui parcourt le tracé si l'enfant ne bouge pas. Usage : pas 3 exercices one-shot — **à refaire encore et encore** (rituel récurrent, « comme une pub » entre les jeux ?) | Traçage = **rituel d'écriture** quotidien intégré au parcours, pas un jeu à étoiles. Guidage : flèches + halo animateur + tolérance large mais pas nulle | ✅ comme **rituel** (hors étoiles) + 🐛 précision/guidage |
| 06 | Pas compris l'intérêt | — | 🗑️ |
| 07 Chaos de lettres | On a souvent parlé d'un « Où est Charlie »… mais là c'est moche. Préfère le modèle **Trie les bus** : un chaos de lettres à ranger dans des boîtes — **ajouter les cursives EN PLUS des normales** | Devient « le grand tri des lettres » : chaos → boîtes, bi-alphabet **cursive + script** (les deux formes de la même lettre = même boîte ou boîtes liées) | 🔧 refaire sur base tri (mj-08/09) |
| 08 | Aucun intérêt | — | 🗑️ |
| 09 | Idem | — | 🗑️ |
| 10 Sons à 2 lettres (on, ou, ch…) | Il FAUT un jeu sur les sons à 2 lettres, mais ce n'est pas ce design — **à trouver/inventer** | Besoin validé, mécanique à concevoir (idée : fusion visuelle de 2 lettres → 1 son, cf. §3 décomposition syllabique) | ➕ **À INVENTER** (prioritaire) |
| 11 Syllabes | Intéressant **pédagogiquement**, pas du tout en UX/UI. Faut de la pratique et de la répétition | Cœur de la lecture (décodage syllabique, ce que fait l'école de Max) — refonte UX complète, pensé pour la répétition espacée | 🔧 refonte UX, moteur répétition |
| 12 Écriture libre de mots | Intérêt mitigé, bien de le laisser écrire librement. Question : lecture AVANT ou APRÈS écriture ? → **réponse recherche §3** | **L'écriture vient AVANT la lecture** (Montessori, validé CNESCO 2016) → ce jeu arrive TÔT dans le parcours, en alphabet mobile tactile (composer sans savoir tracer) | ✅ replacé tôt (alphabet mobile) |
| 13 Objets + mots | Logique bonne, graphismes sympas (objets + écriture). Deux modes : on écrit→il lit, ou on dit→il cherche le mot. **On a déjà des jeux similaires dans les mj actuels → fusionner** | = mj-23 (Lis le mot) + mj-06 (Lis la phrase) : un seul **moteur lecture de mots** à 2 modes (mot→image / image+son→mot) | 🔀 moteur unique avec mj-23/06 |
| 14 Monstre sonore (TTS) | Peut être très rigolo, mais TTS lambda = 2 sons superposés incompréhensibles 🐛. L'idée : animation « effrayante » + mot dit = fun. Variante instruments (cordes/trompette/piano) | Blending sonore animé — le TTS ne fait pas du vrai blending syllabique ; à résoudre (audio pré-enregistré ElevenLabs ?) ou pivoter sur les timbres d'instruments | 🕐 à creuser (blocage technique TTS) |
| 15 Drapeaux mots | Soit écrit soit dit. **Drapeau Brésil ne s'affiche pas** 🐛. Jeux similaires existent dans les mj → on écarte pour le moment | Doublon fonctionnel avec le moteur mots (13) ; pays/drapeaux = plus tard | 🕐 plus tard + 🐛 drapeaux (emojis Windows) |
| 16 Phrases (bus rouge) | C'est APRÈS la lecture ET l'écriture des mots → **niveau ++/+++**. Si le bus est rouge, montre un bus ROUGE (pas d'animation dans les fenêtres) | Compréhension de phrase + accord adjectif/couleur — niveau expert, assets fidèles à la consigne | ✅ niveau +++ |
| 17 Chef de Gare (screen envoyé) | Sympa : **ne pas savoir quoi faire sauf si on lit** la consigne — j'aime beaucoup. Mise en page pas ouf. ⚠️ **« œuf » est cassé** (ligature Œ absente de la police Cursif → « ſufs ») | **Lecture fonctionnelle** (lire pour agir) = excellent principe, mini-jeu simple autour. Fixer la ligature Œ (fallback typo) | ✅ principe validé + 🐛 Œ Cursif + 🔧 mise en page |
| 18 Mimétisme 2 polices | Trop simple, peu d'intérêt — c'est du mimétisme, pas de la lecture. (Peut-être 2 polices différentes ?) | Doublon faible du tri lettres (07) | 🗑️ |
| 19 | Projet pas fini, pas ouf | — | 🗑️ (ou à reprendre de zéro) |

**Bilan lecture** : ✅ 5 (03 entrée, 05 rituel, 12 alphabet mobile, 16 +++, 17 consigne) · 🔧 3 (04, 07 tri lettres, 11 syllabes) · 🔀 2 (01→mj-44, 13→moteur mots) · ➕ 1 à inventer (10 sons 2 lettres) · 🕐 2 (14 blending, 15 drapeaux) · 🗑️ 5 (02, 06, 08, 09, 18, 19).

## 3. Recherche pédagogique — l'écriture AVANT ou APRÈS la lecture ? (question mockup lecture-12)

Réponse claire, sourcée :

- **Montessori : l'écriture D'ABORD.** Dans l'ordre naturel, « l'enfant commence d'abord par écrire avant de lire » — validé un siècle plus tard par la [conférence de consensus CNESCO 2016 *Lire, comprendre, apprendre*](https://bdr.parisnanterre.fr/theses/internet/2024/2024PA100123/2024PA100123.pdf) (cité dans la thèse Huard, HAL). Séquence : [lettres rugueuses cursives](https://www.nucleopolis.fr/apprendre-a-lire-avec-la-methode-montessori-comment-faire-progresser-votre-enfant-grace-aux-lettres-rugueuses/) (tracer + dire le son, multisensoriel vue/toucher/son) → **alphabet mobile** (composer des mots = « écrire » sans la charge motrice du crayon) → la lecture arrive ensuite, presque comme une surprise (« je lis ce que j'ai écrit »).
- **Le SON avant le NOM de la lettre** : Montessori enseigne d'abord le son (/m/) avant le nom (« ème ») — [Acadomia, méthodes de lecture](https://www.acadomia.fr/blog/disciplines/quelles-sont-les-differentes-methodes-de-lecture/). → tranche la question du mockup-03 : dire le son au palier 1, le nom de la lettre en palier 2.
- **Cursive d'abord** : le matériel Montessori français est en **cursives** (lettres rugueuses minuscules cursives) → valide notre choix Cursif et la demande « cursives en plus des normales » (mockup-07).
- **Borel-Maisonny** (complément français) : gestes associés aux sons, cohérent avec le traçage rituel (mockup-05) — [méthode syllabique & sensorielle](https://apprendreenfant.fr/news-7629-la-methode-syllabique-pourquoi-elle-facilite-lapprentissage-de-la-lecture).

Conséquences sur le parcours lecture (ordre d'accès, reprise dans la spec menu) :

1. Lettres : reconnaissance (03, son d'abord) + tri cursive/script (07) — en parallèle du **traçage rituel** (05).
2. **Écrire avant lire** : alphabet mobile / composition (12) arrive tôt.
3. Décodage : syllabes simples CV (11 refondu) → **sons à 2 lettres** (10, à inventer).
4. Mots : moteur unique (13 + mj-23/06).
5. Lire pour agir : consignes (17) puis phrases (16, +++).

## 4. Bugs & dettes remontés par les tests

| Bug | Où | Action |
|-----|-----|--------|
| 🐛 Ligature **Œ** absente → « ſufs » | lecture-17 (police Cursif) | Fallback Œ (autre font ou « Oe » forcé) à corriger dans `design-shared` |
| 🐛 Emojis drapeaux = lettres (FR/BR/ES) sous Windows | lecture-15 (+ compte-15 déjà connu) | Images SVG de drapeaux au lieu d'emojis |
| 🐛 Images ne s'affichent pas | compte-05 | Mockup jeté — pas de fix (sauf si asset réutilisé) |
| 🐛 Œuf aplati/moche | compte-09 | Refaire l'asset œuf (utilisé aussi en 01/06/19) |
| 🐛 Dinos en grille au lieu d'une file | compte-11 (déjà connu) | Fix CSS file |
| 🐛 Traçage imprécis + pas de guidage | lecture-05 | Tolérance + flèches ordre des traits + halo animateur |
| 🐛 TTS blending = 2 sons superposés | lecture-14 | Blocage technique — audio pré-enregistré ou pivot instruments |
| 🐛 **Commentaires jamais synchronisés** (32 MJ chargent `comments.js` sans `cloud.js` → push perdu en silence) | prod, transverse | Brancher `cloud.js` partout (ou stub) — bug documenté dans `.claude/rules/mini-jeux.md`, découvert via l'extraction 2026-07-20 partie B |
| 🐛 **Suivi d'avancement cassé** (3 niveaux/étoile puis reset à zéro) | mj-34 | Refonte UX mj-34 (retour PY partie B) |

## 5. En suspens

- **Commentaires Supabase des 42 jeux prod** : faits par Papa Yann 2026-07-19 — **non lus côté Kimi** (RLS : clé anon → `[]`). À récupérer via MCP Supabase (Claude Code) ou accès dédié → alimente le triage phase 0.
- **Police cursive prod** : ABCursive vs DN Manuscript vs Cursif (+ licence web) — Cursif en place dans les démos.
- **Noms des copains-hôtes** : proposition dans la spec menu, à valider.

## 6. Arbitrages jeux prod — commentaires Supabase (extraction 2026-07-20)

Source : [`../../docs/specs/2026-07-20-commentaires-supabase-mj.md`](../../docs/specs/2026-07-20-commentaires-supabase-mj.md)
(15 commentaires, `source='comment'`). Réconciliés avec le challenge de l'audit menu §10 —
**les verdicts de Papa Yann priment**. Intégrés dans la spec menu v0.2 §4.

| Jeu | Verdict PY | Diff vs audit | Intégration |
|-----|-----------|---------------|-------------|
| mj-09 Trie les bus | ✅ garder + **prioritaire lecture** | ≠ audit (fusion→08) | Devient le **moteur de tri générique multi-asset** ; variante lettres **cursives/scripts/majuscules** (différencier b/d/h/j/k) = le « grand tri des lettres » de Galli #2 |
| mj-18 Tubes de couleurs | ✅ garder (adoré, jusqu'à 8-9 tubes) | = audit | → **Vélo** (réflexion/dextérité, recatégorisé par PY), polir design |
| mj-21 Peins les bus | ✅ garder + étendre | — | → Para ; variantes palettes 1/2/3 couleurs, coloriage dino atelier/avatar |
| mj-24 Trouve le dino | ✅ garder + polir | — | Son d'erreur rigolo (prout), dino détouré récompense 1er coup, animation finale + applaudissements, + de cases |
| mj-25 Pareil pas pareil | 🗑️ « CA DEGAGE » | ≈ audit (fusion) | Supprimé ; idée « Où est Charly dino » consignée |
| mj-26 Compte les dinos | 🗑️ | = audit | Supprimé ; son idée **dé/domino à ombres dino** → constellations de Spino #2 |
| mj-27 Lis le nom du dino | 🔀 fusionner | = audit | → Galli #7 (moteur mots) : découpage syllabes, **audio retiré** (1ʳᵉ syllabe max), vraies photos, 🐛 images cassées |
| mj-28 Lampe paléontologue | ✅ garder | — | + bruit/objets, lampe plus petite/forte ; **soulève la question de fonte globale** (→ spec §6.1) |
| mj-29 Fabrique de noms | 🗑️ | = audit | Supprimé (doublon, pas fluide) |
| mj-30 Range par taille | ✅ **bonus avancé** | ≠ audit (séquence) | Hors séquence, réservé niveau fan |
| mj-31 Voyage du temps | ✅ garder (3★ de Max !) | — | Variante continents demandée ; 🐛 **SVG continents à refaire** |
| mj-32 Atelier coloriage | ✅ garder | — | 🐛 galerie **JSON zones/couleurs non compressé** ; quotas 3 gratuit / 5-10 compte ; jeu générique sans ★ |
| mj-33 Memory des ombres | 🗑️ | ≠ audit (garder) | Supprimé ; **memory = moteur générique multi-thèmes** (dinos, véhicules, animaux…) à regrouper |
| mj-40 Tangram | 🧪 à tester | ≠ audit (🗑️) | Repêché : « il fonctionne enfin » → tester avec Max ; corde logique/géométrie chez Vélo |
| mj-41 Tuiles dinos | 🕐 au chaud | — | 🐛 images cassées, difficulté nulle → **pas affiché en V1** |

**Points notables :**
- La purge est plus douce que l'audit sur 3 jeux (mj-30 bonus, mj-40 repêché, mj-18 confirmé) et plus dure sur 2 (mj-33 supprimé, mj-25 confirmé).
- **mj-09 est la surprise** : jugé « prioritaire » — sa mécanique de tri devient une brique transverse (lettres → Galli, couleurs → Para/Vélo).
- Question transverse ouverte : **politique de fonte** (majuscule/script vs cursive, bascule in game ?) — cf. spec §6.1.
- ⚠️ ~~Extraction partielle~~ → levée 2026-07-20 : le 2ᵉ gisement n'était pas en
  `source='review'` mais dans le **localStorage** (bug `cloud.js` : 32 MJ chargeaient
  `comments.js` sans `cloud.js` — push silencieusement perdu). Voir §7.
- ⚠️ Couverture complète atteinte le 2026-07-20 : **41 jeux commentés** (15 + 26), voir §7.

## 7. Arbitrages jeux prod — PARTIE B, localStorage (26 commentaires, extraction 2026-07-20)

Source : même fichier d'extraction, partie B (commentaires dictés, verbatim bruité).
Réconciliés avec la spec v0.2 — **les verdicts de Papa Yann priment**. Intégrés spec v0.3.

| Jeu | Verdict PY | Diff vs spec v0.2 | Intégration |
|-----|-----------|-------------------|-------------|
| mj-04 Compte les passagers | 🗑️ « très très moche » | = audit | Supprimé — les POC comptage le remplacent (idée absorbée par le bus POC-08) |
| mj-13c Combien avant | ✅ garder + **redesigner** | ≠ audit (fusion→13a) | Regrouper avec mj-13a : panneau d'affichage, 2 modes explicites (ou niveaux distincts) |
| mj-05 La bonne place | 🗑️ garder l'idée | = audit (absorbé) | Idée « X personnes / X places / combien montent » → bus POC-08 |
| mj-35 Le jeu des graines | 🔁 **repêché** — refonte totale | ≠ audit (🗑️) | Règle très mal expliquée : game design + animation + pots à revoir entièrement |
| mj-43 Remplis les caisses | ✅ fond gardé, retravailler | — | « Remplir pour atteindre N » ≈ rendre la monnaie ; **lignes de 10** (aligné barquettes) |
| mj-45 Le bus qui se remplit | 🗑️ | = audit (absorbé) | Doublon de mj-43 |
| mj-06 Lis la phrase | ✅ garder + enrichir | — | + cursives, mixer avec mj-27, **phrases à impact** (rire/impressionner) |
| mj-23 Lis le mot | 🔧 refondre | = audit | Cursive + majuscule, syllabes simples ; viser **1 jeu initiatique + 1 dynamique** |
| mj-44 La boîte à sons | 🔀 fusionner | = audit | Revient au tri en boîtes → **moteur tri mj-09** (boîte = lettre/son) |
| mj-13a Le premier bus | ✅ garder + corriger | — | Difficulté 0 à revoir ; regrouper mj-13c ; expliciter les 2 modes |
| mj-15 L'intrus | ✅ garder | — | Intrus discret validé (1 herbivore parmi carnivores) ; 💄 monter les assets |
| mj-16 Complète la suite | 🗑️ | ≠ spec v0.2 (gardé) | Ligne mal affichée, pas logique, pas trouvable |
| mj-34 Le dépôt bloqué | 🔧 refondre UX | — | Un seul bus doit sortir (éteindre les autres / cailloux) ; 🐛 **suivi d'avancement cassé** (3 niveaux/étoile puis reset à zéro) |
| mj-37 Croque-échecs | 🔧 **revoir totalement** | ≠ audit (garder tel quel) | « Jeu du monde » : **vraies pièces d'échecs + plateau entier + règle expliquée** (le fou = diagonale…), pas de bonhomme qui mange des pommes, pas de déguisement enfantin |
| mj-38 Saute-mouton | 🔁 **repêché** — revoir totalement | ≠ audit (🗑️) | Idem : **vraies dames + plateau entier + règle + indices** |
| mj-39 Blocs magiques | 🔧 repenser | — | Choisir : tangram à remplir (niv 1) OU vrai Tetris qui descend |
| mj-19 Trouve le bus | ✅ très bien + fusionner | — | Moteur **« trouve le X » en un grand écran** : bus/dinos/lettres/éléments mouvants |
| mj-36 Le bon bus | 🗑️ (en attendant) | ≠ spec v0.2 (Para #2) | Pas de choix ni d'erreur possible ; idée gardée |
| mj-08 Le grand rangement | 🔀 fusionner | = audit | Moteur rangement en boîtes (lettres/bus/objets) |
| mj-17 Le garage | ✅ garder | — | **Un des préférés de Max** ; adaptation dino possible ; options en dur toujours au même endroit |
| mj-11 Quel pays | 🕐 écarter + noter l'idée | ≠ spec v0.2 (Para #3) | Idée **fiches pays** : plusieurs drapeaux, situer, animal du pays — pas en V1 |
| mj-22 Trouve le pays | 🧪 à tester | — | « N'a jamais marché donc jamais joué » ; victoire = drapeau + musique |
| mj-20 Compte en 8 langues | ✅ très bon jeu + corriger | = audit | **1-2 pays ouverts à la fois**, ne pas exiger de compter jusqu'à 10 direct ; autres langues plus tard |
| mj-42 Shisima | 🔧 revoir | ≠ audit (🗑️) | Milieu = victoire immédiate ; idée **traverser/contourner** (style backgammon) → mécanique stratégique à trouver |
| mj-12 Nouveaux sons | 🕐 jeu libre | — | Coin écoute avec dessin/vidéos, juste pour écouter |
| mj-pose-tiles + max-adventure | 🚪 **hors menu principal** | ≠ spec v0.2 (Para libre) | Écran parental / mot de passe |

**Ce que la partie B change (vs spec v0.2) :**
- 2 repêchages : mj-35 (graines, refonte totale) et mj-38 (dames sérieuses) — plus mj-42 passé de 🗑️ à « mécanique à trouver ».
- 2 suppressions nouvelles : mj-16 (était gardé) et mj-36 (était chez Para).
- 3 moteurs génériques confirmés par PY : **tri en boîtes** (mj-09+08+44), **« trouve le X »** (mj-19 multi-thèmes), **« remplir pour atteindre N »** (mj-43, lignes de 10).
- Jeux de société « sérieux » : échecs + dames avec vraies pièces et règles — placement à trancher (PY dit « jeu du monde » ; pédagogiquement stratégie = Vélo).
- mj-pose-tiles + Max Adventure sortent du menu principal → derrière le gate parents.

**Hors catalogue** : **mj-14 « La grille des bus » (Matrices de Raven) repêché par PY 2026-07-20** — retiré du catalogue mais toujours déployé ; Max adore (variante bus OK, il y arrive sans pb) → **variante dino demandée**. Placé chez Vélo #3 « Les cases mystères » (spec v0.4).

---

_Compilé 2026-07-19 (soir), §6 ajoutée 2026-07-20, §7 ajoutée 2026-07-20 — sources : retours chat Papa Yann + 3 screens + extraction Supabase (partie A) & localStorage (partie B)._
