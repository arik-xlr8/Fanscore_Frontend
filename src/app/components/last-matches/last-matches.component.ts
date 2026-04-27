import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { RecentMatch } from '../../../models/recent-match';

@Component({
  selector: 'app-last-matches',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './last-matches.component.html',
  styleUrl: './last-matches.component.css'
})
export class LastMatchesComponent implements OnInit {
  private matchService = inject(MatchService);

  recentMatches: RecentMatch[] = [];

  ngOnInit(): void {
    this.getRecentMatches();
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
}
