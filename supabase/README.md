# Supabase scripts

Run these in the Supabase SQL editor, in order:

| File | Purpose |
|------|---------|
| `01-seed.sql` | Schema + RLS read policies + initial artist/song/pick data |
| `02-admin-policies.sql` | RLS write policies for authenticated users (admin) |
| `03-youtube-column.sql` | Adds `youtube_url` column to `songs` and `pick_songs` |
| `04-youtube-data.sql` | Bulk-update YouTube URLs (verify before running — see file header) |

`01` and `02` are required for the app to function. `03` is required before any YouTube URL can be stored. `04` is optional bulk data.
