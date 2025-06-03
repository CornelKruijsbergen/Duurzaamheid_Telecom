import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'nieuw-bestand.component.html',
    renderMode: RenderMode.Prerender
  },
    {
    path: 'beheerder.component.html',
    renderMode: RenderMode.Prerender
  },
    {
    path: 'dashboard.component.html',
    renderMode: RenderMode.Prerender
  },
    {
    path: 'inbedrijf.component.html',
    renderMode: RenderMode.Prerender
  },
    {
    path: 'inlogpagina.component.html',
    renderMode: RenderMode.Prerender
  },
    {
    path: 'onderdeel-toevoegen.component.html',
    renderMode: RenderMode.Prerender
  },
    {
    path: 'onderdeel-verwijderen.component.html',
    renderMode: RenderMode.Prerender
  },
    {
    path: 'onderdeel-wijzigen.component.html',
    renderMode: RenderMode.Prerender
  },
    {
    path: 'pvsystemen.component.html',
    renderMode: RenderMode.Prerender
  }
];
