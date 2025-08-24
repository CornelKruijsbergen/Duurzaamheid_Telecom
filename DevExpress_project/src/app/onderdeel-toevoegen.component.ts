import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onderdeel-toevoegen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onderdeel-toevoegen.component.html',
  styleUrls: ['./onderdeel-toevoegen.component.css']
})
export class OnderdeelToevoegenComponent {
  nominaal_vermogen: number | null = null;
  piek_vermogen: number | null = null;
  installatie_druk: number | null = null;
  gewicht: number | null = null;
  levensduur: number | null = null;
  capaciteit: number | null = null;
  categorie: string = '';
  melding: string = '';

  voegOnderdeelToe() {
    // Placeholder logica
    this.melding = 'Onderdeel toegevoegd!';
  }
}
