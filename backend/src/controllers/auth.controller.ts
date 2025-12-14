import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { validationResult } from 'express-validator';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (error: any) {
    console.error('Registration error:', error);
    const statusCode = error.message.includes('already exists') ? 409 : 400;
    res.status(statusCode).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, token } = await authService.login(req.body);
    res.json({ user, token });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message });
  }
};

