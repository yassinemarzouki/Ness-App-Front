import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  submitted = false;
  passwordStrengthClass: 'w' | 'm' | 's' = 'w';
  strengthSegments: boolean[] = [false, false, false, false];

  @Output() switchToLogin = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  isFieldInvalid(fieldName: string, formName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  checkStrength(event: Event) {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    
    let score = 0;
    this.strengthSegments = [false, false, false, false];
    
    if (!val) {
      this.passwordStrengthClass = 'w';
      return;
    }

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    this.passwordStrengthClass = score <= 1 ? 'w' : score <= 2 ? 'm' : 's';
    
    for (let i = 0; i < score; i++) {
      this.strengthSegments[i] = true;
    }
  }

  switchTab() {
    this.switchToLogin.emit();
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log('Données inscription:', this.registerForm.value);
      // Ici, tu appelleras ton service d'authentification
    }
  }
}
