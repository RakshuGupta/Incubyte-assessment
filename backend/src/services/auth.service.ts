import bcrypt from 'bcryptjs';
import { getDb } from '../config/database';
import { User, RegisterRequest, LoginRequest } from '../types';
import { generateToken } from '../utils/jwt';

export class AuthService {
  async register(data: RegisterRequest): Promise<{ user: Omit<User, 'password_hash'>; token: string }> {
    const { username, email, password } = data;
    const db = await getDb();

    // Check if user already exists
    const existingUser = await db.get(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const result = await db.run(
      `INSERT INTO users (username, email, password_hash, role) 
       VALUES (?, ?, ?, 'user')`,
      [username, email, password_hash]
    );
    
    const userId = result.lastID as number;

    // Get the inserted user
    const user = await db.get(
      'SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    ) as Omit<User, 'password_hash'>;

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  async login(data: LoginRequest): Promise<{ user: Omit<User, 'password_hash'>; token: string }> {
    const { email, password } = data;
    const db = await getDb();

    // Find user
    const user = await db.get(
      'SELECT id, username, email, password_hash, role, created_at, updated_at FROM users WHERE email = ?',
      [email]
    ) as User | undefined;

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const { password_hash, ...userWithoutPassword } = user;
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: userWithoutPassword, token };
  }
}
