export interface Player {
  playerId: number;
  name: string;
  surname: string;
  teamId: number | null;
  teamName: string | null;
  age: number | null;
  position: string | null;
  ppUrl: string | null;
  averageRating: number | null;
  ratingCount: number;
  change: number | null;
}

export interface PlayerRating {
  ratingId: number;
  userId: number;
  ratingValue: number;
  comment: string | null;
  createdAt: string;
  periodType: string;
}

export interface PlayerDetail {
  playerId: number;
  name: string;
  surname: string;
  teamId: number | null;
  teamName: string | null;
  age: number | null;
  position: string | null;
  ppUrl: string | null;
  averageRating: number | null;
  ratingCount: number;
  ratings: PlayerRating[];
}
