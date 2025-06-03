import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PvsystemenComponent } from './pvsystemen.component';
import { InbedrijfComponent } from './inbedrijf.component';

const routes: Routes = [
  { path: 'pvsystemen', component: PvsystemenComponent },
  { path: 'inbedrijf', component: InbedrijfComponent },
  { path: '', redirectTo: '/pvsystemen', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PvsystemenComponent,
    InbedrijfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }