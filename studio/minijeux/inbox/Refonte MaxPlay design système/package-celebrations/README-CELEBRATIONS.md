# MaxFX — module de célébrations MaxPlay

Paquet issu des explorations design (juillet 2026). Vanilla JS, **zéro dépendance**,
un seul fichier à inclure. Sélection et corrections validées par le papa de Max :

- décorations parasites supprimées (ronds pointillés, barres bumper, cœur, éclats décalés)
- l'onde d'arrivée est toujours **centrée sur la pastille**
- en jeu = **jeton** ✓ vert / ✓ orange / ✗ rouge doux — l'⭐ est réservée à la fin du jeu
- pas de prénom en dur : `finalStar(..., { name: pseudo })`
- l'orbite (`orbit`) grossit à l'arrivée ; l'aurore n'a plus de texte
- le rangement de l'étoile est NORMÉ : c'est la séquence `belt` qui s'en charge
  (la ceinture vit en haut, à côté de la progression — elle zoome depuis sa zone,
  l'étoile se place, elle repart s'y ranger). Aucun style ne « range » tout seul.

## Installation

```html
<script src="celebrations.js"></script>
```

Couleurs pilotées par le thème (optionnel, sinon défauts MaxPlay) :

```css
:root { --fx-green:#2fbf8f; --fx-orange:#f2a25c; --fx-red:#e06a5a;
        --fx-gold:#ffd166;  --fx-accent:#7fb4ff; }
```

## API

### `MaxFX.markPoint(fromEl, toEl, opts) → Promise`
Marque le point : le jeton part de `fromEl` (la bonne carte) vers `toEl`
(la pastille de la question dans la piste). La carte "pulse" automatiquement,
une gerbe part au départ, et la pastille "pop" avec une onde à l'arrivée.

| opt | valeurs | défaut |
|---|---|---|
| `style` | `bounce` `lightning` `rocket` `rainbow` `coin` `magnet` `pinball` `teleport` `bubble` `trampoline` `paw` `comet` | `bounce` |
| `result` | `green` (1ᵉʳ coup) · `orange` (après essai) · `red` (aidé/échec) | `green` |
| `badge` | caractère de la pastille | `✓` (`✗` si red) |
| `container` | élément englobant (l'écran du jeu) | ancêtre commun |

Quand la Promise se résout, mets à jour ta vraie pastille dans le DOM
(le badge animé est retiré).

```js
const ok = await checkAnswer(card);
await MaxFX.markPoint(card, pipEls[qIndex], {
  style: 'bounce',
  result: tries === 0 ? 'green' : 'orange',
  container: document.querySelector('.game-screen')
});
renderPip(qIndex, result); // ta pastille définitive
```

Recos d'usage : `bounce` au quotidien (le préféré) ; `paw` pour le thème
jungle/dino ; `rocket` pour le futur thème espace ; `comet`/`lightning` pour
les questions difficiles réussies du 1ᵉʳ coup.

### `MaxFX.finalStar(container, opts) → Promise`
La célébration de fin de minijeu. À réserver aux vrais moments : la version
`cinematic` UNIQUEMENT pour le sans-faute (rareté = magie).

| opt | valeurs | défaut |
|---|---|---|
| `style` | `cinematic` `rain` `supernova` `disco` `constellation` `tracer` `aurora` `ovation` `spiral` `billard` `moonwalk` `breathe` `flip` `orbit` `heartbeat` `slingshot` `rainbowspin` `stardust` | `cinematic` |
| `label` | texte final (`''` = aucun) | `GAGNÉ !` / `SANS-FAUTE !` / `BRAVO !` selon style |
| `name` | pseudo du profil, affiché par `ovation` | *(aucun)* |
| `avatars` | émojis mascottes pour `ovation` (mélangés au hasard) | `['🦖','🦕','🦣','🐣']` |
| `belt` | `{ earned: 2, total: 3, anchorEl: el }` → après l'animation, la **ceinture d'étoiles zoome depuis sa zone** (`anchorEl` = la mini-ceinture à côté de la progression, en haut) et s'affiche en grand au centre : étoiles gagnées pleines, la nouvelle se place avec un pop, restantes en pointillés, compte « 2 / 3 — encore 1 ! ». Puis elle repart se ranger dans sa zone. **Recommandé sur toutes les fins de jeu.** | *(aucun)* |

```js
if (score === total) await MaxFX.finalStar(screen, { style: 'cinematic',
  belt: { earned: stars + 1, total: 3, anchorEl: miniBeltEl } });
```

### `MaxFX.glow(el, opts) → Animation`
La "respiration" dorée (9e), réutilisable partout : bouton Jouer, carte
débloquée, pastille… `opts.scale` (1.2), `opts.duration` (1100), `opts.iterations` (3).

## Intégration MaxPlay

- Brancher après `stars.js` : quand une question est validée → `markPoint`,
  quand le jeu se termine → `finalStar`, puis persister comme aujourd'hui.
- Jouer le son en parallèle (victory-sounds.js) : lancer le son PUIS
  l'animation sans `await` entre les deux.
- Toutes les Promises se résolvent quand l'écran est propre (overlay retiré) —
  enchaîner la question suivante derrière.
- Perf : canvas + WAAPI, aucun listener global, tout est nettoyé après chaque
  effet. OK tablette.
- Règles d'or : micro-célébration ≤ 2 s ; ne JAMAIS punir l'erreur (pas de
  rouge agressif, pas de son négatif) ; `cinematic` réservé au 100 %.

## Fichiers

- `celebrations.js` — le module (`window.MaxFX`)
- `demo.html` — banc d'essai de tous les styles (ouvrir tel quel)
- `README-CELEBRATIONS.md` — ce fichier
