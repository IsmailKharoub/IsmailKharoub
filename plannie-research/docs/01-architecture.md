# Architecture & tech stack

## App identity

| Field | Value |
|-------|--------|
| Package | `com.chenyo.user.plannie` |
| Version analyzed | **7.76.9** (versionCode `7769`) |
| Play Store (IL) also listed | **8.0.3** (newer than APKPure latest) |
| Min / target SDK | 24 / 35 |
| Orientation | Portrait lock |
| Deep link scheme | `plannie://` |
| iOS sibling id (from Cordova widget) | `com.chenyo.app` |
| Web twin | `https://web.plannieapp.com` (same SPA, Azure static host) |

## High-level architecture

```
┌─────────────────────────────────────────────┐
│ Android / iOS Cordova shell                 │
│  MainActivity → WebView loads assets/www    │
│  Plugins: Firebase, AppsFlyer, Mixpanel,    │
│  contacts, SMS, camera, HTTP, deeplinks…    │
└───────────────────┬─────────────────────────┘
                    │ HTTPS + custom headers
┌───────────────────▼─────────────────────────┐
│ new-server.plannieapp.com  (prod API)       │
│ new-qa-server.plannieapp.com (QA)           │
└───────┬─────────────┬─────────────┬─────────┘
        │             │             │
   Firebase      Azure Blob    Cloudinary
   (push/RTDB)   (images)      (branding)
        │
   Nylas / Google Calendar, PayPal, Hyp,
   EasyCount, iForms, AppsFlyer, Mixpanel,
   Coralogix, Cloud Functions (EU)
```

## Client stack (from decompile)

| Layer | Choice |
|-------|--------|
| Shell | **Apache Cordova** (`org.apache.cordova`, `config.xml` widget) |
| UI framework | **AngularJS 1.x** module `app1` |
| UI kit / CSS | Bootstrap, Materialize, custom “boo” styles, Material Icons |
| Calendar UI | **FullCalendar** + Mobiscroll + custom slot controllers |
| Charts | ApexCharts (insights) |
| Animations | Lottie |
| i18n | `angular-translate` — **Hebrew + English** (RTL-aware) |
| HTTP | Angular `$http` + `cordova-plugin-advanced-http` |
| Storage | cookies, `localStorage`, `cordova-plugin-nativestorage` |
| Crash / push | Firebase (Crashlytics natives + FirebaseX Cordova) |
| Attribution | AppsFlyer |
| Product analytics | Mixpanel (+ Google Analytics snippet in `index.html`) |
| Logging | Coralogix |
| OTA hint | CodePush Azure URL appears in CSP comments (legacy) |

### Cordova plugins (representative)

- `cordova-plugin-firebasex` — push / messaging
- `cordova-plugin-appsflyer-sdk`
- `cordova-plugin-mixpanel`
- `cordova-plugin-advanced-http`
- `cordova-plugin-contacts` — import clients
- `cordova-sms-plugin`
- `cordova-plugin-camera` / image picker
- `ionic-plugin-deeplinks`
- `cordova-plugin-sign-in-with-apple`
- `cordova-plugin-x-socialsharing`
- `cordova-plugin-email-composer`
- `cordova-plugin-inappbrowser` — PayPal / OAuth / KYC web flows
- Diagnostics, permissions, clipboard, zip, toast, statusbar, orientation

### Native code reality

Almost no custom Java business logic. Package `com.chenyo.user.plannie` is a thin Cordova `MainActivity`. Heavy lifting is in `assets/www` (~39 MB unpacked web assets; app JS under `boo/app` ~3.9 MB).

## Auth / request model

From `js/utils.js` `getRequestHeaders`:

- `Authorization: Bearer <accessToken>` (localStorage)
- `x-request-id`, `x-session-id` (UUID per session)
- `x-plannie-client: App`
- `x-plannie-platform` / `x-plannie-client-version`

Server CORS advertises additional headers: `x-plannie-token`, `x-plannie-userid`, `x-plannie-phone`, `x-plannie-internalpass`.

Login paths observed: phone/SMS verify views, Facebook login, Apple login, impersonation / monitor restricted login, refresh token endpoint.

## Environments

| Env | API base |
|-----|----------|
| Production | `https://new-server.plannieapp.com` |
| QA | `https://new-qa-server.plannieapp.com` |
| Local | `http://localhost:3105` |
| Lambdas (commented) | `https://europe-west1-plannie-e7b8d.cloudfunctions.net/` |
| Firebase project | `plannie-e7b8d` |
| Images | `plannieimages.blob.core.windows.net`, Cloudinary `hsedtnl8j` |

## Packaging notes

APKPure delivers an **XAPK** (split APKs): base + `config.armeabi_v7a` + locale splits (`en`, `iw`, `ar`, `ru`) + density. Languages in splits match IL-focused product (Hebrew primary).

## Implications

1. **Product is a web app** — same codebase powers mobile WebView and `web.plannieapp.com`.
2. **Legacy debt is the stack**, not the domain. AngularJS + Cordova still ships, which explains WebView performance and plugin sprawl.
3. For an alternative, treat Plannie as a **feature checklist + domain vocabulary**, then implement with a modern stack (see [04-build-alternative.md](04-build-alternative.md)).
