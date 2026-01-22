// lib/auth.ts
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

/* ----------------------------------
   TYPES
----------------------------------- */

export type UserRole = "reader" | "writer" | "admin";

export interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

/* ----------------------------------
   PASSWORD HELPERS
----------------------------------- */

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

/* ----------------------------------
   JWT HELPERS (Node runtime)
----------------------------------- */

export function signToken(payload: AuthPayload): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthPayload {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.verify(token, process.env.JWT_SECRET) as AuthPayload;
}

/* ----------------------------------
   AUTH HEADER TOKEN
----------------------------------- */

export function getAuthToken(req: Request): string | null {
  const header = req.headers.get("authorization") ?? "";
  const [type, token] = header.split(" ");

  if (type === "Bearer" && token) {
    return token;
  }

  return null;
}
