import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inlogpagina',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
          this.loginError = 'Ongeldige inloggegevens';
          this.loginSuccess = false;
        }
      },
      error: () => {
        this.loginError = 'Serverfout';
        this.loginSuccess = false;
      }
    });
  }
}