"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function PregnancySignupPage() {

  const [weeks, setWeeks] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showCompleteAnimation, setShowCompleteAnimation] =
    useState(false);

  function handleCompleteSetup(
    e: FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setError("");

    if (!weeks || !dueDate) {

      setError(
        "Please enter your pregnancy week and expected due date."
      );

      return;
    }

    const pregnancyWeeks = Number(weeks);

    if (
      Number.isNaN(pregnancyWeeks) ||
      pregnancyWeeks < 1 ||
      pregnancyWeeks > 42
    ) {

      setError(
        "Please enter a pregnancy week between 1 and 42."
      );

      return;
    }

    setLoading(true);

    try {

      const existingSignup =
        localStorage.getItem("maternovaSignup");

      const signupData = existingSignup
        ? JSON.parse(existingSignup)
        : {};

      const profile = {

        ...signupData,

        pregnancyWeek: pregnancyWeeks,

        dueDate,

        setupCompleted: true,

        createdAt: new Date().toISOString(),

      };

      localStorage.setItem(
        "maternovaProfile",
        JSON.stringify(profile)
      );

      localStorage.setItem(
        "maternovaAuthenticated",
        "true"
      );

      /*
       * Show the emotional completion animation
       * before entering the dashboard.
       */

      setShowCompleteAnimation(true);

      setTimeout(() => {

        window.location.href = "/dashboard";

      }, 5000);

    } catch {

      setLoading(false);

      setError(
        "Something went wrong while saving your profile. Please try again."
      );

    }

  }

  return (

    <main className="min-h-screen overflow-hidden bg-[#fff9fb] text-[#172b4d]">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#ffe0eb] opacity-60 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-[#ffdce8] opacity-60 blur-3xl" />

        <div className="warm-flower flower-a">
          ✿
        </div>

        <div className="warm-flower flower-b">
          ✿
        </div>

        <div className="warm-flower flower-c">
          ✿
        </div>

        <div className="warm-sparkle sparkle-a">
          ✦
        </div>

        <div className="warm-sparkle sparkle-b">
          ✧
        </div>

        <div className="warm-heart heart-a">
          ♡
        </div>

        <div className="warm-heart heart-b">
          ♡
        </div>

      </div>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="relative z-20 flex items-center justify-between px-7 py-5 sm:px-10 lg:px-16">

        <Link
          href="/"
          className="flex items-center gap-3"
        >

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


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-[1250px] items-center px-6 pb-10 pt-3 sm:px-10 lg:px-12">

        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">


          {/* =================================================
              LEFT
          ================================================= */}

          <div className="relative hidden min-h-[650px] items-center justify-center lg:flex">

            <MotherBabyPregnancyIllustration />

          </div>


          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="mx-auto w-full max-w-[560px]">

            {/* Step */}

            <div className="mb-5 flex items-center gap-3">

              <div className="flex items-center gap-2 rounded-full border border-[#f1bfd0] bg-white px-4 py-2 shadow-[0_4px_15px_rgba(214,83,122,0.07)]">

                <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6537a]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6537a]">
                  Step 2 of 2
                </span>

              </div>

            </div>


            {/* Heading */}

            <h2 className="text-[42px] font-bold leading-[1.05] tracking-[-0.035em] text-[#172b4d] sm:text-[50px]">

              Tell us about

              <br />

              <span className="text-[#c94770]">
                your journey.
              </span>

            </h2>


            <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#627592]">
              A couple of details help Maternova understand where you are
              in your pregnancy journey.
            </p>


            {/* Form */}

            <div className="mt-7 rounded-[28px] border border-[#f0dbe2] bg-white p-6 shadow-[0_22px_55px_rgba(54,40,50,0.08)] sm:p-8">

              <form onSubmit={handleCompleteSetup}>

                {/* Pregnancy week */}

                <div>

                  <label
                    htmlFor="pregnancy-week"
                    className="mb-2 block text-xs font-bold text-[#405572]"
                  >
                    How many weeks pregnant are you?
                  </label>

                  <div className="relative">

                    <input
                      id="pregnancy-week"
                      type="number"
                      min="1"
                      max="42"
                      required
                      value={weeks}
                      onChange={(e) =>
                        setWeeks(e.target.value)
                      }
                      placeholder="e.g. 22"
                      className="h-[56px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 pr-20 text-sm text-[#172b4d] outline-none transition placeholder:text-[#b7bfcc] focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                    />

                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#8c99ad]">
                      weeks
                    </span>

                  </div>

                  <p className="mt-2 text-[11px] leading-5 text-[#9aa6b8]">
                    Enter the current pregnancy week given by your healthcare
                    professional.
                  </p>

                </div>


                {/* Due date */}

                <div className="mt-6">

                  <label
                    htmlFor="due-date"
                    className="mb-2 block text-xs font-bold text-[#405572]"
                  >
                    Expected due date
                  </label>

                  <input
                    id="due-date"
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) =>
                      setDueDate(e.target.value)
                    }
                    className="h-[56px] w-full rounded-2xl border border-[#eadde2] bg-[#fffdfd] px-5 text-sm text-[#172b4d] outline-none transition focus:border-[#e889a5] focus:ring-4 focus:ring-[#fce6ee]"
                  />

                  <p className="mt-2 text-[11px] leading-5 text-[#9aa6b8]">
                    Use the due date provided by your healthcare professional.
                  </p>

                </div>


                {/* Error */}

                {error && (

                  <div className="mt-5 rounded-2xl border border-[#f2c5d2] bg-[#fff1f5] px-4 py-3 text-sm font-medium text-[#c4476e]">

                    {error}

                  </div>

                )}


                {/* Complete */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl bg-[#172f55] text-sm font-bold text-white shadow-[0_12px_24px_rgba(23,47,85,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#203b67] hover:shadow-[0_18px_30px_rgba(23,47,85,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loading ? (

                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Getting everything ready...
                    </>

                  ) : (

                    <>
                      Complete setup

                      <span className="text-lg">
                        →
                      </span>
                    </>

                  )}

                </button>

              </form>


              {/* Back */}

              <div className="mt-5 text-center">

                <Link
                  href="/signup"
                  className="text-sm font-semibold text-[#8994a8] transition hover:text-[#d6537a]"
                >
                  ← Back
                </Link>

              </div>

            </div>


            <p className="mt-5 text-center text-[10px] leading-5 text-[#a0a9b8]">
              Your due date and pregnancy week help personalize your
              Maternova experience.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMPLETION EXPERIENCE
      ===================================================== */}

      {showCompleteAnimation && (

        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#fff8fb]">

          {/* Warm glow */}

          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd7e4] opacity-70 blur-[100px] animate-glow" />


          {/* Floating flowers */}

          <div className="completion-flower completion-flower-1">
            ✿
          </div>

          <div className="completion-flower completion-flower-2">
            ✿
          </div>

          <div className="completion-flower completion-flower-3">
            ✿
          </div>

          <div className="completion-sparkle completion-sparkle-1">
            ✦
          </div>

          <div className="completion-sparkle completion-sparkle-2">
            ✧
          </div>

          {/* Main */}

          <div className="relative z-10 flex w-full max-w-[700px] flex-col items-center px-6 text-center animate-completion">

            {/* Bulb */}

            <div className="relative mb-7">

              <div className="absolute inset-[-25px] rounded-full bg-[#ffe1ec] blur-xl animate-bulb-glow" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#f4b7ca] bg-white shadow-[0_15px_45px_rgba(214,83,122,0.18)]">

                <span className="text-5xl animate-bulb">
                  💡
                </span>

              </div>

            </div>


            {/* Mother + baby */}

            <CompletionMotherBaby />


            {/* Text */}

            <div className="mt-7">

              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d6537a]">
                Your journey starts here
              </p>

              <h2 className="mt-3 text-5xl font-bold tracking-tight text-[#172b4d]">
                I've got you.
                <span className="text-[#d6537a]">
                  {" "}
                  ♡
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[560px] text-lg leading-8 text-[#627592]">

                I'll be here to support you throughout your pregnancy journey,

                <br className="hidden sm:block" />

                one step at a time, together.

              </p>

              <div className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold text-[#9a7180]">

                <span>
                  ✦
                </span>

                <span>
                  Welcome to Maternova
                </span>

                <span>
                  ✦
                </span>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style jsx global>{`

        @keyframes float {

          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-15px) rotate(5deg);
          }

        }

        @keyframes glow {

          0%, 100% {
            transform: scale(0.9);
            opacity: 0.45;
          }

          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }

        }

        @keyframes completion {

          from {
            opacity: 0;
            transform: translateY(35px) scale(0.94);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

        }

        @keyframes bulb {

          0%, 100% {
            transform: rotate(-4deg) scale(1);
          }

          50% {
            transform: rotate(4deg) scale(1.08);
          }

        }

        @keyframes bulb-glow {

          0%, 100% {
            transform: scale(0.8);
            opacity: 0.3;
          }

          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }

        }

        @keyframes baby-breathe {

          0%, 100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-5px) scale(1.025);
          }

        }

        .warm-flower,
        .warm-sparkle,
        .warm-heart {
          position: absolute;
          pointer-events: none;
        }

        .warm-flower {
          color: #e889a5;
          font-size: 25px;
          animation: float 6s ease-in-out infinite;
        }

        .warm-sparkle {
          color: #d6537a;
          font-size: 23px;
          animation: float 4s ease-in-out infinite;
        }

        .warm-heart {
          color: #e889a5;
          font-size: 26px;
          animation: float 5s ease-in-out infinite;
        }

        .flower-a {
          left: 8%;
          top: 28%;
        }

        .flower-b {
          left: 44%;
          top: 15%;
          animation-delay: 1s;
        }

        .flower-c {
          right: 9%;
          bottom: 20%;
          animation-delay: 2s;
        }

        .sparkle-a {
          left: 48%;
          top: 35%;
        }

        .sparkle-b {
          right: 17%;
          top: 22%;
          animation-delay: 1.5s;
        }

        .heart-a {
          left: 16%;
          bottom: 25%;
        }

        .heart-b {
          right: 12%;
          top: 42%;
          animation-delay: 2s;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-completion {
          animation: completion 1s cubic-bezier(.2,.8,.2,1) both;
        }

        .animate-bulb {
          display: block;
          animation: bulb 2s ease-in-out infinite;
        }

        .animate-bulb-glow {
          animation: bulb-glow 2s ease-in-out infinite;
        }

        .completion-flower,
        .completion-sparkle {
          position: absolute;
          pointer-events: none;
        }

        .completion-flower {
          color: #e889a5;
          font-size: 38px;
          animation: float 5s ease-in-out infinite;
        }

        .completion-sparkle {
          color: #d6537a;
          font-size: 30px;
          animation: float 4s ease-in-out infinite;
        }

        .completion-flower-1 {
          left: 15%;
          top: 22%;
        }

        .completion-flower-2 {
          right: 14%;
          top: 25%;
          animation-delay: 1s;
        }

        .completion-flower-3 {
          left: 20%;
          bottom: 20%;
          animation-delay: 2s;
        }

        .completion-sparkle-1 {
          left: 28%;
          top: 18%;
        }

        .completion-sparkle-2 {
          right: 25%;
          bottom: 22%;
          animation-delay: 1.5s;
        }

      `}</style>

    </main>

  );
}


