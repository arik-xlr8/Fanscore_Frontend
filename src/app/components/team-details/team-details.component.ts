import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TeamDetail } from '../../../models/team';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  teamId!: number;
  teamDetail?: TeamDetail;
  loading = true;

  periods = [
    { label: 'Günlük', value: 'daily' },
    { label: 'Haftalık', value: 'weekly' },
    { label: 'Aylık', value: 'monthly' },
    { label: '3 Aylık', value: '3months' },
    { label: 'Yıllık', value: 'yearly' },
  ];

  selectedPeriod = 'daily';

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('teamid');
    if (id) {
      this.teamId = +id;
      this.loadTeamDetail();
    }
  }

  loadTeamDetail(): void {
    this.loading = true;

    this.teamService.getTeamDetail(this.teamId, this.selectedPeriod).subscribe({
      next: (data: TeamDetail) => {
        this.teamDetail = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  changePeriod(period: string): void {
    if (this.selectedPeriod === period) return;
    this.selectedPeriod = period;
    this.loadTeamDetail();
  }
}
