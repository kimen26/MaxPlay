# Synthèse Lecteurs — STORY-002 « La Libellule impossible » (Panel v2, VAGUE 6, corpus 14 versions)

> **Re-panel COMPLET sur les 14 versions régénérées** (2026-07-11). Vague 6.
> La version `deepseek-reco` jugée ici était **CORROMPUE** (bug de génération — texte en fragments illisibles :
> « fréro-déglingo-écer », « pipillule », « un ceil qui hue sans pharse bras va »). Elle a **depuis été régénérée**.
> **Son rang est NUL et non significatif** : les 12 fiches la placent unanimement dernière (14ᵉ) *parce que le fichier est cassé*,
> pas parce que le texte est mauvais. **Elle est EXCLUE du classement de fond** — aucune conclusion éditoriale ne peut en être tirée.
> Son verdict réel n'existera qu'après un re-panel sur la version propre.

---

## 0. Dispositif (Panel v2 hétérogène — DEC-PANEL-V2)

**12 appels = 4 groupes de profils × 3 modèles hétérogènes.** Chaque appel a lu **les 14 versions** et rendu 2 tranches d'âge (4 + 7 ans) + un classement complet des 14 + retours texte libre (pas de note sur 10, pas de jargon).

| Groupe | Modèle 1 | Modèle 2 | Modèle 3 |
|--------|----------|----------|----------|
| 1 — Garçon seul | Sonnet 4.6 (agent) | **Kimi K2.7-Code** (CLI) | Haiku 4.5 (agent) |
| 2 — Fille seule | Sonnet 4.6 (agent) | **Kimi K2.7-Code** (CLI) | Haiku 4.5 (agent) |
| 3 — Dyade papa | Sonnet 4.6 (agent) | **Kimi K2.7-Code** (CLI) | DeepSeek V4-Pro (CLI) |
| 4 — Dyade maman | Sonnet 4.6 (agent) | **Kimi K2.7-Code** (CLI) | DeepSeek V4-Pro (CLI) |

**Statut canal Kimi : ✅ présent sur les 4 groupes** (via `infra/mcp/call-llm.mjs`, fallback Bash 540 s — le MCP `ask_kimi` sature en transport sur ces prompts lourds ~14 textes). Les 3 modèles sont réellement hétérogènes dans chaque groupe.

12 fiches produites : `5-lecteurs-temoins/G{1-4}-<profil>-<modèle>.md`.

⚠️ **Rappel méthodologique (leçon vague 5)** : le panel mesure **l'acceptable robuste**, PAS le goût de Papa Yann. Sur STORY-002 vague 4, les 2 champions du panel ont été rejetés par l'auteur. **La lecture annotée de Papa Yann reste l'instrument principal** — ce classement l'informe, il ne le remplace pas.

---

## 1. TOP 5 CONSOLIDÉ (sur 14, rang moyen des 12 fiches — plus bas = meilleur)

> deepseek-reco exclue (corrompue, rang NUL). Classement de fond sur les 13 versions valides.

| # | Version | Rang moyen | Best / Pire | Top-3 | Fond | Lecture |
|---|---------|-----------|-------------|-------|------|---------|
| **1** | **claude-sonnet-def** | **3.0** | 1 / 11 | **9/12** | 0/12 | **Écrasant. Le dominant incontesté de la vague 6.** Callback **« Presque / Presque pas »** de Wex (rejoué physiquement par les enfants), **caillou plat** comme ancrage spatial clair, Juju qui se secoue « comme un chien mouillé », « Gagné » murmuré. Nono s'arrête sans le dire, la main s'ouvre, la libellule vient sur ses doigts. Consensus inter-modèles le plus fort du corpus. Seul reproche minoritaire (G3-kimi, G4) : dialogues à tirets un peu moins fluides à l'oral que les guillemets + « caillou plat »/« Nono s'arrête » demandent parfois un mot d'explication. |
| **2** | **claude-opus-reco** | 5.5 | 1 / 11 | 4/12 | 0/12 | **Solide, jamais dans le fond.** La libellule se pose sur **Juju** (variante plébiscitée : « elle a couru, elle l'a eue », récompense claire pour la petite). Callback **têtards qui fuient / reviennent « comme si de rien n'était »** (élégant, mais capté surtout par les 7 ans). Nono dit « Vas-y » et la libellule décolle de son geste. Reproches : « bleu comme un fil électrique » à expliquer ; **notes d'intention non retirées en fin de fichier** cassent la lecture au coucher (défaut de FORME à corriger, pas de fond). |
| **3** | **claude-sonnet-reco** | 5.67 | 1 / 9 | 4/12 | 0/12 | **Le plus régulier après sonnet-def — jamais top pur, jamais fond.** Ambiance matinale sensorielle (« l'étang dort, tout plat, tout gris de matin »), **« Chhh » de Wex** mimé spontanément par les enfants, ailes « fines comme du papier de bonbon », fin en écoute de l'étang « qui continue sa vie sans eux ». Reproches convergents : **ouverture trop longue/poétique** pour les 4 ans (« je veux qu'ils courent, pas qu'ils dorment »), « berge » / « papier de bonbon » demandent une pause au pire moment (le suspense). |
| **4** | **kimi-k26-thinking** | 6.33 | **1** / 13 | 5/12 | 2/12 | **Polarisant — meilleure ambiance de groupe, mais fin qui relance.** Jeu de rôle « celui qui arrive dernier est une grenouille / libellule » adoré (ludique, bouclé), dialogues ping-pong « Là ! Par là ! Non là ! » qui font sentir la course. #1 chez G1-son. **DEUX réserves** : (a) le « Là ! Par là ! » **répété trop longtemps** perd les petits (« je vois plus qui court où ») ; (b) **la fin repart en course** (« les pieds nus repartirent ») → tuée par les dyades coucher (G4 : 9ᵉ, 13ᵉ). Contre-goût auteur « fin qui repart ». |
| **5** | **claude-opus-def** | 6.92 | 1 / 14 | 1/12 | 3/12 | **Le plus bimodal du corpus — clivant.** Boucle **caillou posé (pas lancé) au début ET à la fin** adorée (G4-son #4, G4-kimi #1 : « l'histoire referme son cercle toute seule »). MAIS jugé **« trop littéraire / adulte » pour un 4 ans au coucher** par plusieurs (G2-hai 12ᵉ, G3-deep 11ᵉ, G4-deep **14ᵉ** explicite : « la petite a besoin de concret, pas de poésie descriptive »). Pose sur le **genou** (moins naturel qu'une main). « se moque de nous » abstrait à 4 ans. Réservoir de greffe (la boucle du caillou) plus qu'une base. |

*Suivent, hors top 5 :* 6. grok-reco (7.0 — lisible mais pose sur **roseau tenu** non-contact, « c'est pas sur eux », + « On recommence ? » relance) · 7. claude-haiku-reco (7.25 — « sérénité qui rayonne » = mot d'adulte récurrent, top ET flop) · 8. claude-haiku-def (7.33 — « quatre-vingt-dix degrés » accroche la langue, trop d'adjectifs) · 9. kimi-k26-instant (7.5 — pose sur poignet de Juju bien reçue MAIS **fin « Encore ! » qui replonge dans l'eau** + contact « main sur la poitrine/corps collés » jugé bizarre) · 10. kimi-reco (8.42 — **« araignon d'eau »** tue le rythme partout, digression rondin) · 11. kimi-reco-guide (8.42 — **« Ploc. Ploc. Ploc. »** adoré des tout-petits et des dyades coucher MAIS « trop bébé / liste / didactique » pour les 7 ans → hyper-clivant) · 12. deepseek-def (8.75 — pose sur l'ongle tendre, mais **« J'ai faim » de Wex casse net** le moment magique, unanime) · 13. grok-def (9.0 — doux mais sage, fin « on la reverra peut-être » neutre) · **14. deepseek-reco (NUL — corrompue, exclue).**

---

## 2. PATTERNS TRANSVERSES (convergence inter-modèles = signal robuste)

**Ce qui gagne** (cité en positif par ≥ 6 fiches, tous modèles) :
- **Le callback / refrain d'un petit mot** (« Presque / Presque pas », « Ploc. Ploc. Ploc. », caillou début-fin) : les enfants **rejouent physiquement** le mot répété. C'est LE moteur mémoriel de la vague 6, sonnet-def le tient le mieux.
- **La clarté de « qui fait quoi » au pivot** : Juju percute/heurte Nono par accident → elle se fige → la libellule vient. Presque unanime comme moment préféré.
- **La pose PRÉCISE et VISIBLE sur la peau** (main/doigts/poignet au contact des deux enfants). Les petits « retiennent l'image posée, pas le vol ».
- **La libération sobre** : Nono ouvre la main / « Vas-y », la libellule repart d'elle-même. Personne ne la met en cage. « Gagné » murmuré → on gagne sans attraper.
- **L'ancrage spatial concret** (caillou plat, étang « large comme un tapis ») avant l'action.

**Ce qui perd** (cité en négatif par ≥ 5 fiches) :
1. **La FIN qui repart / relance l'excitation** juste après le silence magique : kimi-k26-instant (« Encore ! » + replonge), kimi-k26-thinking (nouvelle course), grok-reco (« On recommence ? »), deepseek-def (« J'ai faim »). **Tueur n°1 côté dyade-coucher, unanime chez G4** : « c'est l'inverse de l'endormissement ». Confirme le contre-goût auteur « chute-pirouette / fin qui repart ».
2. **Les mots d'adulte** qui font buter la lecture à voix haute : **« sérénité qui rayonne »** (haiku-reco, cité par presque toutes les fiches), « quatre-vingt-dix degrés » (haiku-def), « pivotait » (kimi-instant), « berge » (sonnet-reco), « se moque de nous » (opus-def).
3. **La pose sur une surface « bizarre » non-contact** : **roseau tenu** (grok-reco : « c'est pas sur eux, ça touche moins »), **genou** (opus-def : « pourquoi le genou ? »). Moins fort que la peau au point de contact.
4. **L'ouverture trop descriptive / digression avant la libellule** : « araignon d'eau » + rondin (kimi-reco, tue le rythme partout), début « poétique » long (sonnet-reco, opus-reco). « Je m'endors avant qu'il se passe quelque chose. »
5. **Défaut de FORME — notes d'intention laissées en fin de fichier** (opus-reco, un cas de sonnet-def signalé) : « les notes après le tiret gâchent la lecture au coucher ». À nettoyer avant tout rewrite.

**Divergence d'âge / de profil notable** :
- **kimi-reco-guide** et **kimi-k26-thinking** sont les plus **clivants par profil** : les onomatopées/jeux (« Ploc », « grenouille ») cartonnent chez les **4 ans et les dyades-coucher** (G4-son #1, G3-son #2, G3-deep) mais sont jugés **« bébé / on s'y perd »** par les **7 ans** (G1-hai, G3-kimi 13ᵉ).
- **La cible primaire = 4 ans + coucher** tranche : une fin qui relance disqualifie, même si le corps du texte est bon (cas kimi-k26-thinking, redescendu par G4).

---

## 3. CITATIONS CLÉS (mots d'enfant / de parent)

- **claude-sonnet-def** (G4-maman-sonnet) : *« "presque pas" à la fin en écho au début — elle a remarqué le mot répété toute seule : 'c'est pareil qu'avant !' »* — le callback absorbé sans qu'on l'explique.
- **claude-sonnet-def** (G3-papa-sonnet) : *« mon enfant l'a rejoué tout seul en secouant la tête après la lecture, signe qu'il a vraiment absorbé le mot et son écho. »*
- **claude-opus-reco** (G4-maman-deepseek) : *« C'est mieux parce que c'est Juju qui a la libellule, pas Nono. C'est plus logique : elle a couru après, elle l'a eue. »* — la variante « pose sur Juju » résout la frustration « le passif gagne ».
- **claude-sonnet-reco** (G4-maman-sonnet) : *« "papier de bonbon" interrompt juste le moment le plus fragile de l'histoire »* — belle image, mais mal placée.
- **Contre-goût, fins qui relancent** (G4-maman-deepseek) : *« "On recommence ?" transforme une fin de soirée en annonce de jeu. C'est l'inverse de l'endormissement. »*
- **deepseek-reco corrompue** (G3-papa-kimi) : *« Papa, c'est quoi ces mots ? Ça fait pas de sens. »* — signal du bug, PAS un jugement de contenu.

---

## 4. LECTURE DIRECTEUR (pour préparer l'étape 6 — NON tranchée ici)

- **Base pressentie : `claude-sonnet-def`.** Dominant sans partage (rang moyen 3.0, 9 top-3, zéro fond, consensus inter-modèles maximal) ET **aligné sur le goût auteur** : callback-refrain qui se rejoue, clarté totale du « qui fait quoi », pose sur la peau, libération sobre, « Gagné » murmuré, **aucune fin qui relance**. C'est la version qui coche à la fois le panel ET les contre-goûts de l'auteur.
- **Réservoir de greffes** :
  - `claude-opus-reco` : la **variante « pose sur Juju »** (récompense claire pour la petite qui a couru — résout la frustration « le passif gagne ») + le **callback têtards fuient/reviennent** — à considérer si le rewrite veut renforcer la logique de récompense. ⚠️ retirer les notes d'intention du fichier.
  - `claude-opus-def` : la **boucle du caillou posé (pas lancé)** début-fin — clôture silencieuse qui « referme le cercle toute seule ». (Complémentaire du callback « presque » de sonnet-def.)
  - `claude-sonnet-reco` : le **« Chhh » de Wex** (silence mimé) + l'écoute finale de l'étang — à condition d'alléger l'ouverture.
  - `kimi-reco-guide` / `deepseek-def` : la **pose sur l'ongle / le rituel sonore** — matière ponctuelle, jamais la structure.
- **Vigilance goût-auteur pour le rewrite** : (a) **fin qui reste dans le silence, zéro relance** (« Encore », « On recommence », « J'ai faim » = bannis) ; (b) pose sur la **peau au point de contact** (jamais roseau/genou) ; (c) **traquer les mots d'adulte** (« sérénité », « quatre-vingt-dix degrés », « pivotait », « berge ») ; (d) **ouverture courte** avant la libellule (pas d'araignon d'eau) ; (e) **nettoyer toute note d'intention** restée dans le fichier.

> ⚠️ **Rappel du goût auteur (mémoire-papa-yann)** : l'exigence de l'auteur est **au-dessus du panel** — sur STORY-002 vague 4, les 2 champions du panel ont été rejetés. Le classement ci-dessus mesure l'**acceptable robuste**, pas nécessairement l'**excellent selon Papa Yann**. **La lecture annotée de Papa Yann reste l'instrument principal.** L'arbitrage étape 6 pèsera ce top contre le goût, à égalité avec la patte. **Ne pas lancer l'étape 6 ici** (consigne : attendre la lecture annotée / instruction séparée).

---

_Panel v2 hétérogène — 12 fiches, 4 groupes × 3 modèles, Kimi inclus sur les 4 (canal CLI). Corpus 14 versions dont 1 corrompue exclue (deepseek-reco, régénérée depuis). Vague 6, 2026-07-11._
