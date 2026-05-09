import { Component, computed, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { SeoService } from '../../services/seo.service';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-detail',
  imports: [RouterLink],
  templateUrl: './artist-detail.html',
})
export class ArtistDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private artistService = inject(ArtistService);
  private location = inject(Location);
  private router = inject(Router);
  private seo = inject(SeoService);

  artist: Artist | undefined;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.artist = this.artistService.getBySlug(slug);
    if (this.artist) {
      this.artistService.incrementView(this.artist.id);
      this.seo.setArtistSeo(this.artist);
    }
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
