import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../../models/player';
import { MatchService } from '../../services/match.service';
import { RecentMatch } from '../../../models/recent-match';

type PeriodKey = 'daily' | 'weekly' | 'monthly' | '3months' | '1year';

type HeatmapPlayer = {
  id: number;
  name: string;
  team: string;
  position: string;
  averageRating: number;
  ratingCount: number;
  change: number;
};

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  private playerService = inject(PlayerService);
  private matchService = inject(MatchService);

  players: HeatmapPlayer[] = [];
  recentMatches: RecentMatch[] = [];
  selectedPlayer: HeatmapPlayer | null = null;

  isLoading = false;
  isEnd = false;

  periods: { key: PeriodKey; label: string }[] = [
    { key: 'daily', label: 'Günlük' },
    { key: 'weekly', label: 'Haftalık' },
    { key: 'monthly', label: 'Aylık' },
    { key: '3months', label: '3 Ay' },
    { key: '1year', label: '1 Yıl' }
  ];

  selectedPeriod: PeriodKey = 'monthly';

  ngOnInit(): void {
    this.getPlayers();
    this.getRecentMatches();
  }

  trackById = (_: number, p: HeatmapPlayer) => p.id;

  selectPlayer(player: HeatmapPlayer): void {
    this.selectedPlayer = player;
  }

  selectPeriod(period: PeriodKey): void {
    if (this.selectedPeriod === period) return;
    this.selectedPeriod = period;
    this.getPlayers();
  }

  onHeatmapScroll(_e: Event): void {
    // Şimdilik backend'den hepsini tek seferde çekiyoruz.
  }

  private getRecentMatches(): void {
    this.matchService.getRecentSuperLigMatches().subscribe({
      next: (matches: RecentMatch[]) => {
        this.recentMatches = matches;
      },
      error: (err) => {
        console.error('Süper Lig maçları alınamadı:', err);
        this.recentMatches = [];
      }
    });
  }

  private getPlayers(): void {
    this.isLoading = true;
    this.isEnd = false;

    this.playerService.getAllPlayers(this.selectedPeriod).subscribe({
      next: (players: Player[]) => {
        this.players = players.map((player) => this.mapToHeatmapPlayer(player));
        this.isLoading = false;
        this.isEnd = true;
      },
      error: (err) => {
        console.error('Oyuncular alınamadı:', err);
        this.players = [];
        this.isLoading = false;
        this.isEnd = true;
      }
    });
  }

  private mapToHeatmapPlayer(player: Player): HeatmapPlayer {
    return {
      id: player.playerId,
      name: `${player.name} ${player.surname}`,
      team: player.teamName ?? '-',
      position: player.position ?? '-',
      averageRating: player.averageRating ?? 0,
      ratingCount: player.ratingCount ?? 0,
      change: player.change ?? 0
    };
  }

  getColor(averageRating: number): string {
    const rating = this.clamp(averageRating, 0, 10);
    const t = rating / 10;
    const hue = 0 + t * 120;
    return `hsl(${hue} 78% 38%)`;
  }

  getSizeByChange(change: number) {
    const abs = Math.abs(change);

    if (abs >= 50) return { col: 3, row: 22 };
    if (abs >= 30) return { col: 3, row: 18 };
    if (abs >= 15) return { col: 2, row: 14 };
    return { col: 2, row: 10 };
  }

  formatAverageRating(averageRating: number): string {
    return averageRating.toFixed(1);
  }

  formatChange(change: number): string {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  }

  getChangeClass(change: number): string {
    if (change > 0) return 'badge badge--up';
    if (change < 0) return 'badge badge--down';
    return 'badge';
  }

  private clamp(n: number, a: number, b: number): number {
    return Math.max(a, Math.min(b, n));
  }
}
