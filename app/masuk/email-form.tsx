import { signIn } from "@/auth";

export function EmailForm({ callbackUrl }: { callbackUrl: string }) {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const email = String(formData.get("email") ?? "").trim();
        if (!email) return;
        await signIn("resend", { email, redirectTo: callbackUrl });
      }}
      className="mt-4 flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="nama@email.com"
        autoComplete="email"
        className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500"
      />
      <button type="submit" className="btn-primary shrink-0">
        Kirim link masuk
      </button>
    </form>
  );
}
