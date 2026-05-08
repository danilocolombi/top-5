import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { ArtistCard } from '../../components/artist-card/artist-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe, ArtistCard],
  templateUrl: './home.html',
})
export class Home {
  private artistService = inject(ArtistService);

  searchQuery = signal('');
  selectedGenre = signal('');

  allArtists = this.artistService.artists;
  weeklyPick = this.artistService.getWeeklyPick();

  hotArtists = computed(() =>
    [...this.allArtists()].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5)
  );

  allGenres = computed(() => this.artistService.getAllGenres());

  filteredArtists = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const g = this.selectedGenre();
    return this.allArtists().filter(a =>
      (!q || a.name.toLowerCase().includes(q)) &&
      (!g || a.genres.includes(g))
    );
  });

  toggleGenre(genre: string): void {
    this.selectedGenre.set(this.selectedGenre() === genre ? '' : genre);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedGenre.set('');
  }
}
