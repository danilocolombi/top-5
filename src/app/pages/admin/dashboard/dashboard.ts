import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ArtistService } from '../../../services/artist.service';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './dashboard.html',
})
export class AdminDashboard {
  private admin = inject(AdminService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private artistService = inject(ArtistService);

  artists = this.artistService.artists;
  email = this.auth.email;

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
