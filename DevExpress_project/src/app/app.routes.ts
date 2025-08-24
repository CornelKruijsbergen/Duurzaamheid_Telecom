import { Routes } from '@angular/router';

import { BeheerderComponent } from './beheerder.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { HandleidingComponent } from './handleiding.component';
import { InbedrijfComponent } from './inbedrijf.component';
import { InlogpaginaComponent } from './inlogpagina.component';
import { NieuwBestandComponent } from './nieuw-bestand.component';
import { OnderdeelToevoegenComponent } from './onderdeel-toevoegen.component';
import { OnderdeelVerwijderenComponent } from './onderdeel-verwijderen.component';
import { OnderdeelWijzigenComponent } from './onderdeel-wijzigen.component';
import { PvsystemenComponent } from './pvsystemen.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'beheerder', component: BeheerderComponent },
  { path: 'handleiding', component: HandleidingComponent },
  { path: 'inbedrijf', component: InbedrijfComponent },
  { path: 'inlogpagina', component: InlogpaginaComponent },
  { path: 'nieuw-bestand', loadComponent: () => import('./nieuw-bestand.component').then(m => m.NieuwBestandComponent) },
  { path: 'onderdeel-toevoegen', component: OnderdeelToevoegenComponent },
  { path: 'onderdeel-verwijderen', component: OnderdeelVerwijderenComponent },
  { path: 'onderdeel-wijzigen', component: OnderdeelWijzigenComponent },
  { path: 'pvsystemen', component: PvsystemenComponent }
];