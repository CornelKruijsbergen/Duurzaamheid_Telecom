import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-onderdeel-verwijderen',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './onderdeel-verwijderen.component.html',
  styleUrls: ['./onderdeel-verwijderen.component.css']
})
export class OnderdeelVerwijderenComponent implements OnInit {
  categorie: string = '';
  categorieen: string[] = [];
  onderdelen: any[] = [];
  onderdeelID: string = '';
  melding: string = '';
  meldingType: 'success' | 'error' | '' = '';
  bevestigPrompt: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{categorieen: string[]}>('http://localhost:5000/categorieen').subscribe({
      next: res => this.categorieen = res.categorieen,
      error: err => this.categorieen = []
    });
  }

  onCategorieChange() {
    this.onderdeelID = '';
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

  verwijderOnderdeel() {
    if (!this.onderdeelID) return;
    this.bevestigPrompt = true;
  }

  bevestigVerwijderen(ja: boolean) {
    this.bevestigPrompt = false;
    if (!ja) return;
    const body = { OnderdeelID: this.onderdeelID };
    this.http.post<any>('http://localhost:5000/onderdeel_verwijderen', body).subscribe({
      next: res => {
        if (res.success) {
          this.melding = res.message || 'Onderdeel succesvol verwijderd!';
          this.meldingType = 'success';
        } else {
          this.melding = res.message || 'Verwijderen mislukt.';
          this.meldingType = 'error';
        }
      },
      error: err => {
        this.melding = err.error?.message || 'Serverfout bij verwijderen onderdeel.';
        this.meldingType = 'error';
      }
    });
  }
}
