import { Component, inject, OnInit, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArtistService } from '../../../services/artist.service';
import { AdminService } from '../../../services/admin.service';

const SLOT_COUNT = 4;

@Component({
  selector: 'app-admin-editor-picks-edit',
  imports: [FormsModule, RouterLink, TitleCasePipe],
  templateUrl: './editor-picks-edit.html',
})
export class AdminEditorPicksEdit implements OnInit {
  private router = inject(Router);
  private admin = inject(AdminService);
  private artistService = inject(ArtistService);

  artists = this.artistService.artists;
  slots = signal<(number | null)[]>(Array.from({ length: SLOT_COUNT }, () => null));
  saving = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const current = this.artistService.editorPicks();
    const initial: (number | null)[] = Array.from({ length: SLOT_COUNT }, (_, i) => current[i]?.id ?? null);
    this.slots.set(initial);
  }

  updateSlot(idx: number, value: number | null): void {
    const next = [...this.slots()];
    next[idx] = value;
    this.slots.set(next);
  }

  async save(): Promise<void> {
    this.error.set(null);
    const ids = this.slots();
    const nonNull = ids.filter(id => id !== null) as number[];
    if (new Set(nonNull).size !== nonNull.length) {
      this.error.set('Each slot must be a different artist.');
      return;
    }
    this.saving.set(true);
    try {
      await this.admin.saveEditorPicks(ids);
      await this.admin.refresh();
      this.router.navigateByUrl('/admin');
    } catch (e: any) {
      this.error.set(e?.message ?? 'Save failed.');
    } finally {
      this.saving.set(false);
    }
  }
}
