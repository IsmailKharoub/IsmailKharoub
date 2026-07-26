# Modern UX upgrades for Plannie’s existing flows

Research-backed upgrades mapped onto the flows in [`06-ux-and-user-flows.md`](06-ux-and-user-flows.md).  
Sources: 2025–2026 patterns from Calendly, Fresha/Booksy/Square Appointments category norms, salon booking conversion practice, WhatsApp Business API workflows.

**Principle:** keep Plannie’s job-to-be-done (calendar-first pro ops + public booking + SMS), replace the interaction model with modern scheduling UX.

---

## Design north stars (what “modern” means here)

| Principle | Modern standard | Plannie today |
|-----------|-----------------|---------------|
| Time-to-book (client) | 3–5 steps, guest checkout, sticky CTA | Multi-step page; weak client surface |
| Time-to-live (pro) | Hours as rules → slots computed | Manual windows / heavy work-week UX |
| Availability model | Weekly schedule + buffers + notice + calendar busy | Windows + work week + sync (fragmented) |
| Channels | WhatsApp/SMS templates in-product | SMS primary; WA = open native app |
| Surfaces | Pro **phone-first PWA/app**; client **link/PWA** | Pro mobile-only (aligned — no desktop investment) |
| Feedback | Instant confirm + add-to-calendar + next steps | Confirm exists; weaker post-book UX |
| Cognitive load | One clear primary action per screen | FAB sheet + tours + many modals |

---

## 1. Client booking page — upgrade

### Modern pattern (Calendly / Fresha / salon best practice)

```text
Service (price · duration · pro optional)
  → Staff (or “any available”)
  → Date + time (real-time slots, month+day on one screen)
  → Details (name, phone; email optional)
  → Pay deposit if required
  → Done: confirmation, add to calendar, manage/cancel link, map/WA
```

**Targets:** complete in ~60–90s on mobile; large tap targets; progress indicator; inline validation; show scarcity (“3 left today”).

### Upgrade Plannie’s flow

| Step | Upgrade |
|------|---------|
| Service list | Group by outcome (Cut / Color / …), show **price + duration** always, photo optional not required |
| Staff | Default **Any available**; remember last stylist |
| Slots | Compute from work hours − busy − buffers − min notice; show **list of next slots** above calendar for speed |
| Form | Phone-first (IL); autofill returning clients via OTP link; require name+phone; no empty submits |
| Deposit | Inline Apple/Google Pay / local wallet where possible; clear “holds your spot” copy |
| Confirmation | Big success state + **Add to Google/Apple Calendar** + reschedule/cancel deep link + WhatsApp “message us” |
| Distribution | Embed widget, Instagram link-in-bio, Google Business book button — not only share sheet |

### Wireframe intent

```text
┌─────────────────────────┐
│  Studio Maya      HE|EN │
│  Haircut · 45m · ₪120   │
│  [Any pro ▾]            │
│  Next: Today 14:00 ●    │
│        Today 15:30      │
│        Thu 10:00        │
│  ── or pick a day ──    │
│  [calendar]             │
│  [Continue]  sticky     │
└─────────────────────────┘
```

---

## 2. Pro onboarding — upgrade

### Modern pattern

Calendly-style: connect calendar → set weekly hours → create first “event/service” → share link.  
Salon-style: profession template → services with prices → hours → go live.

Kill multi-screen gatekeeping and post-login tour spam.

### Upgrade Plannie’s `FlowNavigator`

**Replace sequential hard gates with a 4-step setup wizard (skippable advanced):**

1. **Who are you?** Profession search (keep templates)  
2. **What do you sell?** Pre-checked services → edit price/duration inline (no separate heavy screen)  
3. **When do you work?** Weekly hours editor (see §3) — *this generates availability*  
4. **Go live** Preview booking page + Share (WhatsApp / copy / IG)

Defer: branding polish, payments, punch cards, campaigns — offer as “Finish setup” checklist **after** first share, max 3 items, dismissible.

| Plannie today | Modern upgrade |
|---------------|----------------|
| Profession → username → email → services → work week → auto window → calendar → 5-step checklist + feature tours | One wizard → calendar with soft checklist (share, preview, branding) |
| Username/email as blockers | Collect phone at register; email optional until payouts |
| Feature exposure modals (WL, workflows, campaigns…) | Contextual empty-states / coach marks once, never stacked |

---

## 3. Availability setup — upgrade (biggest pro UX win)

### Modern pattern (Calendly Availability tab)

Availability = **Weekly hours** ∪ **Date overrides** ∪ **Busy from synced calendars** ∪ **Buffers / min notice / max per day** ∪ **slot increments**.  
Invitees only see computed free slots — pros never “paint windows” daily.

