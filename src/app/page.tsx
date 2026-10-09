
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function saveUserSession(
    user: { uid: string; displayName: string | null; email: string | null },
    provider: string
  ) {
    localStorage.setItem("maternovaAuthenticated", "true");
    localStorage.setItem(
      "maternovaProfile",
      JSON.stringify({
        id: user.uid,
        name: user.displayName || "User",
        email: user.email || email,
        authProvider: provider,
      })
    );
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      saveUserSession(result.user, "firebase-email");
      window.location.href = "/dashboard";
    } catch (err) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String(err.code)
          : "";

      if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found"
      ) {
        setError("Incorrect email or password. Please try again.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a little before trying again.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while signing in."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setSuccess("");
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      saveUserSession(result.user, "firebase-google");
      window.location.href = "/dashboard";
    } catch (err) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String(err.code)
          : "";

      if (code === "auth/popup-closed-by-user") {
        setError("The Google sign-in window was closed. Please try again.");
      } else if (code === "auth/popup-blocked") {
        setError("Your browser blocked the Google popup. Allow popups and try again.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Google sign-in is unavailable."
        );
      }
    } finally {
      setIsGoogleLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Enter your email address first, then select Forgot password.");
      return;
    }

    setIsResettingPassword(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccess(
        "If an account exists for this email, a password-reset link has been sent."
      );
    } catch (err) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String(err.code)
          : "";

      if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to send the reset email. Please try again."
        );
      }
    } finally {
      setIsResettingPassword(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff9fb] text-[#172b4d]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#ffe5ed] opacity-60 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#ffdce8] opacity-50 blur-3xl" />
        <div className="absolute left-[34%] top-[15%] h-2 w-2 rounded-full bg-[#ee9ab5] opacity-70" />
        <div className="absolute right-[18%] top-[22%] h-3 w-3 rounded-full bg-[#f2b1c5] opacity-70" />
        <div className="absolute bottom-[20%] left-[8%] h-2 w-2 rounded-full bg-[#d6537a] opacity-50" />
      </div>

      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
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

        <p className="hidden text-xs text-[#8a96aa] sm:block">
          Your journey, supported.
        </p>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-[1250px] items-center px-5 pb-10 pt-2 sm:px-10 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative hidden min-h-[680px] items-center justify-center lg:flex">
            <MotherBabyIllustration />

            <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm font-semibold text-[#52627c]">
                A little more care, every day.
              </p>
              <p className="mt-1 text-xs text-[#a1aabd]">
                Supporting two hearts, one journey.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[520px] lg:mr-0">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f1bfd0] bg-white px-4 py-2 shadow-[0_4px_15px_rgba(214,83,122,0.07)]">
              <span className="h-2 w-2 rounded-full bg-[#df6c91]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6537a]">
                Welcome back
              </span>
            </div>

            <h2 className="text-[42px] font-bold leading-[1.04] tracking-[-0.035em] text-[#172b4d] sm:text-[56px]">
              Welcome to
              <br />
              <span className="text-[#c94770]">your Maternova</span>
              <br />
              journey.
            </h2>

            <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#627592]">
              Sign in to continue your pregnancy journey and keep your
              guidance, nutrition, and care information together.
            </p>

            <div className="mt-7 rounded-[28px] border border-[#f0dbe2] bg-white p-6 shadow-[0_22px_55px_rgba(54,40,50,0.08)] sm:p-8">
              <form onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold text-[#405572]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-4 text-sm text-[#172b4d] outline-none transition placeholder:text-[#b7bfcc] focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-xs font-bold text-[#405572]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={isResettingPassword}
                      className="text-xs font-bold text-[#d6537a] transition hover:text-[#b83f67] disabled:opacity-60"
                    >
                      {isResettingPassword
                        ? "Sending link..."
                        : "Forgot password?"}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-4 pr-16 text-sm text-[#172b4d] outline-none transition placeholder:text-[#b7bfcc] focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#9aa4b5] hover:text-[#d6537a]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-[#f4d5dc] bg-[#fff6f8] px-3 py-3 text-xs leading-5 text-[#b33d5a]"
                  >
                    {error}
                  </p>
                )}

                {success && (
                  <p
                    role="status"
                    className="mt-4 rounded-xl border border-[#d5eadc] bg-[#f4fbf6] px-3 py-3 text-xs leading-5 text-[#287348]"
                  >
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isGoogleLoading}
                  className="mt-6 flex h-[53px] w-full items-center justify-center gap-3 rounded-2xl bg-[#172f55] text-sm font-bold text-white shadow-[0_12px_24px_rgba(23,47,85,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203b67] hover:shadow-[0_15px_28px_rgba(23,47,85,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                  {!isSubmitting && <span className="text-lg">→</span>}
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
                disabled={isGoogleLoading || isSubmitting}
                className="flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl border border-[#eadde2] bg-white text-sm font-bold text-[#405572] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e3b7c7] hover:bg-[#fff9fb] hover:shadow-[0_8px_20px_rgba(214,83,122,0.07)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e8e3e6] bg-white text-sm font-bold text-[#4285f4]">
                  G
                </span>
                {isGoogleLoading
                  ? "Connecting to Google..."
                  : "Continue with Google"}
              </button>

              <div className="mt-7 border-t border-[#eee5e9] pt-6 text-center">
                <p className="text-sm text-[#8994a8]">New to Maternova?</p>
                <Link
                  href="/signup"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#d6537a] transition hover:text-[#b83f67]"
                >
                  Create an account <span>→</span>
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] leading-5 text-[#a0a9b8]">
              Maternova supports your journey — your healthcare professional
              remains your source of medical care.
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes maternova-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes maternova-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.035); }
        }

        @keyframes maternova-sparkle {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        .maternova-float {
          animation: maternova-float 5s ease-in-out infinite;
        }

        .maternova-breathe {
          transform-box: fill-box;
          transform-origin: center;
          animation: maternova-breathe 6s ease-in-out infinite;
        }

        .maternova-sparkle {
          transform-box: fill-box;
          transform-origin: center;
          animation: maternova-sparkle 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .maternova-float,
          .maternova-breathe,
          .maternova-sparkle {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

function MotherBabyIllustration() {
  return (
    <div className="maternova-float relative h-[570px] w-[500px] max-w-full">
      <svg
        viewBox="0 0 500 570"
        role="img"
        aria-label="A smiling mother with closed eyes gently hugging her baby"
        className="h-full w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="softHalo" cx="50%" cy="48%" r="55%">
            <stop offset="0%" stopColor="#fff0f5" />
            <stop offset="72%" stopColor="#ffe0ea" />
            <stop offset="100%" stopColor="#fff9fb" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="motherDress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e982a2" />
            <stop offset="100%" stopColor="#c94770" />
          </linearGradient>

          <linearGradient id="skinTone" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffddc7" />
            <stop offset="100%" stopColor="#edb294" />
          </linearGradient>

          <linearGradient id="babySkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe6d4" />
            <stop offset="100%" stopColor="#f3c3a7" />
          </linearGradient>

          <linearGradient id="babyBlanket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff8f2" />
            <stop offset="100%" stopColor="#f6dce3" />
          </linearGradient>

          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="12"
              floodColor="#b85a78"
              floodOpacity="0.13"
            />
          </filter>
        </defs>

        <circle cx="250" cy="278" r="225" fill="url(#softHalo)" />

        <circle
          cx="250"
          cy="280"
          r="166"
          fill="#fff"
          fillOpacity="0.42"
          stroke="#f8d6e1"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          className="maternova-breathe"
        />

        <g className="maternova-sparkle" fill="#e78aa5">
          <path d="M104 153 L109 166 L122 171 L109 176 L104 189 L99 176 L86 171 L99 166 Z" />
          <path d="M391 199 L395 209 L405 213 L395 217 L391 227 L387 217 L377 213 L387 209 Z" />
        </g>

        <g fill="#f0b4c7">
          <circle cx="120" cy="258" r="4" />
          <circle cx="382" cy="300" r="5" />
          <circle cx="361" cy="143" r="3" />
          <circle cx="146" cy="370" r="3.5" />
        </g>

        {/* Flowers */}
        <g transform="translate(112 329)" opacity="0.85">
          <g fill="#f1b5c9">
            <ellipse cx="0" cy="-10" rx="6" ry="11" />
            <ellipse cx="10" cy="0" rx="6" ry="11" transform="rotate(90 10 0)" />
            <ellipse cx="0" cy="10" rx="6" ry="11" />
            <ellipse cx="-10" cy="0" rx="6" ry="11" transform="rotate(90 -10 0)" />
          </g>
          <circle r="5" fill="#e9b56d" />
          <path d="M0 15 Q-3 29 2 38" fill="none" stroke="#91b69c" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 26 Q-15 18 -15 29 Q-6 34 0 26" fill="#a7c8ad" />
        </g>

        <g transform="translate(388 365) scale(.8)" opacity="0.8">
          <g fill="#f5c6d5">
            <ellipse cx="0" cy="-10" rx="6" ry="11" />
            <ellipse cx="10" cy="0" rx="6" ry="11" transform="rotate(90 10 0)" />
            <ellipse cx="0" cy="10" rx="6" ry="11" />
            <ellipse cx="-10" cy="0" rx="6" ry="11" transform="rotate(90 -10 0)" />
          </g>
          <circle r="5" fill="#e9b56d" />
          <path d="M0 15 Q-3 29 2 38" fill="none" stroke="#91b69c" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 26 Q-15 18 -15 29 Q-6 34 0 26" fill="#a7c8ad" />
        </g>

        {/* Mother's hair behind her head */}
        <g filter="url(#softShadow)">
          <path
            d="M165 251 C144 206 160 150 202 128 C231 111 278 119 304 143 C337 173 339 221 321 268 L301 327 L179 316 Z"
            fill="#49323b"
          />
          <path
            d="M185 183 C174 144 207 118 244 121 C278 123 301 149 304 180 C287 162 264 157 243 161 C221 165 207 181 185 183 Z"
            fill="#5b3b43"
          />
        </g>

        {/* Mother's neck */}
        <path
          d="M224 267 L224 310 Q249 334 275 306 L269 265 Z"
          fill="url(#skinTone)"
        />

        {/* Mother's dress */}
        <path
          d="M179 300 C145 316 127 357 133 412 L145 477 Q247 519 350 476 L362 402 C365 356 335 319 293 302 L269 324 Q246 347 224 322 Z"
          fill="url(#motherDress)"
          filter="url(#softShadow)"
        />

        <path
          d="M207 310 Q246 355 284 310 L300 331 Q249 382 191 331 Z"
          fill="#f8c4d4"
          opacity="0.92"
        />

        {/* Mother's face */}
        <path
          d="M183 190 C183 157 207 143 246 143 C286 143 307 169 303 207 L297 245 C292 277 269 295 245 295 C220 295 196 276 190 246 Z"
          fill="url(#skinTone)"
        />

        {/* Hairline and side locks */}
        <path
          d="M181 210 C172 176 188 143 218 131 C249 119 285 134 302 163 C309 179 308 197 303 211 C292 189 278 174 257 166 C234 183 211 192 181 193 Z"
          fill="#49323b"
        />
        <path
          d="M183 195 C169 223 183 258 199 275 C187 246 194 222 196 206 Z"
          fill="#49323b"
        />
        <path
          d="M298 194 C313 218 302 255 286 273 C296 244 291 222 288 207 Z"
          fill="#49323b"
        />

        {/* Mother's closed eyes */}
        <path
          d="M207 218 Q218 229 230 218"
          fill="none"
          stroke="#62404a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M260 218 Q272 229 284 218"
          fill="none"
          stroke="#62404a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Mother's blush and smile */}
        <ellipse cx="205" cy="240" rx="13" ry="7" fill="#e88f9c" opacity="0.35" />
        <ellipse cx="285" cy="240" rx="13" ry="7" fill="#e88f9c" opacity="0.35" />
        <path
          d="M235 245 Q247 256 259 245"
          fill="none"
          stroke="#b85d6c"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Baby's blanket behind the face */}
        <path
          d="M195 346 C190 317 207 293 234 285 C264 276 295 293 307 321 C324 357 303 400 274 420 L210 402 C192 389 188 367 195 346 Z"
          fill="url(#babyBlanket)"
          filter="url(#softShadow)"
        />

        {/* Baby's cap */}
        <path
          d="M210 322 C205 294 222 274 247 273 C271 273 289 291 288 316 L280 329 L216 331 Z"
          fill="#e9a5bc"
        />
        <path
          d="M212 312 Q246 294 286 313"
          fill="none"
          stroke="#f9dce6"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="248" cy="280" r="5" fill="#f8dce5" />

        {/* Baby's face */}
        <path
          d="M214 319 C216 298 231 289 249 291 C270 293 283 309 280 332 L274 353 C269 371 257 381 244 377 C227 373 217 355 214 339 Z"
          fill="url(#babySkin)"
        />

        {/* Baby's closed eyes */}
        <path
          d="M225 329 Q233 337 241 329"
          fill="none"
          stroke="#754b53"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M252 329 Q260 337 268 329"
          fill="none"
          stroke="#754b53"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Baby's cheeks and smile */}
        <ellipse cx="225" cy="345" rx="8" ry="5" fill="#e98c9c" opacity="0.48" />
        <ellipse cx="269" cy="345" rx="8" ry="5" fill="#e98c9c" opacity="0.48" />
        <path
          d="M239 348 Q247 356 255 348"
          fill="none"
          stroke="#bd6974"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Baby wrapped in a blanket */}
        <path
          d="M207 363 C224 380 257 389 277 364 C299 378 307 402 292 423 C274 446 226 442 204 419 C189 402 191 380 207 363 Z"
          fill="#fff7f2"
          stroke="#f0d2d9"
          strokeWidth="2"
        />
        <path
          d="M203 393 Q246 420 295 393"
          fill="none"
          stroke="#e8c3ce"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Mother's arm embracing the baby */}
        <path
          d="M157 357 C167 330 185 324 203 341 C217 354 225 375 244 387 C266 402 290 396 305 379 C315 368 326 373 326 386 C326 408 298 426 271 430 C235 435 207 412 186 389 C172 375 162 377 157 391 Z"
          fill="url(#skinTone)"
          stroke="#e8aa91"
          strokeWidth="1.5"
        />

        {/* Mother's hand */}
        <path
          d="M294 379 C302 371 313 372 319 380 C325 389 317 400 306 403 C296 405 285 396 294 379 Z"
          fill="#f4c3a8"
        />
        <path
          d="M301 387 Q307 391 312 386"
          fill="none"
          stroke="#d9947e"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Floating heart */}
        <path
          d="M350 256 C350 248 361 245 366 254 C371 245 382 248 382 256 C382 266 366 275 366 275 C366 275 350 266 350 256 Z"
          fill="#e889a5"
          opacity="0.9"
          className="maternova-sparkle"
        />

        <ellipse cx="250" cy="493" rx="116" ry="12" fill="#d88aa3" opacity="0.12" />
      </svg>

      <div className="absolute bottom-[34px] right-[6px] rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-[0_10px_35px_rgba(125,64,87,0.10)] backdrop-blur-sm">
        <p className="text-xs font-semibold text-[#52627c]">
          Made for motherhood
        </p>
        <p className="mt-1 text-[10px] text-[#a1aabd]">
          Care for you and your little one
        </p>
      </div>
    </div>
  );
}
