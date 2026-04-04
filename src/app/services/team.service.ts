import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team, TeamDetail } from '../../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'http://localhost:5153/api/Team';

  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl);
  }

  getTeamDetail(teamId: number, periodType: string): Observable<TeamDetail> {
    return this.http.get<TeamDetail>(
      `${this.baseUrl}/${teamId}/detail?periodType=${periodType}`
    );
  }
}
