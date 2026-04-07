import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RecentMatch } from '../../models/recent-match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private http = inject(HttpClient);

  // API-Football
  private readonly baseUrl = 'https://v3.football.api-sports.io';
  private readonly apiKey = '39166d4ffe39eab34369b0a095254cf1';

  // Süper Lig için yaygın league id 203 olarak kullanılıyor.
  // Sezon olarak 2025, 2025/26 sezonunu temsil eder.
  private readonly superLigLeagueId = 203;
  private readonly season = 2024;

  getRecentSuperLigMatches(): Observable<RecentMatch[]> {
    const headers = new HttpHeaders({
      'x-apisports-key': this.apiKey
    });

    return this.http
      .get<any>(
        `${this.baseUrl}/fixtures?league=${this.superLigLeagueId}&season=${this.season}`,
        { headers }
      )
      .pipe(
        map((res) => {
          const items = res?.response ?? [];

          return items.map((item: any): RecentMatch => ({
            home: item?.teams?.home?.name ?? '-',
            away: item?.teams?.away?.name ?? '-',
            homeScore: item?.goals?.home ?? 0,
            awayScore: item?.goals?.away ?? 0,
            date: this.formatMatchDate(item?.fixture?.date),
            league: item?.league?.name ?? 'Süper Lig'
          }));
        })
      );
  }

  private formatMatchDate(dateStr: string | null | undefined): string {
    if (!dateStr) return '-';

    const d = new Date(dateStr);

    return d.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}
