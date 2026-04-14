export interface TournamentList {
  haliSahaId: number;
  name: string;
  description?: string | null;
  city: string;
  createdAt: string;

  price: number;
  teamSize: number;

  userId: number;
  userName?: string | null;
}

export interface TournamentDetail {
  haliSahaId: number;
  name: string;
  description?: string | null;
  city: string;
  createdAt: string;

  price: number;
  teamSize: number;

  userId: number;
  userName?: string | null;
  userProfilePic?: string | null;
  phoneNumber?: string | null;
}

export interface TournamentCreate {
  name: string;
  description?: string | null;
  city: string;

  price: number;
  teamSize: number;
}

export interface TournamentUpdate {
  name: string;
  description?: string | null;
  city: string;

  price: number;
  teamSize: number;
}

export interface ApiMessageResponse {
  message: string;
}
