// lib/roles.ts
import { AuthPayload, UserRole } from "./auth";
import { Types } from "mongoose";

interface PostLike {
  author: Types.ObjectId | string;
}

/* ---------------- ROLE CHECK ---------------- */

export function requireRole(
  user: AuthPayload | null,
  roles: UserRole[] = []
): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

/* -------- OWNER OR ADMIN CHECK (SECURE) ------ */

export function requireOwnerOrAdmin(
  user: AuthPayload,
  post: PostLike
): boolean {
  if (user.role === "admin") return true;

  return post.author.toString() === user.id;
}
