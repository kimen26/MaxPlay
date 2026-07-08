# 🔊 Plan maître AUDIO + architecture multilingue (i18n) — MaxPlay

> **Statut : PROPOSITION DE DÉCISION** (2026-07-08). Produite par audit fan-out 8 agents (5 inventaires + 2 synthèses + 1 critique adverse) sur 125 items relevés.
> Rien ici n'est figé tant que Papa Yann n'a pas tranché les points marqués 🚨.
> Source de vérité assets aujourd'hui : [`site/sounds/_BANQUE-SONS.md`](../../site/sounds/_BANQUE-SONS.md). Ce fichier-ci = **vue transverse + plan i18n**, pas un registre d'état (le registre généré viendra en P0-7).

---

## 0. TL;DR — les 3 choses à retenir

1. **Le socle générique est déjà bon.** 64 SFX + 66 voix de réaction + pools victoire/erreur sont mutualisés et branchés partout via `victory-sounds.js`. Le vrai chantier FR restant = **les consignes de départ** (les MJ non-dino parlent 100 % en TTS navigateur) + brancher des assets dino déjà produits mais dormants.
2. **Le multilingue est à moitié gratuit.** Les **64 SFX ne se régénèrent jamais** (aucun mot). Seule la **parole** se refait par langue (~650 MP3/langue en cible complète). Le point dur = **les noms de dinos, dont la prononciation dépend de la langue** (« Tyrannosaurus » ≠ prononcé pareil en FR/EN/PT) → régénération obligatoire avec voix native + lexique par langue.
3. **Prérequis bloquant : aucun mécanisme de langue n'existe** (`lang.js` absent, `tts.js:39` hardcode `fr-FR`). **P0 = rendre le FR "lang-ready"** (FR par défaut, plomberie langue posée) SANS rien changer pour Max. À faire même si aucune 2e langue n'est décidée — ça nettoie la dette.

---

## 1. Taxonomie factorisée (le principe directeur)

> **Règle d'or : un asset qui contient de la PAROLE est par-langue ; un asset sans mot est partagé. On maximise le générique ; on ne crée du spécifique que si le contenu est irréductible (un nom de dino, une règle de jeu unique).**

### GÉNÉRIQUE MUTUALISÉ — produit UNE fois, réutilisé partout

| Brique | Type | API | Existe ? | i18n |
|--------|------|-----|----------|------|
| Fanfare victoire / fin douce | SFX | `playEndSound(score,max)` | ✅ | Neutre |
| Erreur | SFX | `playErrorSound()` | ✅ | Neutre |
| Bips succès/erreur | synthé | `sndDing` / `sndBuzz` | ✅ | Neutre |
| Voix réussite (16 slugs ×3 voix = 48) | VOIX | `SoundPool.voice('positif')` | ✅ produit | à régé/langue |
| Voix encouragement (6 ×3 = 18) | VOIX | `SoundPool.voice('doux')` | ✅ produit | à régé/langue |
| Apparition / collecte / déblocage / étoile | SFX | `SoundPool.play(pool)` | ✅ pools prêts | Neutre |
| Phrases d'instruction communes | VOIX | `SoundPool.phrase(slug, fallback)` | 🟡 4/10 branchées | à régé/langue |
| Nom de dino parlé | VOIX | `playDinoNom(id, fallback)` | ✅ 60/60 | **phonétique/langue** |
| Fallback universel | TTS navigateur | `TTS.speak(text,{lang})` | ✅ | code à paramétrer |

### SPÉCIFIQUE — irréductible, produit par cible

Consignes propres à un MJ (~43) · segments fiche dino `-taille/-regime/-funfact/-recap` (~51×4) · noms dino `-nom` (60, **phonétique/langue**) · racines `dico-*` (~65) · récits d'époque (8) · menus/lieux (17+12) · voicelines pièces mj-37 (6).

---

## 2. Méga-liste par domaine

### 2a. Mini-jeux — 43 jeux de production

