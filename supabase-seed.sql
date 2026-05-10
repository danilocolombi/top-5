-- Schema
create table if not exists artists (
  id int generated always as identity primary key,
  slug text unique not null,
  name text not null,
  genres text[] not null default '{}',
  bio text,
  avatar_color text not null
);

create table if not exists songs (
  artist_id int references artists(id) on delete cascade,
  rank int not null,
  title text not null,
  album text,
  year int,
  primary key (artist_id, rank)
);

create table if not exists picks (
  kind text primary key check (kind in ('weekly','throwback')),
  week_of date not null,
  editor_note text
);

create table if not exists pick_songs (
  pick_kind text references picks(kind) on delete cascade,
  rank int not null,
  title text not null,
  album text,
  year int,
  artist_id int not null references artists(id),
  primary key (pick_kind, rank)
);

-- RLS: public read only
alter table artists enable row level security;
alter table songs enable row level security;
alter table picks enable row level security;
alter table pick_songs enable row level security;

drop policy if exists "public read artists" on artists;
drop policy if exists "public read songs" on songs;
drop policy if exists "public read picks" on picks;
drop policy if exists "public read pick_songs" on pick_songs;

create policy "public read artists" on artists for select using (true);
create policy "public read songs" on songs for select using (true);
create policy "public read picks" on picks for select using (true);
create policy "public read pick_songs" on pick_songs for select using (true);

-- Seed
truncate pick_songs, picks, songs, artists restart identity cascade;

