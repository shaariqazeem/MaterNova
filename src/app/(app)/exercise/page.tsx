"use client";

import {
  Activity,
  Clock3,
  Dumbbell,
  Heart,
  Plus,
  Save,
  Sparkles,
  StretchHorizontal,
  TimerReset,
  Trash2,
  Trophy,
  Waves,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/lib/i18n";

const defaultTemplates = [
  { id: "walk", name: "Walking", icon: "Waves", type: "Cardio", accent: "from-[#d7f0ff] to-[#cfe7ff]" },
  { id: "strength", name: "Strength", icon: "Dumbbell", type: "Strength", accent: "from-[#fce5ee] to-[#ffd8e8]" },
  { id: "stretch", name: "Stretch", icon: "StretchHorizontal", type: "Mobility", accent: "from-[#eff7e3] to-[#e4f3d3]" },
];

type ExerciseTemplate = {
  id: string;
  name: string;
  type: string;
  accent: string;
};

type ExerciseLog = {
  id: string;
  name: string;
  duration: number;
  notes: string;
  date: string;
};

function getStoredJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function ExercisePage() {
  const { t } = useLanguage();
  const [templates, setTemplates] = useState<ExerciseTemplate[]>(
    () => getStoredJSON("maternova-exercise-templates", defaultTemplates)
  );
  const [logs, setLogs] = useState<ExerciseLog[]>(
    () => getStoredJSON("maternova-exercise-logs", [
      { id: "1", name: "Walking", duration: 25, notes: "Gentle evening walk", date: "2026-10-08" },
      { id: "2", name: "Stretch", duration: 15, notes: "Mobility routine", date: "2026-10-06" },
    ])
  );
  const [templateName, setTemplateName] = useState("");
  const [exerciseName, setExerciseName] = useState("Walking");
  const [duration, setDuration] = useState(20);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    localStorage.setItem("maternova-exercise-templates", JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem("maternova-exercise-logs", JSON.stringify(logs));
  }, [logs]);

  const totalMinutes = useMemo(
    () => logs.reduce((sum, item) => sum + Number(item.duration || 0), 0),
    [logs]
  );

  function addTemplate() {
    if (!templateName.trim()) return;
    const next: ExerciseTemplate = {
      id: `${Date.now()}`,
      name: templateName.trim(),
      type: "Custom",
      accent: "from-[#efe7ff] to-[#e0d5ff]",
    };
    setTemplates((current) => [next, ...current]);
    setExerciseName(next.name);
    setTemplateName("");
  }

  function deleteTemplate(id: string) {
    setTemplates((current) => {
      const selected = current.find((template) => template.id === id);
      const updated = current.filter((template) => template.id !== id);

      if (selected && exerciseName === selected.name && updated.length > 0) {
        setExerciseName(updated[0].name);
      }

      return updated;
    });
  }

  function addLog() {
    if (!exerciseName.trim()) return;
    const entry: ExerciseLog = {
      id: `${Date.now()}`,
      name: exerciseName.trim(),
      duration: Number(duration) || 0,
      notes: notes.trim() || "No notes",
      date: new Date().toISOString(),
    };
    setLogs((current) => [entry, ...current]);
    setNotes("");
    setDuration(20);
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] p-6 text-[#172b4d] lg:p-10">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a96aa]">{t("wellness")}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">{t("exerciseTracker")}</h1>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[#e6eaf0] bg-white px-4 py-2.5 shadow-sm">
            <Trophy className="h-4 w-4 text-[#d6537a]" />
            <span className="text-sm font-semibold text-[#495c78]">{totalMinutes} {t("activeMinutes")}</span>
          </div>
        </header>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[30px] border border-[#e9edf4] bg-gradient-to-br from-[#172b4d] via-[#203a63] to-[#30507e] p-7 text-white shadow-[0_18px_32px_rgba(23,43,77,0.12)]">
            <div className="mb-5 flex items-center gap-2 text-[#f2bfd0]">
              <Heart className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">{t("pregnancyMovement")}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-4xl leading-tight">{t("gentleMovement")}</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#d9e8f7]">{t("gentleMovementText")}</p>
              </div>
              <div className="hidden h-32 w-32 items-center justify-center rounded-[28px] bg-white/10 shadow-inner md:flex">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 rounded-full border-4 border-[#f7bfd0] animate-pulse" />
                  <div className="absolute inset-3 rounded-full border-4 border-white/80" />
                  <div className="absolute inset-8 rounded-full bg-[#f7bfd0]" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#eaeef3] bg-white p-5 shadow-[0_12px_40px_rgba(23,43,77,0.06)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5f7fb] text-[#29476f]">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a96aa]">{t("thisWeek")}</p>
                <h3 className="text-2xl font-bold">{totalMinutes} min</h3>
              </div>
            </div>

            <div className="space-y-3">
              {[55, 75, 90, 100].map((goal, index) => (
                <div key={goal}>
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#6c7a90]">
                    <span>Goal {index + 1}</span>
                    <span>{goal} min</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#edf1f6]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#d97896] to-[#203a63]"
                      style={{ width: `${Math.min((totalMinutes / goal) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          { [
            { title: "Walking", text: "A gentle way to improve circulation and lift your mood.", icon: Waves },
            { title: "Strength", text: "Gradual strength work supports posture and overall stability.", icon: Dumbbell },
            { title: "Stretch", text: "Reduce tension and keep your body feeling more relaxed.", icon: StretchHorizontal },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[24px] border border-[#e7edf5] bg-white p-5 shadow-[0_8px_24px_rgba(23,43,77,0.04)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffe7ef] to-[#dfeefd] text-[#c3476c]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#172b4d]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#64748B]">{item.text}</p>
              </div>
            );
          }) }
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-[#e9edf4] bg-white p-6 shadow-[0_12px_36px_rgba(23,43,77,0.04)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7f0f6] text-[#c3476c]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a96aa]">{t("templates")}</p>
                <h3 className="text-2xl font-bold">{t("createRoutine")}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  value={templateName}
                  onChange={(event) => setTemplateName(event.target.value)}
                  placeholder={t("templateName")}
                  className="h-12 flex-1 rounded-2xl border border-[#e3e7ee] bg-[#f9fafc] px-4 text-sm text-[#172b4d] outline-none focus:border-[#d97896] focus:ring-3 focus:ring-[#f6d8e2]"
                />
                <button onClick={addTemplate} className="inline-flex items-center justify-center rounded-2xl bg-[#172b4d] px-4 py-3 text-sm font-semibold text-white">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`rounded-[22px] border border-[#e9edf4] bg-gradient-to-br ${template.accent} p-4 text-left transition hover:-translate-y-0.5`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <button type="button" onClick={() => setExerciseName(template.name)} className="flex-1 text-left">
                        <span className="text-lg font-bold text-[#172b4d]">{template.name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTemplate(template.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 text-[#b83f67] transition hover:bg-white"
                        aria-label={`Delete ${template.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="mt-3 inline-block rounded-full bg-white/60 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5d6f8f]">{template.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#e9edf4] bg-white p-6 shadow-[0_12px_36px_rgba(23,43,77,0.04)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf6ff] text-[#29476f]">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a96aa]">{t("workoutLog")}</p>
                <h3 className="text-2xl font-bold">{t("addYourSession")}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#73829a]">{t("exerciseTracker")}</label>
                <select
                  value={exerciseName}
                  onChange={(event) => setExerciseName(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#e3e7ee] bg-[#f9fafc] px-4 text-sm text-[#172b4d] outline-none focus:border-[#d97896] focus:ring-3 focus:ring-[#f6d8e2]"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.name}>{template.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#73829a]">{t("duration")}</label>
                <input
                  type="number"
                  min={5}
                  value={duration}
                  onChange={(event) => setDuration(Number(event.target.value))}
                  className="h-12 w-full rounded-2xl border border-[#e3e7ee] bg-[#f9fafc] px-4 text-sm text-[#172b4d] outline-none focus:border-[#d97896] focus:ring-3 focus:ring-[#f6d8e2]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#73829a]">{t("notes")}</label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-[#e3e7ee] bg-[#f9fafc] px-4 py-3 text-sm text-[#172b4d] outline-none focus:border-[#d97896] focus:ring-3 focus:ring-[#f6d8e2]"
                  placeholder="Felt good, easy breathing, 10 min warm-up"
                />
              </div>

              <button onClick={addLog} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#172b4d] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(23,43,77,0.14)]">
                <Save className="h-4 w-4" /> {t("saveSession")}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[28px] border border-[#e9edf4] bg-white p-6 shadow-[0_12px_36px_rgba(23,43,77,0.04)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef7f1] text-[#2a6f5b]">
              <TimerReset className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-bold text-[#172b4d]">{t("recentActivityTitle")}</h3>
          </div>

          <div className="space-y-3">
            {logs.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 rounded-2xl border border-[#edf1f6] bg-[#f9fafc] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-base font-bold text-[#172b4d]">{item.name}</div>
                  <div className="text-sm text-[#6a7d92]">{item.notes}</div>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-[#465a78]">
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <span className="rounded-full bg-[#fff0f4] px-2.5 py-1 text-[#c3476c]">{item.duration} min</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
