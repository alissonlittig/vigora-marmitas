import { useMemo, useState } from 'react'
import { MEALS, GOALS, PLANS } from './data.js'
import { planPrice, avgMacros } from './calc.js'

const money = (n) => '$' + n.toFixed(2)

function Bowl({ tone }) {
  return (
    <svg viewBox="0 0 120 90" className="bowl" aria-hidden="true">
      <ellipse cx="60" cy="40" rx="48" ry="22" fill="#1b2a22" />
      <ellipse cx="60" cy="36" rx="42" ry="17" fill={tone} />
      <ellipse cx="42" cy="34" rx="14" ry="8" fill="#fff" opacity=".22" />
      <circle cx="78" cy="32" r="7" fill="#c6f24e" />
      <circle cx="68" cy="42" r="5" fill="#3f8a4f" />
      <path d="M12 44c4 28 28 38 48 38s44-10 48-38z" fill="#223a2c" />
      <path d="M20 52c6 18 24 26 40 26" stroke="#c6f24e" strokeOpacity=".35" strokeWidth="2" fill="none" />
    </svg>
  )
}

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Vigora home">
      <span className="mark"><svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true"><path d="M8 10l8 14 8-14" fill="none" stroke="#0f1a14" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      Vigora
    </a>
  )
}

const FAQ = [
  ['How fresh are the meals?', 'Cooked the day before delivery, chilled below 4 °C and delivered in insulated boxes. Each meal keeps 5 days in the fridge or 60 days frozen.'],
  ['Can I pause or skip a week?', 'Yes. Skip, pause or change your plan up to 48 hours before the weekly cut-off, straight from the app.'],
  ['Do you handle allergies?', 'Every dish lists its allergens. You can exclude gluten, lactose, nuts or shellfish and the menu rebuilds itself around that.'],
  ['Where do you deliver?', 'This is a fictional demo, so nowhere. In the concept, deliveries run Sunday and Wednesday evenings in 2-hour windows.'],
]

const QUOTES = [
  ['Hit my cut without counting a single thing. Lunch is solved.', 'Camila R.', 'Crossfit, fictional'],
  ['The bulking portions are real portions. Finally.', 'Diego M.', 'Powerlifter, fictional'],
  ['Two kids, one job, zero takeout. The skip button is a lifesaver.', 'Renata S.', 'Runner, fictional'],
]

