import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TournamentList } from '../../../models/tournament';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-hali-saha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './hali-saha.component.html',
  styleUrl: './hali-saha.component.css'
})
export class HaliSahaComponent implements OnInit {
  private tournamentService = inject(TournamentService);

  query = '';
  sortBy: 'Önerilen' | 'Fiyat Artan' | 'Fiyat Azalan' = 'Önerilen';

  items: TournamentList[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.tournamentService.getAllTournaments().subscribe({
      next: (res) => {
        this.items = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Halı saha ilanları yüklenemedi.';
        this.isLoading = false;
      }
    });
  }

  trackByItemId = (_: number, item: TournamentList) => item.haliSahaId;

  get filteredItems(): TournamentList[] {
    const q = this.query.trim().toLowerCase();

    let list = this.items.filter(x => {
      const matchesQ =
        !q ||
        x.name.toLowerCase().includes(q) ||
        (x.city?.toLowerCase().includes(q) ?? false) ||
        (x.description?.toLowerCase().includes(q) ?? false) ||
        (x.userName?.toLowerCase().includes(q) ?? false) ||
        String(x.teamSize).includes(q);

      return matchesQ;
    });

    if (this.sortBy === 'Fiyat Artan') {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (this.sortBy === 'Fiyat Azalan') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }

  formatPrice(n: number): string {
    return new Intl.NumberFormat('tr-TR').format(n);
  }

  formatTeamSize(teamSize: number): string {
    return `${teamSize}v${teamSize}`;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