> Légende : ✅ fait (MP3 branché) · 🟡 partiel (TTS/écran, pas de MP3) · ⬜ todo · ❌ manquant/bug · — na · **?** à vérifier.
> **Correction critique C1/C2** : mj-17 et mj-18 avaient été oubliés par la 1re synthèse (couverture réelle = 41/43) ; le **hub `index.html`** (jingle menu au tap) était absent. Réintégrés ci-dessous. Périmètre = 43 MJ de production, **hors pages dev** (`dev-*`, `duel`, `lecture`, `compte` = 0 audio, exclues).

| MJ | Instruction | Réussite | Victoire | Erreur | Transition | Note |
|----|-------------|----------|----------|--------|-----------|------|
| **hub index.html** | — | — | 🟡 jingle RATP/SNCF au tap carte (`JINGLES` L330, SFX neutre) | — | ⬜ | catégorie « feedback navigation menu » — i18n-neutre |
| mj-01 Quiz Bus | 🟡 TTS | 🟡 `sndDing` | 🟡 `playEndSound`+TTS | ✅ | ⬜ | 💬 outil parent partout |
| mj-04 (hors menu, bug EP-022) | — | — | ✅ `playEndSound` | — | — | |
| mj-05 Quiz | 🟡 | 🟡 `sndDing` | ✅ `playEndSound` | ✅ | ⬜ | |
| mj-06 Mot manquant | 🟡 TTS | 🟡 | **?** | **?** | ⬜ | lecture FR = i18n lourd |
| mj-08 Tri/collecte | 🟡 | 🟡 | ✅ | ✅ | ⬜ | |
| mj-09 | 🟡 TTS | 🟡 | **?** | ✅ | — | easter-egg super-max |
| mj-11 Drapeaux | 🟡 `speak {lang}` | 🟡 | **?** | ✅ | ⬜ | |
| mj-12 | 🟡 `new Audio` L502 | 🟡 | **?** | 🟡 | ⬜ | vérifier src custom |
| mj-13a/b/c (trio) | 🟡 `tts()` | 🟡 | ✅ `playEndSound` | ✅ | ⬜ | 3 jeux ~identiques → 1 gabarit |
| mj-14 Grille manque | 🟡 `speak` | 🟡 | ✅ | ✅ | ⬜ | consigne générique candidate |
| mj-15 Intrus | 🟡 `speak` | 🟡 | ✅ | ✅ | ⬜ | |
| mj-16 Suite logique | 🟡 `speak` | 🟡 | ✅ | ✅ | ⬜ | |
| **mj-17** | 🟡 | 🟡 `sndDing` | ❌ **pas de `playEndSound`** | ✅ `sndBuzz` | ⬜ | **oublié C1 — fin silencieuse** |
| **mj-18** | 🟡 | 🟡 `sndDing` | ❌ **pas de `playEndSound`** | ✅ `sndBuzz` | ⬜ | **oublié C1 — fin silencieuse** |
| mj-19 | 🟡 `speechSynthesis` brut | 🟡 | **?** | 🟡 | ⬜ | dette : router vers `TTS.speak` |
| mj-20 Compter {lang} | 🟡 `TTS.speak{lang}`+brut | 🟡 | **?** | ✅ | ⬜ | **modèle i18n** (nombres) |
| mj-21 Bus (figé triple-verrou) | 🟡 | 🟡 | 🟡 | 🟡 | ⬜ | **ne pas modifier sans défigeage** |
| mj-22 Drapeaux pays | 🟡 `speechSynthesis` brut | 🟡 | ❌ aucun MP3 fin | ❌ aucun MP3 erreur | ⬜ | `cherche-bien.mp3` existe, non branché |
| mj-23 Lire mot→image | 🟡 écran | 🟡 | ✅ `playEndSound` | ✅ | ⬜ | lecture = i18n lourd |
| mj-24 Trouve le dino (ombres) | ✅ `playDinoNom`+🟡 TTS | 🟡 `sndDing` | ✅ `Golden.showEnd` | ✅ `voice('doux')` | ⬜ | « Trouve le » fixe = candidat MP3 |
| mj-25 Trouve le même | ✅ `phrase('trouve-le-meme-dino')` | 🟡 | ✅ `Golden.showEnd` | ✅ `voice('doux')` | ⬜ | **MODÈLE consigne préenregistrée** |
| mj-26 Combien de dinos | ✅ `phrase`×2 | 🟡 | ✅ `Golden.showEnd` | 🟡 | ⬜ | « N dinos » reste TTS dynamique |
| mj-27 Lire nom syllabé | ✅ `-nom` (figé)+🟡 syllabes TTS | 🟡 `sndDing` | ✅ `Golden.showEnd` | 🟡 | ⬜ | **syllabes dépendent de la langue (I1)** |
| mj-28 Dino dans le noir | 🟡 TTS+✅ `playDinoNom` | 🟡 fait **TTS** | ✅ | 🟡 TTS | ⬜ | **`-funfact.mp3` existe, non branché** |
| mj-29 Racines grec/latin | 🟡 racine **TTS** | 🟡 | 🟡 | 🟡 | ⬜ | **`dico-*.mp3` (~65) existent, dits en TTS** |
| mj-30 Range par taille | 🟡+✅ `playDinoNom`+`phrase('regardons-ensemble')` | 🟡 mesures TTS | ✅ `Golden.showEnd` | 🟡 | ⬜ | **`-taille.mp3` existe → dire la taille** |
| mj-31 Voyage du temps | ✅ nom+`periodes/*`+extinction (chaînage) | 🟡 TTS | ✅ `Golden.showEnd` | ✅ `voice('doux')` | ✅ | **RÉFÉRENCE technique** ; `il-vivait-quand.mp3` non branché |
| mj-32 Colorie ton dino | — | 🟡 | ✅+TTS « Magnifique » | — | — | nom en TTS au lieu de `playDinoNom` ; « Magnifique » ∈ pool positif |
| mj-33 Memory ombre↔dino | 🟡+✅ `playDinoNom` | 🟡 fait **TTS** | ✅ `Golden.showEnd` | 🟡 | ⬜ | **`-funfact.mp3` remplacerait le fait TTS** |
| mj-34 Rush Hour bus | 🟡 `RegleInfo` | — | ✅ `playEndSound` | 🟡 | ⬜ | aucune consigne préenreg. |
| mj-35 Remplir grenier | 🟡 écran | 🟡 « Presque ! » **texte** | ✅ | 🟡 | ⬜ | « Presque » = candidat `voice('doux')` |
| mj-36 Tape le bus couleur | 🟡 `RegleInfo` | 🟡 | ✅ `play('victory')` | 🟡 | ⬜ | fin sans voix |
| mj-37 Échecs pédago | 🟡 `sounds/pieces/<p>-intro.mp3` | 🟡 | ✅ | 🟡 | ⬜ | ❌ **BUG : `sounds/pieces/` absent → 6 voix muettes** |
| mj-38 Saute-mouton dodo | 🟡 `RegleInfo` | — | ✅ | 🟡 | ⬜ | |
| mj-39 Tetris-like | 🟡 `RegleInfo` | 🟡 | ❌ **?** pas de `playEndSound` | 🟡 | ⬜ | |
| mj-40 Tangram dino | 🟡 écran+`RegleInfo` | 🟡 | ✅ | 🟡 | ⬜ | nom cible non annoncé (candidat `playDinoNom`) |
| mj-41 Memory tuiles dino | 🟡+✅ `playDinoNom` | 🟡 | ❌ **?** pas de fin | 🟡 | ⬜ | |
| mj-42 Morpion point d'eau | 🟡 `RegleInfo` | 🟡 | ❌ **BUG** `playEndSound(true/false)`→NaN | 🟡 | ⬜ | **corriger en `(1,1)`/`(0,1)`** |
| mj-gold-a/b | **?** | 🟡 | ✅ `Golden.showEnd` | 🟡 | ⬜ | à ouvrir |
| mj-pose-tiles (sandbox) | — | — | ✅ | — | — | quasi pas de voix |

