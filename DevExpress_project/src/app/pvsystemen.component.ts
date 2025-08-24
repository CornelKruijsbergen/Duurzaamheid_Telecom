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
  message: string | null = "Er is niks geupload";
  PV: number = 0;
  pvvermogen: number = 0;
  pvhoek: number = 0;
  pvaantal: number = 0;

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
      PV: this.PV,
      pvvermogen: this.pvvermogen,
      pvhoek: this.pvhoek,
      pvaantal: this.pvaantal
    };
    this.http.post('http://localhost:5000/set_pv', data)
      .subscribe({
        next: (res: any) => {
          this.message = res.message;
          // Navigeer naar de inbedrijf-component na succes
          this.router.navigate(['/inbedrijf'], { queryParams: { msg: this.message } });
        },
        error: () => this.message = 'Fout bij opslaan'
      });
  }
}