
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@/lib/firebase";

export default function SignupPage() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateAccount(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (
      !fullName.trim() ||
      !dob ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all the required details.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(credential.user, {
        displayName: fullName.trim(),
      });

      localStorage.setItem(
        "maternovaSignup",
        JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          dob,
        })
      );

      localStorage.setItem("maternovaAuthenticated", "true");

      localStorage.setItem(
        "maternovaProfile",
        JSON.stringify({
          id: credential.user.uid,
          name: fullName.trim(),
          email: email.trim(),
          authProvider: "firebase-email",
        })
      );

      setShowWelcome(true);

      window.setTimeout(() => {
        window.location.href = "/signup/pregnancy";
      }, 900);
    } catch (err) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String(err.code)
          : "";

      setError(
        code === "auth/email-already-in-use"
          ? "An account already exists with this email. Try signing in instead."
          : err instanceof Error
            ? err.message
            : "Something went wrong while creating your account."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fff9fb] text-[#172b4d]">
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#ffe1eb] opacity-60 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-[#ffdce8] opacity-60 blur-3xl" />

        <div className="flower flower-1">✿</div>
        <div className="flower flower-2">✿</div>
        <div className="flower flower-3">✿</div>
        <div className="sparkle sparkle-1">✦</div>
        <div className="sparkle sparkle-2">✧</div>
        <div className="heart heart-1">♡</div>
        <div className="heart heart-2">♡</div>
      </div>

      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f7b5c8] to-[#e889a5] text-xl text-white shadow-[0_8px_20px_rgba(214,83,122,0.18)]">
            ✦
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#d6537a]" />
          </div>

          <div>
            <h1 className="text-[21px] font-bold tracking-tight">
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

      <section className="relative z-10 mx-auto flex w-full max-w-[1250px] items-center px-5 pb-10 pt-3 sm:px-10 lg:min-h-[calc(100vh-90px)] lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative hidden min-h-[600px] items-center justify-center lg:flex">
            <MotherBabySignupIllustration />
          </div>

          <div className="mx-auto w-full max-w-[560px] animate-page-enter lg:mr-0">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f1bfd0] bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6537a]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6537a]">
                Step 1 of 2
              </span>
            </div>

            <h2 className="text-[42px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[50px]">
              Let&apos;s get to
              <br />
              <span className="text-[#c94770]">know you.</span>
            </h2>

            <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#627592]">
              Tell us a little about yourself so Maternova can make your
              pregnancy journey feel more personal.
            </p>

            <div className="mt-7 rounded-[28px] border border-[#f0dbe2] bg-white p-6 shadow-[0_22px_55px_rgba(54,40,50,0.08)] sm:p-8">
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-xs font-bold text-[#405572]"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dob"
                    className="mb-2 block text-xs font-bold text-[#405572]"
                  >
                    Date of birth
                  </label>
                  <input
                    id="dob"
                    type="date"
                    autoComplete="bday"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />
                </div>

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
                    className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-bold text-[#405572]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-xs font-bold text-[#405572]"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your password again"
                    className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-2xl border border-[#f3d2d9] bg-[#fff6f8] px-3 py-3 text-xs leading-5 text-[#af4767]"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl bg-[#172f55] text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#203b67] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Creating account..." : "Continue"}
                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </form>
            </div>

            <p className="mt-5 text-center text-[10px] leading-5 text-[#a0a9b8]">
              Your information helps personalize your Maternova experience.
            </p>

            <p className="mt-4 text-center text-sm text-[#8994a8]">
              Already have an account?{" "}
              <Link
                href="/"
                className="font-bold text-[#d6537a] hover:text-[#b83f67]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>

      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fff9fb]/95 backdrop-blur-md">
          <div className="animate-welcome text-center">
            <div className="relative mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-[#fff0f4] shadow-[0_0_70px_rgba(232,137,165,0.45)]">
              <span className="text-5xl">💗</span>
              <span className="absolute -right-2 top-2 animate-ping text-2xl text-[#d6537a]">
                ✦
              </span>
            </div>
            <h2 className="text-4xl font-bold">Welcome to Maternova.</h2>
            <p className="mt-4 text-lg text-[#c94770]">
              Let&apos;s take this journey together. ♡
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }

        @keyframes page-enter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes welcome {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-page-enter {
          animation: page-enter 0.7s ease-out both;
        }

        .animate-welcome {
          animation: welcome 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .flower,
        .sparkle,
        .heart {
          position: absolute;
          pointer-events: none;
        }

        .flower {
          color: #e889a5;
          font-size: 24px;
          animation: float 6s ease-in-out infinite;
        }

        .sparkle {
          color: #d6537a;
          font-size: 22px;
          animation: float 4s ease-in-out infinite;
        }

        .heart {
          color: #e889a5;
          font-size: 25px;
          animation: float 5s ease-in-out infinite;
        }

        .flower-1 {
          left: 8%;
          top: 28%;
        }

        .flower-2 {
          left: 42%;
          top: 14%;
          animation-delay: 1s;
        }

        .flower-3 {
          right: 8%;
          bottom: 20%;
          animation-delay: 2s;
        }

        .sparkle-1 {
          left: 48%;
          top: 35%;
        }

        .sparkle-2 {
          right: 16%;
          top: 22%;
          animation-delay: 1.5s;
        }

        .heart-1 {
          left: 17%;
          bottom: 25%;
        }

        .heart-2 {
          right: 12%;
          top: 42%;
          animation-delay: 2s;
        }

        @media (prefers-reduced-motion: reduce) {
          .flower,
          .sparkle,
          .heart,
          .animate-page-enter,
          .animate-welcome,
          .signup-illustration,
          .signup-heart {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

function MotherBabySignupIllustration() {
  return (
    <div className="signup-illustration relative h-[560px] w-[490px] max-w-full">
      <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe0eb] opacity-70 blur-[60px]" />

      <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#efbfd0] bg-gradient-to-br from-white via-[#fff1f6] to-[#ffe3ec] shadow-[0_20px_60px_rgba(214,83,122,0.08)]" />

      <svg
        viewBox="0 0 500 560"
        role="img"
        aria-label="A mother with closed eyes smiling while cuddling her baby"
        className="absolute left-1/2 top-1/2 h-[550px] w-[490px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
      >
        <defs>
          <linearGradient id="signupSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe1cf" />
            <stop offset="100%" stopColor="#efb99f" />
          </linearGradient>

          <linearGradient id="signupBabySkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe5d4" />
            <stop offset="100%" stopColor="#efbea4" />
          </linearGradient>

          <linearGradient id="signupDress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ee86a5" />
            <stop offset="100%" stopColor="#c84770" />
          </linearGradient>

          <linearGradient id="signupBlanket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fffaf5" />
            <stop offset="100%" stopColor="#f3d5df" />
          </linearGradient>

          <filter id="signupShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="9"
              floodColor="#9e4d6a"
              floodOpacity=".15"
            />
          </filter>
        </defs>

        {/* Mother's hair */}
        <path
          d="M143 210 C120 157 133 91 178 61 C218 32 277 43 304 83 C332 125 315 187 290 221 L264 259 L163 246 Z"
          fill="#46313e"
          filter="url(#signupShadow)"
        />

        <path
          d="M163 132 C164 86 199 63 233 68 C265 72 285 95 287 125 C262 106 238 111 218 129 C198 145 180 147 163 132Z"
          fill="#563944"
        />

        {/* Neck */}
        <path
          d="M198 213 L198 251 Q222 276 250 250 L247 211Z"
          fill="url(#signupSkin)"
        />

        {/* Mother's dress and shoulders */}
        <path
          d="M160 246 C128 261 110 297 111 352 L119 447 Q218 495 325 449 L334 353 C336 300 305 263 271 246 L247 265 Q222 287 198 264Z"
          fill="url(#signupDress)"
          filter="url(#signupShadow)"
        />

        <path
          d="M184 253 Q221 293 261 253 L279 274 Q222 320 166 274Z"
          fill="#f8c5d5"
        />

        {/* Mother's face */}
        <path
          d="M160 132 C160 99 188 79 224 81 C260 82 282 106 280 143 L274 183 C269 213 246 232 221 231 C195 230 174 210 168 181Z"
          fill="url(#signupSkin)"
        />

        {/* Hair framing her face */}
        <path
          d="M159 143 C152 104 182 74 220 75 C251 76 276 94 287 124 C262 112 241 115 219 132 C200 146 177 151 159 143Z"
          fill="#46313e"
        />

        <path
          d="M159 143 C151 172 165 203 183 216 C168 184 173 162 176 148Z"
          fill="#46313e"
        />

        <path
          d="M276 139 C291 166 281 201 262 218 C275 188 270 164 266 149Z"
          fill="#46313e"
        />

        {/* Mother's closed eyes, rosy cheeks and smile */}
        <path
          d="M184 160 Q196 172 208 160 M232 160 Q244 172 256 160"
          fill="none"
          stroke="#4a3640"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <ellipse cx="184" cy="179" rx="11" ry="6" fill="#f5aab8" opacity=".65" />
        <ellipse cx="257" cy="179" rx="11" ry="6" fill="#f5aab8" opacity=".65" />

        <path
          d="M207 190 Q220 204 234 190"
          fill="none"
          stroke="#b95d70"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Baby's body */}
        <path
          d="M224 323 C211 294 227 268 254 261 C285 253 316 276 320 307 C326 342 306 379 277 401 L235 383 C219 367 216 344 224 323Z"
          fill="url(#signupBlanket)"
          stroke="#edcbd6"
          strokeWidth="2"
          filter="url(#signupShadow)"
        />

        {/* Baby's cap */}
        <path
          d="M236 302 C230 276 247 255 272 257 C295 259 309 279 304 304 L294 317 L241 315Z"
          fill="#e9a5bc"
        />

        <path
          d="M238 293 Q272 275 304 294"
          fill="none"
          stroke="#f9dce6"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <circle cx="272" cy="264" r="5" fill="#f8dce5" />

        {/* Baby's face */}
        <path
          d="M239 306 C240 286 254 278 272 280 C291 282 302 298 298 319 L292 340 C287 357 275 365 262 360 C247 355 240 339 239 322Z"
          fill="url(#signupBabySkin)"
        />

        {/* Baby's closed eyes and smile */}
        <path
          d="M248 315 Q256 323 263 315 M273 315 Q281 323 289 315"
          fill="none"
          stroke="#754b53"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <ellipse cx="249" cy="330" rx="8" ry="5" fill="#e98c9c" opacity=".5" />
        <ellipse cx="289" cy="330" rx="8" ry="5" fill="#e98c9c" opacity=".5" />

        <path
          d="M261 335 Q269 344 277 335"
          fill="none"
          stroke="#bd6974"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Baby's blanket */}
        <path
          d="M227 348 C245 367 281 376 301 351 C326 367 328 398 307 416 C284 437 242 429 222 408 C207 391 211 365 227 348Z"
          fill="url(#signupBlanket)"
          stroke="#edcbd6"
          strokeWidth="2"
        />

        <path
          d="M222 383 Q268 410 314 382"
          fill="none"
          stroke="#e8c3ce"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Mother's arm wraps around the baby */}
        <path
          d="M131 311 C147 284 168 284 184 306 C200 329 211 356 235 372 C260 389 286 380 303 364 C315 354 328 362 324 376 C317 401 286 418 256 416 C219 414 192 389 172 366 C157 349 145 350 136 370Z"
          fill="url(#signupSkin)"
          stroke="#e8aa91"
          strokeWidth="1.5"
        />

        <path
          d="M291 366 C301 356 313 358 319 367 C325 377 315 388 304 390 C294 391 284 380 291 366Z"
          fill="#f4c3a8"
        />

        <path
          d="M299 374 Q305 379 311 373"
          fill="none"
          stroke="#d9947e"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Floating heart */}
        <path
          d="M345 233 C345 224 357 222 362 231 C367 222 379 224 379 233 C379 243 362 252 362 252 C362 252 345 243 345 233Z"
          fill="#e889a5"
          className="signup-heart"
        />

        <ellipse cx="231" cy="466" rx="115" ry="12" fill="#d88aa3" opacity=".15" />
      </svg>

      <div className="absolute bottom-[22px] right-0 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-xs font-semibold text-[#52627c]">
          Made for motherhood
        </p>
        <p className="mt-1 text-[10px] text-[#a1aabd]">
          Care for you and your little one
        </p>
      </div>

      <style jsx>{`
        .signup-illustration {
          animation: signup-float 5.5s ease-in-out infinite;
        }

        .signup-heart {
          transform-box: fill-box;
          transform-origin: center;
          animation: signup-pulse 2.5s ease-in-out infinite;
        }

        @keyframes signup-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes signup-pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(0.94);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .signup-illustration,
          .signup-heart {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
