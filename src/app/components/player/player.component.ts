import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs';

import { PlayerService } from '../../services/player.service';
import { Player } from '../../../models/player';

type PeriodKey = 'daily' | 'weekly' | 'monthly' | '3months' | '1year';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private playerService = inject(PlayerService);

  isLoading = false;
  error = '';

  player: Player | null = null;
  playerId: number | null = null;

  periods: { key: PeriodKey; label: string }[] = [
    { key: 'daily', label: 'Günlük' },
    { key: 'weekly', label: 'Haftalık' },
    { key: 'monthly', label: 'Aylık' },
    { key: '3months', label: '3 Ay' },
    { key: '1year', label: '1 Yıl' },
  ];

  selectedPeriod: PeriodKey = '3months';

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        filter((id): id is string => !!id),
        map(id => Number(id)),
        filter(id => !isNaN(id)),
        distinctUntilChanged()
      )
      .subscribe({
        next: (playerId: number) => {
          this.playerId = playerId;
          this.loadPlayer();
        },
        error: (err) => {
          console.error('Player route param okunamadı:', err);
          this.error = 'Oyuncu bilgileri yüklenemedi.';
        }
      });
  }

  selectPeriod(period: PeriodKey): void {
    if (this.selectedPeriod === period) return;
    this.selectedPeriod = period;
    this.loadPlayer();
  }

  private loadPlayer(): void {
    if (this.playerId == null) return;

    this.isLoading = true;
    this.error = '';

    this.playerService.getPlayerById(this.playerId, this.selectedPeriod).subscribe({
      next: (player: Player) => {
        this.player = player;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Oyuncu getirilemedi:', err);
        this.error = 'Oyuncu bilgileri yüklenemedi.';
        this.isLoading = false;
      }
    });
  }

  get fullName(): string {
    if (!this.player) return '';
    return `${this.player.name} ${this.player.surname}`.trim();
  }

  get teamName(): string {
    return this.player?.teamName ?? '-';
  }

  get position(): string {
    return this.player?.position ?? '-';
  }

  get age(): number {
    return this.player?.age ?? 0;
  }

  get photoUrl(): string {
    return this.player?.ppUrl || '../../../assets/images/Ekran Alıntısı.PNG';
  }

  get averageRating(): number {
    return this.player?.averageRating ?? 0;
  }

  get ratingCount(): number {
    return this.player?.ratingCount ?? 0;
  }

  get change(): number {
    return this.player?.change ?? 0;
  }

  formatAverageRating(value: number): string {
    return value.toFixed(1);
  }

  formatChange(value: number): string {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  }

  getChangeClass(value: number): string {
    if (value > 0) return 'pill pill--up';
    if (value < 0) return 'pill pill--down';
    return 'pill';
  }
}
