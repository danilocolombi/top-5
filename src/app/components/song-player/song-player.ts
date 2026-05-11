import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-song-player',
  templateUrl: './song-player.html',
  styles: [':host { display: contents; }'],
})
export class SongPlayer {
  private sanitizer = inject(DomSanitizer);

  url = input<string | undefined>(undefined);

  expanded = signal(false);

  videoId = computed<string | null>(() => {
    const u = this.url();
    if (!u) return null;
    return this.extractId(u);
  });

  embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.videoId();
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
    );
  });

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.expanded.update(v => !v);
  }

  private extractId(url: string): string | null {
    const trimmed = url.trim();
    const patterns = [
      /[?&]v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const re of patterns) {
      const m = trimmed.match(re);
      if (m) return m[1];
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    return null;
  }
}