**Constats transverses** :
- **Instruction** : aucune consigne de départ en MP3 hors 4 MJ dino (25/26/30 + noms). Tout le reste = TTS ou texte écran → **chantier principal FR**.
- **Réussite en cours** : jamais de voix « Bravo » par défaut (seulement `sndDing`). `voice('positif')` (48 MP3) existe mais quasi jamais appelé en succès → **décision produit à trancher**.
- **Transition** : quasi aucun son hors mj-31. Pools `apparition`/`collecte` prêts, non branchés.
- **Commentaire** : `comments.js` (💬) = **saisie parent** (dictée), PAS un audio de sortie. Pas de voix-off narrative dans les MJ.

### 2b. Catégories transverses OUBLIÉES (correction critique C3)

| Catégorie | État | Décision |
|-----------|------|----------|
| **Jingle navigation menu** (`index.html` JINGLES) | ✅ existe (SFX neutre) | acter / homogénéiser |
| **Musique / ambiance loop** (`ui/ambiance-nuit`, `ui/veilleuse`) | ⚠️ produits, **branchés dans AUCUN jeu** (seulement `dev-sounds-ui.html`) | orphelins — brancher ou acter |
| **Jingle d'ouverture app / splash** | ❌ inexistant | produire ou acter l'absence |
| **Transition voyage-temps** (`ui/voyage-temps`) | 🟡 existe, câblé nulle part hors mj-31 | brancher sur les changements d'ère |
| **Félicitation d'étoile parlée** (« Tu as gagné une étoile ! ») | ❌ n'existe pas (pool `deblocage` = SFX seul ; Golden `showEnd` affiche mais ne parle jamais) | **candidat fort** — moment de récompense muet |

