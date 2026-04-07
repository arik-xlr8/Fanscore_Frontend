import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../../models/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loading = false;
  error: string | null = null;
  successMessage: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  submit(): void {
    if (this.loading) return;

    this.error = null;
    this.successMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';
    const confirmPassword = this.form.value.confirmPassword ?? '';

    if (password !== confirmPassword) {
      this.error = 'Şifreler uyuşmuyor';
      return;
    }

    const payload: RegisterRequest = {
      email,
      password
    };

    this.loading = true;

    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log('REGISTER SUCCESS:', res);

        this.form.reset();
        this.successMessage = 'Lütfen mailinizden hesabınızı doğrulayın 🤗';
        this.error = null;
        this.loading = false;
      },
      error: (err) => {
        console.log('REGISTER ERROR RAW:', err);
        this.error = err?.error?.message || 'Kayıt sırasında bir hata oluştu.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  goLogin(): void {
    this.router.navigateByUrl('/login');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