insert into artists (slug, name, genres, bio, avatar_color) values ('kendrick-lamar', 'Kendrick Lamar', ARRAY['Hip-Hop'], 'Pulitzer Prize-winning rapper from Compton who redefined what hip-hop can say.', '#7c3aed');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kendrick-lamar'), 1, 'Alright', 'To Pimp a Butterfly', 2015);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kendrick-lamar'), 2, 'HUMBLE.', 'DAMN.', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kendrick-lamar'), 3, 'Money Trees', 'good kid, m.A.A.d city', 2012);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kendrick-lamar'), 4, 'Swimming Pools (Drank)', 'good kid, m.A.A.d city', 2012);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kendrick-lamar'), 5, 'DNA.', 'DAMN.', 2017);
insert into artists (slug, name, genres, bio, avatar_color) values ('beyonce', 'Beyoncé', ARRAY['Pop','R&B'], 'Queen Bey. Performer, director, businesswoman, and cultural force.', '#ca8a04');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'beyonce'), 1, 'Crazy in Love', 'Dangerously in Love', 2003);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'beyonce'), 2, 'Formation', 'Lemonade', 2016);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'beyonce'), 3, 'Single Ladies', 'I Am... Sasha Fierce', 2008);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'beyonce'), 4, 'Irreplaceable', 'B''Day', 2006);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'beyonce'), 5, 'Halo', 'I Am... Sasha Fierce', 2008);
insert into artists (slug, name, genres, bio, avatar_color) values ('kanye-west', 'Kanye West', ARRAY['Hip-Hop','Pop'], 'Producer turned rapper who reinvented himself album after album.', '#374151');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kanye-west'), 1, 'Runaway', 'My Beautiful Dark Twisted Fantasy', 2010);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kanye-west'), 2, 'All Falls Down', 'The College Dropout', 2004);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kanye-west'), 3, 'Gold Digger', 'Late Registration', 2005);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kanye-west'), 4, 'Stronger', 'Graduation', 2007);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'kanye-west'), 5, 'Ultralight Beam', 'The Life of Pablo', 2016);
insert into artists (slug, name, genres, bio, avatar_color) values ('stevie-wonder', 'Stevie Wonder', ARRAY['R&B','Soul','Funk'], 'A blind child prodigy who grew into one of music''s greatest creative forces.', '#065f46');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'stevie-wonder'), 1, 'Superstition', 'Talking Book', 1972);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'stevie-wonder'), 2, 'Isn''t She Lovely', 'Songs in the Key of Life', 1976);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'stevie-wonder'), 3, 'Sir Duke', 'Songs in the Key of Life', 1976);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'stevie-wonder'), 4, 'Higher Ground', 'Innervisions', 1973);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'stevie-wonder'), 5, 'Living for the City', 'Innervisions', 1973);
insert into artists (slug, name, genres, bio, avatar_color) values ('nirvana', 'Nirvana', ARRAY['Rock','Grunge'], 'Kurt Cobain''s band blew up MTV and changed rock forever in three short years.', '#1e3a5f');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'nirvana'), 1, 'Smells Like Teen Spirit', 'Nevermind', 1991);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'nirvana'), 2, 'Come as You Are', 'Nevermind', 1991);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'nirvana'), 3, 'Heart-Shaped Box', 'In Utero', 1993);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'nirvana'), 4, 'Lithium', 'Nevermind', 1991);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'nirvana'), 5, 'The Man Who Sold the World', 'MTV Unplugged in New York', 1994);
insert into artists (slug, name, genres, bio, avatar_color) values ('jay-z', 'Jay-Z', ARRAY['Hip-Hop'], 'From Marcy to the Louvre. Business mogul and one of hip-hop''s all-time greats.', '#1e40af');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'jay-z'), 1, 'Empire State of Mind', 'The Blueprint 3', 2009);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'jay-z'), 2, 'IZZO (H.O.V.A.)', 'The Blueprint', 2001);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'jay-z'), 3, '99 Problems', 'The Black Album', 2003);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'jay-z'), 4, 'Big Pimpin''', 'Vol. 3... Life and Times of S. Carter', 1999);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'jay-z'), 5, 'Hard Knock Life', 'Vol. 2... Hard Knock Life', 1998);
insert into artists (slug, name, genres, bio, avatar_color) values ('taylor-swift', 'Taylor Swift', ARRAY['Pop','Country'], 'Genre-defying storyteller who turned personal narratives into cultural events.', '#9d174d');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'taylor-swift'), 1, 'All Too Well (10 Minute Version)', 'Red (Taylor''s Version)', 2021);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'taylor-swift'), 2, 'Anti-Hero', 'Midnights', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'taylor-swift'), 3, 'Love Story', 'Fearless', 2008);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'taylor-swift'), 4, 'Shake It Off', '1989', 2014);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'taylor-swift'), 5, 'cardigan', 'folklore', 2020);
insert into artists (slug, name, genres, bio, avatar_color) values ('mgk', 'Machine Gun Kelly', ARRAY['Pop Punk','Hip-Hop'], 'Cleveland''s own. Crossed from rap to pop punk and brought a generation with him.', '#f43f5e');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'mgk'), 1, 'bloody valentine', 'tickets to my downfall', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'mgk'), 2, 'my ex''s best friend', 'tickets to my downfall', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'mgk'), 3, 'Concert for Aliens', 'tickets to my downfall', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'mgk'), 4, 'twin flame', 'mainstream sellout', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'mgk'), 5, 'lead you on', 'mainstream sellout', 2022);
insert into artists (slug, name, genres, bio, avatar_color) values ('drake', 'Drake', ARRAY['Hip-Hop','R&B'], 'From Degrassi to the biggest streaming numbers in history. The 6 God reigns.', '#854d0e');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'drake'), 1, 'Passionfruit', 'More Life', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'drake'), 2, 'God''s Plan', 'Scorpion', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'drake'), 3, 'Hotline Bling', 'Views', 2016);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'drake'), 4, 'One Dance', 'Views', 2016);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'drake'), 5, 'Started from the Bottom', 'Nothing Was the Same', 2013);
insert into artists (slug, name, genres, bio, avatar_color) values ('j-cole', 'J. Cole', ARRAY['Hip-Hop'], 'Dreamville''s architect. No features, no gimmicks — just bars and growth.', '#d97706');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'j-cole'), 1, 'No Role Modelz', '2014 Forest Hills Drive', 2014);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'j-cole'), 2, 'Love Yourz', '2014 Forest Hills Drive', 2014);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'j-cole'), 3, 'Wet Dreamz', '2014 Forest Hills Drive', 2014);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'j-cole'), 4, 'Middle Child', 'Middle Child', 2019);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'j-cole'), 5, 'ATM', 'KOD', 2018);
insert into artists (slug, name, genres, bio, avatar_color) values ('central-cee', 'Central Cee', ARRAY['UK Rap','Hip-Hop'], 'West London''s finest export. Turned drill introspective and global overnight.', '#0369a1');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'central-cee'), 1, 'Doja', '23', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'central-cee'), 2, 'Loading', 'Wild West', 2021);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'central-cee'), 3, 'Day in the Life', 'Wild West', 2021);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'central-cee'), 4, 'Obsessed With You', '23', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'central-cee'), 5, 'Sprinter', 'Sprinter', 2023);
insert into artists (slug, name, genres, bio, avatar_color) values ('oasis', 'Oasis', ARRAY['Rock','Britpop'], 'The Gallagher brothers gave a generation its anthems. Mayhem included.', '#1d4ed8');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'oasis'), 1, 'Wonderwall', '(What''s the Story) Morning Glory?', 1995);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'oasis'), 2, 'Champagne Supernova', '(What''s the Story) Morning Glory?', 1995);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'oasis'), 3, 'Don''t Look Back in Anger', '(What''s the Story) Morning Glory?', 1996);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'oasis'), 4, 'Live Forever', 'Definitely Maybe', 1994);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'oasis'), 5, 'Supersonic', 'Definitely Maybe', 1994);
insert into artists (slug, name, genres, bio, avatar_color) values ('red-hot-chili-peppers', 'Red Hot Chili Peppers', ARRAY['Rock','Funk'], 'Funky monks from LA who turned arena rock into a full-body experience.', '#dc2626');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'red-hot-chili-peppers'), 1, 'Under the Bridge', 'Blood Sugar Sex Magik', 1991);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'red-hot-chili-peppers'), 2, 'Californication', 'Californication', 1999);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'red-hot-chili-peppers'), 3, 'Scar Tissue', 'Californication', 1999);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'red-hot-chili-peppers'), 4, 'Snow (Hey Oh)', 'Stadium Arcadium', 2006);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'red-hot-chili-peppers'), 5, 'Give It Away', 'Blood Sugar Sex Magik', 1991);
insert into artists (slug, name, genres, bio, avatar_color) values ('foo-fighters', 'Foo Fighters', ARRAY['Rock','Grunge'], 'Dave Grohl turned grief into one of rock''s most enduring bands.', '#374151');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'foo-fighters'), 1, 'Everlong', 'The Colour and the Shape', 1997);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'foo-fighters'), 2, 'Best of You', 'In Your Honor', 2005);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'foo-fighters'), 3, 'The Pretender', 'Echoes, Silence, Patience & Grace', 2007);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'foo-fighters'), 4, 'Learn to Fly', 'There Is Nothing Left to Lose', 1999);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'foo-fighters'), 5, 'All My Life', 'One by One', 2002);
insert into artists (slug, name, genres, bio, avatar_color) values ('david-guetta', 'David Guetta', ARRAY['Electronic','Dance'], 'The French DJ who made EDM a global stadium sport.', '#0891b2');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'david-guetta'), 1, 'Titanium', 'Nothing but the Beat', 2011);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'david-guetta'), 2, 'Without You', 'Nothing but the Beat', 2011);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'david-guetta'), 3, 'When Love Takes Over', 'One Love', 2009);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'david-guetta'), 4, 'Turn Me On', 'Nothing but the Beat', 2011);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'david-guetta'), 5, 'Hey Mama', 'Listen', 2015);
insert into artists (slug, name, genres, bio, avatar_color) values ('rihanna', 'Rihanna', ARRAY['Pop','R&B'], 'Barbados-born icon who dominated pop for a decade and built a beauty empire.', '#be123c');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'rihanna'), 1, 'Umbrella', 'Good Girl Gone Bad', 2007);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'rihanna'), 2, 'We Found Love', 'Talk That Talk', 2011);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'rihanna'), 3, 'Diamonds', 'Unapologetic', 2012);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'rihanna'), 4, 'Stay', 'Unapologetic', 2012);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'rihanna'), 5, 'Work', 'Anti', 2016);
insert into artists (slug, name, genres, bio, avatar_color) values ('billie-eilish', 'Billie Eilish', ARRAY['Pop','Indie'], 'Bedroom pop prodigy who whispered her way into a generation''s soul.', '#166534');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'billie-eilish'), 1, 'bad guy', 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', 2019);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'billie-eilish'), 2, 'Ocean Eyes', 'dont smile at me', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'billie-eilish'), 3, 'lovely', '13 Reasons Why Soundtrack', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'billie-eilish'), 4, 'Happier Than Ever', 'Happier Than Ever', 2021);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'billie-eilish'), 5, 'Therefore I Am', 'Therefore I Am', 2020);
insert into artists (slug, name, genres, bio, avatar_color) values ('eminem', 'Eminem', ARRAY['Hip-Hop'], 'Slim Shady stormed in from Detroit and rewrote the rules of rap forever.', '#1e3a5f');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'eminem'), 1, 'Lose Yourself', '8 Mile Soundtrack', 2002);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'eminem'), 2, 'Stan', 'The Marshall Mathers LP', 2000);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'eminem'), 3, 'The Way I Am', 'The Marshall Mathers LP', 2000);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'eminem'), 4, 'Rap God', 'The Marshall Mathers LP 2', 2013);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'eminem'), 5, 'Without Me', 'The Eminem Show', 2002);
insert into artists (slug, name, genres, bio, avatar_color) values ('snoop-dogg', 'Snoop Dogg', ARRAY['Hip-Hop','Funk'], 'Long Beach legend. Cool, smooth, and undeniable for over three decades.', '#14532d');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'snoop-dogg'), 1, 'Drop It Like It''s Hot', 'R&G (Rhythm & Gangsta): The Masterpiece', 2004);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'snoop-dogg'), 2, 'Beautiful', 'R&G (Rhythm & Gangsta): The Masterpiece', 2003);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'snoop-dogg'), 3, 'Gin and Juice', 'Doggystyle', 1993);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'snoop-dogg'), 4, 'Who Am I? (What''s My Name?)', 'Doggystyle', 1993);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'snoop-dogg'), 5, 'Young, Wild & Free', 'Mac & Devin Go to High School', 2012);
insert into artists (slug, name, genres, bio, avatar_color) values ('lil-peep', 'Lil Peep', ARRAY['Emo Rap','Pop Punk'], 'Blended emo and trap before anyone had a name for it. A voice lost too soon.', '#7c3aed');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-peep'), 1, 'Star Shopping', 'Live Forever', 2016);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-peep'), 2, 'Awful Things', 'Come Over When You''re Sober, Pt. 2', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-peep'), 3, 'Cry Alone', 'Come Over When You''re Sober, Pt. 1', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-peep'), 4, 'Falling Down', 'Falling Down', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-peep'), 5, 'Save That Shit', 'Come Over When You''re Sober, Pt. 1', 2017);
insert into artists (slug, name, genres, bio, avatar_color) values ('xxxtentacion', 'XXXTentacion', ARRAY['Emo Rap','Hip-Hop'], 'Polarising, raw, and chaotic — his music touched millions despite everything.', '#1c1917');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'xxxtentacion'), 1, 'SAD', '?', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'xxxtentacion'), 2, 'Moonlight', '?', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'xxxtentacion'), 3, 'Jocelyn Flores', '17', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'xxxtentacion'), 4, 'Changes', '?', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'xxxtentacion'), 5, 'Look at Me', 'Look at Me', 2016);
insert into artists (slug, name, genres, bio, avatar_color) values ('juice-wrld', 'Juice WRLD', ARRAY['Emo Rap','Hip-Hop'], 'Freestyled his pain into melodies that a generation claimed as their own.', '#4f46e5');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'juice-wrld'), 1, 'Lucid Dreams', 'Goodbye & Good Riddance', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'juice-wrld'), 2, 'All Girls Are the Same', 'Goodbye & Good Riddance', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'juice-wrld'), 3, 'Legends', 'Death Race for Love', 2019);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'juice-wrld'), 4, 'Wishing Well', 'Legends Never Die', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'juice-wrld'), 5, 'Come & Go', 'Legends Never Die', 2020);
insert into artists (slug, name, genres, bio, avatar_color) values ('post-malone', 'Post Malone', ARRAY['Hip-Hop','Pop'], 'Genre-fluid Texan who made sad songs feel like summer anthems.', '#78350f');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'post-malone'), 1, 'Circles', 'Hollywood''s Bleeding', 2019);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'post-malone'), 2, 'Rockstar', 'beerbongs & bentleys', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'post-malone'), 3, 'Sunflower', 'Hollywood''s Bleeding', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'post-malone'), 4, 'White Iverson', 'August 26th', 2015);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'post-malone'), 5, 'Congratulations', 'Stoney', 2016);
insert into artists (slug, name, genres, bio, avatar_color) values ('21-savage', '21 Savage', ARRAY['Hip-Hop','Trap'], 'From Eastside Atlanta, cold delivery and brutal honesty made him undeniable.', '#292524');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = '21-savage'), 1, 'a lot', 'i am > i was', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = '21-savage'), 2, 'Bank Account', 'Issa Album', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = '21-savage'), 3, 'Rockstar', 'beerbongs & bentleys', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = '21-savage'), 4, 'No Heart', 'Savage Mode', 2016);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = '21-savage'), 5, 'Runnin', 'Savage Mode II', 2020);
insert into artists (slug, name, genres, bio, avatar_color) values ('travis-scott', 'Travis Scott', ARRAY['Hip-Hop','Trap'], 'La Flame turned concerts into rages and albums into alternate realities.', '#92400e');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'travis-scott'), 1, 'SICKO MODE', 'ASTROWORLD', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'travis-scott'), 2, 'Goosebumps', 'Birds in the Trap Sing McKnight', 2016);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'travis-scott'), 3, 'ANTIDOTE', 'Rodeo', 2015);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'travis-scott'), 4, 'Stargazing', 'ASTROWORLD', 2018);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'travis-scott'), 5, 'HIGHEST IN THE ROOM', 'HIGHEST IN THE ROOM', 2019);
insert into artists (slug, name, genres, bio, avatar_color) values ('sza', 'SZA', ARRAY['R&B','Soul'], 'New Jersey-raised neo-soul queen who made vulnerability sound powerful.', '#9d174d');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sza'), 1, 'Kill Bill', 'SOS', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sza'), 2, 'Good Days', 'Good Days', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sza'), 3, 'Love Galore', 'Ctrl', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sza'), 4, 'The Weekend', 'Ctrl', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sza'), 5, 'Snooze', 'SOS', 2022);
insert into artists (slug, name, genres, bio, avatar_color) values ('don-toliver', 'Don Toliver', ARRAY['Hip-Hop','R&B'], 'Houston''s melodic trap prince. Every hook lands somewhere between space and soul.', '#0f766e');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'don-toliver'), 1, 'No Idea', 'Heaven or Hell', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'don-toliver'), 2, 'After Party', 'Life of a Don', 2021);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'don-toliver'), 3, 'Drugs N Hella Melodies', 'Heaven or Hell', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'don-toliver'), 4, 'Private Landing', 'Love Sick', 2023);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'don-toliver'), 5, 'Cardigan', 'Love Sick', 2023);
insert into artists (slug, name, genres, bio, avatar_color) values ('lana-del-rey', 'Lana Del Rey', ARRAY['Pop','Indie'], 'Sad-core Americana goddess who made melancholy cinematic and glamorous.', '#3730a3');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lana-del-rey'), 1, 'Video Games', 'Born to Die', 2012);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lana-del-rey'), 2, 'Summertime Sadness', 'Born to Die', 2012);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lana-del-rey'), 3, 'Young and Beautiful', 'The Great Gatsby Soundtrack', 2013);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lana-del-rey'), 4, 'Norman Fucking Rockwell', 'Norman Fucking Rockwell', 2019);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lana-del-rey'), 5, 'Ride', 'Paradise', 2012);
insert into artists (slug, name, genres, bio, avatar_color) values ('blink-182', 'Blink-182', ARRAY['Pop Punk','Rock'], 'San Diego''s pop-punk trio who turned adolescent angst into eternal anthems.', '#0369a1');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blink-182'), 1, 'All the Small Things', 'Enema of the State', 1999);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blink-182'), 2, 'I Miss You', 'Blink-182', 2003);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blink-182'), 3, 'Adam''s Song', 'Enema of the State', 1999);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blink-182'), 4, 'What''s My Age Again?', 'Enema of the State', 1999);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blink-182'), 5, 'Dammit', 'Dude Ranch', 1997);
insert into artists (slug, name, genres, bio, avatar_color) values ('blur', 'Blur', ARRAY['Britpop','Indie','Rock'], 'Damon Albarn''s art-rock chameleons — from Britpop kings to avant-garde icons.', '#b45309');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blur'), 1, 'Song 2', 'Blur', 1997);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blur'), 2, 'Girls & Boys', 'Parklife', 1994);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blur'), 3, 'Beetlebum', 'Blur', 1997);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blur'), 4, 'Coffee & TV', '13', 1999);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'blur'), 5, 'Country House', 'The Great Escape', 1995);
insert into artists (slug, name, genres, bio, avatar_color) values ('gorillaz', 'Gorillaz', ARRAY['Alternative','Electronic','Indie'], 'Damon Albarn''s virtual band that blurred the line between music and art project.', '#4d7c0f');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'gorillaz'), 1, 'Feel Good Inc.', 'Demon Days', 2005);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'gorillaz'), 2, 'DARE', 'Demon Days', 2005);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'gorillaz'), 3, 'Clint Eastwood', 'Gorillaz', 2001);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'gorillaz'), 4, 'On Melancholy Hill', 'Plastic Beach', 2010);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'gorillaz'), 5, 'Stylo', 'Plastic Beach', 2010);
insert into artists (slug, name, genres, bio, avatar_color) values ('zach-bryan', 'Zach Bryan', ARRAY['Country','Folk'], 'Navy vet turned country poet. Shot a video in a parking lot and the world listened.', '#92400e');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'zach-bryan'), 1, 'Something in the Orange', 'American Heartbreak', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'zach-bryan'), 2, 'I Remember Everything', 'Zach Bryan', 2023);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'zach-bryan'), 3, 'Heading South', 'DeAnn', 2019);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'zach-bryan'), 4, 'Burn, Burn, Burn', 'American Heartbreak', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'zach-bryan'), 5, 'Oklahoma Smokeshow', 'American Heartbreak', 2022);
insert into artists (slug, name, genres, bio, avatar_color) values ('guns-n-roses', 'Guns N'' Roses', ARRAY['Rock','Metal'], 'Hollywood''s most dangerous band. Axl and Slash burned bright enough to scar a decade.', '#b91c1c');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'guns-n-roses'), 1, 'November Rain', 'Use Your Illusion I', 1991);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'guns-n-roses'), 2, 'Sweet Child O'' Mine', 'Appetite for Destruction', 1987);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'guns-n-roses'), 3, 'Welcome to the Jungle', 'Appetite for Destruction', 1987);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'guns-n-roses'), 4, 'Paradise City', 'Appetite for Destruction', 1987);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'guns-n-roses'), 5, 'Patience', 'GN''R Lies', 1988);
insert into artists (slug, name, genres, bio, avatar_color) values ('green-day', 'Green Day', ARRAY['Pop Punk','Rock'], 'Berkeley punks who grew up and made a rock opera that defined a political era.', '#15803d');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'green-day'), 1, 'Basket Case', 'Dookie', 1994);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'green-day'), 2, 'Boulevard of Broken Dreams', 'American Idiot', 2004);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'green-day'), 3, 'Good Riddance (Time of Your Life)', 'Nimrod', 1997);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'green-day'), 4, 'When I Come Around', 'Dookie', 1994);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'green-day'), 5, 'American Idiot', 'American Idiot', 2004);
insert into artists (slug, name, genres, bio, avatar_color) values ('justin-bieber', 'Justin Bieber', ARRAY['Pop','R&B'], 'Canadian teenager who grew up in public and became one of the biggest pop stars alive.', '#0e7490');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'justin-bieber'), 1, 'Love Yourself', 'Purpose', 2015);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'justin-bieber'), 2, 'Sorry', 'Purpose', 2015);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'justin-bieber'), 3, 'Peaches', 'Justice', 2021);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'justin-bieber'), 4, 'Ghost', 'Justice', 2021);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'justin-bieber'), 5, 'Baby', 'My World 2.0', 2010);
insert into artists (slug, name, genres, bio, avatar_color) values ('arctic-monkeys', 'Arctic Monkeys', ARRAY['Rock','Indie'], 'Sheffield lads who went from MySpace sensation to the coolest band on the planet.', '#1e3a5f');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'arctic-monkeys'), 1, 'Do I Wanna Know?', 'AM', 2013);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'arctic-monkeys'), 2, 'R U Mine?', 'AM', 2012);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'arctic-monkeys'), 3, '505', 'Favourite Worst Nightmare', 2007);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'arctic-monkeys'), 4, 'Why''d You Only Call Me When You''re High?', 'AM', 2013);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'arctic-monkeys'), 5, 'I Bet You Look Good on the Dancefloor', 'Whatever People Say I Am, That''s What I''m Not', 2006);
insert into artists (slug, name, genres, bio, avatar_color) values ('tupac', 'Tupac Shakur', ARRAY['Hip-Hop'], 'Thug Life. Dear Mama. Changes. Pac compressed a whole philosophy into his bars.', '#7c2d12');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tupac'), 1, 'Changes', 'Greatest Hits', 1998);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tupac'), 2, 'Dear Mama', 'Me Against the World', 1995);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tupac'), 3, 'California Love', 'All Eyez on Me', 1996);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tupac'), 4, 'Hail Mary', 'The Don Killuminati: The 7 Day Theory', 1996);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tupac'), 5, 'Hit ''Em Up', 'Hit ''Em Up', 1996);
insert into artists (slug, name, genres, bio, avatar_color) values ('sombr', 'sombr', ARRAY['Indie','Alternative'], 'Toronto duo turning quiet heartbreak into lush, cinematic indie-pop.', '#475569');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sombr'), 1, 'this is me trying', 'in the in between', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sombr'), 2, 'crying in the car', 'in the in between', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sombr'), 3, 'let you break my heart again', 'in the in between', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sombr'), 4, 'someday maybe', 'in the in between', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'sombr'), 5, 'if i ever get better', 'in the in between', 2022);
insert into artists (slug, name, genres, bio, avatar_color) values ('future', 'Future', ARRAY['Hip-Hop','Trap'], 'Atlanta''s melodic trap pioneer who made auto-tune sound like a confessional.', '#312e81');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'future'), 1, 'Mask Off', 'Future', 2017);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'future'), 2, 'March Madness', 'Beast Mode', 2015);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'future'), 3, 'Low Life', 'EVOL', 2016);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'future'), 4, 'Thought It Was a Drought', 'DS2', 2015);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'future'), 5, 'Turn on the Lights', 'Pluto', 2012);
insert into artists (slug, name, genres, bio, avatar_color) values ('tems', 'Tems', ARRAY['Afrobeats','R&B','Soul'], 'Lagos-born powerhouse whose voice transcended continents before the world caught up.', '#065f46');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tems'), 1, 'Free Mind', 'For Broken Ears', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tems'), 2, 'Higher', 'Born in the Wild', 2024);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tems'), 3, 'Essence', 'Made in Lagos', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tems'), 4, 'Me & U', 'If Orange Was a Place', 2021);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'tems'), 5, 'No Woman No Cry', 'If Orange Was a Place', 2021);
insert into artists (slug, name, genres, bio, avatar_color) values ('the-weeknd', 'The Weeknd', ARRAY['R&B','Pop'], 'Abel Tesfaye turned XO darkness into the defining pop sound of his generation.', '#7f1d1d');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'the-weeknd'), 1, 'Blinding Lights', 'After Hours', 2019);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'the-weeknd'), 2, 'Starboy', 'Starboy', 2016);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'the-weeknd'), 3, 'Save Your Tears', 'After Hours', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'the-weeknd'), 4, 'The Hills', 'Beauty Behind the Madness', 2015);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'the-weeknd'), 5, 'Can''t Feel My Face', 'Beauty Behind the Madness', 2015);
insert into artists (slug, name, genres, bio, avatar_color) values ('bad-bunny', 'Bad Bunny', ARRAY['Reggaeton','Latin Trap'], 'Puerto Rico''s biggest export. Redefined Latin music and made the world listen.', '#4a044e');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'bad-bunny'), 1, 'Tití Me Preguntó', 'Un Verano Sin Ti', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'bad-bunny'), 2, 'Me Porto Bonito', 'Un Verano Sin Ti', 2022);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'bad-bunny'), 3, 'Dakiti', 'El Último Tour Del Mundo', 2020);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'bad-bunny'), 4, 'MÓNACO', 'nadie sabe lo que va a pasar mañana', 2023);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'bad-bunny'), 5, 'Callaíta', 'Callaíta', 2019);
insert into artists (slug, name, genres, bio, avatar_color) values ('coldplay', 'Coldplay', ARRAY['Rock','Pop'], 'Chris Martin''s band turned stadium anthems into moments of genuine tenderness.', '#1d4ed8');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'coldplay'), 1, 'The Scientist', 'A Rush of Blood to the Head', 2002);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'coldplay'), 2, 'Yellow', 'Parachute', 2000);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'coldplay'), 3, 'Fix You', 'X&Y', 2005);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'coldplay'), 4, 'Clocks', 'A Rush of Blood to the Head', 2002);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'coldplay'), 5, 'Viva la Vida', 'Viva la Vida or Death and All His Friends', 2008);
insert into artists (slug, name, genres, bio, avatar_color) values ('maroon-5', 'Maroon 5', ARRAY['Pop','R&B'], 'Adam Levine''s pop machine has been delivering radio hits for over two decades.', '#991b1b');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'maroon-5'), 1, 'She Will Be Loved', 'Songs About Jane', 2004);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'maroon-5'), 2, 'This Love', 'Songs About Jane', 2004);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'maroon-5'), 3, 'Moves Like Jagger', 'Hands All Over', 2011);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'maroon-5'), 4, 'Sugar', 'V', 2014);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'maroon-5'), 5, 'Animals', 'V', 2014);
insert into artists (slug, name, genres, bio, avatar_color) values ('avril-lavigne', 'Avril Lavigne', ARRAY['Pop Punk','Rock'], 'Canadian sk8er girl who made pop punk her own and never stopped being herself.', '#6d28d9');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'avril-lavigne'), 1, 'Complicated', 'Let Go', 2002);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'avril-lavigne'), 2, 'Sk8er Boi', 'Let Go', 2002);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'avril-lavigne'), 3, 'I''m with You', 'Let Go', 2002);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'avril-lavigne'), 4, 'Girlfriend', 'The Best Damn Thing', 2007);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'avril-lavigne'), 5, 'Keep Holding On', 'The Best Damn Thing', 2007);
insert into artists (slug, name, genres, bio, avatar_color) values ('lil-wayne', 'Lil Wayne', ARRAY['Hip-Hop'], 'Weezy F. Baby. The best rapper alive for a generation — and he made sure you knew it.', '#b45309');
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-wayne'), 1, 'A Milli', 'Tha Carter III', 2008);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-wayne'), 2, 'Lollipop', 'Tha Carter III', 2008);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-wayne'), 3, 'Got Money', 'Tha Carter III', 2008);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-wayne'), 4, 'Go DJ', 'Tha Carter II', 2005);
insert into songs (artist_id, rank, title, album, year) values ((select id from artists where slug = 'lil-wayne'), 5, 'How to Love', 'Tha Carter IV', 2011);

