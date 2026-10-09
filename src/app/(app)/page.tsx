"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Droplets,
  Flame,
  HeartPulse,
  Leaf,
  Mic,
  Plus,
  ShieldCheck,
  Sparkles,
  Trophy,
  Utensils,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useLanguage } from "@/lib/i18n";

const nutrition = [
  { label: "Calories", value: "1,480", target: "2,100 kcal", percent: 70, left: "620 kcal left", icon: Flame, tone: "rose" },
  { label: "Protein", value: "62", target: "75 g", percent: 83, left: "13 g left", icon: HeartPulse, tone: "navy" },
  { label: "Fiber", value: "18", target: "25 g", percent: 72, left: "7 g left", icon: Leaf, tone: "rose" },
  { label: "Calcium", value: "640", target: "1,000 mg", percent: 64, left: "360 mg left", icon: ShieldCheck, tone: "navy" },
];

const week = [
  ["M", 62],
  ["T", 78],
  ["W", 55],
  ["T", 84],
  ["F", 70],
  ["S", 91],
  ["S", 76],
];

export default function DashboardPage() {
  const { t } = useLanguage();
  const [exerciseMinutes, setExerciseMinutes] = useState(90);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("maternova-exercise-logs");
      if (!stored) return;
      const logs = JSON.parse(stored);
      if (Array.isArray(logs)) {
        const total = logs.reduce((sum: number, item: { duration?: number }) => sum + (Number(item.duration) || 0), 0);
        setExerciseMinutes(total);
      }
    } catch {
      // ignore malformed local storage values
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFD] text-[#1E293B]">
      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pt-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
              <span>{t("today")}</span>
              <span className="h-1 w-1 rounded-full bg-[#CBD5E1]" />
              <span>Wednesday, October 23</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden text-[#3B5B88] sm:inline">126 {t("daysLeft")}</span>
            </div>
            <h1 className="font-serif text-3xl font-medium tracking-tight text-[#172A46] sm:text-[36px]">
              {t("goodMorning")}, Ananya
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-full border border-[#DCE3EC] bg-white px-4 py-2 text-sm font-semibold text-[#34445A] shadow-sm sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#D9778F]" />
              {t("careSync")}
            </button>
            <button aria-label="Notifications" className="rounded-full border border-[#DCE3EC] bg-white p-2.5 text-[#475569] shadow-sm">
              <Bell className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 rounded-full bg-[#203A63] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(32,58,99,.2)] transition hover:bg-[#172D4C]">
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">{t("askMaternova")}</span>
            </button>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#172A46] via-[#203A63] to-[#2B4B79] text-white shadow-[0_18px_45px_rgba(32,58,99,.16)]">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#D9778F]/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#6E91C9]/15 blur-3xl" />

          <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_320px] lg:p-10">
            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#FCECEF] px-3 py-1.5 text-xs font-bold text-[#4C0620]">Week 22</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#E7EEF9]">Second Trimester • Month 5</span>
                <span className="hidden items-center gap-1.5 text-xs text-[#D3E3FF] sm:flex"><CalendarDays className="h-3.5 w-3.5" />18 weeks remaining</span>
              </div>

              <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-[38px]">
                Harmonious growth & sensory milestones
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#DCE6F5] sm:text-base">
                You are comfortably settled in your second trimester. Keep following your healthcare professional&apos;s guidance with steady nutrition, gentle movement, and conscious rest.
              </p>

              <div className="mt-6 flex max-w-2xl items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#FCECEF]/15">
                  <Leaf className="h-6 w-6 text-[#F4A8B8]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#FCECEF]">Baby development insight</p>
                  <p className="mt-1 text-sm leading-6 text-white">Baby is now roughly the size of a <span className="font-semibold text-[#F8B4C4]">papaya</span>. Rapid sensory tuning and brain development are underway this week.</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/doctor" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#203A63] shadow-md transition hover:-translate-y-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                  View today&apos;s guidance
                </Link>
                <Link href="/nutrition" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
                  <Plus className="h-4 w-4 text-[#F4A8B8]" />
                  Add a meal
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative flex h-52 w-52 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="66" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="9" />
                  <circle cx="80" cy="80" r="66" fill="none" stroke="#D9778F" strokeWidth="9" strokeLinecap="round" strokeDasharray="414.7" strokeDashoffset="186.6" />
                </svg>
                <div className="text-center">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9D7EA]">Progress</div>
                  <div className="mt-1 text-4xl font-bold">55%</div>
                  <div className="mt-1 text-xs font-semibold text-[#FCECEF]">Week 22 / 40</div>
                </div>
              </div>
              <p className="mt-1 text-xs text-[#AFC0D6]">Milestone target</p>
              <p className="mt-1 text-sm font-semibold text-white">Viability scan in 14 days</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-6 w-1.5 rounded-full bg-[#203A63]" />
              <h2 className="font-serif text-2xl font-medium text-[#172A46]">{t("todaysNutrition")}</h2>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-[#64748B]">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#203A63]" />Optimal intake</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#D9778F]" />Ongoing balance</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {nutrition.map((item) => {
              const Icon = item.icon;
              const isRose = item.tone === "rose";
              return (
                <div key={item.label} className="rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-[0_4px_20px_rgba(32,58,99,.04)] transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.13em] text-[#64748B]">{item.label}</span>
                    <span className={`rounded-lg p-2 ${isRose ? "bg-[#FDF2F4] text-[#D9778F]" : "bg-[#EFF4FA] text-[#203A63]"}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#172A46]">{item.value}</span>
                    <span className="text-sm text-[#64748B]">/ {item.target}</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EEF2F6]">
                    <div className={`h-full rounded-full ${isRose ? "bg-[#D9778F]" : "bg-[#203A63]"}`} style={{ width: `${item.percent}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] font-semibold text-[#64748B]">
                    <span>{item.percent}% fulfilled</span>
                    <span className={isRose ? "text-[#C15D77]" : "text-[#31527D]"}>{item.left}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-[0_4px_20px_rgba(32,58,99,.04)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#64748B]">Consistency</p>
                <h3 className="mt-1 font-serif text-2xl text-[#172A46]">Your nutrition rhythm</h3>
              </div>
              <Link href="/insights" className="inline-flex items-center gap-1 text-xs font-bold text-[#31527D]">View insights <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="mt-7 flex h-44 items-end justify-between gap-3 px-2">
              {week.map(([day, value], index) => (
                <div key={`${day}-${index}`} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div className="flex h-full w-full items-end justify-center">
                    <div className={`w-full max-w-10 rounded-t-xl ${index === 3 || index === 5 ? "bg-[#203A63]" : "bg-[#DCE5F0]"}`} style={{ height: `${value}%` }} />
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748B]">{day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#F0D9DF] bg-[#FFF9FA] p-6 shadow-[0_4px_20px_rgba(217,119,143,.05)]">
            <div className="flex items-center gap-2 text-[#A84D68]">
              <Trophy className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.13em]">{t("exerciseTracker")}</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl leading-tight text-[#172A46]">{exerciseMinutes} minutes this week</h3>
            <p className="mt-3 text-sm leading-6 text-[#59677A]">You are close to your prenatal movement goal. Keep your routine gentle and consistent.</p>
            <Link href="/exercise" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#203A63] px-4 py-2.5 text-xs font-bold text-white shadow-sm">
              Open exercise log <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-[0_4px_20px_rgba(32,58,99,.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#64748B]">Today&apos;s care plan</p>
                <h3 className="mt-1 font-serif text-2xl text-[#172A46]">Small steps, clearly explained</h3>
              </div>
              <Link href="/doctor" className="text-xs font-bold text-[#31527D]">Open guidance</Link>
            </div>
            <div className="mt-5 space-y-3">
              {([
                "Take your prescribed supplement as directed by your healthcare professional.",
                "Include a protein-rich food in your next meal.",
                "Keep water nearby and stay hydrated throughout the day.",
              ]).map((text, i) => (
                <div key={text} className="flex gap-3 rounded-xl bg-[#F7F9FC] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF4FA] text-xs font-bold text-[#203A63]">{i + 1}</span>
                  <p className="text-sm leading-6 text-[#46566B]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#203A63] p-6 text-white shadow-[0_12px_32px_rgba(32,58,99,.14)]">
            <div className="flex items-center gap-2 text-[#F4A8B8]">
              <Mic className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.13em]">Ask Maternova</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl">Your care information, one question away.</h3>
            <p className="mt-3 text-sm leading-6 text-[#DCE6F5]">Ask about your logged nutrition, your uploaded guidance, or open the right insight with your voice.</p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#203A63]">
              <Mic className="h-4 w-4" /> Start speaking
            </button>
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-2 border-t border-[#E3E8EF] pt-6 text-xs text-[#718096] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Maternova provides information and tracking support; it does not replace professional medical care.</p>
          <Link href="/help" className="flex items-center gap-1 font-semibold text-[#31527D]">Help & Safety <CircleHelp className="h-3.5 w-3.5" /></Link>
        </footer>
      </div>
    </main>
  );
}
