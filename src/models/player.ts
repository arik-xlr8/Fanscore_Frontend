export interface Player {
  playerId: number;
  name: string;
  surname: string;
  teamId: number | null;
  age: number | null;
  position: string | null;
  ppUrl: string | null;
}

export type FootType = 'Right' | 'Left' | 'Both';

export interface PlayerCommunity {
  votes: number;
  avgVoteM: number;
  bullishPct: number;
  bearishPct: number;
}

export interface PlayerViewModel {
  id: number;
  name: string;
  team: string;
  position: string;
  nation: string;
  age: number;
  foot: FootType;
  photoUrl: string;
  bio: string;
  lastValueM: number;
  trendDelta: number;
  community: PlayerCommunity;
}