insert into picks (kind, week_of, editor_note) values ('weekly', '2026-05-05', 'Five songs. Five moods. One week.');
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('weekly', 1, 'Blinding Lights', 'After Hours', 2019, (select id from artists where slug = 'the-weeknd'));
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('weekly', 2, 'Do I Wanna Know?', 'AM', 2013, (select id from artists where slug = 'arctic-monkeys'));
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('weekly', 3, 'HUMBLE.', 'DAMN.', 2017, (select id from artists where slug = 'kendrick-lamar'));
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('weekly', 4, 'Everlong', 'The Colour and the Shape', 1997, (select id from artists where slug = 'foo-fighters'));
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('weekly', 5, 'No Idea', 'Heaven or Hell', 2020, (select id from artists where slug = 'don-toliver'));

insert into picks (kind, week_of, editor_note) values ('throwback', '2026-05-05', 'Five songs from before the millennium. Cassettes optional.');
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('throwback', 1, 'Superstition', 'Talking Book', 1972, (select id from artists where slug = 'stevie-wonder'));
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('throwback', 2, 'Sweet Child O'' Mine', 'Appetite for Destruction', 1987, (select id from artists where slug = 'guns-n-roses'));
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('throwback', 3, 'Smells Like Teen Spirit', 'Nevermind', 1991, (select id from artists where slug = 'nirvana'));
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('throwback', 4, 'Wonderwall', '(What''s the Story) Morning Glory?', 1995, (select id from artists where slug = 'oasis'));
insert into pick_songs (pick_kind, rank, title, album, year, artist_id) values ('throwback', 5, 'California Love', 'All Eyez on Me', 1996, (select id from artists where slug = 'tupac'));
