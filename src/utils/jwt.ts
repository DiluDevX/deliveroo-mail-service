import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function verifyToken<T extends JwtPayload>(token: string): T {
  return jwt.verify(token, config.jwt.secret) as T;
}

export function decodeToken<T extends JwtPayload>(token: string): T | null {
  return jwt.decode(token) as T | null;
}
