// Plan price: average meal price x count, minus the tier discount.
export function planPrice(meals, planMeals, tiers) {
  const tier = tiers.find((t) => t.meals === planMeals)
  if (!tier || !meals.length) return { total: 0, perMeal: 0, saved: 0 }
  const avg = meals.reduce((s, m) => s + m.price, 0) / meals.length
  const gross = avg * planMeals
  const total = gross * (1 - tier.off)
  return { total, perMeal: total / planMeals, saved: gross - total }
}
export function avgMacros(meals) {
  if (!meals.length) return { kcal: 0, p: 0, c: 0, f: 0 }
  const n = meals.length
  const s = (k) => Math.round(meals.reduce((a, m) => a + m[k], 0) / n)
  return { kcal: s('kcal'), p: s('p'), c: s('c'), f: s('f') }
}
