
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Onderdeel {
  OnderdeelID: string;
  Categorie: string;
  Nominaal_Vermogen?: number;
  Piek_Vermogen?: number;
  Gewicht?: number;
  Levensduur?: number;
  Capaciteit?: number;
  kwantiteit?: number;
}

@Component({
  selector: 'app-nieuw-bestand',
  standalone: true,
  imports: [CommonModule, FormsModule, DxSelectBoxModule, DxNumberBoxModule, HttpClientModule],
  templateUrl: './nieuw-bestand.component.html',
  styleUrls: ['./nieuw-bestand.component.css']
})
export class NieuwBestandComponent {

  constructor(private http: HttpClient, private router: Router) {
    this.laadCategorieen();
  }

  // --- Nieuwe onderdelenlijst functionaliteit ---

  categorieen: string[] = [];
  onderdelen: Onderdeel[] = [];
  geselecteerdeCategorie: string | null = null;
  geselecteerdOnderdeel: Onderdeel | null = null;
  kwantiteit: number = 1;
  lijst: Onderdeel[] = [];
  feedback: string = '';


  laadCategorieen() {
    this.http.get<{categorieen: string[]}>('http://localhost:5000/categorieen').subscribe(data => {
      this.categorieen = data.categorieen;
    });
  }

  laadOnderdelen() {
    if (!this.geselecteerdeCategorie) return;
    this.http.get<{onderdelen: { OnderdeelID: string; Categorie: string }[]}>(`http://localhost:5000/onderdelen_van_categorie?categorie=${encodeURIComponent(this.geselecteerdeCategorie)}`)
      .subscribe(data => {
        this.onderdelen = data.onderdelen;
      });
  }


  voegToeAanLijst() {
    if (this.geselecteerdOnderdeel && this.kwantiteit > 0) {
      this.lijst.push({
        OnderdeelID: this.geselecteerdOnderdeel.OnderdeelID,
        Categorie: this.geselecteerdOnderdeel.Categorie,
        Nominaal_Vermogen: this.geselecteerdOnderdeel.Nominaal_Vermogen,
        Piek_Vermogen: this.geselecteerdOnderdeel.Piek_Vermogen,
        Gewicht: this.geselecteerdOnderdeel.Gewicht,
        Levensduur: this.geselecteerdOnderdeel.Levensduur,
        Capaciteit: this.geselecteerdOnderdeel.Capaciteit,
        kwantiteit: this.kwantiteit
      });
      this.geselecteerdOnderdeel = null;
      this.kwantiteit = 1;
      this.feedback = '';
    }
  }


  verwijderUitLijst(index: number) {
    this.lijst.splice(index, 1);
  }

  bevestigLijst() {
    if (this.lijst.length === 0) return;
    // Stuur de lijst direct als array naar de backend
    this.http.post('http://localhost:5000/verwerk_onderdelen_lijst', this.lijst).subscribe({
      next: (res: any) => {
        this.feedback = 'Lijst succesvol verwerkt! Je wordt doorgestuurd...';
        setTimeout(() => this.router.navigate(['/pvsystemen']), 1200);
      },
      error: () => {
        this.feedback = 'Fout bij verwerken van de lijst.';
      }
    });
  }
}
