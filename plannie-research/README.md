# Plannie competitive reverse-engineering research

Analysis of **Plannie Appointment scheduling** (`com.chenyo.user.plannie` **v7.76.9**) downloaded from APKPure via `apkeep`, decompiled with `jadx` + `apktool`.

## Purpose

Extract product/architecture patterns to inform building an **original alternative**. This is clean-room competitive research — **do not copy** Plannie code, assets, trademarks, or proprietary content.

## Artifacts (this cloud run)

| File | Notes |
|------|--------|
| `/opt/cursor/artifacts/plannie-7.76.9.xapk` | Full split package from APKPure |
| `/opt/cursor/artifacts/plannie-7.76.9-base.apk` | Base APK only (~23 MB) |

Local decompile (gitignored): `apk/`, `analysis/`, `tools/`.

## Docs

0. [Methodology](docs/00-methodology.md)
1. [Architecture & tech stack](docs/01-architecture.md)
2. [Product features & domain model](docs/02-product-features.md)
3. [API surface & integrations](docs/03-api-and-integrations.md)
4. [Best practices for building an alternative](docs/04-build-alternative.md)
5. [Product gaps / opportunities](docs/05-product-gaps.md)
6. [UX & user flows](docs/06-ux-and-user-flows.md)
7. [Modern UX upgrades](docs/07-modern-ux-upgrades.md)
8. [Unit economics — 100-client side hustle](docs/08-unit-economics-side-hustle.md)
9. [Side-hustle plan (phone-first, AI-managed)](docs/09-side-hustle-plan.md)
10. [30 hours/week coverage](docs/10-thirty-hours-week.md)
11. [3 researched Israel-first side projects (v2)](docs/11-three-more-side-projects.md) — *superseded*
12. [Where the real gaps are (v3)](docs/12-where-the-real-gaps-are.md) — platform ecosystems (Atlassian Forge / monday.com / Open Dental), not WhatsApp channels

## Quick verdict

Plannie is a **Cordova hybrid shell** wrapping a large **AngularJS 1.x** web app (“boo”). Business logic lives mostly in JS under `assets/www`, talking to `https://new-server.plannieapp.com` with custom `x-plannie-*` headers + Bearer tokens. Strengths: deep SMB scheduling UX (IL market), SMS reminders, multi-station teams, payments/KYC, calendar sync. Weaknesses: legacy hybrid stack, large WebView bundle, dated frontend.

**Recommended alternative direction:** modern native or Capacitor/RN client + typed API backend; keep the *product shape* (calendar-first pro app + public booking page + SMS + local payments), not their implementation.
