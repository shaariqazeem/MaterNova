"use client";

import { useState } from "react";
import {
  TrendingUp,
  Target,
  Utensils,
  HeartPulse,
  Sparkles,
  CalendarDays,
  ChevronDown,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

type Range = "week" | "month";

const weeklyData = [
  { day: "Mon", value: 74, protein: 68, calories: 71 },
  { day: "Tue", value: 84, protein: 82, calories: 79 },
  { day: "Wed", value: 70, protein: 64, calories: 73 },
  { day: "Thu", value: 87, protein: 88, calories: 84 },
  { day: "Fri", value: 77, protein: 75, calories: 78 },
  { day: "Sat", value: 89, protein: 91, calories: 86 },
  { day: "Sun", value: 73, protein: 72, calories: 76 },
];

const monthlyData = [
  { day: "Week 1", value: 72, protein: 68, calories: 74 },
  { day: "Week 2", value: 79, protein: 76, calories: 81 },
  { day: "Week 3", value: 84, protein: 82, calories: 83 },
  { day: "Week 4", value: 88, protein: 86, calories: 87 },
];

export default function InsightsPage() {
  const [range, setRange] = useState<Range>("week");

  const data = range === "week" ? weeklyData : monthlyData;

  const average = Math.round(
    data.reduce((sum, item) => sum + item.value, 0) / data.length
  );

  const proteinAverage = Math.round(
    data.reduce((sum, item) => sum + item.protein, 0) / data.length
  );

  const calorieAverage = Math.round(
    data.reduce((sum, item) => sum + item.calories, 0) / data.length
  );

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-6 py-8 text-[#172b4d] md:px-10 lg:px-12">
      <div className="mx-auto max-w-[1180px]">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#c95d7d]">
              <span className="h-2 w-2 rounded-full bg-[#d97896]" />
              Nutrition insights
            </div>

            <h1 className="font-serif text-4xl font-medium tracking-[-0.03em] text-[#172b4d] md:text-5xl">
              Understand your progress
            </h1>

            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#66758f]">
              See how your nutrition patterns change over time and get
              easy-to-understand summaries of your logged information.
            </p>
          </div>

          {/* RANGE SELECTOR */}
          <div className="flex items-center gap-2 rounded-full border border-[#e1e5ec] bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setRange("week")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                range === "week"
                  ? "bg-[#172b4d] text-white shadow-sm"
                  : "text-[#718099] hover:bg-[#f5f7fa]"
              }`}
            >
              This week
            </button>

            <button
              type="button"
              onClick={() => setRange("month")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                range === "month"
                  ? "bg-[#172b4d] text-white shadow-sm"
                  : "text-[#718099] hover:bg-[#f5f7fa]"
              }`}
            >
              This month
            </button>
          </div>
        </div>

        {/* HERO INSIGHT */}
        <section className="mb-7 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#172b4d] via-[#1e3a63] to-[#293e6b] p-7 text-white shadow-[0_16px_45px_rgba(23,43,77,0.12)] md:p-9">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">

            <div>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#f09ab1]">
                <Sparkles className="h-4 w-4" />
                Maternova insight
              </div>

              <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">
                Your nutrition is becoming more consistent.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d5deec]">
                Your recent food logs show a steady pattern of nutrition
                tracking. Consistency is useful because it helps you and
                your healthcare professional understand your routine over
                time.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-[#eef2f8]">
                  {average}% average goal completion
                </div>

                <div className="rounded-full bg-[#d97896]/20 px-4 py-2 text-xs font-medium text-[#f4b1c2]">
                  +6% from previous period
                </div>
              </div>
            </div>

            {/* COMPLETION RING */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[13px] border-white/10">
                <div
                  className="absolute inset-[-13px] rounded-full"
                  style={{
                    background: `conic-gradient(#df7897 ${average * 3.6}deg, transparent 0deg)`,
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 13px), #000 0)",
                    mask:
                      "radial-gradient(farthest-side, transparent calc(100% - 13px), #000 0)",
                  }}
                />

                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b9c6d9]">
                    Completion
                  </p>

                  <p className="mt-1 text-4xl font-semibold">
                    {average}%
                  </p>

                  <p className="mt-1 text-xs text-[#b9c6d9]">
                    {range === "week" ? "7 tracked days" : "4 tracked weeks"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <InsightCard
            icon={<Target className="h-5 w-5" />}
            label="Average goal completion"
            value={`${average}%`}
            change="+6%"
            description="compared with previous period"
            accent="rose"
          />

          <InsightCard
            icon={<HeartPulse className="h-5 w-5" />}
            label="Protein consistency"
            value={`${proteinAverage}%`}
            change="+8%"
            description="of tracked days"
            accent="navy"
          />

          <InsightCard
            icon={<Utensils className="h-5 w-5" />}
            label="Meals logged"
            value={range === "week" ? "24" : "96"}
            change="+4"
            description={range === "week" ? "this week" : "this month"}
            accent="rose"
          />

          <InsightCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Active guidance"
            value="4"
            change="+2"
            description="items being tracked"
            accent="navy"
          />

        </section>

        {/* CONSISTENCY CHART */}
        <section className="mb-7 rounded-[26px] border border-[#e3e7ee] bg-white p-6 shadow-sm md:p-8">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-serif text-2xl font-medium text-[#172b4d]">
                Nutrition consistency
              </h2>

              <p className="mt-1 text-sm text-[#8390a5]">
                {range === "week"
                  ? "Daily goal completion over the last 7 days."
                  : "Average goal completion across the last 4 weeks."}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#66758f]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d97896]" />
              Goal completion
            </div>

          </div>

          {/* CHART */}
          <div className="relative">

            {/* TARGET LINE */}
            <div className="absolute left-0 right-0 top-[25%] border-t border-dashed border-[#e1a9b9]" />

            <div className="absolute -top-2 left-0 rounded bg-white px-1 text-[10px] font-semibold text-[#c95d7d]">
              80%
            </div>

            <div className="flex h-[310px] items-end gap-3 border-b border-[#edf0f4] px-2 pb-0 sm:gap-5 md:gap-8">

              {data.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >

                  <div className="mb-2 text-xs font-semibold text-[#52627c]">
                    {item.value}%
                  </div>

                  <div
                    className="w-full max-w-[58px] rounded-t-[12px] bg-gradient-to-t from-[#172b4d] to-[#d97896] transition-all duration-500"
                    style={{
                      height: `${item.value}%`,
                    }}
                  />

                  <div className="mt-3 text-xs font-medium text-[#8994a8]">
                    {item.day}
                  </div>
                </div>
              ))}

            </div>
          </div>

        </section>

        {/* TWO CHARTS */}
        <div className="mb-7 grid gap-6 lg:grid-cols-2">

          {/* PROTEIN */}
          <section className="rounded-[26px] border border-[#e3e7ee] bg-white p-6 shadow-sm md:p-8">

            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#172b4d]">
                  Protein progress
                </h2>

                <p className="mt-1 text-sm text-[#8390a5]">
                  Your protein consistency over time.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fbeaf0] text-[#c95d7d]">
                <HeartPulse className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-4">

              {data.map((item) => (
                <div key={item.day}>

                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-[#66758f]">
                      {item.day}
                    </span>

                    <span className="font-semibold text-[#172b4d]">
                      {item.protein}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#edf0f4]">
                    <div
                      className="h-full rounded-full bg-[#29476f]"
                      style={{
                        width: `${item.protein}%`,
                      }}
                    />
                  </div>

                </div>
              ))}

            </div>
          </section>

          {/* CALORIES */}
          <section className="rounded-[26px] border border-[#e3e7ee] bg-white p-6 shadow-sm md:p-8">

            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#172b4d]">
                  Calorie balance
                </h2>

                <p className="mt-1 text-sm text-[#8390a5]">
                  How closely your intake followed the tracked target.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2fa] text-[#29476f]">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="flex h-[225px] items-end gap-3">

              {data.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >

                  <div
                    className="w-full max-w-[42px] rounded-t-[10px] bg-[#dce4ef]"
                    style={{
                      height: `${item.calories}%`,
                    }}
                  />

                  <span className="mt-3 text-[10px] font-medium text-[#8994a8]">
                    {item.day}
                  </span>

                </div>
              ))}

            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f8f9fc] px-4 py-3">
              <span className="text-xs text-[#718099]">
                Average tracked completion
              </span>

              <span className="text-sm font-semibold text-[#29476f]">
                {calorieAverage}%
              </span>
            </div>

          </section>
        </div>

        {/* CARE PLAN PROGRESS */}
        <section className="mb-7 rounded-[26px] border border-[#e3e7ee] bg-white p-6 shadow-sm md:p-8">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-serif text-2xl font-medium text-[#172b4d]">
                Care plan progress
              </h2>

              <p className="mt-1 text-sm text-[#8390a5]">
                Track the guidance items you are currently following.
              </p>
            </div>

            <span className="rounded-full bg-[#edf2fa] px-4 py-2 text-xs font-semibold text-[#29476f]">
              4 active items
            </span>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <CareItem
              title="Take prescribed supplement"
              description="Follow the schedule provided by your healthcare professional."
              progress={100}
              complete
            />

            <CareItem
              title="Include protein-rich food"
              description="Continue recording meals so your nutrition pattern is visible."
              progress={82}
            />

            <CareItem
              title="Stay hydrated"
              description="Keep following the hydration guidance provided to you."
              progress={76}
            />

            <CareItem
              title="Attend scheduled care"
              description="Keep your upcoming healthcare appointments in view."
              progress={64}
            />

          </div>

        </section>

        {/* BOTTOM INSIGHT */}
        <section className="overflow-hidden rounded-[26px] bg-[#fff9fb] p-6 ring-1 ring-[#f0d9e1] md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fbeaf0] text-[#c95d7d]">
              <Sparkles className="h-6 w-6" />
            </div>

            <div className="flex-1">

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b94f6d]">
                Maternova summary
              </p>

              <h2 className="mt-2 font-serif text-2xl font-medium text-[#172b4d]">
                Consistency matters more than perfection.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#66758f]">
                Your insights are designed to help you notice patterns
                in the information you log. They are not a medical
                assessment. Continue following the individualized
                guidance from your healthcare professional.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-[#29476f] shadow-sm">
              <ArrowUpRight className="h-4 w-4" />
              Improving
            </div>

          </div>
        </section>

        {/* SAFETY */}
        <section className="mt-6 rounded-[20px] border border-[#e7dfe3] bg-[#fffafb] p-5">

          <div className="flex items-start gap-3">

            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c95d7d]" />

            <div>
              <p className="text-sm font-semibold text-[#172b4d]">
                About these insights
              </p>

              <p className="mt-1 text-xs leading-6 text-[#748198]">
                Maternova uses the information you log to visualize
                patterns and progress. These charts are for tracking
                and understanding your routine and do not diagnose,
                treat, or replace advice from your healthcare
                professional.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

