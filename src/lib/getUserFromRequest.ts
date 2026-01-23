// lib/getUserFromRequest.ts


/**
 * Server-only helper
 * Use ONLY inside:
 * - API routes
 * - Server Components
 */
// src/lib/getUserFromRequest.ts
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import type {  AuthResponse } from "@/types/user";

export async function getUserFromCookies(): Promise<AuthResponse | null> {
  try {
    const cookieStore = await cookies(); // ✅ MUST await
    const token = cookieStore.get("token")?.value;

    console.log(token);
    

    if (!token) return null;

    return verifyToken(token);
  } catch {
    return null;
  }
}
