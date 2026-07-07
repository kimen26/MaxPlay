# ARCHI-COMPTES-PROFILS.md — Comptes enfants, galerie de dessins persistée, quotas free/payant

> **Statut** : étude d'architecture (architect, 2026-07-07). Aucun code produit. **À valider par Papa Yann.**
> **Constat central** : ~60 % de l'infra demandée EXISTE DÉJÀ et est en production. Cette feature est un **incrément**, pas un chantier from-scratch.

## 0. État des lieux réel (ne pas réinventer)

| Brique existante | Fichier | Ce qu'elle fait déjà |
|---|---|---|
| Auth parent Supabase | `site/js/cloud.js` | Magic link **+ code OTP 6 chiffres** (crucial PWA iOS), session persistée |
| Projet Supabase | `WexWorld` (eu-west-1 Irlande = UE) | Provisionné, migrations 001+002 appliquées |
| Profils enfants pseudonymes | `child_profiles` (001_init.sql) | surnom seul, `parent_id` FK, max 6/parent (trigger), RLS |
| Sync progression local-first | `cloud.js` `_merge/syncNow/schedulePush` | localStorage = vérité locale, push débouncé, merge sans perte |
| Consentements RGPD | table `consents` (immuable) | écrite à la création de profil |
| UX parent | `site/compte.html` | login, profils, switch, sync, mentions légales |
| Galerie dessins locale | `site/mj-32.html` | `mj32_galerie` localStorage, JPEG dataURL ~300px q0.72, cap 12, éviction FIFO |
| Cloud à la demande | `tracker.js` | charge cloud.js seulement si `maxplay_active_child` → anonyme = zéro requête |

**Ce qui MANQUE (le vrai périmètre)** : ① avatars chibi ② persistance cloud des dessins ③ quotas 5/30 ④ entitlement free/family ⑤ trophées-puzzle + likes ⑥ profils multi-enfants SANS compte (local).

> **Reco tranchée** : on NE refait rien de la couche auth/sync. On étend `child_profiles` (avatar), on ajoute `drawings` + `drawing_likes` + `entitlements`, un bucket Storage, et on découple les profils du réseau (Phase 1 locale).

## 1. Architecture

- Client statique GitHub Pages, **localStorage = source de vérité locale** (offline-first garanti), `cloud.js` chargé à la demande, Supabase (anon key publique + RLS partout, jamais de service_role côté client).
- **Auth = magic link + OTP parent, inchangé.** Auth anonyme Supabase **rejetée** (users fantômes, RGPD flou, RLS compliqué). Device-code **rejeté** en V1.
- Sync dessins : `pull → merge → push`, union par `id` client (uuid v4), jamais d'écrasement destructif.

## 2. Modèle de données (migration `003_drawings_avatars_entitlements.sql`)

- `child_profiles` +col `avatar text default 'chibi-01' check (avatar ~ '^chibi-[0-9]{2}$')` — **clé d'asset local** (SVG/Lottie dans `site/`), JAMAIS une image uploadée (XSS, modération, stockage).
- `drawings(id uuid client, child_id FK cascade, dino, storage_path, created_at)` + RLS parent-only + index. **Méta en base, binaire en Storage.**
- `drawing_likes(drawing_id PK, liked bool, updated_at)` — **cœur PRIVÉ sur ses propres dessins**, zéro social inter-comptes (seul modèle COPPA-safe).
- `entitlements(parent_id PK, tier 'free'|'family', source, granted_at, expires_at)` — **écrit UNIQUEMENT par Edge Function service_role** (sinon auto-upgrade trivial). Client = lecture seule via RLS.
- **Quota enforced serveur** : trigger `check_drawing_quota` before insert (free=5, family=30) — le client peut mentir, la base non. (SQL complet dans le rendu architect, conservé dans le transcript session 2026-07-07.)

## 3. Stockage dessins

- Format : **JPEG dataURL ~300px q0.72** (existant mj-32, ~15-30 Ko), PAS de PNG.
- Bucket Storage **privé** `drawings/<parent_id>/<child_id>/<id>.jpg`, policy sur le préfixe = auth.uid().
- **Free plein (5/5) : ZÉRO suppression auto** (info-loss enfant interdite) — message doux + l'enfant efface lui-même (appui long → corbeille). Overflow reste en localStorage (`mj32_galerie_<childId>`) ; le cloud garde les épinglés.
- Upgrade free→family : instantané (le quota est un count recalculé).

