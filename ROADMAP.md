# Blessings Global Outreach — Platform Roadmap

Phased plan to turn the current site into a full nonprofit operating system. Each phase delivers working features and builds on the previous.

---

## Phase 1 — Foundation + Donation Engine (Weeks 1–4)

**Goal:** Real money in, donor identity, and a base for everything else.

| Feature | Deliverables |
|--------|---------------|
| **Donation engine** | Paystack + Stripe (or Flutterwave) integration, one-time and recurring giving, webhooks, receipt generation (PDF or email) |
| **Donor portal** | Login (email + magic link or password), giving history, download receipts, update profile |
| **Database + Auth** | Prisma schema (donations, users, sessions), NextAuth.js (or Supabase Auth) for donor and later admin/member login |
| **Admin seed** | One admin user + protected `/admin` layout so only admins see donor/impact data |

**Dependencies:** None.  
**Unblocks:** Impact dashboard (needs donation data), communication (needs donor list), recurring giving automation.

---

## Phase 2 — Volunteer + Partner CRM (Weeks 5–8)

**Goal:** Turn volunteer and partner forms into pipelines with assignments and visibility.

| Feature | Deliverables |
|--------|---------------|
| **Volunteer pipeline** | Applications from site → status (Pending / Approved / Declined), assignment to events/teams, simple team dashboard (list of volunteers, filters) |
| **Partner pipeline** | Partner interest form → tiers (Bronze/Silver/Gold/Kingdom), approval, partner wall + impact reports |
| **CRM workflow** | Status fields, “Assign to” (event or team), reminders (email: “Outreach in 3 days”), optional Slack/email notifications for new applications |
| **Team dashboards** | Volunteer lead sees assigned volunteers; outreach lead sees upcoming outreaches and who’s signed up |

**Dependencies:** Phase 1 (auth for “team” roles).  
**Unblocks:** Event platform (volunteers assigned to events), communication (segment by volunteer/partner).

---

## Phase 3 — Event Platform (Weeks 9–12)

**Goal:** Full event lifecycle from registration to check-in and follow-up.

| Feature | Deliverables |
|--------|---------------|
| **Event pages** | Capacity limits, waitlist when full, ticketing (free or paid via Paystack/Stripe) |
| **Registration** | Form capture, confirmation email, optional calendar file |
| **Check-in** | QR code per registration, scan at door (admin app or simple web scan), attendance marked in DB |
| **Follow-up** | Post-event email/SMS: “Thanks for attending”, link to testimony form or next event |
| **Admin** | Create/edit events, set capacity, see registrations and check-in counts |

**Dependencies:** Phase 1 (payments for paid events), Phase 2 (volunteer assignment to events).  
**Unblocks:** Impact dashboard (attendance metrics), communication (event-based journeys).

---

## Phase 4 — Prayer Care System (Weeks 13–16)

**Goal:** Prayer requests as first-class objects with assignment and outcomes.

| Feature | Deliverables |
|--------|---------------|
| **Request types** | Public (prayer wall with consent) vs private (only prayer team) |
| **Assignment** | Assign requests to prayer teams or individuals, due date, status (New / Praying / Followed up / Testimony) |
| **Follow-up** | Notes (internal), optional message to requester (“We prayed for you”), outcome (testimony) |
| **Testimony outcomes** | Link testimony to original request, show in impact/stories |
| **Prayer team UI** | List “My assigned requests”, mark prayed, add notes, send follow-up |

**Dependencies:** Phase 1 (auth for prayer team).  
**Unblocks:** Impact dashboard (prayers served), communication (follow-up flows).

---

## Phase 5 — Impact Intelligence Dashboard (Weeks 17–20)

**Goal:** Live metrics and reports for leadership and partners.

| Feature | Deliverables |
|--------|---------------|
| **Live metrics** | People served, outreaches completed, funds used (from donations), prayers, events, volunteers active |
| **Geo map** | Map of mission locations (from events/outreaches), filter by type or date |
| **Reports** | Downloadable impact reports (PDF/CSV): by month/quarter, by program, for partner reports |
| **Admin only** | Dashboard behind `/admin`, role-based (e.g. “Impact viewer” vs “Full admin”) |

**Dependencies:** Phase 1 (donations), Phase 2 (volunteers), Phase 3 (events), Phase 4 (prayer).  
**Unblocks:** Partner reports, grant reporting, storytelling.

---

## Phase 6 — Admin CMS (Weeks 21–24)

**Goal:** Non-technical team manages all public content without code.

| Feature | Deliverables |
|--------|---------------|
| **Content types** | Events, team profiles, testimonies, programs, homepage blocks (hero, stats, CTAs) |
| **Admin UI** | List/create/edit/delete for each type, rich text where needed, image upload (or URL) |
| **Preview** | Preview before publish, draft vs published |
| **Homepage builder** | Order sections, toggle sections on/off, edit copy and images for hero, stats, testimonials, events |

**Dependencies:** Phase 1 (admin auth).  
**Unblocks:** No more code deploys for content changes.

---

## Phase 7 — Blessings Member Portal (Weeks 25–28)

**Goal:** Logged-in experience for pods, groups, and personal growth.

| Feature | Deliverables |
|--------|---------------|
| **Login area** | Member login (separate or same as donor), password reset |
| **Pods/groups** | List pods by city/interest, join request, pod lead approves, member roster (visible to pod) |
| **Member profiles** | Name, photo, role, interests, availability for volunteering |
| **Devotion plans** | Daily/weekly devotion content (from CMS), mark as read, optional discussion prompt |
| **Discussion threads** | Per pod or per topic, simple threads (reply, like), notifications |
| **Volunteer schedules** | “My upcoming assignments” (from CRM), calendar view |

