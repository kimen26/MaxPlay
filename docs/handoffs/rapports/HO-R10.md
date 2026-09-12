# Rapport HO-R10 — Mini-jeux : dédoublonnage du runtime

**Statut brief :** rapport reçu

## Complément — décision orchestrateur sur la question 3 (liens `index.html` en dur)

Décision reçue : pour chacun des 23 fichiers, vérifier que `back-button.js`/le shell charge **et
rend effectivement** un bouton retour ; si oui retirer le `<a href="index.html">` en dur ; si non,
garder le lien et le dire. Vérification faite **au runtime** (Playwright, pas au grep statique) sur
les 23 fichiers : chargement de la page, comptage `.mp-back-btn` (bouton injecté par
`back-button.js`) vs `a[href="index.html"]:not(.mp-back-btn)` (ancien lien resté brut).

**Résultat : les 23 fichiers chargent `js/mj-shell.js`, qui charge `js/back-button.js`, mais
`autoReplace()` (déclenchée au `DOMContentLoaded`) ne trouve aucun élément à remplacer** — son
sélecteur cible `.back`, `.back-mj`, `.back-btn` ou `#hdr a[href*="index.html"]` (un **id** `hdr`),
alors que tous ces fichiers utilisent `class="hdr"` (une classe, pas un id) sans aucune des classes
`.back*` sur leur lien. `autoReplace()` ne **crée** jamais un bouton depuis rien : elle ne fait que
remplacer un élément existant qui matche déjà un sélecteur. Résultat runtime confirmé sur les 23 :
`mp-back-btn: 0` et l'ancien `<a href="index.html">` toujours présent dans le DOM, aucune erreur JS.

**Aucun des 23 jeux n'a donc de bouton retour rendu par le shell** → conformément à l'instruction,
**tous les 23 liens sont gardés tels quels**, aucune modification appliquée, aucun retest nécessaire
(rien n'a changé). Table complète :

| mj | back-button.js chargé | `.mp-back-btn` rendu | Action | Raison |
|---|---|---|---|---|
| mj-13a | oui | non | gardé | `class="hdr"` ≠ sélecteur `#hdr`, pas de `.back*` sur le lien |
| mj-13c | oui | non | gardé | idem |
| mj-15  | oui | non | gardé | idem |
| mj-20  | oui | non | gardé | idem |
| mj-22  | oui | non | gardé | idem |
| mj-34  | oui | non | gardé | idem |
| mj-35  | oui | non | gardé | idem |
| mj-37  | oui | non | gardé | idem |
| mj-38  | oui | non | gardé | idem |
| mj-39  | oui | non | gardé | idem |
| mj-40  | oui | non | gardé | idem |
| mj-42  | oui | non | gardé | idem |
| mj-47  | oui | non | gardé | idem |
| mj-48  | oui | non | gardé | idem |
| mj-49  | oui | non | gardé | idem |
| mj-50  | oui | non | gardé | idem |
| mj-52  | oui | non | gardé | idem |
| mj-53  | oui | non | gardé | idem |
| mj-54  | oui | non | gardé | idem |
| mj-55  | oui | non | gardé | idem |
| mj-56  | oui | non | gardé | idem |
| mj-57  | oui | non | gardé | idem |
| mj-59  | oui | non | gardé | idem |

Vérification faite avec un script Playwright jetable (créé dans `studio/minijeux/tests/`, supprimé
après usage — pas de fichier résiduel hors périmètre). Aucun fichier HTML modifié pour ce point,
donc aucun `npm run test:mj -- mj-XX` supplémentaire n'était nécessaire (rien à retester).

**Nouvelle question implicite** : ces 23 fichiers ont un vrai bouton retour visuel (le `<a>` brut
stylé en CSS local), donc l'expérience utilisateur n'est pas cassée — mais ils n'ont techniquement
aucun bouton conforme au design fantôme 48px unifié (`back-button.js` v2). Si l'objectif produit est
d'unifier visuellement, il faudrait soit ajouter `class="back"` sur leur `<a>` (1 attribut par
fichier, laisserait `autoReplace()` faire le remplacement), soit ajouter un conteneur `id="hdr"`.
Les deux sont des changements de markup, pas de simple suppression — hors de ce qui m'a été demandé
ici (« retirer le lien si le bouton est rendu »). Je ne les fais pas sans confirmation explicite,
puisque le shell ne rend actuellement rien à la place.

## Écart brief ↔ réalité du code (constat avant travail)

Le brief liste 7 points chiffrés (« 9 `speak()` locaux », « 5 confettis locaux », « 4 `<a href>` en
dur », « 4 mj `@font-face` », « 10 mj `lang.js` »). Après grep exhaustif sur tout `site/mj-*.html` +
`dev-dinos.html`, la réalité diffère nettement sur 3 des 7 points — le code a déjà été partiellement
nettoyé par des chantiers antérieurs (HO-G07, factorisations 2026-07/08 visibles dans les
commentaires). Détail point par point ci-dessous ; rien n'a été fait « au juger » hors des fichiers
autorisés — les écarts non traités sont posés en question.

