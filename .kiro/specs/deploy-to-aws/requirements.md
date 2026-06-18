# Requirements Document

Deploy the MFM tool to AWS (from scratch).

## Introduction

Publish the existing static MFM tool to a public URL using AWS Amplify Hosting
with GitHub push-to-deploy, **starting with no GitHub or AWS account**. The app
is already a complete static site (`web/`), so there is no application code to
write — this spec covers account creation, source control, deployment, and the
cost/safety guardrails. Background and decisions live in
`.kiro/steering/deploy.md` and `.kiro/steering/mfm-tool.md`.

Scope: accounts → repo → deploy → verify → post-deploy. Out of scope: live AI
features, accounts/saved-lists backend, custom domain (optional stretch), ads.

## Requirements

### Requirement 1: Local project verified before deploy
**User Story:** As the owner, I want to confirm the app runs locally in the new
environment, so that I deploy a known-good build.

#### Acceptance Criteria
1. WHEN the project is opened in the new environment THEN `git`, `python3`, and
   `pip` SHALL be confirmed installed (and Python deps installed from
   `requirements.txt`).
2. WHEN `web/index.html` is opened (or served via `python3 -m http.server -d web`)
   THEN the Across-factions, Faction-changes, and List-builder tabs SHALL render.
3. IF `web/data.js` is missing or stale THEN it SHALL be regenerated via
   `mfm build-app` before committing.

### Requirement 2: Source control on GitHub
**User Story:** As the owner, I want the project in a GitHub repo, so that
Amplify can deploy it and I can share it.

#### Acceptance Criteria
1. WHEN a GitHub account does not exist THEN one SHALL be created and secured
   with MFA.
2. WHEN git is configured locally THEN `user.name`/`user.email` SHALL be set and
   authentication to GitHub SHALL succeed (gh CLI, SSH, or HTTPS token).
3. WHEN the repo is pushed THEN `web/data.js` and `data/*.json` SHALL be included
   and `data/raw/` SHALL be excluded (per `.gitignore`).

### Requirement 3: AWS account created safely
**User Story:** As the owner, I want an AWS account that can't surprise-bill me,
so that hosting stays effectively free.

#### Acceptance Criteria
1. WHEN the AWS account is created THEN the root user SHALL have MFA enabled and
   SHALL NOT be used for day-to-day work.
2. WHEN day-to-day access is needed THEN a least-privilege IAM Identity Center
   (or IAM) user SHALL be used instead of root.
3. WHEN the account is active THEN an AWS Budgets alert (e.g. $1–$5/mo) SHALL be
   configured to email on threshold breach.

### Requirement 4: App deployed and publicly reachable
**User Story:** As the owner, I want the site live on a URL, so that others can
use it.

#### Acceptance Criteria
1. WHEN Amplify is connected to the GitHub repo's `main` branch THEN it SHALL
   detect `amplify.yml` and publish the `web/` directory with no build step.
2. WHEN deployment completes THEN a public `https://...amplifyapp.com` URL SHALL
   load the app over HTTPS with all three tabs functional.
3. WHEN a commit is pushed to `main` THEN Amplify SHALL automatically redeploy.

### Requirement 5: Post-deploy finishing touches
**User Story:** As the owner, I want the deployed app polished, so that it works
as a portfolio piece.

#### Acceptance Criteria
1. WHEN the live URL exists THEN it SHALL be recorded in `README.md` (Live demo).
2. WHERE a donation link is desired THEN the `#donate` link in `web/index.html`
   SHALL be given a URL and un-hidden.
3. WHEN points data later changes THEN the documented refresh flow (regenerate
   `data.js`, commit, push) SHALL update the live site.

## Glossary

- **Static site:** files served as-is to the browser; no server-side code runs
  at request time.
- **Amplify Hosting:** AWS service that builds/serves front-end apps from a
  connected git branch with managed TLS/CDN.
- **`data.js`:** generated file embedding the points/diff data as `window.MFM`;
  must be committed so Amplify can serve it.
- **Push-to-deploy:** pushing to the `main` branch triggers an automatic deploy.
- **Budgets alert:** an AWS notification when spend crosses a threshold (alerts
  only; it does not cap spend).
- **MFA:** multi-factor authentication.
