# 🔒 FIGÉ — Encyclopédie Dino & Voyage dans le temps

> Décisions verrouillées par Papa Yann. Le hook `figees-injector` réinjecte ce fichier dès qu'on touche `dev-dinos.html`, `dinos-data.js`, un audio `recit-*`/`menu-*`, ou un fichier de `dino/`.
> Chaque ligne 🔒 est LOI. Chaque ligne ❌ 🔒 est une régression DÉJÀ commise — interdite. Seul Papa Yann défige (alerte rouge obligatoire avant tout changement d'une ligne 🔒).

Fichiers concernés : [`site/dev-dinos.html`](../../../site/dev-dinos.html) · [`site/js/dinos-data.js`](../../../site/js/dinos-data.js) · [`site/audio/dinos/`](../../../site/audio/dinos/) · source dialogue [`_RECITS-EPOQUES-DIALOGUE.md`](../content/_RECITS-EPOQUES-DIALOGUE.md).

---

## 🔒 TRITRI — le fil rouge du voyage (FIGÉ 2026-06-03)

- 🔒 **Tritri = running gag de Wex.** Tout au long du voyage, Wex demande « y'avait Tritri ? et maintenant ? là y'avait Tritri ? ». On le trouve avec JOIE au **Crétacé** (c'est le Tricératops).
- 🔒 **Tritri = juste son DINOSAURE PRÉFÉRÉ** (un Tricératops). Rien d'autre.
- ❌ 🔒 **JAMAIS dire « Max »** dans un récit/audio.
- ❌ 🔒 **JAMAIS dire « doudou »** ni « peluche » ni « nounours ».
- ❌ 🔒 Ne pas casser le 4e mur (« le doudou d'un petit garçon »). Tritri vit DANS l'histoire, point.
- 🔒 Après le Crétacé (où on le trouve), **plus de « pas encore de Tritri »**.

> Régression commise 2026-06-03 (audio `recit-intro` disait « le doudou de Max ») → corrigée + gravée ici.

## 🔒 ZÉRO BUS dans les RÉCITS narrés (FIGÉ)

- ❌ 🔒 **Aucune comparaison-bus dans les 8 récits d'époque** ni dans une `desc`/`fait` de dino racontée.
- ✅ **Exception légitime** : les comparaisons d'ÉCHELLE de taille des fiches (`_compLong`/`_compHaut` : « aussi long qu'un bus RATP », « ailes larges comme un bus ») — VALIDÉES par Papa Yann, c'est l'échelle honnête. Le bus est interdit en NARRATION, autorisé en ÉCHELLE.

> Régression 2026-06-03 : `desc` Mosasaure « énorme comme un bus géant » → corrigée en « aussi long que deux voitures ».

## 🔒 ENCYCLOPÉDIE = vrais mots, pas de nian-nian (FIGÉ)

- 🔒 On DIT les **vrais noms** (Trias, Jurassique, Crétacé, Théropodes…) et les **vraies dates/chiffres** (« il y a 250 millions d'années »).
- 🔒 Un terme savant prononcé doit être **expliqué** s'il est nouveau pour l'enfant. Ex : « ptérosaure » seul = ❌ → « reptile volant, comme le Ptéranodon » ✅ (le Ptéranodon est dans le jeu, lui).
- ❌ 🔒 Flou édulcorant (« il y a si longtemps qu'on ne peut pas compter ») = nian-nian, banni.

## 🔒 AUDIO — registres & durées (FIGÉ)

- 🔒 **Accroche de menu (onglet)** = **2 à 7 secondes MAX** (8-22 mots). C'est une accroche qui donne envie de toucher, pas un cours. Fichiers `menu-accueil/regime/familles/voyage.mp3`.
- 🔒 **Récit d'époque** = vrai petit récit (~10-25 s), Narratrice + Wex. Fichiers `recit-*.mp3`.
- 🔒 **Voix** : Narrateur H (`narrateur_h`) sur accueil/régime/familles · **Narratrice F** (`narrateur_f`) sur le Voyage et tous les récits d'époque.
- 🔒 **Wex** : FR standard, AUCUN tic écrit à la main (la voix encode bégaiement/teinte). « écoute » jamais « regarde ». Voir [[reference_audio_kit_enfant]] + skill `ecriture-audio-enfants`.

## 🔒 UI dev-dinos (FIGÉ 2026-06-03)

- 🔒 **4 onglets** dans l'ordre : **Les familles** (défaut) · Ce qu'il mange · Le voyage · **Le dico**. (« Où il vivait » retiré ; le 📍 région reste DANS la fiche. **Le dico** ajouté **2026-06-08 — décision Papa Yann** ; racines grec/latin, source `js/dinos-racines.js` généré depuis `content/sources/etymo/_ETYMO-RACINES-50.md`.)
- 🔒 **Familles** : titre = **nom scientifique** (`sci` : Théropodes…), surnom (`label`) en sous-titre, origine grecque (`sci_sens`) dite en entrant dans la grille. Cartes en liste verticale (pas grid) pour ne rien couper.
- 🔒 **« Ce qu'il mange »** = catégories **alimentaires uniquement** (carnivores/herbivores/piscivores/omnivores). ❌ 🔒 Pas de catégorie morphologique ici (« Volants & Marins » retiré — ces animaux sont reclassés dans leur vrai régime ; la famille « Volants & Marins » reste, elle, dans l'onglet Familles).
- 🔒 **Un seul son par transition** : entrer dans une catégorie/famille ne déclenche QU'UN TTS (celui de la grille). ❌ 🔒 Pas de double « Carnivore » + « Carnivore ! Tape sur un dino ».
- 🔒 **Fiche** : le gros bouton violet « Écoute l'histoire » n'apparaît QUE si l'audio complet existe (`dinoHasAudio`).
- 🔒 **Voyage** : les vignettes dino sont **décoratives** (image + nom), AUCUN lien/clic qui ouvre une fiche (ça interromprait). Indicateur d'avancement : récit écouté → ✅ + le 👉 pointe le suivant. **Avancement = mémoire de SESSION**, remis à zéro à chaque ouverture de l'onglet (pas de persistance).

---

## ⚙️ PROCESS MILITAIRE — produire/modifier un audio dino (anti-dérapage)

> Né de l'incident « doudou de Max » (2026-06-03) : un audio généré AVANT une consigne, jamais re-vérifié. Ce process ferme le trou.

1. **TEXTE D'ABORD, dans la source.** Tout récit/accroche vit en clair dans [`_RECITS-EPOQUES-DIALOGUE.md`](../content/_RECITS-EPOQUES-DIALOGUE.md) (récits) ou est écrit ici. On ne génère JAMAIS d'audio d'un texte qui n'est pas écrit/relu.
2. **CHECK INTERDITS avant génération** (obligatoire) — grep le texte :
   ```
   grep -niE "max|doudou|peluche|nounours|\bbus\b" <texte>
   ```
   Une seule occurrence (hors échelle-bus d'une fiche) → STOP, corriger AVANT de générer.
3. **GÉNÉRER** via la voie officielle : récits multi-voix = `studio_audiobook_from_segments_v2_dialogue` (eleven_v3) ; accroches mono = `text_to_speech` voix `narrateur_h`/`narrateur_f`. Toujours `loudnorm` en post.
4. **VÉRIFIER LA DURÉE** : accroche menu 2-7 s (sinon trop longue → réécrire plus court). `ffmpeg -i <mp3>` → Duration.
5. **RE-GREP après coup** : le texte réellement envoyé == le texte relu ? (pas de vieux fichier qui traîne).
6. **PMO** : `game-mj-pmo` grave toute nouvelle décision validée Papa Yann ici, mot pour mot.

**Qui contrôle ?** Le **main agent** applique l'étape 2 (grep interdits) AVANT chaque génération — c'est non négociable. `game-mj-reviewer` peut auditer ce fichier. `game-mj-pmo` grave.

---

_Créé 2026-06-03 (incident doudou-Max + refonte familles/voyage/régime). Triple verrou : hook figeage + ce fichier + grep interdits obligatoire avant audio._
