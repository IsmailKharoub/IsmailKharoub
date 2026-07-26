# Side-hustle plan — 100 clients, AI-managed, phone-first

## Decisions locked

- **No desktop** — pros work on phones; ship PWA (optional native later).
- **Thin product** — booking page, calendar, clients, WA/SMS reminders, deposits, basic multi-staff.
- **AI-operated** — self-serve + AI support; you handle exceptions only.
- **Target:** ~100 paying IL service solos → see [unit economics](08-unit-economics-side-hustle.md).

## Offer

| Tier | Price | Promise |
|------|-------|---------|
| Starter | ₪49/mo | Book + calendar + reminders |
| Pro | ₪69/mo | + deposits, punch cards, campaigns fair-use |
| Studio | ₪99/mo | + multi-staff |

WhatsApp-first messaging; SMS as fallback/pack.

## Compete on

1. Clearer/cheaper than Plannie Plus  
2. WhatsApp-native (Plannie is SMS-deep-link)  
3. Hours → auto slots (less setup pain)  
4. Honest trial / no surprise paywall  

Not on: marketplace, desktop, full salon POS, feature parity with Premium.

## Build order (MVP)

1. Auth (phone OTP) + business + services  
2. Weekly hours → computed slots  
3. Public booking link (mobile)  
4. Pro calendar (day) + appointment actions  
5. WA utility reminders + SMS fallback  
6. Deposits via IL PSP  
7. AI help/support bot + admin scripts for you  

## Ops model at 100

- Product answers 80%+ tickets (Hebrew FAQ + AI)  
- You: under 8–12h/week (billing, incidents, VIP)  
- Metrics: churn, CAC, messaging cost/client, support hours  

## Success bar

- 100 paying logos  
- ~₪5.5–7.5k MRR  
- ~₪4k+ cash after infra/fees  
- Support load stable without hiring  
