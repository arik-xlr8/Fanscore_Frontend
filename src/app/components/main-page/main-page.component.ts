import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../../models/player';
import { MatchService } from '../../services/match.service';
import { RecentMatch } from '../../../models/recent-match';

type HeatmapPlayer = {
  id: number;
  name: string;
  team: string;
  position: string;
  value: number;
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

  recentMatches : RecentMatch[] = [];

  selectedPlayer: HeatmapPlayer | null = null;

  isLoading = false;
  isEnd = false;

  ngOnInit(): void {
    this.getPlayers();
    this.getRecentMatches();
  }

  trackById = (_: number, p: HeatmapPlayer) => p.id;

  selectPlayer(player: HeatmapPlayer): void {
    this.selectedPlayer = player;
  }

  onHeatmapScroll(_e: Event): void {
    // Şimdilik backend'den hepsini tek seferde çekiyoruz.
    // HTML bozulmasın diye methodu bırakıyoruz.
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

    this.playerService.getAllPlayers().subscribe({
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
      team: player.teamId != null ? `Team ${player.teamId}` : 'No Team',
      position: player.position ?? '-',
      value: player.age ?? 0,
      change: 0
    };
  }

  getColor(change: number): string {
    const c = this.clamp(change, -10, 10);
    const t = (c + 10) / 20;
    const hue = 0 + t * 120;
    return `hsl(${hue} 78% 38%)`;
  }

  getSizeByChange(change: number) {
    const abs = Math.abs(change);

    if (abs >= 6) return { col: 3, row: 22 };
    if (abs >= 4) return { col: 3, row: 18 };
    if (abs >= 2) return { col: 2, row: 14 };
    return { col: 2, row: 10 };
  }

  formatChange(change: number): string {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  }

  private clamp(n: number, a: number, b: number): number {
    return Math.max(a, Math.min(b, n));
  }
}