**Dependencies:** Phase 1 (auth), Phase 2 (volunteer assignments).  
**Unblocks:** Community feeling, retention, volunteer coordination.

---

## Phase 8 — Bootcamp / Learning Platform (Weeks 29–32)

**Goal:** Structured career and discipleship programs with progress and certificates.

| Feature | Deliverables |
|--------|---------------|
| **Course modules** | Courses → modules → lessons (video, text, link), order and prerequisites |
| **Mentorship matching** | Mentor/mentee profiles, match by track or interest, intro message |
| **Assignments** | Per module: submit link or text, mentor or admin marks complete |
| **Progress** | Progress bar, “Continue where you left off”, completion per module/course |
| **Certificates** | On course completion, PDF certificate (name, course, date), optional public profile badge |
| **Admin** | Create courses, upload content, view submissions and completions |

**Dependencies:** Phase 1 (auth), Phase 6 (CMS for course content).  
**Unblocks:** Scalable discipleship and career programs.

---

## Phase 9 — Media Ministry Hub (Weeks 33–36)

**Goal:** Central place for sermons, streams, and short-form content.

| Feature | Deliverables |
|--------|---------------|
| **Sermons** | Title, description, speaker, date, audio/video URL (or upload), series/topic |
| **Live streams** | Link to stream (YouTube/Vimeo/own), schedule, “Live” badge, archive after |
| **Podcasts** | Feed or list of episodes, play in browser, subscribe link |
| **Reels/shorts** | Grid of short videos (URL or embed), topic filter |
| **Archive + search** | Filter by topic, speaker, date, search by title/description |
| **CMS** | Admin adds sermons, streams, podcasts, reels (from CMS) |

**Dependencies:** Phase 6 (CMS).  
**Unblocks:** SEO, shareable content, growth.

---

## Phase 10 — Communication Automation (Weeks 37–40)

**Goal:** Right message to the right segment at the right time.

| Feature | Deliverables |
|--------|---------------|
| **Channels** | Email (Resend/SendGrid), SMS (Twilio/Local), WhatsApp (Business API or provider) |
| **Segments** | Visitors, donors, volunteers, partners, event attendees, prayer requesters, members |
| **Journeys** | e.g. New donor → thank-you email + receipt; Event attendee → post-event survey + next event; Prayer request → “We prayed” message |
| **Triggers** | On donation, on registration, on prayer submitted, on volunteer approved |
| **Templates** | Editable templates per journey step, variables (name, amount, event name) |
| **Dashboard** | Send history, open/click (email), delivery status, opt-out handling |

**Dependencies:** Phase 1 (donors), Phase 2 (volunteers), Phase 3 (events), Phase 4 (prayer).  
**Unblocks:** Retention, re-engagement, stewardship.

---

## Summary Table

| Phase | Focus | Key deliverables |
|-------|--------|-------------------|
| **1** | Foundation + Donations | Paystack/Stripe, donor portal, receipts, giving history |
| **2** | Volunteer + Partner CRM | Pipelines, approvals, assignments, team dashboards |
| **3** | Events | Registration, capacity, ticketing, QR check-in, follow-up |
| **4** | Prayer care | Public/private requests, assignment, follow-up, testimony outcomes |
| **5** | Impact dashboard | Live metrics, geo map, downloadable reports |
| **6** | Admin CMS | Events, team, testimonies, programs, homepage — no code edits |
| **7** | Member portal | Pods, profiles, devotion, discussions, volunteer schedule |
| **8** | Bootcamp / Learning | Courses, mentorship, assignments, certificates |
| **9** | Media hub | Sermons, streams, podcasts, reels, search/archive |
| **10** | Comms automation | Email/SMS/WhatsApp journeys, segments, triggers |

---

## Tech Stack (Recommended)

- **App:** Next.js 14 (App Router), TypeScript, Tailwind — *current*
- **DB:** PostgreSQL (production), Prisma ORM; SQLite for local dev optional
- **Auth:** NextAuth.js (credentials, magic link, OAuth) or Supabase Auth
- **Payments:** Paystack (NG/Africa), Stripe (global), Flutterwave optional
- **Files:** Local or S3-compatible (e.g. Cloudflare R2) for receipts, certificates, uploads
- **Email/SMS:** Resend or SendGrid; Twilio or local SMS provider; WhatsApp Business API partner
- **Hosting:** Vercel (app) + managed Postgres (Vercel Postgres, Neon, Supabase)

---

## Current Status

- **Phase 1** — Done: Paystack donations, donor portal, receipts, giving history.
- **Phase 2** — Done: Volunteer & partner forms → `/api/volunteer`, `/api/partner`. Admin: `/admin/volunteers`, `/admin/partners` (list, approve/decline).
- **Phase 3** — Done: Events in DB. Admin: create/edit events, capacity, registrations, QR check-in (`/api/admin/check-in`). Public: `/api/events`, `/api/events/[slug]`, `/api/events/register`.
- **Phase 4** — Done: Prayer requests → `/api/prayer`. Admin: `/admin/prayer` (list, status, follow-up).
- **Phase 5** — Done: Impact dashboard at `/admin/impact` (funds, donors, prayers, volunteers, recent donations, events).
- **Phase 6** — Done: Content blocks CMS at `/admin/content`; `/api/admin/content/[key]` (GET/PUT JSON).
- **Phases 7–10** — Schema and admin shells: Learning (`/admin/learn`), Media (`/admin/media`), Comms (`/admin/comms`). Pods, courses, media, journeys can be extended with full CRUD and UIs.
