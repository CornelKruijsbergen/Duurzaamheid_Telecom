import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inlogpagina',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './inlogpagina.component.html',
  styleUrls: ['./inlogpagina.component.css']
})
export class InlogpaginaComponent {
  username = '';
  password = '';
  loginError = '';
  loginSuccess = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:5000/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: res => {
        if (res.success) {
          this.loginError = '';
          this.loginSuccess = true;
          // Navigeer naar de beheerder-pagina na succes
          this.router.navigate(['/beheerder']);
        } else {
          // Toon de backend message bij fout
          this.loginError = res.message || 'Ongeldige inloggegevens';
          this.loginSuccess = false;
        }
      },
      error: err => {
        // Probeer backend message te tonen bij error response
        if (err.error && err.error.message) {
          this.loginError = err.error.message;
        } else {
          this.loginError = 'Serverfout';
        }
        this.loginSuccess = false;
      }
    });
  }
}