// src/types/index.ts
export interface User {
  _id: string;
  username: string;
}

export interface Note {
  _id: string;
  title: string;
  body: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
