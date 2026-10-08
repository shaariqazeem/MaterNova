"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Temporary login behavior.
    // Supabase authentication can be connected here later.
    console.log("Login:", { email, password });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff9fb] text-[#172b4d]">
      {/* Background decorative elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#ffe5ed] opacity-50 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#ffdce8] opacity-45 blur-3xl" />
        <div className="absolute left-[34%] top-[15%] h-2 w-2 rounded-full bg-[#ee9ab5] opacity-70" />
        <div className="absolute right-[18%] top-[22%] h-3 w-3 rounded-full bg-[#f2b1c5] opacity-70" />
        <div className="absolute bottom-[20%] left-[8%] h-2 w-2 rounded-full bg-[#d6537a] opacity-50" />
      </div>

      {/* Header */}
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
          <p className="text-xs text-[#8a96aa]">
            Your journey, supported.
          </p>
        </div>
      </header>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-[1250px] items-center px-6 pb-10 pt-2 sm:px-10 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          
          {/* LEFT — Mother & Baby */}
          <div className="relative hidden min-h-[680px] items-center justify-center lg:flex">
            {/* Floating flowers */}
            <div
              className="absolute left-[8%] top-[16%] text-3xl text-[#e889a5]"
              style={{ animation: "floatFlower 6s ease-in-out infinite" }}
            >
              ✿
            </div>

            <div
              className="absolute left-[15%] top-[57%] text-2xl text-[#d6537a]"
              style={{
                animation: "floatFlower 7s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              ✿
            </div>

            <div
              className="absolute right-[12%] top-[19%] text-2xl text-[#e889a5]"
              style={{
                animation: "floatFlower 5.5s ease-in-out infinite",
                animationDelay: "0.7s",
              }}
            >
              ✦
            </div>

            <div
              className="absolute right-[10%] bottom-[26%] text-3xl text-[#d6537a]"
              style={{
                animation: "floatFlower 7s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            >
              ✿
            </div>

            <div
              className="absolute left-[22%] top-[29%] text-lg text-[#e889a5]"
              style={{
                animation: "floatFlower 6.5s ease-in-out infinite",
              }}
            >
              ♡
            </div>

            <div
              className="absolute right-[23%] top-[38%] text-lg text-[#e889a5]"
              style={{
                animation: "floatFlower 6s ease-in-out infinite",
                animationDelay: "1.2s",
              }}
            >
              ♡
            </div>

            {/* Illustration */}
            <MotherBabyIllustration />

            {/* Emotional caption */}
            <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm font-semibold text-[#52627c]">
                A little more care, every day.
              </p>

              <p className="mt-1 text-xs text-[#a1aabd]">
                Supporting two hearts, one journey.
              </p>
            </div>
          </div>

          {/* RIGHT — Login */}
          <div className="mx-auto w-full max-w-[520px] lg:mr-0">
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f1bfd0] bg-white px-4 py-2 shadow-[0_4px_15px_rgba(214,83,122,0.07)]">
              <span className="h-2 w-2 rounded-full bg-[#df6c91]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6537a]">
                Welcome back
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[46px] font-bold leading-[1.03] tracking-[-0.035em] text-[#172b4d] sm:text-[56px]">
              Welcome to
              <br />
              <span className="text-[#c94770]">
                your Maternova
              </span>
              <br />
              journey.
            </h2>

            <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-[#627592]">
              Sign in to continue your pregnancy journey and keep your
              guidance, nutrition, and care information together.
            </p>

            {/* Login card */}
            <div className="mt-8 rounded-[28px] border border-[#f0dbe2] bg-white p-7 shadow-[0_22px_55px_rgba(54,40,50,0.08)] sm:p-8">
              <form onSubmit={handleLogin}>
                {/* Email */}
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-[50px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-4 text-sm text-[#172b4d] outline-none transition placeholder:text-[#b7bfcc] focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />
                </div>

                {/* Password */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-bold text-[#405572]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-bold text-[#d6537a] transition hover:text-[#b83f67]"
                    >
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

                {/* Sign in */}
                <button
                  type="submit"
                  className="mt-6 flex h-[53px] w-full items-center justify-center gap-3 rounded-2xl bg-[#172f55] text-sm font-bold text-white shadow-[0_12px_24px_rgba(23,47,85,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203b67] hover:shadow-[0_15px_28px_rgba(23,47,85,0.22)]"
                >
                  Sign in
                  <span className="text-lg">→</span>
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#eee5e9]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a7afbd]">
                  Or continue with
                </span>

                <div className="h-px flex-1 bg-[#eee5e9]" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl border border-[#eadde2] bg-white text-sm font-bold text-[#405572] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e3b7c7] hover:bg-[#fff9fb] hover:shadow-[0_8px_20px_rgba(214,83,122,0.07)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e8e3e6] bg-white text-sm font-bold text-[#4285f4]">
                  G
                </span>

                Continue with Google
              </button>

              {/* Create account */}
              <div className="mt-7 border-t border-[#eee5e9] pt-6 text-center">
                <p className="text-sm text-[#8994a8]">
                  New to Maternova?
                </p>

                <Link
                  href="/signup"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#d6537a] transition hover:text-[#b83f67]"
                >
                  Create an account
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Safety text */}
            <p className="mt-6 text-center text-[10px] leading-5 text-[#a0a9b8]">
              Maternova supports your journey — your healthcare professional
              remains your source of medical care.
            </p>
          </div>
        </div>
      </section>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes floatFlower {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-12px) rotate(5deg);
          }
        }

        @keyframes babyFloat {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes gentlePulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.025);
          }
        }
      `}</style>
    </main>
  );
}

/* ================================================================
   MOTHER + BABY ILLUSTRATION
   ================================================================ */

function MotherBabyIllustration() {
  return (
    <div className="relative h-[570px] w-[500px]">
      {/* Warm glow */}
      <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffdce8] opacity-70 blur-[65px]" />

      {/* Large background circle */}
      <div className="absolute left-1/2 top-1/2 h-[405px] w-[405px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#efbfd0] bg-gradient-to-br from-[#fffdfd] via-[#fff1f6] to-[#ffe3ec]" />

      {/* Inner decorative ring */}
      <div className="absolute left-1/2 top-1/2 h-[365px] w-[365px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5d4df]" />

      {/* Floating sparkles */}
      <div className="absolute left-[67px] top-[112px] text-2xl text-[#d6537a]">
        ✦
      </div>

      <div className="absolute right-[73px] top-[145px] text-xl text-[#e889a5]">
        ✦
      </div>

      <div className="absolute bottom-[145px] left-[72px] text-2xl text-[#e889a5]">
        ♡
      </div>

      <div className="absolute bottom-[135px] right-[66px] text-2xl text-[#d6537a]">
        ✿
      </div>

      {/* Mother + baby SVG */}
      <svg
        viewBox="0 0 500 570"
        className="absolute left-1/2 top-1/2 h-[545px] w-[475px] -translate-x-1/2 -translate-y-1/2"
        role="img"
        aria-label="A mother warmly hugging her smiling baby"
      >
        <defs>
          {/* Skin */}
          <radialGradient id="skin" cx="35%" cy="25%">
            <stop offset="0%" stopColor="#ffe0ce" />
            <stop offset="100%" stopColor="#efb99f" />
          </radialGradient>

          {/* Baby skin */}
          <radialGradient id="babySkin" cx="35%" cy="25%">
            <stop offset="0%" stopColor="#ffe9dc" />
            <stop offset="100%" stopColor="#efc2ad" />
          </radialGradient>

          {/* Dress */}
          <linearGradient id="dress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ed7fa1" />
            <stop offset="100%" stopColor="#c84770" />
          </linearGradient>

          {/* Belly */}
          <radialGradient id="belly" cx="35%" cy="25%">
            <stop offset="0%" stopColor="#ffdbe6" />
            <stop offset="100%" stopColor="#eea3bb" />
          </radialGradient>

          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="14"
              stdDeviation="12"
              floodColor="#8d4760"
              floodOpacity="0.16"
            />
          </filter>
        </defs>

        {/* =====================================================
            MOTHER HAIR
        ===================================================== */}

        <path
          d="
            M153 174
            C135 128 146 79 184 56
            C222 33 272 42 296 78
            C319 112 311 161 285 190
            C266 210 231 215 197 203
            C174 196 159 187 153 174Z
          "
          fill="#46313e"
          filter="url(#shadow)"
        />

        {/* Hair highlight */}
        <path
          d="
            M166 113
            C178 73 221 55 257 71
            C274 79 286 92 292 108
            C266 91 242 92 220 105
            C200 116 183 123 166 113Z
          "
          fill="#624551"
          opacity="0.65"
        />

        {/* =====================================================
            MOTHER FACE
        ===================================================== */}

        <path
          d="
            M169 115
            C169 82 196 67 226 69
            C258 71 281 95 281 129
            C281 164 259 190 226 194
            C193 194 170 169 168 139Z
          "
          fill="url(#skin)"
        />

        {/* Hair fringe */}
        <path
          d="
            M165 117
            C163 83 191 64 224 68
            C246 70 264 80 274 96
            C251 90 231 96 216 110
            C199 124 181 128 165 117Z
          "
          fill="#46313e"
        />

        {/* Ear */}
        <ellipse
          cx="280"
          cy="137"
          rx="10"
          ry="15"
          fill="#efb99f"
        />

        {/* =====================================================
            MOTHER CLOSED EYES
        ===================================================== */}

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

        {/* Eyelashes */}
        <path
          d="M192 132 L187 128"
          fill="none"
          stroke="#4a3640"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M258 132 L263 128"
          fill="none"
          stroke="#4a3640"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Nose */}
        <path
          d="M225 137 Q221 149 226 151"
          fill="none"
          stroke="#d29182"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* =====================================================
            MOTHER WARM SMILE
        ===================================================== */}

        <path
          d="M210 158 Q226 174 242 158"
          fill="none"
          stroke="#b95d70"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Smile inner highlight */}
        <path
          d="M217 162 Q226 168 235 162"
          fill="none"
          stroke="#dc8997"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Mother blush */}
        <ellipse
          cx="187"
          cy="151"
          rx="17"
          ry="8"
          fill="#e9919f"
          opacity="0.28"
        />

        <ellipse
          cx="264"
          cy="151"
          rx="17"
          ry="8"
          fill="#e9919f"
          opacity="0.28"
        />

        {/* =====================================================
            NECK
        ===================================================== */}

        <path
          d="M202 184 L202 216 Q226 230 250 215 L250 184Z"
          fill="url(#skin)"
        />

        {/* =====================================================
            DRESS
        ===================================================== */}

        <path
          d="
            M143 213
            C160 195 187 194 206 207
            C219 216 235 217 251 207
            C276 192 306 200 322 225
            C342 256 351 334 342 414
            C337 458 307 482 266 492
            L168 492
            C125 480 107 450 110 407
            C114 349 116 253 143 213Z
          "
          fill="url(#dress)"
          filter="url(#shadow)"
        />

        {/* Dress neckline */}
        <path
          d="
            M166 210
            Q226 250 286 210
            Q276 194 249 188
            Q226 205 203 188
            Q177 194 166 210Z
          "
          fill="#c94b73"
        />

        {/* Dress light */}
        <path
          d="
            M153 235
            C167 213 189 211 207 224
            C191 275 188 369 202 451
            L163 470
            C136 437 133 306 153 235Z
          "
          fill="#f291ad"
          opacity="0.5"
        />

        {/* =====================================================
            BELLY
        ===================================================== */}

        <ellipse
          cx="226"
          cy="373"
          rx="125"
          ry="125"
          fill="url(#belly)"
        />

        {/* Belly highlight */}
        <ellipse
          cx="186"
          cy="331"
          rx="54"
          ry="68"
          fill="#fff2f6"
          opacity="0.4"
        />

        {/* =====================================================
            BABY
        ===================================================== */}

        <g
          style={{
            transformOrigin: "226px 360px",
            animation: "babyFloat 4s ease-in-out infinite",
          }}
        >
          {/* Baby body */}
          <path
            d="
              M190 388
              C189 354 204 333 226 333
              C249 333 266 355 265 388
              C264 419 246 439 226 439
              C205 439 190 419 190 388Z
            "
            fill="url(#babySkin)"
          />

          {/* Baby head */}
          <circle
            cx="226"
            cy="331"
            r="47"
            fill="url(#babySkin)"
          />

          {/* Baby hair */}
          <path
            d="
              M182 326
              C181 296 202 276 228 278
              C252 279 268 297 269 321
              C252 308 238 307 226 313
              C211 320 196 327 182 326Z
            "
            fill="#664855"
          />

          {/* Baby ear */}
          <circle
            cx="181"
            cy="335"
            r="10"
            fill="#efc0aa"
          />

          {/* =================================================
              BABY CLOSED EYES
          ================================================= */}

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

          {/* Baby eyelashes */}
          <path
            d="M205 335 L201 332"
            stroke="#60444d"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M247 335 L251 332"
            stroke="#60444d"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Baby nose */}
          <path
            d="M226 339 Q223 346 227 348"
            fill="none"
            stroke="#d9988b"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* =================================================
              BABY WARM SMILE
          ================================================= */}

          <path
            d="M214 355 Q226 367 238 355"
            fill="none"
            stroke="#c16e7b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Baby blush */}
          <ellipse
            cx="202"
            cy="352"
            rx="12"
            ry="6"
            fill="#e9969e"
            opacity="0.3"
          />

          <ellipse
            cx="250"
            cy="352"
            rx="12"
            ry="6"
            fill="#e9969e"
            opacity="0.3"
          />

          {/* Baby little hand */}
          <circle
            cx="264"
            cy="394"
            r="13"
            fill="#efc0aa"
          />

          {/* Baby little heart */}
          <text
            x="226"
            y="391"
            textAnchor="middle"
            fontSize="22"
            fill="#ffffff"
          >
            ♥
          </text>
        </g>

        {/* =====================================================
            MOTHER'S LEFT ARM — WRAPPING AROUND BABY
        ===================================================== */}

        <path
          d="
            M142 245
            C119 270 114 303 124 332
            C134 361 159 379 186 389
            C201 395 216 393 222 383
            C227 375 222 366 213 362
            C204 358 193 357 184 352
            C164 342 154 329 151 313
            C147 293 154 276 165 261
            C174 249 168 232 157 229
            C151 228 146 235 142 245Z
          "
          fill="url(#skin)"
          filter="url(#shadow)"
        />

        {/* =====================================================
            MOTHER'S RIGHT ARM — WRAPPING AROUND BABY
        ===================================================== */}

        <path
          d="
            M310 245
            C333 270 338 303 328 332
            C318 361 293 379 266 389
            C251 395 236 393 230 383
            C225 375 230 366 239 362
            C248 358 259 357 268 352
            C288 342 298 329 301 313
            C305 293 298 276 287 261
            C278 249 284 232 295 229
            C301 228 306 235 310 245Z
          "
          fill="url(#skin)"
          filter="url(#shadow)"
        />

        {/* =====================================================
            LEFT HAND ACROSS BABY
        ===================================================== */}

        <path
          d="
            M158 362
            C172 370 187 378 202 381
            C212 383 221 387 222 395
            C223 403 214 409 205 408
            C190 406 175 397 162 390
            L149 382
            C141 376 148 358 158 362Z
          "
          fill="url(#skin)"
        />

        {/* =====================================================
            RIGHT HAND ACROSS BABY
        ===================================================== */}

        <path
          d="
            M294 362
            C280 370 265 378 250 381
            C240 383 231 387 230 395
            C229 403 238 409 247 408
            C262 406 277 397 290 390
            L303 382
            C311 376 304 358 294 362Z
          "
          fill="url(#skin)"
        />

        {/* Left hand fingers */}
        <path
          d="M163 382 Q184 396 207 400"
          fill="none"
          stroke="#d69586"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        <path
          d="M168 375 Q188 388 210 393"
          fill="none"
          stroke="#d69586"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Right hand fingers */}
        <path
          d="M289 382 Q268 396 245 400"
          fill="none"
          stroke="#d69586"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        <path
          d="M284 375 Q264 388 242 393"
          fill="none"
          stroke="#d69586"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* =====================================================
            HEART ABOVE BABY
        ===================================================== */}

        <text
          x="226"
          y="285"
          textAnchor="middle"
          fontSize="24"
          fill="#ffffff"
          opacity="0.95"
        >
          ♥
        </text>

        {/* Tiny sparkles */}
        <circle
          cx="170"
          cy="300"
          r="4"
          fill="#ffffff"
          opacity="0.8"
        />

        <circle
          cx="283"
          cy="300"
          r="4"
          fill="#ffffff"
          opacity="0.8"
        />
      </svg>

      {/* Floating emotional card */}
      <div
        className="absolute bottom-[24px] left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white bg-white/95 px-5 py-3 shadow-[0_18px_40px_rgba(23,43,77,0.13)] backdrop-blur"
        style={{
          animation: "gentlePulse 4s ease-in-out infinite",
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f4] text-xl text-[#d6537a]">
          ♡
        </div>

        <div>
          <p className="text-xs font-bold text-[#172b4d]">
            Growing together
          </p>

          <p className="mt-0.5 text-[10px] text-[#8994a8]">
            One day at a time
          </p>
        </div>
      </div>
    </div>
  );
}