import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'artist/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/login',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/artist/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/picks/:kind',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
