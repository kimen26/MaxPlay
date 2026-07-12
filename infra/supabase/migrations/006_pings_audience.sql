-- ─────────────────────────────────────────────────────────────────────────
--  006_pings_audience.sql — (appliquée 2026-07-12 via MCP)
--  Mesure d'audience anonyme, régime exemption CNIL :
--  - device_hash = UUID aléatoire local, JAMAIS croisé avec les comptes
--  - 1 ligne max par appareil et par jour (PK), aucun autre attribut
--  - anon = INSERT only (aucun SELECT public — lecture via MCP/dashboard)
--  - rétention : purger > 13 mois (manuel/MCP, pas de pg_cron pour l'instant)
--  Client : site/js/ping.js (fetch REST léger, sans SDK).
-- ─────────────────────────────────────────────────────────────────────────
create table public.pings (
  device_hash uuid not null,
  day         date not null default current_date,
  logged_in   boolean not null default false,
  created_at  timestamptz not null default now(),
  primary key (device_hash, day)
);

alter table public.pings enable row level security;

-- Insert ouvert aux anonymes, mais uniquement pour la date du jour
-- (empêche de remplir le passé/futur) — et rien d'autre : pas de select,
-- pas d'update, pas de delete.
create policy "ping anonyme du jour"
  on public.pings for insert
  to anon, authenticated
  with check (day = current_date);
