# 3 researched Israel-first side projects (v2) — SUPERSEDED

> **Superseded by [12-where-the-real-gaps-are.md](12-where-the-real-gaps-are.md).** Pricing research showed the "regulation micro-SaaS" lane (Shaar-style) is already crowded with near-identical indie entrants, and WhatsApp-as-channel is not an advantage. Kept for the reasoning trail.


The previous shortlist (Vaad / Makor / Mishmar) was weak: **“WhatsApp for X”** with soft pain, slow committees, or high-churn venues — no forced demand, no high LTV, easy for Gambot-class BSPs to clone.

This revision is grounded in **2025–2026 Israeli regulation, market size, and competitor maps**. Same constraints as the scheduler hustle: **phone/WhatsApp-native, thin MVP, ~100 logos, AI-managed ops, Israel-first, no desktop.**

---

## Research filters (why these three)

| Filter | Pass means… |
|--------|-------------|
| Forced demand or acute $ loss | Regulation, denied VAT, missed high-value calls, or annual tax filing |
| Willingness to pay | Pain priced in hundreds–thousands ₪/mo, not “nice calendar” |
| Competition is adjacent, not identical | Incumbents own a *different* job (issuer invoicing, voice infra, rental ops) |
| Phone-first | Core loop works in WhatsApp / phone; desktop is optional later |
| AI leverage | OCR, classify, verify, chase, answer — not custom enterprise consulting |

**Killed on research:** ועד בית OS (slow sales, soft budget), generic trades desk (Gambot/Jobber-shaped), café shifts (venue death + Restigo/Lynxbe), another Morning clone, horizontal voice API (Yappr already owns Hebrew infra), full CPA suite (FinBot/Hashavshevet).

---

## 1) Clinic front-desk OS — working name “Marpe”

