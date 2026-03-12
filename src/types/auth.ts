// types/auth.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type AccountProps = {
  user: any;
  initials: string;
  onLogout: () => void;
};

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
}