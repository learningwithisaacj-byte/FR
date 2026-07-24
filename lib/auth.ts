// /lib/auth.ts

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "fr_admin_token";
const TOKEN_TTL = "8h";

export interface AdminTokenPayload extends JWTPayload {
  sub: string;
  email: string;
  role: "SUPER_ADMIN" | "EVENT_TEAM";
}

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(
  payload: Omit<AdminTokenPayload, "iat" | "exp">
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(getSecretKey());
}

export async function verifyAdminToken(
  token: string
): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as AdminTokenPayload;
  } catch {
    return null;
  }
}

/**
 * Reads and verifies the admin JWT from the request cookie.
 * Returns null if missing or invalid — callers decide how to respond.
 */
export async function getAdminFromRequest(
  request: NextRequest
): Promise<AdminTokenPayload | null> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifyAdminToken(token);
}