### Evidence
- Israeli clinics still run **phone-first**; missed/no-show slots are real money. Yappr’s own dental content cites **₪400–800 lost per no-show** and AI agents at roughly **~₪300/mo infra-equivalent** vs a receptionist at **₪7k–12k** ([Yappr dental guide](https://goyappr.com/en/blog/voice-ai-for-dentists)).
- **Yappr** (~₪0.65/min, native Hebrew, IL numbers) and **Voca.ai** are **platforms**, not vertical clinic products ([2026 comparison](https://goyappr.com/en/blog/israel-voice-ai-platform-comparison)).
- **Dentala** targets **chairside clinical** documentation (treatment plans), not front-desk booking/kupot ([dentala.health](https://www.dentala.health/)).
- **Plannie** owns beauty/wellness booking — not dental/derm/physio with קופות / after-hours call capture.

### Job
Private clinic (dental, derm, physio, small specialist): phone rings → book / cancel / “איזו קופה?” → WhatsApp confirm → no-show recovery → waitlist backfill. Owner shouldn’t hire a full-time front desk for that loop.

### Product (thin)
- Hebrew **voice agent** (wrap Yappr/similar — don’t train speech models day one)
- Calendar + provider availability on phone
- WhatsApp confirm / cancel / reminders
- Waitlist auto-offer on cancel
- Simple **קופת חולים** FAQ (configured, not medical advice)
- Owner daily digest: booked / no-shows recovered / escalations

**Not:** EMR, charting, billing to HMOs, full PMS.

### Who pays / price
Clinic owner. **₪399 / ₪599 / ₪799** per month (minutes pack + seats).  
**50 clinics × ₪550 ARPU ≈ ₪27.5k MRR** — fewer logos than Plannie-style ₪69 plans for the same cash.

### Why AI-managed works
95% of calls are book/move/cancel/hours. You sell + configure kupot + hours; AI runs the line. Escalations queue in WhatsApp for the clinic, not for you.

### Compete / risk
| Threat | Notes |
|--------|--------|
| Yappr verticalizes | Move fast on **clinic workflow + WA + waitlist**, not raw voice quality |
| Hebrew edge cases | Accent/failure → warm transfer; budget for human QA early |
| Medical trust | Stay scheduling ops; no diagnosis |

### First 10
Cold WhatsApp/Instagram to private dental clinics in one city; offer 14-day “answer every after-hours call” pilot; measure booked appointments from missed-call hours.

### Kill if…
After 15 pilots you can’t show **≥8 booked appts/month from after-hours/missed calls** or clinics won’t pay ≥₪399.

---

## 2) Landlord tax + rent co-pilot — working name “Dirah”

### Evidence
- **~892,400** rental dwellings in Israel mid-2025 (**29.6%** of ~3.02M homes); growth in rentals outpaces ownership ([CBS / press summaries](https://klikatnadlan.co.il/israelrentalmarket2025/)). Large share are **private** landlords, not institutions.
- Tax Authority launched a **dedicated online system** for reporting/paying rental income (paths under §122 etc.): preferential residential, **10%**, business asset — see **הוראת ביצוע 2026/5** and CPA explainers ([EA&CO](https://cpa-ea.co.il/blog/heshbonaut/income-tax-rent/), [Capitax PDF](https://www.capitax.co.il/Attachments/5-2026.pdf)).
- Ceiling for exemption path is on the order of **~₪5.6k/mo** (check current year); wrong path / late pay → friction, תיק 94 risk in some cases.
- **RentPackage** etc. = contracts, meters, collections — **not** tax-path co-pilot + annual filing pack.
- **Nadlanitor / Flemi / Kloyz** = heavier property management for pros — wrong ICP for 1–3 apartments.

### Job
Owner of 1–3 apartments: tenant pays (or doesn’t), Bit/PayBox chaos, then once a year panics into the Tax Authority portal with the wrong מסלול and missing חוזה.

### Product (thin)
- WhatsApp-native: log unit + rent + tenant
- Payment reminders to tenant (WA) + “paid?” confirm
- Running total vs **פטור / 10% / רגיל** *illustrative* calculator (disclaimer: not tax advice)
- Document vault: contract PDF, payment proofs
- Year-end: **filing pack** (numbers + docs) + deep-link checklist for the official system; optional handoff to a partner CPA

**Not:** full property management for 50-unit portfolios; not a substitute for a מייצג.

### Who pays / price
Small landlord. **₪49/mo** or **₪399/year** (spike around March–April filing).  
**100 landlords × ₪55 ARPU ≈ ₪5.5k MRR** — weaker cash than Marpe, but huge TAM and seasonal virality.

### Why AI-managed works
Most questions are “איזה מסלול?”, “מה התקרה?”, “איפה הקבלה?”. AI + templates; escalate edge cases to partner accountant (revenue share), not your inbox all night.

### Compete / risk
| Threat | Notes |
|--------|--------|
| Liability | Product = **prep + reminders**, not legal advice; CPA partner for edge cases |
| RentPackage adds tax | Stay sharp on **מסלול + filing pack**, not meters/water |
| Low ARPU | Need volume or upsell “CPA review” |

### First 10
Facebook landlord groups, real-estate investor Discords/Telegram, one CPA who hates March inbox and white-labels the pack.

### Kill if…
Landlords won’t share contracts/payment data, or conversion dies when you show the disclaimer (signal: they only want free calculator).

---

## 3) Buyer-side invoice gate (accountant-agnostic) — working name “Shaar”

### Evidence
- **חשבוניות ישראל:** from **1 Jun 2026**, allocation number (**מספר הקצאה**) required for tax invoices **above ₪5,000** (ex-VAT). Without it, the **buyer cannot deduct input VAT** ([Grant Thornton](https://www.grantthornton.co.il/insights1/tax-insignths/2026/From_June_the_allocation_number/), [ACI](https://aci.org.il/knowledge/allocation-number-input-tax-2026/), [Morning](https://www.greeninvoice.co.il/magazine/israel-invoice/)).
- Threshold stepped down 25k → 20k → 10k → **5k** — volume of invoices in scope just exploded for ordinary SMBs.
- **Issuer** side is crowded: Morning / Green Invoice, iCount, Sumit, etc. auto-request numbers on **out** invoices.
- **FinBot** already sells **allocation-number checking to מייצגים** as part of a full office suite ([FinBot page](https://www.fin-bot.co.il/9469-2/)) — do **not** build another CPA ERP.
- Gap: **business owners + bookkeepers not on FinBot** still live in “forward PDF to WhatsApp → hope רו״ח catches it at month-end.” Buyer pain is **pre-payment / pre-books**, not office suite.

### Job
SMB that **buys** from suppliers (agency, studio, contractor, clinic buying lab/equipment): before paying or booking the expense, confirm the invoice has a valid מספר הקצאה; if missing, **chase the supplier** automatically.

### Product (thin)
- Dedicated WA number: forward invoice photo/PDF
- OCR → extract amount, ח.פ., allocation #, dates
- Gate: **OK / missing / suspect** for ≥₪5k (+VAT rules)
- One-tap **supplier chase** template WA/SMS: “חסר מספר הקצאה — שלח מחדש”
- Month pack: CSV/PDF for *any* accountant (Hashavshevet export mindset — accountant-agnostic)
- Optional: “don’t pay” hold list for owner

**Not:** full הנהלת חשבונות, bank reconciliation, or issuer invoicing.

### Who pays / price
SMB owner **or** small bookkeeping office seating clients.  
**₪149 / ₪249** per business/mo, or **₪99/client** sold through a bookkeeper (min 10).  
**80 businesses × ₪180 ≈ ₪14.4k MRR.**

### Why AI-managed works
Document intake + classification + chase is classic L1 AI. You handle SHAAM API quirks and edge rejects; volume is automatable.

### Compete / risk
| Threat | Notes |
|--------|--------|
| FinBot / Morning expenses | They win if buyer is already in their suite — sell to **everyone else** + “works with your רו״ח” |
| SHAAM API / auth refresh | 90-day digital-services auth pain is real; budget for it |
| Commodity OCR | Moat = **gate + chase + month pack**, not scan quality alone |

### First 10
Bookkeepers who refuse FinBot migration; agencies/production houses paying many ₪5k–30k supplier invoices; LinkedIn/Facebook “הנהלת חשבונות” groups with a “June 5k cliff” landing page.

### Kill if…
You can’t get reliable verification (API/partner), or every lead says “my רו״ח already does this in FinBot/Morning.”

---

## Side-by-side (researched)

| | Marpe (clinics) | Dirah (landlords) | Shaar (buyer gate) |
|--|-----------------|-------------------|---------------------|
| Demand type | Acute $ loss (calls/no-shows) | Annual tax friction + new gov system | Regulation cliff Jun 2026 |
| ARPU | ₪400–800 | ₪49–70 | ₪150–250 |
| Logos for ~₪10k MRR | ~20–25 | ~150–180 | ~50–70 |
| Sales cycle | Medium (demo call) | Fast/cheap (consumer) | Medium (SMB or bookkeeper) |
| AI leverage | Voice + WA flows | Q&A + pack assembly | OCR + verify + chase |
| Hardest risk | Voice quality / trust | Tax liability positioning | FinBot adjacency + SHAAM auth |
| Israel moat | Hebrew voice + קופות norms | §122 paths + רשות המסים UX | חשבוניות ישראל buyer rules |

---

## Pick order (opinionated, post-research)

1. **Marpe** — best cash per logo; wraps existing voice infra; clear ROI story for clinic owners; same “appointment economy” instincts as the Plannie work without fighting Plannie head-on in beauty.
2. **Shaar** — timed to the **₪5k** cliff; sell the *buyer* job Morning doesn’t own; stay out of FinBot’s full-office lane.
3. **Dirah** — largest TAM, weakest ARPU; great portfolio/seasonal product if you want consumer distribution via WA groups.

---

## What the research says *not* to build next

- ועד / shifts / generic trades WA bots (previous list) — soft demand  
- Another **issuer** invoicing app (Morning/iCount)  
- Horizontal Hebrew voice API (Yappr/Voca)  
- Full מייצג suite (FinBot)  
- Full PMS/EMR or property-management for institutions  

---

## Sources (primary trail)

- Allocation number / ₪5k: [Grant Thornton](https://www.grantthornton.co.il/insights1/tax-insignths/2026/From_June_the_allocation_number/), [ACI](https://aci.org.il/knowledge/allocation-number-input-tax-2026/), [Morning magazine](https://www.greeninvoice.co.il/magazine/israel-invoice/)  
- FinBot buyer check (competitor): [fin-bot.co.il](https://www.fin-bot.co.il/9469-2/)  
- Rental stock: [CBS-linked summaries](https://klikatnadlan.co.il/israelrentalmarket2025/) (~892k rentals, 29.6%)  
- Rental tax system: [הוראת ביצוע 2026/5](https://www.capitax.co.il/Attachments/5-2026.pdf), [EA&CO](https://cpa-ea.co.il/blog/heshbonaut/income-tax-rent/)  
- Voice AI IL: [Yappr comparison](https://goyappr.com/en/blog/israel-voice-ai-platform-comparison), [dental ROI claims](https://goyappr.com/en/blog/voice-ai-for-dentists)  
- Dentala (adjacent, not front-desk): [dentala.health](https://www.dentala.health/)
