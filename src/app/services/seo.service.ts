import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Artist } from '../models/artist.model';

const SITE_URL = 'https://top-5-ecru.vercel.app';
const SITE_NAME = 'Top 5';
const DEFAULT_DESCRIPTION =
  'Hand-picked top 5 song lists for the artists that shaped modern music. No streams, no charts — just five tracks every artist deserves to be remembered for.';

interface SeoConfig {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'profile' | 'article';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  setHomeSeo(): void {
    this.apply({
      title: 'Top 5 — Five Songs Every Artist Deserves to Be Remembered For',
      description: DEFAULT_DESCRIPTION,
      path: '/',
      type: 'website',
    });
    this.setJsonLd('seo-home-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: DEFAULT_DESCRIPTION,
    });
  }

  setArtistSeo(artist: Artist): void {
    const songList = artist.songs.map(s => s.title).join(', ');
    const title = `${artist.name} — Top 5 Songs | ${SITE_NAME}`;
    const description = `The five essential ${artist.name} songs you need to hear: ${songList}. ${artist.bio ?? ''}`.trim();
    const path = `/artist/${artist.slug}`;

    this.apply({ title, description, path, type: 'profile' });

    this.setJsonLd('seo-artist-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'MusicGroup',
      name: artist.name,
      genre: artist.genres,
      description: artist.bio,
      url: `${SITE_URL}${path}`,
      track: artist.songs.map(s => ({
        '@type': 'MusicRecording',
        name: s.title,
        byArtist: { '@type': 'MusicGroup', name: artist.name },
        inAlbum: s.album ? { '@type': 'MusicAlbum', name: s.album } : undefined,
        datePublished: s.year ? String(s.year) : undefined,
        position: s.rank,
      })),
    });
  }

  private apply(cfg: SeoConfig): void {
    const url = `${SITE_URL}${cfg.path}`;
    this.title.setTitle(cfg.title);

    this.upsertName('description', cfg.description);
    this.upsertProperty('og:title', cfg.title);
    this.upsertProperty('og:description', cfg.description);
    this.upsertProperty('og:url', url);
    this.upsertProperty('og:type', cfg.type ?? 'website');
    this.upsertProperty('og:site_name', SITE_NAME);
    this.upsertName('twitter:card', 'summary_large_image');
    this.upsertName('twitter:title', cfg.title);
    this.upsertName('twitter:description', cfg.description);

    this.setCanonical(url);
  }

  private upsertName(name: string, content: string): void {
    if (this.meta.getTag(`name="${name}"`)) {
      this.meta.updateTag({ name, content });
    } else {
      this.meta.addTag({ name, content });
    }
  }

  private upsertProperty(property: string, content: string): void {
    if (this.meta.getTag(`property="${property}"`)) {
      this.meta.updateTag({ property, content });
    } else {
      this.meta.addTag({ property, content });
    }
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(id: string, data: unknown): void {
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
