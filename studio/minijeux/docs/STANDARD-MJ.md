# STANDARD MINI-JEU MAXPLAY — source de vérité

> **Source unique des règles MJ.** [`.claude/rules/mini-jeux.md`](../../../.claude/rules/mini-jeux.md) (auto-chargée) ne fait que pointer ici.

> Gravé 2026-06-09 après validation Papa Yann sur 2 jeux de référence (`mj-gold-a` / `mj-gold-b`, supprimés lors de la purge 2026-08-10). Le standard vivant est désormais incarné par `site/js/mj-golden.js` + `css/mp-theme.css` (mutualisé 2026-08-01).
> Tout nouveau mini-jeu copie ce standard. le workflow MJ (`.claude/rules/mini-jeux.md` § Workflow) génère à partir de là.
> Référence visuelle de propreté : voir les golden + le style `css/style.css` partagé.

## 🔒 CONTRAT MJ v2 (décision Papa Yann 2026-07-19) — OBLIGATOIRE pour TOUT jeu

> Fait foi sur les piliers v1 ci-dessous quand ils divergent (billes → piste golden, confetti maison → bibliothèque MaxFX). Enforcement : `tests/audit-gabarit.mjs` (bloquant pre-push + CI) · `game-mj-reviewer` Section 7 · figée par jeu.

| # | Bloc | Implémentation canonique | Vérifié par |
|---|------|--------------------------|-------------|
| 1 | **Entrée catalogue complète** | `site/js/catalog.js` : `titre` court à impact (≤ 4 mots, l'action du jeu) · `category` = aire pédagogique · `emoji` = miniature PARLANTE (représente l'action, pas générique) · `desc` 1 ligne · `maxStars` · `access` · `status` | audit-gabarit (bloquant) + reviewer (impact/parlant) |
| 2 | **Gabarit shell** | `js/mj-shell.js` via `MJ.init({...})` — entête `.hdr` (← retour + emoji + titre), panneau règle 🧑‍🔬 (`regle:{...}`), bulle 💬 commentaires (cloud.js ordonné auto), consigne audio | audit-gabarit + reviewer |
| 3 | **Progression visible** | piste golden `.mp-track` (`mj-golden.js`, 4/6/8 questions) + étoiles ★★★ selon paliers `_PALIERS-DIFFICULTE.md` | reviewer |
| 4 | **Animation de POINT = bibliothèque** | chaque réponse → `MaxFX.randomPoint(fromEl, pipEl, {result})` — tirage aléatoire dans les styles homologués (`MaxFX.markStyles`). **JAMAIS d'animation maison en jeu.** | reviewer + grep anti ad-hoc |
| 5 | **Victoire = bibliothèque** | fin → `shell.G.showEnd` ; **sans-faute** → `MaxFX.randomFinal(container, {belt})` (tirage dans `MaxFX.starStyles`, 18 styles) ; avec fautes → fin sobre standard, jamais punitive | reviewer |
| 6 | **Extension autorisée UNIQUEMENT par la bibliothèque** | nouvelle célébration = l'ajouter dans `celebrations.js` (`MARKS`/`STARS`) → elle entre d'office dans le tirage de TOUS les jeux. Nouvelle mécanique = passer par `MECANIQUES.md` (étape -1 du workflow) | reviewer + PMO |
| 7 | **Anti-régression** | décisions validées → `figees/mj-XX.md` (LOI) + spec Playwright `tests/mj-XX.spec.mjs` verte avant push | hook figees-injector + harnais |

## Les 5 piliers obligatoires (v1 historique — voir CONTRAT v2 pour les points qui divergent)

| # | Pilier | Implémentation canonique |
|---|--------|--------------------------|
| 1 | **Entête** | `.hdr` (flèche ← + emoji + titre court). Jamais de header inventé. |
| 2 | **Bouton retour** | `<a class="back">` → `back-button.js` injecte la flèche sobre. |
| 3 | **Zone de jeu + mini-sons** | feedback immédiat < 200 ms. Son bon = `sndDing`, raté doux = `sndBuzz`. |
| 4 | **Progression en BILLES** | 8 billes (une par question), couleur selon nb d'essais (voir code couleur). PAS de score chiffré. |
| 5 | **Célébration finale** | confettis (`confettiBurst`) OU défilé bus (`busParade`) + son + phrase + Rejouer/Menu. |

## Code couleur des billes (essais) — PÉDAGOGIQUE, validé Papa Yann

Chaque bille = une question. Sa couleur dit comment Max l'a réussie :

| Essais | Couleur bille | Hex |
|--------|---------------|-----|
| **1er coup** | 🟢 vert | `#00c47a` |
| **2e coup** | 🟡 jaune | `#ffe066` |
| **3e coup** | 🟠 orange | `#F58443` |
| **au-delà / révélé** | 🔴 rouge | `#ff4455` |

