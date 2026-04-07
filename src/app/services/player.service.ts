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

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl);
  }

  getPlayerById(playerId: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/${playerId}`);
  }
}
