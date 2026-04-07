import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Profile, MyRecentRating } from '../../../models/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  isLoading = false;
  isSaving = false;
  isUploading = false;
  error = '';
  success = '';

  profile: Profile | null = null;
  recentRatings: MyRecentRating[] = [];

  form = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    userName: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.profileService.getMyProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.recentRatings = profile.recentRatings ?? [];

        this.form.patchValue({
          name: profile.name ?? '',
          surname: profile.surname ?? '',
          userName: profile.userName ?? ''
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Profil alınamadı:', err);
        this.error = 'Profil bilgileri yüklenemedi.';
        this.isLoading = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.error = '';
    this.success = '';

    this.profileService.updateMyProfile({
      name: this.form.value.name ?? '',
      surname: this.form.value.surname ?? '',
      userName: this.form.value.userName ?? '',
      profilePic: this.profile?.profilePic ?? null
    }).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.recentRatings = profile.recentRatings ?? [];
        this.success = 'Profil başarıyla güncellendi.';
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Profil güncellenemedi:', err);
        this.error = err?.error?.message ?? 'Profil güncellenemedi.';
        this.isSaving = false;
      }
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.isUploading = true;
    this.error = '';
    this.success = '';

    this.profileService.uploadPhoto(file).subscribe({
      next: (result) => {
        if (this.profile) {
          this.profile.profilePic = result.url;
        }
        this.success = 'Profil fotoğrafı yüklendi.';
        this.isUploading = false;
      },
      error: (err) => {
        console.error('Fotoğraf yüklenemedi:', err);
        this.error = err?.error?.message ?? 'Fotoğraf yüklenemedi.';
        this.isUploading = false;
      }
    });
  }

  get profilePic(): string {
    return this.profile?.profilePic || '../../../assets/images/Ekran Alıntısı.PNG';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('tr-TR');
  }
}