La bille de la question courante est neutre (grise) tant qu'elle n'est pas répondue.

## Système d'étoiles & niveaux (validé Papa Yann 2026-06-11, remplace « 8 questions fixes »)

**ÉTOILE = SANS FAUTE** (toutes les questions au 1er coup = toutes les billes vertes). Jouer avec des erreurs ne donne JAMAIS l'étoile (incident : étoile obtenue avec 80 % d'erreurs → corrigé).

| Étoiles acquises | Niveau | Questions | Si sans-faute |
|------------------|--------|-----------|----------------|
| 0 | **Niveau 1** (simple) | **4** | → étoile 1, passe Niveau 2 |
| 1 | **Niveau 2** (plus dur) | **6** | → étoile 2, passe Niveau 3 |
| 2-3 | **Niveau 3** (MAX, on y reste) | **8** | → étoile 3 |

**Implémentation : brique partagée [`site/js/mj-golden.js`](../../../site/js/mj-golden.js)** (`Golden.setup/buildPips/notePip/showEnd`) + styles dans `css/style.css` § STANDARD GOLDEN. Ne PAS dupliquer cette logique dans un jeu.

**Célébration d'étoile (décision PY 2026-07-30 — remplace « toute étoile = grande fête »)** :
- **1re/2e étoile = DISCRET** : petit vol d'étoile direct vers le badge + ding (`Golden._discreetStar`). Pas de cinématique, pas de Mario.
- **3e étoile = ÉNORME (une fois par jeu)** : cinématique plein écran + Mario + « **Tu maîtrises ce jeu !** » — et le gain de cette partie est remplacé par l'**accessoire ÉTOILE** permanent du NID (`Collection.grantReward({mastered:true})`, cf. `MECANIQUES.md` § Boucle NID v4).
**Sans étoile** (erreurs) : écran encourageant, compliment de PROCESSUS — jamais punitif, jamais de récompense promise (D-003).
**Gain NID de fin de partie** : toujours UN seul gain annoncé (œuf teinté famille OU accessoire de soin), jamais mélangé avec l'étoile — séquence œuf PUIS étoile.

## Règles d'or NON négociables

- **Questions par niveau : 4/6/8** (pilotées par `Golden.setup`, jamais en dur).
- **ZÉRO score chiffré visible** (règle < 6 ans — `.scorebar` masquée par `style.css`).
- **PAS d'étoile ni d'overlay par bonne réponse** — son discret (`sndDing`) + bille colorée, c'est tout.
- **Zéro pénalité** : `QcmRetry` laisse réessayer, révèle la bonne réponse après 3 erreurs sans punir.
- **Zones tap ≥ 80px** (`var(--min-tap-size)`).
- **100 % local** : aucun CDN de librairie JS (offline-ready pour la PWA). Seule la font Google est tolérée (dégrade gracieusement).
- **Font Nunito + `css/style.css`** partagé.
- **Bus** : toujours `busSVG(color,textColor,num,width)` — JAMAIS d'emoji 🚌 ni de div CSS.

## Ordre canonique des scripts

```
sounds.js · victory-sounds.js · feedback.js · [bus-svg.js si bus] · data.js
· qcm-retry.js · tracker.js · comments.js · back-button.js
```

**`comments.js` est OBLIGATOIRE** (validé Papa Yann 2026-06-11) : injecte la **zone commentaire 💬 dans l'entête** (le parent note en live ce qui marche/bug, dictée vocale incluse). Fait partie du PILIER 1 (entête = flèche ← + 💬 + emoji + titre).

> 🚨 **Règle `cloud.js` NON NÉGOCIABLE** (gravée 2026-07-14, audit Supabase) : toute page qui charge `comments.js` (bulle 💬) OU appelle `Cloud.schedulePush()` DOIT charger `js/cloud.js` **après** `js/tracker.js`. La garde `window.Cloud && …` ne crash pas si cloud.js manque — elle **avale l'échec en silence** : les commentaires restent en localStorage et ne remontent jamais en base. Incident : 32 mini-jeux + index.html + lecture.html avaient la bulle 💬 sans cloud.js → 0 commentaire poussé depuis le début. Vérif : `grep -L cloud.js $(grep -rl comments.js site/*.html)` doit être VIDE.

## Gabarit `js/mj-shell.js` (décision Papa Yann 2026-07-14)

**UNE inclusion charge tout le cadre standard** (thème, golden, panneau 🧑‍🔬, tracking, cloud, célébrations) dans le bon ordre — plus jamais la liste de 14 scripts à la main :

