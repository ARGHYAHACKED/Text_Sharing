export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface TextShare {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}