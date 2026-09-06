# HO-MJ-07 — Rapport es-es : pack i18n texte seul (37 jeux)

Statut : fait. 0 erreur/0 avertissement checker, bundle régénéré, Playwright 0 `pageerror` sur
mj-13a/mj-30/mj-48/mj-24 en `?lang=es-es`, panneau règle ouvert et relu sur les 4 captures.

## Fichiers écrits

- `studio/minijeux/i18n/es-es/strings.json` (créé) — même arborescence exacte que le canon FR :
  `_commun` (25 clés + sous-bloc `voix`, 40 phrases) + 37 jeux (`titre`, `regle.texte/etapes[].t/d`,
  `ui.*` le cas échéant, `voix.regle-mj-XX`).
- `site/js/i18n/mj-strings.es-es.js` (généré par `_gen-mj-strings-bundle.cjs es-es`).

## Portes (sortie exacte)

```
node studio/minijeux/tools/_check-mj-traduction.cjs es-es
--- check mj es-es ---
jeux 37/37
0 erreurs, 0 avertissements

node studio/minijeux/tools/_gen-mj-strings-bundle.cjs es-es
C:\ProjetsPerso\Claude_Projects\MaxPlay\site\js\i18n\mj-strings.es-es.js : 37 jeux
```

Aucun avertissement à justifier : les deux WARN transitoires (`_commun.ui.justeDuPremierCoup`/
`justeApresUnEssai`, chiffre `1` perdu dans « bien a la primera »/« bien tras un intento ») ont été
corrigés en gardant le chiffre (« bien a la 1ª vez », « bien tras 1 intento »), et mj-50/51/52/53
ont été retraduits en entier (titre/regle/voix) après un premier passage trop prudent qui les avait
laissés identiques au FR — corrigé en comparant à l'EN (témoin de structure), qui traduit bien ces
4 jeux normalement (seul le contenu phonétique réel — mots/lettres du jeu, vivant dans le HTML/JS,
hors strings.json — reste FR).

## Playwright (serveur statique node ad hoc, port 8791, `studio/minijeux/tests/`)

mj-13a, mj-30, mj-48, mj-24 en `?lang=es-es`, viewport 390×844 : **0 `pageerror`** sur les 4 runs.
Quelques `console.error` de type 404 sur des MP3 voix (`sounds/voix/es-es/phrases/*.mp3`) — attendu
et hors périmètre (brief = texte seul, zéro crédit ElevenLabs ; le jeu retombe sur le TTS `speechSynthesis`
de repli).

Captures dans `studio/minijeux/docs/handoffs/rapports/captures/` :
- `HO-MJ-07-es-es-mj-13a.png`
- `HO-MJ-07-es-es-mj-30.png`
- `HO-MJ-07-es-es-mj-48.png`
- `HO-MJ-07-es-es-mj-24.png`

**Ouvertes et relues (Read direct des PNG)** : panneau règle intégralement en espagnol sur les 4
(onglets « La regla »/« Opinión », bouton « ¡Lo entendí! », bouton audio « Escucha toda la regla »),
titres traduits (« El primer autobús », « Ordénalos por tamaño », « Todos suben », « Encuentra el
dinosaurio »), consignes de fond traduites et visibles (« ¿Cuántos pasajeros hay en el autobús? »,
« ¿Me encuentras el Pteranodon? »), accents/ñ/¿/¡ correctement rendus, noms de dinos localisés
(Triceratops, Pteranodon). Zéro mot français visible.

## Choix de traduction notables

- Registre `tú` partout (jamais `usted`), conforme à la charte.
- Unités restées métriques, chiffres identiques au FR (ex. mj-30/31 : mètres, millions d'années).
- Repères culturels bus/lignes (RER→Cercanías, Métro→Metro, Tram→Tranvía) : traduction du terme
  générique de transport, pas de changement d'échelle (règle charte dino appliquée par analogie).
- Pays (mj-22) : noms usuels espagnols standards (Reino Unido, Países Bajos, Chequia au lieu de
  République tchèque, etc.).
- mj-50/51/52/53 (contenu FR figé décision PY 2026-09-05) : `titre`/`regle`/`voix` traduits comme
  les autres jeux ; seuls les exemples de mots réellement lus par le jeu (`papa, maman, moto` en
  mj-52, `tri-cé-ra-tops` en mj-53) sont restés identiques au FR car ce sont les mots effectivement
  affichés/joués à l'écran (code `site/mj-52.html` ligne 117-118) — les traduire aurait créé une
  incohérence texte/écran.
- `mj-30.ui.unite.reperEnfant` : « 1 m (toi) » → « 1 m (tú) » pour rester cohérent avec le tutoiement.

## Portée non touchée

`studio/minijeux/i18n/pt-br/` et `site/js/i18n/mj-strings.pt-br.js` : non touchés (agent parallèle).
Aucun `mj-XX.html` modifié. Aucun `git`. Aucun sous-agent.
