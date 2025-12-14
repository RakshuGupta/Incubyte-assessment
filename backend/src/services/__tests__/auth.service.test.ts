import { AuthService } from '../auth.service';
import { db } from '../../config/database';

// Mock the database
jest.mock('../../config/database', () => ({
  db: {
    prepare: jest.fn(),
  },
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockPrepare = jest.fn();
      const mockGet = jest.fn().mockReturnValue(undefined); // No existing user
      const mockRun = jest.fn().mockReturnValue({ lastInsertRowid: 1 });
      const mockGetUser = jest.fn().mockReturnValue(mockUser);

      (db.prepare as jest.Mock)
        .mockReturnValueOnce({ get: mockGet }) // Check existing user
        .mockReturnValueOnce({ run: mockRun }) // Insert user
        .mockReturnValueOnce({ get: mockGetUser }); // Get inserted user

      const result = await authService.register({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.user).toMatchObject({
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
      });
      expect(result.token).toBeDefined();
    });

    it('should throw error if user already exists', async () => {
      const mockGet = jest.fn().mockReturnValue({ id: 1 });

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      await expect(
        authService.register({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('User with this email or username already exists');
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password_hash: '$2a$10$hashedpassword',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const bcrypt = require('bcryptjs');
      const mockHash = await bcrypt.hash('password123', 10);
      const userWithHash = { ...mockUser, password_hash: mockHash };

      const mockGet = jest.fn().mockReturnValue(userWithHash);

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.user.email).toBe('test@example.com');
      expect(result.token).toBeDefined();
      expect(result.user).not.toHaveProperty('password_hash');
    });

    it('should throw error for invalid email', async () => {
      const mockGet = jest.fn().mockReturnValue(undefined);

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      await expect(
        authService.login({
          email: 'wrong@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw error for invalid password', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password_hash: '$2a$10$hashedpassword',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockGet = jest.fn().mockReturnValue(mockUser);

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
      ).rejects.toThrow('Invalid email or password');
    });
  });
});
