import { Injectable, signal } from '@angular/core';
import { Artist, WeeklyPick, WeeklyPickSong } from '../models/artist.model';

const MOCK_ARTISTS: Artist[] = [
  {
    id: '3', slug: 'kendrick-lamar', name: 'Kendrick Lamar',
    genres: ['Hip-Hop'], avatarColor: '#7c3aed', viewCount: 1850,
    bio: 'Pulitzer Prize-winning rapper from Compton who redefined what hip-hop can say.',
    songs: [
      { rank: 1, title: 'Alright', album: 'To Pimp a Butterfly', year: 2015 },
      { rank: 2, title: 'HUMBLE.', album: 'DAMN.', year: 2017 },
      { rank: 3, title: 'Money Trees', album: 'good kid, m.A.A.d city', year: 2012 },
      { rank: 4, title: 'Swimming Pools (Drank)', album: 'good kid, m.A.A.d city', year: 2012 },
      { rank: 5, title: 'DNA.', album: 'DAMN.', year: 2017 },
    ],
  },
  {
    id: '13', slug: 'beyonce', name: 'Beyoncé',
    genres: ['Pop', 'R&B'], avatarColor: '#ca8a04', viewCount: 1680,
    bio: 'Queen Bey. Performer, director, businesswoman, and cultural force.',
    songs: [
      { rank: 1, title: 'Crazy in Love', album: 'Dangerously in Love', year: 2003 },
      { rank: 2, title: 'Formation', album: 'Lemonade', year: 2016 },
      { rank: 3, title: 'Single Ladies', album: 'I Am... Sasha Fierce', year: 2008 },
      { rank: 4, title: 'Irreplaceable', album: "B'Day", year: 2006 },
      { rank: 5, title: 'Halo', album: 'I Am... Sasha Fierce', year: 2008 },
    ],
  },
  {
    id: '19', slug: 'kanye-west', name: 'Kanye West',
    genres: ['Hip-Hop', 'Pop'], avatarColor: '#374151', viewCount: 1560,
    bio: 'Producer turned rapper who reinvented himself album after album.',
    songs: [
      { rank: 1, title: 'Runaway', album: 'My Beautiful Dark Twisted Fantasy', year: 2010 },
      { rank: 2, title: 'All Falls Down', album: 'The College Dropout', year: 2004 },
      { rank: 3, title: 'Gold Digger', album: 'Late Registration', year: 2005 },
      { rank: 4, title: 'Stronger', album: 'Graduation', year: 2007 },
      { rank: 5, title: 'Ultralight Beam', album: 'The Life of Pablo', year: 2016 },
    ],
  },
  {
    id: '22', slug: 'stevie-wonder', name: 'Stevie Wonder',
    genres: ['R&B', 'Soul', 'Funk'], avatarColor: '#065f46', viewCount: 870,
    bio: 'A blind child prodigy who grew into one of music\'s greatest creative forces.',
    songs: [
      { rank: 1, title: 'Superstition', album: 'Talking Book', year: 1972 },
      { rank: 2, title: 'Isn\'t She Lovely', album: 'Songs in the Key of Life', year: 1976 },
      { rank: 3, title: 'Sir Duke', album: 'Songs in the Key of Life', year: 1976 },
      { rank: 4, title: 'Higher Ground', album: 'Innervisions', year: 1973 },
      { rank: 5, title: 'Living for the City', album: 'Innervisions', year: 1973 },
    ],
  },
  {
    id: '23', slug: 'nirvana', name: 'Nirvana',
    genres: ['Rock', 'Grunge'], avatarColor: '#1e3a5f', viewCount: 1020,
    bio: 'Kurt Cobain\'s band blew up MTV and changed rock forever in three short years.',
    songs: [
      { rank: 1, title: 'Smells Like Teen Spirit', album: 'Nevermind', year: 1991 },
      { rank: 2, title: 'Come as You Are', album: 'Nevermind', year: 1991 },
      { rank: 3, title: 'Heart-Shaped Box', album: 'In Utero', year: 1993 },
      { rank: 4, title: 'Lithium', album: 'Nevermind', year: 1991 },
      { rank: 5, title: 'The Man Who Sold the World', album: 'MTV Unplugged in New York', year: 1994 },
    ],
  },
  {
    id: '24', slug: 'jay-z', name: 'Jay-Z',
    genres: ['Hip-Hop'], avatarColor: '#1e40af', viewCount: 1230,
    bio: 'From Marcy to the Louvre. Business mogul and one of hip-hop\'s all-time greats.',
    songs: [
      { rank: 1, title: 'Empire State of Mind', album: 'The Blueprint 3', year: 2009 },
      { rank: 2, title: 'IZZO (H.O.V.A.)', album: 'The Blueprint', year: 2001 },
      { rank: 3, title: '99 Problems', album: 'The Black Album', year: 2003 },
      { rank: 4, title: 'Big Pimpin\'', album: 'Vol. 3... Life and Times of S. Carter', year: 1999 },
      { rank: 5, title: 'Hard Knock Life', album: 'Vol. 2... Hard Knock Life', year: 1998 },
    ],
  },
  {
    id: '28', slug: 'taylor-swift', name: 'Taylor Swift',
    genres: ['Pop', 'Country'], avatarColor: '#9d174d', viewCount: 2340,
    bio: 'Genre-defying storyteller who turned personal narratives into cultural events.',
    songs: [
      { rank: 1, title: 'All Too Well (10 Minute Version)', album: 'Red (Taylor\'s Version)', year: 2021 },
      { rank: 2, title: 'Anti-Hero', album: 'Midnights', year: 2022 },
      { rank: 3, title: 'Love Story', album: 'Fearless', year: 2008 },
      { rank: 4, title: 'Shake It Off', album: '1989', year: 2014 },
      { rank: 5, title: 'cardigan', album: 'folklore', year: 2020 },
    ],
  },
  {
    id: '31', slug: 'mgk', name: 'Machine Gun Kelly',
    genres: ['Pop Punk', 'Hip-Hop'], avatarColor: '#f43f5e', viewCount: 890,
    bio: 'Cleveland\'s own. Crossed from rap to pop punk and brought a generation with him.',
    songs: [
      { rank: 1, title: 'bloody valentine', album: 'tickets to my downfall', year: 2020 },
      { rank: 2, title: 'my ex\'s best friend', album: 'tickets to my downfall', year: 2020 },
      { rank: 3, title: 'Concert for Aliens', album: 'tickets to my downfall', year: 2020 },
      { rank: 4, title: 'twin flame', album: 'mainstream sellout', year: 2022 },
      { rank: 5, title: 'lead you on', album: 'mainstream sellout', year: 2022 },
    ],
  },
  {
    id: '32', slug: 'drake', name: 'Drake',
    genres: ['Hip-Hop', 'R&B'], avatarColor: '#854d0e', viewCount: 2280,
    bio: 'From Degrassi to the biggest streaming numbers in history. The 6 God reigns.',
    songs: [
      { rank: 1, title: 'Passionfruit', album: 'More Life', year: 2017 },
      { rank: 2, title: 'God\'s Plan', album: 'Scorpion', year: 2018 },
      { rank: 3, title: 'Hotline Bling', album: 'Views', year: 2016 },
      { rank: 4, title: 'One Dance', album: 'Views', year: 2016 },
      { rank: 5, title: 'Started from the Bottom', album: 'Nothing Was the Same', year: 2013 },
    ],
  },
  {
    id: '33', slug: 'j-cole', name: 'J. Cole',
    genres: ['Hip-Hop'], avatarColor: '#d97706', viewCount: 1470,
    bio: 'Dreamville\'s architect. No features, no gimmicks — just bars and growth.',
    songs: [
      { rank: 1, title: 'No Role Modelz', album: '2014 Forest Hills Drive', year: 2014 },
      { rank: 2, title: 'Love Yourz', album: '2014 Forest Hills Drive', year: 2014 },
      { rank: 3, title: 'Wet Dreamz', album: '2014 Forest Hills Drive', year: 2014 },
      { rank: 4, title: 'Middle Child', album: 'Middle Child', year: 2019 },
      { rank: 5, title: 'ATM', album: 'KOD', year: 2018 },
    ],
  },
  {
    id: '34', slug: 'central-cee', name: 'Central Cee',
    genres: ['UK Rap', 'Hip-Hop'], avatarColor: '#0369a1', viewCount: 1120,
    bio: 'West London\'s finest export. Turned drill introspective and global overnight.',
    songs: [
      { rank: 1, title: 'Doja', album: '23', year: 2022 },
      { rank: 2, title: 'Loading', album: 'Wild West', year: 2021 },
      { rank: 3, title: 'Day in the Life', album: 'Wild West', year: 2021 },
      { rank: 4, title: 'Obsessed With You', album: '23', year: 2022 },
      { rank: 5, title: 'Sprinter', album: 'Sprinter', year: 2023 },
    ],
  },
  {
    id: '35', slug: 'oasis', name: 'Oasis',
    genres: ['Rock', 'Britpop'], avatarColor: '#1d4ed8', viewCount: 1310,
    bio: 'The Gallagher brothers gave a generation its anthems. Mayhem included.',
    songs: [
      { rank: 1, title: 'Wonderwall', album: '(What\'s the Story) Morning Glory?', year: 1995 },
      { rank: 2, title: 'Champagne Supernova', album: '(What\'s the Story) Morning Glory?', year: 1995 },
      { rank: 3, title: 'Don\'t Look Back in Anger', album: '(What\'s the Story) Morning Glory?', year: 1996 },
      { rank: 4, title: 'Live Forever', album: 'Definitely Maybe', year: 1994 },
      { rank: 5, title: 'Supersonic', album: 'Definitely Maybe', year: 1994 },
    ],
  },
  {
    id: '36', slug: 'red-hot-chili-peppers', name: 'Red Hot Chili Peppers',
    genres: ['Rock', 'Funk'], avatarColor: '#dc2626', viewCount: 1180,
    bio: 'Funky monks from LA who turned arena rock into a full-body experience.',
    songs: [
      { rank: 1, title: 'Under the Bridge', album: 'Blood Sugar Sex Magik', year: 1991 },
      { rank: 2, title: 'Californication', album: 'Californication', year: 1999 },
      { rank: 3, title: 'Scar Tissue', album: 'Californication', year: 1999 },
      { rank: 4, title: 'Snow (Hey Oh)', album: 'Stadium Arcadium', year: 2006 },
      { rank: 5, title: 'Give It Away', album: 'Blood Sugar Sex Magik', year: 1991 },
    ],
  },
  {
    id: '37', slug: 'foo-fighters', name: 'Foo Fighters',
    genres: ['Rock', 'Grunge'], avatarColor: '#374151', viewCount: 960,
    bio: 'Dave Grohl turned grief into one of rock\'s most enduring bands.',
    songs: [
      { rank: 1, title: 'Everlong', album: 'The Colour and the Shape', year: 1997 },
      { rank: 2, title: 'Best of You', album: 'In Your Honor', year: 2005 },
      { rank: 3, title: 'The Pretender', album: 'Echoes, Silence, Patience & Grace', year: 2007 },
      { rank: 4, title: 'Learn to Fly', album: 'There Is Nothing Left to Lose', year: 1999 },
      { rank: 5, title: 'All My Life', album: 'One by One', year: 2002 },
    ],
  },
  {
    id: '38', slug: 'david-guetta', name: 'David Guetta',
    genres: ['Electronic', 'Dance'], avatarColor: '#0891b2', viewCount: 1040,
    bio: 'The French DJ who made EDM a global stadium sport.',
    songs: [
      { rank: 1, title: 'Titanium', album: 'Nothing but the Beat', year: 2011 },
      { rank: 2, title: 'Without You', album: 'Nothing but the Beat', year: 2011 },
      { rank: 3, title: 'When Love Takes Over', album: 'One Love', year: 2009 },
      { rank: 4, title: 'Turn Me On', album: 'Nothing but the Beat', year: 2011 },
      { rank: 5, title: 'Hey Mama', album: 'Listen', year: 2015 },
    ],
  },
  {
    id: '39', slug: 'rihanna', name: 'Rihanna',
    genres: ['Pop', 'R&B'], avatarColor: '#be123c', viewCount: 2050,
    bio: 'Barbados-born icon who dominated pop for a decade and built a beauty empire.',
    songs: [
      { rank: 1, title: 'Umbrella', album: 'Good Girl Gone Bad', year: 2007 },
      { rank: 2, title: 'We Found Love', album: 'Talk That Talk', year: 2011 },
      { rank: 3, title: 'Diamonds', album: 'Unapologetic', year: 2012 },
      { rank: 4, title: 'Stay', album: 'Unapologetic', year: 2012 },
      { rank: 5, title: 'Work', album: 'Anti', year: 2016 },
    ],
  },
  {
    id: '40', slug: 'billie-eilish', name: 'Billie Eilish',
    genres: ['Pop', 'Indie'], avatarColor: '#166534', viewCount: 1760,
    bio: 'Bedroom pop prodigy who whispered her way into a generation\'s soul.',
    songs: [
      { rank: 1, title: 'bad guy', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', year: 2019 },
      { rank: 2, title: 'Ocean Eyes', album: 'dont smile at me', year: 2017 },
      { rank: 3, title: 'lovely', album: '13 Reasons Why Soundtrack', year: 2018 },
      { rank: 4, title: 'Happier Than Ever', album: 'Happier Than Ever', year: 2021 },
      { rank: 5, title: 'Therefore I Am', album: 'Therefore I Am', year: 2020 },
    ],
  },
  {
    id: '41', slug: 'eminem', name: 'Eminem',
    genres: ['Hip-Hop'], avatarColor: '#1e3a5f', viewCount: 2190,
    bio: 'Slim Shady stormed in from Detroit and rewrote the rules of rap forever.',
    songs: [
      { rank: 1, title: 'Lose Yourself', album: '8 Mile Soundtrack', year: 2002 },
      { rank: 2, title: 'Stan', album: 'The Marshall Mathers LP', year: 2000 },
      { rank: 3, title: 'The Way I Am', album: 'The Marshall Mathers LP', year: 2000 },
      { rank: 4, title: 'Rap God', album: 'The Marshall Mathers LP 2', year: 2013 },
      { rank: 5, title: 'Without Me', album: 'The Eminem Show', year: 2002 },
    ],
  },
  {
    id: '42', slug: 'snoop-dogg', name: 'Snoop Dogg',
    genres: ['Hip-Hop', 'Funk'], avatarColor: '#14532d', viewCount: 1390,
    bio: 'Long Beach legend. Cool, smooth, and undeniable for over three decades.',
    songs: [
      { rank: 1, title: 'Drop It Like It\'s Hot', album: 'R&G (Rhythm & Gangsta): The Masterpiece', year: 2004 },
      { rank: 2, title: 'Beautiful', album: 'R&G (Rhythm & Gangsta): The Masterpiece', year: 2003 },
      { rank: 3, title: 'Gin and Juice', album: 'Doggystyle', year: 1993 },
      { rank: 4, title: 'Who Am I? (What\'s My Name?)', album: 'Doggystyle', year: 1993 },
      { rank: 5, title: 'Young, Wild & Free', album: 'Mac & Devin Go to High School', year: 2012 },
    ],
  },
  {
    id: '43', slug: 'lil-peep', name: 'Lil Peep',
    genres: ['Emo Rap', 'Pop Punk'], avatarColor: '#7c3aed', viewCount: 1030,
    bio: 'Blended emo and trap before anyone had a name for it. A voice lost too soon.',
    songs: [
      { rank: 1, title: 'Star Shopping', album: 'Live Forever', year: 2016 },
      { rank: 2, title: 'Awful Things', album: 'Come Over When You\'re Sober, Pt. 2', year: 2018 },
      { rank: 3, title: 'Cry Alone', album: 'Come Over When You\'re Sober, Pt. 1', year: 2017 },
      { rank: 4, title: 'Falling Down', album: 'Falling Down', year: 2018 },
      { rank: 5, title: 'Save That Shit', album: 'Come Over When You\'re Sober, Pt. 1', year: 2017 },
    ],
  },
  {
    id: '44', slug: 'xxxtentacion', name: 'XXXTentacion',
    genres: ['Emo Rap', 'Hip-Hop'], avatarColor: '#1c1917', viewCount: 1620,
    bio: 'Polarising, raw, and chaotic — his music touched millions despite everything.',
    songs: [
      { rank: 1, title: 'SAD!', album: '?', year: 2018 },
      { rank: 2, title: 'Moonlight', album: '?', year: 2018 },
      { rank: 3, title: 'Jocelyn Flores', album: '17', year: 2017 },
      { rank: 4, title: 'Changes', album: '?', year: 2018 },
      { rank: 5, title: 'Look at Me!', album: 'Look at Me!', year: 2016 },
    ],
  },
  {
    id: '45', slug: 'juice-wrld', name: 'Juice WRLD',
    genres: ['Emo Rap', 'Hip-Hop'], avatarColor: '#4f46e5', viewCount: 1880,
    bio: 'Freestyled his pain into melodies that a generation claimed as their own.',
    songs: [
      { rank: 1, title: 'Lucid Dreams', album: 'Goodbye & Good Riddance', year: 2018 },
      { rank: 2, title: 'All Girls Are the Same', album: 'Goodbye & Good Riddance', year: 2018 },
      { rank: 3, title: 'Legends', album: 'Death Race for Love', year: 2019 },
      { rank: 4, title: 'Wishing Well', album: 'Legends Never Die', year: 2020 },
      { rank: 5, title: 'Come & Go', album: 'Legends Never Die', year: 2020 },
    ],
  },
  {
    id: '46', slug: 'post-malone', name: 'Post Malone',
    genres: ['Hip-Hop', 'Pop'], avatarColor: '#78350f', viewCount: 2010,
    bio: 'Genre-fluid Texan who made sad songs feel like summer anthems.',
    songs: [
      { rank: 1, title: 'Circles', album: 'Hollywood\'s Bleeding', year: 2019 },
      { rank: 2, title: 'Rockstar', album: 'beerbongs & bentleys', year: 2017 },
      { rank: 3, title: 'Sunflower', album: 'Hollywood\'s Bleeding', year: 2018 },
      { rank: 4, title: 'White Iverson', album: 'August 26th', year: 2015 },
      { rank: 5, title: 'Congratulations', album: 'Stoney', year: 2016 },
    ],
  },
  {
    id: '47', slug: '21-savage', name: '21 Savage',
    genres: ['Hip-Hop', 'Trap'], avatarColor: '#292524', viewCount: 1270,
    bio: 'From Eastside Atlanta, cold delivery and brutal honesty made him undeniable.',
    songs: [
      { rank: 1, title: 'a lot', album: 'i am > i was', year: 2018 },
      { rank: 2, title: 'Bank Account', album: 'Issa Album', year: 2017 },
      { rank: 3, title: 'Rockstar', album: 'beerbongs & bentleys', year: 2017 },
      { rank: 4, title: 'No Heart', album: 'Savage Mode', year: 2016 },
      { rank: 5, title: 'Runnin', album: 'Savage Mode II', year: 2020 },
    ],
  },
  {
    id: '48', slug: 'travis-scott', name: 'Travis Scott',
    genres: ['Hip-Hop', 'Trap'], avatarColor: '#92400e', viewCount: 1950,
    bio: 'La Flame turned concerts into rages and albums into alternate realities.',
    songs: [
      { rank: 1, title: 'SICKO MODE', album: 'ASTROWORLD', year: 2018 },
      { rank: 2, title: 'Goosebumps', album: 'Birds in the Trap Sing McKnight', year: 2016 },
      { rank: 3, title: 'ANTIDOTE', album: 'Rodeo', year: 2015 },
      { rank: 4, title: 'Stargazing', album: 'ASTROWORLD', year: 2018 },
      { rank: 5, title: 'HIGHEST IN THE ROOM', album: 'HIGHEST IN THE ROOM', year: 2019 },
    ],
  },
  {
    id: '49', slug: 'sza', name: 'SZA',
    genres: ['R&B', 'Soul'], avatarColor: '#9d174d', viewCount: 1590,
    bio: 'New Jersey-raised neo-soul queen who made vulnerability sound powerful.',
    songs: [
      { rank: 1, title: 'Kill Bill', album: 'SOS', year: 2022 },
      { rank: 2, title: 'Good Days', album: 'Good Days', year: 2020 },
      { rank: 3, title: 'Love Galore', album: 'Ctrl', year: 2017 },
      { rank: 4, title: 'The Weekend', album: 'Ctrl', year: 2017 },
      { rank: 5, title: 'Snooze', album: 'SOS', year: 2022 },
    ],
  },
  {
    id: '50', slug: 'don-toliver', name: 'Don Toliver',
    genres: ['Hip-Hop', 'R&B'], avatarColor: '#0f766e', viewCount: 870,
    bio: 'Houston\'s melodic trap prince. Every hook lands somewhere between space and soul.',
    songs: [
      { rank: 1, title: 'No Idea', album: 'Heaven or Hell', year: 2020 },
      { rank: 2, title: 'After Party', album: 'Life of a Don', year: 2021 },
      { rank: 3, title: 'Drugs N Hella Melodies', album: 'Heaven or Hell', year: 2020 },
      { rank: 4, title: 'Private Landing', album: 'Love Sick', year: 2023 },
      { rank: 5, title: 'Cardigan', album: 'Love Sick', year: 2023 },
    ],
  },
  {
    id: '51', slug: 'lana-del-rey', name: 'Lana Del Rey',
    genres: ['Pop', 'Indie'], avatarColor: '#3730a3', viewCount: 1430,
    bio: 'Sad-core Americana goddess who made melancholy cinematic and glamorous.',
    songs: [
      { rank: 1, title: 'Video Games', album: 'Born to Die', year: 2012 },
      { rank: 2, title: 'Summertime Sadness', album: 'Born to Die', year: 2012 },
      { rank: 3, title: 'Young and Beautiful', album: 'The Great Gatsby Soundtrack', year: 2013 },
      { rank: 4, title: 'Norman Fucking Rockwell', album: 'Norman Fucking Rockwell!', year: 2019 },
      { rank: 5, title: 'Ride', album: 'Paradise', year: 2012 },
    ],
  },
  {
    id: '52', slug: 'blink-182', name: 'Blink-182',
    genres: ['Pop Punk', 'Rock'], avatarColor: '#0369a1', viewCount: 1200,
    bio: 'San Diego\'s pop-punk trio who turned adolescent angst into eternal anthems.',
    songs: [
      { rank: 1, title: 'All the Small Things', album: 'Enema of the State', year: 1999 },
      { rank: 2, title: 'I Miss You', album: 'Blink-182', year: 2003 },
      { rank: 3, title: 'Adam\'s Song', album: 'Enema of the State', year: 1999 },
      { rank: 4, title: 'What\'s My Age Again?', album: 'Enema of the State', year: 1999 },
      { rank: 5, title: 'Dammit', album: 'Dude Ranch', year: 1997 },
    ],
  },
  {
    id: '53', slug: 'blur', name: 'Blur',
    genres: ['Britpop', 'Indie', 'Rock'], avatarColor: '#b45309', viewCount: 680,
    bio: 'Damon Albarn\'s art-rock chameleons — from Britpop kings to avant-garde icons.',
    songs: [
      { rank: 1, title: 'Song 2', album: 'Blur', year: 1997 },
      { rank: 2, title: 'Girls & Boys', album: 'Parklife', year: 1994 },
      { rank: 3, title: 'Beetlebum', album: 'Blur', year: 1997 },
      { rank: 4, title: 'Coffee & TV', album: '13', year: 1999 },
      { rank: 5, title: 'Country House', album: 'The Great Escape', year: 1995 },
    ],
  },
  {
    id: '54', slug: 'gorillaz', name: 'Gorillaz',
    genres: ['Alternative', 'Electronic', 'Indie'], avatarColor: '#4d7c0f', viewCount: 1090,
    bio: 'Damon Albarn\'s virtual band that blurred the line between music and art project.',
    songs: [
      { rank: 1, title: 'Feel Good Inc.', album: 'Demon Days', year: 2005 },
      { rank: 2, title: 'DARE', album: 'Demon Days', year: 2005 },
      { rank: 3, title: 'Clint Eastwood', album: 'Gorillaz', year: 2001 },
      { rank: 4, title: 'On Melancholy Hill', album: 'Plastic Beach', year: 2010 },
      { rank: 5, title: 'Stylo', album: 'Plastic Beach', year: 2010 },
    ],
  },
  {
    id: '55', slug: 'zach-bryan', name: 'Zach Bryan',
    genres: ['Country', 'Folk'], avatarColor: '#92400e', viewCount: 1340,
    bio: 'Navy vet turned country poet. Shot a video in a parking lot and the world listened.',
    songs: [
      { rank: 1, title: 'Something in the Orange', album: 'American Heartbreak', year: 2022 },
      { rank: 2, title: 'I Remember Everything', album: 'Zach Bryan', year: 2023 },
      { rank: 3, title: 'Heading South', album: 'DeAnn', year: 2019 },
      { rank: 4, title: 'Burn, Burn, Burn', album: 'American Heartbreak', year: 2022 },
      { rank: 5, title: 'Oklahoma Smokeshow', album: 'American Heartbreak', year: 2022 },
    ],
  },
  {
    id: '56', slug: 'guns-n-roses', name: "Guns N' Roses",
    genres: ['Rock', 'Metal'], avatarColor: '#b91c1c', viewCount: 1260,
    bio: "Hollywood's most dangerous band. Axl and Slash burned bright enough to scar a decade.",
    songs: [
      { rank: 1, title: 'November Rain', album: 'Use Your Illusion I', year: 1991 },
      { rank: 2, title: 'Sweet Child O\' Mine', album: 'Appetite for Destruction', year: 1987 },
      { rank: 3, title: 'Welcome to the Jungle', album: 'Appetite for Destruction', year: 1987 },
      { rank: 4, title: 'Paradise City', album: 'Appetite for Destruction', year: 1987 },
      { rank: 5, title: 'Patience', album: 'GN\'R Lies', year: 1988 },
    ],
  },
  {
    id: '57', slug: 'green-day', name: 'Green Day',
    genres: ['Pop Punk', 'Rock'], avatarColor: '#15803d', viewCount: 1130,
    bio: 'Berkeley punks who grew up and made a rock opera that defined a political era.',
    songs: [
      { rank: 1, title: 'Basket Case', album: 'Dookie', year: 1994 },
      { rank: 2, title: 'Boulevard of Broken Dreams', album: 'American Idiot', year: 2004 },
      { rank: 3, title: 'Good Riddance (Time of Your Life)', album: 'Nimrod', year: 1997 },
      { rank: 4, title: 'When I Come Around', album: 'Dookie', year: 1994 },
      { rank: 5, title: 'American Idiot', album: 'American Idiot', year: 2004 },
    ],
  },
  {
    id: '58', slug: 'justin-bieber', name: 'Justin Bieber',
    genres: ['Pop', 'R&B'], avatarColor: '#0e7490', viewCount: 1970,
    bio: 'Canadian teenager who grew up in public and became one of the biggest pop stars alive.',
    songs: [
      { rank: 1, title: 'Love Yourself', album: 'Purpose', year: 2015 },
      { rank: 2, title: 'Sorry', album: 'Purpose', year: 2015 },
      { rank: 3, title: 'Peaches', album: 'Justice', year: 2021 },
      { rank: 4, title: 'Ghost', album: 'Justice', year: 2021 },
      { rank: 5, title: 'Baby', album: 'My World 2.0', year: 2010 },
    ],
  },
  {
    id: '59', slug: 'arctic-monkeys', name: 'Arctic Monkeys',
    genres: ['Rock', 'Indie'], avatarColor: '#1e3a5f', viewCount: 1520,
    bio: 'Sheffield lads who went from MySpace sensation to the coolest band on the planet.',
    songs: [
      { rank: 1, title: 'Do I Wanna Know?', album: 'AM', year: 2013 },
      { rank: 2, title: 'R U Mine?', album: 'AM', year: 2012 },
      { rank: 3, title: '505', album: 'Favourite Worst Nightmare', year: 2007 },
      { rank: 4, title: 'Why\'d You Only Call Me When You\'re High?', album: 'AM', year: 2013 },
      { rank: 5, title: 'I Bet You Look Good on the Dancefloor', album: 'Whatever People Say I Am, That\'s What I\'m Not', year: 2006 },
    ],
  },
  {
    id: '60', slug: 'tupac', name: 'Tupac Shakur',
    genres: ['Hip-Hop'], avatarColor: '#7c2d12', viewCount: 2060,
    bio: 'Thug Life. Dear Mama. Changes. Pac compressed a whole philosophy into his bars.',
    songs: [
      { rank: 1, title: 'Changes', album: 'Greatest Hits', year: 1998 },
      { rank: 2, title: 'Dear Mama', album: 'Me Against the World', year: 1995 },
      { rank: 3, title: 'California Love', album: 'All Eyez on Me', year: 1996 },
      { rank: 4, title: 'Hail Mary', album: 'The Don Killuminati: The 7 Day Theory', year: 1996 },
      { rank: 5, title: 'Hit \'Em Up', album: 'Hit \'Em Up', year: 1996 },
    ],
  },
  {
    id: '61', slug: 'sombr', name: 'sombr',
    genres: ['Indie', 'Alternative'], avatarColor: '#475569', viewCount: 610,
    bio: 'Toronto duo turning quiet heartbreak into lush, cinematic indie-pop.',
    songs: [
      { rank: 1, title: 'this is me trying', album: 'in the in between', year: 2022 },
      { rank: 2, title: 'crying in the car', album: 'in the in between', year: 2022 },
      { rank: 3, title: 'let you break my heart again', album: 'in the in between', year: 2022 },
      { rank: 4, title: 'someday maybe', album: 'in the in between', year: 2022 },
      { rank: 5, title: 'if i ever get better', album: 'in the in between', year: 2022 },
    ],
  },
  {
    id: '62', slug: 'future', name: 'Future',
    genres: ['Hip-Hop', 'Trap'], avatarColor: '#312e81', viewCount: 1380,
    bio: 'Atlanta\'s melodic trap pioneer who made auto-tune sound like a confessional.',
    songs: [
      { rank: 1, title: 'Mask Off', album: 'Future', year: 2017 },
      { rank: 2, title: 'March Madness', album: 'Beast Mode', year: 2015 },
      { rank: 3, title: 'Low Life', album: 'EVOL', year: 2016 },
      { rank: 4, title: 'Thought It Was a Drought', album: 'DS2', year: 2015 },
      { rank: 5, title: 'Turn on the Lights', album: 'Pluto', year: 2012 },
    ],
  },
  {
    id: '63', slug: 'tems', name: 'Tems',
    genres: ['Afrobeats', 'R&B', 'Soul'], avatarColor: '#065f46', viewCount: 1160,
    bio: 'Lagos-born powerhouse whose voice transcended continents before the world caught up.',
    songs: [
      { rank: 1, title: 'Free Mind', album: 'For Broken Ears', year: 2020 },
      { rank: 2, title: 'Higher', album: 'Born in the Wild', year: 2024 },
      { rank: 3, title: 'Essence', album: 'Made in Lagos', year: 2020 },
      { rank: 4, title: 'Me & U', album: 'If Orange Was a Place', year: 2021 },
      { rank: 5, title: 'No Woman No Cry', album: 'If Orange Was a Place', year: 2021 },
    ],
  },
  {
    id: '64', slug: 'the-weeknd', name: 'The Weeknd',
    genres: ['R&B', 'Pop'], avatarColor: '#7f1d1d', viewCount: 2420,
    bio: 'Abel Tesfaye turned XO darkness into the defining pop sound of his generation.',
    songs: [
      { rank: 1, title: 'Blinding Lights', album: 'After Hours', year: 2019 },
      { rank: 2, title: 'Starboy', album: 'Starboy', year: 2016 },
      { rank: 3, title: 'Save Your Tears', album: 'After Hours', year: 2020 },
      { rank: 4, title: 'The Hills', album: 'Beauty Behind the Madness', year: 2015 },
      { rank: 5, title: 'Can\'t Feel My Face', album: 'Beauty Behind the Madness', year: 2015 },
    ],
  },
  {
    id: '65', slug: 'bad-bunny', name: 'Bad Bunny',
    genres: ['Reggaeton', 'Latin Trap'], avatarColor: '#4a044e', viewCount: 2380,
    bio: 'Puerto Rico\'s biggest export. Redefined Latin music and made the world listen.',
    songs: [
      { rank: 1, title: 'Tití Me Preguntó', album: 'Un Verano Sin Ti', year: 2022 },
      { rank: 2, title: 'Me Porto Bonito', album: 'Un Verano Sin Ti', year: 2022 },
      { rank: 3, title: 'Dakiti', album: 'El Último Tour Del Mundo', year: 2020 },
      { rank: 4, title: 'MÓNACO', album: 'nadie sabe lo que va a pasar mañana', year: 2023 },
      { rank: 5, title: 'Callaíta', album: 'Callaíta', year: 2019 },
    ],
  },
  {
    id: '66', slug: 'coldplay', name: 'Coldplay',
    genres: ['Rock', 'Pop'], avatarColor: '#1d4ed8', viewCount: 1840,
    bio: 'Chris Martin\'s band turned stadium anthems into moments of genuine tenderness.',
    songs: [
      { rank: 1, title: 'The Scientist', album: 'A Rush of Blood to the Head', year: 2002 },
      { rank: 2, title: 'Yellow', album: 'Parachute', year: 2000 },
      { rank: 3, title: 'Fix You', album: 'X&Y', year: 2005 },
      { rank: 4, title: 'Clocks', album: 'A Rush of Blood to the Head', year: 2002 },
      { rank: 5, title: 'Viva la Vida', album: 'Viva la Vida or Death and All His Friends', year: 2008 },
    ],
  },
  {
    id: '67', slug: 'maroon-5', name: 'Maroon 5',
    genres: ['Pop', 'R&B'], avatarColor: '#991b1b', viewCount: 1290,
    bio: 'Adam Levine\'s pop machine has been delivering radio hits for over two decades.',
    songs: [
      { rank: 1, title: 'She Will Be Loved', album: 'Songs About Jane', year: 2004 },
      { rank: 2, title: 'This Love', album: 'Songs About Jane', year: 2004 },
      { rank: 3, title: 'Moves Like Jagger', album: 'Hands All Over', year: 2011 },
      { rank: 4, title: 'Sugar', album: 'V', year: 2014 },
      { rank: 5, title: 'Animals', album: 'V', year: 2014 },
    ],
  },
  {
    id: '68', slug: 'avril-lavigne', name: 'Avril Lavigne',
    genres: ['Pop Punk', 'Rock'], avatarColor: '#6d28d9', viewCount: 1110,
    bio: 'Canadian sk8er girl who made pop punk her own and never stopped being herself.',
    songs: [
      { rank: 1, title: 'Complicated', album: 'Let Go', year: 2002 },
      { rank: 2, title: 'Sk8er Boi', album: 'Let Go', year: 2002 },
      { rank: 3, title: 'I\'m with You', album: 'Let Go', year: 2002 },
      { rank: 4, title: 'Girlfriend', album: 'The Best Damn Thing', year: 2007 },
      { rank: 5, title: 'Keep Holding On', album: 'The Best Damn Thing', year: 2007 },
    ],
  },
  {
    id: '69', slug: 'lil-wayne', name: 'Lil Wayne',
    genres: ['Hip-Hop'], avatarColor: '#b45309', viewCount: 1680,
    bio: 'Weezy F. Baby. The best rapper alive for a generation — and he made sure you knew it.',
    songs: [
      { rank: 1, title: 'A Milli', album: 'Tha Carter III', year: 2008 },
      { rank: 2, title: 'Lollipop', album: 'Tha Carter III', year: 2008 },
      { rank: 3, title: 'Got Money', album: 'Tha Carter III', year: 2008 },
      { rank: 4, title: 'Go DJ', album: 'Tha Carter II', year: 2005 },
      { rank: 5, title: 'How to Love', album: 'Tha Carter IV', year: 2011 },
    ],
  },
];

const THROWBACK_PICK: WeeklyPick = {
  weekOf: '2026-05-05',
  editorNote: 'Five songs from before the millennium. Cassettes optional.',
  songs: [
    { rank: 1, title: 'Superstition', album: 'Talking Book', year: 1972, artist: MOCK_ARTISTS.find(a => a.slug === 'stevie-wonder')! },
    { rank: 2, title: 'Sweet Child O\' Mine', album: 'Appetite for Destruction', year: 1987, artist: MOCK_ARTISTS.find(a => a.slug === 'guns-n-roses')! },
    { rank: 3, title: 'Smells Like Teen Spirit', album: 'Nevermind', year: 1991, artist: MOCK_ARTISTS.find(a => a.slug === 'nirvana')! },
    { rank: 4, title: 'Wonderwall', album: '(What\'s the Story) Morning Glory?', year: 1995, artist: MOCK_ARTISTS.find(a => a.slug === 'oasis')! },
    { rank: 5, title: 'California Love', album: 'All Eyez on Me', year: 1996, artist: MOCK_ARTISTS.find(a => a.slug === 'tupac')! },
  ],
};

const WEEKLY_PICK: WeeklyPick = {
  weekOf: '2026-05-05',
  editorNote: 'Five songs. Five moods. One week.',
  songs: [
    { rank: 1, title: 'Blinding Lights', album: 'After Hours', year: 2019, artist: MOCK_ARTISTS.find(a => a.slug === 'the-weeknd')! },
    { rank: 2, title: 'Do I Wanna Know?', album: 'AM', year: 2013, artist: MOCK_ARTISTS.find(a => a.slug === 'arctic-monkeys')! },
    { rank: 3, title: 'HUMBLE.', album: 'DAMN.', year: 2017, artist: MOCK_ARTISTS.find(a => a.slug === 'kendrick-lamar')! },
    { rank: 4, title: 'Everlong', album: 'The Colour and the Shape', year: 1997, artist: MOCK_ARTISTS.find(a => a.slug === 'foo-fighters')! },
    { rank: 5, title: 'No Idea', album: 'Heaven or Hell', year: 2020, artist: MOCK_ARTISTS.find(a => a.slug === 'don-toliver')! },
  ],
};

@Injectable({ providedIn: 'root' })
export class ArtistService {
  private _artists = signal<Artist[]>(MOCK_ARTISTS);

  readonly artists = this._artists.asReadonly();

  getBySlug(slug: string): Artist | undefined {
    return this._artists().find(a => a.slug === slug);
  }

  getWeeklyPick(): WeeklyPick {
    return WEEKLY_PICK;
  }

  getThrowbackPick(): WeeklyPick {
    return THROWBACK_PICK;
  }

  incrementView(id: string): void {
    this._artists.update(list =>
      list.map(a => a.id === id ? { ...a, viewCount: a.viewCount + 1 } : a)
    );
  }

  getAllGenres(): string[] {
    return [...new Set(this._artists().flatMap(a => a.genres))].sort();
  }
}
