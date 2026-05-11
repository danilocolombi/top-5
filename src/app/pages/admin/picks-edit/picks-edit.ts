import { Component, inject, OnInit, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArtistService } from '../../../services/artist.service';
import { AdminService, PickSongInput } from '../../../services/admin.service';

interface PickRow {
  title: string;
  album: string;
  year: string;
  youtubeUrl: string;
  artistId: number | null;
}

@Component({
  selector: 'app-admin-picks-edit',
  imports: [FormsModule, RouterLink, TitleCasePipe],
  templateUrl: './picks-edit.html',
})
export class AdminPicksEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private admin = inject(AdminService);
  private artistService = inject(ArtistService);

  kind = signal<'weekly' | 'throwback'>('weekly');
  weekOf = signal('');
  editorNote = signal('');
  songs = signal<PickRow[]>(
    Array.from({ length: 5 }, () => ({ title: '', album: '', year: '', youtubeUrl: '', artistId: null })),
  );
  saving = signal(false);
  error = signal<string | null>(null);

  showNewArtist = signal(false);
  newArtistName = signal('');
  newArtistGenres = signal('');
  newArtistColor = signal('#7c3aed');
  newArtistError = signal<string | null>(null);
  creatingArtist = signal(false);

  artists = this.artistService.artists;

  private slugify(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  toggleNewArtist(): void {
    this.showNewArtist.update(v => !v);
    this.newArtistError.set(null);
  }

  async createArtist(): Promise<void> {
    this.newArtistError.set(null);
    const name = this.newArtistName().trim();
    if (!name) {
      this.newArtistError.set('Name is required.');
      return;
    }
    const slug = this.slugify(name);
    if (!slug) {
      this.newArtistError.set('Could not generate slug from name.');
      return;
    }
    const genres = this.newArtistGenres()
      .split(',')
      .map(g => g.trim())
      .filter(Boolean);

    this.creatingArtist.set(true);
    try {
      const id = await this.admin.createArtist({
        slug,
        name,
        genres,
        bio: null,
        avatar_color: this.newArtistColor(),
      });
      await this.admin.refresh();
      const firstEmpty = this.songs().findIndex(r => !r.artistId);
      if (firstEmpty >= 0) this.updateRow(firstEmpty, 'artistId', id);
      this.newArtistName.set('');
      this.newArtistGenres.set('');
      this.newArtistColor.set('#7c3aed');
      this.showNewArtist.set(false);
    } catch (e: any) {
      this.newArtistError.set(e?.message ?? 'Create failed.');
    } finally {
      this.creatingArtist.set(false);
    }
  }

  ngOnInit(): void {
    const k = this.route.snapshot.paramMap.get('kind') as 'weekly' | 'throwback' | null;
    if (k !== 'weekly' && k !== 'throwback') {
      this.router.navigateByUrl('/admin');
      return;
    }
    this.kind.set(k);
    const pick = k === 'weekly' ? this.artistService.getWeeklyPick() : this.artistService.getThrowbackPick();
    this.weekOf.set(pick.weekOf || new Date().toISOString().slice(0, 10));
    this.editorNote.set(pick.editorNote ?? '');
    const rows: PickRow[] = Array.from({ length: 5 }, (_, i) => {
      const s = pick.songs.find(x => x.rank === i + 1);
      return {
        title: s?.title ?? '',
        album: s?.album ?? '',
        year: s?.year != null ? String(s.year) : '',
        youtubeUrl: s?.youtubeUrl ?? '',
        artistId: s?.artist.id ?? null,
      };
    });
    this.songs.set(rows);
  }

  updateRow(idx: number, field: keyof PickRow, value: string | number | null): void {
    const next = [...this.songs()];
    next[idx] = { ...next[idx], [field]: value as never };
    this.songs.set(next);
  }

  async save(): Promise<void> {
    this.error.set(null);
    if (!this.weekOf()) {
      this.error.set('Week-of date is required.');
      return;
    }
    const rows = this.songs();
    const inputs: PickSongInput[] = [];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (!r.title.trim()) continue;
      if (!r.artistId) {
        this.error.set(`Song #${i + 1}: artist is required.`);
        return;
      }
      inputs.push({
        rank: i + 1,
        title: r.title.trim(),
        album: r.album.trim() || null,
        year: r.year ? Number(r.year) : null,
        youtube_url: r.youtubeUrl.trim() || null,
        artist_id: r.artistId,
      });
    }

    this.saving.set(true);
    try {
      await this.admin.savePick(
        this.kind(),
        this.weekOf(),
        this.editorNote().trim() || null,
        inputs,
      );
      await this.admin.refresh();
      this.router.navigateByUrl('/admin');
    } catch (e: any) {
      this.error.set(e?.message ?? 'Save failed.');
    } finally {
      this.saving.set(false);
    }
  }
}
