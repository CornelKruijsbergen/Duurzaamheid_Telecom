

import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DxToolbarModule, DxChartModule, DxDataGridModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DxToolbarModule, DxChartModule, DxDataGridModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Demo data voor cards
  laatsteBerekening: any = null;
  // Getter voor uitstoot_stroom als getal
  get uitstootStroomGetal(): number | null {
    const val = this.laatsteBerekening?.uitstoot_stroom;
    if (val === undefined || val === null) return null;
    const num = typeof val === 'number' ? val : parseFloat(val.toString().replace(/[^\d.-]/g, ''));
    return isNaN(num) ? null : num;
  }


  chartData: any[] = [];


  // Table data: opgehaald uit backend
  tableData: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Haal onderdelenlijst op voor tabel
    this.http.get<{onderdelenlijst: any[]}>('http://localhost:5000/laatste_onderdelenlijst').subscribe(res => {
      this.tableData = res.onderdelenlijst || [];
    });

    // Haal laatste berekening op voor grafiek en cards
    this.http.get<any[]>('http://localhost:5000/bereken_formule').subscribe(
      (berekening) => {
        console.log('Alle berekeningen uit backend:', berekening);
        const laatste = Array.isArray(berekening) ? berekening[berekening.length - 1] : berekening;
        if (laatste) {
          this.laatsteBerekening = laatste;
          // Chartdata genereren
          const OpwekPV = parseFloat((laatste.OpwekPV || '0').toString().replace(/[^\d.-]/g, ''));
          const uitstoot_stroom = parseFloat((laatste.uitstoot_stroom || '0').toString().replace(/[^\d.-]/g, ''));
          const LDP = this.extractLDP(laatste.resultaat);
          const CKE = 4.18;
          this.chartData = [];
          for (let jaar = 1; jaar <= LDP; jaar++) {
            this.chartData.push({
              jaar,
              co2_opwek: OpwekPV * CKE * jaar,
              co2_uitstoot: uitstoot_stroom * jaar
            });
          }
        }
      },
      (err) => {
        this.laatsteBerekening = null;
        this.chartData = [];
      }
    );
  }
  exportPdf(): void {
    console.log('Export start');
    const dashboard = document.querySelector('.dashboard-container') as HTMLElement;
    if (!dashboard) {
      console.log('Dashboard element niet gevonden');
      return;
    }
    html2canvas(dashboard, { scale: 2 } as any).then((canvas: HTMLCanvasElement) => {
      console.log('Canvas klaar');
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      // Schaal afbeelding naar paginaformaat
      const imgWidth = pageWidth - 40;
      const imgHeight = canvas.height * (imgWidth / canvas.width);
      pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
      pdf.save('dashboard-uitkomsten.pdf');
    });
  }
  // Helper om LDP (levensduur project) uit resultaat-string te halen
  extractLDP(resultaat: string): number {
    // Probeer een getal van 1-2 cijfers te vinden dat lijkt op het aantal jaren
    // Of pas aan als je weet hoe LDP wordt weergegeven
    const match = resultaat && resultaat.match(/(\d{1,2})/);
    if (match) {
      return parseInt(match[1], 10);
    }
    return 10; // fallback
  }

  nieuwProject = () => {
    this.router.navigate(['/nieuw-bestand']);
  }

  gaNaarHome = () => {
    this.router.navigate(['/']);
  }
  // Getter om alleen het getal uit resultaat te halen
  get resultaatGetal(): number | null {
    if (!this.laatsteBerekening?.resultaat) return null;
    // Zoek het eerste getal in de string
    const match = this.laatsteBerekening.resultaat.match(/[-+]?[0-9]*\.?[0-9]+/);
    return match ? parseFloat(match[0]) : null;
  }

  // Getter om alleen het getal uit huisequivalent te halen
  get huisequivalentGetal(): number | null {
    if (!this.laatsteBerekening?.huisequivalent) return null;
    const match = this.laatsteBerekening.huisequivalent.match(/[-+]?[0-9]*\.?[0-9]+/);
    return match ? parseFloat(match[0]) : null;
  }

}
