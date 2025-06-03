import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inlogpagina',
  templateUrl: './inlogpagina.component.html'
})
export class InlogpaginaComponent {
  username = '';
  password = '';
  loginError = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:5000/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: res => {
        if (res.success) {
          this.loginError = '';
          // Navigeer naar de beheerder-pagina na succes
          this.router.navigate(['/beheerder']);
        } else {
          this.loginError = 'Ongeldige inloggegevens';
        }
      },
      error: () => this.loginError = 'Serverfout'
    });
  }
}