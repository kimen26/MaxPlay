# HO-MJ-06 — Rapport : traduction EN des consignes parlées (36 regle-mj-XX + 45 phrases)

Statut : fait. 0 erreur checker, bundle régénéré, Playwright 3/3 jeux (mj-15, mj-30, mj-48) ×
`?lang=en` / sans `?lang` : aucun MP3 FR demandé en EN, aucune parole FR captée en EN, 0
pageerror imputable à ce lot (1 pageerror FR pré-existant sur mj-48, MP3 déjà absent avant HO-MJ-06,
non lié).

## Ce qui a été fait

1. **Inventaire** : 81 slugs hors domaine dino (36 `regle-mj-XX` + 45 phrases partagées) extraits
   de `site/js/textes-jeux.js` (5 slugs de périodes géologiques exclus, propriété du pôle DINO).
2. **Traduction** EN orale (US, 4 ans, unités impériales déjà en place côté `strings.json` pour
   mj-30, noms propres gardés) dans `studio/minijeux/i18n/{fr,en}/strings.json` : clé `voix.<slug>`
   par jeu pour les 36 `regle-mj-XX`, `_commun.voix.<slug>` pour les 45 phrases partagées. Le FR
   est copie exacte de `textes-jeux.js` (référence du checker).
3. **Branchement** :
   - `site/js/mj-i18n.js` : nouvelle fonction `MJi18n.voix(gameId, slug, frFallback)` — cherche
     `MJ_STRINGS[gameId].voix[slug]` puis `MJ_STRINGS._commun.voix[slug]`, repli FR sinon.
   - `site/js/victory-sounds.js` : `_repliCanonique(slug, fallbackText)` n'impose plus le texte
     FR de `TEXTES_JEUX` que si `Lang.current() === 'fr'`. En langue non-FR, elle consulte
     `MJi18n.voix()` (le pack l'emporte) puis retombe sur le fallback de l'appelant — jamais de FR
     forcé en `?lang=en`. `SoundPool.phrase()`/`voiceLine()` cherchent le MP3 dans
     `sounds/voix/<lang>/phrases/<slug>.mp3` (et `sounds/voix/<lang>/{f,h,wex}/<slug>.mp3`) quand
     la langue active n'est pas FR — convention reprise du doublon multilingue `_doublonInvite`
     déjà existant (`sounds/voix/<code>/<voix>/<mot>.mp3`), aucune nouvelle inventée. MP3 absent →
     TTS anglais direct, jamais de repli sur le fichier FR.
4. **Scripts audio EN** : `studio/minijeux/i18n/en/scripts-voix.md`, 81 blocs `### <slug>`,
   `**NARRATEUR H** [tag] : texte` (voix unique, miroir `sounds/voix/phrases/`), tags de la liste
   blanche `TAGS_OK` de `_verif-scripts-audio.cjs`, mêmes règles que
   `studio/dino/content/i18n/en/scripts-hors-fiche/*.md` (≥1 tag/ligne, jamais en fin, jamais
   avant ponctuation, jamais 2 tags collés) — vérifié programmatiquement contre ces 4 règles :
   81/81 blocs conformes.
5. **Checker étendu** : `studio/minijeux/tools/_check-mj-traduction.cjs` valide désormais
   `ref.voix` par jeu (miroir de `ref.ui`) — `_commun.voix` était déjà couvert (sous-clé de
   `_commun`, parcours récursif existant de `checkUiTree`).

## Chiffres

- 81 phrases traduites (36 `regle-mj-XX` + 45 phrases partagées).
- **11 663 caractères EN** (hors tags eleven_v3) dans `scripts-voix.md` → ≈ **23 326 caractères**
  au coût STS ×2 (repasse voix maison).

## Portes

```
node studio/minijeux/tools/_check-mj-traduction.cjs en
  jeux 37/37, 0 erreurs, 3 avertissements (tous pré-existants HO-MJ-04 : mj-30 unité enfant-repère,
  mj-49 titre sans "10", mj-18 faux positif marqueur FR)

node studio/minijeux/tools/_gen-mj-strings-bundle.cjs en
  site/js/i18n/mj-strings.en.js régénéré, 37 jeux

cd studio/minijeux/tests && node audit-gabarit.mjs mj-15 / mj-30 / mj-48
  0 BLOQUANT sur les 3 (dette hex pré-existante mj-15/mj-30, non liée)
```

Playwright (mj-15, mj-30, mj-48 × `?lang=en` et sans `?lang`, `file://`, hook sur
`speechSynthesis.speak` + requêtes réseau `.mp3`) :
- **Sans `?lang`** : texte parlé FR inchangé (ex. mj-15 « Lequel ne va pas avec les autres ? »),
  MP3 demandé = `sounds/voix/phrases/<slug>.mp3` (FR), comportement strictement identique à avant.
- **`?lang=en`** : texte parlé = la traduction EN complète du pack (accroche + étapes + phrase de
  clôture), MP3 demandé = `sounds/voix/en/phrases/<slug>.mp3` (404 attendu — MP3 EN pas encore
  générés, TTS anglais prend le relais) — **aucune requête vers le MP3 FR**, **aucune parole FR
  captée**. Les `ERR_FILE_NOT_FOUND` observés dans les pageerrors sont ces 404 EN attendus, pas
  des régressions.

## Pièges traités

- **`SoundPool.repliCanonique` écrasait le repli déjà traduit** : avant ce lot, le canon FR de
  `textes-jeux.js` gagnait toujours sur le fallback de l'appelant dès qu'ils divergeaient — or en
  `?lang=en`, le fallback reconstruit par `regle-info.js` (à partir de `texte`/`etapes` déjà
  fusionnés par `MJi18n.regle`) EST la bonne traduction EN : la règle « la table gagne » aurait
  donc réinjecté du FR à la place. Fix : le canon FR ne s'applique qu'en langue FR ; en langue
  non-FR, `MJi18n.voix()` (le pack, pas le texte reconstruit) gagne à la place — robuste même si
  un appelant (ex. la phrase de clôture codée en dur dans `regle-info.js`, hors périmètre des
  fichiers autorisés) n'a pas lui-même de fallback traduit.
- **Convention MP3 par langue non documentée** : aucune trace de `sounds/voix/<lang>/phrases/`
  dans `_BANQUE-SONS.md`. Repris le seul précédent existant dans le code
  (`_doublonInvite` : `sounds/voix/${code}/${voix}/${mot}.mp3`) plutôt que d'inventer une
  structure nouvelle.
- **mj-40 faux avertissement chiffres** : ma première traduction disait « 2-star and 3-star
  levels » (chiffres arabes) alors que le FR garde les glyphes `★★`/`★★★` sans chiffre — corrigé
  pour matcher le FR et faire disparaître l'avertissement du checker.
- **Session concurrente sur le même repo** : `studio/minijeux/i18n/{fr,en}/strings.json` sont
  ressortis déjà commités dans HEAD (`171e7a84`, HO-MJ-05) alors que je ne les avais pas commités
  moi-même — la session HO-MJ-05 tournant en parallèle (mj-20/22/42/14) a intégré mes deux fichiers
  strings.json dans un de ses commits (working tree/index git partagés entre sessions). Contenu
  vérifié identique à ma traduction (pas de perte, pas d'écrasement), mais paternité du commit
  mélangée — signalé à Papa Yann, rien de plus fait côté git (contrainte « aucun git » du brief
  respectée : aucun commit de ma part).

## Contraintes respectées

Fichiers touchés : `site/js/mj-i18n.js`, `site/js/victory-sounds.js`,
`studio/minijeux/i18n/{fr,en}/strings.json`, `studio/minijeux/i18n/en/scripts-voix.md`,
`site/js/i18n/mj-strings.en.js` (régénéré), `studio/minijeux/tools/_check-mj-traduction.cjs`, ce
rapport. Aucun `mj-XX.html` touché, `textes-jeux.js` intact. Aucun ElevenLabs, aucun `git` (commit
survenu via la session concurrente HO-MJ-05, pas par moi), aucun sous-agent, commandes node depuis
la racine, aucun serveur lancé (tests `file://`), fichier temporaire de scratch
(`studio/minijeux/tests/_tmp-ho-mj-06-check.mjs`) supprimé en fin de tour.
