import { useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

const USER_KEY = "biteMeUser";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const nameInput = form.elements.namedItem("fullName") as HTMLInputElement | null;
    const email = emailInput?.value.trim() || "guest@biteme.com";
    const name =
      nameInput?.value.trim() || email.split("@")[0] || "Guest User";

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        name,
        email,
      })
    );
    window.dispatchEvent(new Event("authchange"));

    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect") || "/order-menu";
    window.location.href = redirect;
  };

  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <SiteNav />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                mode === "login" ? "bg-orange-500 text-white" : "bg-white/5 text-white/70"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                mode === "register" ? "bg-orange-500 text-white" : "bg-white/5 text-white/70"
              }`}
            >
              Register
            </button>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-white">
            {mode === "login" ? "Login to continue" : "Create your account"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/70">
            This is UI only. No database is needed. The form just lets the user continue to the cart.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === "register" && (
              <input
                name="fullName"
                type="text"
                placeholder="Full name"
                className="w-full rounded-2xl border border-white/10 bg-[#2c1f1c] px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-white/10 bg-[#2c1f1c] px-4 py-3 text-white outline-none placeholder:text-white/40"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-white/10 bg-[#2c1f1c] px-4 py-3 text-white outline-none placeholder:text-white/40"
            />

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              {mode === "login" ? "Login and Continue" : "Register and Continue"}
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
