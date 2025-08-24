import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSliderModule, DxNumberBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-inbedrijf',
  standalone: true,
  imports: [CommonModule, DxSliderModule, DxNumberBoxModule],
  templateUrl: './inbedrijf.component.html',
  styleUrls: ['./inbedrijf.component.css']
})
export class InbedrijfComponent {
  value = 10;
  result: string = '';

  format = (value: string) => `${value}%`;

  bereken() {
    // Placeholder logica
    this.result = 'Berekening uitgevoerd!';
  }
}
