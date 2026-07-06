# Supabase MaxPlay — auth parent + sync progression (Phase 1 light)

> Projet : `WexWorld` (`bfrugwrzpefsaehsvypt`, eu-west-1 Irlande = UE ✅).
> Modèle légal : audit [`memory/INFRA-AUDIT-2026-07-06.md`](../../memory/INFRA-AUDIT-2026-07-06.md) — compte PARENT, enfant = surnom pseudonyme, zéro donnée perso enfant.

## Architecture

```
localStorage (tracker.js) = SOURCE DE VÉRITÉ locale (mode dégradé freemium intact)
        │  save() → Cloud.schedulePush() (débouncé 5 s, no-op si pas de compte)
        ▼
cloud.js  ── magic link email parent ──► Supabase Auth
        └── pull + merge + push ───────► table progression (1 blob JSON/enfant, RLS)

Incitation : voice.js patche TTS.speak — connecté = vraies voix MP3 (manifest),
anonyme = voix robot Web Speech ("la dame"). Fallback automatique si MP3 absent.
```

| Fichier | Rôle |
|---|---|
| `migrations/001_init.sql` | Schéma : `child_profiles` (max 6/parent), `progression`, `consents` (log RGPD/COPPA immuable), `feedback` (asynchrone) — RLS partout |
| `site/js/cloud.js` | Client : auth, profils, sync local-first (merge par jeu : `plays` monotone gagne ; sessions dédupliquées, cap 200) |
| `site/js/voice.js` | Patch transparent de `TTS.speak` → MP3 premium si connecté, sinon original |
| `site/js/voices-manifest.js` | Catalogue `texte normalisé → mp3` (V0 vide, à remplir au fil de la prod audio) |
| `site/compte.html` | Page parent : login magic link, profils enfants, sync manuelle |
| `site/js/tracker.js` | 2 hooks : `save()` → `schedulePush()` + chargeur cloud à la demande (seulement si profil actif) |
| `site/suivi.html` | Bouton « 👨‍👩‍👦 Compte » dans le header |

**Clés dans cloud.js** : URL projet + clé `sb_publishable_...` — publiques par design (RLS protège). La `service_role` ne vit nulle part côté client/repo, jamais.

## Mise en service (à faire une fois, dashboard)

1. **Migration** : SQL Editor → coller `migrations/001_init.sql` → Run.
   (Ou : retirer `--read-only` du MCP dans `~/.claude.json` et demander à Claude d'appliquer via `apply_migration`.)
2. **Auth → URL Configuration** :
   - Site URL : `https://kimen26.github.io/MaxPlay/`
   - Redirect URLs : ajouter `https://kimen26.github.io/MaxPlay/compte.html`
3. **Email** : provider Email activé par défaut. ⚠️ SMTP intégré bridé (~2-4 mails/h) — OK pour tester. Avant vrais utilisateurs : brancher **Resend** (gratuit 3 000/mois) dans Auth → SMTP Settings (décision audit).

## Parcours utilisateur

1. Parent ouvre `suivi.html` → « Compte » → `compte.html` → email → clique le lien reçu.
2. Crée un profil (« Max ») → devient actif → pull/merge/push immédiat.
3. Ensuite : chaque fin de partie pousse la progression (débouncé 5 s) ; les vraies voix remplacent la dame robot dès qu'un clip existe dans le manifest.
4. Multi-appareils : même compte sur la tablette → sélectionner le profil → progression fusionnée (jamais de perte : le compteur `plays` le plus haut gagne, sessions unionnées).

## Ajouter une vraie voix

1. Produire le MP3 (process audio pôle concerné).
2. Déposer dans `site/audio/voix/`.
3. Ajouter dans `voices-manifest.js` : clé = `Voice.normalize("Texte exact dit par TTS.speak")`, valeur = chemin.

## Ce qui n'existe PAS encore (volontaire — audit)

- Paiement / entitlements serveur (`unlock.js` reste local, `redeem()` déjà async pour le swap).
- Limites d'appareils (déclencheur : ~1 000 payants).
- Analytics serveur, emails marketing.
