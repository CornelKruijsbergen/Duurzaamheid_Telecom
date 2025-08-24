import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-onderdeel-wijzigen',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './onderdeel-wijzigen.component.html',
  styleUrls: ['./onderdeel-wijzigen.component.css']
})
export class OnderdeelWijzigenComponent implements OnInit {
  categorie: string = '';
  categorieen: string[] = [];
  onderdelen: any[] = [];
  onderdeelID: string = '';
  nominaal_vermogen: number | null = null;
  piek_vermogen: number | null = null;
  gewicht: number | null = null;
  levensduur: number | null = null;
  capaciteit: number | null = null;
  melding: string = '';
  meldingType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{categorieen: string[]}>('http://localhost:5000/categorieen').subscribe({
      next: res => this.categorieen = res.categorieen,
      error: err => this.categorieen = []
    });
  }

  wijzigOnderdeel() {
    if (!this.onderdeelID) return;
    const body = {
      OnderdeelID: this.onderdeelID,
      Nominaal_Vermogen: this.nominaal_vermogen,
      Piek_Vermogen: this.piek_vermogen,
      Gewicht: this.gewicht,
      Levensduur: this.levensduur,
      Capaciteit: this.capaciteit,
      Categorie: this.categorie
    };
    this.http.post<any>('http://localhost:5000/onderdeel_wijzigen', body).subscribe({
      next: res => {
        if (res.success) {
          this.melding = res.message || 'Onderdeel succesvol gewijzigd!';
          this.meldingType = 'success';
        } else {
          this.melding = res.message || 'Wijzigen mislukt.';
          this.meldingType = 'error';
        }
      },
      error: err => {
        this.melding = err.error?.message || 'Serverfout bij wijzigen onderdeel.';
        this.meldingType = 'error';
      }
    });
  }

  onCategorieChange() {
    this.onderdeelID = '';
    this.nominaal_vermogen = null;
    this.piek_vermogen = null;
    this.gewicht = null;
    this.levensduur = null;
    this.capaciteit = null;
    if (this.categorie) {
      this.http.get<{onderdelen: any[]}>(`http://localhost:5000/onderdelen_van_categorie?categorie=${encodeURIComponent(this.categorie)}`)
        .subscribe({
          next: res => this.onderdelen = res.onderdelen,
          error: err => this.onderdelen = []
        });
    } else {
      this.onderdelen = [];
    }
  }

  onOnderdeelChange() {
    const onderdeel = this.onderdelen.find(o => o.OnderdeelID === this.onderdeelID);
    if (onderdeel) {
      this.nominaal_vermogen = onderdeel.Nominaal_Vermogen;
      this.piek_vermogen = onderdeel.Piek_Vermogen;
      this.gewicht = onderdeel.Gewicht;
      this.levensduur = onderdeel.Levensduur;
      this.capaciteit = onderdeel.Capaciteit;
    } else {
      this.nominaal_vermogen = null;
      this.piek_vermogen = null;
      this.gewicht = null;
      this.levensduur = null;
      this.capaciteit = null;
    }
  }
}
