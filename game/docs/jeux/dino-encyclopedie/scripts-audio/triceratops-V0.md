# Script audio V0 — Tricératops · Duo Narrateur H + Wex

> **STATUT : V0 BROUILLON — pour relecture/challenge Papa Yann. AUCUNE génération lancée.**
> Structure validée : **mini-duos par bloc** (chaque bouton 🔊 de la fiche = un mini-dialogue), + 1 récap optionnel.

---

## Paramètres techniques (sources gravées — ne pas inventer)

| Élément | Valeur | Source |
|---|---|---|
| API | `text-to-dialogue` (multi-voix) | règle MILITAIRE `.claude/rules/audio.md` |
| Modèle | `eleven_v3` | idem |
| **Narrateur H** voice_id | `cbRcktt2xvoeFpdvW2wg` | `_VOICE-IDS-CASTING.md` |
| Narrateur H settings | stab 0.55 · sim 0.80 · style 0.20 · boost off | `voix-meta/narrateur-h.md` |
| **Wex** voice_id | `G54e8CyYslC2Y4ZupTlg` (v24 figé 2026-05-11) | `_VOICE-IDS-CASTING.md` L.68 + L.167 |
| Wex settings | stab 0.68 · sim 0.72 · style 0.18 · boost off | `personnages/wex/voix.md` |
| Tags v3 utilisés | `[curious] [gasps] [excited] [happily] [serious] [confident] [chuckles] [softly] [whispers]` — **tous ✅ validés MaxPlay** | `~/.claude/skills/audio-direction-elevenlabs/02-tags-catalog.md` |

**Règle d'écriture Wex** : on écrit en **FR standard normal**. Le voice_id Wex ajoute SEUL ses 7 tics à la lecture (sifflement s/ch, é parasite, bégaiement excitation, mélodie franc-comtoise…). On n'écrit JAMAIS les tics à la main. Max **2-3 tags par réplique**.

**Rôle de Wex (canon `wex/personnage.md`)** : observateur/catalyseur, pas protagoniste. Il pose les questions de Max, s'émerveille, fait une remarque tendre. Il ne récite jamais le savoir — c'est le Narrateur qui sait. Univers IMPLICITE : aucun système nommé, aucune morale plaquée.

---

## BLOC 1 — Le nom (bouton 🔊 sur le nom)

**NARRATEUR** `[happily]`
> Voici le Tricératops ! Son grand nom de savant, c'est Triceratops horridus.

**WEX** `[curious]`
> Tri-cé-ra-tops… Ça veut dire quoi ?

**NARRATEUR** `[softly]`
> « Face à trois cornes » ! Parce qu'il avait exactement trois belles cornes sur la tête.

**WEX** `[gasps]`
> Trois cornes ! Comme un chevalier avec son casque !

---

## BLOC 2 — La taille (bouton 🔊 sur les stats)

**NARRATEUR**
> Le Tricératops était grand ! Il mesurait neuf mètres de long — aussi long que deux voitures garées à la suite.

**WEX** `[excited]`
> Deux voitures ! Rien que lui !

**NARRATEUR** `[serious]`
> Et debout, il faisait trois mètres de haut — aussi haut que deux Papas l'un sur l'autre. Il pesait douze mille kilos.

**WEX** `[gasps] [softly]`
> Douze mille kilos… aussi lourd que deux éléphants. Il devait faire trembler le sol !

---

## BLOC 3 — Ce qu'il mange (bouton 🔊 sur le régime)

**NARRATEUR** `[happily]`
> Le Tricératops, lui, ne mangeait que des plantes. C'était un herbivore.

**WEX** `[curious]`
> Tout ce grand monsieur… juste des feuilles et des plantes ?

**NARRATEUR**
> Beaucoup, beaucoup de plantes ! Avec son bec dur, il coupait les branches toute la journée.

**WEX** `[chuckles]`
> Un gros gourmand de salade, alors !

---

## BLOC 4 — Son super-pouvoir (bouton 🔊)

**NARRATEUR** `[confident]`
> Son super-pouvoir : trois cornes et un grand bouclier en os autour de la tête.

**WEX** `[curious]`
> Un bouclier… mais pour se protéger de qui ?

**NARRATEUR** `[serious]`
> Du T-Rex ! Le Tricératops baissait la tête et fonçait avec ses cornes.

**WEX** `[excited]`
> Comme un taureau super costaud !

---

## BLOC 5 — Qui le chasse (bouton 🔊 sur ennemis)

**NARRATEUR** `[serious]`
> Son seul vrai danger, c'était le T-Rex.

**WEX** `[gasps]`
> Le T-Rex ! Il avait peur ?

**NARRATEUR** `[confident]`
> Même pas ! Il se défendait très bien. On a retrouvé des os de T-Rex avec des marques de cornes de Tricératops.

**WEX** `[excited]`
> Il a vraiment piqué un T-Rex ?! Le petit guerrier !

---

## BLOC 6 — Le sais-tu ? (bouton 🔊 fun fact)

**NARRATEUR** `[happily]`
> Le sais-tu ? Ses cornes faisaient un mètre de long — presque aussi grandes que toi !

**WEX** `[gasps]`
> Aussi grandes que moi… ouh là là.

**NARRATEUR** `[softly]`
> Et il vivait peut-être en troupeau, tous ensemble pour protéger les bébés.

**WEX** `[chuckles] [softly]`
> Tous ensemble pour les petits… J'aime bien ça, moi.

---

## RÉCAP — bouton 🎙️ « Écoute toute l'histoire » (haut de fiche, optionnel)

> Enchaînement des 6 blocs ci-dessus, sans répéter l'intro. ≈ 1 min 10. À générer en un seul `text-to-dialogue` pour garder la continuité des voix.

---

## NOTES DE RELECTURE — à challenger par Papa Yann

1. **Ton Wex** : curieux + émerveillé + une touche tendre en fin de bloc 6. Pas de blague lourde, pas de savoir récité. → OK ou plus drôle / plus sobre ?
2. **Longueur par bloc** : 4 répliques/bloc ≈ 10-14 s. Assez court pour l'attention de Max ?
3. **Le chiffre exact est toujours dit** (« neuf mètres », « douze mille kilos ») + comparaison juste derrière. Conforme à ta demande.
4. **Comparaisons** : voitures (longueur), Papas empilés (hauteur), éléphants (poids). Référentiel validé 2026-05-16.
5. **Contenu factuel** : tiré 1:1 de `dinos-data.js` (id `triceratops`). Si tu changes le contenu là-bas, ce script doit être réécrit.
6. **Univers implicite respecté** : aucun système/ennéatype nommé, pas de morale plaquée.

### Questions ouvertes
- [ ] Bloc 3 « gros gourmand de salade » — trop léger pour un herbivore de 12 t ? Ou ça fait sourire Max ?
- [ ] Bloc 5 « petit guerrier » — Tricératops n'est pas petit (9 m). Garder pour l'effet affectueux ou corriger en « le guerrier » ?
- [ ] Faut-il un bloc 0 « Wex présente » avant le bloc 1 (accroche) ou on entre direct dans le nom ?

---

_V0 rédigée 2026-05-16. Sources : `dinos-data.js`, `_VOICE-IDS-CASTING.md`, `wex/voix.md`, `wex/personnage.md`, skill `audio-direction-elevenlabs/02-tags-catalog.md`. Décision ton Wex à graver dans `narration/pmo/decisions.md` après validation auteur._
