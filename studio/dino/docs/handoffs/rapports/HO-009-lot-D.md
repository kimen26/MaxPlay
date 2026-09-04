# HO-009 — Lot D — Ornithopodes, marins, mégafaune

**Date :** 2026-09-05
**Dinos audités :** 20 — parasaurolophus, corythosaurus, maiasaura, saurolophus, edmontosaurus, iguanodon, mosasaurus, elasmosaurus, ophthalmosaurus, liopleurodon, archelon, shonisaurus, ichthyosaurus, mammuthus, smilodon, megatherium, paraceratherium, glyptodon, aenocyon, coelodonta

**Sources utilisées** : Grokipedia en priorité (via `curl -sL -A "Mozilla/5.0"`, slug = nom de GENRE seul — les slugs `Genre_espèce` renvoient 404) pour Iguanodon, les 8 reptiles marins et les 6 mammifères de mégafaune. Wikipedia EN en repli pour les 5 ornithopodes (Grokipedia inaccessible en 403 sur ces pages précises dans cette session). Coelodonta traité par un sous-agent dédié (Grokipedia/Wikipedia EN).

---

## Les 5 corrections les plus importantes

1. **Coelodonta (rhino laineux)** — hauteur 1,9 m → **1,5 m** (écart 27 %) et poids 2,5 t → **1,75 t** (écart 30 %) : les deux mesures actuelles sont nettement au-dessus de la fourchette typique documentée pour un adulte.
2. **Paraceratherium** — longueur 8 m → **7,4 m** (écart 8,1 %, à la limite du seuil mais 7,4 m est le maximum documenté, 8 m le dépasse) : évite de prétendre un chiffre supérieur au record connu.
3. **Mosasaurus** — `continent: "Europe"` est une anomalie de data pour un animal marin : tous les 7 autres reptiles marins du lot ont `continent` vide, conformément à la règle du brief. À corriger en chaîne vide (la `region` reste « toutes les mers du monde », lieu de découverte type = Maastricht).
4. **Ichthyosaurus / Shonisaurus** — le champ `chasseurs` cite un prédateur/rival **non contemporain** dans les deux cas : Liopleurodon (163-155 Ma) n'a jamais côtoyé Ichthyosaurus communis (201-190 Ma) ; Cymbospondylus (Trias moyen, plus ancien) n'a pas côtoyé Shonisaurus popularis, qui était en réalité l'apex predator adulte de son écosystème sans prédateur connu.
5. **Smilodon** — poids 250 kg est en haut de la fourchette réelle documentée (160-280 kg) ; le milieu honnête est **220 kg**, écart de 12 %.

Corrections mineures supplémentaires : Archelon 4,6 m est le record, pas l'adulte moyen (proposer 4 m) ; Ophthalmosaurus époque 160 Ma vs 152-145 Ma documenté (proposer ~150 Ma) ; Glyptodon 3,3 m dépasse le maximum documenté de 3 m ; Mammuthus « lions des cavernes » chasseurs non confirmé (chasse humaine seule bien documentée) ; Megatherium hauteur 3,5 m = mesure « debout sur pattes arrière », pas garrot classique (le texte le précise déjà bien, juste à noter pour le champ brut).

---

## Tableau par dino