/* ================================================================
   MOTHER + BABY
================================================================ */

function MotherBabyPregnancyIllustration() {

  return (

    <div className="relative h-[560px] w-[490px]">

      <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe0eb] opacity-60 blur-[60px]" />

      <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#efbfd0] bg-gradient-to-br from-white via-[#fff1f6] to-[#ffe3ec]" />

      <svg
        viewBox="0 0 500 560"
        className="absolute left-1/2 top-1/2 h-[535px] w-[475px] -translate-x-1/2 -translate-y-1/2"
      >

        <defs>

          <radialGradient id="pregSkin">
            <stop offset="0%" stopColor="#ffe1cf" />
            <stop offset="100%" stopColor="#efb99f" />
          </radialGradient>

          <linearGradient id="pregDress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ee86a5" />
            <stop offset="100%" stopColor="#c84770" />
          </linearGradient>

        </defs>

        {/* Hair */}

        <path
          d="M153 174 C135 128 146 79 184 56 C222 33 272 42 296 78 C319 112 311 161 285 190 C266 210 231 215 197 203 C174 196 159 187 153 174Z"
          fill="#46313e"
        />

        {/* Face */}

        <path
          d="M169 115 C169 82 196 67 226 69 C258 71 281 95 281 129 C281 164 259 190 226 194 C193 194 170 169 168 139Z"
          fill="url(#pregSkin)"
        />

        {/* Fringe */}

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

        {/* Dress */}

        <path
          d="M143 213 C160 195 187 194 206 207 C219 216 235 217 251 207 C276 192 306 200 322 225 C342 256 351 334 342 414 C337 458 307 482 266 492 L168 492 C125 480 107 450 110 407 C114 349 116 253 143 213Z"
          fill="url(#pregDress)"
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

        <g className="baby-breathe">

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

          <path
            d="M214 355 Q226 367 238 355"
            fill="none"
            stroke="#c16e7b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

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

        {/* Hugging arms */}

        <path
          d="M142 245 C119 270 114 303 124 332 C134 361 159 379 186 389 C201 395 216 393 222 383 C227 375 222 366 213 362 C204 358 193 357 184 352 C164 342 154 329 151 313 C147 293 154 276 165 261 C174 249 168 232 157 229 C151 228 146 235 142 245Z"
          fill="url(#pregSkin)"
        />

        <path
          d="M310 245 C333 270 338 303 328 332 C318 361 293 379 266 389 C251 395 236 393 230 383 C225 375 230 366 239 362 C248 358 259 357 268 352 C288 342 298 329 301 313 C305 293 298 276 287 261 C278 249 284 232 295 229 C301 228 306 235 310 245Z"
          fill="url(#pregSkin)"
        />

        {/* Hands */}

        <path
          d="M158 362 C175 373 190 379 204 382 C214 384 221 390 220 397 C219 404 211 408 202 406 C187 403 173 397 160 389 L149 382 C142 376 149 358 158 362Z"
          fill="url(#pregSkin)"
        />

        <path
          d="M294 362 C277 373 262 379 248 382 C238 384 231 390 232 397 C233 404 241 408 250 406 C265 403 279 397 292 389 L303 382 C310 376 303 358 294 362Z"
          fill="url(#pregSkin)"
        />

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
            Every week is a milestone
          </p>

        </div>

      </div>

    </div>

  );
}


