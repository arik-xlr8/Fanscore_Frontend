import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Profile,
  UpdateProfileRequest,
  UploadProfilePhotoResult
} from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5153/api/Profile';

  getMyProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/me`);
  }

  updateMyProfile(payload: UpdateProfileRequest): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/me`, payload);
  }

  uploadPhoto(file: File): Observable<UploadProfilePhotoResult> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadProfilePhotoResult>(`${this.baseUrl}/upload-photo`, formData);
  }
}
