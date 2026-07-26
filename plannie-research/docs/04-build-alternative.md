# Best practices for building an original alternative

Synthesized from Plannie’s product shape and architectural smells. Implement clean-room — **new code, new brand, new API**.

## 1. Product strategy (what to copy as *ideas*)

Ship a **calendar-first SMB scheduling product** for one-on-one service businesses:

| Must-have MVP | Why Plannie proves it |
|---------------|------------------------|
| Work-week + open availability | Core supply side |
| Public booking page (shareable link) | Activation metric they obsess over |
| Services with duration/price | Booking unit |
| Client CRM-lite + import contacts | Pro workflow |
| SMS reminders (local numbers) | IL / SMB default channel |
| Approve / move / cancel appointments | Daily ops |
| Hebrew + English, proper RTL | Market fit |
| Profession templates | Time-to-first-booking |

| Phase 2 | Notes |
|---------|--------|
| Multi-staff stations | Team plan upsell |
| Waiting list | Utilization |
| Punch cards / packages | Retention + cashflow |
| Calendar sync (Google/Microsoft) | Trust / double-booking prevention |
| Client payments + deposits | No-show reduction |
| Campaigns / batch SMS | Growth loop |
| Insights | Retention for power users |

**Differentiation ideas vs Plannie:** modern performance, desktop web pro app (they ship “desktop not supported”), clearer pricing, better offline, stronger WhatsApp-native flows, vertical packs (clinic vs salon), open API for partners.

## 2. Recommended modern architecture

Do **not** start with Cordova + AngularJS.

### Option A — recommended for IL SMB + web booking

```
Mobile pro app:  React Native (Expo) or Flutter
Web pro app:     same API, Next.js/React (desktop supported)
Public booking:  Next.js SSR/ISR microsites per business
API:             NestJS / Fastify (TypeScript) or similar
DB:              Postgres + Redis
Jobs:            queue for SMS/email/reminders (BullMQ / Cloud Tasks)
Files:           S3/GCS/Azure Blob + image CDN
Push:            FCM / APNs
Auth:            phone OTP (+ Apple/Google optional)
```

### Option B — one codebase hybrid (closer to Plannie, less debt)

```
Capacitor + React/Vue + shared design system
+ separate lightweight public booking site
```

Prefer A if native calendar gestures and reliability matter; B if team is web-heavy.

### Domain services (bounded contexts)

1. **Identity** — users, OTP, sessions, roles (owner/staff)  
2. **Catalog** — professions, services, branding  
3. **Availability** — workweek rules, exceptions, open windows  
4. **Booking** — appointments, conflicts, approvals, waiting list  
5. **CRM** — customers, tags, notes, import  
6. **Messaging** — SMS/email/push templates + opt-out  
7. **Billing** — SaaS subscriptions + usage (SMS credits)  
8. **Payments** — merchant onboarding, charges, refunds, invoices  
9. **Integrations** — Google/Microsoft calendar, WhatsApp later  

Keep the calendar conflict engine **server-side** (Plannie’s client is huge partly because logic leaked into WebView).

## 3. Domain model (clean redesign)

```text
Account
  └── Membership(s) → Business
                        ├── StaffMember / Calendar
                        ├── Service[]
                        ├── Customer[]
                        ├── AvailabilityRule[] + Override[]
                        ├── Appointment[]
                        ├── Package/PunchCard[]
                        └── BookingPage (slug, theme)
```

**Appointment state machine (explicit enums):**  
`draft → pending → confirmed → completed | cancelled | no_show` (+ `rescheduled` as transition).

**Availability:** store canonical UTC instants; render in business timezone. Plannie’s timezone bugs/history show why this must be centralized.

**Idempotency:** every booking/payment mutation needs idempotency keys (SMS + PayPal retries).

## 4. API design practices

- Versioned REST or RPC (`/v1/...`) with OpenAPI  
- Auth: Bearer access + refresh; staff scoped by `business_id`  
- Request IDs / session IDs (good Plannie habit — keep)  
- Cursor pagination for events/customers (they added paging configs for a reason)  
- Server-driven remote config for professions, plans, feature flags  
- Webhooks for payment + calendar providers  
- Never expose internal support impersonation without step-up auth + audit  

## 5. UX best practices (steal the *workflow*, not the UI)

1. **First session goal:** publish booking link in under 5 minutes via profession template.  
2. **Home = calendar**, secondary tabs: clients, inbox, settings.  
3. One primary CTA on calendar: “Open hours” / “Add break” / “Add appointment”.  
4. Booking page: mobile-first, service → staff → slot → details → confirm.  
5. Reminder copy: short SMS with reschedule/cancel link.  
6. RTL from day one (logical CSS properties, not mirrored hacks).  
7. Avoid card-soup dashboards; Plannie wins by being an **operator tool**, not a marketing site.

## 6. Monetization model that fits

Mirror the successful structure, not the brand:

- **Trial** with SMS quota  
- **Entry** for solos (event or service caps)  
- **Team** with per-seat / per-station pricing  
- Usage: SMS packs  
- Optional take-rate or SaaS-only on payments  

Local payments matter in IL: plan for **Cardcom / Hyp / Tranzila / Grow** style acquirers + invoices (Green Invoice / EasyCount equivalents), not Stripe-only.

## 7. Integrations priority

| Priority | Integration | Purpose |
|----------|-------------|---------|
| P0 | SMS gateway (IL) | Reminders |
| P0 | FCM/APNs | Pro alerts |
| P1 | Google Calendar | Sync |
| P1 | Local payments + invoicing | Deposits |
| P2 | Microsoft / Apple Calendar | Parity |
| P2 | WhatsApp Business API | Channel shift |
| P3 | Accounting export | SMBs |

Prefer **direct Google/Microsoft Graph** over Nylas unless you need unified provider abstraction fast.

## 8. Engineering practices Plannie under-invested in (do these)

- Typed clients (OpenAPI → TS/Swift/Kotlin)  
- Strict CSP, certificate pinning optional on mobile  
- Feature flags + remote config without shipping app releases  
- E2E tests on booking conflict cases  
- Load test slot search for popular pros  
- Observability: structured logs, tracing, product analytics (PostHog/Mixpanel)  
- Separate **public booking** deploy from **authenticated pro app**  
- Accessibility + desktop pro web  

## 9. Suggested MVP milestone plan

1. **M0** — Auth OTP, business, services, workweek, public booking, create appointment  
2. **M1** — SMS reminders, cancel/reschedule links, basic CRM + contact import  
3. **M2** — Subscriptions + Hebrew polish + profession templates  
4. **M3** — Staff calendars, Google sync, waiting list  
5. **M4** — Payments/deposits, punch cards, insights  

## 10. Legal / ethical

- Do not redistribute Plannie APKs/sources in public repos  
- Do not reuse their icons, Lottie, copy, or trademarks  
- Do not scrape authenticated APIs or customer data  
- This research folder gitignores binaries and decompilations; keep it that way  

## Bottom line

Plannie’s moat is **workflow depth for Israeli service SMBs** (calendar + SMS + local payments + templates), not their Cordova/AngularJS implementation. Build the same *job-to-be-done* on a modern typed stack with server-authoritative scheduling, and beat them on performance, desktop, WhatsApp, and developer/API openness.
