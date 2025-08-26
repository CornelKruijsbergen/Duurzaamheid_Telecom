
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSliderModule, DxNumberBoxModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbedrijf',
  standalone: true,
  imports: [CommonModule, DxSliderModule, DxNumberBoxModule, HttpClientModule, FormsModule],
  templateUrl: './inbedrijf.component.html',
  styleUrls: ['./inbedrijf.component.css']
})
export class InbedrijfComponent {
  sliderValue = 100;
  levensduurProject: number = 25;
  result: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  format = (value: number | Date) => `${value}`;

  opslaanEnVerder() {
    // Stuur de sliderwaarde en levensduur project naar de backend
    this.http.post('http://localhost:5000/slider_waarde', {
      waarde: this.sliderValue,
      levensduur_project: this.levensduurProject
    }).subscribe({
      next: (res: any) => {
        this.result = 'Waarde opgeslagen!';
        // Haal onderdelenlijst op uit backend
        this.http.get<{onderdelenlijst: any[]}>('http://localhost:5000/laatste_onderdelenlijst').subscribe({
          next: (data) => {
            const lijst = data.onderdelenlijst || [];
            // Sommeer de relevante waardes uit de lijst
            let totaalGewicht = 0, totaalGW = 0, totaalCapaciteit = 0, totaalLevensduur = 0, totaalPiek = 0, totaalNominaal = 0;
            lijst.forEach(item => {
              const kwantiteit = item.kwantiteit || 1;
              totaalGewicht += (item.Gewicht || 0) * kwantiteit;
              totaalGW += (item.GW || 0) * kwantiteit;
              totaalCapaciteit += (item.Capaciteit || 0) * kwantiteit;
              totaalLevensduur += (item.Levensduur || 0) * kwantiteit;
              totaalPiek += (item.Piek_Vermogen || 0) * kwantiteit;
              totaalNominaal += (item.Nominaal_Vermogen || 0) * kwantiteit;
            });
            // Bepaal opbrengstPV als som van (optioneel) veld opbrengstPV per item, anders 0 HIER HEEEL GOED NOG NAAR KIJKEN!!!!!!!! ZEER INSTABIEL
            let totaalOpbrengstPV = 0;
            lijst.forEach(item => {
              const kwantiteit = item.kwantiteit || 1;
              // Gebruik veld opbrengstPV als aanwezig, anders 0
              totaalOpbrengstPV += (item.opbrengstPV || 0) * kwantiteit;
            });
            // Zorg dat capaciteit en levensduur minimaal 1 zijn
            const veiligeCapaciteit = totaalCapaciteit > 0 ? totaalCapaciteit : 1;
            const veiligeLevensduur = totaalLevensduur > 0 ? totaalLevensduur : 1;
            const formuleData = {
              piek_vermogen: totaalPiek,
              nominaal_vermogen: totaalNominaal,
              gewicht: totaalGewicht,
              GW: totaalGW,
              capaciteit: veiligeCapaciteit,
              levensduur: veiligeLevensduur,
              levensduur_project: this.levensduurProject,
              opbrengstPV: totaalOpbrengstPV
            };
            this.http.post('http://localhost:5000/bereken_formule', formuleData).subscribe({
              next: () => {
                this.router.navigate(['/dashboard'], { queryParams: { slider: this.sliderValue, levensduur: this.levensduurProject } });
              },
              error: () => {
                this.result = 'Fout bij berekenen van de formule';
              }
            });
          },
          error: () => {
            this.result = 'Fout bij ophalen onderdelenlijst';
          }
        });
      },
      error: () => {
        this.result = 'Fout bij opslaan';
      }
    });
  }
}
