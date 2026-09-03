# Délégation LLM — Mini-jeux du menu cible « Le Mur des Copains »

> **Date** : 2026-07-20 · **Auteur** : Kimi (agent principal MaxPlay) · **Pour** : LLM externe chargé de la construction.
> **Décideur produit** : Papa Yann (PY). Ses retours sont des ORDRES de conception, pas des suggestions.
> Ce document est la SEULE source de travail à exécuter. Il pointe vers les specs de fond au lieu de les copier.

---

## 0. À LIRE AVANT TOUT CODE (dans l'ordre)

1. `studio/minijeux/docs/STANDARD-MJ.md` — le gabarit obligatoire (mj-shell, golden 3 niveaux, panneau ?, tracking, jamais de timer/pénalité).
2. `studio/minijeux/docs/MECANIQUES.md` — les moteurs réutilisables (`site/js/mj-compte.js`, `site/js/mj-dice.js`, moteur tri-bacs…). **On habille un moteur, on ne réinvente pas.**
3. `studio/minijeux/docs/specs/2026-07-19-menu-mur-copains.md` — la spec produit v0.6 (paliers, absorptions, décisions PY).
4. `studio/minijeux/docs/specs/BUILD-MUR-COPAINS.md` — process de build + état d'avancement à maintenir.
5. Un jeu de référence par moteur : `site/mj-46.html` (comptage QCM) · `site/mj-47.html` (dés/regroupement) · `site/mj-09.html` (tri-bacs).

## 0bis. Règles non négociables

- **Golden** : 3 niveaux via `Golden.setup(id)` → niveau = `min(2, Stars.get(id))`. Étoile = partie 100 %. Pas de 4ᵉ régime sans décision PY.
- **Cibles tactiles ≥ 80 px** · français partout · **zéro emoji dans le visuel principal** (emoji uniquement en header/titre) · âge 3,5-4 ans : 1 mécanique par jeu.
- **Tracking** : tout passe par `mj-shell.js`/`tracker.js` — la remontée Supabase est AUTOMATIQUE si un profil enfant est actif (cloud.js). Ne rien coder de plus.
- **Câblage d'un nouveau jeu** = 3 endroits :
  1. `site/js/mur.js` → mapping `COPAINS[].jeux` (ordre = séquence de déblocage 2★, le 1er est ouvert) + `TITRES` + `VIGNETTES`.
  2. `site/js/catalog.js` → une entrée (copier le format des voisines, `access:'free'` pour les jeux des repaires, la séquence est gérée par mur.js).
  3. Vignette CSS dans `site/css/mur.css`. ⚠️ **Règle d'or vignettes : jamais de padding/gap en % dans une `.vig`** (le % se résout contre le parent, pas la vignette) — px uniquement ; items internes en % OK.
- **Validation** : screenshot Chrome headless à chaque jeu (`--virtual-time-budget=3000`, slashes forward, sortie `temp/`), + `node studio/minijeux/tests/audit-gabarit.mjs mj-XX` si dispo. Vérifier le screenshot à l'œil avant de dire « fini ».
- **Git** : commit par jeu ou petit lot, message `feat(<copain>): …`. Ne jamais committer les fichiers des autres sessions (vérifier `git status` avant).
- **PMO** : en fin de session, graver une entrée dans `studio/minijeux/memory/MEMORY.md` § Journal (livré + écarts + leçons).
- Attribution des IDs neufs : prochain libre = **mj-50** (46-49 déjà attribués, cf. ci-dessous).

---

## 1. État des lieux (ne pas refaire)

- **Le Mur** (`site/index.html` + `site/js/mur.js` + `site/css/mur.css`) : EN PROD. Tritri hôte (Découverte + Préférés), 5 copains, repaires à séquence 2★, jeux verrouillés cachés + phrase d'ouverture, espace parents derrière gate. **Ne pas y toucher sauf câblage de jeux.**
- **Déjà câblés et validés par PY** : repaires T-Rex (mj-24, 28, 31, 30 + libre 32) · Vélo (mj-15, 13a, 14, 19, 17, 18, 34) · Galli (mj-09, 23, 06 — en attendant leurs remplaçants) · Para (mj-21, 20, 22, 33 + libre 12).
- **Supprimés/cachés, ne pas ressusciter** : mj-04, 05, 16, 25, 26, 29, 36, 41, 45, 11, 37, 38, 39 (sauf refontes P4/P5 en vague 3, IDs neufs).

---