### 2c. Dino — segments, noms, récits, menus

**Segments fiche manquants (chantier #1)** : 9 dinos Cénozoïque n'ont QUE `-nom.mp3` → 4 blocs manquants chacun (~36 MP3) : `aenocyon · coelodonta · edmontonia · glyptodon · mammuthus · megatherium · paraceratherium · smilodon · titanis`. Textes probablement dans `scripts-audio/V3/megafaune.md` + `edmontonia.md` (**à vérifier**). Bloqué quota EL.
> ⚠️ Écart de comptage à réconcilier par dino-archiviste : INVARIANTS dit « 8 en attente », disque en trouve **9**. `DINO_AUDIO` mappe **51** complets. Disque : nom=60, taille=51, regime=52, funfact=51, recap=53.

**Noms** : 60/60 présents. Chantier = **homogénéisation de ton** (bonus `[excited]` vs fiche neutre), différée Papa Yann — pas une absence.

**Corrections texte AVANT régé** : 5 `nom_etym` flaggés `a_corriger` (Spinosaurus, Iguanodon, Microraptor, Gallimimus, Amargasaurus) · méta manifest `nb_dinos=50` (réel 60) · 2 `-recap` orphelins · `menu-fam-oiseaux.mp3` absent (11e famille) · `periodes/permien.mp3` incertain.

**Gisements de branchement (assets produits, non consommés)** : `-funfact` → mj-28/33 · `dico-*` → mj-29 · `-taille` → mj-30 · `il-vivait-quand` → mj-31.

### 2d. Générique — déjà produit, NON branché (branchement ≈ 1 ligne)

6 phrases orphelines dans `sounds/voix/phrases/` (0 occurrence dans le site) : `cest-parti` · `a-toi-de-jouer` · `encore-une-fois` · `cherche-bien` (dont mj-22 le dit en TTS !) · `ouvre-bien-les-yeux` · `il-vivait-quand` (mj-31).

**À PRODUIRE — banque d'instructions génériques** (le gros levier FR restant) : ~15-20 phrases-verbe couvrant la majorité des MJ non-dino, partie fixe préenregistrable (variable nom/nombre reste TTS) : `Compte les…` · `Trouve le…` · `Glisse le…` · `Range dans…` · `Écoute bien` · `Touche…` · `Rejoue` · `Quelle couleur ?` · `Quel numéro ?` · `Qu'est-ce qui manque ?` · `Lequel ne va pas ?` · `Qu'est-ce qui vient ensuite ?` · `À toi !`.

---

## 3. Backlog priorisé

Effort : S (<1h code) · M (½-1j) · L (plusieurs jours) · XL (étalé sur cycles de quota EL).

### P0 — Corrections & gains quasi gratuits (code seul, 0 crédit EL)

| Lot | Détail | Effort |
|-----|--------|--------|
| **P0-1** Bug mj-42 | `playEndSound(true/false)` → `(1,1)`/`(0,1)` — fanfare jamais déclenchée aujourd'hui | S |
| **P0-2** Fin silencieuse mj-17/18/22/39/41 | ajouter `playEndSound` (vérifier gold-a/b) | M |
| **P0-3** Brancher 6 phrases orphelines | `SoundPool.phrase(slug, fallback)` aux points d'usage | S |
| **P0-4** Brancher assets dino dormants | `-funfact`→mj-28/33 · `dico-*`→mj-29 · `-taille`→mj-30 (remplace TTS par MP3 EL existant) | M |
| **P0-5** Câbler pools transition | `apparition` (nouvelle question) · `collecte` (étoile) · `deblocage` (unlock) | M |
| **P0-6** Corriger 5 `nom_etym` + méta `nb_dinos` | prérequis avant toute régé racines | S |
| **P0-7** Vérifier les 11 MJ « ? » | confirmer présence son fin/erreur | M |

### P1 — Production vocale FR à compléter (dépend crédits EL)

| Lot | Détail | Effort |
|-----|--------|--------|
| **P1-1** 9 dinos Cénozoïque | 4 blocs × 9 (~36 MP3), textes V3/megafaune.md | M |
| **P1-2** Voicelines pièces mj-37 | 6 `sounds/pieces/<piece>-intro.mp3` | S |
| **P1-3** `menu-fam-oiseaux` + `periodes/permien` (si data le veut) | complétude menu | S |
| **P1-4** Banque instructions génériques FR | ~15-20 phrases + branchement MJ non-dino | L |
| **P1-5** Voix positive en cours de partie | décision produit + branchement (assets prêts) | S après décision |
| **P1-6** Félicitation d'étoile parlée | produire + brancher sur récompense (C3) | S |

### P2 — Multilingue (architecture ci-dessous)

Voir §4-8. Prérequis bloquant = P2-1 (`lang.js`) et la migration FR "lang-ready".

---

## 4. Architecture i18n — principe régé vs neutre

| Famille | Coût/langue | Détail |
|---------|-------------|--------|
| **NEUTRE (SFX)** | **0** | `fx/` (54) + `ui/` (10) + synthés `sounds.js` + classiques (~5) = **~69 assets jamais régénérés**. À 4 langues = ~207 régé évitées. Prompts SFX déjà rédigés en anglais = preuve d'agnosticité. |
| **VOIX** | régé complète | réactions (66) + phrases (10) + lieux (12) + dino (~373) ≈ **~650 MP3/langue** en cible complète. Les **clés (slugs, ids) ne bougent jamais** — on duplique le fichier pointé, le code est identique. |
| **NOMS DINO** | régé + lexique | 🚨 phonétique par langue (voir §5). |

## 5. 🚨 Noms de dinos — le point d'attention n°1 (phonétique par langue)

Le nom savant est **invariant à l'écrit** (`Tyrannosaurus`) mais **sa prononciation dépend de la langue** :
- FR `Ty-ran-no-saure` · EN `Tie-RAN-oh-SOR-us` · PT-BR `Ti-ra-no-SAU-ro`.

**Pourquoi irréductible** : MaxPlay n'utilise pas d'IPA, seulement du **respelling inline** calibré FR (`ch→k`, `ph→f`, `th→t`, `-us` avalé en `-saure`, jamais de capitale sur mot <4 lettres — REX `ROI→roui`, `Mo-sa-sau-ru`). Ce respelling **n'est pas transférable** : chaque langue a sa graphie.

**Mécanisme de factorisation à préserver — le « dico »** : le nom est reconstruit racine par racine (`-saure` = 1 clip réutilisé sur 29 dinos). La **structure** mapping racine→dinos (`dinos-racines.js`, tag `.langue` grec/latin) est **universelle** ; seul le **clip parlé** de chaque racine se régénère par langue.

**Stratégie recommandée : A en cible, B en filet.**
- **A** — voix `Native <lang>` + `_LEXIQUE-PRONONCIATION-<lang>.md` (refait, pas traduit) + champ data `pron_<lang>` par dino. ✅ qualité premium.
- **B** — TTS navigateur natif si MP3 manquant. Filet, jamais muet.
- **C** — respelling « international » unique. ❌ sonne faux partout.

**Correction critique I1 — la phonétique frappe AUSSI** : les noms bonus `noms/<id>.mp3` (60, à compter dans le volume), la **découpe syllabique de mj-27** (dépend de la langue), et les noms **prononcés en contexte** dans récits/menus (le respelling doit être appliqué dans le texte source du récit, pas seulement le clip isolé). Le lexique par langue doit couvrir : noms isolés + noms en contexte + découpe syllabique.

## 6. Convention de stockage — préfixe langue (Option A, recommandée)

**Parole préfixée, SFX plats** :
```
site/sounds/fx/          ← 54 SFX PARTAGÉS (jamais de langue)
site/sounds/ui/          ← 10 SFX PARTAGÉS
site/sounds/<lang>/voix|phrases|lieux/    ← parole par langue (fr migré, en nouveau)
site/audio/dinos/<lang>/ ← ~373 MP3 dino par langue
studio/dino/content/scripts-audio/_LEXIQUE-PRONONCIATION-<lang>.md
```
Justification : fallback trivial (« remplace `<lang>` par `fr` »), un pack langue = 1 dossier copiable vers CDN, cohérent avec la frontière autoring/produit dino `(lang, id)`. Coût = 1 `git mv` du FR (one-shot P0). Option B (suffixe `.fr.mp3`) rejetée : éparpillé, pas de pack copiable.

## 7. Couche API paramétrée

- **`site/js/lang.js` (À CRÉER, bloquant)** : `Lang.current/bcp47/set/path`. Résolution `?lang=` → `localStorage['maxplay_lang']` → profil Cloud enfant → `navigator.language` → `'fr'`. `Lang.path(rel)` insère le segment langue **pour la parole seulement** (liste des racines "parole" centralisée ici).
- **`victory-sounds.js`** : API publique **inchangée** (43 MJ ne bougent pas), seule la résolution de chemin passe par `Lang.path`. Slugs = clés neutres cross-langue.
- **`dinos-audio-manifest.js`** : `DINO_NOM_AUDIO` indexé par langue. **Correction I3 : toujours tester `DINO_NOM_AUDIO[lang].has(id)` AVANT le fetch** (jamais `catch(404)` comme voie normale — sinon 404 systématiques sur langue partielle). Manifest généré depuis le disque.
- **`voice-map.json`** : passer de `{role: id}` à `{voices: {fr:{…}, en:{…}}}` + `resolveVoice(role, lang)` avec fallback casting FR. Le MCP `studio_audiobook…v2_dialogue` accepte déjà `language_code`. 🚨 voice_ids `Native <lang>` = décision casting figée.
- **`tts.js:39`** : `opts.lang || Lang.bcp47()` au lieu de `'fr-FR'`. + router les 3 fuites `speechSynthesis` brut (mj-19/20/22).
- **Chaîne de fallback gravée** : `MP3 <lang> → MP3 fr → TTS(Lang.bcp47()) → jamais muet`. Rend le multilingue **démarrable à 0 % de MP3** (active EN = tout parle en TTS anglais, on remplit ensuite). **Correction I2 : consulter le manifest AVANT le fetch pour éviter le double-fetch/404.**
- 🚨 **Correction I4 — `voice.js`/`voices-manifest.js` (couche premium) à trancher, pas "à décider"** : clé texte-normalisé (par langue) vs clé slug (banque) se chevauchent sur le même événement. Choisir : soit voice.js indexé par slug (aligné banque), soit voice.js déprécié au profit de `SoundPool.phrase` + pool premium. **Une des deux.**

## 8. Sélection de langue (UX)

Sélecteur **drapeau** sur le hub (zones ≥80px, Max reconnaît les drapeaux). Persistance `localStorage['maxplay_lang']`, profil Cloud prime au 1er chargement, `?lang=` force (QA). Changement = recharger la page (les MP3 se résolvent au nouveau préfixe). Libellés menu (`catalog.js`, `tracker.js`) externalisés dans `strings.<lang>.js` + helper `t(key)` minimal (pas de framework).
> **Correction M4** : le drapeau anglais n'a pas de « pays » évident pour un enfant FR ; **PT-BR (origines brésiliennes de Max) = 2e langue plus naturelle** (drapeau 🇧🇷 clair) et plus motivante que EN.

---

## 9. 🚨 GED + gouvernance — conflit de règle figée à trancher

**Constat** : aucun PMO ne possède la vue transverse audio (game-pmo tient `_BANQUE-SONS.md`, dino-pmo tient INVARIANTS, narration-pmo tient `voice-map.json`).

**⚠️ ALERTE RÈGLE FIGÉE (correction critique I5)** : la 1re synthèse proposait de faire de **narration-pmo l'owner du registre audio transverse**. Or `studio/narration/CLAUDE.md` grave explicitement que **narration-pmo ne gère PAS le dino**. Le registre inclut ~373 assets dino → **cette proposition viole une frontière figée**. Ne pas trancher silencieusement (cf. `feedback_regle_figee_alerte.md`).

**Recommandation corrigée** : plutôt qu'étendre narration-pmo (conflit), suivre **le modèle exact de l'extraction dino** →
- **1 registre transverse** `memory/audio/AUDIO-REGISTRY.md` (généré depuis le disque, pattern `_ETAT-DINOS.md`) — seule source à citer les counts par langue ; les features lisent par `(lang, id)`.
- **1 rule path-scopée** `.claude/rules/audio-i18n.md` sur `site/sounds/**` + `site/audio/**` (charge les règles audio où que vive le fichier, comme `rules/dino.md`). **Pas de 4e PMO.**
- **Exécution distribuée sur les rôles existants** : casting = narration-pmo (voice-map per-lang) · contenu = pôle propriétaire (game-pmo / dino-pmo trace SES assets) · forme = archivistes existants (ajouter **colonne langue** aux audits `/game-archiviste-audit` & `/dino-archiviste-audit`) · localisation = `narration-localisation` (agent existant, 8 cultures) étendu au respelling.

**Matrice langue × asset** (générée par outil scannant `site/audio/<lang>/` + `site/sounds/<lang>/`) : SFX (64) = N/A langue · réactions/phrases/lieux → game-pmo · noms/segments/dico/menus dino → dino-pmo · casting voice_id → narration-pmo.

## 10. Infra & coûts

- **Poids FR actuel (disque)** : `audio/dinos` = 194 Mo, `sounds` = 7,4 Mo → **~201 Mo**. Contexte : `.git` = 3,0 Go, `img/dinos` = 1,2 Go.
- **+1 langue ≈ +150-200 Mo** (SFX non dupliqués). **Correction I2 : chiffrer sur la cible COMPLÈTE (60 dinos, pas 51)** — FR lui-même incomplet, le vrai volume/langue est > 373.
- **À 3-4 langues → repo ingérable.** **Décision infra** : garder FR dans git, **sortir les packs `<lang>/` non-FR vers Supabase Storage** (déjà provisionné) + manifest URL. Le préfixe rend ça trivial (1 dossier = 1 bucket). Précédent : paléoart compressé 771→108 Mo.
- **Crédits EL** : ~25 crédits/s, reset ~10 du mois. **+1 langue ≈ 650 MP3 = dépasse un cycle mensuel** → chantier étalé sur plusieurs mois. Stratégie : `check_subscription` avant chaque lot · prioriser phrases+réactions > noms > funfacts · script de reprise idempotent (skip si MP3 existe) · **écrire la boucle batch multilingue** (n'existe pas encore).

## 11. Plan de migration en phases

**P2-A — Amorçage "lang-ready" (0 régression, 0 nouvel asset, invisible pour Max)** :
1. Créer `site/js/lang.js` (défaut `'fr'`), chargé avant les JS audio.
2. `git mv` : `sounds/voix/* → sounds/fr/…`, `audio/dinos/*.mp3 → audio/dinos/fr/…` (SFX NON déplacés).
3. Paramétrer résolution (`victory-sounds`, `dinos-audio-manifest`, `speakLieu`) via `Lang.path`.
4. Correctif `tts.js:39` + router les 3 fuites mj-19/20/22.
5. `voice-map.json` → `{voices:{fr:{…}}}` + `resolveVoice`.
6. Générateur manifest → boucle `audio/dinos/<lang>/`.
7. Créer `memory/audio/AUDIO-REGISTRY.md` + `.claude/rules/audio-i18n.md` + `_ETAT-AUDIO.md` généré (colonne fr).
8. Externaliser `strings.fr.js` + helper `t()`.
> ✅ Fin de P2-A : site 100 % FR comme avant, mais toute la plomberie langue posée. **À faire même sans 2e langue décidée.**

**P2-B — 2e langue pilote (PT-BR recommandé, ou EN)** : 🚨 casting `Native <lang>` → `voice-map.voices.<lang>` · créer `_LEXIQUE-PRONONCIATION-<lang>.md` · activer sélecteur → bascule **TTS immédiate** (jouable J1, 0 MP3) · batch prioritaire (réactions+phrases → noms → segments) · `strings.<lang>.js` + `dinos-data.<lang>` textuel · sortir pack vers Supabase · archivistes ajoutent la colonne langue.

**P2-C — Généralisation** : 1 langue = 1 `voices.<lang>` + 1 lexique + 1 pack + 1 strings, **zéro refactor code**. Automatiser la boucle batch (`langues × assets`, idempotent). Réutiliser `narration-localisation` (8 cultures cadrées).

---

## 12. 🚨 Décisions à trancher par Papa Yann

1. **Convention préfixe `<lang>/`** (Option A) + `git mv` du FR en P2-A.
2. **Casting `Native <lang>` par langue** dans `voice-map.json` (règle figée casting).
3. **Noms dino régénérés par langue** (stratégie A : voix native + lexique) — coût assumé, non contournable.
4. **Gouvernance** : rule path-scopée `audio-i18n.md` + registre transverse (PAS narration-pmo owner du dino — conflit règle figée). Valider ce choix corrigé.
5. **Audio non-FR hors git → Supabase Storage** dès la 2e langue.
6. **Couche premium `voice.js`** : clé slug (aligné banque) OU dépréciée. Trancher.
7. ✅ **DÉCIDÉ 2026-07-08 : 2 langues cibles = anglais (EN) + portugais-brésilien (PT-BR), les deux.** (PT-BR colle au profil brésilien de Max.)
8. **Faire P2-A dès que possible** (nettoie la dette, réversible, invisible) même sans 2e langue décidée.

---

*Produit par workflow `audit-audio-i18n` (8 agents, 125 items, critique adverse intégrée). Corrections C1-C3/I1-I5/M1-M4 appliquées vs 1re synthèse. Ne pas traiter les « ? » comme acquis : mj-06/09/11/12/19/20/21/22/39/41/gold-a/b (sons de fin), `periodes/permien`, écart comptage Cénozoïque 8 vs 9 — à réconcilier par dino-archiviste avant de figer les volumes.*
