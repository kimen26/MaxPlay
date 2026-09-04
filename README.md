# 🚌 MaxPlay

> Jeux éducatifs pour **Max** (4 ans), passionné de bus — Villejuif & RATP
> Apprendre en jouant avec les vraies lignes IDFM

🌐 **Jouer en ligne** : [kimen26.github.io/MaxPlay](https://kimen26.github.io/MaxPlay/)

---

## 🎮 Les jeux

40+ mini-jeux HTML (bus, dinos, lecture, maths…) + une encyclopédie dinosaures narrée.
Le catalogue vivant est le menu du site : [kimen26.github.io/MaxPlay](https://kimen26.github.io/MaxPlay/) — la liste exhaustive vit dans `site/js/catalog.js`.

---

## 🏗️ Architecture (modèle « 1 plateforme · N domaines », 2026-07)

```
MaxPlay/
├── site/                   ← LE site déployé (GitHub Pages) : menu, mini-jeux mj-XX.html,
│                              encyclopédie dino (dev-dinos.html), audio, images
├── studio/                 ← pôles d'autoring (non déployés)
│   ├── minijeux/           ← PÔLE JEU (docs, pmo, tests Playwright, inbox)
│   ├── dino/               ← PÔLE DINO (contenu, sources, scripts, pmo) — code déployé dans site/
│   ├── narration/          ← PÔLE NARRATION (stories, personnages, univers, pmo, equipe)
│   └── lunii/              ← distribution boîte à histoires Lunii (STUdio)
├── infra/                  ← bot Telegram + serveur MCP llm-copains + Supabase
├── memory/                 ← transverse : MEMORY · MAX_PROFILE · VISION · audits/
└── _archive/               ← cadavres préservés (cf. _archive/INDEX.md)
```

**Déploiement** : GitHub Actions assemble `site/` dans `_site/` + deploy Pages. `node_modules/`, `dist/`, `_site/`, `temp/` sont dans `.gitignore`.

---

## 🚀 Déploiement

```bash
git push origin master   # CI build (~2 min) → site mis à jour automatiquement
```

### Local (développement)

```bash
# Jeux HTML (vanilla JS) — ouvrir directement dans le navigateur
open site/index.html
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
