"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Flame,
  Target,
  TrendingUp,
  Utensils,
  Clock3,
  CheckCircle2,
  Sparkles,
  X,
  Apple,
  Coffee,
  Sun,
  Moon,
  Search,
} from "lucide-react";

type Meal = {
  id: number;
  type: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const initialMeals: Meal[] = [
  {
    id: 1,
    type: "Breakfast",
    name: "2 Idlis + Sambar + 1 Egg",
    calories: 390,
    protein: 18,
    carbs: 54,
    fat: 11,
  },
  {
    id: 2,
    type: "Morning Snack",
    name: "Banana + Milk",
    calories: 220,
    protein: 9,
    carbs: 35,
    fat: 6,
  },
  {
    id: 3,
    type: "Lunch",
    name: "Rice + Dal + Chicken + Vegetables",
    calories: 620,
    protein: 36,
    carbs: 72,
    fat: 17,
  },
];

const calorieTarget = 2200;
const proteinTarget = 75;
const carbsTarget = 280;
const fatTarget = 70;

export default function NutritionPage() {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mealType, setMealType] = useState("Dinner");
  const [mealName, setMealName] = useState("");
  const [mealSuggestions, setMealSuggestions] = useState<string[]>([]);
  const [analysisText, setAnalysisText] = useState("");

  const totals = useMemo(() => {
    return meals.reduce(
      (total, meal) => ({
        calories: total.calories + meal.calories,
        protein: total.protein + meal.protein,
        carbs: total.carbs + meal.carbs,
        fat: total.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [meals]);

  const calorieProgress = Math.min((totals.calories / calorieTarget) * 100, 100);
  const proteinProgress = Math.min((totals.protein / proteinTarget) * 100, 100);
  const carbsProgress = Math.min((totals.carbs / carbsTarget) * 100, 100);
  const fatProgress = Math.min((totals.fat / fatTarget) * 100, 100);

  function getMealIcon(type: string) {
    if (type === "Breakfast") return <Coffee className="h-5 w-5" />;
    if (type === "Morning Snack" || type === "Evening Snack") return <Apple className="h-5 w-5" />;
    if (type === "Lunch") return <Sun className="h-5 w-5" />;
    return <Moon className="h-5 w-5" />;
  }

  function handleMealInputChange(value: string) {
    setMealName(value);
    if (!value.trim()) {
      setMealSuggestions([]);
      return;
    }

    fetch("/api/nutrition/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mealName: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data?.suggestions)) {
          setMealSuggestions(data.suggestions);
        }
      })
      .catch(() => {
        setMealSuggestions([]);
      });
  }

  async function addMeal() {
    if (!mealName.trim()) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/nutrition/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealName, description: mealName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to analyze meal.");
      }

      const evaluatedMeal = data?.meal;

      const newMeal: Meal = {
        id: Date.now(),
        type: mealType,
        name: evaluatedMeal?.name || mealName,
        calories: Number(evaluatedMeal?.calories ?? 0),
        protein: Number(evaluatedMeal?.protein ?? 0),
        carbs: Number(evaluatedMeal?.carbs ?? 0),
        fat: Number(evaluatedMeal?.fat ?? 0),
      };

      setMeals((currentMeals) => [...currentMeals, newMeal]);
      setAnalysisText(evaluatedMeal?.summary || "Meal added successfully.");
    } catch (error) {
      const fallbackMeal: Meal = {
        id: Date.now(),
        type: mealType,
        name: mealName,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };

      setMeals((currentMeals) => [...currentMeals, fallbackMeal]);
      setAnalysisText(
        error instanceof Error ? error.message : "Meal added with estimated values."
      );
    } finally {
      setIsAnalyzing(false);
      setMealName("");
      setMealSuggestions([]);
      setMealType("Dinner");
      setShowAddMeal(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-6 py-8 text-[#172b4d] md:px-10 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#c95d7d]">
              <span className="h-2 w-2 rounded-full bg-[#d97896]" />
              Nutrition
            </div>

            <h1 className="font-serif text-4xl font-medium tracking-[-0.03em] text-[#172b4d] md:text-5xl">
              Your nutrition today
            </h1>

            <p className="mt-3 text-[15px] leading-7 text-[#66758f]">
              Track your meals and understand your daily nutrition.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddMeal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#172b4d] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#172b4d]/15 transition hover:bg-[#243e66]"
          >
            <Plus className="h-4 w-4" />
            Add meal
          </button>
        </div>

        <section className="mb-7 rounded-[28px] bg-gradient-to-br from-[#172b4d] via-[#1e3a63] to-[#293e6b] p-7 text-white shadow-[0_16px_45px_rgba(23,43,77,0.12)] md:p-9">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#f09ab1]">
                <Sparkles className="h-4 w-4" />
                Today&apos;s nutrition
              </div>

              <h2 className="font-serif text-3xl font-medium md:text-4xl">
                You&apos;re building a balanced day.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d8e0ee]">
                Keep logging what you eat so Maternova can help you understand your nutrition patterns and progress.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-[#eef2f8]">
                  {meals.length} meals logged
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-[#eef2f8]">
                  {Math.max(calorieTarget - totals.calories, 0)} kcal remaining
                </div>
                <div className="rounded-full bg-[#d97896]/20 px-4 py-2 text-xs font-medium text-[#f5b5c5]">
                  {Math.max(proteinTarget - totals.protein, 0)}g protein remaining
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[14px] border-white/10">
                <div
                  className="absolute inset-[-14px] rounded-full"
                  style={{
                    background: `conic-gradient(#df7897 ${calorieProgress * 3.6}deg, transparent 0deg)`,
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 0)",
                    mask:
                      "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 0)",
                  }}
                />

                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b9c6d9]">
                    Calories
                  </p>
                  <p className="mt-1 text-4xl font-semibold">
                    {totals.calories.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-[#b9c6d9]">
                    of {calorieTarget.toLocaleString()} kcal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <NutritionCard icon={<Flame className="h-5 w-5" />} label="Calories" value={totals.calories.toLocaleString()} target={`${calorieTarget.toLocaleString()} kcal`} progress={calorieProgress} accent="rose" />
          <NutritionCard icon={<Target className="h-5 w-5" />} label="Protein" value={`${totals.protein}g`} target={`${proteinTarget}g`} progress={proteinProgress} accent="navy" />
          <NutritionCard icon={<TrendingUp className="h-5 w-5" />} label="Carbohydrates" value={`${totals.carbs}g`} target={`${carbsTarget}g`} progress={carbsProgress} accent="rose" />
          <NutritionCard icon={<Utensils className="h-5 w-5" />} label="Fat" value={`${totals.fat}g`} target={`${fatTarget}g`} progress={fatProgress} accent="navy" />
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-[26px] border border-[#e3e7ee] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#172b4d]">
                  Today&apos;s meals
                </h2>
                <p className="mt-1 text-sm text-[#8390a5]">
                  Your recorded food intake
                </p>
              </div>
              <span className="rounded-full bg-[#fbeaf0] px-3 py-1.5 text-xs font-semibold text-[#b94f6d]">
                {meals.length} logged
              </span>
            </div>

            <div className="space-y-3">
              {meals.map((meal) => (
                <div key={meal.id} className="group rounded-2xl border border-[#e7eaf0] bg-[#fbfcfe] p-4 transition hover:border-[#e0b8c5] hover:bg-[#fffafb]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef2f8] text-[#29476f] transition group-hover:bg-[#fbeaf0] group-hover:text-[#c95d7d]">
                      {getMealIcon(meal.type)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-[#172b4d]">{meal.type}</h3>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8994a8]">
                          {meal.calories} kcal
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm text-[#66758f]">{meal.name}</p>
                    </div>

                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-semibold text-[#29476f]">{meal.protein}g protein</p>
                      <p className="mt-1 text-xs text-[#8994a8]">{meal.carbs}g carbs · {meal.fat}g fat</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={() => setShowAddMeal(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d8dee8] py-4 text-sm font-semibold text-[#52627c] transition hover:border-[#d97896] hover:bg-[#fff9fb] hover:text-[#b94f6d]">
              <Plus className="h-4 w-4" />
              Add another meal
            </button>
          </section>

          <section className="overflow-hidden rounded-[26px] bg-gradient-to-b from-[#172b4d] to-[#243e66] p-7 text-white shadow-[0_16px_40px_rgba(23,43,77,0.12)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Sparkles className="h-5 w-5 text-[#e486a0]" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#b9c6d9]">
              Maternova insight
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium leading-tight">
              {totals.protein >= proteinTarget ? "Great protein progress today." : "You can still strengthen your protein intake."}
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#d6dfec]">
              {totals.protein >= proteinTarget
                ? "You have reached your current protein target. Continue following the nutrition guidance provided by your healthcare professional."
                : `You have ${Math.max(proteinTarget - totals.protein, 0)}g of your current protein target remaining.`}
            </p>

            <div className="mt-7 rounded-2xl bg-white/10 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#d8e0ee]">Protein progress</span>
                <span className="text-sm font-semibold text-[#f1a0b7]">{Math.round(proteinProgress)}%</span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#df7897] transition-all" style={{ width: `${proteinProgress}%` }} />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#e486a0]" />
                <div>
                  <p className="text-sm font-semibold">Keep logging consistently</p>
                  <p className="mt-1 text-xs leading-5 text-[#b9c6d9]">
                    Your meal history helps Maternova show meaningful patterns in Insights.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <SmallInfoCard title="Meals logged" value={`${meals.length}`} subtitle="Today" icon={<Utensils className="h-5 w-5" />} />
          <SmallInfoCard title="Calories remaining" value={`${Math.max(calorieTarget - totals.calories, 0)}`} subtitle="kcal in today's target" icon={<Flame className="h-5 w-5" />} />
          <SmallInfoCard title="Last meal" value={meals[meals.length - 1]?.type || "None"} subtitle={meals[meals.length - 1]?.name || "No meal logged"} icon={<Clock3 className="h-5 w-5" />} />
        </section>

        <section className="mt-6 rounded-[20px] border border-[#e7dfe3] bg-[#fffafb] p-5">
          <div className="flex items-start gap-3">
            <ShieldIcon />
            <div>
              <p className="text-sm font-semibold text-[#172b4d]">Nutrition guidance</p>
              <p className="mt-1 text-xs leading-6 text-[#748198]">
                Maternova helps you record and understand your food intake. Nutrition targets shown in this prototype are illustrative and should not replace individualized guidance from your healthcare professional.
              </p>
            </div>
          </div>
        </section>
      </div>

      {showAddMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172b4d]/50 p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] border border-[#e2e6ee] bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fbeaf0] text-[#c95d7d]">
                  <Plus className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-3xl font-medium text-[#172b4d]">Add a meal</h2>
                <p className="mt-2 text-sm text-[#718099]">
                  Add the nutrition information from your meal.
                </p>
              </div>

              <button type="button" onClick={() => setShowAddMeal(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f6f8] text-[#66758f] transition hover:bg-[#fbeaf0] hover:text-[#c95d7d]">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#718099]">
                  Meal type
                </label>
                <select value={mealType} onChange={(event) => setMealType(event.target.value)} className="w-full rounded-xl border border-[#dfe4ec] bg-[#fafbfc] px-4 py-3 text-sm text-[#172b4d] outline-none transition focus:border-[#d97896] focus:ring-2 focus:ring-[#d97896]/10">
                  <option>Breakfast</option>
                  <option>Morning Snack</option>
                  <option>Lunch</option>
                  <option>Evening Snack</option>
                  <option>Dinner</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#718099]">
                  What did you eat?
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa5b7]" />
                  <input value={mealName} onChange={(event) => handleMealInputChange(event.target.value)} placeholder="Example: Paneer dosa or dal khichdi" className="w-full rounded-xl border border-[#dfe4ec] bg-[#fafbfc] px-10 py-3 text-sm text-[#172b4d] outline-none placeholder:text-[#a0a9b8] focus:border-[#d97896] focus:ring-2 focus:ring-[#d97896]/10" />
                </div>
                {mealSuggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {mealSuggestions.map((item) => (
                      <button key={item} type="button" onClick={() => setMealName(item)} className="rounded-full border border-[#f1bfd0] bg-[#fff9fb] px-3 py-1.5 text-xs font-medium text-[#b94f6d] hover:bg-[#fbeaf0]">
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {analysisText && (
                <div className="rounded-2xl border border-[#f3dfe6] bg-[#fffafc] p-3 text-xs leading-6 text-[#5d6777]">
                  {analysisText}
                </div>
              )}

              <button type="button" onClick={addMeal} disabled={!mealName.trim() || isAnalyzing} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#172b4d] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#243e66] disabled:cursor-not-allowed disabled:opacity-40">
                <CheckCircle2 className="h-4 w-4" />
                {isAnalyzing ? "Analyzing meal..." : "Save meal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function NutritionCard({ icon, label, value, target, progress, accent }: { icon: React.ReactNode; label: string; value: string; target: string; progress: number; accent: "rose" | "navy"; }) {
  const iconClass = accent === "rose" ? "bg-[#fbeaf0] text-[#c95d7d]" : "bg-[#edf2fa] text-[#29476f]";
  const progressClass = accent === "rose" ? "bg-[#d97896]" : "bg-[#29476f]";

  return (
    <div className="rounded-[22px] border border-[#e3e7ee] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}>
          {icon}
        </div>
        <span className="text-xs font-medium text-[#8994a8]">Today</span>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#8490a4]">{label}</p>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-[#172b4d]">{value}</span>
        <span className="text-xs text-[#8b96a9]">/ {target}</span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#edf0f4]">
        <div className={`h-full rounded-full ${progressClass}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function SmallInfoCard({ title, value, subtitle, icon }: { title: string; value: string; subtitle: string; icon: React.ReactNode; }) {
  return (
    <div className="flex items-center gap-4 rounded-[20px] border border-[#e3e7ee] bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf2fa] text-[#29476f]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8994a8]">{title}</p>
        <p className="mt-1 truncate text-lg font-semibold text-[#172b4d]">{value}</p>
        <p className="truncate text-xs text-[#8a96aa]">{subtitle}</p>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fbeaf0] text-[#c95d7d]">
      <CheckCircle2 className="h-5 w-5" />
    </div>
  );
}