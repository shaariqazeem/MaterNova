"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [showWelcome, setShowWelcome] = useState(false);

  function handleCreateAccount() {
    setShowWelcome(true);

    setTimeout(() => {
      window.location.href = "/signup/pregnancy";
    }, 900);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff9fb] text-[#172b4d]">

      {/* =========================================================
          BACKGROUND ANIMATION
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

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

      {/* =========================================================
          HEADER
      ========================================================= */}

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

        <p className="hidden text-xs text-[#8a96aa] sm:block">
          Your journey, supported.
        </p>

      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-[1250px] items-center px-6 pb-10 pt-3 sm:px-10 lg:px-12">

        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* =====================================================
              LEFT — MOTHER + BABY
          ===================================================== */}

          <div className="relative hidden min-h-[650px] items-center justify-center lg:flex">

            <MotherBabySignupIllustration />

          </div>

          {/* =====================================================
              RIGHT — FORM
          ===================================================== */}

          <div className="mx-auto w-full max-w-[560px] animate-page-enter lg:mr-0">

            {/* STEP */}

            <div className="mb-5 flex items-center gap-3">

              <div className="flex items-center gap-2 rounded-full border border-[#f1bfd0] bg-white px-4 py-2 shadow-[0_4px_15px_rgba(214,83,122,0.07)]">

                <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6537a]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6537a]">
                  Step 1 of 2
                </span>

              </div>

            </div>

            {/* HEADING */}

            <h2 className="text-[42px] font-bold leading-[1.05] tracking-[-0.035em] text-[#172b4d] sm:text-[50px]">

              Let's get to

              <br />

              <span className="text-[#c94770]">
                know you.
              </span>

            </h2>

            <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#627592]">
              Tell us a little about yourself so Maternova can make your
              pregnancy journey feel more personal.
            </p>

            {/* FORM CARD */}

            <div className="mt-7 rounded-[28px] border border-[#f0dbe2] bg-white p-6 shadow-[0_22px_55px_rgba(54,40,50,0.08)] sm:p-8">

              <div className="space-y-5">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-[#405572]">
                    Full name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="h-[52px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />

                </div>

                {/* DOB */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-[#405572]">
                    Date of birth
                  </label>

                  <input
                    type="date"
                    className="h-[52px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-[#405572]">
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-[52px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />

                </div>

                {/* PASSWORD */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-[#405572]">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type="password"
                      placeholder="Create a password"
                      className="h-[52px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 pr-16 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8994a8]">
                      Show
                    </span>

                  </div>

                </div>

                {/* CONFIRM */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-[#405572]">
                    Confirm password
                  </label>

                  <div className="relative">

                    <input
                      type="password"
                      placeholder="Enter your password again"
                      className="h-[52px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 pr-16 text-sm outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8994a8]">
                      Show
                    </span>

                  </div>

                </div>

                {/* CONTINUE */}

                <button
                  onClick={handleCreateAccount}
                  className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl bg-[#172f55] text-sm font-bold text-white shadow-[0_12px_24px_rgba(23,47,85,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#203b67] hover:shadow-[0_18px_30px_rgba(23,47,85,0.25)]"
                >

                  Continue

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </button>

              </div>

            </div>

            <p className="mt-5 text-center text-[10px] leading-5 text-[#a0a9b8]">
              Your information helps personalize your Maternova experience.
            </p>

          </div>

        </div>

      </section>

      {/* =========================================================
          WELCOME TRANSITION
      ========================================================= */}

      {showWelcome && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fff9fb]/95 backdrop-blur-md">

          <div className="animate-welcome text-center">

            <div className="relative mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-[#fff0f4] shadow-[0_0_70px_rgba(232,137,165,0.45)]">

              <span className="text-5xl">
                💗
              </span>

              <span className="absolute -right-2 top-2 text-2xl text-[#d6537a] animate-ping">
                ✦
              </span>

            </div>

            <h2 className="text-4xl font-bold text-[#172b4d]">
              Welcome to Maternova.
            </h2>

            <p className="mt-4 text-lg text-[#c94770]">
              Let's take this journey together. ♡
            </p>

          </div>

        </div>

      )}

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style jsx global>{`

        @keyframes float {

          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-16px) rotate(5deg);
          }

        }

        @keyframes pulse-soft {

          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.04);
          }

        }

        @keyframes page-enter {

          from {
            opacity: 0;
            transform: translateY(25px);
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
          animation: page-enter 0.8s ease-out both;
        }

        .animate-welcome {
          animation: welcome 0.8s cubic-bezier(.2,.8,.2,1) both;
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

      `}</style>

    </main>
  );
}


/* ================================================================
   MOTHER + BABY
================================================================ */

function MotherBabySignupIllustration() {
  return (
    <div className="relative h-[560px] w-[490px]">

      <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe0eb] opacity-60 blur-[60px]" />

      <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#efbfd0] bg-gradient-to-br from-white via-[#fff1f6] to-[#ffe3ec]" />

      <svg
        viewBox="0 0 500 560"
        className="absolute left-1/2 top-1/2 h-[535px] w-[475px] -translate-x-1/2 -translate-y-1/2"
      >

        <defs>

          <radialGradient id="signupSkin">
            <stop offset="0%" stopColor="#ffe1cf" />
            <stop offset="100%" stopColor="#efb99f" />
          </radialGradient>

          <linearGradient id="signupDress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ee86a5" />
            <stop offset="100%" stopColor="#c84770" />
          </linearGradient>

        </defs>

        {/* Mother hair */}

        <path
          d="M153 174 C135 128 146 79 184 56 C222 33 272 42 296 78 C319 112 311 161 285 190 C266 210 231 215 197 203 C174 196 159 187 153 174Z"
          fill="#46313e"
        />

        {/* Face */}

        <path
          d="M169 115 C169 82 196 67 226 69 C258 71 281 95 281 129 C281 164 259 190 226 194 C193 194 170 169 168 139Z"
          fill="url(#signupSkin)"
        />

        {/* Hair */}

        <path
          d="M165 117 C163 83 191 64 224 68 C246 70 264 80 274 96 C251 90 231 96 216 110 C199 124 181 128 165 117Z"
          fill="#46313e"
        />

        {/* Closed eyes */}

        <path
          d="M190 132 Q201 143 212 132"
          fill="none"
          stroke="#4a3640"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M238 132 Q249 143 260 132"
          fill="none"
          stroke="#4a3640"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Smile */}

        <path
          d="M210 158 Q226 174 242 158"
          fill="none"
          stroke="#b95d70"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Blush */}

        <ellipse
          cx="187"
          cy="151"
          rx="17"
          ry="8"
          fill="#e9919f"
          opacity=".3"
        />

        <ellipse
          cx="264"
          cy="151"
          rx="17"
          ry="8"
          fill="#e9919f"
          opacity=".3"
        />

        {/* Body */}

        <path
          d="M143 213 C160 195 187 194 206 207 C219 216 235 217 251 207 C276 192 306 200 322 225 C342 256 351 334 342 414 C337 458 307 482 266 492 L168 492 C125 480 107 450 110 407 C114 349 116 253 143 213Z"
          fill="url(#signupDress)"
        />

        {/* Belly */}

        <ellipse
          cx="226"
          cy="373"
          rx="125"
          ry="125"
          fill="#f3aec3"
        />

        {/* Baby */}

        <g className="baby-animation">

          <circle
            cx="226"
            cy="331"
            r="47"
            fill="#f4c8b5"
          />

          <path
            d="M182 326 C181 296 202 276 228 278 C252 279 268 297 269 321 C252 308 238 307 226 313 C211 320 196 327 182 326Z"
            fill="#624653"
          />

          {/* baby eyes */}

          <path
            d="M203 335 Q211 343 219 335"
            fill="none"
            stroke="#60444d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <path
            d="M233 335 Q241 343 249 335"
            fill="none"
            stroke="#60444d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* baby smile */}

          <path
            d="M214 355 Q226 367 238 355"
            fill="none"
            stroke="#c16e7b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* blush */}

          <ellipse
            cx="202"
            cy="352"
            rx="12"
            ry="6"
            fill="#e9969e"
            opacity=".35"
          />

          <ellipse
            cx="250"
            cy="352"
            rx="12"
            ry="6"
            fill="#e9969e"
            opacity=".35"
          />

        </g>

        {/* Left hugging arm */}

        <path
          d="M142 245 C119 270 114 303 124 332 C134 361 159 379 186 389 C201 395 216 393 222 383 C227 375 222 366 213 362 C204 358 193 357 184 352 C164 342 154 329 151 313 C147 293 154 276 165 261 C174 249 168 232 157 229 C151 228 146 235 142 245Z"
          fill="url(#signupSkin)"
        />

        {/* Right hugging arm */}

        <path
          d="M310 245 C333 270 338 303 328 332 C318 361 293 379 266 389 C251 395 236 393 230 383 C225 375 230 366 239 362 C248 358 259 357 268 352 C288 342 298 329 301 313 C305 293 298 276 287 261 C278 249 284 232 295 229 C301 228 306 235 310 245Z"
          fill="url(#signupSkin)"
        />

        {/* Hands */}

        <path
          d="M158 362 C175 373 190 379 204 382 C214 384 221 390 220 397 C219 404 211 408 202 406 C187 403 173 397 160 389 L149 382 C142 376 149 358 158 362Z"
          fill="url(#signupSkin)"
        />

        <path
          d="M294 362 C277 373 262 379 248 382 C238 384 231 390 232 397 C233 404 241 408 250 406 C265 403 279 397 292 389 L303 382 C310 376 303 358 294 362Z"
          fill="url(#signupSkin)"
        />

        {/* Heart */}

        <text
          x="226"
          y="303"
          textAnchor="middle"
          fontSize="18"
          fill="white"
        >
          ♥
        </text>

      </svg>

      {/* Caption */}

      <div className="absolute bottom-[20px] left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white bg-white/95 px-5 py-3 shadow-[0_18px_40px_rgba(23,43,77,0.12)]">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f4] text-xl text-[#d6537a]">
          ♡
        </div>

        <div>

          <p className="text-xs font-bold text-[#172b4d]">
            Growing together
          </p>

          <p className="mt-0.5 text-[10px] text-[#8994a8]">
            One step at a time
          </p>

        </div>

      </div>

    </div>
  );
}