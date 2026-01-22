// src/types/user.ts

export type UserRole = "reader" | "writer" | "admin";

export interface User {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  message: string;
  user: User;
}
