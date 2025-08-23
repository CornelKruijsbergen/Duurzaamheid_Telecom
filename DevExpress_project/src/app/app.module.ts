import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { AppComponent } from './app.component';
import { PvsystemenComponent } from './pvsystemen.component';
import { NieuwBestandComponent } from './nieuw-bestand.component';


const routes: Routes = [
const routes: Routes = [
  { path: 'pvsystemen', component: PvsystemenComponent },
  { path: '', redirectTo: '/pvsystemen', pathMatch: 'full' },
  { path: 'nieuw-bestand', component: NieuwBestandComponent },
  { path: '**', redirectTo: '' } // wildcard route for 404s
];
@NgModule({
  
  declarations: [
    AppComponent,
    PvsystemenComponent,

    

  ]
  ,

imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule,
imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  RouterModule.forRoot(routes)
  
],
export class AppModule { }