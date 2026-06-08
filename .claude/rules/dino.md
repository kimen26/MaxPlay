---
paths:
  - "studio/dino/**"
  - "site/dev-dinos.html"
  - "site/js/dinos-data.js"
  - "site/js/dinos-images-local.js"
  - "site/js/dinos-images-grok.js"
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

## Règles dures (résumé — détail dans figées)

- 🔒 **Tritri** = running gag Wex (dino préféré). JAMAIS « Max », « doudou », « peluche ».
- 🔒 **Encyclopédie = vrai** : vrais noms + vraies dates. Terme savant nouveau → expliqué (« ptérosaure » → « reptile volant comme le Ptéranodon »).
- 🔒 **Échelle honnête** : aucune comparaison qui ment > 10 %. **Bus interdit dans les récits narrés** (OK en échelle de taille des fiches).
- 🔒 **3 onglets** : Familles (défaut, titres = noms scientifiques) · Ce qu'il mange (régimes alimentaires) · Le voyage (8 récits, avancement reset session).
- 🔒 **Audio** : « écoute » jamais « regarde » · Wex FR standard sans tic écrit · accroche menu 2-7 s · narrateur_h (menus) / narrateur_f (voyage) · eleven_v3 stability 0,4 · loudnorm.
- 🔒 **AVANT toute génération audio** : `grep -niE "max|doudou|peluche|bus" <texte>` → match (hors échelle) = STOP.

## Toujours

Papa Yann teste via GitHub Pages → **commit + push** après toute modif dino. Après correction → leçon `studio/dino/pmo/backlog.md` (+ figée si règle). Screenshot/test avant de soumettre une modif UI.

---

_Créé 2026-06-03 avec le pôle DINO. Lie le code (site/) au pôle (studio/dino/) via path-scoping, mécanisme Anthropic pour règles ciblées indépendantes de l'emplacement._
