export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
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

export interface SearchQuery {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