## Travail réalisé (table mj → modification → verdict)

| mj | Modification | Verdict `npm run test:mj` |
|---|---|---|
| mj-15 | `speak()` local supprimé (0 appelant : dead code, wrapper `TTS.speak` jamais utilisé) | ✓ OK — push autorisé |
| mj-14 | `<script src="js/lang.js">` retiré (déjà chargé par `mj-shell.js`) | ✓ OK — push autorisé |
| mj-19 | idem lang.js | ✓ OK — push autorisé |
| mj-24 | idem lang.js | ✓ OK — push autorisé |
| mj-28 | idem lang.js | ✓ OK — push autorisé |
| mj-30 | idem lang.js | ✓ OK — push autorisé |
| mj-31 | idem lang.js | ✓ OK — push autorisé |
| mj-32 | idem lang.js | ✓ OK — push autorisé |
| mj-46 | commentaire obsolète corrigé (`design-compte/mockup-1`, fichier inexistant, retiré) | ✓ OK — push autorisé |
| mj-50 | `@font-face` Cursif retiré (→ `mp-theme.css`), commentaire obsolète corrigé (`design-lecture/mockup-01`) | ✓ OK — push autorisé (🔒 « toutes les lettres en cursif » PASS) |
| mj-51 | `@font-face` Cursif retiré | ✓ OK — push autorisé (🔒 « toutes les tuiles en cursif » PASS) |
| mj-52 | `@font-face` Cursif retiré | ✓ OK — push autorisé |
| mj-53 | `@font-face` Cursif retiré | ✓ OK — push autorisé |

`site/css/mp-theme.css` : `@font-face Cursif` ajouté une fois (`url('../design-shared/fonts/Cursif.ttf')`,
chemin recalculé car le CSS vit dans `site/css/` et non `site/`).
`site/js/avatar-picker.js` : lignes 5 et 16, commentaires « (même algo que atelier-couleurs.html) »
retirés — `atelier-couleurs.html` n'existe plus dans `site/` (probablement retiré HO-R07).

13 jeux touchés au total, **tous verts individuellement**.

## Points du brief non appliqués (constat + justification)

### 1. « 9 speak() locaux → TTS.speak » — partiellement inapplicable
Grep exhaustif : **0** appel brut `speechSynthesis.speak()` / `new SpeechSynthesisUtterance` ne
subsiste dans aucun mj ni `dev-dinos.html` — tout passe déjà par `TTS.speak`. Les 3 occurrences de
« speechSynthesis » restantes (mj-20, mj-31, dev-dinos ×2) sont des **commentaires**, pas du code.
Seuls 5 wrappers locaux `function speak(...)` existent (mj-15, mj-22, mj-28, mj-30, mj-31) :
- **mj-15** : wrapper mort (0 appelant) → supprimé.
- **mj-22, mj-28, mj-30** : wrappers fins qui fixent des options d'appel par jeu (`pitch`,
  `priority`) — pas une réimplémentation de la logique TTS, juste une config par défaut locale.
  Les remplacer obligerait à répéter `{pitch:1.05,priority:true}` à chaque site d'appel (2-3 par
  jeu) sans gain de dédoublonnage réel. Laissés en l'état — **question** ci-dessous.
- **mj-31** : wrapper non trivial (fallback 12s si `onend` ne se déclenche pas — bug navigateur
  documenté dans le commentaire du fichier). Inline risqué sans le brief l'autorisant explicitement.
  Laissé en l'état.

### 2. « 5 confettis locaux → MaxFX.confetti()/burst() » — inapplicable tel quel
`MaxFX` (`site/js/celebrations.js`) n'expose **pas** `confetti()` ni `burst()` — son API réelle est
`markPoint, finalStar, randomPoint, randomFinal, glow, hatch, eggEarned`. La fonction appelée dans
mj-09/mj-18/mj-19 (`confettiBurst(n)`) est déjà factorisée dans `js/feedback.js` (1 seule définition,
pas dupliquée) — les 3 mj ne font que l'**appeler**, ils ne la réimplémentent pas. `js/feedback.js`
n'est pas dans ma liste de fichiers autorisés. Rien à faire côté mj ; **question** ci-dessous sur
l'écart de nommage du brief.

### 3. « 4 `<a href="index.html">` en dur retirés » — périmètre bien plus large que 4
`back-button.js` cible les sélecteurs `.back`, `.back-mj`, `.back-btn`, `#hdr a[href*=index.html]`.
Recensement réel : **23 fichiers** ont un `<a href="index.html">&#8592;</a>` sans aucune de ces
classes. Traité selon la décision orchestrateur — voir § Complément en tête de ce rapport :
vérification runtime sur les 23, aucun ne rend de bouton shell (`.mp-back-btn` absent partout),
donc **tous les 23 liens sont gardés**, zéro modification.

