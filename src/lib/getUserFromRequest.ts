// lib/getUserFromRequest.ts
import { cookies } from "next/headers";
import { verifyToken, AuthPayload } from "./auth";

/**
 * Server-only helper
 * Use ONLY inside:
 * - API routes
 * - Server Components
 */
export function getUserFromCookies(): AuthPayload | null {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    return verifyToken(token);
  } catch {
    return null;
  }
}
