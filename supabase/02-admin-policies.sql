-- Run this AFTER supabase-seed.sql in your Supabase SQL editor.
-- Adds write policies so authenticated users (admins) can edit data.
-- Public still only has SELECT access (defined in supabase-seed.sql).

drop policy if exists "auth write artists" on artists;
drop policy if exists "auth write songs" on songs;
drop policy if exists "auth write picks" on picks;
drop policy if exists "auth write pick_songs" on pick_songs;

create policy "auth write artists" on artists
  for all to authenticated using (true) with check (true);

create policy "auth write songs" on songs
  for all to authenticated using (true) with check (true);

create policy "auth write picks" on picks
  for all to authenticated using (true) with check (true);

create policy "auth write pick_songs" on pick_songs
  for all to authenticated using (true) with check (true);

-- Create your admin user in Supabase dashboard:
--   Authentication -> Users -> Add user -> Create new user
-- (Disable "Confirm email" or confirm via the invite link.)
