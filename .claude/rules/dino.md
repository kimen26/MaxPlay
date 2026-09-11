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
2. Ne jamais répondre de mémoire sur un chiffre/casting → invoquer `dino-pmo` en lecture de [`studio/dino/memory/INVARIANTS.md`](../../studio/dino/memory/INVARIANTS.md).
3. **Ranger / trouver dans `content/`** (réorg 2026-06-08) : `sources/` = 📚 vérité (jamais réinventer) · `data/` = 🎯 généré (régénérer via `scripts/export/`, **ne jamais éditer à la main**) · `scripts/` = 🛠️ outils (audio · images-grok · export) · `scripts-audio/` = dialogues · `inbox/` = 📥 brut. Carte : [`studio/dino/content/INDEX.md`](../../studio/dino/content/INDEX.md).

## Agents proactifs (auto sur signal DINO)

- **`dino-pmo`** (unifié FOND+FORME depuis 2026-07-19, Sonnet) — persistance pmo/, décisions, leçons + structure, refs, orphelins audio/png, code déployé dans site/. **Capture immédiate** : toute idée/décision du tour = 1 ligne backlog dans le tour (main agent), le PMO sert en clôture/audit/recherche.
- **`dino-conseiller`** (créatif) — écriture récits/fiches, péda 4 ans, fact-check Grokipedia, taxo.

## 🏛️ Doctrine GED (DEC-GED-001, figée 2026-07-03 — détail : `memory/DECISIONS.md` + `memory/INVARIANTS.md` § Doctrine)

