import { Component, NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxSliderModule, DxNumberBoxModule } from 'devextreme-angular';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

let modulePrefix = '';
// @ts-ignore
if (window && window.config?.packageConfigPaths) {
  modulePrefix = '/app';
}

@Component({
  selector: 'app-inbedrijf',
  templateUrl: './inbedrijf.component.html',
  styleUrls: ['./inbedrijf.component.css']
})
export class InbedrijfComponent {
  value = 10;

  format = (value: string) => `${value}%`;
}

@NgModule({
  imports: [
    BrowserModule,
    DxSliderModule,
    DxNumberBoxModule,
  ],
  declarations: [InbedrijfComponent],
  bootstrap: [InbedrijfComponent],
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
