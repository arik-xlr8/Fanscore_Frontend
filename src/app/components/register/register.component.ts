import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  baseUrl = "https://api.example.com";
  registerEndpoint = "/auth/register";

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  submit() {

    if (this.loading) return;

    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.error = "Şifreler uyuşmuyor";
      return;
    }

    const payload = {
      email,
      password
    };

    this.loading = true;

    this.http.post(`${this.baseUrl}${this.registerEndpoint}`, payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((e) => {
          if (e?.status === 409) this.error = "Email zaten kayıtlı";
          else if (e?.status === 0) this.error = "Sunucuya ulaşılamadı";
          else this.error = "Kayıt olurken hata oluştu";
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        if (!res) return;

        this.router.navigateByUrl('/login');
      });
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
}
