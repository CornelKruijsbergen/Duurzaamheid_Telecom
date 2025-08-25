import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gebruikers-beheer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gebruikers_beheer.component.html',
  styleUrls: ['./gebruikers_beheer.component.css']
})

export class GebruikersBeheerComponent {
  username = '';
  newPassword = '';
  confirmPassword = '';
  message = '';

  constructor(private http: HttpClient) {
    console.log('GebruikersBeheerComponent geladen');
  }

  changePassword() {
    this.http.post<any>('http://localhost:5000/wijzig_wachtwoord', {
      username: this.username,
      password: this.newPassword,
      bevestig_wachtwoord: this.confirmPassword
    }).subscribe({
      next: res => this.message = res.message,
      error: err => this.message = err.error?.message || 'Fout bij wijzigen wachtwoord'
    });
  }
}