import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nieuw-bestand',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nieuw-bestand.component.html',
  styleUrls: ['./nieuw-bestand.component.css']
})
export class NieuwBestandComponent {
  geselecteerdBestand: File | null = null;
  uploadResult: string = '';

  constructor(private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.geselecteerdBestand = input.files[0];
    }
  }

  uploadBestand() {
    if (!this.geselecteerdBestand) return;
    const formData = new FormData();
    formData.append('file', this.geselecteerdBestand);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(async response => {
        const text = await response.text();
        if (response.ok) {
          this.uploadResult = 'Upload gelukt!';
          // Navigeer naar PV Systemen met een bericht
          this.router.navigate(['/pvsystemen'], { queryParams: { msg: text } });
        } else {
          this.uploadResult = text;
        }
      })
      .catch(() => {
        this.uploadResult = 'Fout bij uploaden';
      });
  }

  gaNaarPVSystemen() {
    this.router.navigate(['/pvsystemen']);
  }
}
