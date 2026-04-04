export interface Team {
  teamId: number;
  teamName: string;
  ppUrl?: string | null;
}

export interface TeamPlayerDetail {
  playerId: number;
  fullName: string;
  position?: string | null;
  ppUrl?: string | null;
  ratingValue: number;
}

export interface TeamDetail {
  teamId: number;
  teamName: string;
  ppUrl?: string | null;
  selectedPeriod: string;
  teamTotalValue: number;
  players: TeamPlayerDetail[];
}
