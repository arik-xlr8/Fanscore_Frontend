import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { City, TournamentCreate } from '../../../models/tournament';

@Component({
  selector: 'app-halisaha-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './halisaha-create.component.html',
  styleUrl: './halisaha-create.component.css'
})
export class HalisahaCreateComponent implements OnInit {
  private tournamentService = inject(TournamentService);

  cities: City[] = [];

  model: TournamentCreate = {
    name: '',
    description: '',
    cityId: 0,
    price: 0,
    teamSize: 10
  };

  loading = false;
  error: string | null = null;
  success: string | null = null;

  ngOnInit(): void {
    this.loadCities();
  }

  onSubmit(): void {
    if (!this.model.name || !this.model.cityId) {
      this.error = 'İsim ve şehir zorunlu';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.tournamentService.createTournament(this.model).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = 'Halısaha başarıyla oluşturuldu 🎉';
        console.log(res);

        this.model = {
          name: '',
          description: '',
          cityId: 0,
          price: 0,
          teamSize: 10
        };
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'Oluşturulamadı ❌';
      }
    });
  }

  private loadCities(): void {
    this.tournamentService.getAllCities().subscribe({
      next: (res) => {
        this.cities = res;
      },
      error: (err) => {
        console.error('Şehirler alınamadı:', err);
        this.cities = [];
      }
    });
  }
}
