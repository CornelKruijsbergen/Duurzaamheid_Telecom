import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pvsystemen',
  templateUrl: './pvsystemen.component.html'
})
export class PvsystemenComponent implements OnInit {
  message: string | null = "Er is niks geupload";
  PV: number = 0;
  pvvermogen: number = 0;
  pvhoek: number = 0;
  pvaantal: number = 0;

constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
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