### Upgrade Plannie’s dual model (windows v1 + work week v2)

**Make work-week the only mental model:**

```text
Weekly hours
  Mon 09:00–13:00, 14:00–18:00
  …
Date-specific
  2026-08-12 closed · 2026-08-20 10:00–14:00
Rules (per service or global)
  Buffer before/after · Min notice · Max bookable horizon · Slot step (5/10/15)
Busy sources
  Google / Outlook (two-way)
```

| Plannie concept | Map to modern UX |
|-----------------|------------------|
| Open availability window | Remove from primary path; keep “block time” / “extra hours today” as override |
| Open slot FAB | Becomes **Block / Extra hours / Quick book** |
| Slot packing complaints | Solved by slot step + buffers + service duration math |
| Extensions tab | Rename to **Date overrides** |

**UI:** list editor for weekly hours (Calendly list view) + mini week preview showing what clients will see.

---

## 4. Calendar home — upgrade

### Modern pattern (Fresha / Square pro)

- Color-coded: confirmed / pending / break / blocked / external  
- Agenda + day + week; desktop week is default for pros  
- Tap appointment → **side sheet** (don’t full-page navigate on tablet/web)  
- Pending approvals as top banner / badge, not only inbox  
- Today strip: next 3 appointments + “needs approval (2)”

### Upgrade Plannie calendar

| Today | Upgrade |
|-------|---------|
| Full-screen route per status | **Persistent calendar + right/bottom sheet** for detail |
| FAB → 4 opaque actions | Contextual FAB: **+ Appointment** primary; overflow: Block time, Break, Share |
| Empty tap opens long availability | Empty tap → quick book **or** “not working — add hours?” |
| Drag/resize power-user | Keep, but add long-press menu: Book / Break / Block |
| Stations via bottom sheet | Staff filter chips under header |
| Search icon | Global search (client, phone, appt) |

**Phone-first (product decision):** day agenda + compact week; no desktop investment. Pros work on phones.

---

## 5. Appointment detail — upgrade

### Modern pattern

One appointment sheet with tabs or sections: **Details · Client · Payments · Messages**.  
Primary actions sticky: Message · Reschedule · Cancel.  
Secondary: Mark arrived · Checkout / pay · No-show · Rebook.

### Upgrade status-specific screens

Keep status logic; unify chrome:

```text
┌ Sheet: Maya Cohen · Haircut ──────────┐
│ Today 14:00–14:45 · Confirmed         │
│ [Message ▾ WA/SMS] [Reschedule]       │
│                                       │
│ Client · history · notes              │
│ Payment · deposit paid / charge       │
│ Timeline · booked → reminded → …      │
└───────────────────────────────────────┘
```

| Waiting approval | Approve / Decline with optional message; swipe actions on list |
| Approved | Mark arrived → optional checkout; one-tap **Rebook in 4 weeks** |
| Cancelled | **Offer slot to waitlist** (auto) + rebook CTA |

Replace “open WhatsApp app with template” as only path → **send template in-channel** when WA Business connected; fallback to native share.

---

## 6. Approvals & auto-confirm — upgrade

### Modern pattern

Default **instant book** for low-risk services; approval only when toggled (new clients, long services, no deposit).  
Pending queue is a first-class inbox filter.

### Upgrade

- Auto-confirm **on by default** after onboarding (Plannie’s switch inverted in spirit)  
- Rules: require approval if: new client OR no deposit OR service flagged  
- Push + badge on Calendar tab; batch approve  
- Client sees “Request sent” vs “You’re booked” copy clearly (big trust gap today)

---

## 7. Messaging & reminders — upgrade

### Modern pattern (2026 beauty ops)

WhatsApp Business API + SMS fallback; editable templates; reminder at T-24h and T-2h; confirm/cancel buttons in message; post-visit follow-up + review ask.

### Upgrade Plannie messaging

| Flow | Upgrade |
|------|---------|
| Client messages settings | **Template studio**: Booked / Reminder / Cancelled / Follow-up / Birthday — edit HE+EN, preview |
| Reminders | Multi-step sequences; channel preference WA→SMS→Email |
| Appointment actions | Send from sheet without leaving app |
| Campaigns | Keep, but separate from transactional templates |
| Opt-out | One-tap STOP that actually works (review pain) |

---

## 8. Customers / CRM — upgrade

### Modern pattern

Client profile = timeline + preferences + consents + spend; book-next from profile; tags; no-show rate.

### Upgrade

- From customer: **Book again** (pre-filled service)  
- Import contacts → merge duplicates by phone  
- Show no-show / late flags  
- Intake forms attached to client file (not only KYC)  
- Bulk message with audience filters + quiet hours  