## 2. TÂCHES — RETOUCHES des 2 jeux livrés (retours PY du 2026-07-20, prioritaires)

### F1 · mj-46 « Les œufs surprises » (Spino S1) — `site/mj-46.html`

1. **QCM visible DÈS LE DÉBUT de chaque question.** Le tap sur les œufs devient une AIDE optionnelle : qui sait compter de tête répond direct ; qui veut compter tapote. Supprimer le `failsafe` et le déclenchement du QCM au dernier œuf (les choix sont affichés par `renderEggs`/`nextQuestion`).
2. **Tap = pastille numérotée + l'œuf se FISSURE légèrement** (craquelure CSS/SVG discrète, pas de disparition). Rebond doux si re-tap (comportement actuel conservé).
3. **Paliers relevés** : N0 2→5 · **N1 5→15** · **N2 7→22** (PY : « plus que 2-3, direct 5-7 mini jusqu'à 20-22 »).
4. **Disposition « en vrac »** : œufs dispersés avec rotations légères au lieu d'une grille alignée — surtout aux grands nombres. **Contrainte dure : aucun œuf ne peut être caché à plus de 50 %** (le haut de l'œuf — « la tête » — toujours visible). Méthode sûre : grille de cellules ≥ 1,15× la taille d'œuf + jitter ±25 % + rotation ±12°, jamais de superposition totale.
5. Éclosion : déjà les bons assets (avatars `img/dinos/sprites/*_tete.png`) — **ne pas changer**.
6. Mettre à jour le panneau règle : « Je réponds direct si je sais ! Sinon je tapote les œufs pour compter : 1, 2, 3… ».

### F2 · mj-47 « Les constellations » (Spino S2) — `site/mj-47.html`

**Le visuel actuel est à jeter.** Référence de forme : `site/design-compte/mockup-6-constellations.html` (le POC validé par PY).

