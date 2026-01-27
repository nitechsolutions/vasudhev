// lib/getUserFromRequest.ts
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import type { AuthPayload } from "./auth";

/**
 * Server-only helper
 * Use ONLY inside:
 * - API routes
 * - Server Components
 */
export async function getUserFromCookies(): Promise<AuthPayload | null> {
  try {
    const cookieStore = await cookies(); // ❌ DO NOT await
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    return verifyToken(token); // ✅ returns AuthPayload
  } catch {
    return null;
  }
}
