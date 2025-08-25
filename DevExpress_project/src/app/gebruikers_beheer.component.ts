import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gebruikers-beheer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gebruikers_beheer.component.html',
  styleUrls: ['./gebruikers_beheer.component.css']
})

export class GebruikersBeheerComponent {
  username = '';
  newPassword = '';
  confirmPassword = '';
  message = '';

  constructor(private http: HttpClient) {}

  changePassword() {
    this.http.post<any>('http://localhost:5000/change_password', {
      username: this.username,
      new_password: this.newPassword,
      confirm_password: this.confirmPassword
    }).subscribe({
      next: res => this.message = res.message,
      error: err => this.message = err.error?.message || 'Fout bij wijzigen wachtwoord'
    });
  }
}