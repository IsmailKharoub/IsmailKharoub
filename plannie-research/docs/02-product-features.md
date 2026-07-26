# Product features & domain model

Plannie targets **solo operators and small teams** offering one-on-one services (beauty, fitness, tutoring, etc.), with a strong **Israel / Hebrew** bias.

## Core product loop

1. **Onboarding** — profession templates, services, work week, branding, share booking link  
2. **Open availability** — windows / open slots on calendar  
3. **Clients book** — public branded page + SMS reminders  
4. **Pro manages day** — approve / move / resize / cancel / breaks / waiting list  
5. **Monetize** — SaaS subscription + optional client payments / punch cards / deposits  

## Feature map (from UI modules + API methods)

### Calendar & scheduling (heart of the app)

- Day/week calendar (`calendarCtrl` ~126 KB — largest controller)
- Open slots / availability windows
- Approved / cancelled / waiting-approval slots
- Drag move + resize slots
- Breaks and extensions of availability
- Repetitive / recurring appointments
- External calendar events overlay (Nylas / Google)
- Work-week configuration + extend availability
- Meeting summaries (incl. white-label “Upapp” / Amit clinical-style flows)

### Customers / CRM-lite

- Customer list + single customer profile
- Create / edit customer
- Import contacts (device contacts + filters)
- Pending customers / partner status
- Customer web self-view (iframe of public page)
- Export Excel

### Services & catalog

- Multi-service catalog with duration, price, images
- Reorder services
- Profession presets (**45 professions** from public API) with default services + branding colors/images  
  Examples: hair, nails, beauty, fitness, massage, dog grooming, tutoring, tattoos, yoga, barber, braids, etc.

### Multi-staff (“stations” / children)

- Master account with child stations
- Pair / unpair stations
- Station state, paging stations
- Team plan gates `allowStations` / `allowPairing`

### Messaging & retention

- Inbox
- SMS reminders (demo + batch SMS)
- Batch email
- Campaigns
- Client reminders settings
- WhatsApp deep links present in client
- Push via Firebase

### Payments & billing

- SaaS plans via **PayPal** subscription IDs (USD + ILS)
- Client payments: merchant onboarding, **Hyp** (IL), **Tilled**, **EasyCount** invoicing, iForms
- KYC multi-step form generator
- Punch cards (templates + instances + refund)
- Token / SMS credit purchases
- Refunds, receipts, sign-on transactions
- Coupons / EasyCount coupons
- Trial extension claim

### Public booking & branding

- Branded business page (colors, carousel, service images)
- Share link / social share / customer web preview
- White-label color CSS variable (`--whiteLabelColor`); Viber variant flagged in `index.html`

### Insights & ops

- Insights dashboards (ApexCharts)
- Waiting list
- Revenue forecast remote params
- Referrals + rewards
- Tools, simulator, search
- Digital forms / questionnaires (`plannieForm` — also onboarding + KYC)

### Auth / account

- Register, login, SMS verify, reset password
- Facebook / Apple login
- Logout, delete account
- Impersonation / monitor restricted login (support tooling)
- Settings: calendar prefs, sync, subscription cancel, SaaS invoices, business profile

## SaaS plan shape (public `/parameters/getPricingPlans`)

| Plan | Notes (approx.) |
|------|------------------|
| Trial | Free, stations on, web access, 100 SMS, batch SMS/email |
| Entry | Cheaper tier, max 6 services, 50 events/month |
| Plus | Mid tier, no stations |
| Team | Stations + pairing + web access + per-station add-on |
| Premium | Higher limits (more services), stations, batch messaging |

Prices are dual-currency **USD + ILS**, monthly/annual, PayPal plan IDs per currency. Full redacted sample: [`../samples/pricingPlans.redacted.json`](../samples/pricingPlans.redacted.json).

## Domain vocabulary worth reusing (conceptually)

| Concept | Meaning |
|---------|---------|
| Pro / user | Business owner account |
| Station / child | Staff member calendar under a master |
| Window | Availability block clients can book into |
| Slot / event | Concrete appointment instance |
| Open slot | Bookable availability |
| Punch card | Prepaid multi-visit package |
| Customer web | Public booking microsite |
| Workweek | Recurring weekly availability template |
| Waiting list | Queue when no slot |

Event status codes appear as integers in validators (e.g. `0` availability, `1–3` booked variants) — treat as opaque; redesign with explicit enums in a new system.

## UX patterns that work for this market

1. **Calendar-first home** — not a dashboard of cards  
2. **Aggressive onboarding to “share your link”** — activation = first shared booking page  
3. **Profession templates** — zero blank-canvas setup  
4. **SMS as default reminder channel** (IL expectation)  
5. **Hebrew-first + RTL**, English secondary  
6. **Portrait mobile pro app** + separate public web booking page  

## Gaps / smells (opportunities for an alternative)

- Hybrid WebView UX (scroll/keyboard/plugin friction)
- Very large single controllers (calendar god-object)
- Mixed legacy (“openedSlotDeprecated”, “calendarSyncOld”)
- CSP is effectively permissive (`default-src *`)
- Desktop explicitly “not supported” view in mobile package
- Deep links / App Links hosts partially blanked in manifest (misconfig)
- Play version ahead of APKPure (8.0.3 vs 7.76.9) — continuous shipping
