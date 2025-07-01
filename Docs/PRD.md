# Artisan Membership App – Product Requirement Document (PRD)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Objectives & Success Metrics](#objectives--success-metrics)
3. [User Personas](#user-personas)
4. [Key Features, User Stories & Acceptance Criteria](#key-features-user-stories--acceptance-criteria)
5. [Technical Specifications](#technical-specifications)
6. [Environment Setup & Installation](#environment-setup--installation)
7. [Component Architecture](#component-architecture)
8. [Styling Guidelines](#styling-guidelines)
9. [Testing Strategy](#testing-strategy)
10. [Deployment Process](#deployment-process)
11. [Timeline & Milestones](#timeline--milestones)
12. [Risks & Mitigation](#risks--mitigation)
13. [Glossary](#glossary)

---

## Project Overview

The **Artisan Membership App** unifies loyalty, rewards, and communications for a multi‑brand artisan F\&B group. It allows customers to track points, redeem perks, discover promotions, and locate stores under one roof. The MVP targets **iOS & Android** using **React Native (Expo)** with Supabase for authentication/storage and EBS.id POS for real‑time point accrual. fileciteturn0file0

### Problem Statement

* Fragmented loyalty programs lower engagement.
* Manual tracking (paper cards, spreadsheets) causes errors & poor visibility.
* No single channel for brand‑wide offers and local events. fileciteturn0file0

---

## Objectives & Success Metrics

| # | Objective                                | KPI / Target                         |
| - | ---------------------------------------- | ------------------------------------ |
| 1 | Launch functional RN/Expo MVP in 30 days | All core flows complete & demo ready |
| 2 | Integrate with EBS.id POS                | ≤200 ms average API latency          |
| 3 | Secure auth & data via Supabase          | Zero auth leaks in penetration test  |
| 4 | Acquire early users                      | ≥1 000 sign‑ups in month 1           |
| 5 | Drive engagement                         | ≥200 redemptions & SUS ≥80           |

Success metrics will be tracked via Mixpanel & Supabase analytics. fileciteturn0file0

---

## User Personas

| Persona                | Age Range                 | Goals                               | Typical Usage                                   |
| ---------------------- | ------------------------- | ----------------------------------- | ----------------------------------------------- |
| **Loyal Customer**     | 25–45 urban professionals | Track points, enjoy exclusive perks | Checks balance before ordering, redeems monthly |
| **Occasional Visitor** | 18–30 students/tourists   | Discover promos & plan visits       | Browses “What’s On” for weekend outings         |
| **Store Manager**      | 30–50 ops leads           | Monitor redemptions, post news      | Posts daily specials, verifies vouchers         |
| fileciteturn0file0  |                           |                                     |                                                 |

---

## Key Features, User Stories & Acceptance Criteria

### 1. Membership Management

* **User Story:** As a customer, I want to sign up with email or Google so that I can start earning points.
* **Acceptance Criteria:**

  1. Sign‑up/login via Supabase OAuth succeeds or returns clear error.
  2. New users start at Bronze tier with 0 points.
  3. Session token persists across app restarts.

### 2. Point Dashboard

* **Story:** As a member, I need to see my live point balance and history.
* **Criteria:**

  1. Balance fetches within 300 ms.
  2. History lists last 30 transactions, newest first.
  3. Pull‑to‑refresh updates balance.

### 3. Rewards Catalog & Redemption

* **Story:** As a member, I can redeem points for rewards via a QR voucher.
* **Criteria:**

  1. Catalog shows rewards sorted by point cost ascending.
  2. “Redeem” disabled if balance < cost.
  3. Successful redemption generates 10‑minute single‑use QR.
  4. Redemption recorded in history.

### 4. Promotions & News (What’s On)

* **Story:** As a user, I want a feed of current promos filtered by brand.
* **Criteria:**

  1. Feed fetches max 20 items per request.
  2. Items support image + rich‑text.
  3. Push notification triggered when a promo is tagged "urgent".

### 5. Store Locator & Brand Pages

* **Story:** As a visitor, I want to find the nearest outlet with its hours & menu.
* **Criteria:**

  1. Map centers on device location (with permission).
  2. Distance filter 1/5/10 km works.
  3. Brand detail displays first 5 menu items.

---

## Technical Specifications

| Layer           | Choice                                | Rationale                              |
| --------------- | ------------------------------------- | -------------------------------------- |
| Frontend        | **React Native 0.74 via Expo SDK 50** | Cross‑platform speed, OTA updates      |
| Backend         | Node 18 + Express                     | Lightweight API proxy for EBS.id       |
| Auth & DB       | Supabase Postgres, Row‑Level Security | Managed, realtime, easy RN integration |
| POS Integration | EBS.id REST API                       | Real‑time points accrual               |
| Push            | Expo Notifications / FCM              | Unified push layer                     |
| CI/CD           | GitHub Actions + Expo EAS Build       | Automated builds & OTA updates         |
| Analytics       | Mixpanel + Supabase Events            | User behaviour & retention             |

---

## Environment Setup & Installation

```bash
# 1. Pre‑requisites
nvm install 20           # Node 20 LTS
npm i -g expo-cli@^8.0   # Expo SDK 50
brew install watchman    # macOS file watcher (skip on Windows)

# 2. Clone & bootstrap
git clone git@github.com:artisan-group/membership-app.git
cd membership-app
yarn install             # Uses yarn v3 (berry)

# 3. Configure secrets (Cursor ▶ Secrets)
#   SUPABASE_URL, SUPABASE_ANON_KEY
#   EBS_CLIENT_ID, EBS_CLIENT_SECRET
#   MIXPANEL_TOKEN

# 4. Run locally
expo start --dev-client   # Opens iOS/Android simulator or QR
```

> **Cursor Note:** Ensure the above commands are added as Workspace *Run Tasks* so they can be executed with one‑click.

---

## Component Architecture

```
📦 src/
 ┣ 📂 api        # axios instances & typed endpoints
 ┣ 📂 components # reusable presentational components
 ┣ 📂 hooks      # custom hooks (useAuth, usePoints)
 ┣ 📂 navigation # React Navigation stacks/tabs
 ┣ 📂 screens    # feature screens (Home, Rewards, Brands…)
 ┣ 📂 store      # Zustand state (tiers, cart, user)
 ┣ 📂 theme      # colors, typography, spacing scale
 ┣ 📂 utils      # helpers (formatCurrency, validators)
 ┗ app.tsx      # Root entry (register navigation)
```

* **State Mgmt:** Zustand (simple, performant) with React Context fallback.
* **Navigation:** React Navigation v7 (BottomTabs + NativeStack).
* **Data‑fetching:** `@tanstack/react-query` for caching/retry.
* **QR generation:** `expo-barcode-generator`.
* **Maps:** `expo-location` + `react-native-maps`.
* **Form validation:** `react-hook-form` + `zod`.

---

## Styling Guidelines

### 1. Design Foundations

* **Goal:** Create a clean, minimalist, and futuristic mobile UI covering the four core screens (Home, Rewards, News/Promotions, Restaurants).
* **Branding & Visual Style:** Leverage the group’s logo with a monochrome or muted base palette, accented by neon or metallic tones for a futuristic vibe. Use generous white space and minimise graphic noise.
* **Typography:** Simple, geometric sans‑serif fonts (**Inter** or **Nunito**) sized for optimal readability.
* **Iconography:** Flat, outline icons with a consistent stroke weight to reinforce the minimalist aesthetic.
* **Language:** Default interface and micro‑copy in **English**.
* **Navigation:** Persistent bottom navigation bar with four flat‑icon tabs (Home, Rewards, News, Restaurants). The top bar shows the page title and a compact user avatar (tap opens profile/settings).
* **Grid & Spacing:** 16 px base grid, 24 px gutters, and 16 px edge padding.
* **Real‑Time Updates:** Points balance and tier progress must refresh live via WebSocket or push updates; display a subtle animated micro‑interaction when values change.
* **Onboarding:** One‑screen overlay on first launch highlighting points, tiers, and benefits; skippable.

### 2. Homepage Specs

1. **Top Bar:** Page title (“Home”) plus user avatar; minimalist hamburger icon for secondary menu.
2. **Live Points Card:**

   * Real‑time points display (e.g., “1,200 pts”) with a gentle pulse animation on update.
   * Current tier badge (e.g., “Gold”) highlighted with a neon accent.
   * Thin progress bar showing points remaining to the next tier (“300 to Platinum”).
3. **Quick Actions:** Three flat‑icon buttons with labels: *Scan & Pay*, *Redeem*, *Menu*.
4. **Featured Promotions Carousel:** Full‑width swipeable cards featuring bold imagery, a simple title overlay, and a flat “View” button.
5. **Nearby Restaurants Preview:** Mini map in monochrome with neon pins and a *See All* link.
6. **Footer CTA Banner:** Minimal text “Invite friends for +100 pts each” with a flat share icon.

### 3. Rewards Page Specs

1. **Top Bar:** Title “Rewards” with a flat filter icon that opens a side drawer.
2. **Live Points Summary:** Pinned directly beneath the top bar.
3. **Catalog Grid:**

   * Two‑column grid of reward cards: image placeholder, title, cost (e.g., “500 pts”), and a flat “Redeem” button.
   * Category tabs (line‑style): *Discounts*, *Freebies*, *Experiences*.
4. **Redemption History:** Collapsible list showing date, item, and status badges.

### 4. News & Promotions Page Specs

1. **Top Bar:** Title “News & Promotions” with a flat search icon.
2. **Segment Control:** Toggle buttons *News* | *Promotions*.
3. **List Layout:** Each row displays a thumbnail, headline, date, and brand tag. Tapping opens a modal with detailed content, inline images, and flat *Save* or *Share* actions.
4. **Filters:** Slide‑up drawer enabling filter by restaurant or date.

### 5. Restaurants Page Specs

1. **Top Bar:** Title “Restaurants” with a flat location icon.
2. **Search Field:** Placeholder text “Search restaurants…” with a clear (×) icon.
3. **View Toggle:** Flat icons to switch between list and grid layouts.
4. **List/Grid Views:**

   * **List view:** Logo/avatar, name, address snippet, and distance.
   * **Grid view:** Photo cards with a name overlay.
5. **Detail Screen:**

   * Hero image with a futuristic border, address, and flat call/directions icons.
   * Menu tabs: *Food*, *Drinks*, *Specials* with a minimalist tab indicator.
   * Future feature: *Earn Points* toggle (greyed out for MVP).

## Testing Strategy

| Level           | Tool                                                | Scope                             |
| --------------- | --------------------------------------------------- | --------------------------------- |
| Unit            | Jest 29 + React Native Testing Library              | Pure functions, UI snapshots      |
| Integration     | React Query testing utils                           | API hooks & state flows           |
| E2E             | Detox 20 (Expo adapter)                             | Sign‑up, redemption, deep‑linking |
| Static Analysis | ESLint (airbnb‑typescript), Prettier, Type‑coverage | Code quality & style              |
| Performance     | Flipper + React DevTools profiler                   | FPS ≥55 on mid‑range devices      |

CI runs unit + integration tests on every PR; E2E on `main` nightly. Coverage threshold ≥80 %.

---

## Deployment Process

1. **Versioning:** semantic‑release (`major.minor.patch`).
2. **Preview Builds:** PR triggers `expo prebuild --platform ios|android` via EAS; links posted to Slack.
3. **Production Build:**

   ```bash
   eas build --profile production --platform all
   eas submit -p ios --latest
   eas submit -p android --latest
   ```
4. **OTA Updates:** `eas update --branch production` for minor patches (<24 h rollout).
5. **Environment Switching:** `expo-env` plugin reads `.env.${profile}` at build.
6. **Store Config:**

   * iOS: Bundle ID `com.artisan.membership` – TestFlight internal test → App Store.
   * Android: Package `com.artisan.membership` – Closed track → Production.
7. **Rollback:** Use EAS Update “Revert” or promote previous build.

---

## Timeline & Milestones

| Week                  | Deliverables                                       |
| --------------------- | -------------------------------------------------- |
| 1                     | Requirements sign‑off, Cursor workspace, low‑fi UI |
| 2                     | Auth flow, Home & Login screens, EBS mock          |
| 3                     | Points dashboard, Rewards catalog, What’s On feed  |
| 4                     | Brand pages, Redemption flow, QA, stakeholder demo |
| fileciteturn0file0 |                                                    |

---

## Risks & Mitigation

| Risk                    | Likelihood | Impact | Mitigation                      |
| ----------------------- | ---------- | ------ | ------------------------------- |
| EBS.id API instability  | Medium     | High   | Early sandbox, mock adapter     |
| Supabase quota limits   | Low        | Medium | Monitor, upgrade tier           |
| UI complexity           | Medium     | Medium | Time‑box advanced animations    |
| Team bandwidth (2 devs) | High       | High   | Daily stand‑ups, strict backlog |
| fileciteturn0file0   |            |        |                                 |

---

## Glossary

| Term | Definition                            |
| ---- | ------------------------------------- |
| RLS  | Row‑Level Security in Supabase        |
| OTA  | Over‑the‑Air update via Expo EAS      |
| SUS  | System Usability Scale (0‑100) survey |
| MVP  | Minimum Viable Product                |

---

> **End of Document** – Ready for Cursor implementation.
