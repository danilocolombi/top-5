import { Injectable, signal } from '@angular/core';
import { Artist, Song, WeeklyPick } from '../models/artist.model';
import { supabase } from './supabase.client';

const EMPTY_PICK: WeeklyPick = { weekOf: '', songs: [] };

@Injectable({ providedIn: 'root' })
export class ArtistService {
  private _artists = signal<Artist[]>([]);
  private _weeklyPick: WeeklyPick = EMPTY_PICK;
  private _throwbackPick: WeeklyPick = EMPTY_PICK;

  readonly artists = this._artists.asReadonly();

  async load(): Promise<void> {
    const [artistsRes, songsRes, picksRes, pickSongsRes] = await Promise.all([
      supabase.from('artists').select('*'),
      supabase.from('songs').select('*'),
      supabase.from('picks').select('*'),
      supabase.from('pick_songs').select('*'),
    ]);

    if (artistsRes.error) throw artistsRes.error;
    if (songsRes.error) throw songsRes.error;
    if (picksRes.error) throw picksRes.error;
    if (pickSongsRes.error) throw pickSongsRes.error;

    const songsByArtist = new Map<number, Song[]>();
    for (const s of songsRes.data ?? []) {
      const list = songsByArtist.get(s.artist_id) ?? [];
      list.push({ rank: s.rank, title: s.title, album: s.album ?? undefined, year: s.year ?? undefined });
      songsByArtist.set(s.artist_id, list);
    }
    for (const list of songsByArtist.values()) list.sort((a, b) => a.rank - b.rank);

    const artists: Artist[] = (artistsRes.data ?? []).map(a => ({
      id: a.id,
      slug: a.slug,
      name: a.name,
      genres: a.genres ?? [],
      bio: a.bio ?? undefined,
      avatarColor: a.avatar_color,
      songs: songsByArtist.get(a.id) ?? [],
    }));
    artists.sort((a, b) => a.name.localeCompare(b.name));
    this._artists.set(artists);

    const artistById = new Map(artists.map(a => [a.id, a]));
    const buildPick = (kind: 'weekly' | 'throwback'): WeeklyPick => {
      const meta = (picksRes.data ?? []).find(p => p.kind === kind);
      if (!meta) return EMPTY_PICK;
      const songs = (pickSongsRes.data ?? [])
        .filter(s => s.pick_kind === kind)
        .sort((a, b) => a.rank - b.rank)
        .map(s => ({
          rank: s.rank,
          title: s.title,
          album: s.album ?? undefined,
          year: s.year ?? undefined,
          artist: artistById.get(s.artist_id)!,
        }));
      return { weekOf: meta.week_of, editorNote: meta.editor_note ?? undefined, songs };
    };
    this._weeklyPick = buildPick('weekly');
    this._throwbackPick = buildPick('throwback');
  }

  getBySlug(slug: string): Artist | undefined {
    return this._artists().find(a => a.slug === slug);
  }

  getWeeklyPick(): WeeklyPick {
    return this._weeklyPick;
  }

  getThrowbackPick(): WeeklyPick {
    return this._throwbackPick;
  }

  getAllGenres(): string[] {
    return [...new Set(this._artists().flatMap(a => a.genres))].sort();
  }
}
