export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface MeResponse {
  userId: number;
  email: string;
  role: string;
  isVerified: boolean;
  name?: string | null;
  surname?: string | null;
  profilePic?: string | null;
}
