export interface Song {
  rank: number;
  title: string;
  album?: string;
  year?: number;
}

export interface Artist {
  id: number;
  slug: string;
  name: string;
  genres: string[];
  bio?: string;
  songs: Song[];
  avatarColor: string;
}

export interface WeeklyPickSong {
  rank: number;
  title: string;
  album?: string;
  year?: number;
  artist: Artist;
}

export interface WeeklyPick {
  weekOf: string;
  songs: WeeklyPickSong[];
  editorNote?: string;
}
