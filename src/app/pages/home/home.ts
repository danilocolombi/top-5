import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { SeoService } from '../../services/seo.service';
import { ArtistCard } from '../../components/artist-card/artist-card';
import { SongPlayer } from '../../components/song-player/song-player';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe, TitleCasePipe, ArtistCard, SongPlayer],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private artistService = inject(ArtistService);
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setHomeSeo();
  }

  searchQuery = signal('');
  selectedGenre = signal('');

  allArtists = this.artistService.artists;
  weeklyPick = this.artistService.getWeeklyPick();
  throwbackPick = this.artistService.getThrowbackPick();

  decadeOf(year?: number): string {
    if (!year) return '';
    return `${Math.floor((year % 100) / 10) * 10}s`;
  }
  featuredArtists = computed(() => this.allArtists().slice(0, 4));

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
