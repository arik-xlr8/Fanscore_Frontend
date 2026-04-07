import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { AuthResponse, LoginRequest } from '../../../models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submit(): void {
    if (this.loading) return;

    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? ''
    };

    this.loading = true;

    this.authService.login(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((e) => {
          if (e?.status === 401) {
            this.error = 'Email veya şifre hatalı';
          } else if (e?.status === 0) {
            this.error = 'Sunucuya ulaşılamadı';
          } else {
            this.error = 'Giriş yapılırken hata oluştu';
          }
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res: AuthResponse | null) => {
        if (!res) return;

        if (res.accessToken) {
          this.authService.getMe().subscribe({
            next: () => {
              this.router.navigateByUrl('/');
            },
            error: () => {
              this.router.navigateByUrl('/');
            }
          });
        } else {
          // email doğrulanmamış veya başka durum
          this.error = res.message || 'Giriş yapılırken bir hata oluştu';
        }
      });
  }

  goRegister(): void {
    this.router.navigateByUrl('/register');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
