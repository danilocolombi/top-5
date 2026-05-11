import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-card',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './artist-card.html',
})
export class ArtistCard {
  artist = input.required<Artist>();
}
