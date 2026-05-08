import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './artist-card.html',
})
export class ArtistCard {
  artist = input.required<Artist>();
}
