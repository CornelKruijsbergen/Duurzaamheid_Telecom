import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-onderdeel-toevoegen',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './onderdeel-toevoegen.component.html',
  styleUrls: ['./onderdeel-toevoegen.component.css']
})
export class OnderdeelToevoegenComponent implements OnInit {
  onderdeelID: string = '';
  nominaal_vermogen: number | null = null;
  piek_vermogen: number | null = null;
  gewicht: number | null = null;
  levensduur: number | null = null;
  capaciteit: number | null = null;
  categorie: string = '';
  categorieen: string[] = [];
  nieuweCategorie: string = '';
  melding: string = '';
  meldingType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{categorieen: string[]}>('http://localhost:5000/categorieen').subscribe({
      next: res => this.categorieen = res.categorieen,
      error: err => this.categorieen = []
    });
  }

  voegOnderdeelToe() {
    const gekozenCategorie = this.categorie === '__nieuw__' ? this.nieuweCategorie : this.categorie;
    const body = {
      OnderdeelID: this.onderdeelID,
      Nominaal_Vermogen: this.nominaal_vermogen,
      Piek_Vermogen: this.piek_vermogen,
      Gewicht: this.gewicht,
      Levensduur: this.levensduur,
      Capaciteit: this.capaciteit,
      Categorie: gekozenCategorie
    };
    this.http.post<any>('http://localhost:5000/onderdeel_toevoegen', body).subscribe({
      next: res => {
        if (res.success) {
          this.melding = res.message || 'Onderdeel succesvol toegevoegd!';
          this.meldingType = 'success';
        } else {
          this.melding = res.message || 'Toevoegen mislukt.';
          this.meldingType = 'error';
        }
      },
      error: err => {
        this.melding = err.error?.message || 'Serverfout bij toevoegen onderdeel.';
        this.meldingType = 'error';
      }
    });
  }
}