```html
<body>
<div id="app"><!-- markup du jeu (le .hdr/#pips/consigne sont créés par le gabarit s'ils manquent) --></div>
<script src="js/bus-svg.js"></script>   <!-- libs SPÉCIFIQUES au jeu seulement -->
<script src="js/data.js"></script>
<script src="js/mj-shell.js"></script>  <!-- LE GABARIT -->
<script>
MJ.ready(function () {
  const shell = MJ.init({
    id: 'mj-XX', emoji: '🎯', titre: 'Titre du jeu',
    golden: true,              // piste 4/6/8 + étoiles dans la piste (sinon false)
    consigne: true,            // barre consigne (texte centré, tap = réécouter, audio AUTO)
    onRepeat: fn,              // optionnel : audio custom au tap consigne (MP3 voix réelle)
    regle: { picto, texte, etapes: [{t, d}…] }   // panneau savant fou 🧑‍🔬 (v3)
  });
  shell.setConsigne('…');      // met à jour + lit tout seul (false en 2e arg = silencieux)
  // gameplay : shell.G.notePip(i, attempts, fromEl) · shell.G.showEnd({replayUrl})
});
</script>
</body>
```

- Le gabarit garantit `cloud.js` après `tracker.js` (règle ci-dessus) → avis 💬 → table Supabase `annotations`.
- Panneau règle : s'ouvre TOUT SEUL à la 1ʳᵉ partie. Les specs harnais doivent le fermer (`#ri-ok`) avant de dérouler le jeu.
- ⚠ Le CONTENU du jeu (mécanique, aides 💡, difficulté par étoile) demande une réflexion cohérente PAR JEU — le gabarit ne norme que le cadre.

**Header MILITAIRE** (v2, Design System juillet 2026, remplace le gabarit inline v1) : garder le markup `.hdr` à la lettre, **zéro règle CSS `.hdr` locale** (`mp-theme.css` fait autorité). Ne jamais créer `.game-header`, `.header-text`, `.header-title`, `.header-sub` ou variante inventée. `back-button.js` injecte automatiquement la flèche ← ronde 44px.

## Célébrations disponibles (PILIER 5)

| Variante | Fonction | Quand |
|----------|----------|-------|
| Confettis denses | `confettiBurst(60)` + `sndBravo()` | défaut doux |
| Défilé de bus | `busParade()` (klaxon inclus) | jeux à thème bus |
| Étoile niveau (Mario) | animation étoile + `sndVictory()` | quand un palier de difficulté est débloqué |

## API briques partagées (ne rien inventer)

- **Sons** : `sndDing` `sndBuzz` `sndBravo` `sndVictory` `sndKlaxon` `sndCount` · `playEndSound(score,max)` `playErrorSound()`
- **Feedback** : `feedback(ok)` (son+overlay) · `confetti()` `confettiBurst(n)` · `busParade(lines,onDone)` · `shakeEl(el)` · `shuffle(a)` `pickRandom(a,n)`
- **QCM** : `QcmRetry.create()` → `QcmRetry.handle(state,ok)` (`outcome`: correct/wrong/reveal/ignored ; `attempts`) → `QcmRetry.revealCorrect(container)`
- **Progression** : `Tracker.logAnswer(ok)` + `Tracker.endSession(correct,total)` (alimente les étoiles)
- **Étoiles** : `Stars.get(id)` `Stars.max(id)` `Stars.isComplete(id)` (lecture seule)
- **Bus** : `busSVG(color,textColor,num,width)` · `LIGNES` (data.js : `{num,color,textColor,name}`)

## Règles Audio (Production) — Validées 2026-07-05

**Tout SFX/MP3 destiné au site DOIT avoir ~250 ms de silence en tête.**

**Raison** : Sur mobile/tablette (surtout Bluetooth), la sortie audio met 100-300 ms à se réveiller → l'attaque du son est coupée. Symptôme constaté par Papa Yann sur les 64 SFX ElevenLabs (2026-07-05), corrigé par `ffmpeg -af "adelay=250:all=1"` sur tout le lot (commit 79212a26).

**Commande canonique** :
```bash
ffmpeg -y -i in.mp3 -af "adelay=250:all=1" -codec:a libmp3lame -b:a 128k out.mp3
```

**Scope** : s'applique à toute future génération de sons (ElevenLabs text-to-sound-effects ou autres) AVANT commit sur `site/sounds/`.

**Vérification** : lire quelques secondes de silence au démarrage, puis l'attaque nette du son (pas de coupure).

## Cas particuliers connus

- Un jeu **mj-21 « Peins les bus ! »** existe déjà (catégorie couleurs). Ne pas créer de doublon « peindre le bus » sans le distinguer clairement.
