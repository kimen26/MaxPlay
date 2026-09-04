# Supabase MaxPlay — auth parent + sync progression (Phase 1 light)

> Projet : `WexWorld` (`bfrugwrzpefsaehsvypt`, eu-west-1 Irlande = UE ✅).
> Modèle légal : audit [`memory/audits/2026-07-06-infra-business.md`](../../memory/audits/2026-07-06-infra-business.md) — compte PARENT, enfant = surnom pseudonyme, zéro donnée perso enfant.

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
| `migrations/001_init.sql` | Schéma : `child_profiles` (max 6/parent), `progression`, `consents` (log RGPD/COPPA immuable), `feedback` (⚠️ RÉSERVÉE, non branchée — le feedback réel passe par `annotations`, cf. migration 010) — RLS partout |
| `migrations/003..005` (✅ appliquées 2026-07-12 via MCP) | `game_sessions` (1 ligne/partie, append-only, suivi/debug requêtable) · `child_state` (sync clé-valeur : unlocks, avatar, ambiance, langue, états mj-20/32/37) · `annotations` (💬 comments + notes revue + payloads duel/lecture — fin du copier-coller JSON) |
| `migrations/009..012` (✅ appliquées 2026-07-13/14 via MCP) | `tile_refs` (orpheline depuis 2026-09-05, pipeline tiles archivé, à supprimer par migration dédiée) · purge `pings` 13 mois (pg_cron CNIL) · `feedback` réservée · policy DELETE `game_sessions` · **reset RGPD anonymisant** : RPC `reset_child_anonymized` agrège l'usage dans `usage_stats_anon` + journalise dans `reset_events` (anonymes) PUIS purge le nominatif |
| `site/js/cloud.js` | Client : auth, profils, sync local-first. **Merge anti-perte (audit 2026-07-14)** : agrégats progression recalculés depuis l'history unionné (plus de max-pick) ; `child_state` fusionné par clé (max des paliers de langue, union des déblocages/dessins) ; `resetChild()` vide le cloud avant le local ; flush `pagehide`/`visibilitychange` ; annotations poussées dès connexion |
| `site/js/voice.js` | Patch transparent de `TTS.speak` → MP3 premium si connecté, sinon original |
| `site/js/voices-manifest.js` | Catalogue `texte normalisé → mp3` (V0 vide, à remplir au fil de la prod audio) |
| `site/compte.html` | Page parent : login magic link, profils enfants, sync manuelle |
| `site/js/tracker.js` | 2 hooks : `save()` → `schedulePush()` + chargeur cloud à la demande (seulement si profil actif) |
| `site/suivi.html` | Bouton « 👨‍👩‍👦 Compte » dans le header |

**Clés dans cloud.js** : URL projet + clé `sb_publishable_...` — publiques par design (RLS protège). La `service_role` ne vit nulle part côté client/repo, jamais.

## Mise en service (à faire une fois, dashboard)

1. **Migrations** : SQL Editor → `001_init.sql` (✅ appliquée 2026-07-06) puis `002_indexes_hardening.sql` (index RLS + fix 3 WARN advisors).
2. **Auth → URL Configuration** :
   - Site URL : `https://kimen26.github.io/MaxPlay/`
   - Redirect URLs : ajouter `https://kimen26.github.io/MaxPlay/compte.html`
3. **Email → Templates → Magic Link** : ajouter le code à côté du lien, ex :
   `<p>Ou tape ce code dans l'app : {{ .Token }}</p>`
   ⚠️ Indispensable pour la PWA iOS : le lien magique s'ouvre dans Safari dont le stockage est SÉPARÉ de la PWA installée → la session n'atterrit jamais dans l'app. Le code à 6 chiffres, saisi dans compte.html, règle ça.
4. **Email** : provider Email activé par défaut. ⚠️ SMTP intégré bridé (~2-4 mails/h) — OK pour tester. Avant vrais utilisateurs : brancher **Resend** (gratuit 3 000/mois) dans Auth → SMTP Settings (décision audit).

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