/* ================================================================
   COMPLETION MOTHER + BABY
================================================================ */

function CompletionMotherBaby() {

  return (

    <div className="relative h-[250px] w-[280px]">

      <div className="absolute inset-0 rounded-full bg-[#fff0f5] blur-2xl" />

      <svg
        viewBox="0 0 300 250"
        className="relative h-full w-full"
      >

        {/* Mother */}

        <circle
          cx="150"
          cy="75"
          r="45"
          fill="#f6c7b3"
        />

        {/* Hair */}

        <path
          d="M105 77 C103 35 126 20 151 22 C180 22 198 43 195 75 C180 61 163 59 148 67 C132 76 118 80 105 77Z"
          fill="#46313e"
        />

        {/* Eyes */}

        <path
          d="M130 79 Q138 87 146 79"
          fill="none"
          stroke="#513b43"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M154 79 Q162 87 170 79"
          fill="none"
          stroke="#513b43"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Smile */}

        <path
          d="M139 98 Q150 109 161 98"
          fill="none"
          stroke="#b95d70"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Mother body */}

        <path
          d="M91 143 C104 112 126 107 150 107 C174 107 196 112 209 143 L219 235 L81 235Z"
          fill="#d6537a"
        />

        {/* Baby */}

        <g className="completion-baby">

          <circle
            cx="150"
            cy="158"
            r="31"
            fill="#f4c8b5"
          />

          <path
            d="M120 157 C120 132 133 121 151 122 C170 122 181 137 181 155 C165 147 153 147 142 153 C133 158 126 160 120 157Z"
            fill="#624653"
          />

          {/* eyes */}

          <path
            d="M136 162 Q141 168 146 162"
            fill="none"
            stroke="#60444d"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M154 162 Q159 168 164 162"
            fill="none"
            stroke="#60444d"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* smile */}

          <path
            d="M143 177 Q150 184 157 177"
            fill="none"
            stroke="#c16e7b"
            strokeWidth="3"
            strokeLinecap="round"
          />

        </g>

        {/* Hugging arms */}

        <path
          d="M105 145 C82 166 88 199 119 207 C132 211 143 204 139 195 C134 187 119 185 116 174 C113 163 124 157 128 151Z"
          fill="#f6c7b3"
        />

        <path
          d="M195 145 C218 166 212 199 181 207 C168 211 157 204 161 195 C166 187 181 185 184 174 C187 163 176 157 172 151Z"
          fill="#f6c7b3"
        />

        {/* Heart */}

        <text
          x="150"
          y="130"
          textAnchor="middle"
          fontSize="18"
          fill="#ffffff"
        >
          ♥
        </text>

      </svg>

    </div>

  );
}