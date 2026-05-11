import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArtistService } from '../../../services/artist.service';
import { AdminService, PickSongInput } from '../../../services/admin.service';

interface PickRow {
  title: string;
  album: string;
  year: string;
  artistId: number | null;
}

@Component({
  selector: 'app-admin-picks-edit',
  imports: [FormsModule, RouterLink],
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
    Array.from({ length: 5 }, () => ({ title: '', album: '', year: '', artistId: null })),
  );
  saving = signal(false);
  error = signal<string | null>(null);

  artists = this.artistService.artists;

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
