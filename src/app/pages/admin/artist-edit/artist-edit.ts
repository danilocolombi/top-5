import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArtistService } from '../../../services/artist.service';
import { AdminService, ArtistInput, SongInput } from '../../../services/admin.service';

interface SongRow {
  title: string;
  album: string;
  year: string;
}

@Component({
  selector: 'app-admin-artist-edit',
  imports: [FormsModule, RouterLink],
  templateUrl: './artist-edit.html',
})
export class AdminArtistEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private admin = inject(AdminService);
  private artistService = inject(ArtistService);

  isNew = signal(false);
  artistId = signal<number | null>(null);
  genresInput = signal('');
  form = signal<ArtistInput>({
    slug: '',
    name: '',
    genres: [],
    bio: '',
    avatar_color: '#7c3aed',
  });
  songs = signal<SongRow[]>(
    Array.from({ length: 5 }, () => ({ title: '', album: '', year: '' })),
  );
  saving = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug || slug === 'new') {
      this.isNew.set(true);
      return;
    }
    const artist = this.artistService.getBySlug(slug);
    if (!artist) {
      this.router.navigateByUrl('/admin');
      return;
    }
    this.artistId.set(artist.id);
    this.form.set({
      slug: artist.slug,
      name: artist.name,
      genres: artist.genres,
      bio: artist.bio ?? '',
      avatar_color: artist.avatarColor,
    });
    this.genresInput.set(artist.genres.join(', '));
    const rows: SongRow[] = Array.from({ length: 5 }, (_, i) => {
      const s = artist.songs.find(x => x.rank === i + 1);
      return {
        title: s?.title ?? '',
        album: s?.album ?? '',
        year: s?.year != null ? String(s.year) : '',
      };
    });
    this.songs.set(rows);
  }

  updateSong(idx: number, field: keyof SongRow, value: string): void {
    const next = [...this.songs()];
    next[idx] = { ...next[idx], [field]: value };
    this.songs.set(next);
  }

  async save(): Promise<void> {
    this.error.set(null);
    const f = this.form();
    const genres = this.genresInput()
      .split(',')
      .map(g => g.trim())
      .filter(Boolean);

    if (!f.slug || !f.name || !f.avatar_color) {
      this.error.set('Slug, name, and color are required.');
      return;
    }

    const songInputs: SongInput[] = this.songs()
      .map((s, i) => ({
        rank: i + 1,
        title: s.title.trim(),
        album: s.album.trim() || null,
        year: s.year ? Number(s.year) : null,
      }))
      .filter(s => s.title);

    this.saving.set(true);
    try {
      const payload: ArtistInput = {
        slug: f.slug.trim(),
        name: f.name.trim(),
        genres,
        bio: f.bio?.trim() || null,
        avatar_color: f.avatar_color,
      };
      let id = this.artistId();
      if (this.isNew()) {
        id = await this.admin.createArtist(payload);
      } else {
        await this.admin.updateArtist(id!, payload);
      }
      await this.admin.replaceSongs(id!, songInputs);
      await this.admin.refresh();
      this.router.navigateByUrl('/admin');
    } catch (e: any) {
      this.error.set(e?.message ?? 'Save failed.');
    } finally {
      this.saving.set(false);
    }
  }
}
