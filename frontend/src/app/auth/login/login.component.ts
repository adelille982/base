import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, // ✅ active le mode standalone
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  connectedMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const email = this.authService.getUserEmail(); // ✅ récupère l'email si déjà connecté
    if (email) {
      this.connectedMessage = `Vous êtes connecté en tant que ${email}`;
    }
  }

  onSubmit() {
    console.log("Tentative de login avec :", this.credentials);
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Token reçu :', response.token);
        this.authService.saveToken(response.token);
        this.authService.saveUserEmail(this.credentials.email);
        this.connectedMessage = `Vous êtes connecté en tant que ${this.credentials.email}`;
        setTimeout(() => this.router.navigate(['/']), 2000); // ✅ attend 2s avant redirection
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
        alert('Email ou mot de passe invalide');
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  logout(): void {
    this.authService.logout();
    this.connectedMessage = null;
    this.credentials = { email: '', password: '' };
  }
}