/* INSIGHT CARD */

function InsightCard({
  icon,
  label,
  value,
  change,
  description,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  description: string;
  accent: "rose" | "navy";
}) {
  const iconClass =
    accent === "rose"
      ? "bg-[#fbeaf0] text-[#c95d7d]"
      : "bg-[#edf2fa] text-[#29476f]";

  return (
    <div className="rounded-[22px] border border-[#e3e7ee] bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="rounded-full bg-[#eef8f3] px-2.5 py-1 text-[10px] font-semibold text-[#3b8664]">
          {change}
        </span>

      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#8490a4]">
        {label}
      </p>

      <p className="mt-2 text-3xl font-semibold text-[#172b4d]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#8994a8]">
        {description}
      </p>

    </div>
  );
}

/* CARE ITEM */

function CareItem({
  title,
  description,
  progress,
  complete = false,
}: {
  title: string;
  description: string;
  progress: number;
  complete?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#e7eaf0] bg-[#fbfcfe] p-5">

      <div className="flex items-start gap-4">

        <div
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            complete
              ? "bg-[#eaf7f0] text-[#438463]"
              : "bg-[#edf2fa] text-[#29476f]"
          }`}
        >
          {complete ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Target className="h-5 w-5" />
          )}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-[#172b4d]">
              {title}
            </h3>

            <span className="text-xs font-semibold text-[#66758f]">
              {progress}%
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-[#8390a5]">
            {description}
          </p>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e9edf3]">
            <div
              className={`h-full rounded-full ${
                complete ? "bg-[#67a786]" : "bg-[#d97896]"
              }`}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}