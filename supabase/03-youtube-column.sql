-- Add YouTube URL support to songs and pick_songs.
-- Run this in the Supabase SQL editor.

alter table songs add column if not exists youtube_url text;
alter table pick_songs add column if not exists youtube_url text;
