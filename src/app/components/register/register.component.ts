import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { AuthResponse, RegisterRequest } from '../../../models/auth';


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
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  submit(): void {
  console.log('SUBMIT ÇALIŞTI');
  console.log('FORM VALUE:', this.form.value);
  console.log('FORM VALID:', this.form.valid);

  if (this.loading) return;

  this.error = null;

  if (this.form.invalid) {
    console.log('FORM INVALID');
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

  const payload = { email, password };
  console.log('REGISTER PAYLOAD:', payload);

  this.loading = true;

  this.authService.register(payload).subscribe({
    next: (res) => {
      console.log('REGISTER SUCCESS:', res);
      this.router.navigateByUrl('/login');
    },
    error: (err) => {
      console.log('REGISTER ERROR RAW:', err);
      this.error = JSON.stringify(err);
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
