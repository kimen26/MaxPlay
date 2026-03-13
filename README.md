# 🚌 MaxPlay

> Jeux éducatifs pour **Max** (4 ans), passionné de bus — Villejuif & RATP
> Apprendre en jouant avec les vraies lignes IDFM

🌐 **Jouer en ligne** : [kimen26.github.io/MaxPlay](https://kimen26.github.io/MaxPlay/)

---

## 🎮 Les jeux de Max

| Jeu | Description | Compétence |
|-----|-------------|------------|
| **MJ-01** 🎨 [Quelle couleur ?](https://kimen26.github.io/MaxPlay/mj-01.html) | Devine la couleur du bus | Couleurs + TTS |
| **MJ-02** 🔢 [Quel numéro ?](https://kimen26.github.io/MaxPlay/mj-02.html) | Lis le numéro sur le bus | Reconnaissance visuelle |
| **MJ-02b** 🔊 [Devine le numéro](https://kimen26.github.io/MaxPlay/mj-02b.html) | Écoute et trouve le numéro | TTS + 25+ lignes |
| **MJ-03a** 👥 [Compte les passagers](https://kimen26.github.io/MaxPlay/mj-03a.html) | Groupes de passagers | Dénombrement |
| **MJ-03b** 🪑 [La bonne place](https://kimen26.github.io/MaxPlay/mj-03b.html) | Calcul de places libres | Soustraction |
| **MJ-04** 📖 [Lis le mot](https://kimen26.github.io/MaxPlay/mj-04.html) | Syllabe manquante | Lecture phonétique |
| **MJ-05** 🎯 [Quel bus pour aller où ?](https://kimen26.github.io/MaxPlay/mj-05.html) | Trajets réels de Max | Géographie locale |
| **MJ-06** 🏠 [Au garage !](https://kimen26.github.io/MaxPlay/mj-06.html) | Range les bus | Logique + drag |
| **MJ-07** 🗺️ [La journée de Max](https://kimen26.github.io/MaxPlay/mj-07.html) | Explore Villejuif | Sandbox Phaser |

---

## 🏗️ Architecture

```
MaxPlay/
├── game-html/          ← Source des mini-jeux HTML (déployés via CI)
│   ├── index.html      ← Menu principal
│   ├── mj-01.html … mj-07.html
│   ├── js/             ← Logique partagée (data, bus-svg, sounds, feedback)
│   └── css/
│
├── game/               ← MJ-07 Phaser.js (TypeScript + Vite)
│   └── src/
│       ├── scenes/     ← HubScene, SandboxScene
│       └── utils/      ← SynthSounds.ts (audio procédural)
│
└── docs/               ← Documentation projet uniquement (.md)
```

**Déploiement** : GitHub Actions build Phaser + assemble tout dans `_site/` + deploy Pages.
Rien n'est commité dans `docs/`. `game/dist/` et `_site/` sont dans `.gitignore`.

---

## 🚀 Déploiement

```bash
git push origin master   # CI build (~2 min) → site mis à jour automatiquement
```

### Local (développement)

```bash
# Jeux HTML (vanilla JS) — ouvrir directement dans le navigateur
open game-html/index.html

# MJ-07 Phaser.js
cd game && npm install && npm run dev
```

---

## 🎨 Stack technique

| | |
|---|---|
| **Mini-jeux** | HTML5 + CSS3 + Vanilla JS |
| **MJ-07** | Phaser.js 3 + TypeScript + Vite |
| **Audio** | Web Audio API (synthèse procédurale) |
| **TTS** | Web Speech API (MJ-01, MJ-02b) |
| **Hébergement** | GitHub Pages via GitHub Actions |
| **Assets** | SVG vectoriels (bus side-view), PNG sprites (topdown) |

---

## 👦 Profil Max

| | |
|---|---|
| **Âge** | 4 ans |
| **Quartier** | Villejuif Feuillantines (Val-de-Marne) |
| **Passions** | Bus RATP 🚌 · Métro 🚇 · Animaux 🐾 |
| **Connaissances** | 20+ lignes de bus, leurs couleurs et destinations |
| **Input** | Tablette tactile |
| **Sessions** | 3–8 minutes |

---

## 📝 Lignes de bus connues

162 · 172 · 185 · 380 · 131 · 125 · 132 · 286 · 323 · 184 · 186 · 47 · 180 · 2234 · TVM · M6 · M7 · M13 · M14 · T3a · T3b · T7 · T9 · N15 · N22 · V6 · V7

---

*Built with ❤️ by un papa dev · Powered by Claude Code*
