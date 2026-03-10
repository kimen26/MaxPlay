---
name: sound-design
description: Audio, TTS et design sonore pour MaxPlay. Utiliser pour choisir entre Web Speech API / ElevenLabs / Qwen3-TTS, intégrer Howler.js avec Phaser, créer des audio sprites, paramétrer une voix enfant-friendly en français.
---

# Sound Design – Audio & TTS pour jeu enfant

## Principe fondamental pour 3-4 ans

**Tout texte à l'écran doit être lu à voix haute.** Max ne lit pas encore couramment.
Audio = canal principal d'information, pas accessoire.

---

## TTS 2025 – Comparatif

| Solution | Latence | Qualité | Coût | Offline | FR | Intégration |
|----------|---------|---------|------|---------|-----|-------------|
| **Web Speech API** | ~0ms | Passable (TTS système) | Gratuit | ✅ | ✅ | Native navigateur |
| **OpenAI TTS** | ~300ms | Excellent | $15/1M chars | ❌ | ✅ | API HTTP |
| **ElevenLabs** | ~400ms | Exceptionnel | ~$5/mo (30k chars) | ❌ | ✅ | API HTTP |
| **Qwen2.5-Omni/Qwen3** | ~200ms (local) | Très bon | Gratuit (self-host) | ✅ | ✅ | Modèle local |
| **Coqui TTS** | ~500ms | Bon | Gratuit | ✅ | ✅ | Python/API |
| **gTTS** | ~800ms | Passable | Gratuit | ❌ | ✅ | API Google |

### Recommandation pour MaxPlay

**Phase prototype** : Web Speech API — zéro setup, zéro coût, suffisant pour tester
**Phase prod** : ElevenLabs (voix du bus avec personnalité) + Web Speech API (hints/instructions)

```typescript
// Voix Web Speech API – paramètres enfant-friendly FR
const speak = (text: string) => {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'fr-FR';
  utter.rate = 0.85;    // plus lent que défaut (1.0) — important pour 3-4 ans
  utter.pitch = 1.2;    // légèrement aigu = plus enfantin
  utter.volume = 1.0;
  window.speechSynthesis.speak(utter);
};
```

### Qwen3-TTS (futur)
```typescript
// Via API locale ou Ollama
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    model: 'qwen2.5-omni',
    prompt: text,
    stream: false,
  })
});
```

---

## Howler.js vs Web Audio API vs Tone.js

| | Howler.js | Web Audio API | Tone.js |
|---|-----------|--------------|---------|
| Complexité | Faible | Haute | Moyenne |
| Audio sprites | ✅ Natif | Manuel | Possible |
| Phaser intégration | ✅ Parfait | Possible | Possible |
| Musique générative | ❌ | ✅ | ✅ |
| Taille lib | ~26kb | 0 (natif) | ~300kb |
| **Reco MaxPlay** | **✅ Choix principal** | Si Howler insuffisant | Phase 2+ |

---

## Audio Sprites – La bonne approche

Un seul fichier audio = tous les sons. Réduit les requêtes HTTP, simplifie le cache.

```typescript
// Installation
// npm install howler @types/howler

import { Howl } from 'howler';

// Définition du sprite (générer avec audiosprite npm)
const sounds = new Howl({
  src: ['assets/audio/sounds.webm', 'assets/audio/sounds.mp3'],
  sprite: {
    success:     [0,    1200],  // 0ms → 1.2s
    tryAgain:    [1500, 800],   // 1.5s → 0.8s
    busKlaxon:   [2500, 600],
    boardingDing:[3200, 400],
    confetti:    [3800, 1500],
    prout:       [5500, 700],   // Easter egg 😄
    ambient:     [6500, 8000, true], // loop
  },
  volume: 0.8,
});

// Usage dans Phaser
sounds.play('success');
sounds.play('busKlaxon');
```

### Générer le sprite avec audiosprite
```bash
npx audiosprite --format howler2 --output assets/audio/sounds *.wav
# Génère sounds.webm + sounds.mp3 + sounds.json (timestamps)
```

---

## Intégration Howler.js + Phaser.js

```typescript
// src/audio/SoundManager.ts
import { Howl } from 'howler';

export class SoundManager {
  private static sfx: Howl;

  static init(): void {
    this.sfx = new Howl({
      src: ['assets/audio/sounds.webm', 'assets/audio/sounds.mp3'],
      sprite: { /* ... */ },
    });
  }

  static play(id: string): void {
    this.sfx.play(id);
  }

  static stopAll(): void {
    this.sfx.stop();
  }
}

// Dans BootScene.create()
SoundManager.init();

// Dans SandboxScene – boarding réussi
SoundManager.play('success');
SoundManager.play('busKlaxon');
```

---

## Design sonore pour 3-4 ans

### Règles d'or
- **Durée** : sons courts (< 1.5s), sauf musique ambiante
- **Timbre** : sons mélodiques, pas agressifs. Xylophone > buzzer.
- **Feedback succès** : 3-5 notes ascendantes (do-mi-sol)
- **Feedback erreur** : 1-2 notes douces descendantes (jamais buzzer)
- **Voix** : enthousiaste mais calme, débit lent, phrases courtes
- **Klaxon bus** : bip joyeux, pas strident — associé à la joie, pas à l'alerte

### Sources sons gratuits
- https://freesound.org — CC0, excellent moteur de recherche
- https://opengameart.org/content/sound-effects — jeu CC0
- https://pixabay.com/sound-effects/ — libres de droits
- https://incompetech.com — musiques Kevin MacLeod CC-BY

### Sons prioritaires pour MaxPlay (P0)
1. **Bus arrive à l'arrêt** : bruit de frein doux + ding de porte
2. **Max monte dans le bus** : mélodie courte ascendante 3 notes
3. **Succès mini-jeu** : fanfare joyeuse ~1s
4. **Indice / hint** : son neutre doux pour attirer l'attention
5. **Ambiance rue** : léger brouhaha de ville, très bas volume
6. **Easter egg prout** : court, discret, garanti hilarant

### Musique
- Style : instrumental doux, tempo lent (~80 BPM), instruments jouets
- Éviter : musique répétitive agressive (crée l'anxiété sur la durée)
- Option : Tone.js pour générer des variations algorithmiques (jamais la même)

---

## Setup rapide prototype (0 install)

```typescript
// SandboxScene.ts – TTS immédiat sans lib
private speak(text: string): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // stop si en cours
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'fr-FR';
  u.rate = 0.85;
  u.pitch = 1.2;
  window.speechSynthesis.speak(u);
}

// Utilisation
this.speak('Monte dans le bus !');
this.speak('Bravo ! Tu as pris le 162 !');
```

Aucune dépendance. Fonctionne dans Chrome/Edge. Safari approximatif.
