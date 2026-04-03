import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CreateRatingRequest,
  RatingResult,
  VoteAvailability,
  RatingPeriodType,
  PlayerComment,
  RatingReactionResult
} from '../../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:5153/api/Rating';

  createRating(payload: CreateRatingRequest): Observable<RatingResult> {
    return this.http.post<RatingResult>(this.baseUrl, payload);
  }

  checkCanVote(playerId: number, periodType: RatingPeriodType): Observable<VoteAvailability> {
    const params = new HttpParams()
      .set('playerId', playerId)
      .set('periodType', periodType);

    return this.http.get<VoteAvailability>(`${this.baseUrl}/can-vote`, { params });
  }

   getPlayerComments(playerId: number): Observable<PlayerComment[]> {
    return this.http.get<PlayerComment[]>(`${this.baseUrl}/comments/${playerId}`);
  }

  likeComment(ratingId: number): Observable<RatingReactionResult> {
    return this.http.post<RatingReactionResult>(`${this.baseUrl}/${ratingId}/like`, {});
  }

  dislikeComment(ratingId: number): Observable<RatingReactionResult> {
    return this.http.post<RatingReactionResult>(`${this.baseUrl}/${ratingId}/dislike`, {});
  }
}
