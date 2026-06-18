# Design — Deploy MFM Tool to AWS

## Overview

The MFM tool is a **static site** (`web/`: `index.html`, `app.js`, `styles.css`,
generated `data.js`) with no runtime backend. Hosting therefore means serving
static files. We use **AWS Amplify Hosting** connected to a **GitHub** repo so
each `git push` to `main` auto-deploys, giving a shareable HTTPS URL at ~$0 cost.

This is a procedural deployment, not code development. Most steps are performed
by the owner in a browser; an AI agent assists with local verification, file
edits, and git commands. Full rationale is in `.kiro/steering/deploy.md`.

## Architecture

```
local repo (mfm-tool/) ──git push──► GitHub (main) ──webhook──► AWS Amplify
                                                                   │ publishes web/
                                                          https://<id>.amplifyapp.com
```

- No build step: `amplify.yml` declares empty build commands and
  `artifacts.baseDirectory: web`.
- `data.js` is committed (Amplify serves it as-is). `data/raw/` is gitignored.
- TLS, CDN, and the default domain are provided by Amplify for free.

## Components and Interfaces

| Concern            | Choice                          | Notes |
|--------------------|---------------------------------|-------|
| Source control     | GitHub (public repo)            | Also the portfolio artifact |
| Hosting/CI-CD      | AWS Amplify Hosting             | Push-to-deploy, free tier |
| Build              | none                            | `amplify.yml` publishes `web/` |
| Auth (AWS)         | Root + MFA; IAM Identity Center | Never use root daily |
| Cost guardrail     | AWS Budgets alert               | Budgets only alerts, not caps |
| Revenue (optional) | Donation link in footer         | No ads (see deploy.md) |

Interfaces are operational, not programmatic: the GitHub↔Amplify webhook (push
triggers deploy) and the Amplify console (connect repo, view URL, add domain).

## Data Models

Not applicable — this is a deployment of a static site with no datastore. The
app's data model (Snapshot/Faction/Unit/...) is documented in
`.kiro/steering/mfm-tool.md`; it is baked into `web/data.js` at build time and
served as static content.

## Prerequisites in the new environment

- `git`, `python3`, `pip` (Python only needed to (re)generate `data.js`, not to
  host). `node` optional (used only for JS syntax/jsdom checks).
- A browser for account creation and the Amplify console.

## Authentication options (pick one for GitHub)

- **gh CLI** (`gh auth login`) — simplest.
- **SSH key** — generate, add to GitHub, use `git@github.com:` remote.
- **HTTPS + Personal Access Token** — token as password on push.

## Risks & mitigations

- *Surprise AWS bill* → static only; Budgets alert; no live AI until capped.
- *Stale data on site* → data only updates when `data.js` is regenerated and
  pushed; documented in `deploy.md` and Requirement 5.3.
- *Secrets in repo* → none required; never commit AWS keys or tokens.
- *IP* → footer disclaims affiliation with Games Workshop; keep it fan-made.

## Correctness Properties

Invariants that should always hold for this deployment:

### Property 1: Served content equals committed content
The live site serves exactly the `web/` files from the last commit on `main`;
no build step transforms `data.js`, so live data == committed data.
**Validates: Requirements 4.2, 5.3**

### Property 2: Reachable over HTTPS
The deployed app is reachable over HTTPS and renders all three tabs.
**Validates: Requirements 4.2**

### Property 3: No secrets in the repo
No AWS keys, tokens, or credentials are ever committed.
**Validates: Requirements 2.3**

### Property 4: No per-request compute cost
Running the tool incurs only trivial static-hosting cost; there is no
request-time backend to run away with spend.
**Validates: Requirements 3.3**

### Property 5: Push reflects live
A push to `main` always results in the live site reflecting that commit.
**Validates: Requirements 4.3**

## Error Handling

Operational failure modes and responses:

- *GitHub auth fails on push* → re-run `gh auth login` or regenerate the
  SSH key / PAT; confirm the remote URL matches the chosen auth method.
- *Amplify doesn't serve the app / 404* → confirm `amplify.yml`
  `baseDirectory: web` and that `web/index.html` + `web/data.js` are committed.
- *Site loads but data looks empty* → `web/data.js` was missing/stale at push;
  regenerate with `build-app`, commit, push.
- *Unexpected AWS charges* → Budgets alert fires; investigate; the static design
  means there is no per-request cost to run away.

## Testing Strategy

- **Local:** serve `web/` (`python3 -m http.server -d web`) and exercise all
  three tabs; optionally `node --check web/app.js`.
- **Post-deploy:** load the Amplify URL on a clean browser/device; verify HTTPS,
  all three tabs, and that a sample list builds and saves.
- **CI/CD:** push a trivial commit and confirm Amplify auto-redeploys.

## Verification strategy

Local: open/serve `web/` and exercise the three tabs; optionally
`node --check web/app.js`. Post-deploy: load the Amplify URL on a clean
browser/device and confirm tabs + a sample list build work over HTTPS.
