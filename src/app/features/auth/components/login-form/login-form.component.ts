import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  submitted = false;

  @Output() switchToRegister = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(fieldName: string, formName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  switchTab() {
    this.switchToRegister.emit();
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('Données de connexion:', this.loginForm.value);
      // Ici, tu appelleras ton service d'authentification
    }
  }
}
