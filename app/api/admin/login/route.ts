import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "mtl_admin";

export async function POST(request: Request) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN belum dikonfigurasi di server." },
      { status: 503 },
    );
  }

  let body: { token?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  if (body.token !== adminToken) {
    return NextResponse.json({ error: "Token salah." }, { status: 401 });
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
