import { Injectable, inject } from '@angular/core';
import { supabase } from './supabase.client';
import { ArtistService } from './artist.service';

export interface ArtistInput {
  slug: string;
  name: string;
  genres: string[];
  bio?: string | null;
  avatar_color: string;
}

export interface SongInput {
  rank: number;
  title: string;
  album?: string | null;
  year?: number | null;
  youtube_url?: string | null;
}

export interface PickSongInput {
  rank: number;
  title: string;
  album?: string | null;
  year?: number | null;
  youtube_url?: string | null;
  artist_id: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private artistService = inject(ArtistService);

  async createArtist(input: ArtistInput): Promise<number> {
    const { data, error } = await supabase
      .from('artists')
      .insert(input)
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  }

  async updateArtist(id: number, input: ArtistInput): Promise<void> {
    const { error } = await supabase.from('artists').update(input).eq('id', id);
    if (error) throw error;
  }

  async deleteArtist(id: number): Promise<void> {
    const { error } = await supabase.from('artists').delete().eq('id', id);
    if (error) throw error;
  }

  async replaceSongs(artistId: number, songs: SongInput[]): Promise<void> {
    const del = await supabase.from('songs').delete().eq('artist_id', artistId);
    if (del.error) throw del.error;
    if (songs.length === 0) return;
    const rows = songs.map(s => ({ ...s, artist_id: artistId }));
    const ins = await supabase.from('songs').insert(rows);
    if (ins.error) throw ins.error;
  }

  async savePick(
    kind: 'weekly' | 'throwback',
    weekOf: string,
    editorNote: string | null,
    songs: PickSongInput[],
  ): Promise<void> {
    const up = await supabase
      .from('picks')
      .upsert({ kind, week_of: weekOf, editor_note: editorNote });
    if (up.error) throw up.error;

    const del = await supabase.from('pick_songs').delete().eq('pick_kind', kind);
    if (del.error) throw del.error;

    if (songs.length === 0) return;
    const rows = songs.map(s => ({ ...s, pick_kind: kind }));
    const ins = await supabase.from('pick_songs').insert(rows);
    if (ins.error) throw ins.error;
  }

  async refresh(): Promise<void> {
    await this.artistService.load();
  }
}
