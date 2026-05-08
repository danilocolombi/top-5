import { Component, computed, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
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

  artist: Artist | undefined;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.artist = this.artistService.getBySlug(slug);
    if (this.artist) {
      this.artistService.incrementView(this.artist.id);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
