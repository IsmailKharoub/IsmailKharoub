# Product gaps in Plannie (opportunity map)

What Plannie already covers well: **1:1 appointment calendar, public booking page, SMS reminders, services, basic CRM, multi-staff stations, deposits/payments, punch cards, waiting list, calendar sync, campaigns.**

Below are the **real product gaps** — missing or weak features users complain about, or category table-stakes they under-serve. Prioritized for an alternative on a modern stack.

---

## P0 — Users explicitly feel the pain

### 1. ~~Desktop / web pro~~ (out of scope for us)
- Plannie blocks desktop; some reviews want it.
- **Our bet:** skip desktop — target pros who live on their phone. Invest in great mobile instead.

### 2. WhatsApp is not a first-class channel
- Reviews: WhatsApp interface “doesn’t work as it should”; many prefer WhatsApp over SMS.
- Product mostly does **SMS + deep-link chat**, not WhatsApp Business API (templates, reminders, booking links in-thread, two-way).
- **Win:** WhatsApp-native reminders, confirmations, and “book from chat” flows (IL default).

### 3. Availability setup is too manual
- Reviews: can’t auto-split an 8-hour day into hourly bookable slots; “slots not optimized / create empty time”; work-hours editing is slow; onboarding settings wipe/restart.
- They have windows/availability, but **smart slot generation / buffer packing** feels weak.
- **Win:** “Set work hours → auto-generate slots” with buffers, lunch, service-aware packing, one-tap weekly templates.

### 4. Message templates & follow-ups are weak
- Explicit review ask: **customizable client messages** + **follow-up** after appointments.
- They have campaigns/bulk SMS and some reminder toggles, not a proper lifecycle automation builder.
- **Win:** Editable templates per event (booked / reminder / cancelled / no-show / thank-you / rebook) + follow-up sequences (“book again in 4 weeks”).

### 5. Client experience is second-class
- No dedicated **client app**; consumers who install Plannie hit “what’s your profession?” (pro onboarding) and rage-quit.
- SMS opt-out / notification control is confusing (reviews: can’t stop SMS; dark-pattern to download app).
- Booking can feel under-validated (reports of empty-detail bookings).
- **Win:** Client-side = lightweight link/PWA (not a fake pro app); clear OTP; mandatory fields; one-tap cancel/reschedule; honest notification prefs.

### 6. Pricing / packaging trust
- Dominant 1★ theme in IL: **felt free, then paywall**; “expensive for what you get”; SMS cost unclear.
- **Win:** Radical pricing clarity in-product (what’s free, SMS unit cost, soft limits) + a credible free forever or freemium tier for solos.

---

## P1 — Category gaps vs modern schedulers (Calendly / Fresha / SimplyBook / Setmore / Treatwell)

### 7. Demand generation
- Review: “this app don’t provide new clients.”
- Plannie is **ops software**, not marketplace. No discovery, no marketplace SEO, weak “get found.”
- **Win (pick one):** marketplace vertical, Google Business / Maps booking, Instagram/TikTok booking deep links, or SEO booking pages that actually rank.

### 8. Marketing site & embed
- Branding page exists, but weak **embeddable widget**, Instagram booking, Google Reserve, multi-page SEO site.
- **Win:** JS embed + Link-in-bio + Google Booking integration.

### 9. Group classes / resources / rooms
- Domain is **one-on-one**. No real class capacity, rooms, equipment, or resource scheduling.
- **Win:** If you target fitness/clinics/salons with rooms — capacity + resources is a wedge Plannie doesn’t own.

### 10. Multi-location businesses
- Stations ≈ staff under one business, not true multi-branch (separate addresses, hours, pages, reporting).
- **Win:** Locations as a first-class entity (chains / multi-site salons).

### 11. Loyalty beyond punch cards
- Punch cards exist (gated). Missing: gift cards, memberships/subscriptions for clients, points, family accounts.
- **Win:** Memberships + gift cards (high willingness to pay in beauty/fitness).

### 12. Reviews & reputation loop
- Little evidence of polished **auto Google-review ask** after completed visits (beyond in-app rate-us).
- **Win:** Post-visit review request → Google/Facebook, with private feedback catch for unhappy clients.

### 13. No-show intelligence
- Deposits + cancel thresholds exist; weak **risk scoring, waitlist auto-fill on cancel, smart overbooking, deposit rules by service/client history**.
- **Win:** Policy engine: deposits by no-show rate, auto-offer freed slots to waitlist via WhatsApp.

### 14. Staff / salon ops depth
- Stations cover multi-calendar basics. Thin on: staff permissions, commission, tips, color/chemical formulas, chair assignment, turn queues.
- **Win:** Salon/clinic ops pack if that’s the ICP.

### 15. Reporting
- Excel export + some insights. Missing modern BI: retention cohorts, utilization %, revenue by service/staff, forecast vs target, tax-ready reports.
- **Win:** Simple weekly “business health” report pros actually open.

### 16. Open platform
- No public developer API / Zapier / Make for SMBs.
- **Win:** Webhooks + Zapier early → accountants, CRMs, WhatsApp tools stickier.

### 17. AI assist (table stakes soon)
- No meaningful AI for: suggest schedule, fill gaps, write campaign SMS, summarize day, predict no-shows.
- **Win:** Practical AI tied to calendar actions, not a chatbot gimmick.

### 18. Client intake / forms (still immature)
- Forms heavily used for **KYC / onboarding**, not rich per-service intake (health, consent, allergies) attached to bookings end-to-end.
- Play’s newer “Digital Forms” suggests they’re catching up — still a race.
- **Win:** Form → required before confirm; stored on client file; signed consents.

---

## P2 — Smaller but sharp wedges

| Gap | Opportunity |
|-----|-------------|
| Video / Meet-only services | They flag remote/Meet on services; full telehealth flow is shallow vs Zoom-native tools |
| POS / retail | Nayax tile for some users only — not a real retail POS + inventory |
| Offline / flaky mobile | Reviews: slow, bugs, settings reset — reliability is a product feature |
| Offline booking page for pro preview | Weak desktop preview workflow |
| Transparent SMS billing | Prepaid wallet UX with real-time remaining credits |
| Accessibility / ToS language | Hebrew ToS complaint — trust details matter in IL |
| Consumer marketplace ads | Pros hate paying SaaS that doesn’t bring leads — either bring leads or price lower |

---

## What *not* to treat as a gap

Don’t rebuild these as differentiators unless you can 10x UX — Plannie already has workable versions:

- Basic calendar + booking page  
- SMS reminders  
- Multi-staff  
- Waiting list  
- Punch cards  
- External calendar sync  
- Deposits / local payments  
- Profession templates  

Compete by **fixing their holes**, not cloning the calendar.

---

## Suggested wedge (opinionated)

For IL service SMBs, the sharpest product thesis vs Plannie:

> **WhatsApp-native scheduling + phone-first pro app + auto slot packing + editable automations/follow-ups**, with honest pricing and a client experience that isn’t a fake business app.

Optional second wedge if you pick a vertical: **rooms/classes** (fitness) or **memberships/gift cards** (beauty).
