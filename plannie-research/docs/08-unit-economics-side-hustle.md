# Unit economics — 100 clients, phone-first, AI-managed side hustle

**Goal:** ~100 paying pros, run mostly by you + AI (not a full company).  
**Constraint:** mobile-only product (no desktop investment).  
**Competitor anchor:** Plannie (IL).

---

## 1. Competitor price anchor (Plannie, ILS)

| Plan | Monthly | Annual (eff. /mo) | Notes |
|------|---------|-------------------|--------|
| Entry | ₪59 | ₪49 | Cap 6 services, 50 events/mo |
| Plus | ₪79 | ₪69 | Solo workhorse |
| Team | ₪99 | ₪89 | +₪39/station |
| Premium | ₪127 | ₪112 | Higher limits |
| Premium Payments | ₪119 | ₪99 | Payments-oriented |

**Realistic blended ARPU if you clone their mix:** ~₪70–90/mo.  
Reviews already say Plannie feels **expensive for what you get** → room to win on **price clarity + WhatsApp + simpler UX**, not only undercutting.

---

## 2. Recommended offer (phone-first side hustle)

| Tier | Price | Who | Included |
|------|-------|-----|----------|
| **Starter** | **₪49/mo** (or ₪470/yr ≈ ₪39/mo) | Solo, under 80 appts/mo | Booking page, calendar, WA/SMS reminders (fair-use), 1 staff |
| **Pro** | **₪69/mo** (₪690/yr ≈ ₪57.5) | Busy solo | Unlimited appts*, deposits, punch cards, campaigns fair-use |
| **Studio** | **₪99/mo** (+₪29/extra staff) | 2–4 chairs | Multi-staff, shared inbox |

\*Fair-use caps stop SMS abuse; soft limit then pay-as-you-go pack.

**Positioning vs Plannie:** same or slightly cheaper than Entry/Plus, **WhatsApp-native**, honest free trial (7–14 days) or free forever tiny tier (1 service, 20 appts) if you want viral install — optional.

**Target mix at 100 clients:** 60 Starter / 30 Pro / 10 Studio → blended **~₪59 ARPU**.

---

## 3. Revenue at 100 clients

| Mix | ARPU | MRR | ARR |
|-----|------|-----|-----|
| Conservative (mostly Starter) | ₪55 | ₪5,500 | ₪66,000 |
| **Base (recommended mix)** | **₪59** | **₪5,900** | **₪70,800** |
| Optimistic (more Pro/Studio) | ₪75 | ₪7,500 | ₪90,000 |

Add-ons (optional upside, don’t depend on for base case):
- SMS/WA packs: ₪29 for 300 msgs  
- Payment take-rate: **avoid at first** (ops + KYC hell); or 1% later once stable  

**Side-hustle take-home before tax (base):** see §6.

---

## 4. Cost structure (COGS + fixed)

### 4a. Variable — messaging (the real COGS)

Assume average solo: **80 appointments/mo**, **2 reminders each** = 160 utility messages/mo/client.

| Channel | Unit cost (IL) | 160 msgs | Notes |
|---------|----------------|----------|--------|
| **WhatsApp utility** | ~$0.0053 ≈ **₪0.02** | **~₪3.2** | Meta rate card; utility = appointment reminders. Prefer this. |
| Local SMS aggregator | ~**₪0.06–0.12** (use ₪0.08) | **~₪13** | InforU / 019-class; Twilio IL ~$0.26 = **avoid** |
| Twilio SMS IL | ~$0.26 ≈ ₪0.95 | ~₪150 | Kills margin — do not use as default |

**Policy for margin:** WhatsApp-first; SMS fallback only; bill overages.

At 100 clients × ₪3–8 messaging COGS (WA-heavy) → **₪300–800/mo** total messaging.

### 4b. Fixed / semi-fixed (AI side hustle stack)

| Item | Monthly (ILS, approx) |
|------|------------------------|
| Hosting (Vercel/Fly/Railway + Postgres e.g. Neon/Supabase) | ₪150–400 |
| Object storage / CDN | ₪30–80 |
| Error/analytics (Sentry/PostHog free→paid) | ₪0–150 |
| AI APIs (support drafts, onboarding help, copy) | ₪100–300 |
| Domain + Apple/Google if native later | ₪0–150 (PWA first = ~0) |
| Payment fees on SaaS subs (~3% + VAT handling) | ~3% of MRR |
| Misc (Meta WA BSP if not Cloud API direct) | ₪0–200 |

**Fixed stack budget:** ~**₪400–1,200/mo** at 100 clients (PWA, lean).

### 4c. Payment processing on SaaS revenue

PayPlus/PayPal/Stripe-like: assume **~3% + ₪0.5** → on ₪5,900 ≈ **₪180–220/mo**.

### 4d. Your time (the hidden cost)

AI-managed means:
- Self-serve product + docs  
- AI for L1 support (Hebrew/English)  
- You: escalations, billing, outages, onboarding VIP  

