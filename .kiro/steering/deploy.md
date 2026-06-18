---
inclusion: manual
---

# Deploy & Hosting Guide

How this tool is hosted and the decisions behind it. The app is a **static
site** (no runtime backend), so hosting = serving `web/`. Keep this updated as
hosting evolves.

## Decisions (current)

- **Host:** AWS Amplify Hosting, connected to a GitHub repo (push-to-deploy).
  Chosen for the CI/CD story + shareable link (portfolio), at ~$0 cost.
- **Cost posture:** must not be able to lose money. The site is static, so the
  only AWS cost is trivial hosting (Amplify free tier / pennies). **No live AI
  features** until they're either hard-capped (a small fixed monthly budget,
  enforced in code with a kill-switch) or funded. BYOK was rejected — the
  audience (players, not devs) won't manage API keys.
- **Revenue:** ads are a poor fit (need a custom domain + privacy policy +
  consent banner, earn ~nothing at hobby traffic, and cheapen a portfolio).
  Use a **donation link** instead (footer in `index.html`, currently hidden).
- **Saved lists / accounts:** deferred — storing user data adds accounts/PII/
  consent obligations. Revisit only with demand.
- **IP:** clearly fan-made/unofficial (footer disclaimer). Don't republish GW's
  full rules text; if rules features arrive, cite locations, don't reproduce.

## One-time setup (GitHub + Amplify)

1. Init and push the repo (run from `mfm-tool/`):
   ```bash
   git init && git add . && git commit -m "Initial commit: MFM tool"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
   `web/data.js` MUST be committed (Amplify serves it directly). `data/raw/` is
   gitignored; `data/*.json` are kept for reproducibility.
2. AWS Console → **Amplify** → New app → **Host web app** → connect GitHub →
   pick the repo + `main` branch.
3. Build settings: Amplify auto-detects `amplify.yml` (no build; publishes
   `web/`). If it asks, set **base/app root** so artifacts come from `web/`.
4. Deploy. You get a live URL like `https://main.<id>.amplifyapp.com`.

From then on: **every `git push` to `main` auto-deploys.**

## Updating the data (when a new MFM drops)

The site is only as current as `web/data.js`. Regenerate locally and push:
```bash
PYTHONPATH=src python -m mfm.cli ingest-new --all --cache data/raw --force \
  --out data/new.json --version <vX.Y>
PYTHONPATH=src python -m mfm.cli compare --old data/old.json --new data/new.json \
  --out data/report.md --json data/diff.json
PYTHONPATH=src python -m mfm.cli build-app --diff data/diff.json --new data/new.json
git add -A && git commit -m "Update points to <vX.Y>" && git push
```
(For a true edition-over-edition diff later, keep the previous `new.json` as the
`--old` snapshot instead of the PDF baseline — see mfm-tool.md.)

## Custom domain (optional, later)

Amplify → Domain management → add domain (Route 53 ~$0.50/mo + ~$12/yr for the
name; free managed TLS). Needed before display ads/AdSense would be possible.

## Enabling donations

In `web/index.html`, set the `#donate` link's `href` to your Ko-fi / Buy Me a
Coffee / GitHub Sponsors URL and remove its `hidden` attribute. Commit + push.

## When AI features are added later (constraints)

Frontend stays on Amplify. Add ONE serverless endpoint (API Gateway → Lambda →
Bedrock) that enforces, in order: auth/invite → per-user + global quota → cache
→ model call → cache write. The global cap is the spend safety net (AWS Budgets
only alerts). Keep request-time AI minimal; precompute anything possible at
build time (it's then $0 at runtime). See mfm-tool.md "architecture seam".
