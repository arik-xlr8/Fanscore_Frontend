import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player, PlayerViewModel } from '../../../models/player';
import { filter, map, distinctUntilChanged, switchMap } from 'rxjs';

type IntervalKey = 'daily' | 'week' | '3m' | '6m' | '1y';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private playerService = inject(PlayerService);

  isLoading = false;
  error = '';

  player: PlayerViewModel = {
    id: 0,
    name: '',
    team: '-',
    position: '-',
    nation: 'TR',
    age: 0,
    foot: 'Right',
    photoUrl: '../../../assets/images/Ekran Alıntısı.PNG',
    bio: 'Oyuncu açıklaması daha sonra eklenecek.',
    lastValueM: 0,
    trendDelta: 0,
    community: {
      votes: 0,
      avgVoteM: 0,
      bullishPct: 0,
      bearishPct: 0,
    },
  };

  intervals: { key: IntervalKey; label: string }[] = [
    { key: 'daily', label: 'Günlük' },
    { key: 'week', label: '1 Hafta' },
    { key: '3m', label: '3 Ay' },
    { key: '6m', label: '6 Ay' },
    { key: '1y', label: '1 Yıl' },
  ];

  selectedInterval: IntervalKey = '3m';

  bubblesM: number[] = Array.from({ length: 20 }, (_, i) => 5 + i * 5);

  selectedBubbleM: number | null = 50;
  customValueM: number | null = null;

  votesByInterval: Record<IntervalKey, number> = {
    daily: 1240,
    week: 6150,
    '3m': 18324,
    '6m': 40211,
    '1y': 89210,
  };

  avgByInterval: Record<IntervalKey, number> = {
    daily: 47,
    week: 49,
    '3m': 48,
    '6m': 45,
    '1y': 39,
  };

  moodByInterval: Record<IntervalKey, { bullish: number; bearish: number }> = {
    daily: { bullish: 58, bearish: 42 },
    week: { bullish: 63, bearish: 37 },
    '3m': { bullish: 71, bearish: 29 },
    '6m': { bullish: 54, bearish: 46 },
    '1y': { bullish: 46, bearish: 54 },
  };

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        filter((id): id is string => !!id),
        map(id => Number(id)),
        filter(id => !isNaN(id)),
        distinctUntilChanged(),
        switchMap((playerId) => {
          this.isLoading = true;
          this.error = '';
          return this.playerService.getPlayerById(playerId);
        })
      )
      .subscribe({
        next: (player: Player) => {
          this.player = this.mapPlayerToViewModel(player);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Oyuncu getirilemedi:', err);
          this.error = 'Oyuncu bilgileri yüklenemedi.';
          this.isLoading = false;
        }
      });
  }

  get intervalVotes(): number {
    return this.votesByInterval[this.selectedInterval];
  }

  get intervalAvg(): number {
    return this.avgByInterval[this.selectedInterval];
  }

  get mood(): { bullish: number; bearish: number } {
    return this.moodByInterval[this.selectedInterval];
  }

  private mapPlayerToViewModel(player: Player): PlayerViewModel {
    return {
      id: player.playerId,
      name: `${player.name} ${player.surname}`,
      team: player.teamId != null ? `Team ${player.teamId}` : '-',
      position: player.position ?? '-',
      nation: 'TR',
      age: player.age ?? 0,
      foot: 'Right',
      photoUrl: player.ppUrl || '../../../assets/images/Ekran Alıntısı.PNG',
      bio: 'Oyuncu açıklaması daha sonra eklenecek.',
      lastValueM: 0,
      trendDelta: 0,
      community: {
        votes: 0,
        avgVoteM: 0,
        bullishPct: 0,
        bearishPct: 0,
      },
    };
  }

  selectInterval(k: IntervalKey) {
    this.selectedInterval = k;
  }

  pickBubble(v: number) {
    this.selectedBubbleM = v;
    this.customValueM = null;
  }

  useCustom() {
    this.selectedBubbleM = null;
  }

  submitVote() {
    const value = this.selectedBubbleM ?? this.customValueM;
    if (!value || value < 5 || value > 100) return;

    this.player.community.votes += 1;
  }

  getTrendClass(delta: number) {
    if (delta > 0) return 'pill pill--up';
    if (delta < 0) return 'pill pill--down';
    return 'pill';
  }

  clampCustom() {
    if (this.customValueM == null) return;
    if (this.customValueM < 5) this.customValueM = 5;
    if (this.customValueM > 100) this.customValueM = 100;
    const rounded = Math.round(this.customValueM / 5) * 5;
    this.customValueM = Math.min(100, Math.max(5, rounded));
  }
}
