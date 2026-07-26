# 3 micro-SaaS in the Plannie lane (v4 — the actual brief)

Same DNA as the booking product, **new standalone products** — not features bolted onto it:

- Israeli SMB, Hebrew RTL, phone-first
- One boring recurring job with money attached
- Thin enough to ship in weeks, cheap enough to buy without a meeting
- **₪89–199/mo × 80–150 clients ≈ ₪10–20k/mo**, run by you + AI

Plannie proves the shape works: it charges ₪59–127 and owns a dated Cordova/AngularJS stack (see [01-architecture](01-architecture.md)). We don't need an empty market — we need a **simple job with a weak or bloated incumbent**.

---

## Field check first: what's already taken

I priced the obvious appointment-adjacent verticals before proposing anything. All have Hebrew incumbents, so these are **not** the ones to pick:

| Vertical | Existing IL tools | Verdict |
|---|---|---|
| Private tutors | [Base CRM](https://basecrm.co.il/pro/tutors/), [Magbit](https://master-stack.com/), [Uptor](https://uptor.co.il/), [EasyWeek](https://easyweek.co.il/business/solutions/tutor), Arbox | Crowded, ₪89–99 |
| Dog boarding / trainers | [BarkBoard](https://www.barkboard.co.il/), [Dogital](https://www.dogital.co.il/), [10PAL](https://www.10pal.com/), PAWZA, Treatly | Surprisingly crowded |
| Event vendors (DJ/photo) | [Lunsoul](https://lunsoul.com/vendors-crm), [Nexaverse](https://nexaverse.co.il/photography-management-system/), [10comm](https://10comm.com/), [Eruit](https://eruit.co.il/) | Taken, quote→contract→מקדמה done |
| Event equipment rental | [EasyWeek](https://easyweek.co.il/business/solutions/rental), [AlmogERP](https://almogerp.com/), M-Boss, Zilum (Access!) | Incumbents are ERP-shaped, but crowded |
| Studios / חוגים / clinics | TAZMAN, Arbox, Club-Tec, CliniKit, Tipulog, Base | Price war ₪75–309 |

The three below are jobs **none of those tools own as a product**.

---

## 1) "Sevev" (סבב) — weekly order rounds for home food businesses

### The job
Home bakers, Friday-meal cooks, salad/hummus makers, meat and fish vendors, farm boxes, home roasters. Every week the same loop: post the menu, collect orders in WhatsApp/Instagram DMs, chase payment via Bit, hand-write a picking list, then coordinate pickup between 16:00 and 19:00 Friday. Volume is 30–150 orders per round.

**This is Plannie logic applied to a deadline instead of a calendar:** publish availability → take commitments → cut off → collect money → produce an operational list.

### Why the incumbents don't fit
- Wix/Shopify/WooCommerce are always-on storefronts. This business is **round-based**: opens Sunday, closes Wednesday 22:00, delivers Friday, with per-item caps (only 40 challahs exist).
- Ordering platforms take a per-order cut and own the customer. These sellers want their own list.
- Current state is genuinely a WhatsApp thread plus a paper list, so **switching cost is zero** — the hardest problem in IL micro-SaaS solved for free.

### MVP (2–3 weeks)
- Create a round: items, price, per-item quantity cap, cutoff time
- One public Hebrew order page (link in bio/status), no login for customers
- Payment at order (Bit/credit via a local provider) or mark-as-paid
- Auto-close at cutoff; auto-waitlist when an item sells out
- **Picking list + labels** grouped by item, and a pickup-slot sheet
- Repeat last round in one tap; returning customers pre-filled

Explicitly **not**: inventory accounting, couriers, a marketplace, a storefront builder.

### Pricing and math
| Plan | Price | Cap |
|---|---|---|
| Round | **₪79/mo** | 1 round/week, ≤60 orders |
| Kitchen | **₪129/mo** | unlimited rounds, ≤250 orders, labels |

**120 sellers × ₪100 ≈ ₪12k MRR.** They already handle ₪3k–15k per round, so ₪100 is noise.

### First 10
Instagram/Facebook home-food groups (עסקים ביתיים, אוכל ביתי, מנות שישי), one city at a time. Offer to run their next round for them personally — that's the demo. Sellers are public and easy to DM, and they talk to each other.

### Kill if
After 15 hands-on rounds, sellers keep reverting to WhatsApp, or per-item caps and cutoffs turn out not to be the real pain (then it's just a storefront, and we lose to Wix).

---

## 2) "Baderech" (בדרך) — day planner for 1–5 person field crews

### The job
Air-conditioning techs, plumbers, solar-heater guys, locksmiths, pergola and furniture installers, appliance repair. The work happens **at the customer's home in a time window**, which is a different product from Plannie: travel time between jobs, arrival windows instead of exact slots, and proof of work at the end.

Their day: 6–10 jobs, a phone full of addresses, "מתי אתה מגיע?" calls all morning, no record of what was done, and payment collected however.

### Why the incumbents don't fit
- Booking tools (Plannie, EasyWeek, Uptor, BIZonline) book **slots at a location**. They have no travel buffer, no arrival window, no per-job address, no completion proof.
- IL "all-in-one" CRMs are desktop-first and priced/shaped for offices.
- Global field-service tools (Jobber, Housecall Pro) are English-first, USD, and built for bigger crews.

### MVP (3–4 weeks)
- Job card: address, contact, window (e.g. 10:00–12:00), price, notes
- Day view that sequences jobs with travel buffers and warns on impossible windows
- "בדרך אליך" status link the customer opens without installing anything
- On-site: before/after photos, completion signature, parts used
- Charge on completion (deposit optional) and a job report the customer keeps
- Tomorrow's list generated the night before

Explicitly **not**: full inventory, payroll, multi-branch dispatch, route optimization science.

### Pricing and math
| Plan | Price | Cap |
|---|---|---|
| Solo | **₪149/mo** | 1 tech |
| Crew | **₪249/mo** | up to 5 techs |

**80 businesses × ₪170 ≈ ₪13.6k MRR.** One prevented no-show or dispute covers the month.

### First 10
Supplier counters (מזגנים, אינסטלציה, כלי עבודה) where these guys buy weekly; trade Facebook groups; and referrals — installers subcontract to each other constantly.

### Kill if
They won't photograph and sign on the phone (the whole value is proof + arrival windows), or the buyer insists on a full CRM with leads and quotes — that's a bigger, slower product than this lane allows.

---

## 3) "Sha'a" (שעה) — hourly rental of treatment rooms and studios

### The job
There is a large, quiet IL market of people who own space and rent it **by the hour**: clinic rooms sublet to therapists, pilates/yoga studios, rehearsal rooms, photo studios, workshop spaces, tiny event rooms. Owner has 1–8 rooms and 10–40 recurring renters at ₪40–90/hour.

Their reality: an Excel grid, a WhatsApp group where renters ask "פנוי מחר ב-17:00?", a shared door code, and a painful monthly reconciliation of who used how many hours.

### Why the incumbents don't fit
- This is **B2B recurring inventory**, not consumer appointments. The renter is a repeat professional with a monthly balance, not a client booking a haircut.
- [BIZonline](https://bizonline.co.il/) is the nearest thing and is shaped for spas/venues; clinic-management tools (CliniKit, Tipulog) manage *patients*, and only note room rent as an expense line.
- Nobody serves the owner-of-rooms as the customer.

### MVP (2–3 weeks)
- Rooms, hourly rates (peak/off-peak), and an availability grid
- Renter self-serve booking from their phone against their own allowance
- Recurring holds ("Tuesdays 16:00–19:00") with a cancellation policy
- Hour ledger per renter → **monthly statement** and payment link
- Door code / entry instructions released at booking time
- Utilization view: which rooms and which hours are dead

Explicitly **not**: a marketplace for finding rooms, patient records, or building access hardware.

### Pricing and math
| Plan | Price | Cap |
|---|---|---|
| Small | **₪99/mo** | ≤3 rooms |
| Site | **₪179/mo** | ≤10 rooms + statements |

**90 sites × ₪130 ≈ ₪11.7k MRR.** An owner recovering two forgotten hours a month pays for it.

### First 10
Clinic buildings and studio strips are physically visible — walk in or call. Also therapist Facebook groups (renters pull the owner in), and coworking-adjacent spaces that already rent rooms informally.

### Kill if
Owners are happy with Excel because their renter list is stable and small, or renters won't self-serve and keep messaging the owner anyway (then the hour ledger is the only value, which is too thin).

---

## Side-by-side

| | Sevev (order rounds) | Baderech (field crews) | Sha'a (hourly rooms) |
|---|---|---|---|
| Buyer | Home food seller | 1–5 person installer/repair crew | Owner of rooms/studios |
| Price | ₪79–129 | ₪149–249 | ₪99–179 |
| Logos for ~₪12k | ~120 | ~70–80 | ~90 |
| Current state | WhatsApp + paper list | Phone + memory | Excel + WhatsApp + door code |
| Direct IL competitor | none round-based | none window/proof-based | BIZonline (adjacent) |
| Build time | 2–3 weeks | 3–4 weeks | 2–3 weeks |
| Sales difficulty | easiest (public sellers, DM-able) | medium (field, phone calls) | medium (walk-in, physical) |
| Churn risk | seasonal sellers quit | low (tool becomes the workday) | very low (annual room contracts) |
| Support load | low | medium (they're on ladders) | low |

## Pick order

1. **Sevev** — fastest to build, zero switching cost, sellers are publicly listed and reachable without ads, and you can demo by running one round for them.
2. **Sha'a** — stickiest and lowest support, B2B renters, recurring by nature. Best long-term retention of the three.
3. **Baderech** — highest ARPU, but hardest adoption because it has to survive being used on a roof in July.

## Why these aren't features of the booking product

Each has a different core object: Sevev's is an **order round with a cutoff**, Baderech's is a **job at an address inside a window**, Sha'a's is an **hour of inventory owed by a recurring renter**. Plannie's core object is an appointment slot at a station — none of these three fit inside it, which is exactly why they're separate products rather than roadmap items.
