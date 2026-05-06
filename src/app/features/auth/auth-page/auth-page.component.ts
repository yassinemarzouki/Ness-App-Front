import { Component } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule,LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
// On définit l'onglet par défaut
  activeTab: 'login' | 'register' = 'login';

  constructor(private router: Router) {}

  onLoginSuccess() {
    // Rediriger vers la page des cours après la connexion
    this.router.navigate(['/courses']);
  }

  onSwitchToRegister() {
    this.activeTab = 'register';
  }
}
