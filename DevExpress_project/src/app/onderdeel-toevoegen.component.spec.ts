import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nieuw-onderdeel',
  templateUrl: './nieuw_onderdeel.component.html'
})
export class NieuwOnderdeelComponent {
  nominaal_vermogen = 0;
  piek_vermogen = 0;
  installatie_druk = 0;
  gewicht = 0;
  levensduur = 0;
  capaciteit = 0;
  categorie = '';
  melding = '';

  constructor(private http: HttpClient) {}

  voegOnderdeelToe() {
    const data = {
      nominaal_vermogen: this.nominaal_vermogen,
      piek_vermogen: this.piek_vermogen,
      installatie_druk: this.installatie_druk,
      gewicht: this.gewicht,
      levensduur: this.levensduur,
      capaciteit: this.capaciteit,
      categorie: this.categorie
    };
    this.http.post<any>('http://localhost:5000/onderdeel_toevoegen', data)
      .subscribe({
        next: res => this.melding = res.message,
        error: () => this.melding = 'Fout bij toevoegen'
      });
  }
}