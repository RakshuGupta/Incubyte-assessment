import request from 'supertest';
import express from 'express';
import cors from 'cors';
import authRoutes from '../../routes/auth.routes';
import { db } from '../../config/database';

// Mock database
jest.mock('../../config/database', () => ({
  db: {
    prepare: jest.fn(),
  },
  initDatabase: jest.fn(),
}));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockGet = jest.fn().mockReturnValue(undefined); // No existing user
      const mockRun = jest.fn().mockReturnValue({ lastInsertRowid: 1 });
      const mockGetUser = jest.fn().mockReturnValue(mockUser);

      (db.prepare as jest.Mock)
        .mockReturnValueOnce({ get: mockGet }) // Check existing
        .mockReturnValueOnce({ run: mockRun }) // Insert
        .mockReturnValueOnce({ get: mockGetUser }); // Get user

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('token');
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'ab',
          email: 'invalid-email',
          password: '123',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('password123', 10);

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password_hash: hashedPassword,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockGet = jest.fn().mockReturnValue(mockUser);

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const mockGet = jest.fn().mockReturnValue(undefined);

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
