---
paths:
  - "dino/**"
  - "game/web/dev-dinos.html"
  - "game/web/js/dinos-data.js"
  - "game/web/js/dinos-images-local.js"
  - "game/web/js/dinos-images-grok.js"
  - "game/web/audio/dinos/**"
  - "game/web/img/dinos/**"
---

# Pôle DINO — règles auto-chargées (path-scoped)

> Chargé dès que Claude touche un fichier dino, **où qu'il vive** : le dossier `dino/` (gouvernance + contenu) OU le code déployé sous `game/web/` (dev-dinos, data, audio, img).
> C'est le **pont** entre le code (dans game/) et le pôle (dans dino/), puisqu'un nested CLAUDE.md ne se charge que selon l'emplacement du fichier.

## Réflexe à l'ouverture

1. Lire [`dino/CLAUDE.md`](../../dino/CLAUDE.md) (règles pôle) + [`dino/figees/encyclopedie.md`](../../dino/figees/encyclopedie.md) (🔒 décisions verrouillées — le hook `figees-injector` les réinjecte aussi avant un Edit).
2. Ne jamais répondre de mémoire sur un chiffre/casting → invoquer `dino-pmo` en lecture de [`dino/pmo/INVARIANTS.md`](../../dino/pmo/INVARIANTS.md).

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

Papa Yann teste via GitHub Pages → **commit + push** après toute modif dino. Après correction → leçon `dino/pmo/backlog.md` (+ figée si règle). Screenshot/test avant de soumettre une modif UI.

---

_Créé 2026-06-03 avec le pôle DINO. Lie le code (game/web/) au pôle (dino/) via path-scoping, mécanisme Anthropic pour règles ciblées indépendantes de l'emplacement._
