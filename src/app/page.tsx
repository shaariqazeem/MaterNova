"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@/lib/firebase";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("maternovaAuthenticated", "true");
      localStorage.setItem(
        "maternovaProfile",
        JSON.stringify({
          id: userCredential.user.uid,
          name: userCredential.user.displayName || "User",
          email: userCredential.user.email || email,
          authProvider: "firebase-email",
        })
      );

      window.location.href = "/dashboard";
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Something went wrong while signing in."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem("maternovaAuthenticated", "true");
      localStorage.setItem(
        "maternovaProfile",
        JSON.stringify({
          id: user.uid,
          name: user.displayName || "Google User",
          email: user.email || "",
          authProvider: "firebase-google",
        })
      );

      window.location.href = "/dashboard";
    } catch (googleError) {
      const message =
        googleError instanceof Error
          ? googleError.message
          : "Google sign-in is unavailable.";
      setError(message);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff9fb] text-[#172b4d]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#ffe5ed] opacity-50 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#ffdce8] opacity-45 blur-3xl" />
        <div className="absolute left-[34%] top-[15%] h-2 w-2 rounded-full bg-[#ee9ab5] opacity-70" />
        <div className="absolute right-[18%] top-[22%] h-3 w-3 rounded-full bg-[#f2b1c5] opacity-70" />
        <div className="absolute bottom-[20%] left-[8%] h-2 w-2 rounded-full bg-[#d6537a] opacity-50" />
      </div>

      <header className="relative z-20 flex items-center justify-between px-7 py-5 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f7b5c8] to-[#e889a5] text-xl text-white shadow-[0_8px_20px_rgba(214,83,122,0.18)]">
            ✦
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#d6537a]" />
          </div>

          <div>
            <h1 className="text-[21px] font-bold tracking-tight text-[#172b4d]">
              Maternova
            </h1>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#a26b7e]">
              Pregnancy companion
            </p>
          </div>
        </Link>

        <div className="hidden text-right sm:block">
          <p className="text-xs text-[#8a96aa]">Your journey, supported.</p>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-[1250px] items-center px-6 pb-10 pt-2 sm:px-10 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative hidden min-h-[680px] items-center justify-center lg:flex">
            <MotherBabyIllustration />
            <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm font-semibold text-[#52627c]">A little more care, every day.</p>
              <p className="mt-1 text-xs text-[#a1aabd]">Supporting two hearts, one journey.</p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[520px] lg:mr-0">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f1bfd0] bg-white px-4 py-2 shadow-[0_4px_15px_rgba(214,83,122,0.07)]">
              <span className="h-2 w-2 rounded-full bg-[#df6c91]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6537a]">
                Welcome back
              </span>
            </div>

            <h2 className="text-[46px] font-bold leading-[1.03] tracking-[-0.035em] text-[#172b4d] sm:text-[56px]">
              Welcome to
              <br />
              <span className="text-[#c94770]">your Maternova</span>
              <br />
              journey.
            </h2>

            <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-[#627592]">
              Sign in to continue your pregnancy journey and keep your guidance, nutrition, and care information together.
            </p>

            <div className="mt-8 rounded-[28px] border border-[#f0dbe2] bg-white p-7 shadow-[0_22px_55px_rgba(54,40,50,0.08)] sm:p-8">
              <form onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold text-[#405572]">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-4 text-sm text-[#172b4d] outline-none transition placeholder:text-[#b7bfcc] focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-bold text-[#405572]">
                      Password
                    </label>
                    <button type="button" className="text-xs font-bold text-[#d6537a] transition hover:text-[#b83f67]">
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-4 pr-14 text-sm text-[#172b4d] outline-none transition placeholder:text-[#b7bfcc] focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#9aa4b5] hover:text-[#d6537a]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 rounded-xl border border-[#f4d5dc] bg-[#fff6f8] px-3 py-2 text-xs text-[#b33d5a]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex h-[53px] w-full items-center justify-center gap-3 rounded-2xl bg-[#172f55] text-sm font-bold text-white shadow-[0_12px_24px_rgba(23,47,85,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203b67] hover:shadow-[0_15px_28px_rgba(23,47,85,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                  <span className="text-lg">→</span>
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#eee5e9]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a7afbd]">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-[#eee5e9]" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl border border-[#eadde2] bg-white text-sm font-bold text-[#405572] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e3b7c7] hover:bg-[#fff9fb] hover:shadow-[0_8px_20px_rgba(214,83,122,0.07)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e8e3e6] bg-white text-sm font-bold text-[#4285f4]">
                  G
                </span>
                Continue with Google
              </button>

              <div className="mt-7 border-t border-[#eee5e9] pt-6 text-center">
                <p className="text-sm text-[#8994a8]">New to Maternova?</p>
                <Link
                  href="/signup"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#d6537a] transition hover:text-[#b83f67]"
                >
                  Create an account
                  <span>→</span>
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] leading-5 text-[#a0a9b8]">
              Maternova supports your journey — your healthcare professional remains your source of medical care.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function MotherBabyIllustration() {
  return (
    <div className="relative h-[570px] w-[500px]">
      <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffdce8] opacity-70 blur-[65px]" />
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 shadow-[0_0_60px_rgba(214,83,122,0.15)]" />
      <div className="absolute left-[50%] top-[55%] h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7b5c8] opacity-70" />
      <div className="absolute left-[38%] top-[40%] h-[130px] w-[90px] rounded-[40%] bg-[#f5c5aa] shadow-[0_12px_30px_rgba(234,168,137,0.35)]" />
      <div className="absolute left-[55%] top-[42%] h-[120px] w-[88px] rounded-[40%] bg-[#f4c9b1] shadow-[0_12px_30px_rgba(234,168,137,0.35)]" />
      <div className="absolute left-[42%] top-[60%] h-[120px] w-[160px] rounded-[30%] bg-[#d6537a]" />
      <div className="absolute left-[45%] top-[65%] h-[90px] w-[70px] rounded-[40%] bg-[#f7d7df]" />
      <div className="absolute left-[57%] top-[64%] h-[90px] w-[70px] rounded-[40%] bg-[#f7d7df]" />
    </div>
  );
}