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
}
