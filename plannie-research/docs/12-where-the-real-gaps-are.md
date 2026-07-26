# Where the real gaps are (v3): platform ecosystems, not channels — OFF-BRIEF

> **Off-brief.** The ask was Israeli micro-SaaS in the Plannie lane; this doc drifted into marketplace app development. The competitor pricing tables below are still useful evidence. For the actual answer see **[13-three-micro-saas-same-lane.md](13-three-micro-saas-same-lane.md)**.


## First, the correction

I anchored on WhatsApp because Israeli SMBs live there. That's a **distribution comfort, not an advantage** — any competitor adds a WA number in an afternoon, Meta owns the rails, and it doesn't change what the buyer is willing to pay. Worse, every idea I proposed required selling a *new tool* to a business that doesn't buy tools. That's the slowest, most expensive motion available to a solo operator.

This round I went looking for the opposite shape: **markets where money already moves, a buyer already has a budget, and distribution + billing + trust are already assembled by someone else.**

---

## What the research killed

### 1. Israeli micro-SaaS verticals are a price war, not a gap

Every "obvious" IL vertical already has 4–6 vendors converging on ₪89–₪309/mo:

| Vertical | Incumbents | Price point |
|----------|-----------|-------------|
| חוגים / studios | [TAZMAN](https://tazman.co.il/) (₪89/169/309/729), [Arbox](https://www.arbox.co.il/verticals/hugim), [Club-Tec](https://club-tec.co.il/), [Plando](https://plando.co.il/crm_for_hugim), Senzey | ₪89–729 |
| Therapy clinics | [CliniKit](https://clinikit.co.il/) ₪89.90–119.90/user, [Base CRM](https://basecrm.co.il/pro/therapists/) ₪99, Tipulog ₪75–395 | ₪75–395 |
| Driving instructors | [iDrive](https://idrive.guru/) ₪120/mo, [Sivan](https://www.cma-sivan.co.il/), [Dio](https://static.diodrive.co.il/), Adi Mobile | ~₪120 |
| Fitness | [Arbox](https://finder.startupnationcentral.org/investor_page/pico-venture-partners) — **$4.6M raised**, 250k+ end users | — |

CliniKit already ships AI session summaries at ₪89.90. There is no room to "outperform" here except on price, which is the one axis we lose on.

### 2. "Regulation + AI SaaS" is now the most farmed strategy online

Last round's Shaar/EUDR-style logic looked smart until I priced the field. Every mandate already has three near-identical, SEO-first indie products:

| Mandate | Existing indie entrants | Price |
|---------|------------------------|-------|
| EUDR (deforestation) | [EUDR Vault](https://www.eudrvault.com/pricing) £49–299/mo, [TracePlot](https://traceplot.com/blog/eudr-compliance-costs-sme) €59/mo, [EUDRCheck](https://solidwaretools.com/eudrcheck/eudr-compliance-cost-small-business.html) €299/dossier, [SIP](https://smartintegrityplatform.com/eudr-software-with-ai/) €2,950/yr | €59–2,950 |
| CBAM (definitive phase from 1 Jan 2026) | CbamTrack ~€79/mo + consultancies | €79+ |
| UK packaging EPR | [eprcompliance.co.uk](https://eprcompliance.co.uk/) £29/mo | £29 |
| GPSR EU Responsible Person | [eugpsr.eu](https://eugpsr.eu/) €199–549/yr, Garay €150–699/yr, Eldris, Euverify, EaseCert… | €150–699/yr |
| FMCSA / DQF | [FileFlo](https://www.getfileflo.com/blog/best-dot-compliance-software-2026) $89–299, [FleetCollect](https://fleetcollect.net/) $14–19, [DOTDriverFiles](https://dotdriverfiles.com/pricing/) $5/driver, GoExpirely $79, TruckComplianceHQ $29 | $5–299 |
| Davis-Bacon certified payroll | [CertifiedPayrollPro](https://www.certifiedpayrollpro.com/blog/lcptracker-pricing-what-it-actually-costs-2026) $49–249 vs LCPtracker quote-only | $49–249 |

**A mandate is not a moat.** Deadlines are public, so everyone arrives at once, and the entry play (programmatic SEO + a form) is exactly what an AI-assisted solo builder produces. We'd be the fourth identical site with no distribution.

---

## The pattern that actually holds

Build inside a **platform marketplace** where:

- the customers are already there and already paying the platform,
- the platform handles billing, tax, renewals and trust,
- discovery is in-product (not bought with ads),
- and the platform is **actively paying developers to show up right now.**

That last part is a genuine, time-boxed window:

| Platform | Installed base | Marketplace density | What the platform pays you |
|----------|---------------|--------------------|----------------------------|
| **Atlassian** | [300,000+ customers](https://developer.atlassian.com/platform/marketplace/app-editions-pricing-and-packaging-guide/) | [~6,000 apps / 2,000+ partners](https://amoeboids.com/blog/atlassian-marketplace-explained/) | [**0% revenue share on Forge up to $1M lifetime**](https://www.atlassian.com/blog/development/updates-to-marketplace-revenue-share-2026) |
| **monday.com** | [250,000 customers](https://www.monday.com/w/app-developers) | **900+ apps**, 1.6M installs | [**0% until $200k lifetime**, then 85/15](https://developer.monday.com/apps/docs/subscriptions-payments-and-billing) |
| **Open Dental** | 14–18% of US dental PMS, tens of thousands of practices | [hundreds of enrolled API devs](https://www.opendental.com/site/vendorsthirdparty.html) | Open REST API, **no per-call fee** |

Two more facts that make Atlassian the standout: enterprise customers spend roughly **$4 on apps for every $1 on core products**, and the count of customers spending **>$50k/yr on apps was 15,169 in FY24 (+19% YoY)**, with >$1M spenders up 46% ([Atlassian pricing guide](https://developer.atlassian.com/platform/marketplace/app-editions-pricing-and-packaging-guide/), [PartnerAwesome](https://partnerawesome.com/atlassian-marketplace-success-factors/)). And **Connect support ends after December 2026**, which forces thousands of customers to re-evaluate apps they'd otherwise never touch — a switching window that normally doesn't exist in enterprise software.

Solo operators do win here: Atlassian's own April 2026 partner spotlight features [Just](https://community.atlassian.com/forums/App-Central-discussions/Marketplace-Partner-Spotlight-Just/td-p/3219769), a Forge app built by a **one-person studio**.

---

## Bet A — Forge app for compliance document control (Confluence/Jira)

**Why this market is proven, with prices on the table**

Regulated teams already pay real money to turn Confluence into a controlled-document system:

| App | Price |
|-----|-------|
| [SoftComply eQMS](https://softcomply.com/product/eqms/) | **$2,900/yr** |
| [SoftComply Document Manager](https://softcomply.com/product/document-manager/) | **$1,500/yr** |
| Comala Document Management | ~$15/mo (10 users) → $70/mo (50 users) |
| SoftComply Risk Manager | $15/mo (10) → $175/mo (50) |

That's before Atlassian's own seats. The buyer has a **compliance budget**, not a software budget — the invoice is compared against auditor day-rates, not against a ₪89 SaaS.

**The gap:** today's leaders are shaped for **medical device** regulation (ISO 13485 / IEC 62304 / 21 CFR 11) and are sold as multi-app stacks that a customer must assemble and configure. The much larger population of teams chasing **ISO 27001 / SOC 2** wants one narrow thing: controlled approvals with e-signature, read-confirmations, version freeze, and a **one-click auditor evidence pack** — without buying a medical-device QMS or a standalone GRC platform.

**Product (thin, Forge-native):** document lifecycle state + approval with signature, read-confirmation tracking, immutable snapshot per approved version, control-to-page mapping, and an export that an auditor accepts without argument.

**Pricing:** per-user tiers benchmarked against Comala (Marketplace exposes [Price Guidance](https://developer.atlassian.com/platform/marketplace/pricing-payment-and-billing/) so you can position deliberately), plus a higher edition gated on admin controls — the exact upsell Atlassian's own packaging guide recommends.

**Why we can outperform quickly:** Forge means no infrastructure to run, no SOC 2 of our own to sell, no payment stack, no ad budget — and **we keep 100% of revenue to $1M**. The Connect sunset gives a reason for buyers to look.

**Risks to respect:** Rovo Studio lets customers self-build trivial utilities, so a one-macro app is not defensible — the moat is the audit artifact and the workflow rigor. Enterprise buyers will ask security questions; Forge (Runs on Atlassian) answers most of them for us.

**Validation (cheap, no code):** filter the Marketplace for document/approval/compliance apps, record install counts, ratings under 4, last-update dates, and Connect-only status; then post the auditor-export artifact as a mock in two Atlassian community threads and count demo requests. Kill if incumbents are all Forge-migrated, well-rated, and already shipping the evidence pack.

---

## Bet B — monday.com app for Israeli finance operations

**Why the channel is the advantage this time**

monday.com is an **Israeli** company with 250,000 customers, a 3,000-rep certified partner network, and a partner channel that drove [23% of gross added ARR in 2025](https://www.businesswire.com/news/home/20260217722947/en/monday.com-Reinforces-AI-First-Work-Platform-With-Expanded-Partner-Program) — and only **900+ apps** in its marketplace. Compare that to Shopify's ~13,786 apps for a similar-order merchant base. The marketplace is under-built relative to the customer base, monday collects the money for us, and **we owe nothing until $200k lifetime revenue**.

For an Israeli founder, the partner network is a warm channel that competitors abroad cannot buy: implementation partners need apps to close local deals.

**The wedge:** Israeli tax reality inside monday. Deals and projects live on boards; invoices live somewhere else entirely. An app that issues a **compliant Israeli tax invoice with a מספר הקצאה** (allocation number) directly from a board item — and tracks collection status back onto the item — is something no marketplace app does, and it is squarely in the path of the [₪5,000 threshold that took effect 1 June 2026](https://www.grantthornton.co.il/insights1/tax-insignths/2026/From_June_the_allocation_number/).

Note the difference from last round: the regulation isn't the business — it's the **feature that makes a platform app unavoidable**. Distribution comes from monday, not from ranking for "מספר הקצאה".

**The moat is the grind:** SHAAM/Tax Authority integration, 90-day authorization refresh, document numbering rules, and Israeli bookkeeping approval. That work is boring, credential-bound, and exactly what a generic app-store competitor won't do.

**Risks:** the addressable slice is monday customers in Israel (smaller TAM than Bet A), and Morning/iCount could ship a monday app. Mitigation: be first, be native, and lean on partners who already resell monday locally.

**Validation:** talk to five monday implementation partners in Israel about whether IL invoicing blocks deals; check the marketplace for any IL-tax app; confirm SHAAM API access requirements before writing product code.

---

## Bet C — Open Dental revenue-recovery app (highest ARPU, most operational cost)

**Why the market is proven:** US practices already pay **$150–$500/mo per location** for a *single* administrative job — insurance verification ([Avized 2026 pricing survey](https://avized.com/insights/best-dental-insurance-verification-software-2026), AirPay ~$199–349, DentiVerify $99–399). Manual verification costs about **$10.60 per patient** versus ~$0.30 automated ([analysis](https://thebigbot.com/blog/dental-insurance-verification-automation-2026)). This vertical buys software that returns money.

**Why Open Dental is the door:** it has an **open REST API with no per-call fee**, while Dentrix requires an approved partner program and middleware for write access. That asymmetry means we can ship against Open Dental's installed base (14–18% share) without asking anyone's permission.

**The wedge — not verification.** Verification is crowded and now funded (Zuub, Needletail, Toothy, Foji). Go where the output is a dollar figure the owner can verify: **payment integrity** — reconcile posted insurance payments against contracted fee schedules to surface underpayments, plus aging unscheduled treatment. The pitch is a "found money" report, not a workflow to adopt.

**Pricing:** $299–$499/mo per location, justified by recovered dollars. ~30 locations ≈ $9–15k MRR.

**Honest costs:** this is the only bet with **HIPAA/BAA obligations** and human-in-the-loop QA. It's the highest revenue per logo and the slowest to stand up. I have **not** yet verified vendor density for payment-integrity tooling specifically in dental — that's the first validation step, not an assumption.

---

## Side-by-side

| | A: Forge compliance docs | B: monday IL finance | C: Open Dental payment integrity |
|--|--------------------------|----------------------|----------------------------------|
| Where demand already exists | $1.5–2.9k/yr apps sold today | 250k monday customers, IL-heavy | $150–500/mo/location spend |
| Who handles billing/trust | Atlassian | monday.com | You (BAA required) |
| Platform take rate | **0% to $1M** | **0% to $200k** | n/a |
| Ad spend needed | ~none (in-product discovery) | ~none (marketplace + partners) | outbound required |
| Time to first revenue | fastest | fast | slowest |
| Our unfair edge | Connect sunset + Forge window | Israeli partner network + SHAAM grind | open API + payment-integrity math |
| Main risk | Rovo Studio commoditizes thin apps | smaller TAM; Morning could enter | HIPAA + ops load |

**Order: A, then B, then C.** A and B can run in parallel because both are Forge/monday-hosted with platform billing — no infrastructure to split attention. C only makes sense once one of them is paying the bills.

---

## The rule I'm applying from now on

Before building anything, it has to pass all four:

1. **Someone already pays for this job** — with a public price we can point at.
2. **Distribution exists without buying ads** — a marketplace, an API ecosystem, or a partner channel.
3. **The hard part is grind, not insight** — certification, integration, an audit artifact. If a landing page and a form is the whole product, we lose.
4. **We can ship the wedge in weeks, not quarters**, and the buyer can adopt it without switching systems.

WhatsApp bots failed #3. Regulation SEO SaaS failed #2 and #3. IL vertical SaaS failed #1 on price. These three pass all four.
