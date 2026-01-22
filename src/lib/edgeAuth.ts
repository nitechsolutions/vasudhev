// lib/edgeAuth.ts
import { AuthPayload } from "./auth";

/**
 * Edge-safe JWT decode (NO verification)
 */
export function decodeJwt(token: string): AuthPayload | null {
  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;

    const json = atob(base64Payload);
    return JSON.parse(json);
  } catch {
    return null;
  }
}
