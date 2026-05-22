export type UserRole = "USER" | "ADMIN";

export type AuthUser = {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};