## 4. UX 4-8 ans

- **L'enfant ne voit JAMAIS** : clavier email, "payant", compte. Tout ça vit dans `compte.html` (parent).
- Écran **"Qui joue ?"** : gros boutons profils + ➕ Nouveau → **grille d'avatars chibi tap-only** → pseudo facultatif (liste de surnoms pré-remplis tap-only + champ texte optionnel ; défaut = nom de l'avatar).
- Switch : bouton avatar en haut du menu → re-ouvre "Qui joue ?".
- **Super-victoire : Lottie JSON** (léger, vectoriel), PAS de vidéo MP4 (lourd, autoplay bridé). Assets `site/lottie/chibi-<id>.json` à la demande.

## 5. Monétisation SANS store (deux temps)

1. **V1 codes cadeau** `MAXPLAY-XXXX` (généralise le pattern `unlock.js redeem()` / TRITRI) : parent tape le code dans compte.html → Edge Function `redeem-entitlement` (service_role) valide contre `gift_codes` → écrit `entitlements`. Zéro dépendance, distribution à la main, beta-friendly.
2. **V2 Stripe Payment Link** (URL hébergée Stripe, zéro backend checkout) + webhook → Edge Function. `client_reference_id` = auth.uid() parent. Pas d'IAP store (pas de commission — avantage PWA).

## 6. Phasage & effort

| Phase | Contenu | Réseau | Effort |
|---|---|---|---|
| **P1 — Profils locaux + avatars** | avatars.js (catalogue chibi), écran "Qui joue ?", profils localStorage, galerie mj-32 liée au childId, Lottie super-victoire | **Non** | ~2-3 j |
| **P2 — Sync cloud dessins + quotas** | migration 003, bucket + policies, cloud.js étendu (list/push/pullDrawings), trigger quota, UX galerie pleine | Oui | ~3-4 j |
| **P3 — Puzzle + likes + payant** | drawing_likes + cœur, fragments-trophées, entitlements + Edge Function codes (Stripe = V2) | Oui | ~4-6 j |

> **Reco #1 : P1 d'abord, testée avec Max avant toute ligne de cloud** — 80 % du ressenti pour 20 % de l'effort et 0 % de risque légal. Assets chibi : sourcer sur LottieFiles (libres) avant d'en commander (règle "chercher ressource d'abord").

## 7. Risques (mitigés)

- Anon key publique = OK by design (RLS). service_role jamais côté client.
- COPPA/RGPD : modèle déjà audité 2026-07-06 (titulaire=parent, enfant=surnom, UE). Ajouts sûrs : avatar=clé, dessins jamais publics, likes privés. **Ne jamais introduire** de partage social/contact entre enfants/upload libre. Suppression compte = cascade + purge Storage à prévoir.
- Auto-upgrade frauduleux : bloqué (Edge Function only + trigger serveur).
- Coûts : free tier Supabase ≈ 33 000 dessins à 30 Ko. Brancher **Resend** (3 000 mails/mois gratuits) avant vrais utilisateurs (SMTP Supabase bridé).
- localStorage iOS volatile : le cloud garde les épinglés ; clé galerie par childId.

## 8. Questions à trancher par Papa Yann

1. OK pour appliquer la **migration 003** + brancher **Resend** ? (projet Supabase déjà existant, rien à créer)
2. Monétisation : **codes cadeau d'abord, Stripe ensuite** — OK ? Ou Stripe direct ?
3. Quotas : **5 free / 30 family** confirmés ? Family à vie ou abonnement ?
4. Avatars : **clé d'asset local** (pas d'upload enfant) + sourcer 8-12 chibis Lottie libres — OK ? Combien au départ ?
5. Likes = **cœur privé** sur ses propres dessins (pas de social) — confirmé ?
6. Phasage **P1 locale d'abord, testée avec Max** — validé ?
7. **Trophées-puzzle à cadrer** (zone floue) : quel dessin devient puzzle ? combien de fragments ? gagnés en jouant à quoi ?
