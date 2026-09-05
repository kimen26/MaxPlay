# Accroches menu — Familles + Régimes (voix Narrateur H)

> Textes FIGÉS des accroches jouées **à l'entrée** d'une famille (onglet « Les familles ») et d'un régime (onglet « Ce qu'il mange »).
> Voix : **Narrateur H** `cbRcktt2xvoeFpdvW2wg`. Modèle : `eleven_multilingual_v2` (mono) — SAUF carnivore (voir ⚠️).
> But : remplacer la **dame TTS** par la vraie voix (lecture auto à l'entrée, plus de bouton 🔊).
> Source étymo : `content/data/racines.json`. Validé Papa Yann 2026-06-09.

## 👪 Familles (9) — fichier `menu-fam-<id>.mp3`

| id | Texte (étymo découpée + image fun) |
|----|------------------------------------|
| `trex` | Théropodes ! Théro = bête sauvage, pode = pied. Les rois chasseurs sur deux pattes — que de la viande ! |
| `cou_long` | Sauropodes ! Sauro = lézard, pode = pied. Les géants au cou plus long que des girafes, qui broutent tout là-haut ! |
| `arme` | Thyréophores ! Thyréo = bouclier, phore = porter. Les chevaliers en armure… qui mangent des plantes ! |
| `cornu` | Cératopsiens ! Cérat = corne, ops = face. Les cornus, experts en brochettes de vilain ! |
| `bec` | Ornithopodes ! Ornitho = oiseau, pode = pied. Les becs de canard qui broutent en grande bande ! |
| `raptor` | Dromæosaures ! Dromæo = qui court vite, saure = lézard. Les petits ninjas à griffes, malins et rapides ! |
| `pterosaures` | Ptérosaures ! Ptéro = aile, saure = lézard. Les ailes de peau comme des chauves-souris géantes — le plus grand, large comme un petit avion ! |
| `enaliosaures` | Énaliosaures ! Enalio = de la mer, saure = lézard. Pas des dinos : des reptiles géants de la MER ! |
| `volant` | Avant les dinosaures ! Lui, le Dimétrodon, vivait bien AVANT les dinos — un cousin des mammifères, comme toi ! |
| `mammiferes` | Les mammifères ! Des bêtes à poils dont la maman fait du lait — comme toi ! Ici : mammouth et smilodon ! |
| `oiseaux` | Les oiseaux ! Les petits-cousins des dinos — les seuls qui restent ! Le Titanis, l'oiseau-terreur ! |

> ➕ `mammiferes` + `oiseaux` ajoutés 2026-08-03 (Cénozoïque — les 2 familles sans source Lunii). Même voix/modèle que les 9 autres.

## 🍽️ Régimes (4) — fichier `menu-regime-<cat>.mp3`

| cat | Texte (racine latine + fun) |
|-----|------------------------------|
| `carnivores` | ⚠️ Les… CAR-NI-VORES ! « Carni », en latin, c'est la viande. « Vore », en latin, c'est dévorer ! Les dévoreurs de viande ! |
| `herbivores` | Les herbivores ! « Herbi », c'est l'herbe, les plantes. « Vore », dévorer ! Des dévoreurs de salade géante — gloup, toute la feuille ! |
| `piscivores` | Les piscivores ! « Pisci », en latin, c'est le poisson ! Splash — ils gobent les poissons tout crus, sans fourchette ! |
| `omnivores` | Les omnivores ! « Omni », ça veut dire « tout » ! Ils mangent de tout… comme les petits humains. Comme TOI ! |

## ⚠️ Note carnivore — le « rire maléfique »
Le ton « annonce qui fait peur + rire » voulu par Papa Yann a besoin des **tags v3** (`[dramatic tone]` `[laughs]`). Or l'outil mono des accroches = `eleven_multilingual_v2` (PAS de tags). **2 options** :
- **v2** : carnivore en `stability` basse (~0,25) + texte en MAJUSCULES → ton dramatique, **mais pas de vrai rire**.
- **v3** : générer le carnivore via le tool récits (`studio_audiobook_from_segments_v2_dialogue`, eleven_v3) avec les tags → **vrai rire**, petite exception au « accroche = mono ».

## Câblage (à faire)
- Lookup `MENU_FAM_VOICE[famId]` / `MENU_REGIME_VOICE[catId]` → MP3, fallback `speakText` (comme `MENU_VOICE`).
- Joué **auto** à l'entrée de la grille (remplace les `speakText` de `showGridFamille`/`showGridRegime`).
- Retirer la **dame** : boutons 🔊 D (bandeau famille) + G (intro menu famille) + tap-nom E + petits taps F (Pangée/Extinction secondaires).

## 🗂️ Onglets (2 accroches ajoutées 2026-09-05) — fichiers `menu-epoques.mp3`, `menu-dico.mp3`

> Les onglets « Les époques » et « Le dico » n'avaient que le repli TTS navigateur (`tts_fallback_epoque` / `tts_fallback_dico` de `site/js/dino-ui.js`). Texte identique au repli, tags eleven_v3 ajoutés, Narrateur H seul, text-to-dialogue. Branchement : `MENU_VOICE.epoque` / `MENU_VOICE.dico` dans `dev-dinos.html`.

| clé | Texte tagué |
|-----|-------------|
| `epoque` | [excited] Range les dinosaures par époque ! [curious] Du Permien, avant les dinosaures, [amazed] jusqu'à aujourd'hui. |
| `dico` | [excited] Les noms des dinos sont faits de petits mots de savants ! [warmly] Touche un mot pour l'écouter. |
