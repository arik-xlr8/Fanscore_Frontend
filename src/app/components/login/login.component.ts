import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: number;
    email: string;
    role?: string;
    name?: string;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  baseUrl = 'https://api.example.com';
  loginEndpoint = '/auth/login';

  loading = false;
  error: string | null = null;
  showPassword = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [true],
  });

  constructor() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.loading) return;

    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.loading = true;

    this.http.post<LoginResponse>(`${this.baseUrl}${this.loginEndpoint}`, payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((e) => {
          const status = e?.status;
          if (status === 401) this.error = 'Email veya şifre hatalı';
          else if (status === 0) this.error = 'Sunucuya ulaşılamadı';
          else this.error = 'Giriş yapılırken bir hata oluştu';
          return of(null);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        if (!res) return;

        const remember = !!this.form.value.rememberMe;

        if (remember) {
          localStorage.setItem('accessToken', res.accessToken);
          if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
          if (res.user) localStorage.setItem('user', JSON.stringify(res.user));
        } else {
          sessionStorage.setItem('accessToken', res.accessToken);
          if (res.refreshToken) sessionStorage.setItem('refreshToken', res.refreshToken);
          if (res.user) sessionStorage.setItem('user', JSON.stringify(res.user));
        }

        this.router.navigateByUrl('/');
      });
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }

  goReset() {
    this.router.navigateByUrl('/reset-password');
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
