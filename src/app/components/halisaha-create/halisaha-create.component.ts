import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../services/tournament.service';
import { TournamentCreate } from '../../../models/tournament';

@Component({
  selector: 'app-halisaha-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './halisaha-create.component.html',
  styleUrl: './halisaha-create.component.css'
})
export class HalisahaCreateComponent {

  private tournamentService = inject(TournamentService);

  model: TournamentCreate = {
    name: '',
    description: '',
    city: '',
    price: 0,
    teamSize: 10
  };

  loading = false;
  error: string | null = null;
  success: string | null = null;

  onSubmit() {
    if (!this.model.name || !this.model.city) {
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

        // reset form
        this.model = {
          name: '',
          description: '',
          city: '',
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
}
