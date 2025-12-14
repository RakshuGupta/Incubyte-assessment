export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CreateSweetRequest {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface UpdateSweetRequest {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

