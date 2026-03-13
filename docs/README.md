# 🚌 MaxPlay

> Jeux éducatifs pour **Max** (4 ans), passionné de bus — Villejuif & RATP
> Apprendre en jouant avec les vraies lignes IDFM

🌐 **Jouer en ligne** : [kimen26.github.io/MaxPlay](https://kimen26.github.io/MaxPlay/)

---

## 🎮 Les 7 Jeux de Max

| Jeu | Description | Compétence |
|-----|-------------|------------|
| **MJ-01** 🎨 [Quelle couleur ?](https://kimen26.github.io/MaxPlay/mj-01.html) | Devine la couleur du bus | Couleurs + TTS |
| **MJ-02** 🔢 [Quel numéro ?](https://kimen26.github.io/MaxPlay/mj-02.html) | Lis le numéro sur le bus | Reconnaissance visuelle |
| **MJ-02b** 🔊 [Devine le numéro](https://kimen26.github.io/MaxPlay/mj-02b.html) | Écoute et trouve le numéro | **TTS** + 25+ lignes |
| **MJ-03** 🪑 [La bonne place](https://kimen26.github.io/MaxPlay/mj-03b.html) | Compte les passagers | Calcul mental |
| **MJ-04** 📖 [Complète la phrase](https://kimen26.github.io/MaxPlay/mj-04.html) | Lis et complète | Lecture contextuelle |
| **MJ-05** 🎯 [Où va ce bus ?](https://kimen26.github.io/MaxPlay/mj-05.html) | Destinations RATP | Géographie |
| **MJ-06** 🅿️ [Au garage !](https://kimen26.github.io/MaxPlay/mj-06.html) | Range les bus par couleur | Logique + motricité |
| **MJ-07** 🎮 [Le Bac à Sable](https://kimen26.github.io/MaxPlay/mj-07.html) | Conduis ton bus ! | Sandbox Phaser |

---

## 🏗️ Architecture

```
MaxPlay/
├── game-html/          ← 8 mini-jeux HTML/JS (déployés sur GitHub Pages)
│   ├── index.html      ← Menu principal
│   ├── mj-01.html      ← Quelle couleur ?
│   ├── mj-02.html      ← Quel numéro ? (classique)
│   ├── mj-02b.html     ← Devine le numéro (TTS)
│   ├── mj-03b.html     ← La bonne place
│   ├── mj-04.html      ← Complète la phrase
│   ├── mj-05.html      ← Où va ce bus ?
│   ├── mj-06.html      ← Au garage !
│   └── mj-07.html      ← Intro Bac à Sable
│
├── game/               ← MJ-07 Phaser.js (TypeScript + Vite)
│   └── src/
│       ├── scenes/     ← SandboxScene, etc.
│       └── utils/      ← SynthSounds.ts (audio procédural)
│
├── docs/               ← GitHub Pages (copie de game-html + build MJ-07)
└── docs/MAX_PROFILE.md ← Profil complet de Max
```

---

## 🎵 Audio

**Pas de fichiers MP3** — tout est généré en temps réel avec la **Web Audio API** :
- Ding (bonne réponse)
- Buzz (erreur)
- Victory (fanfare de fin)
- Honk (klaxon)
- Air brake (frein)

---

## 🚀 Déploiement

### GitHub Pages (automatique)
```bash
# Les fichiers sont dans docs/
git add .
git commit -m "Nouveaux jeux"
git push origin master
```

⚠️ **Activation requise** : Settings → Pages → Deploy from branch → master → /docs

### Local (développement)
```bash
# Jeux HTML (vanilla JS)
cd game-html
# Ouvrir index.html dans un navigateur

# MJ-07 Phaser.js
cd game
npm install
npm run dev
```

---

## 🎨 Stack Technique

| | |
|---|---|
| **Mini-jeux** | HTML5 + CSS3 + Vanilla JS |
| **MJ-07** | Phaser.js 3 + TypeScript + Vite |
| **Audio** | Web Audio API (synthèse procédurale) |
| **TTS** | Web Speech API (MJ-01, MJ-02b) |
| **Hébergement** | GitHub Pages |
| **Assets** | SVG vectoriels (bus), PNG (tiles) |

---

## 👦 Profil Max

| | |
|---|---|
| **Âge** | 4 ans |
| **Quartier** | Villejuif Feuillantines (Val-de-Marne) |
| **Passions** | Bus RATP 🚌 · Métro 🚇 · Animaux 🐾 |
| **Connaissances** | 20+ lignes de bus, leurs couleurs et destinations |
| **Input** | Tablette tactile (portrait/paysage) |
| **Sessions** | 3–8 minutes |

---

## 📝 Lignes de bus connues

162 · 172 · 185 · 380 · 131 · 125 · 132 · 286 · 323 · 184 · 186 · 47 · 180 · 2234 · TVM · M6 · M7 · M13 · M14 · T3a · T3b · T7 · T9 · N15 · N22 · V6 · V7

---

*Built with ❤️ by un papa dev · Powered by Claude Code*
