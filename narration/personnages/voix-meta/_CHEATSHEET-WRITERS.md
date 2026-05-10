# Cheatsheet Writers — Didascalies vocales MaxPlay

> Pour les écrivains. **Tu écris en français, pas en code.**
> Une passe technique (voice-director) convertira tes didascalies en tags ElevenLabs au moment de la production audio.

---

## Règle d'or

**Écris ton histoire normalement.** Quand un mot, une phrase ou un dialogue **doit absolument** être joué d'une certaine façon (chuchotement, rire, soupir, pause), ajoute une didascalie en italique entre parenthèses **juste avant** la réplique concernée.

Si tu hésites, **ne taggue pas** — laisse le voice-director décider, il connaît la voix de chaque perso.

---

## Format

```
*(didascalie en italique entre parenthèses)*
```

**Placement** :
- **Avant** la réplique → s'applique à toute la réplique qui suit
- **Au milieu** entre deux phrases → s'applique à la phrase suivante
- **À l'intérieur** d'une phrase → micro-effet local

---

## Le vocabulaire autorisé (FR)

### Volume / souffle

| Didascalie | Quand l'utiliser |
|------------|------------------|
| `*(en chuchotant)*` | Confidence, secret, scène nocturne |
| `*(doucement)*` ou `*(tout doux)*` | Tendresse, calme, parler à un bébé animal |
| `*(fort)*` ou `*(en criant)*` | Émerveillement bruyant, surprise vive |

### Émotions

| Didascalie | Quand l'utiliser |
|------------|------------------|
| `*(joyeux)*` ou `*(joyeusement)*` | Joie franche |
| `*(excité)*` | Excitation, hâte |
| `*(curieux)*` | Question naïve, exploration |
| `*(triste)*` | Tristesse douce (jamais lourde — 4 ans) |
| `*(en colère)*` | À utiliser avec **parcimonie** |
| `*(calme)*` | Apaisement, sérénité |
| `*(sérieux)*` | Moment grave, vérité importante |
| `*(hésitant)*` ou `*(hésitation)*` | Doute, recherche du mot |

### Sons (rires, soupirs)

| Didascalie | Quand l'utiliser |
|------------|------------------|
| `*(rire)*` ou `*(en riant)*` | Rire franc |
| `*(petit rire)*` ou `*(rire amusé)*` | Petit rire complice |
| `*(rire enfantin)*` | Rire pur, enfant qui découvre |
| `*(soupir)*` ou `*(en soupirant)*` | Lâcher prise, fatigue douce |
| `*(surpris)*` ou `*(hoquet)*` | Découverte soudaine |

### Rythme

| Didascalie | Quand l'utiliser |
|------------|------------------|
| `*(lentement)*` | Suspens, contemplation |
| `*(rapidement)*` ou `*(vite)*` | Empressement, énergie |
| `*(...)* ` ou `*(pause)*` | Pause franche, silence chargé |

---

## Exemples concrets MaxPlay

### Exemple Wex (calme, observateur)

```
Wex regarde le bus s'éloigner. *(...)* Il sourit, tout doucement.

Wex : *(doucement)* Viens. *(pause)* C'est par là.
```

### Exemple Raph (enthousiaste)

```
Raph : *(excité)* Oh mais c'est trop bien ça ! *(rire enfantin)* On y va, allez !
```

### Exemple Mimi (douce, attentionnée)

```
Mimi voit Madie assise toute seule dans le coin.

Mimi : *(doucement)* Mm... t'as l'air triste. *(curieux)* Tu veux qu'on s'assoie ?
```

### Exemple Juju (directe)

```
Juju : *(sérieux)* Non. *(pause)* C'est pas juste.
```

### Exemple Madie (mélancolique)

```
Madie : *(soupir)* Personne comprend vraiment ce que je veux dire... *(...)*
```

### Exemple narrateur

```
*(doucement)* La nuit tombait sur le centre bus. *(pause)* Tous les bus dormaient déjà, sauf un.
```

---

## Anti-patterns — à éviter

### ❌ Ne taggue pas chaque phrase

```
*(joyeux)* Salut ! *(curieux)* Ça va ? *(joyeux)* Trop bien !
```
→ Sur-tagging. Le rendu sera saccadé. **Réserve les didascalies aux moments qui en ont vraiment besoin.**

### ❌ Ne taggue pas la narration neutre

```
*(calme)* Wex marche dans la rue.
```
→ "Calme" est implicite quand rien n'est dit. Laisse vide.

### ❌ Pas de didascalies inventées hors liste

```
*(d'un air mystérieux)* *(comme un vieux sage)* *(façon Tayo)*
```
→ Le voice-director ne saura pas mapper. **Reste dans la liste ci-dessus.**
→ Si tu veux vraiment une nuance non listée, **dis-le en commentaire à la fin du draft** (`<!-- pour Wex ici, ton de vieux sage -->`), pas en didascalie inline.

### ❌ Pas de tags ElevenLabs directs

```
[whispers] Viens voir.
```
→ Non. **Toi tu écris en français.** Le voice-director convertit en `[whispers]` au moment de la production.

---

## Le voice-director, c'est qui ?

C'est un agent technique (à venir, EP-026) qui :

1. Lit ton texte canon avec didascalies FR
2. Convertit chaque didascalie en tag ElevenLabs v3 (`*(en chuchotant)*` → `[whispers]`)
3. Ajoute des micro-ajustements selon la voix de chaque perso (Wex aime les pauses, Raph les rafales)
4. Produit le **script audio final** prêt à coller dans ElevenLabs

**Tu n'as JAMAIS besoin de toucher aux tags `[xxx]`.** C'est sa responsabilité, pas la tienne.

---

## Récap visuel

```
┌─────────────────────────────────────────┐
│  TOI (writer)                           │
│  → texte FR + didascalies FR italiques  │
│    ex : *(doucement)* Viens.            │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  VOICE-DIRECTOR (agent, EP-026)         │
│  → texte enrichi tags ElevenLabs v3     │
│    ex : [softly] Viens.                 │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  PRODUCTION AUDIO                        │
│  voice_id (créé en v2) + script v3      │
│  → fichier MP3 final pour Max           │
└─────────────────────────────────────────┘
```

---

## Référence technique

Pour comprendre la mécanique complète (tags v3, modèles ElevenLabs, workflow v2→v3) :
**Skill global `elevenlabs-voice-design`** (`~/.claude/skills/elevenlabs-voice-design/SKILL.md`).

Mais tu n'as pas besoin de l'ouvrir pour écrire — cette cheatsheet suffit.
