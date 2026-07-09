import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/**
 * Auth.js v5 — login Google + email (magic link).
 * PrismaAdapter dipasang agar user/akun/verification-token persisten di DB
 * (dibutuhkan oleh provider email) dan User.id konsisten dipakai di Order.userId,
 * meski sesi tetap JWT (adapter tak memaksa strategi "database").
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/masuk", verifyRequest: "/masuk/cek-email" },
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        session.user.role = adminEmails.includes(
          (session.user.email ?? "").toLowerCase(),
        )
          ? "admin"
          : "user";
      }
      return session;
    },
  },
});
