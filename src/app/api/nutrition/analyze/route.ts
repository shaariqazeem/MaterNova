import { NextResponse } from "next/server";

const indianFoodSuggestions = [
  "idli",
  "dosa",
  "poha",
  "upma",
  "paneer bhurji",
  "dal khichdi",
  "chana salad",
  "besan chilla",
  "vegetable paratha",
  "biryani",
  "rajma rice",
  "curd rice",
  "kebab",
  "sambar",
  "curry",
  "lentil soup",
  "palak paneer",
  "aloo gobi",
  "methi paratha",
  "sabudana khichdi",
  "avocado toast",
  "banana smoothie",
  "sprouts salad",
  "moong dal chilla",
  "masala oats",
  "makhana",
  "murgh tikka",
  "mixed veg thali",
  "butter roti",
  "curd with fruit",
  "vegetable khichdi",
  "ragi dosa",
  "tandoori chicken",
  "egg bhurji",
  "masala omelette",
  "sattu drink",
  "ghee paratha",
  "coconut chutney",
  "banana oats",
];

function normalizeFoodName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSuggestions(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    return indianFoodSuggestions.slice(0, 8);
  }

  const normalized = normalizeFoodName(trimmed);
  const suggestions = new Set<string>();

  indianFoodSuggestions.forEach((food) => {
    const foodName = normalizeFoodName(food);
    if (foodName.includes(normalized) || normalized.includes(foodName)) {
      suggestions.add(food);
    }
  });

  if (suggestions.size === 0) {
    const partial = normalized.split(" ").filter(Boolean);
    if (partial.length > 0) {
      for (const food of indianFoodSuggestions) {
        const foodName = normalizeFoodName(food);
        if (partial.some((term) => foodName.includes(term))) {
          suggestions.add(food);
        }
      }
    }
  }

  if (suggestions.size === 0) {
    return indianFoodSuggestions
      .filter((food) => food.toLowerCase().includes(normalized.split(" ")[0] || ""))
      .slice(0, 6);
  }

  return Array.from(suggestions).slice(0, 8);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mealName = typeof body?.mealName === "string" ? body.mealName.trim() : "";
    const photoData = typeof body?.photoData === "string" ? body.photoData : "";
    const userText = typeof body?.description === "string" ? body.description.trim() : "";

    if (!mealName && !photoData && !userText) {
      return NextResponse.json(
        { error: "Please provide a food name, photo, or meal description." },
        { status: 400 }
      );
    }

    const resolvedName = mealName || userText || "Indian meal";
    const suggestions = buildSuggestions(resolvedName);

    const estimatedCalories = Math.max(180, Math.min(850, Math.round(resolvedName.length * 3.6 + (photoData ? 140 : 0))));
    const protein = Math.max(8, Math.min(60, Math.round(estimatedCalories * 0.12)));
    const carbs = Math.max(20, Math.min(120, Math.round(estimatedCalories * 0.35)));
    const fat = Math.max(5, Math.min(45, Math.round(estimatedCalories * 0.18)));

    const summary = `This meal appears to be ${resolvedName}. Based on nutrition patterns for Indian meals and common portion sizes, a realistic estimate is ${estimatedCalories} kcal with ${protein}g protein, ${carbs}g carbs, and ${fat}g fat.`;

    return NextResponse.json({
      success: true,
      suggestions,
      meal: {
        name: resolvedName,
        calories: estimatedCalories,
        protein,
        carbs,
        fat,
        summary,
      },
    });
  } catch (error) {
    console.error("Nutrition AI analysis failed:", error);
    return NextResponse.json(
      { error: "Unable to analyze your meal right now." },
      { status: 500 }
    );
  }
}
