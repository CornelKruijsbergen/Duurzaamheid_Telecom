import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pvsystemen',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './pvsystemen.component.html',
  styleUrls: ['./pvsystemen.component.css']
})
export class PvsystemenComponent {
  heeftPV = true;
  message: string | null = null;

  gewicht: number = 0;
  aantal: number = 1;
  hoek: number = 0;
  vermogen: string = '';
  windrichting: string = '';

  vermogens: string[] = [
    '350WP', '355WP', '360WP', '365WP', '370WP', '375WP', '380WP', '385WP',
    '395WP', '400WP', '405WP', '410WP', '415WP', '420WP', '425WP', '440WP'
  ];
  windrichtingen: string[] = [
    'Oost', 'Zuid-Oost', 'Zuid', 'Zuid-West', 'West'
  ];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const msg = this.route.snapshot.queryParamMap.get('msg');
    if (msg) {
      this.message = msg;
    }
  }

  submitForm() {
    const data = {
      gewicht: this.gewicht,
      aantal: this.aantal,
      hoek: this.hoek,
      vermogen: this.vermogen,
      windrichting: this.windrichting,
      heeftPV: this.heeftPV ? 1 : 0
    };
    this.http.post('http://localhost:5000/PV_Berekenen', data)
      .subscribe({
        next: (res: any) => {
          this.message = res.message;
          this.router.navigate(['/inbedrijf'], { queryParams: { msg: this.message } });
        },
        error: () => this.message = 'Fout bij opslaan'
      });
  }
}