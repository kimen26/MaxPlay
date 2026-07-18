---
name: gamepad-inputs
description: Intégration manette dans MaxPlay. Utiliser pour brancher la 8BitDo FC30/NES30, configurer le Web Gamepad API, gérer le dual-input manette+tactile. Toujours garder le tap comme fallback.
triggers:
  - manette
  - gamepad
  - 8bitdo
  - fc30
  - nes30
  - web gamepad api
  - dual input
---

# Gamepad – 8BitDo FC30 (NES30) + Web Gamepad API

## Matériel : 8BitDo FC30 / NES30
- **FCC ID** : 3AA9V-FC30
- **Connexions** : Bluetooth 4.0 · USB-C (câble fourni)
- **Boutons** : D-pad · A · B · X · Y · L · R · Start · Select
- **Modes firmware** : START+B = X-input (Windows) · START+X = D-input · START+Y = Mac · **START+A = Android = meilleur pour navigateur**
- **Pour Chrome/navigateur** : utiliser le mode **Android (START+A)** ou X-input (START+B)
- **LED** : 1 LED = mode connecté, clignotement = appairage

## Web Gamepad API (natif navigateur)

```typescript
// Détection connexion
window.addEventListener('gamepadconnected', (e) => {
  console.log('Manette connectée :', e.gamepad.id);
});

// Lecture dans la boucle de jeu (polling obligatoire)
const gamepads = navigator.getGamepads();
const gp = gamepads[0];
if (gp) {
  const left  = gp.axes[0]; // -1 gauche, +1 droite (stick gauche ou D-pad selon mode)
  const up    = gp.axes[1]; // -1 haut, +1 bas
  const btnA  = gp.buttons[0].pressed; // A / cross
  const btnB  = gp.buttons[1].pressed; // B / circle
}
```

## Mapping 8BitDo FC30 en mode Android (navigateur Chrome)

| Bouton physique | Index API | Usage MaxPlay |
|----------------|-----------|---------------|
| D-pad haut     | axes[1] < -0.5 ou buttons[12] | Déplacer Max ↑ |
| D-pad bas      | axes[1] > 0.5  ou buttons[13] | Déplacer Max ↓ |
| D-pad gauche   | axes[0] < -0.5 ou buttons[14] | Déplacer Max ← |
| D-pad droite   | axes[0] > 0.5  ou buttons[15] | Déplacer Max → |
| A (rouge)      | buttons[0] | Interagir / monter dans bus |
| B (bleu)       | buttons[1] | Annuler / sortir |
| Start          | buttons[9] | Pause / Hub |
| Select         | buttons[8] | — |

> Note : le mapping peut varier selon le firmware et le mode. Toujours logger `gp.id` et tester.

## Intégration Phaser.js

```typescript
// Dans la config Phaser
const config: Phaser.Types.Core.GameConfig = {
  input: {
    gamepad: true, // activer le plugin gamepad
  },
  // ...
};

// Dans une scène
create(): void {
  this.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
    console.log('Pad:', pad.id);
  });
}

update(): void {
  const pad = this.input.gamepad.getPad(0);
  if (!pad) return;

  if (pad.left || pad.axes[0] < -0.3)  { /* déplacer gauche */ }
  if (pad.right || pad.axes[0] > 0.3)  { /* déplacer droite */ }
  if (pad.A)                            { /* interagir */ }
}
```

## Règle d'or : dual-input permanent

```typescript
// Toujours les deux en parallèle — jamais exclusif
private handleInput(): void {
  this.handleGamepad();  // manette si dispo
  // Le touch est géré par les events Phaser (toujours actif)
}

private handleGamepad(): void {
  const pad = this.input.gamepad?.getPad(0);
  if (!pad) return; // pas de manette → tap prend le relais
  // ...
}
```

## Cas d'usage MaxPlay

- **Projecteur + canapé** : 8BitDo FC30 en USB sur PC → Chromecast l'onglet Chrome
- **Tablet seul** : tap only, pas de manette
- **Les deux en même temps** : Max tape + papa joue à la manette ? → possible, dual-input

## Progression manette pour Max (3.5 ans, jamais touché)

| Phase | Contrôles | Âge typique |
|-------|-----------|-------------|
| 0 | Tap écran uniquement | maintenant |
| 1 | D-pad gauche/droite seulement | 4-4.5 ans |
| 2 | D-pad 4 directions | 4.5-5 ans |
| 3 | D-pad + 1 bouton action | 5 ans |
| 4 | D-pad + 2 boutons | 5.5+ ans |

> Commencer TOUJOURS par tap. Introduire la manette en mode "découverte" (papa montre).

## Setup pour la session projecteur

1. Brancher FC30 en USB sur le PC
2. Ouvrir Chrome → http://localhost:3001
3. Mode X-input (START+B) pour Windows, ou Android (START+A) si ça ne détecte pas
4. Vérifier dans la console : `navigator.getGamepads()` doit retourner le pad
5. Chromecast l'onglet depuis Chrome (icône dans la barre d'adresse)
