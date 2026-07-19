# Spec — Menu « Le Mur des Copains » (v0, 2026-07-19)

> Direction **validée par Papa Yann le 2026-07-19** : fusion M1 (Le Mur) + M3 (Les copains)
> de l'audit [`../../pmo/audits/2026-07-19-menu-parcours.md`](../../pmo/audits/2026-07-19-menu-parcours.md) §9.
> Ce document propose la concrétisation : hôtes, listes de jeux, ordres d'accès, fondements
> pédagogiques. **Noms et contenus à valider par Papa Yann avant implémentation.**
> Sources jeux : triage [`../../pmo/audits/2026-07-19-triage-poc-design.md`](../../pmo/audits/2026-07-19-triage-poc-design.md)
> + challenge des 42 jeux (audit menu §10) + catalogue `site/js/catalog.js`.

---

## 1. Principes (ce que le Mur copie de l'encyclopédie)

1. **Choix par image** : vignettes-photos reconnaissables, aucun titre à lire.
2. **Peu de choix** : 5 copains + une petite rangée « du moment ». Jamais 42 entrées.
3. **Zéro méta-monde** : pas de véhicule, pas de carte, pas de « jeu dans le jeu ».
4. **Chaque domaine a un visage** : un copain qui parle et donne envie (« j'ai besoin de toi pour… »).
5. **Le catalogue complet déménage** dans l'espace parents (tiroirs actuels conservés là-bas — plus rien n'est perdu, Max ne voit que le Mur).

## 2. Le Mur — écran d'accueil

```
┌─────────────────────────────────────────────┐
│  [avatar Max]  ★ 12                          │
│                                             │
│   🦕 TRITRI    🐊 SPINO     🐔 GALLI        │
│   « les dinos » « compter »  « lire »       │
│                                             │
│   🦊 VÉLO            🎺 PARA                │
│   « casse-têtes »    « couleurs & monde »   │
│                                             │
│  ── Du moment ──                            │
│   [vignette jeu]  [vignette jeu]  [vignette]│
│                                             │
│  📖 Encyclopédie de Tritri (en bas)         │
└─────────────────────────────────────────────┘
```

