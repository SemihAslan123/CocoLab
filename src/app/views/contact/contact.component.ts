// CocoLab/src/app/views/contact/contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importez FormGroup
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm: FormGroup; // 1. Déclarez seulement le type

  // URL de l'endpoint du backend Node.js
  contactFormUrl = 'https://cocolab-backend.onrender.com/send-email';

  // Statut pour l'affichage des messages à l'utilisateur
  submissionStatus: 'initial' | 'sending' | 'success' | 'error' = 'initial';
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    // 2. Initialisez le formulaire DANS le constructeur
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.contactForm.invalid) {
      this.submissionStatus = 'error';
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.submissionStatus = 'sending';

    const formData = this.contactForm.value;

    this.http.post(this.contactFormUrl, formData).subscribe({
      next: (response: any) => {
        this.submissionStatus = 'success';
        this.contactForm.reset();
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi:', error);
        this.submissionStatus = 'error';
        this.errorMessage = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.';
      }
    });
  }
}
