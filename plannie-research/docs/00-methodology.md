# Methodology

## Acquisition

```bash
# EFF apkeep (default source: apk-pure)
apkeep -a com.chenyo.user.plannie -d apk-pure ./apk
# Produced: com.chenyo.user.plannie.xapk (split APKs)
```

APKPure web UI is Cloudflare-gated from datacenter IPs; `apkeep`’s APKPure backend worked without a browser.

Versions listed on APKPure at time of download: `6.47.0 … 7.76.9` (latest on that store). Google Play IL listed `8.0.3`.

## Decompile

```bash
jadx -d analysis/jadx apk/xapk-extracted/com.chenyo.user.plannie.apk
java -jar apktool.jar d -o analysis/apktool <base.apk>
```

Primary evidence: `analysis/apktool/assets/www/**` (AngularJS app) and `AndroidManifest.xml` / Cordova `config.xml`.

## Live public probes

Only unauthenticated parameter endpoints and version check were called against `new-server.plannieapp.com` to confirm environment liveness and document public plan/profession shapes. No authenticated traffic, no credential stuffing, no exploitation.

## What’s intentionally not in git

- APK / XAPK binaries  
- Full jadx/apktool trees  
- Tooling binaries  
- Raw third-party API keys beyond noting that they exist client-side  

Cloud-run download copies for the requester live under `/opt/cursor/artifacts/`.
