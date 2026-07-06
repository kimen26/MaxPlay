# Audit Infra & Business MaxPlay — 2026-07-06

> Audit architecte solution + growth (Fable 5, recherche web 4 axes : pricing infra, légal enfants, pricing concurrents, PWA/stores).
> Sources chiffrées 2025-2026 citées en fin de doc. Révisé même jour après retours Yann (codes cadeaux, lazy-load, distribution).

---

## 0. Cadrage — le vrai risque

Le risque n° 1 n'est **ni la sécurité, ni le scale, ni le piratage** : c'est la **découverte** (personne ne trouve l'app). Effort : 90 % produit + distribution, 10 % infra.

- « Dispo 5 continents » = **réglée par le CDN seul** (Cloudflare ~330 PoPs). Backend léger tolère 200-300 ms vers une région EU unique. Sujet clos.
- **Phase actuelle : Phase 0, et on y reste** tant que pas ~50-100 foyers actifs hors famille/amis. Pas une ligne de backend avant.
- ⚠️ Tendance connue de l'auteur : sur-construire avant traction. Ce doc sert de garde-fou.

---

## 1. Décisions prises (2026-07-06)

| # | Décision | Détail |
|---|----------|--------|
| 1 | **Modèle de compte** | Parent titulaire, enfant = profil pseudonyme sous le compte. Zéro email/téléphone/DOB enfant. Surnom + progression, c'est tout. |
| 2 | **Entitlements serveur** | Déblocage = ligne en base liée au compte parent, écrite par webhook paiement, vérifiée côté serveur. Jamais de flag client. |
| 3 | **Codes cadeaux** (révisé, validé) | Cas d'usage retenu : grand-parent/proche OFFRE un contenu. Code généré à l'achat, lié à l'email de l'acheteur, **usage unique**, brûlé au rachat → entitlement écrit sur le compte parent qui l'active. Très personnalisé pour pas cher. ❌ Ce qui reste interdit : code générique réutilisable = vecteur « 1 paie, 50 utilisent ». Le code est un *canal d'achat*, pas un *mécanisme de déblocage*. |
| 4 | **Feedback** | Asynchrone, parent uniquement (formulaire → table, lu plus tard). Pas de live/websockets. Enfants ne postent jamais de contenu (légal + modération). |
| 5 | **Paiement** | Merchant of Record (Paddle ou Lemon Squeezy, ~5 % + 0,50) : gère TVA/sales tax mondiale — vital en solo. Bascule Stripe direct (1,5 % + 0,25 EU) si CA > ~50 k€/an (économie ~14 k€/an à 10 k payants). |
| 6 | **Hébergement** | Migrer GitHub Pages → **Cloudflare Pages** (0 €, headers custom, Workers à portée). Supabase **région Francfort** quand le backend naît. |
| 7 | **Analytics** | Privacy-first sans cookies (Cloudflare Web Analytics 0 €, exemption consentement CNIL). Jamais GA4/pixels — aussi requis par Apple Kids Category si store un jour. |
| 8 | **Contenu à la demande** (révisé, validé) | Lazy-load : shell léger précaché, contenu (histoires, fiches dino, audio) téléchargé à la consommation + gardé offline (service worker cache-on-demand). R2 egress = 0 € → « plus de trafic » ne coûte rien. Résout aussi la peur du wrapper lourd : un TWA = shell de quelques Mo, contenu streamé. Contrainte iOS : Cache API ~50 Mo → précacher sélectif, purge LRU. |

## 2. Décisions différées (avec déclencheur)

| Décision | Déclencheur |
|----------|-------------|
| Backend (auth + entitlements) | 1er contenu payant prêt à VENDRE |
| Limites d'appareils (cap souple ~5) | ~1 000 payants |
| Wrapper Google Play (TWA, 25 $ one-shot, légal via PWABuilder) | Plateau croissance organique OU demande store récurrente des parents |
| iOS App Store | CA > ~10 k€/an ET besoin découverte prouvé (wrapper PWA = rejet guideline 4.2 ; Kids Category = review lourde + 99 $/an) |
| Multi-région données | Probablement jamais — EU suffit légalement partout |
| Pubs payantes | Funnel de conversion mesuré + LTV connue (voir § 8) |

---

## 3. Légal enfants (GATING — tout en découle)

Sources : CNIL rec. mineurs + cookies MAJ 01/2026 · FTC COPPA Final Rule avr. 2025 (compliance 22/04/2026) · ICO AADC (enforcement 03/2026) · Brésil Digital ECA (effectif 17/03/2026).

Le modèle **compte parent** règle 90 % du problème :
- **Autorisé** : surnom enfant (choisi par parent), progression, langue, stats agrégées/pseudonymes (exemption COPPA « internal operations » ; base contractuelle RGPD).
- **Interdit** : tracking comportemental, pub ciblée, identifiants persistants cross-site, partage tiers, données perso enfant (email, photo, DOB précise, géoloc), contenu enfant public.
- **Consentement vérifiable COPPA** : le paiement carte du parent EST une méthode acceptée → la monétisation = le mécanisme de consentement. Gratuit.
- **Traçable côté PARENT** : email, billing, logs de consentement horodatés (table `consents`). **Côté ENFANT** : progression pseudonyme uniquement, jamais exportée.
- **Résidence** : RGPD n'impose pas l'UE (DPF validé Tribunal UE 09/2025 mais fragile). Supabase Francfort = risque zéro, coût zéro.
- **Pubs vers enfants : interdites/bannies** (DSA UE interdit la pub ciblée aux mineurs ; Meta/Google/TikTok bloquent le ciblage <13 ans). Toute pub cible LE PARENT. Structurant pour la distribution (§ 8).

## 4. Distribution : PWA-first — validé avec 2 caveats

| Critère | PWA pure | Store (wrappé) |
|---|---|---|
| Découverte | quasi nulle sans marketing | 65 % acquisition apps enfants via recherche store… si on rank (un inconnu ne rank pas) |
| Confiance parent | à construire | Kids Category = label |
| Coût | 0 € | Google 25 $ one-shot (TWA légal) ; Apple 99 $/an + wrapper interdit (4.2) |
| Commission | 0 % (paiement web) | 15-30 % ; Apple US link-out volatil juridiquement |
| Push iOS | OK depuis 16.4 mais PWA installée uniquement | natif |
| Storage iOS | éviction 7 j en tab ; PWA installée ~60 % disque, sans garantie | natif |

- **Caveat 1** : progression 100 % IndexedDB = fragile sur iOS (éviction). En Phase 1, la sync serveur devient un ARGUMENT PRODUIT du compte gratuit (« ne perds pas les étoiles de ton enfant »), pas de la plomberie.
- **Caveat 2** : install iOS = 3-4 taps manuels → écran d'aide « installer sur iPhone » soigné obligatoire.

## 5. Archi phasée 0→3 — validée, chiffrée

Hypothèse primitives invariantes (statique+CDN, auth managée, Postgres managé, paiement web) : **confirmée**. Zéro réécriture de 0 à 10 000 payants.

Scénarios (conversion freemium 2-5 % ⇒ users ≈ payants × 20-50) :

| | 100 payants/an | 1 000 | 10 000 |
|---|---|---|---|
| CDN/Pages | CF Pages free | free ou Pro 5 $ | Pro 5 $ |
| DB + Auth | Supabase **Pro 25 $/mois dès le 1er payant** (free tier PAUSE après 1 sem inactivité — inacceptable avec clients) | Pro 25 $ (50 k MAU inclus) | Pro + compute ~100-250 $/mois |
| Workers | free (100 k req/j) | Paid 5 $/mois | 5-20 $/mois |
| Paiement (MoR 5 %+0,50) | ~250 €/an | ~2 500 €/an | ~25 000 €/an → bascule Stripe |
| **Total infra fixe** | **~25-30 $/mois** | **~35-40 $/mois** | **~150-300 $/mois** |
| CA (à ~40 €/an) | ~4 k€ | ~40 k€ | ~400 k€ |
| Infra/CA | <1 % | ~1 % | <1 % |

- **Phase 0 (maintenant, 0 €)** : statique CF Pages, freemium local, aucun compte.
- **Phase 1 (1er contenu vendable, ~25 $/mois)** : Supabase (magic link parent + Postgres + RLS, Francfort) + checkout MoR + webhook → `entitlements`. Contenu premium servi via Worker authentifié + R2 (pas dans le bundle public).
- **Phase 2** : mêmes primitives, tiers supérieurs, vérif entitlement en Worker + cache.
- **Phase 3** : TWA Play ; iOS store sur déclencheur seulement.

## 6. Monétisation

Benchmark 2025-2026 : Bayam ~4,60 €/mois · Sago Mini ~6 $ · Holy Owly 9,99 € (famille 15,99 €) · ABCmouse 45 $/an · Lingokids Plus ~15 $/mois · Khan Academy Kids & Duolingo ABC **gratuits** (écrasent la willingness-to-pay). Achat unique quasi disparu. Fourchette annuelle acceptée : 40-90 €.

**Reco** (le 9,99 €/mois du benchmark naïf est rejeté — prix d'apps à marque + catalogue + store ; nous = solo, inconnu, PWA) :
- **Gratuit** : 5-8 mini-jeux, progression locale.
- **Pass Famille : 4,99 €/mois ou 39 €/an** (annuel poussé en premier). Tout le contenu + sync multi-appareils + profils multi-enfants. Familial par défaut = colle au modèle légal compte-parent + neutralise le partage intra-foyer en le légitimant.
- Option : fondateur à vie 59-79 € (trésorerie + ambassadeurs).
- **Codes cadeaux** (§ 1.3) = canal d'achat émotionnel (grand-parent offre un pôle/pack), même entitlement serveur derrière.
- Déblocage par pôle : non — catalogue trop petit, complexité pour rien.

## 7. Anti-fraude — right-sizing

Règle : parade justifiée si `pertes évitées > coût + friction honnête`. Sous 1 000 payants, pertes piratage ≈ dizaines d'€.

| Vecteur | Verdict |
|---|---|
| Codes génériques réutilisables | Ne jamais créer. Codes cadeaux = usage unique, liés acheteur + rachat (§ 1.3). |
| Partage de compte inter-foyers | Ignorer < 1 000 payants (39 €/an, le prix EST la parade). Ensuite : cap souple 5 appareils, message gentil, pas de blocage dur. |
| Rip assets premium | Contenu premium derrière Worker authentifié dès Phase 1 (gratuit architecturalement). DRM lourd : jamais rentable à cette échelle. |
| Chargebacks | Stripe Radar / MoR inclus. Rien à faire. |

## 8. Distribution & acquisition — challenge du mode « pubs en masse + l'enfant y va tout seul »

Réf. étude existante : [`studio/narration/memory/business/livre-histoire-multinationaux.md`](../studio/narration/memory/business/livre-histoire-multinationaux.md) (marchés Afrique/Asie/AmSud/Russie, canaux X/WhatsApp/Telegram, analyse Lunii/Tonies/Yoto, KDP/StreetLib).

**3 objections au mode envisagé :**
1. **« L'enfant y va tout seul » ne marche pas à 4 ans.** Cible 3-6 ans = le PARENT est le gatekeeper (découvre, installe, paie). Et pub ciblant des enfants = interdite (DSA UE) + bannie par les plateformes elles-mêmes. Toute acquisition passe par le parent. Point légal ET produit.
2. **« Pubs en masse » contredit « budget quasi nul »** et l'économie ne passe pas : CAC install apps enfants ≈ 2-10 €, conversion 2-5 % → CAC par payant 50-200 € vs LTV 39 €/an. Unit economics négatives tant que le funnel n'est pas mesuré. Pubs = Phase 2+, petites, ciblées parents, après mesure de conversion.
3. **L'étude X/WhatsApp elle-même conclut contre X comme canal de revenu** (monétisation X : 2 000 followers vérifiés + 5 M impressions/3 mois — top of funnel seulement). Ses points forts à garder : **Telegram/WhatsApp channels** comme canal de CONTENU (extraits d'histoires audio → lien PWA) pour Afrique/Asie SE/Brésil ; YouTube pour la découverte gratuite. Ses points faibles : paiements locaux (M-Pesa, carrier billing, YooKassa) = lourd en solo, incompatible Phase 0-1 ; régulations réseaux sociaux mineurs (Kazakhstan etc.) fragilisent ces canaux.

**Modèle retenu : content-led, organique d'abord.** Extraits gratuits (histoires audio, mini-jeu démo) diffusés là où sont les parents (YouTube, Instagram/TikTok parental, WhatsApp/Telegram par région) → lien vers la PWA → freemium → conversion. La pub payante n'arrive qu'avec un funnel mesuré. L'étude narration reste la référence pour la géo-priorisation (Brésil = hub AmLat naturel, origines de Max).

## 9. Auth + sécurité BDD

Schéma minimal 6 tables : `parents` (auth Supabase) · `child_profiles` · `progression` · `entitlements` · `consents` (log COPPA/CNIL horodaté) · `feedback`. + `gift_codes` (code, acheteur, produit, redeemed_by, redeemed_at) en Phase 1 si codes cadeaux activés.

- Magic link email parent (pas de mot de passe). RLS Postgres : chaque parent ne voit que ses lignes.
- Secrets en env vars Workers/Supabase. CB jamais chez nous (checkout hébergé MoR/Stripe). Webhooks signés.
- Surface : ~3-4 endpoints (login, sync progression, check entitlement, redeem gift).
- **« Assez sécurisé » = RLS + magic link + checkout hébergé + webhook signé.** Sur-ingénierie à NE PAS faire : WAF dédié, KMS custom, pentest, SOC2, chiffrement applicatif au-dessus du at-rest.

## 10. Angles morts — à trancher par Yann

1. **Généralisation produit** : MaxPlay est hyper-personnalisé (bus Villejuif, trajets de Max). Qu'est-ce qui se vend à l'enfant de Lisbonne/São Paulo ? Décision produit AVANT infra.
2. **Statut juridique** : vendre = entité (micro-entreprise suffit) + politique de confidentialité + mentions. MoR allège la TVA, pas l'immatriculation.
3. **Nom/marque** : « MaxPlay » déposable/disponible ? À vérifier avant notoriété.
4. **Temps solo** : Phase 1 backend ≈ 2-3 week-ends, pas plus. Chaque heure d'infra = une heure de moins sur contenu + distribution.

---

## Sources principales (consultées 2026-07-06)

- Pricing : [Cloudflare Pages/Workers/R2/D1](https://developers.cloudflare.com/pages/platform/limits/) · [Supabase](https://supabase.com/pricing) · [Neon](https://neon.com/pricing) · [Clerk](https://clerk.com/pricing) · [Stripe](https://stripe.com/pricing) · [Lemon Squeezy](https://docs.lemonsqueezy.com/help/getting-started/fees) · [Paddle](https://www.paddle.com/pricing) · [Vercel](https://vercel.com/pricing)
- Légal : [FTC COPPA Final Rule 04/2025](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule) · [CNIL 8 recommandations mineurs](https://www.cnil.fr/fr/la-cnil-publie-8-recommandations-pour-renforcer-la-protection-des-mineurs-en-ligne) · [CNIL cookies/analytics MAJ 01/2026](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience) · [ICO AADC](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/) · [Brésil Digital ECA](https://www.insideprivacy.com/childrens-privacy/brazil-adopts-law-protecting-minors-online/) · [DPF Tribunal UE 09/2025](https://www.itic.org/news-events/news-releases/european-general-court-confirms-validity-of-eu-u-s-data-privacy-framework-strengthening-legal-certainty-for-transatlantic-data-flows)
- Concurrents : sites éditeurs (Lingokids, ABCmouse, Bayam/Milan, Holy Owly, Sago Mini, Khan Academy Kids, Duolingo ABC), 2025-2026.
- PWA/stores : [WebKit storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/) · [Apple DMA/EU](https://developer.apple.com/support/dma-and-apps-in-the-eu/) · [Google Play User Choice Billing](https://support.google.com/googleplay/android-developer/answer/13821247) · [MobiLoud PWA stores](https://www.mobiloud.com/blog/publishing-pwa-app-store) · [Searchlab ASO 2026](https://searchlab.nl/en/statistics/app-marketing-aso-statistics-2026)

---

_Créé 2026-07-06 (audit Fable 5, 4 recherches web parallèles). Révisé même jour : codes cadeaux validés (usage unique, lié acheteur), lazy-load contenu validé (R2 egress 0 €), mode « pubs en masse / enfant autonome » remplacé par content-led organique ciblant les parents._