1. **Format DOMINO permanent** : un seul cadre à 2 cases accolées (séparateur vertical), chaque case = 1 à 6 **ombres dino** en configuration canonique de dé (`MJDice.pipLayout`) reliées par les petits traits lumineux. Question unique : « Combien en tout ? ».
2. **Plus jamais de décomposition arbitraire** (le « 3 en ligne → 2 et 1 » actuel est rejeté) : la décomposition parlée/affichée = LES DEUX MOITIÉS VISIBLES du domino (« 3 et 4, ça fait 7 ! »). Après réponse juste : chaque moitié s'illumine à tour de rôle pendant la phrase.
3. **Paliers relevés** (PY : « 1-2 à 2 étoiles c'est trop simple, il a déjà gagné le 1er jeu ») : N0 moitiés 1-3 (total 2→6) · N1 moitiés 1-6 avec total ≥ 4 · **N2 moitiés 3-6 (total 6→12)**.
4. Conserver : ciel étoilé CSS, filtre lumière sur les ombres, QCM 3 boutons, golden, harnais `__mjTest` (adapter à la nouvelle structure), paramètres de test `?v=`/`?level=`.
5. Mettre à jour le panneau règle (le jeu = reconnaître deux petits groupes et les additionner d'un coup d'œil).

---

## 3. TÂCHES — Vague V1 (socle, par MOTEUR)

### V1-A · mj-48 « Tout le monde monte ! » (Spino S3) — CRÉATION, moteur `mj-compte` (peau bus)
- Spec détaillée : spec §3 S3. Bus 162, **2 fenêtres de 5 places** (jamais le bazar), passagers qui montent/descendent aux arrêts, **file d'attente** devant le bus.
- Paliers : 0★ combien de passagers (≤5, une fenêtre) · 1★ qui monte (+1/+2, jusqu'à 10) · 2★ monte ET descend (10±n), places libres · 3★ compléments à 10 + **ordre dans la file** (« fais monter le 2ᵉ Tritri », « le 3ᵉ bleu »).
- Assets bus : voir `site/js/bus-svg.js` (réutilisé par la vignette `vig-bus` et mj-13a). Avatars passagers : `img/dinos/sprites/*_tete.png`.
- Câblage : repaire Spino en #3 (après mj-47, avant mj-43).

### V1-B · mj-49 « Les barquettes de 10 » (Spino S4) — CRÉATION, moteur `mj-dice` (peau barquettes)
- Spec détaillée : spec §3 S4. Barquette 5×2 ; Max range les objets ; « 10 et 4, ça fait 14 » dit + affiché.
- Paliers : 0★ complète la barquette · 1★ 10+n (11→19) · 2★ 2 barquettes (jusqu'à 20+n) · 3★ « remplis pour atteindre N » **+ célébration bocal** (les paquets de 10 brillent et descendent — geste récupéré de l'ex-S5).
- Câblage : repaire Spino en #4 **à la place de mj-43** (retirer mj-43 du repaire — absorbé — mais laisser son entrée catalog).

### V1-C · mj-20 « Compte avec le monde » (Para P2) — CORRECTION du jeu existant
- Spec : spec §7 P2. PY : **1-2 pays ouverts à la fois, pas compter jusqu'à 10 direct.** N0 FR jusqu'à 5 · N1 FR 10 + 1 pays · N2 2-3 pays · 3★ langues au choix. Modifier les paliers du fichier existant, pas de réécriture.

### V1-D · mj-50 « Trouve la lettre » (Galli G1) — CRÉATION, QCM-tap
- Spec : spec §4 G1. Consigne audio = **le son** (/m/, jamais « ème ») ; 4-6 grosses lettres **cursives** (fonte Cursif, `site/design-shared/fonts/`).
- Paliers : 0★ sons simples cursives · 1★ + autres allures (script, majuscules) · 2★ confusables (b/d/p/q) · 3★ le son entendu dans un mot (« quel son au début de "maman" ? »).
- Câblage : repaire Galli en #1.

### V1-E · mj-51 « Le tri des lettres » (Galli G2) — CRÉATION, moteur tri-bacs (référence mj-09)
- Spec : spec §4 G2. Chaos de lettres de toutes allures (cursives, scriptes, majuscules) → boîtes-lettres.
- Paliers : 0★ 2 lettres très différentes (a/o) cursives · 1★ cursive + script · 2★ + majuscules, lettres proches (b/d/h/k) · 3★ chaos dense + boîtes-sons (tri par son initial).
- Câblage : repaire Galli en #2 **à la place de mj-09** (absorbé — entrée catalog conservée).

---

## 4. TÂCHES — Vague 2 (après validation PY de la V1)

| Jeu | Copain | Nature | Point de spec |
|-----|--------|--------|---------------|
| mj-52 « La boîte à mots » (G3) | Galli | Création (composition, alphabet mobile cursive, guide syllabique) | spec §4 G3 |
| « Lis et fais » (G5) | Galli | Refonte de mj-23/06 → fusion, consignes cursives | spec §4 G5 |
| Captcha traçage cursive | transverse | ⚠️ **Prérequis : test de précision tactile par PY avant tout dev** | spec §4 ◌ |
| V1 L'intrus (mj-15) | Vélo | Assets à monter + paliers catégorie fine | spec §5 |
| V2 Raven (mj-14) | Vélo | Vraie entrée catalog + variante dino, suite AB/AAB reconstruite propre | spec §5 |
| V4 Le dépôt bloqué (mj-34) | Vélo | 🐛 avancement cassé à réparer · 1 seul bus sort | spec §5 |
| T3 Le vétérinaire (mj-17 adapté dino) | T-Rex | Adaptation peau dino du séquençage garage | spec §6 |
| T4 frise (mj-31) | T-Rex | 🐛 SVG continents + variante continents | spec §6 |
| P3 Où est le pays ? (mj-22) | Para | Test réel d'abord (« jamais marché ») · victoire = drapeau + musique | spec §7 |

## 5. Vague 3 (paris — ne pas commencer sans GO explicite de PY)

P4 échecs (mj-37 refonte totale, vraies pièces) · P5 dames (mj-38 refonte) · G4 sons collés (**déclencheur objectif : 2★ de Max sur G3**) · tangram/tetris · partage (« À chacun sa part ») · traversée (mj-42) · fiches pays.

---

## 6. Ce qui est DÉJÀ bien et ne demande AUCUN travail

mj-24 (cache-cache) · mj-28 (lampe magique) · mj-19 (trouve-le) · mj-18 (potions) · mj-21 (peinture) · mj-33 (memory) · mj-32 (coloriage, libre) · mj-12 (coin écoute, libre) · mj-30 (bonus fan). Dettes techniques connues listées spec §9 (cloud.js sur 32 MJ, images mj-27/41, galerie mj-32) — à ne traiter que sur demande.

## 7. Remontée de décisions

Toute question produit (paliers, fun, « est-ce que ça marche pour un enfant de 4 ans ») → la poser à PY en fin de livraison, en texte dans la réponse (JAMAIS de formulaire dynamique). Après correction de PY → graver la leçon dans `studio/minijeux/memory/LESSONS.md`.
