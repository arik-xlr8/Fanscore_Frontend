import { Component, OnInit } from '@angular/core';
import { Team } from '../../../models/team';
import { TeamService } from '../../services/team.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  loading = true;

  constructor(
    private teamService: TeamService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Takımlar alınamadı:', err);
        this.loading = false;
      },
    });
  }

  goToTeamDetail(teamId: number): void {
    this.router.navigate(['/teams', teamId]);
  }
}
