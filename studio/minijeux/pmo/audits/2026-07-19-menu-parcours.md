# Audit & challenge — Menu MaxPlay et parcours enfant (2026-07-19)

> Rapport demandé par Papa Yann : scanner tout le site, challenger l'affichage du menu
> enfant (catégories, tiroirs, jeu du jour, quête, étoiles, parcours) — carte blanche,
> plusieurs propositions, garder/fusionner/améliorer/supprimer. **Rapport seul, aucun code.**
>
> Cadre : le menu v2 est **figé depuis 2026-07-16** ([`../jeux/figees/menu.md`](../jeux/figees/menu.md)).
> Chaque proposition indique si elle respecte le figé ou si elle exige un **défigeage**
> (décision datée de Papa Yann, seul habilité).

---

## 1. État des lieux — ce qui existe vraiment sur le site

### 1.1 Le menu actuel (`site/index.html` + `js/catalog.js`, v2 figée)

- **Profil** en haut : avatar dino (tap → atelier avatar), pseudo « Max », barre de niveau (1 niveau / 10 ⭐), compteur ⭐ global.
- **Rangée ❤️ « Tes jeux »** persistante : carte 🎯 **jeu du jour** (tirage parmi les jeux délaissés, 1×/jour) + jusqu'à **5 jeux épinglés** (pin via le panneau règle ❓ d'un jeu — geste plutôt parent). Auto-remplie par les derniers joués si vide.
- **5 tiroirs accordéon** (1 seul ouvert, ordre figé) : 🦕 dinos (12 entrées) · 🎨 couleurs (3) · 🔢 Compter & lire (9) · 🧩 Casse-têtes (11) · 🌍 monde & libre (7). **42 jeux live** au total.
- **Encyclopédie Dinos** épinglée en bas (code parent TRITRI).
- **Progression** : étoiles ★ par jeu (3 paliers), déblocage **en séquence dans chaque tiroir** (2★ au jeu précédent), jeux « libres » sans condition.
- **Zone parents** : footer → gate (appui 3 s + 7×4) → `suivi.html` / `compte.html`. Jingle RATP/SNCF au premier tap.
- Extras déjà présents : atelier avatar, commentaires de revue par jeu (remontée Supabase), PWA.

### 1.2 Les pages satellites et orphelines (62 pages HTML sur le site)

| Groupe | Pages | Statut réel |
|--------|-------|-------------|
| **Variantes de menu déjà prototypées** | `index2.html` (« La ligne de Max » — menu-parcours : choisis ton arrêt, monde défilant, panneau par arrêt) · `index3.html` (« La fusée de Max ») | Accessibles mais hors menu — **des concepts de parcours déjà codés !** |
| **Jeux retirés du catalogue** | `mj-01`, `mj-13b`, `mj-14`, `mj-gold-a`, `mj-gold-b` | Fichiers toujours déployés, invisibles du menu |
| **Outils dev/design** | `dev-fx`, `dev-sounds-ui`, `design-mockups`, `map-mockups`, `atelier-couleurs`, `lecture.html` (lecture annotée) | Pages de travail exposées en production |
| **Zone auteur/parents** | `auteur.html`, `compte.html`, `suivi.html`, `confidentialite.html` | Légitimes, à garder côté parents |
| **Chantiers de conception (nouveaux, 2026-07-19)** | `design-compte/` (10 mockups série 4) · `design-lecture/` (**19 mockups lecture**, cursive Cursif) · `design-shared/` | Futurs jeux 🔢 — pas encore dans le catalogue |

### 1.3 Le contexte stratégique (décidé, ne pas réinventer)

- **Vision EP-002** : progression = **collection de bus + carte de Villejuif qui se dévoile** — jamais implémentée dans le menu.
- **WexWorld (Phase 2)** : monde explorable Pokémon-like, quêtes PNJ, collection véhicules/dinos/drapeaux — le « vrai » parcours long terme.
- **Benchmark kids** (`docs/research/benchmark-kids-games.md`) : mascotte persistante (Khan Kids), boucle courte, premier tap récompensé — la mascotte manque encore au menu.
- **Règles figées pertinentes** : pas de section « Récents/Suggérés » · max 5 tiroirs · ordre fixe · **jamais de récompense promise** (motivation intrinsèque) · surprise permise · terminologie « Casse-têtes ».

---

## 2. Diagnostic — ce qui est fort, ce qui coince

### Forces (à ne pas casser)

1. La rangée ❤️ + jeu du jour : c'est déjà le bon instinct (re-motiver vers les délaissés).
2. L'accordéon 1-seul-ouvert évite le mur de 42 icônes — bonne décision.
3. La progression étoiles + séquence 2★ est simple, visible, non punitive.
4. Le profil avatar (atelier) donne une première identité — base d'une mascotte.
5. La base technique est saine : `catalog.js` = source unique, tout se re-skinne sans toucher aux jeux.

### Faiblesses challengées

