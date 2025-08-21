import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbedrijf',
  templateUrl: './inbedrijf.component.html'
})
export class InbedrijfComponent {
  result: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  bereken() {
    this.http.post<any>('http://localhost:5000/bereken', {})
      .subscribe({
        next: res => {
          this.result = res.result;
          // NNaar dashboard en geef het resultaat mee als param
          this.router.navigate(['/dashboard'], { queryParams: { result: this.result } });
        },
        error: () => this.result = 'Fout bij berekenen'
      });
  }
}