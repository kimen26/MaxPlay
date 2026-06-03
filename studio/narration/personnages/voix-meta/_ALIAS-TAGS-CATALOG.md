# Catalogue alias tags par perso — Étage 2 (génération TTS)

> **Pourquoi ce fichier existe** : le moteur Voice Design d'ElevenLabs **ignore** les tics phonétiques décrits dans le prompt de création de voix (constat empirique Papa Yann 2026-05-11, voir [`_PROMPTING-GUIDE.md`](_PROMPTING-GUIDE.md) §Anti-pattern #6).
>
> **Solution officielle** : injecter des alias tags `<lexeme>` dans le script TTS au moment de produire chaque MP3. Le voice-director (EP-026) lit ce fichier pour savoir quels remplacements appliquer pour chaque perso.

---

## Structure d'un alias tag

```xml
<lexeme>
  <grapheme>huit</grapheme>
  <alias>ouitte</alias>
</lexeme>
```

→ Le moteur lit « huit » mais prononce « ouitte ».

**Source officielle** : [Pronunciation dictionaries cookbook](https://elevenlabs.io/docs/cookbooks/text-to-speech/pronunciation-dictionaries)

**Compatibilité** : tous les modèles ElevenLabs (`eleven_multilingual_v2`, `eleven_v3`, `eleven_turbo_v2_5`, `eleven_flash_v2_5`), **toutes les langues**.

---

## Format pronunciation dictionary `.pls`

Pour les mots récurrents d'un perso, créer un fichier `.pls` rattaché au voice_id :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<lexicon version="1.0"
      xmlns="http://www.w3.org/2005/01/pronunciation-lexicon"
      alphabet="ipa"
      xml:lang="fr-FR">
  <lexeme>
    <grapheme>huit</grapheme>
    <alias>ouitte</alias>
  </lexeme>
  <lexeme>
    <grapheme>stylo</grapheme>
    <alias>é-stylo</alias>
  </lexeme>
</lexicon>
```

---

## Wex — alias tags canon (basé sur 7 tics signature)

> Cohérence avec [`personnages/wex/caractere.md`](../wex/caractere.md) §Signature vocale.

### Tic 3 — `huit` → `ouitte` (origine PT BR)

```xml
<lexeme><grapheme>huit</grapheme><alias>ouitte</alias></lexeme>
<lexeme><grapheme>huitième</grapheme><alias>ouittième</alias></lexeme>
```

**Note** : on étend à TOUS les mots en `-uit` :

```xml
<lexeme><grapheme>nuit</grapheme><alias>nouitte</alias></lexeme>
<lexeme><grapheme>fruit</grapheme><alias>fwouitte</alias></lexeme>
<lexeme><grapheme>fruite</grapheme><alias>fwouitte</alias></lexeme>
<lexeme><grapheme>pluie</grapheme><alias>plouille</alias></lexeme>
<lexeme><grapheme>cuire</grapheme><alias>couire</alias></lexeme>
<lexeme><grapheme>suis</grapheme><alias>souille</alias></lexeme>
```

**Fréquence à appliquer** : **1 mot sur 3-4** dans une phrase contenant un `-ui-`. Sinon caricature. Le voice-director randomise.

### Tic 2 — `/e/` prosthétique devant `s+consonne` (origine PT BR)

```xml
<lexeme><grapheme>stylo</grapheme><alias>é-stylo</alias></lexeme>
<lexeme><grapheme>spaghetti</grapheme><alias>é-spaghetti</alias></lexeme>
<lexeme><grapheme>escargot</grapheme><alias>é-escargot</alias></lexeme>
<lexeme><grapheme>spécial</grapheme><alias>é-spécial</alias></lexeme>
<lexeme><grapheme>structure</grapheme><alias>é-structure</alias></lexeme>
<lexeme><grapheme>scarabée</grapheme><alias>é-scarabée</alias></lexeme>
```

**Fréquence** : **1/3-4 phrases**.

### Tic 4 — `je` instable (articulation enfantine)

```xml
<lexeme><grapheme>je</grapheme><alias>ze</alias></lexeme>
```

→ Mais **pas toujours** ! Le voice-director randomise entre `ze`, `se`, et `je` standard (50% je, 30% ze, 20% se à titre indicatif).

**Variations** :
```xml
<lexeme><grapheme>j'ai</grapheme><alias>z'ai</alias></lexeme>
<lexeme><grapheme>j'aime</grapheme><alias>z'aime</alias></lexeme>
<lexeme><grapheme>jamais</grapheme><alias>zamais</alias></lexeme>
```

### Tic 5 — Bégaiement quand excité

→ **N'est pas géré par alias tag**. C'est une déformation **contextuelle** (uniquement sur pic émotionnel). Le voice-director détecte les points d'exclamation et les `[excited]` audio tags, et duplique la 1ère syllabe à la rédaction du script :

Texte source : `Le bus !`
Texte injecté : `Le-le-le bus !`

### Tics 1, 6, 7 (sifflement, fin basse, mélodie franc-comtoise)

→ **Non gérés par alias tags** — ce sont des traits prosodiques/timbraux qui dépendent de la voix générée en Voice Design. Si la voix créée ne les rend pas spontanément → arbitrage : on garde la voix telle quelle (les tics 2-4-5 par alias tags suffisent à signer Wex) OU on régénère la voix.

---

## Autres persos — à compléter quand VOIX-003 lancera la création des 10 voix

Template :

```markdown
### <Perso> — alias tags canon

**Source caractère** : [`personnages/<perso>/caractere.md`](../<perso>/caractere.md) §Signature vocale

\`\`\`xml
<lexeme><grapheme>mot</grapheme><alias>déformation</alias></lexeme>
\`\`\`

**Fréquence à appliquer** : ...
```

### Casting V1 à équiper

- [ ] Melki (1) — précision méthodique → tics ?
- [ ] Mimi (2) — chaleur tendre → tics ?
- [ ] Dadou (3) — punchy énergique → tics ?
- [ ] Madie (4) — mélancolie rêveuse → tics ?
- [ ] Lulu (5) — observateur silencieux → tics ?
- [ ] Pierrot (6) — alerte amical → tics ?
- [ ] Raph (7) — bubbly enthusiaste → tics ?
- [ ] Juju (8) — déterminée ferme → tics ?
- [ ] Nono (9) — calme fluide → tics ?
- [x] **Wex** — 7 tics canon ci-dessus ✅

---

## Responsabilités

| Quoi | Qui | Quand |
|------|-----|-------|
| Définir les tics canon par perso | Papa Yann + narration-conseiller | Avant production audio |
| Encoder en alias tags dans ce fichier | doc-updater ou voice-director | Quand canon fixé |
| Injecter dans script TTS | voice-director EP-026 (futur agent) | À chaque génération MP3 |
| Tester rendu audio | Papa Yann | À chaque MP3 produit |

---

## Voir aussi

- [`_PROMPTING-GUIDE.md`](_PROMPTING-GUIDE.md) §Anti-pattern #6 — pourquoi cet étage 2 est nécessaire
- [`_PROMPTING-GUIDE.md`](_PROMPTING-GUIDE.md) §🚨 RÈGLE OFFICIELLE — tableau IPA/CMU/alias par méthode
- [Pronunciation dictionaries cookbook ElevenLabs](https://elevenlabs.io/docs/cookbooks/text-to-speech/pronunciation-dictionaries)
- [`personnages/wex/caractere.md`](../wex/caractere.md) §Signature vocale
- [`personnages/wex/voix.md`](../wex/voix.md) §Prompt v19
