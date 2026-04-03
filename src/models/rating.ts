export type RatingPeriodType = 'daily' | 'weekly' | 'monthly' | '3months' | '1year';
export type UserReactionType = 'like' | 'dislike' | 'none';

export interface CreateRatingRequest {
  playerId: number;
  periodType: RatingPeriodType;
  ratingValue: number;
  comment?: string | null;
}

export interface RatingResult {
  ratingId: number;
  userId: number;
  playerId: number;
  ratingValue: number;
  periodType: RatingPeriodType;
  comment: string | null;
  createdAt: string;
  expiresAt: string;
}

export interface VoteAvailability {
  canVote: boolean;
  periodType: RatingPeriodType;
  playerId: number;
  nextAvailableAt: string | null;
  message: string | null;
}

export interface PlayerComment {
  ratingId: number;
  userName: string;
  comment: string;
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
  userReaction?: UserReactionType;
  isReacting?: boolean;
}

export interface RatingReactionResult {
  ratingId: number;
  likeCount: number;
  dislikeCount: number;
  userReaction: UserReactionType;
}