- 🔒 **CANON SANS NUMÉRO** : le fichier qui fait foi porte un nom stable sans version (ex `RECITS-EPOQUES.md`, jamais `-V5`). Les anciennes versions vont dans un `_archive/` local daté. On DÉSIGNE le canon, on ne SUPPRIME jamais ([[feedback_narration_info_loss]]).
- 🔒 **ZÉRO CHIFFRE EN DUR** : aucun INDEX/README/CLAUDE.md/rule ne recopie un count (dinos, familles…). On POINTE vers `memory/INVARIANTS.md` (SEUL tracker autorisé à citer des chiffres) ou `site/js/dinos-data.js`. **⚠️ Portée = GOUVERNANCE uniquement.** Le **contenu narré** (récits, fiches audio) DOIT au contraire dire les vrais chiffres (« il y a 66 millions d'années », « 9 mètres ») — règle figée anti-nian-nian. Ne JAMAIS édulcorer un chiffre dans un texte que l'enfant entend au nom de « zéro chiffre ».
- 🔒 **FRONTIÈRE AUTORING / PRODUIT** : une feature (mini-jeu, page) ne lit QUE `site/js/dinos-data.js` + assets `site/img/dinos/` référencés (nommés par `id`). Jamais elle ne monte lire dans `studio/` (non déployé). Donnée manquante → descend dans dinos-data.js via un script d'export.
- 🔒 **CHECKLIST « DINO COMPLET »** (8 axes) : hero · 5 scènes paléoart · coloriage · 5 segments audio · silhouette · fiche fact-checkée+relue-péda · étymo · mesures. Suivi via l'outil généré `memory/_ETAT-DINOS.md` — **régénérer** (jamais tenir à la main) : `node studio/dino/content/scripts/export/_gen-etat-dinos.cjs` (à lancer dans tout `/dino-pmo-audit` ou question « où en sont les dinos ? »). Playbook « nouveau dino → quoi faire » : [`studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md`](../../studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md).
- 🟡 **STOP silhouettes** : 3 zones coexistent, fusion reportée au 1er mini-jeu qui les consomme — ne pas relancer d'ombres. Voir `content/assets/silhouettes/_STOP-3-ZONES.md`.

## 🔒 NORME CLÉ D'ASSETS (gravée 2026-07-27, demande PY « que ça ne soit jamais oublié »)

- **La clé de liaison de TOUT asset dino = le NOM LATIN capitalisé = `id` du dino capitalisé** (`tyrannosaurus` → `Tyrannosaurus`). Fichiers `Tyrannosaurus_ombre.png`, `Tyrannosaurus_sprite.png`, clés de `DINO_ASSETS`, paramètre `?open=`.
- **JAMAIS le nom d'affichage FR** (`T-Rex`, `Tricératops` — accents/tirets = 404 garantis). Incident 2026-07-26 : bandeau collection cassé sur 51/69 dinos pour cette raison exacte.
- Tout nouveau dino : `id` latin minuscule dans dinos-data.js, assets nommés par l'id capitalisé, puis **régénérer** `gen-dinos-assets.mjs`. Un dino sans entrée `DINO_ASSETS` est invisible des jeux/collection.

## 🔒 TRITRI & WEX — surnom et prénom, PAS un univers (source unique, RE-FIGÉ 2026-09-11)

> Règle opérationnelle complète — c'est ICI qu'elle vit en détail. `studio/dino/CLAUDE.md` et
> `figees/encyclopedie.md` ne portent que le verrou daté et pointent ici. Défigeage explicite
> Papa Yann du 2026-09-11 qui remplace la version du 2026-06-03 (celle-ci prescrivait un « fil
> rouge » / une quête — **régression corrigée, ne doit jamais revenir**, voir L-D-83).

- 🔒 **Tritri = un surnom du Tricératops**, qu'on peut employer de temps en temps. Rien de plus.
- 🔒 **On peut dire UNE FOIS, dans l'audio, que c'est le dino préféré du garçon.** Une fois, pas davantage.
- ❌ 🔒 **AUCUNE quête, AUCUN fil rouge, AUCUN univers Tritri.** Pas de « on cherche d'où vient Tritri », pas de relance « y'avait Tritri ? » d'époque en époque, pas de retrouvailles mises en scène.
- 🔒 **Wex = le prénom du personnage enfant qui parle.** On ne le NOMME pas à voix haute : ni « Prêt, Wex ? », ni « Écoute, Wex », ni « c'est ton Tritri, Wex », ni « Wex l'a trouvé ». Il peut se glisser subtilement, jamais en apostrophe.
- 🔒 **Dans une Fiche dino, Tritri = 1 mention max** (2 pour le Tricératops) — le dino de la fiche est le centre, ses voisins sont nommés par leur espèce (PY 2026-09-05, L-D-75, porte `_verif-scripts-audio.cjs`).
- ❌ 🔒 **JAMAIS dire « Max »** dans un récit/audio. ❌ 🔒 **JAMAIS dire « doudou » ni « peluche » ni « nounours ».**
- ❌ 🔒 Ne pas casser le 4e mur (« le doudou d'un petit garçon »). Tritri vit DANS l'histoire, point.

## Règles dures (résumé — détail dans figées)

- 🔒 **Encyclopédie = vrai** : vrais noms + vraies dates. Terme savant nouveau → expliqué (« ptérosaure » → « reptile volant comme le Ptéranodon »).
- 🔒 **Échelle honnête** : aucune comparaison qui ment > 10 %. **Bus interdit dans les récits narrés** (OK en échelle de taille des fiches).
- 🔒 **5 onglets** : Familles (défaut, titres = noms scientifiques) · Ce qu'il mange (régimes alimentaires) · Le voyage (8 récits, avancement reset session) · **Les époques** (tri par période + la FLORE de l'époque, `DINO_PLANTES`) · **Le dico** (racines grec/latin, source `js/dinos-racines.js` généré). Liste faisant foi : `studio/dino/figees/encyclopedie.md` § 5 onglets.
- 🔒 **Audio** : « écoute » jamais « regarde » · Wex FR standard sans tic écrit · accroche menu 2-7 s · narrateur_h (menus) / narrateur_f (voyage) · eleven_v3 stability 0,4 · loudnorm.
- 🔒 **AVANT toute génération audio** : `grep -niE "max|doudou|peluche|bus" <texte>` → match (hors échelle) = STOP.

## Toujours

Papa Yann teste via GitHub Pages → **commit + push** après toute modif dino. Après correction → leçon `studio/dino/memory/TODO.md` (+ figée si règle). Screenshot/test avant de soumettre une modif UI.

---

_Créé 2026-06-03 avec le pôle DINO. Lie le code (site/) au pôle (studio/dino/) via path-scoping, mécanisme Anthropic pour règles ciblées indépendantes de l'emplacement._
