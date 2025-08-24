import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Onderdeel {
  OnderdeelID: string;
  Nominaal_Vermogen: number;
  Piek_Vermogen: number;
  Gewicht: number;
  Levensduur: number;
  Capaciteit: number;
  Categorie: string;
  kwantiteit?: number;
}

@Component({
  selector: 'app-nieuw-bestand',
  standalone: true,
  imports: [CommonModule, FormsModule, DxSelectBoxModule, DxNumberBoxModule],
  templateUrl: './nieuw-bestand.component.html',
  styleUrls: ['./nieuw-bestand.component.css']
})
export class NieuwBestandComponent {
  // --- Oude upload functionaliteit ---
  geselecteerdBestand: File | null = null;
  uploadResult: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.laadCategorieen();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.geselecteerdBestand = input.files[0];
    }
  }

  uploadBestand() {
    if (!this.geselecteerdBestand) return;
    const formData = new FormData();
    formData.append('file', this.geselecteerdBestand);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(async response => {
        const text = await response.text();
        if (response.ok) {
          this.uploadResult = 'Upload gelukt!';
          // Navigeer naar PV Systemen met een bericht
          this.router.navigate(['/pvsystemen'], { queryParams: { msg: text } });
        } else {
          this.uploadResult = text;
        }
      })
      .catch(() => {
        this.uploadResult = 'Fout bij uploaden';
      });
  }

  gaNaarPVSystemen() {
    this.router.navigate(['/pvsystemen']);
  }

  // --- Nieuwe onderdelenlijst functionaliteit ---
  categorieen: string[] = [];
  onderdelen: Onderdeel[] = [];
  geselecteerdeCategorie: string | null = null;
  geselecteerdOnderdeel: Onderdeel | null = null;
  kwantiteit: number = 1;
  lijst: Onderdeel[] = [];

  laadCategorieen() {
    this.http.get<string[]>('/api/categorieen').subscribe(data => {
      this.categorieen = data;
    });
  }

  laadOnderdelen() {
    if (!this.geselecteerdeCategorie) return;
    this.http.get<Onderdeel[]>(`/api/onderdelen?categorie=${this.geselecteerdeCategorie}`).subscribe(data => {
      this.onderdelen = data;
    });
  }

  voegToeAanLijst() {
    if (this.geselecteerdOnderdeel && this.kwantiteit > 0) {
      this.lijst.push({ ...this.geselecteerdOnderdeel, kwantiteit: this.kwantiteit });
      this.geselecteerdOnderdeel = null;
      this.kwantiteit = 1;
    }
  }

  verwijderUitLijst(index: number) {
    this.lijst.splice(index, 1);
  }

  verderNaarPVSystemen() {
    this.http.post('/api/verwerk_onderdelen', { onderdelen: this.lijst }).subscribe(() => {
      this.router.navigate(['/pvsystemen']);
    });
  }
}