### 6. Extraction `mj-kit.css` — proposition sans application (conforme à la consigne)
`site/css/mj-kit.css` existe déjà (53 lignes, dédié aux widgets de dessin œuf/pastille/QCM — pas au
gabarit général). Recherche de blocs `<style>` identiques dans ≥ 3 jeux (9 jeux ont un bloc `<style>`
> 100 lignes : mj-06, mj-09, mj-14, mj-15, mj-18, mj-20, mj-32, mj-35, mj-38) : un seul sélecteur
(`.choice-btn`) récurrent dans 3 fichiers, mais son corps de règles diffère à chaque fois (padding,
couleurs, gradient différents selon le jeu) — **pas de bloc réellement identique trouvé**. Aucune
extraction proposée : rien ne satisfait le critère « identique dans ≥ 3 jeux ».

## Portes de vérification

```
grep -lE "speechSynthesis|function speak\(|confettiBurst|@font-face" site/mj-*.html site/dev-dinos.html
```
Non vide (mj-09/18/19/20/22/28/30/31/35/40/50/51/52/53, dev-dinos.html) — voir justifications § 1/2
ci-dessus (commentaires, wrappers légitimes, appels à une fonction déjà factorisée ailleurs, ou
`@font-face` Fredoka One hors scope Cursif). Aucun résidu n'est une réimplémentation brute du shell.

```
cd studio/minijeux/tests && node audit-gabarit.mjs
```
`36 jeux audités · 20 cadre conforme · 16 avec dette · 0 BLOQUANT`. `git diff --stat` confirme
zéro ligne touchée dans un `<script>` inline (aucun hex couleur modifié) → dette hex **non
aggravée** (16 avant = 16 après, mêmes jeux).

Capture 360 px mj-50 (police Cursif) : ouverte et vérifiée visuellement — 4 tuiles-lettres (r, l,
v, d) rendues en attaché/cursive, pas en sans-serif de repli. Fichier :
`C:\Users\kimen\AppData\Local\Temp\claude\c--ProjetsPerso-Claude-Projects-MaxPlay\0a387b02-6f43-4e32-b3ab-dc7586fbcdad\scratchpad\mj-50-360.png`
(capturée à 360×740, panneau règle fermé, écran de jeu réel — pas le panneau d'instructions).

## Fichiers modifiés

- `site/css/mp-theme.css` (`@font-face` Cursif ajouté)
- `site/js/avatar-picker.js` (commentaires lignes 5, 16)
- `site/mj-14.html`, `mj-19.html`, `mj-24.html`, `mj-28.html`, `mj-30.html`, `mj-31.html`,
  `mj-32.html` (script `lang.js` retiré)
- `site/mj-15.html` (script `lang.js` retiré + `speak()` mort supprimé)
- `site/mj-46.html` (commentaire obsolète)
- `site/mj-50.html`, `mj-51.html`, `mj-52.html`, `mj-53.html` (`@font-face` Cursif retiré + mj-50
  commentaire obsolète)

Rien touché hors liste autorisée. Zéro commande git exécutée.

## Questions pour l'orchestrateur

1. **Point 1 (speak locaux)** — RÉPONDU (orchestrateur) : wrappers légitimes gardés tels quels.
2. **Point 2 (confetti)** — RÉPONDU (orchestrateur) : `confettiBurst` déjà factorisé, accepté tel quel.
3. **Point 3 (23 liens `index.html` en dur)** — RÉPONDU (orchestrateur) : voir § Complément. Les 23
   sont gardés (aucun bouton shell rendu). Nouvelle question ouverte : faut-il un futur brief pour
   ajouter `class="back"` (ou un conteneur `id="hdr"`) sur ces 23 fichiers afin d'activer réellement
   `back-button.js` et unifier visuellement le bouton retour (design fantôme 48px) ? Pas fait ici,
   changement de markup au-delà de « retirer un lien devenu redondant ».
4. **`mj-shell.js`** (hors périmètre HO-R10, propriété HO-R08) contient un commentaire ligne 60-62
   qui dit « les 8 jeux qui chargeaient déjà js/lang.js à la main » — confirmé exact (8, pas 10
   comme annoncé au brief). Signalé pour information, aucune modification faite (fichier non
   autorisé).

## Résumé (10 lignes max)

13 jeux touchés, tous verts (`npm run test:mj`), 0 BLOQUANT à l'audit-gabarit, dette hex inchangée
(16/36 avant = après). `@font-face` Cursif dédupliqué dans `mp-theme.css` (4 mj nettoyés), capture
360 px vérifiée à l'œil : cursive bien rendue. `<script lang.js>` redondant retiré de 8 jeux (chiffre
brief exact ici). 2 commentaires obsolètes + avatar-picker.js corrigés. Complément orchestrateur
(23 liens `index.html`) traité : vérification runtime Playwright sur les 23, aucun ne rend de bouton
shell (`class="hdr"` ≠ sélecteur `#hdr`), donc tous gardés tels quels, zéro modification, zéro
retest nécessaire. Nouvelle question ouverte : unifier le bouton retour visuel sur ces 23 (ajout
`class="back"`) est un changement de markup distinct, pas fait sans confirmation. Aucune extraction
CSS proposée (mj-kit.css existe mais aucun bloc `<style>` n'est identique dans ≥ 3 jeux). Zéro
commande git.