| Dino | Champ | Actuel | Trouvé (fourchette + source) | Proposé | Verdict |
|---|---|---|---|---|---|
| Parasaurolophus | taille/hauteur/poids | 10 / 3,5 / 2,5 | 9,5-10,5 / 3,3-3,6 / 2,3-2,7 t — Wikipedia EN | inchangé | CONFORME |
| Corythosaurus | taille/hauteur/poids | 9 / 2 / 4 | 8-9,5 / 1,8-2,2 / 3-4,5 t — Wikipedia EN | inchangé | CONFORME |
| Maiasaura | taille/hauteur/poids | 9 / 2,5 / 2,5 | 8-9 / 2,2-2,6 / 2,3-2,8 t — Wikipedia EN | inchangé | CONFORME |
| Saurolophus | taille/hauteur/poids | 9 / 3 / 3,5 | 9-12 / 2,8-3,2 / 2-3,5 t — Wikipedia EN | inchangé | CONFORME |
| Edmontosaurus | taille/hauteur/poids | 12 / 3,5 / 4 | 9-12 / 3,2-3,6 / 3,5-4,5 t — Wikipedia EN | inchangé | CONFORME |
| Iguanodon | taille/hauteur/poids | 10 / 2,7 / 3 | 10-13 / plausible / 3-5 t — Grokipedia | inchangé | CONFORME |
| Mosasaurus | continent | Europe | marin, doit être vide — Grokipedia | **""** | CORRIGER |
| Mosasaurus | taille/poids | 17 / 10 | 12-17 / 10-15 t — Grokipedia | inchangé | CONFORME |
| Elasmosaurus | taille/poids | 13 / 2,5 | 13 / 2-3 t — Grokipedia | inchangé | CONFORME |
| Ophthalmosaurus | epoque | 160 Ma | Oxford Clay 152-145 Ma — Grokipedia | **~150 Ma** | CORRIGER |
| Ophthalmosaurus | taille/poids | 4 / 0,95 | 3,5-4 / 0,94-0,95 t — Grokipedia | inchangé | CONFORME |
| Liopleurodon | taille/poids | 7 / 5 | 3,2-9,1 (adulte ~6-7) / 1-7,8 t — Grokipedia | inchangé | CONFORME |
| Archelon | taille_m | 4,6 | 3-4 typique, 4,6 = record — Grokipedia | **4** | CORRIGER |
| Archelon | fait « Brigitta » | — | non retrouvé dans les sources | à sourcer ou retirer | signalé |
| Shonisaurus | chasseurs | Cymbospondylus | non contemporain — Grokipedia | **« aucun prédateur connu »** | CORRIGER |
| Shonisaurus | taille/poids | 14 / 25 | 13,5-15 / 21,6-29,7 t — Grokipedia | inchangé | CONFORME (hors chasseurs) |
| Ichthyosaurus | chasseurs | Liopleurodon | anachronisme — Grokipedia | **« grands pliosaures type Rhomaleosaurus »** | CORRIGER |
| Ichthyosaurus | poids_t | 0,15 | non sourcé | inchangé (non vérifiable) | CORRIGER (chasseurs seul) |
| Mammuthus | chasseurs | lions des cavernes | non confirmé — Grokipedia | **« hommes préhistoriques, ses seuls vrais chasseurs »** | CONFORME (mesures) / texte à corriger |
| Mammuthus | hauteur/poids | 3,3 / 5 | 3-3,5 / 4-6 t — Grokipedia | inchangé | CONFORME |
| Smilodon | poids_t | 0,25 | 0,16-0,28, milieu 0,22 — Grokipedia | **0,22** | CORRIGER |
| Megatherium | hauteur_m | 3,5 | 4 m = debout sur pattes arrière — Grokipedia | inchangé (nuancer la nature de la mesure) | CORRIGER |
| Paraceratherium | taille_m | 8 | max documenté 7,4 — Grokipedia | **7,4** | CORRIGER |
| Paraceratherium | region | Asie | Pakistan/Chine/Mongolie — Grokipedia | **« Asie (Pakistan, Chine, Mongolie) »** | CORRIGER |
| Glyptodon | taille_m | 3,3 | max documenté 3 — Grokipedia | **3** | CORRIGER |
| Aenocyon | taille/hauteur/poids | 1,7 / 0,85 / 0,07 | 1,5-1,7 / 0,80-0,85 / 0,05-0,11 t — Grokipedia | inchangé | CONFORME |
| Coelodonta | hauteur_m | 1,9 | 1,4-1,6 typique — sous-agent | **1,5** | CORRIGER |
| Coelodonta | poids_t | 2,5 | 1,5-2 typique — sous-agent | **1,75** | CORRIGER |
| Coelodonta | epoque | 100 000 ans | fenêtre réelle ~350 000-10 000 ans — sous-agent | **~50 000 ans + précision de fenêtre** | CORRIGER |

---

## Vitesse (ajout Papa Yann en cours de brief)

Aucune estimation biomécanique fiable et sourcée n'a été trouvée pour les 20 dinos du lot — le champ `vitesse.kmh_retenu` est `null` partout. Deux cas ont une fourchette indicative par **analogie avec un animal moderne proche** (mammouth ≈ éléphant actuel ; loup terrible ≈ loup gris actuel), explicitement marquée `confiance: "basse"` et non retenue comme valeur ferme — conformément à la règle « aucune valeur sans source » du brief. Aucune estimation biomécanique publiée sur l'espèce elle-même n'a été identifiée pour les 18 autres.

---

## Où les sources se contredisent

- **Liopleurodon** : la fourchette scientifique publiée va de ~3,2 à 9,1 m selon les méthodes d'estimation (dent/mâchoire vs squelette complet) ; l'estimation médiatique de 25 m (documentaire 1999) est un point de contradiction déjà bien traité dans le texte existant de la fiche. On retient Grokipedia + le consensus scientifique actuel (6-7 m adulte), déjà en place dans la data.
- **Saurolophus** : la fiche fusionne deux espèces du même genre (S. osborni nord-américain et S. angustirostris mongol) sous une seule entrée. Défendable pédagogiquement (même genre, même signature) mais c'est une simplification à noter — pas une erreur factuelle en soi.

---

## Ce qui n'a pas pu être vérifié

- **Grokipedia inaccessible (403)** pour les 5 ornithopodes (parasaurolophus, corythosaurus, maiasaura, saurolophus, edmontosaurus) dans cette session — repli sur Wikipedia EN, dit clairement dans chaque entrée.
- **Vitesse** : aucune source fiable trouvée pour les 20 animaux — champ `vitesse` rempli en `null` avec la note correspondante à chaque fois, sauf deux extrapolations explicitement non retenues.
- **Archelon, fait « Brigitta, plus de 100 ans »** : nom/âge non retrouvés dans Grokipedia ni Wikipedia EN consultés — à sourcer via un ouvrage spécialisé ou à retirer si aucune source primaire n'est identifiée.
- **Ichthyosaurus, poids 0,15 t** : aucune masse publiée identifiée pour cette espèce précise — gardé comme estimation non contredite, signalé non vérifiable plutôt que corrigé sans preuve.
- **Coelodonta, corne et dessins rupestres** : non vérifiés par le sous-agent dédié (source insuffisante) — ni confirmés ni infirmés, à ne pas présenter comme faux.
- **Maiasaura « sept mètres entre nids »** et **Edmontosaurus « jusqu'à 1000 dents »** : chiffres courants dans la littérature de vulgarisation, cohérents avec ce qui est documenté sur les hadrosauridés en général, mais non re-vérifiés chiffre exact sur source primaire dans cette recherche.

---

## Porte de vérification

```
node -e "const j=require('./studio/dino/docs/handoffs/rapports/HO-009-lot-D.json'); console.log(j.dinos.length, 'dinos', j.dinos.filter(d=>d.verdict==='CORRIGER').length, 'a corriger')"
```

**Sortie brute :**

```
20 dinos 10 a corriger
```
