---
paths:
  - "studio/dino/**"
  - "site/dev-dinos.html"
  - "site/js/dinos-data.js"
  - "site/js/dinos-images-local.js"
  - "site/js/dinos-images-grok.js"
  - "site/js/dinos-racines.js"
  - "site/audio/dinos/**"
  - "site/img/dinos/**"
---

# Pôle DINO — règles auto-chargées (path-scoped)

> Chargé dès que Claude touche un fichier dino, **où qu'il vive** : le dossier `studio/dino/` (gouvernance + contenu) OU le code déployé sous `site/` (dev-dinos, data, audio, img).
> C'est le **pont** entre le code (dans studio/minijeux/) et le pôle (dans studio/dino/), puisqu'un nested CLAUDE.md ne se charge que selon l'emplacement du fichier.

## Réflexe à l'ouverture

1. Lire [`studio/dino/CLAUDE.md`](../../studio/dino/CLAUDE.md) (règles pôle) + [`studio/dino/figees/encyclopedie.md`](../../studio/dino/figees/encyclopedie.md) (🔒 décisions verrouillées — le hook `figees-injector` les réinjecte aussi avant un Edit).
2. Ne jamais répondre de mémoire sur un chiffre/casting → invoquer `dino-pmo` en lecture de [`studio/dino/pmo/INVARIANTS.md`](../../studio/dino/pmo/INVARIANTS.md).
3. **Ranger / trouver dans `content/`** (réorg 2026-06-08) : `sources/` = 📚 vérité (jamais réinventer) · `data/` = 🎯 généré (régénérer via `scripts/export/`, **ne jamais éditer à la main**) · `scripts/` = 🛠️ outils (audio · images-grok · export) · `scripts-audio/` = dialogues · `inbox/` = 📥 brut. Carte : [`studio/dino/content/INDEX.md`](../../studio/dino/content/INDEX.md).

## Agents proactifs (auto sur signal DINO)

- **`dino-pmo`** (FOND) — persistance pmo/, décisions, leçons. Invoqué à chaque tour avec signal dino.
- **`dino-archiviste`** (FORME) — structure, refs, audio/png orphelins, surveille code+dossier.
- **`dino-conseiller`** (créatif) — écriture récits/fiches, péda 4 ans, fact-check Grokipedia, taxo.

## 🏛️ Doctrine GED (DEC-GED-001, figée 2026-07-03 — détail : `pmo/decisions.md` + `pmo/INVARIANTS.md` § Doctrine)

- 🔒 **CANON SANS NUMÉRO** : le fichier qui fait foi porte un nom stable sans version (ex `RECITS-EPOQUES.md`, jamais `-V5`). Les anciennes versions vont dans un `_archive/` local daté. On DÉSIGNE le canon, on ne SUPPRIME jamais ([[feedback_narration_info_loss]]).
- 🔒 **ZÉRO CHIFFRE EN DUR** : aucun INDEX/README/CLAUDE.md/rule ne recopie un count (dinos, familles…). On POINTE vers `pmo/INVARIANTS.md` (SEUL tracker autorisé à citer des chiffres) ou `site/js/dinos-data.js`. **⚠️ Portée = GOUVERNANCE uniquement.** Le **contenu narré** (récits, fiches audio) DOIT au contraire dire les vrais chiffres (« il y a 66 millions d'années », « 9 mètres ») — règle figée anti-nian-nian. Ne JAMAIS édulcorer un chiffre dans un texte que l'enfant entend au nom de « zéro chiffre ».
- 🔒 **FRONTIÈRE AUTORING / PRODUIT** : une feature (mini-jeu, page) ne lit QUE `site/js/dinos-data.js` + assets `site/img/dinos/` référencés (nommés par `id`). Jamais elle ne monte lire dans `studio/` (non déployé). Donnée manquante → descend dans dinos-data.js via un script d'export.
- 🔒 **CHECKLIST « DINO COMPLET »** (8 axes) : hero · 5 scènes paléoart · coloriage · 5 segments audio · silhouette · fiche fact-checkée+relue-péda · étymo · mesures. Suivi via l'outil généré `_ETAT-DINOS.md` (dino-archiviste). Playbook « nouveau dino → quoi faire » : [`studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md`](../../studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md).
- 🟡 **STOP silhouettes** : 3 zones coexistent, fusion reportée au 1er mini-jeu qui les consomme — ne pas relancer d'ombres. Voir `content/assets/silhouettes/_STOP-3-ZONES.md`.

## Règles dures (résumé — détail dans figées)

- 🔒 **Tritri** = running gag Wex (dino préféré). JAMAIS « Max », « doudou », « peluche ».
- 🔒 **Encyclopédie = vrai** : vrais noms + vraies dates. Terme savant nouveau → expliqué (« ptérosaure » → « reptile volant comme le Ptéranodon »).
- 🔒 **Échelle honnête** : aucune comparaison qui ment > 10 %. **Bus interdit dans les récits narrés** (OK en échelle de taille des fiches).
- 🔒 **4 onglets** : Familles (défaut, titres = noms scientifiques) · Ce qu'il mange (régimes alimentaires) · Le voyage (8 récits, avancement reset session) · **Le dico** (racines grec/latin, source `js/dinos-racines.js` généré). [4ᵉ onglet ajouté 2026-06-08]
- 🔒 **Audio** : « écoute » jamais « regarde » · Wex FR standard sans tic écrit · accroche menu 2-7 s · narrateur_h (menus) / narrateur_f (voyage) · eleven_v3 stability 0,4 · loudnorm.
- 🔒 **AVANT toute génération audio** : `grep -niE "max|doudou|peluche|bus" <texte>` → match (hors échelle) = STOP.

## Toujours

Papa Yann teste via GitHub Pages → **commit + push** après toute modif dino. Après correction → leçon `studio/dino/pmo/backlog.md` (+ figée si règle). Screenshot/test avant de soumettre une modif UI.

---

_Créé 2026-06-03 avec le pôle DINO. Lie le code (site/) au pôle (studio/dino/) via path-scoping, mécanisme Anthropic pour règles ciblées indépendantes de l'emplacement._