---

## 9. Payments — upgrade

### Modern pattern (Square / Fresha)

Deposit at booking; tip + checkout at end; saved cards; clear refund; payouts status visible.

### Upgrade

- Deposit as checkbox on service with amount/percent — shown in booking step  
- Appointment sheet **Checkout** mode (services + tip + invoice)  
- KYC as progressive (earn trust) not a wall before first deposit test  
- Transparent SMS/credit wallet on Tools home  

---

## 10. Team / stations — upgrade

### Modern pattern

Staff calendars with color; “any available” routing; permissions (front desk vs stylist); shifts.

### Upgrade

- Rename Station → **Staff** in UI  
- Round-robin / balanced assignment for “any”  
- Front-desk role: see all, limited pricing edits  
- Shift publishing from same weekly hours UI  

---

## 11. Insights & growth — upgrade

### Modern pattern

Weekly digest: utilization %, rebook rate, no-show %, revenue; one recommended action.

### Upgrade Insights tab

Replace dense charts-first with:

1. **This week** strip (4 KPIs)  
2. **Do this next** (e.g. “12 clients due to rebook — send WA”)  
3. Waiting list & campaigns as actions, not separate archaeology  

---

## 12. Navigation IA — upgrade

### Modern pro IA

```text
Today (agenda+day)     ← rename Calendar mental model for solos
Calendar (week)
Clients
Inbox (approvals + messages)
More (services, availability, booking page, payments, settings)
```

Or keep 5 tabs but redefine:

| Tab | Modern content |
|-----|----------------|
| Calendar | Day/week + pending banner |
| Clients | CRM (was buried in Tools) |
| Inbox | Approvals + notifications + WA threads |
| Grow | Campaigns, reviews, referral, booking page |
| Settings | Availability, services, team, billing |

**Tools grid → deprecate** as primary nav; it’s a junk drawer pattern.

---

## 13. Flow-by-flow upgrade matrix

| Existing flow | Keep | Change to |
|---------------|------|-----------|
| Auth + SMS verify | Phone OTP | Passkeys/Apple later; clearer free vs paid |
| Profession templates | Yes | Inline into setup wizard |
| Services CRUD | Yes | Inline price/duration; add-ons; categories |
| Work week | Yes | Sole availability source + overrides + rules |
| Open availability windows | Advanced only | Computed slots by default |
| FAB create | Yes | Primary = Book; secondary = Block/Break |
| Waiting approval | Yes | Rule-based; batch; clearer client copy |
| Approved detail | Yes | Sheet UX; WA in-app; rebook; checkout |
| Share + customer web preview | Yes | Live preview editor + embeds |
| Campaigns / WL / punch cards | Yes | Progressive disclosure after activation |
| Desktop block | Ignore | Phone-first only (side-hustle scope) |
| Feature tour stack | Remove | Empty states + 1 coach mark |

---

## 14. Suggested UX redesign sequence (product, not eng)

**Phase A — Client conversion**  
New booking page (3–5 steps), confirmation, manage link, WA share templates.

**Phase B — Pro availability mental model**  
Weekly hours + rules; stop teaching “windows”; phone day/week calendar.

**Phase C — Appointment sheet + messaging**  
Unified detail sheet; template studio; WA Business.

**Phase D — IA cleanup**  
Clients tab; kill Tools junk drawer; soft setup checklist only.

**Phase E — Growth loops**  
Rebook prompts, review asks, waitlist autofill, weekly insight actions.

---

## 15. Measurable UX goals

| Metric | Target |
|--------|--------|
| Pro time-to-first-share | under 5 minutes |
| Client booking completion rate | +20–40% vs current page |
| Steps to book (client) | ≤ 5 |
| % bookings needing manual approval | &lt; 20% (rules) |
| Phone weekly active pros | primary surface; desktop out of scope |
| Reminder confirm/cancel in-thread | &gt; 30% of reminders |

---

## References (external patterns)

- Calendly availability model: weekly hours, date-specific hours, buffers, min notice, calendar busy  
- Salon booking conversion: mobile-first, grouped services, sticky CTA, short forms, instant confirm ([Authic](https://www.authic.io/blog/online-booking-conversion-best-practices-for-salons))  
- Category peers: Fresha / Booksy / Square Appointments (ops + payments + staff)  
- WhatsApp: Business API for reminders/booking, not personal WA deep links only  

---

## Bottom line

Upgrade = **Calendly-grade availability + Fresha-grade pro calendar + WhatsApp-native client comms**, keeping Plannie’s IL SMB DNA (SMS, local payments, profession templates).  
Do not rebuild 90 screens — collapse windows/tours/tools into a smaller, sharper flow set above.
