import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type IntervalKey = 'daily' | 'week' | '3m' | '6m' | '1y';

interface PlayerMock {
  id: number;
  name: string;
  team: string;
  position: string;
  nation: string;
  age: number;
  foot: 'Right' | 'Left' | 'Both';
  photoUrl: string;
  bio: string;
  lastValueM: number;
  trendDelta: number;
  community: {
    votes: number;
    avgVoteM: number;
    bullishPct: number;
    bearishPct: number;
  };
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent {
  player: PlayerMock = {
    id: 1,
    name: 'Lionel Messi',
    team: 'FanScore FC',
    position: 'RW',
    nation: 'TR',
    age: 20,
    foot: 'Left',
    photoUrl: '../../../assets/images/Ekran Alıntısı.PNG',
    bio:
      'Hızlı, agresif ve topu ayağına istediğinde oyun değişiyor. Topluluk oylamasında özellikle son 3 ayda ciddi yükseliş var.',
    lastValueM: 42,
    trendDelta: 8.4,
    community: {
      votes: 18324,
      avgVoteM: 48,
      bullishPct: 71,
      bearishPct: 29,
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

  get intervalVotes(): number {
    return this.votesByInterval[this.selectedInterval];
  }

  get intervalAvg(): number {
    return this.avgByInterval[this.selectedInterval];
  }

  get mood(): { bullish: number; bearish: number } {
    return this.moodByInterval[this.selectedInterval];
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
