export interface MyRecentRating {
  ratingId: number;
  playerId: number;
  playerName: string;
  playerPhoto?: string | null;
  ratingValue: number;
  comment?: string | null;
  periodType: string;
  createdAt: string;
}

export interface Profile {
  userId: number;
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  profilePic?: string | null;
  recentRatings: MyRecentRating[];
}

export interface UpdateProfileRequest {
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  profilePic?: string | null;
}

export interface UploadProfilePhotoResult {
  url: string;
}
