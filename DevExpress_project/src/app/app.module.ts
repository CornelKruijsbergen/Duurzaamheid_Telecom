import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


import { routes } from './app.routes';

import { GebruikersBeheerComponent } from './gebruikers_beheer.component';


@NgModule({
  declarations: [
  AppComponent,
  HomeComponent,
  GebruikersBeheerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }