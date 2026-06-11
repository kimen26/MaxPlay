# Lexique de prononciation — noms de dinos pour ElevenLabs (eleven_v3)

> **Garde-fou anti-mauvaise-prononciation.** Quand un nom savant apparaît dans un texte audio, on l'écrit **comme il SONNE en français** (respelling) — le texte parlé n'est jamais affiché, donc on peut le déformer sans scrupule.
> Forgé sur le REX pilotes 2026-06-11 (« roui », « Mo-sa-sau-ru » sans S, « Zé-rizino »).
> Le levier IPA n'existe pas en FR/v3 → **le respelling inline est LE levier fiable.** Détail universel : skill [`audio-direction-elevenlabs/03-tricks-graphie.md`](C:/Users/kimen/.claude/skills/audio-direction-elevenlabs/03-tricks-graphie.md) § « Noms propres / mots savants ».

---

## 1. Règles de conversion (à appliquer à TOUT nom grec/latin)

| Graphie savante | Se lit | Respeller en |
|-----------------|--------|--------------|
| `ch` (grec) | son « k » | **k** — Bra-**k**i-o, Car-**k**aro |
| `ph` | son « f » | **f** — Dilo-**f**o, Pachycé-**f**alo |
| `th` | son « t » | **t** — Cory-**t**o, Compso-gna-**t**us |
| `y` (grec) | son « i » | **i** — Pach**i**, Bar**i**onix |
| `x` final | son « ks » | **ks** / **x** clair — Baryon**ix**, Arkéopté-r**ix** |
| `ae` / `oe` | son « é » | **é** — Ark**é**optéryx, C**é**lophysis |
| `-us` final (latin) | S souvent **avalé** | écrire **« -saure »** (forme FR) ; si pas de forme FR → **« -uss »** (Gallimi-**muss**) |
| `Th-` en tête | lu « Zé » (anglais) | **« Thé- »** ou **« T- »** |
| `ps-` en tête | « ps » | garder mais **syllaber** : P-si-ta-co |
| `sh` | son « ch » | OK en FR, mais on peut écrire **« ch »** par sécurité |

**+ règles de graphie (REX) :** ❌ jamais de CAPITALES sur un mot court (< 4 lettres : « ROI » → « roui ») — emphase par la ponctuation. ❌ jamais syllaber la forme latine « -sau-rus » (S avalé) — syllaber « -saure ».

---

## 2. Lexique des noms À RISQUE (respelling validé)

> Ceux-là DOIVENT être respellés dans le texte parlé. Syllabes séparées par tirets quand on les décompose à l'oral.

| Nom (fiche) | Écrire dans l'audio | Piège |
|-------------|---------------------|-------|
| Tyrannosaurus | **Ty-ran-no-saure** | -us avalé |
| Therizinosaurus | **Thé-ri-zi-no-saure** | Th→Thé + -us |
| Mosasaurus | **Mo-sa-saure** | -us avalé |
| Brachiosaure | **Bra-ki-o-saure** | ch→k |
| Carcharodontosaure | **Car-ka-ro-don-to-saure** | ch→k |
| Pachycéphalosaure | **Pa-ki-cé-fa-lo-saure** | ch→k, y→i, ph→f |
| Euoplocéphale | **Eu-o-plo-cé-fale** | ph→f |
| Cryolophosaure | **Cri-o-lo-fo-saure** | y→i, ph→f |
| Dilophosaure | **Di-lo-fo-saure** | ph→f |
| Parasaurolophus | **Pa-ra-sau-ro-lofe** | ph→f, -us |
| Corythosaure | **Co-ri-to-saure** | y→i, th→t |
| Coelophysis | **Sé-lo-fi-zis** | oe→é, ph→f, y→i |
| Compsognathus | **Komp-so-gna-tuss** | th→t, -us |
| Gallimimus | **Ga-li-mi-muss** | -us |
| Deinonychus | **Daï-no-ni-kuss** | ch→k, y→i, -us |
| Suchomimus | **Su-ko-mi-muss** | ch→k, -us |
| Baryonyx | **Ba-ri-o-nix** | y→i, x→ks |
| Archaeoptéryx | **Ar-ké-op-té-rix** | ae→é, ch→k, y→i, x |
| Quetzalcoatlus | **Kèt-zal-ko-atluss** | aztèque, dur |
| Ptéranodon | **Pté-ra-no-don** | Pt initial |
| Psittacosaure | **P-si-ta-co-saure** | ps initial |
| Styracosaure | **Sti-ra-co-saure** | y→i |
| Pachyrhinosaure | **Pa-ki-ri-no-saure** | ch→k, y→i, rh→r |
| Diplodocus | **Di-plo-do-kuss** | -us (sinon « -kus » ok) |
| Iguanodon | **I-goua-no-don** | gua |
| Troodon | **Tro-o-don** | double o |
| Shonisaure | **Cho-ni-saure** | sh→ch |
| Shastasaure | **Chas-ta-saure** | sh→ch |
| Archélon | **Ar-ké-lon** | ch→k |

---

## 3. Noms qui se lisent BIEN tels quels (pas de respelling)

Spinosaure · Giganotosaure · Allosaure · Tarbosaure · Albertosaure · Gorgosaure · Cératosaure · Carnotaure · Acrocanthosaure · Apatosaure · Camarasaure · Amargasaure · Plateosaure · Ankylosaure · Stégosaure · Kéntrosaure · Tricératops · Torosaure · Protocératops · Pentacératops · Edmontosaure · Vélociraptor · Utahraptor · Microraptor · Oviraptor · Dimétrodon · Élasmosaure · Liopleurodon.

> En cas de doute → respeller, ça ne coûte rien. Le **preview groupé** (§4) tranche.

---

## 4. PREVIEW PHONÉTIQUE GROUPÉ (garde-fou process — avant toute prod de masse)

Plutôt que découvrir une mauvaise prononciation dino par dino (50 écoutes), on concentre le risque en **1 seul clip** :

1. Générer **un MP3 court** (narrateur_h) qui énonce tous les noms à risque d'affilée, en respelling : *« Ty-ran-no-saure. Thé-ri-zi-no-saure. Mo-sa-saure. Bra-ki-o-saure… »*
2. **Papa Yann écoute une fois** → valide / corrige la graphie de chaque nom raté.
3. Mettre à jour ce lexique (§2) avec les corrections.
4. **Puis** lancer la production des dialogues complets — les noms sont garantis.

Coût : ~1 appel court vs 50 ratés possibles. À refaire à chaque nouveau lot de dinos.

---

_Créé 2026-06-11 (REX pilotes). Source autorité prononciation dino. Tout writer/générateur audio dino l'applique AVANT EL._
