# Blessings Global Outreach

A modern, responsive website for **Blessings Global Outreach** — a Christian non-profit spreading the love of Jesus Christ through physical outreaches, spiritual empowerment (Praise & Prophesy), and community building (Blessings Movement).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Design

- **Primary:** Deep royal purple (`#4A0E8F`)
- **Accent:** Gold (`#D4AF37`)
- **Fonts:** Inter (body), Playfair Display (headings)
- Mobile-first, premium non-profit aesthetic

## Pages

- **Home** — Hero, stats, mission cards, testimonials carousel, upcoming events, email signup
- **About** — Vision, mission, story timeline, core values, leadership team
- **Programs** — Mission 1 (Medical & Welfare), Mission 2 (Praise & Prophesy), Mission 3 (Blessings Movement) with expandable cards and scripture
- **Events** — Featured event banner, filter by type (Outreach / Praise / Hangout / Bootcamp), event cards
- **Get Involved** — Volunteer form, partnership tiers (Bronze/Silver/Gold/Kingdom), prayer request form
- **Donate** — Impact statements, one-time/monthly toggle, amount selector, donor wall placeholder
- **Contact** — Contact form, social links (Instagram, Facebook, X, LinkedIn), prayer request note

## Features

- Sticky navbar (transparent on home hero, solid on scroll)
- Top announcement banner: "Next Outreach: March 2026 — Register Now"
- Floating **Pray With Us** button (opens prayer request modal)
- Scripture quote component with gold accent
- Animated stat counters on home
- Event cards with type badges and registration links
- Forms with basic validation (client-side placeholder submit)

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Platform overview (Phases 1–10)

- **Donations:** Paystack integration, donor portal (login, giving history, receipts). See Phase 1 below.
- **Volunteers & partners:** Forms on Get Involved → APIs `/api/volunteer`, `/api/partner`. Admin: `/admin/volunteers`, `/admin/partners` (approve/decline).
- **Events:** Admin creates events at `/admin/events` (capacity, type, publish). Public can register via `/api/events/register`. QR codes per registration; check-in at `/admin/events/[id]/registrations` via `/api/admin/check-in`.
- **Prayer:** Submit via site or Pray With Us modal → `/api/prayer`. Admin: `/admin/prayer` (status, follow-up).
- **Impact:** `/admin/impact` — funds raised, donors, prayers, volunteers, recent donations.
- **Content (CMS):** `/admin/content` — edit JSON blocks (home hero, stats, etc.). API: `/api/admin/content/[key]`.
- **Learning, media, comms:** Schema and admin shells at `/admin/learn`, `/admin/media`, `/admin/comms`. Extend with CRUD and UIs as needed.

**Admin login:** Run `npm run db:seed` (creates `admin@blessingsglobal.org` / `admin123change-me`). Then sign in at `/portal/login` and go to `/admin`. Change the password and set `ADMIN_EMAIL` / `ADMIN_PASSWORD` in production.

## Phase 1: Donation engine + donor portal

- **Donate:** Real Paystack integration. Set `PAYSTACK_SECRET_KEY` (and optionally `PAYSTACK_PUBLIC_KEY`, `PAYSTACK_WEBHOOK_SECRET`) in `.env`. Without a key, the donate flow returns a mock success URL for testing.
- **Donor portal:** `/portal` — sign in (or register at `/portal/register`), view giving history and download receipts at `/portal/dashboard` and `/portal/receipt/[reference]`.
- **Database:** SQLite by default (`DATABASE_URL="file:./dev.db"`). Run `npm run db:push` after cloning. For production, use PostgreSQL and set `DATABASE_URL` accordingly.
- **Auth:** NextAuth.js with credentials (email + password). Set `NEXTAUTH_SECRET` in production.

## Environment

Copy `.env.example` to `.env`. Required for Phase 1:

- `DATABASE_URL` — e.g. `file:./dev.db` (SQLite) or Postgres URL.
- `NEXTAUTH_URL` — e.g. `http://localhost:3000`.
- `NEXTAUTH_SECRET` — any random string (use `openssl rand -base64 32` in production).
- `PAYSTACK_SECRET_KEY` — from [Paystack Dashboard](https://dashboard.paystack.com) (optional for dev; mock flow used if missing).

Optional: `NEXT_PUBLIC_SITE_URL` for Open Graph; `PAYSTACK_WEBHOOK_SECRET` for webhook signature verification.

## Content

- Events, testimonies, team members, and missions are in `src/data/`. Edit those files to update content without touching components.
- Replace Unsplash image URLs with your own assets when ready.
- Donate flow includes a placeholder button; integrate Paystack, Flutterwave, or another provider when needed.