| Clients | Support load if product is sharp | Hours/week |
|---------|----------------------------------|------------|
| 25 | Light | 2–4 |
| 50 | Medium | 4–7 |
| **100** | Manageable if AI + great UX | **6–12** |

If you’re spending &gt;12h/week at 100, product/automation is wrong — not “hire,” **simplify**.

Value your hour at ₪200–400 for opportunity cost (below).

---

## 5. Unit economics (per paying client / month)

**Base client (Starter-ish, WA reminders):**

| | ₪ |
|--|---|
| Revenue | 59 |
| Payment fee (~3%) | −1.8 |
| Messaging COGS | −4 |
| Infra allocate (₪600/100) | −6 |
| AI allocate | −2 |
| **Contribution** | **~₪45** |
| **Contribution margin** | **~76%** |

**If SMS-heavy instead of WA:** messaging −13 → contribution ~₪36 (still OK).  
**If Twilio SMS:** contribution collapses — don’t.

**Payback / CAC (side hustle):**
- Organic WhatsApp groups, Facebook beauty groups, SEO, referrals: CAC **₪0–150**  
- Light Meta ads: CAC **₪100–300** if landing converts  
- At ₪45 contribution → CAC ₪200 pays back in **~4.5 months** — fine for side hustle  

Referral: 1 month free for referrer+referee keeps CAC near zero.

---

## 6. P&L sketch at 100 clients (base)

| | ₪ / month |
|--|-----------|
| MRR | 5,900 |
| − Payment fees | −200 |
| − Messaging | −500 |
| − Infra + AI + tools | −700 |
| **Cash operating profit** | **~₪4,500** |
| − Your time 8h × ₪250 | −2,000 (opportunity) |
| **“True” side-hustle surplus** | **~₪2,500/mo** |

**ARR cash profit ~₪54k** before tax / accountant — real side-hustle money, not a VC business.

Optimistic (₪75 ARPU, WA-efficient): operating profit **~₪6–6.5k/mo**.

---

## 7. Can you compete?

### Yes, if you play a sharp niche game

| Dimension | Plannie | You (100-client hustle) |
|-----------|---------|-------------------------|
| Price | ₪59–127 | **₪49–69** core, clear |
| Surface | Mobile app (legacy hybrid) | **Phone-first PWA / RN** — matches how pros work |
| Channel | SMS-centric | **WhatsApp-native** (cheaper + preferred in IL) |
| Ops | Company | **AI + you**, narrow scope |
| Features | Broad | **Thin:** book, calendar, reminders, deposits, clients |
| Risk | Incumbent trust | Trust/brand; need reliability |

**You do not need to beat Plannie everywhere.** You need 100 solos who hate their current tool’s price/WhatsApp/setup friction.

### No / hard, if you…

- Compete on full Team/Premium feature surface  
- Use expensive SMS as default  
- Offer white-glove human support for every ticket  
- Build native iOS+Android+desktop before revenue  
- Chase marketplace / lead-gen (different business)

---

## 8. Path to 100 clients (side hustle realistic)

| Stage | Clients | Focus | MRR (base ARPU) |
|-------|---------|-------|-----------------|
| M0–M2 | 0–10 | Dogfood + 10 friendly salons/barbers | ₪0–600 |
| M3–M5 | 10–40 | Referral loop + FB/WA groups | ₪600–2.4k |
| M6–M9 | 40–100 | Light ads only if CAC &lt; ₪250 | ₪2.4k–5.9k |

**Churn assumption:** 4–6%/mo early → need ~5–8 new logos/mo to hold 100.  
Net: acquire **~15–20/mo** gross while climbing, then **~5–7/mo** to maintain.

AI helps: onboarding chat, Hebrew FAQ, churn “why cancel” classify, template copy — not autonomous sales.

---

## 9. Pricing / packaging rules that protect margin

1. **WhatsApp default**; SMS is paid pack or fallback.  
2. **Fair-use messaging** in plan; overage explicit.  
3. **No marketplace** until cash profitable.  
4. **PWA first** (skip store tax + review latency); optional native later.  
5. **No desktop roadmap** (your call) — one responsive phone UI is enough.  
6. **Deposits via existing IL PSP**; you don’t hold funds early.  
7. Annual discount ~15–20% for cashflow (Plannie does this).

---

## 10. Verdict

| Question | Answer |
|----------|--------|
| Compete on price/UX niche? | **Yes** vs Plannie Entry/Plus for phone-first solos |
| 100 clients as side hustle? | **Yes** — ~₪4–6k/mo operating profit base case if WA-first and thin scope |
| Get-rich? | **No** — nice hustle; ₪70–90k ARR class |
| Scale to 500+ AI-only? | Only with hard automation + low touch; support becomes the wall |
| Biggest economic risk | SMS costs, churn, support time creep, building too much product |

**Bottom line:** At **₪49–69**, WhatsApp-first, phone-only, AI-assisted support, **100 clients is economically sensible** as a side hustle (~₪4.5k/mo cash after infra/fees). You compete by being **cheaper-clearer + WA-native + less setup pain**, not by out-featuring Plannie.
