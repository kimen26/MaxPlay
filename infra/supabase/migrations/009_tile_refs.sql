-- ─────────────────────────────────────────────────────────────────────────
--  009_tile_refs.sql — (appliquée 2026-07-13 via MCP)
--  Compos tile-picker envoyées par Papa Yann → lues par Claude en session.
--  Remplace le copier-coller de snippets Python (galère à poser).
--  - anon = INSERT only (même régime que pings 006) : le site publie, ne lit pas
--  - lecture exclusivement via MCP/dashboard (Claude en début de session tile)
--  - kind : 'reference' (loi, brique canonique) ou 'carte' (souhait à réaliser)
--  - status : 'nouveau' → 'integre' (posé en recipe .py) / 'rejete' — maj via MCP
--  Client : site/tools/tile-picker.html bouton "Envoyer à Claude" (fetch REST).
-- ─────────────────────────────────────────────────────────────────────────
create table public.tile_refs (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 80),
  kind       text not null default 'carte' check (kind in ('reference', 'carte')),
  note       text check (char_length(note) <= 500),
  cols       int  not null check (cols between 1 and 64),
  rows       int  not null check (rows between 1 and 64),
  ground     jsonb not null,
  objects    jsonb not null default '[]'::jsonb,
  status     text not null default 'nouveau' check (status in ('nouveau', 'integre', 'rejete')),
  created_at timestamptz not null default now()
);

alter table public.tile_refs enable row level security;

-- Insert ouvert aux anonymes (site GitHub Pages, clé publishable), taille bornée
-- par les checks. Pas de select/update/delete côté anon.
create policy "tile_refs insert anonyme"
  on public.tile_refs for insert
  to anon, authenticated
  with check (true);