- **5 copains** en grosses vignettes (photo/render du dino, pas un emoji). Pas de texte lisible requis : le copain SE PRÉSENTE en audio au tap (et au premier passage).
- **Rangée « Du moment »** (3 vignettes, rotation curée) : 1 jeu délaissé (répétition espacée déguisée) · 1 favori/dernier joué · 1 nouveau débloqué. Les jeux maîtrisés sortent de la rotation. Remplace le « jeu du jour » : pas de rituel artificiel, juste des vignettes qui changent.
- **Encyclopédie épinglée en bas** (c'est son refuge actuel — on ne le lui prend pas, on s'en inspire).
- Tap sur un copain → **son repaire** : il parle (réplique d'accueil), puis la liste de SES jeux en vignettes avec ★ et cadenas (séquence 2★ conservée — simple, validée, non punitive).
- Relique du copain au-dessus des étoiles : **idée consignée, plus tard** (décision PY).

## 3. Les 5 copains

| Copain | Dino | Domaine | Pourquoi ce nom / cette personnalité |
|--------|------|---------|--------------------------------------|
| **Tritri** | Tricératops | 🦕 Les dinos | Déjà dans le produit (code TRITRI de l'encyclo) — c'est le dino-racine de MaxPlay. Doux, rassurant, le « grand frère » musée. |
| **Spino** | Spinosaure | 🔢 Compter | Choix de Papa Yann (« spino les numéros »). Le plus grand prédateur… qui a peur de se tromper en comptant ses poissons → « j'ai besoin de TOI ». |
| **Galli** | Gallimimus | 📖 Lire & écrire | Jeu de mots : **Galli lit**. Gallimimus = rapide et curieux → dévore les histoires. (Alternative si trop subtil : « Lili ».) |
| **Vélo** | Vélociraptor | 🧩 Casse-têtes | Raptor = le plus malin. Vélo = véloce + clin d'œil vélo. Énigmes, pièges, « trop dur pour moi ». |
| **Para** | Parasaurolophus | 🎨🌍 Couleurs & monde | Sa crête = une trompette → le musicien/artiste de la bande : couleurs, sons du monde, drapeaux, langues. |

Répliques d'accueil (drafts — voix du pôle narration à brancher **en temps voulu**, décision PY) :

- **Tritri** : « Bienvenue au musée ! J'ai tellement de dinos à te montrer… »
- **Spino** : « Salut ! Tu peux m'aider à compter mes poissons ? Je me trompe TOUT LE TEMPS. »
- **Galli** : « Bienvenue dans mon coin lecture ! Aujourd'hui, on découvre quoi ? »
- **Vélo** : « Psst ! J'ai des énigmes trop dures pour moi. T'es partant ? »
- **Para** : « Bienvenue dans mon atelier ! On peint, on écoute, on voyage ! »

## 4. Les jeux par copain (ordre d'accès = ordre de la liste, déblocage 2★)

### 🦕 Tritri — les dinos

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun |
|---|-----|--------|--------|-------------------|-----|
| 1 | Trouve le dino (absorbe « Pareil pas pareil » mj-25) | mj-24 | ★ | Discrimination visuelle + vocabulaire dino (TTS) | Ses dinos préférés |
| 2 | La lampe du paléontologue | mj-28 | ★ | Attention, exploration partielle→globale | Fouiller le noir à la lampe |
| 3 | Memory des ombres | mj-33 | ★★ | Mémoire visuelle, silhouettes | Ombres mystérieuses |
| 4 | Range-les par taille | mj-30 | ★★ | Sériation, grandeur réelle (mètres) | « Plus grand que papa ?! » |
| 5 | Le grand voyage du temps | mj-31 | ★★★ | Chronologie Trias→Crétacé | La météorite ! |
| 6 | Lis le nom du dino | mj-27 adapté (cursive) | ★★★ | **Pont lecture↔dinos** : lire des mots connus par cœur | Lire « son » dino tout seul |
| — | Atelier coloriage (libre, sans ★) | mj-32 | libre | Motricité, expression | Sa galerie perso |
| — | **Encyclopédie** (code TRITRI) | dev-dinos | libre | Référence, autonomie | Son refuge actuel |

Sorties : mj-29 (fabrique de noms, morphologie adulte) 🗑️ · mj-40 (tangram 7 pièces, frustrant) 🗑️ · mj-41 tuiles → à arbitrer avec les commentaires Supabase.

### 🔢 Spino — compter

Progression alignée CRA (concret→image→abstrait) et base 10 (décision PY : barquette = 10) :

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun |
|---|-----|--------|--------|-------------------|-----|
| 1 | L'éclosion | POC compte-01 | ★ | Compter 1→5, un-à-un (rond de pointage intégré, ex-POC-02) | Les œufs éclosent ! |
| 2 | Les constellations | POC 06 (+18) | ★ | **Subitizing** : reconnaître 2-6 par la forme (dé/domino) | Formes-miracles |
| 3 | Remplis les caisses | mj-43 | ★ | Subitizing→compte (dés, dominos) | Ranger vite |
| 4 | Les barquettes de 10 | POC 07 | ★★ | Dizaine : 10+4, 10+7… (barrettes Montessori) | Remplir la barquette |
| 5 | Le bus des passagers | POC 08 (+03, absorbe mj-04/05/45) | ★★ | +/−, places libres, fenêtres-groupes de 5 | Monter/descendre du 162 |
| 6 | Le toboggan ordinal | POC 11 (variante) | ★★ | Ordinaux : « le 2e Tritri », « le 3e bleu » | File au toboggan |
| 7 | Le bocal | POC 12 | ★★★ | Estimation 10/50/100 + paquets de 10 qui descendent en barquettes | Masses impressionnantes |
| 8 | Par paquets | POC 19 | ★★★ | Groupements (blocs + unités), objets variés | Construire par blocs |
| 9 | Le partage | POC 20 reformulé | ★★★ | Partage à égalité (pré-division, sans fractions) | Donner des fraises aux copains |
| + | Les paniers (×) | POC 10 | ++ | Groupes égaux, décomposition 5+5 | Plus tard |
| + | Pair/impair | POC 13 | ++ | Parité | Plus tard |
| + | Le 100 (animation, pas un jeu) | POC 17 | — | Expliquer la centaine au moment du bocal | Absorbé par #7 |

Sorties : POC 05, 14 🗑️ · POC 15 → éventuel outil vérif parent (récitation vs maîtrise) 🕐 · POC 16 monnaie 🕐 · POC 02 mécanique rond absorbée · POC 04 habillage sous-marin gardé comme skin.

### 📖 Galli — lire & écrire

Progression sourcée (cf. triage §3) : **sons avant noms de lettres · cursive d'abord · ÉCRIRE AVANT LIRE** (Montessori / CNESCO 2016).

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun |
|---|-----|--------|--------|-------------------|-----|
| 1 | Trouve la lettre | POC lecture-03 | ★ | Reconnaissance lettres — consigne = **le SON** (/m/), nom de la lettre au palier 2 | « Trouve le mmm ! » |
| 2 | Le grand tri des lettres | POC 07 refait (base tri bus) | ★ | Discrimination des formes, **cursive + script** (même lettre, 2 allures) | Ranger le chaos |
| 3 | La boîte à sons | mj-44 adaptée (+ POC 01) | ★ | Conscience phonémique : ranger par son initial | Oreille fine |
| 4 | L'alphabet mobile | POC 12 | ★★ | **Composer des mots avant de lire** (écriture sans charge motrice) | Écrire « papa » tout seul |
| 5 | Syllabo | POC 11 refondu UX | ★★ | Décodage syllabique CV (ma/mi/mu…) — répétition espacée | Rythme des syllabes |
| 6 | Les sons à 2 lettres | **À INVENTER** (POC 10) | ★★ | on/ou/ch/eu — fusion visuelle 2 lettres → 1 son | Le « on » de tonton |
| 7 | Lis le mot | moteur POC 13 + mj-23 (+ mj-06) | ★★★ | Mot→image et son→mot, 2 modes | Mots de son univers |
| 8 | Le Chef de Gare | POC 17 (fix Œ + mise en page) | ★★★ | **Lire pour agir** (consigne fonctionnelle) | « Pose 3 œufs rouges ! » |
| 9 | Le bus des phrases | POC 16 | +++ | Compréhension de phrase, accords (bus ROUGE = image rouge) | Phrases rigolotes |
| ◌ | **Le geste magique** (rituel, hors ★) | POC 05 | quotidien | Traçage cursive — flèches + halo, **récurrent** (« pub » entre jeux ?) | La lettre qui s'allume |

Sorties : POC 02, 06, 08, 09, 18, 19 🗑️ · POC 14 blending TTS 🕐 (blocage technique) · POC 15 drapeaux-mots 🕐.

### 🧩 Vélo — casse-têtes

| # | Jeu | Source | Niveau | Pourquoi | Fun |
|---|-----|--------|--------|----------|-----|
| 1 | L'intrus | mj-15 | ★ | Catégorisation | Trouver le bizarre |
| 2 | Complète la suite | mj-16 | ★ | Patterns, séquences | Deviner la suite |
| 3 | Le premier bus | mj-13a (absorbe mj-13c) | ★ | Ordinaux en contexte bus | La course |
| 4 | Trouve le bus | mj-19 | ★★ | Poursuite visuelle, attention | Il bouge ! |
| 5 | Le grand rangement | mj-08 (absorbe mj-09 + mj-36) | ★★ | Tri multicritère | Ranger le bazar |
| 6 | Le garage | mj-17 | ★★ | Séquençage d'actions | Réparer comme un pro |
| 7 | Le dépôt bloqué | mj-34 | ★★★ | Planification (Rush Hour) | Libérer SON bus |
| 8 | Croque-échecs | mj-37 | ★★★ | Déplacements contraints | Croquer les goûters |
| 9 | Blocs magiques | mj-39 | ★★★ | Spatial, lignes (Tetris-like) | Faire disparaître |

Sorties : mj-38 Saute-mouton 🗑️ · mj-42 Shisima 🗑️ (abstraits, froids).

### 🎨🌍 Para — couleurs & monde

| # | Jeu | Source | Niveau | Pourquoi | Fun |
|---|-----|--------|--------|----------|-----|
| 1 | Peins les bus | mj-21 | ★ | Mélanges de couleurs primaires | Peindre SON bus |
| 2 | Tubes de couleurs | mj-18 | ★★ | Tri, verser, logique couleur | La potion magique |
| 3 | Quel pays ? | mj-11 (drapeaux → **fix SVG**, pas emojis) | ★★ | Culture/drapeaux (sa passion) | Le Brésil ! |
| 4 | Trouve le pays | mj-22 adapté (resserré Europe→favoris) | ★★★ | Géographie | Placer le Brésil |
| 5 | Compte en langues | mj-20 adapté (FR/PT/EN d'abord) | ★★★ | Origines brésiliennes, comptine | Compter en portugais |
| — | Nouveaux sons (libre) | mj-12 | libre | Écoute, culture sonore | Sons secrets |
| — | Max Adventure (libre) | Phaser | libre | Conduite, motricité | Conduire le bus |
| — | Pose-tes-tiles (libre) | tiles | libre | Construction libre | Sa ville |

## 5. Bilan chiffré

- **~30 jeux** après tri (42 prod − 5 jetés − fusions) **+ ~12 depuis les POC** retenus → cible **~40 jeux, mais jamais plus de ~9 visibles** par copain, et 3 vignettes « du moment » sur le Mur.
- 5 🗑️ prod · 5 fusions prod · 5 adaptations prod · 7 🗑️ POC compte+lecture · 5 POC re-fondus · 1 jeu à inventer (sons 2 lettres).

## 6. Points à valider par Papa Yann

1. **Noms des copains** (Tritri / Spino / Galli / Vélo / Para) — jeux de mots assumés ou noms plus « énergie » ?
2. **Ordre des copains** sur le Mur (proposition : Tritri en premier — c'est son refuge).
3. Rangée « Du moment » : 3 vignettes, OK ?
4. Rituel traçage : jeu à part chez Galli, ou micro-session « entre les jeux » (ta comparaison pub) ?
5. Arbitres finaux des jeux 🗑️/🔀 = **commentaires Supabase** (triage phase 0) — lecture à débloquer côté outil.
6. Voix des copains : pôle narration, en temps voulu (pas bloquant : bulles texte + TTS au départ).

_Spec v0 rédigée 2026-07-19 — ne PAS implémenter avant validation des points §6._
