import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent) },
  { path: 'beheerder', loadComponent: () => import('./beheerder.component').then(m => m.BeheerderComponent) },
  { path: 'handleiding', loadComponent: () => import('./handleiding.component').then(m => m.HandleidingComponent) },
  { path: 'inbedrijf', loadComponent: () => import('./inbedrijf.component').then(m => m.InbedrijfComponent) },
  { path: 'inlogpagina', loadComponent: () => import('./inlogpagina.component').then(m => m.InlogpaginaComponent) },
  { path: 'nieuw-bestand', loadComponent: () => import('./nieuw-bestand.component').then(m => m.NieuwBestandComponent) },
  { path: 'onderdeel-toevoegen', loadComponent: () => import('./onderdeel-toevoegen.component').then(m => m.OnderdeelToevoegenComponent) },
  { path: 'onderdeel-verwijderen', loadComponent: () => import('./onderdeel-verwijderen.component').then(m => m.OnderdeelVerwijderenComponent) },
  { path: 'onderdeel-wijzigen', loadComponent: () => import('./onderdeel-wijzigen.component').then(m => m.OnderdeelWijzigenComponent) },
  { path: 'pvsystemen', loadComponent: () => import('./pvsystemen.component').then(m => m.PvsystemenComponent) },
  { path: 'gebruikers_beheer', loadComponent: () => import('./gebruikers_beheer.component').then(m => m.GebruikersBeheerComponent) },
];