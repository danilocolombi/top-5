-- Editor's Picks: 4 curated artists shown on the home page.
-- Run after 01-seed.sql.

create table if not exists editor_picks (
  rank int primary key,
  artist_id int not null references artists(id) on delete cascade
);

alter table editor_picks enable row level security;

drop policy if exists "public read editor_picks" on editor_picks;
drop policy if exists "auth write editor_picks" on editor_picks;

create policy "public read editor_picks" on editor_picks
  for select using (true);

create policy "auth write editor_picks" on editor_picks
  for all to authenticated using (true) with check (true);
