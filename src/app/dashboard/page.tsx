"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#fff9fb] text-[#172b4d]">

      {/* Header */}

      <header className="flex items-center justify-between border-b border-[#eee3e8] bg-white px-6 py-5 lg:px-10">

        <div className="flex items-center gap-3">

          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f7b5c8] to-[#e889a5] text-xl text-white shadow-[0_8px_20px_rgba(214,83,122,0.18)]">
            ✦

            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#d6537a]" />
          </div>

          <div>

            <h1 className="text-xl font-bold text-[#172b4d]">
              Maternova
            </h1>

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#a26b7e]">
              Pregnancy companion
            </p>

          </div>

        </div>

        <div className="text-sm font-semibold text-[#71809a]">
          Your journey, supported. ♡
        </div>

      </header>

      {/* Dashboard */}

      <section className="mx-auto max-w-[1250px] px-6 py-10 lg:px-10">

        {/* Greeting */}

        <div className="rounded-[30px] bg-gradient-to-r from-[#172f55] to-[#29476f] p-8 text-white shadow-[0_20px_45px_rgba(23,47,85,0.16)]">

          <p className="text-sm font-semibold text-[#f5b1c6]">
            WELCOME TO MATERNOVA
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            A little more care,
            <br />
            every day.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#d4ddec]">
            Your healthcare guidance, nutrition and pregnancy journey
            information — together in one place.
          </p>

        </div>

        {/* Pregnancy progress */}

        <div className="mt-7 grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl border border-[#f0dbe2] bg-white p-6 shadow-[0_12px_35px_rgba(54,40,50,0.06)]">

            <div className="flex items-center justify-between">

              <p className="text-sm font-bold text-[#52627c]">
                Pregnancy
              </p>

              <span className="rounded-full bg-[#fff0f4] px-3 py-1 text-xs font-bold text-[#d6537a]">
                Growing together
              </span>

            </div>

            <div className="mt-5 flex items-end gap-2">

              <span className="text-4xl font-bold text-[#172b4d]">
                22
              </span>

              <span className="mb-1 text-sm text-[#8994a8]">
                weeks
              </span>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#f3e8ed]">

              <div
                className="h-full rounded-full bg-gradient-to-r from-[#e889a5] to-[#d6537a]"
                style={{ width: "55%" }}
              />

            </div>

            <p className="mt-3 text-xs text-[#8994a8]">
              22 of approximately 40 weeks
            </p>

          </div>

          {/* Nutrition */}

          <div className="rounded-3xl border border-[#f0dbe2] bg-white p-6 shadow-[0_12px_35px_rgba(54,40,50,0.06)]">

            <div className="flex items-center justify-between">

              <p className="text-sm font-bold text-[#52627c]">
                Today's nutrition
              </p>

              <span className="text-2xl">
                🥗
              </span>

            </div>

            <p className="mt-5 text-4xl font-bold text-[#172b4d]">
              1,680
              <span className="ml-1 text-sm font-medium text-[#8994a8]">
                kcal
              </span>
            </p>

            <div className="mt-5 flex gap-3">

              <div className="rounded-xl bg-[#fff0f4] px-3 py-2">

                <p className="text-[10px] text-[#9a7180]">
                  Protein
                </p>

                <p className="text-sm font-bold text-[#d6537a]">
                  68g
                </p>

              </div>

              <div className="rounded-xl bg-[#f4f6fa] px-3 py-2">

                <p className="text-[10px] text-[#8994a8]">
                  Carbs
                </p>

                <p className="text-sm font-bold text-[#52627c]">
                  210g
                </p>

              </div>

            </div>

          </div>

          {/* Care plan */}

          <div className="rounded-3xl border border-[#f0dbe2] bg-white p-6 shadow-[0_12px_35px_rgba(54,40,50,0.06)]">

            <div className="flex items-center justify-between">

              <p className="text-sm font-bold text-[#52627c]">
                Care plan
              </p>

              <span className="text-2xl text-[#d6537a]">
                ♡
              </span>

            </div>

            <p className="mt-5 text-4xl font-bold text-[#172b4d]">
              3
              <span className="ml-2 text-sm font-medium text-[#8994a8]">
                tasks today
              </span>
            </p>

            <p className="mt-4 text-xs leading-5 text-[#8994a8]">
              Follow the instructions provided by your healthcare professional.
            </p>

          </div>

        </div>

        {/* Quick actions */}

        <div className="mt-7">

          <h3 className="text-xl font-bold text-[#172b4d]">
            Your Maternova
          </h3>

          <p className="mt-1 text-sm text-[#8994a8]">
            Keep your guidance, nutrition and pregnancy information together.
          </p>

        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/doctor"
            className="group rounded-3xl border border-[#f0dbe2] bg-white p-6 shadow-[0_12px_30px_rgba(54,40,50,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(54,40,50,0.09)]"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0f4] text-xl text-[#d6537a]">
              ♡
            </div>

            <h4 className="mt-5 font-bold text-[#172b4d]">
              Doctor Guidance
            </h4>

            <p className="mt-2 text-xs leading-5 text-[#8994a8]">
              Upload reports and understand your healthcare instructions.
            </p>

            <span className="mt-4 block text-sm font-bold text-[#d6537a]">
              Open →
            </span>

          </Link>

          <Link
            href="/nutrition"
            className="group rounded-3xl border border-[#f0dbe2] bg-white p-6 shadow-[0_12px_30px_rgba(54,40,50,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(54,40,50,0.09)]"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0f4] text-xl text-[#d6537a]">
              ◉
            </div>

            <h4 className="mt-5 font-bold text-[#172b4d]">
              Nutrition
            </h4>

            <p className="mt-2 text-xs leading-5 text-[#8994a8]">
              Track meals, calories, protein and other nutrition information.
            </p>

            <span className="mt-4 block text-sm font-bold text-[#d6537a]">
              Open →
            </span>

          </Link>

          <Link
            href="/insights"
            className="group rounded-3xl border border-[#f0dbe2] bg-white p-6 shadow-[0_12px_30px_rgba(54,40,50,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(54,40,50,0.09)]"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0f4] text-xl text-[#d6537a]">
              ↗
            </div>

            <h4 className="mt-5 font-bold text-[#172b4d]">
              Insights
            </h4>

            <p className="mt-2 text-xs leading-5 text-[#8994a8]">
              See your nutrition and pregnancy progress over time.
            </p>

            <span className="mt-4 block text-sm font-bold text-[#d6537a]">
              Open →
            </span>

          </Link>

          <Link
            href="/help"
            className="group rounded-3xl border border-[#f0dbe2] bg-white p-6 shadow-[0_12px_30px_rgba(54,40,50,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(54,40,50,0.09)]"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0f4] text-xl text-[#d6537a]">
              ?
            </div>

            <h4 className="mt-5 font-bold text-[#172b4d]">
              Help & Safety
            </h4>

            <p className="mt-2 text-xs leading-5 text-[#8994a8]">
              Understand how Maternova supports your healthcare journey.
            </p>

            <span className="mt-4 block text-sm font-bold text-[#d6537a]">
              Open →
            </span>

          </Link>

        </div>

        {/* Safety */}

        <div className="mt-8 rounded-2xl border border-[#f2d5df] bg-[#fff6f8] p-5 text-center">

          <p className="text-xs leading-5 text-[#8994a8]">
            Maternova helps you understand and organize healthcare guidance.
            Your healthcare professional remains your source of medical care.
          </p>

        </div>

      </section>

    </main>
  );
}