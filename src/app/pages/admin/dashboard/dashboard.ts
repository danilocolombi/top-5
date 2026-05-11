import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistService } from '../../../services/artist.service';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, TitleCasePipe, FormsModule],
  templateUrl: './dashboard.html',
})
export class AdminDashboard {
  private admin = inject(AdminService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private artistService = inject(ArtistService);

  filterQuery = signal('');

  filteredArtists = computed(() => {
    const q = this.filterQuery().toLowerCase().trim();
    if (!q) return this.artistService.artists();
    return this.artistService.artists().filter(a => a.name.toLowerCase().includes(q));
  });

  email = this.auth.email;

  initials(name: string): string {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  async deleteArtist(id: number, name: string): Promise<void> {
    if (!confirm(`Delete "${name}" and all their songs? This cannot be undone.`)) return;
    await this.admin.deleteArtist(id);
    await this.admin.refresh();
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
    this.router.navigateByUrl('/admin/login');
  }
}