export default function App() {
  const [goal, setGoal] = useState('all')
  const [demo, setDemo] = useState(false)
  const [picked, setPicked] = useState([1, 6, 2])
  const [tier, setTier] = useState(10)

  const shown = goal === 'all' ? MEALS : MEALS.filter((m) => m.goal === goal)
  const chosen = useMemo(() => MEALS.filter((m) => picked.includes(m.id)), [picked])
  const price = planPrice(chosen, tier, PLANS)
  const macros = avgMacros(chosen)
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  return (
    <>
      <header className="nav">
        <div className="wrap navin">
          <Logo />
          <nav aria-label="Main">
            <a href="#menu">Menu</a><a href="#plan">Plans</a><a href="#how">How it works</a><a href="#faq">FAQ</a>
          </nav>
          <a className="btn sm" href="#plan">Build my week</a>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="copy">
            <p className="eyebrow">Macro-counted meal prep</p>
            <h1>Train hard. <em>Eat on schedule.</em></h1>
            <p className="lead">Chef-cooked meals with every gram of protein, carb and fat on the label. Pick your goal, build your week in under a minute, and we deliver it cold to your door.</p>
            <div className="cta">
              <a className="btn" href="#plan">Build my week</a>
              <a className="btn ghost" href="#menu">See the menu</a>
            </div>
            <ul className="stats">
              <li><b>8</b><span>rotating dishes</span></li>
              <li><b>35–52 g</b><span>protein per cut meal</span></li>
              <li><b>48 h</b><span>to change your plan</span></li>
            </ul>
          </div>
          <div className="phonewrap" aria-hidden="true">
            <div className="phone">
              <div className="notch" />
              <p className="ph-t">Tomorrow, 18:00–20:00</p>
              <div className="ph-card"><Bowl tone="#f2b84e" /><div><b>Citrus chicken</b><small>420 kcal · 42 g protein</small></div></div>
              <div className="ph-card"><Bowl tone="#d9694a" /><div><b>Beef picadinho</b><small>640 kcal · 48 g protein</small></div></div>
              <div className="ph-bar"><i style={{ width: '72%' }} /></div>
              <small className="ph-s">Daily protein 144 / 200 g</small>
            </div>
            <div className="chip c1">Courier 6 min away</div>
            <div className="chip c2">Protein goal on track</div>
          </div>
        </section>

        <section id="how" className="wrap sec">
          <h2>Three steps. Zero meal-prep Sundays.</h2>
          <ol className="steps">
            <li><span>01</span><h3>Set your goal</h3><p>Cutting, maintaining or bulking. We size portions and macros to match.</p></li>
            <li><span>02</span><h3>Pick your meals</h3><p>Choose from the weekly menu. Swap anything until the cut-off.</p></li>
            <li><span>03</span><h3>Heat and eat</h3><p>Delivered chilled, ready in 3 minutes. Recyclable trays, nothing to wash.</p></li>
          </ol>
        </section>

        <section id="menu" className="wrap sec">
          <div className="head">
            <h2>This week's menu</h2>
            <div className="tabs" role="group" aria-label="Filter by goal">
              {GOALS.map((g) => (
                <button key={g.id} aria-pressed={goal === g.id} onClick={() => setGoal(g.id)}>{g.label}</button>
              ))}
            </div>
          </div>
          <ul className="grid">
            {shown.map((m) => {
              const on = picked.includes(m.id)
              return (
                <li key={m.id} className={'card' + (on ? ' on' : '')}>
                  <div className="art"><Bowl tone={m.tone} /></div>
                  <h3>{m.name}</h3>
                  <div className="macros" aria-label="Macros">
                    <span><b>{m.kcal}</b>kcal</span><span><b>{m.p}g</b>protein</span><span><b>{m.c}g</b>carbs</span><span><b>{m.f}g</b>fat</span>
                  </div>
                  <div className="row">
                    <strong>{money(m.price)}</strong>
                    <button className="btn sm" aria-pressed={on} onClick={() => toggle(m.id)}>{on ? 'Added' : 'Add to plan'}</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section id="plan" className="wrap sec">
          <div className="plan">
            <div>
              <h2>Your week, priced live</h2>
              <p className="lead">Bigger plans cost less per meal. The price follows the dishes you picked above.</p>
              <div className="tiers" role="radiogroup" aria-label="Meals per week">
                {PLANS.map((t) => (
                  <button key={t.meals} role="radio" aria-checked={tier === t.meals} onClick={() => setTier(t.meals)}>
                    <b>{t.meals}</b><span>meals{t.off ? ` · −${Math.round(t.off * 100)}%` : ''}</span>
                  </button>
                ))}
              </div>
            </div>
            <aside className="sum" aria-live="polite">
              <p className="eyebrow">Weekly total</p>
              <p className="tot">{money(price.total)}</p>
              <p className="muted">{chosen.length ? `${money(price.perMeal)} per meal · you save ${money(price.saved)}` : 'Add at least one meal to see a price'}</p>
              <div className="bars">
                {[['Protein', macros.p, 60], ['Carbs', macros.c, 90], ['Fat', macros.f, 30]].map(([l, v, max]) => (
                  <div key={l}><span>{l}</span><i><u style={{ width: Math.min(100, (v / max) * 100) + '%' }} /></i><b>{v}g</b></div>
                ))}
              </div>
              <p className="muted">Average per meal · {macros.kcal} kcal</p>
              <button className="btn full" onClick={() => setDemo(true)}>Checkout (demo, no orders)</button>
              {demo && <p className="muted" role="status">Demo only: no order was placed and no payment was taken.</p>}
            </aside>
          </div>
        </section>

        <section className="wrap sec">
          <h2>People who stopped guessing</h2>
          <div className="quotes">
            {QUOTES.map(([q, n, r]) => (
              <figure key={n}><blockquote>“{q}”</blockquote><figcaption><b>{n}</b> {r}</figcaption></figure>
            ))}
          </div>
        </section>

        <section id="faq" className="wrap sec narrow">
          <h2>Questions</h2>
          {FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
        </section>

        <section className="wrap sec">
          <div className="final">
            <h2>Your next 21 meals, handled.</h2>
            <a className="btn dark" href="#plan">Build my week</a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <Logo />
          <p>Vigora is a fictional brand created for a portfolio. All dishes, prices, reviews and people are made up. No orders are processed and no data is collected.</p>
        </div>
      </footer>
    </>
  )
}
