import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { City, TournamentList, TournamentUpdate } from '../../../models/tournament';
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
  cities: City[] = [];

  isLoading = false;
  errorMessage = '';
  showOnlyMine = false;

  isEditOpen = false;
  editingId: number | null = null;

  editModel: TournamentUpdate = {
    name: '',
    description: '',
    cityId: 0,
    price: 0,
    teamSize: 1
  };

  ngOnInit(): void {
    this.loadTournaments();
    this.loadCities();
  }

  toggleMyTournaments(): void {
    this.showOnlyMine = !this.showOnlyMine;
    this.showOnlyMine ? this.loadMyTournaments() : this.loadTournaments();
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

  loadMyTournaments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.tournamentService.getMyTournaments().subscribe({
      next: (res) => {
        this.items = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Kendi halı saha ilanların yüklenemedi. Giriş yapmış olman gerekebilir.';
        this.isLoading = false;
        this.showOnlyMine = false;
      }
    });
  }

  openEdit(item: TournamentList, event: MouseEvent): void {
    event.stopPropagation();

    this.editingId = item.haliSahaId;

    this.editModel = {
      name: item.name,
      description: item.description ?? '',
      cityId: item.cityId,
      price: item.price,
      teamSize: item.teamSize
    };

    this.isEditOpen = true;
  }

  closeEdit(): void {
    this.isEditOpen = false;
    this.editingId = null;
  }

  submitEdit(): void {
    if (!this.editingId) return;

    this.tournamentService.updateTournament(this.editingId, this.editModel).subscribe({
      next: () => {
        this.closeEdit();
        this.showOnlyMine ? this.loadMyTournaments() : this.loadTournaments();
      },
      error: (err) => {
        console.error(err);
        alert('Halı saha ilanı güncellenemedi.');
      }
    });
  }

  deleteTournament(item: TournamentList, event: MouseEvent): void {
    event.stopPropagation();

    const confirmed = confirm(`"${item.name}" ilanını silmek istediğine emin misin?`);
    if (!confirmed) return;

    this.tournamentService.deleteTournament(item.haliSahaId).subscribe({
      next: () => {
        this.items = this.items.filter(x => x.haliSahaId !== item.haliSahaId);
      },
      error: (err) => {
        console.error(err);
        alert('Halı saha ilanı silinemedi.');
      }
    });
  }

  private loadCities(): void {
    this.tournamentService.getAllCities().subscribe({
      next: (res) => this.cities = res,
      error: () => this.cities = []
    });
  }

  trackByItemId = (_: number, item: TournamentList) => item.haliSahaId;

  get filteredItems(): TournamentList[] {
    const q = this.query.trim().toLowerCase();

    let list = this.items.filter(x => {
      return !q ||
        x.name.toLowerCase().includes(q) ||
        (x.cityName?.toLowerCase().includes(q) ?? false) ||
        (x.description?.toLowerCase().includes(q) ?? false) ||
        (x.userName?.toLowerCase().includes(q) ?? false) ||
        String(x.teamSize).includes(q);
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
