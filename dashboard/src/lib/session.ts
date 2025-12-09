// src/lib/session.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  id: string;
  expiresAt: Date;
  role: "user" | "admin";
};

export async function createSession(id: string, role: "user" | "admin") {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ id, expiresAt, role });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function getSession() {
  const cookieStore = cookies();
  const session = (await cookieStore).get('session')?.value;

  if (!session) return null;

  try {
    const { payload } = await jwtVerify(
      session,
      encodedKey,
      { algorithms: ['HS256'] }
    );

    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}