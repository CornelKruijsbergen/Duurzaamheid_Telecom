import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PvsystemenComponent } from './pvsystemen.component';
import { NieuwBestandComponent } from './nieuw-bestand.component';
import { BeheerderComponent } from './beheerder.component';
import { DashboardComponent } from './dashboard.component';
import { HandleidingComponent } from './handleiding.component';
import { InbedrijfComponent } from './inbedrijf.component';
import { InlogpaginaComponent } from './inlogpagina.component';
import { OnderdeelToevoegenComponent } from './onderdeel-toevoegen.component';
import { OnderdeelVerwijderenComponent } from './onderdeel-verwijderen.component';
import { OnderdeelWijzigenComponent } from './onderdeel-wijzigen.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'beheerder', component: BeheerderComponent },
  { path: 'handleiding', component: HandleidingComponent },
  { path: 'inbedrijf', component: InbedrijfComponent },
  { path: 'inlogpagina', component: InlogpaginaComponent },
  { path: 'nieuw-bestand', component: NieuwBestandComponent },
  { path: 'onderdeel-toevoegen', component: OnderdeelToevoegenComponent },
  { path: 'onderdeel-verwijderen', component: OnderdeelVerwijderenComponent },
  { path: 'onderdeel-wijzigen', component: OnderdeelWijzigenComponent },
  { path: 'pvsystemen', component: PvsystemenComponent },
  { path: '**', redirectTo: '' } // wildcard route for 404s
];

@NgModule({
  declarations: [
    AppComponent,
    PvsystemenComponent,
    NieuwBestandComponent,
    BeheerderComponent,
    DashboardComponent,
    HandleidingComponent,
    InbedrijfComponent,
    InlogpaginaComponent,
    OnderdeelToevoegenComponent,
    OnderdeelVerwijderenComponent,
    OnderdeelWijzigenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }