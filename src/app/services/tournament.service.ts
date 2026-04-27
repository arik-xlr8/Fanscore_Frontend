import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TournamentCreate,
  TournamentDetail,
  TournamentList,
  TournamentUpdate,
  ApiMessageResponse,
  City
} from '../../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:5153/api/Tournament';
  private readonly cityUrl = 'http://localhost:5153/api/City';

  getAllTournaments(): Observable<TournamentList[]> {
    return this.http.get<TournamentList[]>(this.baseUrl);
  }

  getTournamentById(id: number): Observable<TournamentDetail> {
    return this.http.get<TournamentDetail>(`${this.baseUrl}/${id}`);
  }

  createTournament(dto: TournamentCreate): Observable<TournamentDetail> {
    return this.http.post<TournamentDetail>(this.baseUrl, dto);
  }

  updateTournament(id: number, dto: TournamentUpdate): Observable<ApiMessageResponse> {
    return this.http.put<ApiMessageResponse>(`${this.baseUrl}/${id}`, dto);
  }

  deleteTournament(id: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.baseUrl}/${id}`);
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.cityUrl);
  }

  getMyTournaments(): Observable<TournamentList[]> {
    return this.http.get<TournamentList[]>(`${this.baseUrl}/my-tournaments`);
  }
}
