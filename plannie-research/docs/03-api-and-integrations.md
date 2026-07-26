# API surface & integrations

## Base URLs

- Prod: `https://new-server.plannieapp.com`
- QA: `https://new-qa-server.plannieapp.com`
- Monitor / support: `https://plannie-monitor-service.herokuapp.com`

Public unauthenticated examples that responded during research:

- `GET /validateNewVersion` → `{"latestVersion":"7.76.0"}`
- `GET /parameters/getPricingPlans`
- `GET /parameters/getAllProfession?timeZone=...`

## Auth headers (client)

```
Authorization: Bearer <accessToken>
x-request-id: <uuid>
x-session-id: <uuid>
x-plannie-client: App
x-plannie-platform: <android|ios|...>
x-plannie-client-version: <semver>
```

CORS allow-list also mentions: `x-plannie-token`, `x-plannie-userid`, `x-plannie-phone`, `x-plannie-internalpass`.

## `mainService` method catalog (~141 methods)

Grouped by domain (names from decompiled factory — implement **your own** routes; do not scrape their private APIs for production use).

### Users & auth

`login`, `register`, `appleLogin`, `fbLogin`, `resetPass`, `logout`, `getRefreshToken`, `updateUser`, `deleteAccount`, `impersonateLogin`, `verifyImpersonateToken`, `doRestrictedLogin`, `getProInfo`, `updateUserAnalytics`, `updateUserSawFeature`, `updateUserSegment`, `incrementUserCounter`, `claimTrialExtension`, `sendUserInterests`

### Stations / team

`getStations`, `paging`, `addChild`, `removeChild`, `pairChild`, `unpairChild`, `setStationState`

### Calendar / events

`getWorkweek`, `updateWorkweek`, `extendWorkweekAvailability`, `getExtensions`, `getProEvents`, `getEventData`, `createWindow`, `updateWindowOveload`, `removeWindow`, `getAllWindows`, `updateSlot`, `resizeSlot`, `moveSlot`, `addRepetitiveSlot`, `approveRepetitiveEvent`, `inlineApprove`, `createBreak`, `addWindowEvent`, `removeSlot`, `reopenSlot`, `manualApproveWindowEvent`, `removeOpenPortionFromWindowEvent`, `updateEvent`, `updateBulk`, `updateFutureEventsWithNewService`, `updateWindowsWithNewService`, `searchEvents`, `getEventSequenceNumberOfCustomer`, `saveMeetingSummary` (+ Upapp variants)

### Customers

`createCustomer`, `importCustomers`, `getCustomers`, `getPendingCustomers`, `updateCustomerPartnerStatus`, `shareBusinessPageWithClients`

### Services

`createServices`, `updateServices`, `orderServices`, `removeServices`, `uploadServiceImage`, `uploadProfileImage`, `uploadImage`

### Messaging

`getInbox`, `sendReminderDemo`, `sendBatchSms`, `sendBatchEmail`, `signOnBulkMessages`, `notifySlack`

### Payments / punch cards / SaaS

`createMerchantAccount`, `createProviderInGeneralMerchant`, `activateProviderInGeneralMerchant`, `disconnectProviderInGeneralMerchant`, `getMerchantAccountStatus`, `updateMerchantKyc`, `getMerchantKyc`, `submitMerchantKyc`, `detachPayment`, `paymentTransactionReceipt`, `refundPaymentTransaction`, `signOnTranscation`, `signOnTransactionForToken`, `verifySubscriptionPayPal`, `verifyTokenPurchasePayPal`, `cancelSubscription`, `getSaasInvoices`, `activateCouponCode`, `activateEasyCountCouponCode`, punch-card CRUD (`createPunchcardTemplate`, `attachPunchcardToClient`, `refundPunch`, …)

### Insights / waitlist / referrals

`getInsights`, `getSpecificInsights`, `getWaitingList`, `addToWaitingList`, `removeFromWaitingList`, `getReferrals`, `getReferralsRewards`, `getFeaturesRevenueForecast`, `exportExcel`

### Integrations

`connectNylas`, `revokeNylasTokens`, `updateNylasAccount`, `getNylasEvents`, `getNylasEventsPaging`, `getGoogleAuthLink`, `checkGoogleAuth`, `getGoogleCalendar`, Amit health-integration helpers (`generateAmitApiKey`, `cancelAmitAppointment`, …)

### Remote config / parameters

`getAllProfession`, `getPricingPlans`, `getTutorialsInfo`, `getGeneralRemoteParams`, `getWorkweekParam`, `getPagingConfig`, `getImportContactsFilters`, `validateNewVersion`, …

## Third-party integrations matrix

| System | Role |
|--------|------|
| **PayPal** | SaaS subscriptions + token purchases (plan IDs per currency) |
| **Hyp** | Israeli payment acquiring (connect UI) |
| **Tilled** | Payments (`app.tilled.com` / sandbox) |
| **EasyCount** | Israeli invoicing / receipts |
| **iForms** | Payment forms (`payments.iforms.co.il`) |
| **Nylas** | Calendar sync import/export |
| **Google Calendar / OAuth** | Direct Google auth link + calendar fetch |
| **Firebase** | Push, analytics SDK, RTDB project `plannie-e7b8d` |
| **AppsFlyer** | Install attribution / OneLink |
| **Mixpanel** | Product analytics |
| **Coralogix** | Error / log shipping |
| **Cloudinary + Azure Blob** | Image CDN / branding assets |
| **Heroku** | Monitor service + legacy SMS helper hosts |
| **GCP Cloud Functions (EU)** | Secondary / legacy lambda base |
| **Glassix** | Chat/support CDN reference |
| **WhatsApp / Waze** | Outbound deep links |
| **Amit / Upapp / Movement** | Vertical integrations (health / white-label meeting summaries) |

## Path patterns (illustrative)

Observed URL shapes (not exhaustive):

```
/users/{id}
/users/stations/{masterId}
/users/{id}/services
/users/{id}/customers
/users/workweek/{masterId}
/users/workweek/extendAvailability
/users/login/facebook?
/users/login/apple?
/users/refreshTokenUser
/events/specific/{eventId}/{ownerId}
/events/updateSlot/...
/events/moveSlot/...
/events/resizeSlot/...
/events/bulk/update
/events/availabilities/extensions/{stationId}
/payments/merchant/account/{userId}
/payments/subscription/paypal/verify
/integrations/v3/auth/nylas/{userId}
/integrations/callback/nylas
/parameters/getPricingPlans
/parameters/getAllProfession
/calendarSync
/campaigns
/inbox
/referrals
/validateNewVersion
```

## Security observations (for *your* design — fix these)

1. **Permissive Cordova CSP** (`default-src *`, `unsafe-inline`, `unsafe-eval`) — avoid in a greenfield app.  
2. **Third-party tokens embedded in client** (Mixpanel etc.) — expected for analytics, but keep secrets server-side.  
3. **Support impersonation / monitor login** — powerful; isolate with short-lived tokens + audit log.  
4. **CORS `*` with credential-like custom headers** — prefer explicit origins.  
5. Do **not** build a scraper against their private authenticated API for a competing product; use public research only and design your own contract.

## Samples checked into repo

- [`../samples/validateNewVersion.json`](../samples/validateNewVersion.json)
- [`../samples/pricingPlans.redacted.json`](../samples/pricingPlans.redacted.json) (PayPal IDs redacted)
- [`../samples/professions.summary.json`](../samples/professions.summary.json)
