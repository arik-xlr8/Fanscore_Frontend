import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5153/api/Player';

  getAllPlayers(periodType?: string) {
    let url = this.baseUrl;

    if (periodType) {
      url += `?periodType=${periodType}`;
    }

    return this.http.get<Player[]>(url);
  }

  getPlayerById(playerId: number, periodType?: string) {
    let url = `${this.baseUrl}/${playerId}`;

    if (periodType) {
      url += `?periodType=${periodType}`;
    }

    return this.http.get<Player>(url);
  }

  getShuffledPlayers(periodType?: string) {
    return this.http.get<Player[]>(`${this.baseUrl}/shuffle`, {
      params: periodType ? { periodType } : {}
    });
  }

  searchPlayers(searchTerm?: string, periodType?: string) {
    const params: Record<string, string> = {};

    if (searchTerm) params['searchTerm'] = searchTerm;
    if (periodType) params['periodType'] = periodType;

    return this.http.get<Player[]>(`${this.baseUrl}/search`, { params });
  }
}