1. **La catégorisation est adulte (par matière scolaire), pas enfant (par envie).** Max ne pense pas « Compter & lire » — il pense « le bus », « les dinos », « le loup ». Les tiroirs qui marchent le mieux (🦕) sont ceux qui parlent son langage ; 🔢 et 🧩 sont des concepts d'adulte.
2. **Le tiroir 🔢 « Compter & lire » va saturer.** 9 jeux aujourd'hui, et **19 concepts lecture + 10 comptage arrivent** des chantiers design. Fusionner compter et lire était acceptable à 9 jeux ; à 20+, la liste devient un annuaire. (Tension avec le figé « max 5 tiroirs » → voir options §3.)
3. **Le jeu du jour est un non-événement.** Petite carte discrète, pas de rituel, pas d'audio au quotidien (prévu au figeage mais à vérifier). Pour un enfant, « le jeu du jour » devrait être un *moment* : le dino-mascotte qui l'annonce.
4. **Pas de sentiment de voyage.** Les étoiles s'accumulent mais ne *mènent* nulle part. La vision carte de Villejuif (EP-002) n'a jamais atterri ; WexWorld est loin. Entre les deux, le menu reste une liste.
5. **Le pin est un geste de parent** (caché dans le panneau règle ❓). Max ne peut pas se construire SA rangée de favoris. (C'est peut-être voulu — à discuter.)
6. **Le site expose ses chantiers** : pages dev, variantes de menu, jeux retirés accessibles en direct. Pas dangereux, mais ça fragilise le produit (liens partageables, PWA qui embarque tout).
7. **Petites incohérences de dénomination** : `index2` parle d'« arrêts », le menu de « tiroirs », le figeage de « rangée ⭐ » alors qu'elle est devenue ❤️ — le vocabulaire produit mérite un alignement.

---

## 3. Options — 4 propositions (cumulables par phases)

### Option A — « Polish du menu figé » (court terme, 0 défigeage)

Garder la v2 telle quelle, corriger les frictions :

- **Ritualiser le jeu du jour** : au premier tap du jour, l'avatar-mascotte pop et l'annonce en audio (« Hé ! Aujourd'hui c'est… »). Zone figée « zone ouverte » (timing, wording) → pas de défigeage.
- **Mascotte parlante** : l'avatar du profil commente (2-3 phrases TTS contextuelles : retour après absence, tiroir jamais ouvert, ⭐ franchies). Rejoint le benchmark Khan Kids.
- **Sous-groupes visuels internes** dans les tiroirs longs (🦕 12, 🧩 11) : intertitres muets style « Avec les ombres », « Avec les bus » — purement cosmétique, ne touche ni ordre ni IDs. (Prépare la saturation 🔢.)
- **Pin enfant** : double geste — long-press sur une carte = ❤️ (à valider, ça change une zone figée mineure).

*Effort : faible. Impact : moyen. Risque : nul.*

### Option B — « La ligne de Max » : le menu devient un parcours bus (moyen terme)

**Ressusciter `index2.html`** (déjà prototypé !) et en faire le menu principal :

- Le monde défile comme une ligne de bus ; **5 arrêts = les 5 tiroirs actuels** (même ordre, mêmes jeux, mêmes règles de déblocage — le figeage de *contenu* est respecté, seul le *contenant* change → défigeage léger à acter).
- Le bus de Max avance d'arrêt en arrêt **avec ses étoiles** ; l'arrêt du jeu du jour clignote ; chaque arrêt a sa tête de ligne (🦕 Musée, 🎨 Atelier peinture, 🔢 École, 🧩 Dépôt casse-tête, 🌍 Aéroport/monde).
- Tap sur un arrêt → le panneau de la catégorie (l'accordéon actuel recyclé en panneau d'arrêt).
- C'est le **chaînon manquant** entre le menu-liste et WexWorld : même métaphore (ville, arrêts, collection), réutilisable ensuite.

*Effort : moyen (le prototype existe, il faut le brancher sur catalog.js/stars/unlock/pins). Impact : fort (le menu devient du jeu). Risque : à tester avec Max — si la métaphore le perd, retour v2 en 1 clic (garder les deux entrées).*

### Option C — « La mission du jour » (surcouche légère, compatible A et B)

Évolution du jeu du jour, en respectant l'interdit « récompense promise » :

- **3 jeux par jour** (1 délaissé + 1 favori + 1 libre) présentés comme « le plan du jour » par la mascotte — une *invitation*, jamais une obligation.
- Fin des 3 → **surprise** (non annoncée, permise par le figé) : animation spéciale, le bus klaxonne, sticker dans le garage… Pas de streak, pas de compteur de jours (< 7 ans, anti-gamification toxique).
- C'est aussi notre **répétition espacée** déguisée (le tirage favorise les notions pas revues).

*Effort : faible-moyen. Impact : fort sur la régularité. Risque : dériver vers la récompense promise → wording à surveiller (« on joue ? » ≠ « gagne ça »).*

### Option D — « La carte qui s'allume » (long terme = la vision EP-002)

Ne **pas** la coder dans le menu HTML : c'est exactement WexWorld (collection + carte de Villejuif + quêtes PNJ). La dupliquer en HTML créerait un 3e système à maintenir. **La garder comme horizon**, et faire converger B vers elle (mêmes arrêts, même carte).

*Effort : lourd. Impact : transformationnel. Risque : le faire trop tôt (cf. VISION-LONG-TERME : « ne pas forcer le pont »).*

### Recommandation

**A maintenant → B dès que les mockups lecture/compte sont triés → C greffé sur B → D = WexWorld, inchangé.**
B est le pari central : il recycle un prototype existant, respecte le figeage de fond, et prépare le monde sans le prétendre déjà.

---

## 4. Garder / fusionner / améliorer / supprimer

### ✅ Garder tel quel
- Rangée ❤️ « Tes jeux » + auto-remplissage derniers joués.
- Accordéon 1-seul-ouvert + mémoire d'état.
- Étoiles 3 paliers + séquence 2★ (simple, lisible, non punitif).
- Gate parents (3 s + question) + zone parents (`suivi`, `compte`, `confidentialite`).
- Encyclopédie épinglée en bas + code TRITRI.
- Jingle au premier tap (identité sonore).
- Atelier avatar (future mascotte).

### 🔧 Améliorer (menu actuel, phase A)
- Jeu du jour → rituel audio mascotte (voir §3.A).
- Sous-groupes visuels dans 🦕 et 🧩 (listes > 8 jeux).
- Pseudo « Max » : règle L-109 (jamais nommer Max dans le contenu livré) — vérifier que le pseudo est un réglage local, pas un dur.
- Clarifier le vocabulaire : « rangée ❤️ » partout (le figé dit « ⭐ », le code dit ❤️).

### 🔀 Fusionner
- **`index2.html` + menu v2** → option B (le parcours absorbe les tiroirs).
- **`index3.html` (fusée)** → concept absorbé par B (la fusée = doublon de métaphore voyage, moins ancrée que le bus) ; garder le code en archive.
- **`lecture.html` (lecture annotée)** → à intégrer comme outil du futur pôle lecture (design-lecture), pas comme page isolée.
- **Mockups design-compte/design-lecture** → alimenteront 🔢 ; prévoir leur passage par le pipeline mockup → `mj-shell.js` (L-103).

### 🗑️ Supprimer / archiver (ménage production)
- `mj-01`, `mj-13b`, `mj-14`, `mj-gold-a`, `mj-gold-b` — retirés du catalogue mais déployés → déplacer en `_archive/` (avec note INDEX).
- `dev-fx`, `dev-sounds-ui`, `design-mockups`, `map-mockups` → déplacer sous `site/tools/` (déjà le hub des outils) ou `_archive/`.
- `atelier-couleurs.html` → vérifier doublon avec mj-21/atelier avatar ; sinon outils.
- Bénéfice : PWA plus légère, moins de surfaces orphelines partageables, moins de confusion d'audit.

### ⚠️ Points de tension à trancher (défigeage requis)

1. **🔢 « Compter & lire » à 20+ jeux** : 3 choix — (a) sous-groupes internes (pas de défigeage), (b) re-scinder en 2 tiroirs = 6 tiroirs (défigeage « max 5 »), (c) la lecture devient un **univers à part entière** (comme les dinos : encyclo + jeux), ce que le design-lecture suggère déjà. Mon avis : (a) tout de suite, (c) si les 19 concepts passent le cap des tests.
2. **Pin par l'enfant** (long-press ❤️) : touche une zone figée — autoriser ou pas ?
3. **Option B** : défigeage du *contenant* menu (le fond reste figé).
4. **Mission du jour (C)** : valider le wording pour rester côté « invitation » (jamais promesse).

---

## 5. Phasage proposé

| Phase | Contenu | Effort | Prérequis |
|-------|---------|--------|-----------|
| **0 — Ménage** | Archiver orphelines (jeux retirés, pages dev) + aligner vocabulaire | ½ journée | aucun |
| **1 — Polish** | Rituel jeu du jour + mascotte TTS + sous-groupes + (pin enfant si validé) | 1-2 jours | aucun |
| **2 — Parcours** | « La ligne de Max » (index2 branché sur catalog/stars/unlock/pins), A/B avec Max | 3-5 jours | défigeage contenant |
| **3 — Mission** | Plan du jour ×3 + surprise non promise | 1-2 jours | phase 2 (ou 1) |
| **4 — Monde** | WexWorld (vision inchangée) | Phase 2 produit | maturité Phaser |

---

_Rapport rédigé 2026-07-19. Sources : `site/index.html`, `site/js/catalog.js`, `site/js/pins.js`,
`studio/minijeux/docs/jeux/figees/menu.md`, `memory/VISION.md` (EP-002),
`studio/minijeux/memory/VISION-LONG-TERME.md`, `docs/research/benchmark-kids-games.md`,
chantiers `site/design-lecture/` & `site/design-compte/`._
