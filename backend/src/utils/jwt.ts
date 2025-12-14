import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

const secret: string = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const expiresIn: string = process.env.JWT_EXPIRES_IN || '24h';

export const generateToken = (payload: JwtPayload): string => {
  // @ts-ignore - jsonwebtoken types are strict but this works at runtime
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

