import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'artist/:slug',
    loadComponent: () => import('./pages/artist-detail/artist-detail').then(m => m.ArtistDetail),
  },
  { path: '**', redirectTo: '' },
];
