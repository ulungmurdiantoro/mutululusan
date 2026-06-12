import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/**
 * Auth.js v5 — login Google.
 * Untuk sekarang memakai sesi JWT (belum butuh database), sehingga login bisa
 * langsung diuji. Saat Postgres siap, tambahkan Prisma adapter + email magic
 * link sesuai blueprint Fase 5 (lib/orders.ts juga dimigrasikan ke DB).
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [Google],
  session: { strategy: "jwt" },
  pages: { signIn: "/masuk" },
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
