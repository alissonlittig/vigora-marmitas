import { describe, it, expect } from 'vitest'
import { planPrice, avgMacros } from '../src/calc.js'
import { MEALS, PLANS } from '../src/data.js'

describe('planPrice', () => {
  it('applies the tier discount', () => {
    const r = planPrice([{ price: 10 }], 10, PLANS)
    expect(r.total).toBeCloseTo(92)
    expect(r.saved).toBeCloseTo(8)
    expect(r.perMeal).toBeCloseTo(9.2)
  })
  it('returns zeros for empty selection or unknown tier', () => {
    expect(planPrice([], 10, PLANS).total).toBe(0)
    expect(planPrice(MEALS, 7, PLANS).total).toBe(0)
  })
})
describe('avgMacros', () => {
  it('averages and rounds', () => {
    expect(avgMacros([{ kcal: 400, p: 40, c: 30, f: 10 }, { kcal: 500, p: 41, c: 31, f: 11 }]).kcal).toBe(450)
    expect(avgMacros([]).p).toBe(0)
  })
})
