# MediQueue — Clinical Indigo Redesign Plan

> **Status:** in progress — Phase 0 complete, Phase 1 next
> **Scope:** `mediqueue-client` (Next.js 16 frontend) for Phases 1–11.
> `mediqueue-backend` work is confined to **Phase 12**, the final phase.
> **Sources:** `code.html` (**visual/design source of truth**), `DESIGN-tobe.md` (token
> vocabulary, component spec), `FIXES.md` (defect list), `DESIGN-old.md` (current system audit)
> **Last updated:** 2026-10-07

## Decisions (locked)

| Decision | Choice |
| --- | --- |
| Visual/design source of truth | **`code.html`** — including its elevation and shadows. Implementation must match the prototype as closely as possible |
| Palette | YAML/M3 tokens from `code.html` |
| Scope | All 15 home sections, built against **curated demo data** that mirrors `code.html` |
| Data source | **Curated demo data** for all frontend/design phases. The live API is not used as a design reference |
| Non-functional CTAs | `Download PDF` / `Enroll in Track` stay in the UI. Their backend is deferred to Phase 12 |
| Icons | Material Symbols mapped to `lucide-react` |
| Theme | Light-default, dark as supported alternate |
| Navigation | Top navbar retained; mobile-only bottom nav added |
| HeroUI | Off the home path by Phase 4; uninstalled in Phase 11 |
| Backend work | **Everything backend-related is Phase 12**, the final phase |

## How to use this file

Work one phase at a time. Mark a phase's checkboxes only when that phase is reviewed and
accepted. Do not start Phase N+1 until Phase N is signed off.

---

## Phase 0 — Baseline

> **Status: COMPLETE.** Recorded 2026-10-07. Phase 1 is unblocked.

- [x] Run `npm run lint` in `mediqueue-client`, save output as the comparison baseline
- [x] Run `npm run build`, confirm the project builds before any changes
- [x] Record current routes and their render state for the manual checklist in Phase 11

### Lint baseline — 1 pre-existing error, since fixed

```
src/app/components/HowItWorks.jsx
  45:30  error  `'` can be escaped with `&apos;`, ...  react/no-unescaped-entities
✖ 1 problem (1 error, 0 warnings)
```

Fixed in Phase 1 (`HowItWorks.jsx:45` → `&apos;`). **`npm run lint` now reports zero problems.**
That is the bar for Phase 11: it must still be zero.

### Build baseline — passes

`next build` (Turbopack) succeeds in ~19s. 11 routes generated. No type errors.

| Route | Render | Notes |
| --- | --- | --- |
| `/` | ƒ dynamic | `AvailableTutors` fetches with `cache: "no-store"` |
| `/tutors` | ○ static | client component, fetches on mount |
| `/tutors/[id]` | ƒ dynamic | **auth-gated** by `proxy.js` |
| `/add-tutor` | ○ static | **auth-gated** |
| `/my-tutors` | ƒ dynamic | **auth-gated** |
| `/booked-sessions` | ƒ dynamic | **auth-gated** |
| `/profile` | ƒ dynamic | route is public, UI gates on session |
| `/sign-in` | ○ static | |
| `/sign-up` | ○ static | |
| `/_not-found` | ○ static | |
| `/api/auth/[...all]` | ƒ dynamic | Better Auth |

`proxy.js:16` matcher — `["/add-tutor", "/booked-sessions", "/my-tutors", "/tutors/:path"]`.
Note `:path` is a single segment, so `/tutors` is public while `/tutors/[id]` is gated.
Redirect carries **no `callbackUrl`** (FIXES #8).

### Live API baseline — reachable, recorded for reference only

`NEXT_PUBLIC_API_URL=https://mediqueue-server-six.vercel.app` — **live and returning 200.**
`GET /featured-tutors` → 6 records. `GET /tutors` → 14 records.

Actual document shape:

```
_id, tutorName, subject, image, availability, hourlyFee,
totalSlot, startDate, teachingMode, district, address,
institution, experienceYears
```

> **Decision: this data is NOT the design reference.** Per the locked decisions, all frontend
> phases build against curated demo data in `src/lib/demo/`. The findings below are retained
> only to shape Phase 12 and to flag pre-existing bugs the redesign will expose.

- [ ] ⚠️ **`tutorEmail` and `email`/`addedBy` do not exist in live data.** `my-tutors/page.jsx`
      filters on `t.email`, so **My Tutors is already broken** against the live backend.
      Pre-existing, not a redesign regression. Phase 10 / 12
- [ ] ⚠️ **`hourlyFee` and `totalSlot` are strings, not numbers.** `"900"`, `"6"`. Breaks any
      numeric comparison, and the price filter's `$gte`/`$lte` on a string field misbehaves in
      MongoDB. Fee range 53–2000. Demo data uses proper numbers. Phase 12a data hygiene
- [ ] ⚠️ **Only 5 subjects exist:** Biochemistry (4), Pathology (4), General Medicine (1),
      Physiology (3), Anatomy (2). `code.html` §4 advertises 6 subjects with counts like
      "18 Active Tutors" — Pharmacology & Rx and Bedside OSCE have **zero** tutors. Demo data
      reproduces the prototype's 6 subjects
- [ ] ⚠️ **4 of 14 institution values are junk:** `o iyngos egmoou`, `Chattagram University`,
      `Nihil deserunt cillu`, `FDSFSF RES`. Demo data uses only the 6 prototype colleges
- [ ] ⚠️ **3 of 12 district values are junk**, and `Chattagram` / `Chattogram` are duplicate
      spellings of the same city
- [ ] `teachingMode` is clean: Online (5), Offline (5), Both (4)
- [ ] `experienceYears` exists in the data but the current `TutorCard` never renders it —
      `code.html` §5 has an experience stat that can use it

---

## Phase 1 — Curated demo data (`src/lib/demo/`)

> **Status: COMPLETE.** 2026-10-07. Lint clean (baseline error fixed), build passes.

**Goal: every later phase builds against this, so the UI can match `code.html` faithfully.**
Demo data must be realistic enough that no design decision is made against a placeholder.

### `demo/tutors.js`

- [x] 6 tutors reproducing `code.html` §5 exactly — Dr. Ariful Islam, Dr. Nusrat Jahan,
      Tahsin Ahmed, Dr. Sajid Hasan, Dr. Fariha Zaman, Dr. Asif Iqbal
- [x] Preserve every field the prototype renders: `hourlyFee` ৳1200/1500/1000/1800/2000/1100,
      `availability`, `totalSlot` incl. the two 0-slot cases that turn `error`, `startDate`,
      `teachingMode` Online/Both/Online/Offline/Online/Both, `institution`, `district`,
      `address`, `experienceYears`
- [x] **Numbers as real numbers**, not the live API's strings
- [x] **Add `tutorEmail` / `addedBy`** — the fields live data lacks and `my-tutors` depends on.
      Gives `My Tutors` something real to render in Phase 10
- [x] `_id` values as stable string constants (`demo-tutor-001`…) so links work before any
      backend exists
- [x] `DEMO_OWNER` export so `my-tutors` has a real owner to filter on
- [x] `DEMO_TUTORS_EXTENDED` — 4 more tutors so `/tutors` is not a copy of the home grid.
      Owned by a different `addedBy` so the My Tutors filter has something to exclude
- [ ] ⚠️ **Portrait files not yet added.** Paths are declared (`/images/tutors/*.jpg`) but
      `public/images/` does not exist. `Avatar` must fall back to initials until they land

### `demo/content.js`

- [x] `TRUST_METRICS` (§3) — 50+ / 100% / 1.5k+ / 24/7
- [x] `COLLEGES` (§2, §8) — DMC, CMC, SSMC, SOMC, RMC, MMC
- [x] `SUBJECT_TRACKS` (§4) — the prototype's 6 tracks with counts and prof-year tags
- [x] `HOW_IT_WORKS` (§6) — added, so the steps live with the rest of the copy
- [x] `COLLEGE_RAIL_FOOTER` (§8)
- [x] `PROF_TRACKS` (§9) — 3 tiers incl. the `popular` flag for the "Most Popular" ribbon
- [x] `TESTIMONIALS` (§10) — 3 entries
- [x] `WHY_FEATURES` + `COMPARISON_ROWS` (§11)
- [x] `TOOLKITS` (§12) — 4 downloads
- [x] `FAQS` (§13) — 6 entries
- [x] `TUTOR_RECRUIT` (§14), `FINAL_CTA` (§15)
- [x] `CLASSROOM_DEMO` (§7) — ECG path + mentor feed, explicit `isDemo: true`
- [x] Icon names recorded as Material Symbols strings (`travel_explore`, `verified_user`, …)
      for the Phase 11 lucide mapping table

### `demo/index.js`

- [x] Single import surface: `getDemoTutors()`, `getFeaturedTutors(limit)`,
      `getDemoTutorById(id)`, `getDemoTutorsByOwner(email)`, `searchDemoTutors(filters)`,
      plus re-exports of every content constant
- [x] Every function mirrors its live API counterpart's signature and filtering behaviour
- [x] Every export shaped on the **live API's field names**, so swapping in the real
      backend in Phase 12a is a change of import, not a change of component code

### Copy pass — applied. Every reworded line

- [x] §3 "100% Secure Escrow — Fees released only after session completion via bKash & Nagad"
      → **"100% Verified Mentors — Every listing is manually vetted before it reaches the
      marketplace."**
- [x] §9 track pricing (৳6,500 / ৳8,000 / ৳9,500) — kept in the UI as designed
- [x] §10 testimonials → generic student roles, no real photos
- [x] §11 dropped the unbacked rows — Escrow-Backed Payment Protection · Recorded Replay &
      Slide Archives · Zero-Notice Cancellation Guarantee. Kept 5 rows that the app supports,
      and replaced the escrow feature bullet with **"Zero Double-Booking"**
- [x] §13 FAQ 3 (no-show refunds) removed. FAQ 5 (recordings) removed. The remaining 6 are
      rewritten to describe real behaviour: verification, payment methods, custom cards,
      booking confirmation, offline tutorials, cancellation
- [x] §14 "Earn ৳20,000–৳80,000 / month" → **"Teach clinical acumen on MediQueue."**
- [x] §15 "100% Money-Back Escrow" → **"Flexible Slots"**
- [x] §12 toolkits copy kept as-is; delivery is Phase 12

**Exit criterion (met):** a component can import from `@/lib/demo` and render everything
`code.html` shows, with no live API call.

**Also done in this phase:** fixed the Phase 0 lint baseline error
(`HowItWorks.jsx:45` unescaped apostrophe). `npm run lint` is now clean, `npm run build` passes.

---

## Phase 2 — Token layer (`src/app/globals.css`)

Rewrite `globals.css` (22 → ~260 lines). Tailwind v4 has **no** config file, so `@theme` is
the entire token surface. Where `DESIGN-tobe.md` and `code.html` disagree, **`code.html` wins.**

- [ ] Dark set transcribed verbatim from `code.html`'s Tailwind config:
      `surface #131315` · `surface-container-lowest #0e0e10` · `-low #1c1b1d` ·
      `-container #201f22` · `-high #2a2a2c` · `-highest #353437` ·
      `primary #c3c0ff` · `primary-container #4f46e5` · `secondary #d0bcff` ·
      `secondary-container #571bc1` · `tertiary #68dba9` · `tertiary-container #006e4c` ·
      `error #ffb4ab` · `outline #918fa1` · `outline-variant #464555` ·
      `surface-tint #c3c0ff` + every `on-*` pair
- [ ] Light set derived as a tonal inversion, same token names so utilities don't change
      ⚠️ ~50 invented tokens, no source of truth in either doc — review before Phase 3 ships
- [ ] Type scale: the 10 `--text-*` tokens from `code.html`'s config, verbatim
- [ ] Spacing: `space-xs/sm/md/lg/xl` + `gutter`/`margin`, 4px baseline
- [ ] Radii: use the values the `code.html` markup actually produces —
      ⚠️ its config declares `DEFAULT .25rem / lg .5rem / xl .75rem` but its markup uses
      `rounded-xl` / `rounded-2xl` / `rounded-3xl` (Tailwind defaults). The declared values
      are dead
- [ ] Elevation: **mirror `code.html` exactly** — `shadow-sm` on metric/review cards,
      `shadow-md` on tutor and step cards, `shadow-lg` on step cards, `shadow-xl` on the
      comparison table, `shadow-2xl` on the classroom console and the final CTA, and the
      custom `shadow-[0_1px_8px_rgba(0,0,0,0.04)]` on the fixed header and footer top edge
- [ ] Hero ambience as reusable classes: three 140px blur orbs + 24px dot grid at 3.5% opacity
- [ ] Motion: 300ms `cubic-bezier(.4,0,.2,1)`, `card-lift`, `beacon`, `animate-ping`,
      global `prefers-reduced-motion` kill switch (FIXES #13)
- [ ] `.tabular` utility (`font-variant-numeric: tabular-nums`) for ৳ rates, timestamps
- [ ] Drop `@import "@heroui/styles"` and `@plugin "daisyui"`; define `--color-base-*` locally first
- [ ] Fix `layout.js:7-11` — `next/font` variable doesn't match the `@theme` token, so
      Plus Jakarta Sans never loads today (FIXES #1)
- [ ] Add Space Grotesk (`code.html` uses it for the hero eyebrow) + mono stack for ECG readouts
- [ ] Drop Instrument Serif / Outfit / Syne — used 0, 1, 1 times respectively (the link tag itself)
- [ ] Blocking inline theme-init script + `suppressHydrationWarning` — no FOUC (FIXES #10)

---

## Phase 3 — Primitive library (`src/components/ui/`)

Token-driven, no hardcoded hex, no HeroUI. Match `code.html`'s rendered output exactly.

- [ ] `Button.jsx` — primary-container / surface-container / surface-container-highest /
      outline / ghost / danger; `px-5 py-2.5 rounded-xl` + `label-md` and the `px-7 py-3.5`
      / `px-8 py-4` + `label-lg` CTA sizes
- [ ] `Input.jsx` — `bg-surface-container` + `rounded-xl` + leading-icon slot,
      focus → `bg-surface-container-high`
- [ ] `Select.jsx`
- [ ] `Card.jsx` — `rounded-2xl` with the shadow variants used across the prototype
- [ ] `Badge.jsx` / `Chip.jsx` — BMDC-verified, availability beacon, medical-college pill
- [ ] `Modal.jsx`
- [ ] `Avatar.jsx` — status-ring variant (`ring-2 ring-surface-container-low`)
- [ ] `Spinner.jsx` — replaces HeroUI's for `loading.js`
- [ ] `Sheet.jsx` — frosted bottom sheet (mobile) / modal (desktop)
- [ ] `DatePicker.jsx` — native `<input type="date">`; retires the **undeclared
      `@internationalized/date`** import in `BookingModal.jsx:7`

---

## Phase 4 — HeroUI off the home path

Three files only. The other 10 import sites keep HeroUI until Phase 10.

- [ ] `components/TutorCard.jsx` — `Button`/`Card` → primitives. Rebuild to exact
      `code.html` §5 anatomy: 56px avatar + `ring-2 ring-surface-container-low` status
      ring · `verified` icon beside name · teaching-mode line · `apartment` institution
      row in `primary` · 2×2 meta grid with `event_seat` turning `error` at 0 slots ·
      location row · `Hourly Fee` + ৳ with `.tabular` · `bg-primary-container` Book button.
      Fixes missing `border-t` (FIXES #4); adds the `aria-label` the prototype omitted (FIXES #14)
- [ ] `loading.js` — `Spinner` → primitive, retokened
- [ ] `components/Navbar.jsx` — `Avatar` → primitive

**Exit criterion:** home page renders with zero HeroUI imports. HeroUI stays installed.

The remaining HeroUI conversions are folded into each page's own phase:

- [ ] `tutors/page.jsx` — HeroUI `Input` → primitive (Phase 10)
- [ ] `tutors/[id]/page.jsx` — HeroUI `Card`/`Chip` → primitives (Phase 10)
- [ ] `BookingModal.jsx` — HeroUI `Button`/`DateField`/`Label` → primitives (Phase 10)
- [ ] `BookingCancelAlert.jsx` — HeroUI `AlertDialog`/`Button` → primitives (Phase 10)
- [ ] `sign-in` / `sign-up` — HeroUI form components → primitives (Phase 10)
- [ ] `profile` / `add-tutor` — HeroUI → primitives (Phase 10)
- [ ] `components/UserProfileDropdown.jsx` — HeroUI `Dropdown` → custom popover (Phase 10)

---

## Phase 5 — Layout primitives + mobile nav

Layout primitives consume the Phase 1 demo data (e.g. `Section` renders `Eyebrow` +
`SectionHeading` from `content.js`).

- [ ] `Container.jsx` — `max-w-7xl px-6 lg:px-12`; kills the 6 competing `max-w-*`
- [ ] `SectionHeading.jsx` — eyebrow/heading/sub; kills the 4× duplication (FIXES #22)
- [ ] `Section.jsx` — owns alternating `bg-surface` / `bg-surface-container-lowest` +
      `py-20` / `py-16` rhythm
- [ ] `Eyebrow.jsx` — `label-sm` uppercase tinted eyebrow, used in 8 sections
- [ ] `BottomNav.jsx` — **net-new.** ⚠️ `code.html` has `hidden xl:flex` desktop nav, so
      `md`→`xl` is a dead zone with no nav at all, and no hamburger or bottom nav exists.
      Fixed bar, safe-area padding, blurred `bg-surface/80`, active `primary-container`
      + luminous dot, per `DESIGN-tobe.md` §Bottom Navigation
- [ ] Mobile drawer for the header, since `code.html` has none

---

## Phase 6 — Global chrome

- [ ] `Navbar.jsx` — port `code.html`'s `fixed` header verbatim: `h-16`, `max-w-7xl`,
      `bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]`, pill nav
      container (`bg-surface-container-low rounded-full`, active
      `bg-surface-container-high text-on-surface font-label-md`), `xl:flex`, theme toggle,
      Sign Up / Sign In pills, avatar. Add hamburger + drawer, since `code.html` has none.
      Keep the working drawer logic already in the file
- [ ] Theme toggle — real fix for FIXES #3 and #10: storage-backed, `system` default,
      no FOUC, `.dark` drives the M3 set
- [ ] `Footer.jsx` — port `code.html`'s 6-column footer verbatim, including the
      `shadow-[0_-1px_8px_rgba(0,0,0,0.04)]` top edge and the BMDC-verified pill.
      Current footer is on daisyUI tokens and stays light in dark mode; that dies here (FIXES #3)
- [ ] `Footer.jsx` newsletter `onSubmit` + toast (FIXES #12)
- [ ] `Footer.jsx` dead `#` links — reduce to real routes (FIXES #11)
- [ ] `not-found.jsx` + `components/NotFoundContent.jsx` — retoken; `sr-only` on status
      dots (FIXES #16); `aria-label` on icon-only buttons (FIXES #14)

---

## Phase 7 — Home §1–2

- [ ] `Slider.jsx` → single centered hero, `code.html` §1 verbatim: `bg-[#080614]`,
      `border-b border-outline-variant/30`, three glow orbs (`primary-container/20`,
      `secondary-container/20`, `tertiary-container/20` at 130–140px blur), 24px dot grid
      at 3.5% opacity, ping-beacon eyebrow in Space Grotesk, `headline-lg` H1 with
      `from-primary via-surface-tint to-tertiary` gradient span, two pill CTAs
- [ ] Drop the 4-slide Swiper, feathered circular image, and both floating glass badges —
      `code.html` has none. Deletes the `/all-courses` 404 (FIXES #7) and inverted height
      scale (FIXES #21) by removal
- [ ] `animate-ping` on the beacon, `motion-safe:` guarded (FIXES #13)
- [ ] §2 filter bar — `code.html` §2 verbatim: `bg-surface-container-low py-4 shadow-sm`,
      `w-full md:w-80` search input, `overflow-x-auto` college-pill carousel, active pill
      `bg-primary-container text-white`
- [ ] ⚠️ Pills filter demo data client-side on `institution`. A server-side query param is the
      better long-term fix — Phase 12

---

## Phase 8 — Home §3–6

- [ ] `AvailableTutors.jsx` → §5 grid, `code.html` §5 verbatim, reading from
      `getFeaturedTutors()` in `@/lib/demo`. try/catch so a data error can't hard-500 the
      home page (FIXES #9); drop `min-h-screen` (FIXES #5); new copy so it stops duplicating
      `/tutors` (FIXES #6)
- [ ] `HowItWorks.jsx` → §6: `01/02/03` badge overflowing the card top
      (`absolute -top-5 w-10 h-10 rounded-full bg-primary-container`), 64px icon tile with
      `group-hover:scale-110`
- [ ] §3 metrics bar — new, from `TRUST_METRICS`, `code.html` §3 verbatim
- [ ] §4 subject grid — new, from `SUBJECT_TRACKS`, `code.html` §4 verbatim.
      Counts come from demo data, not the live API's 5 subjects

---

## Phase 9 — Home §7–15

Nine new components, all from `content.js`, all matching `code.html` verbatim:

- [ ] `LiveClassroom.jsx` (§7, demo-flagged) — 7/5 split, inline SVG ECG trace, mentor feed
- [ ] `CollegeRail.jsx` (§8)
- [ ] `ProfTracks.jsx` (§9) — includes the `-top-3.5` "Most Popular" ribbon
- [ ] `Testimonials.jsx` (§10) — 5-star rows with the `FILL` axis equivalent
- [ ] `WhyChooseUs.jsx` (§11, + comparison table)
- [ ] `Toolkits.jsx` (§12) — `Download PDF` / `Download Slides` / `Download Matrix` /
      `Download Guide` CTAs retained as normal buttons, delivery deferred to Phase 12
- [ ] `Faq.jsx` (§13)
- [ ] `TutorRecruit.jsx` (§14) — `Apply as a Medical Tutor` → `/add-tutor`
- [ ] `FinalCta.jsx` (§15) — `Book a Mentor Today` → `/#tutors-directory`
- [ ] `page.js` — reorder imports above the `metadata` export (FIXES #23)
- [ ] Remove the last `swiper` usage → dependency goes

---

## Phase 10 — Remaining pages (HeroUI converted as each is touched)

- [ ] `tutors/page.jsx` — retheme to the §2 filter bar + pills; try/catch so `loading`
      can't stick `true`; real empty/loading states. HeroUI `Input` → primitive
- [ ] `tutors/[id]/page.jsx` — retheme profile, stats, sticky booking card.
      HeroUI `Card`/`Chip` → primitives
- [ ] `BookingModal.jsx` → frosted bottom sheet on mobile / modal on desktop.
      HeroUI `Button`/`DateField`/`Label` → primitives. Logic untouched
- [ ] `BookingCancelAlert.jsx` — retoken; fix unedited HeroUI boilerplate copy
      ("My Awesome Project")
- [ ] `sign-in/page.jsx`, `sign-up/page.jsx` — retoken, keep validation logic.
      Swap `@gravity-ui/icons` for lucide
- [ ] `profile/page.jsx` — retoken. HeroUI `Avatar`/`Card` → primitives
- [ ] `add-tutor/page.jsx` — retoken. HeroUI → primitives
- [ ] `my-tutors/page.jsx` — fix broken `/add-tutors` → `/add-tutor` link (lines 47, 61)
- [ ] `components/MyTutorsList.jsx` — biggest change: raw `<input>`/`<button>` and
      hand-rolled modals → primitives
- [ ] `booked-sessions/page.jsx` — retoken

---

## Phase 11 — Cleanup & verification

- [ ] Remove `daisyui`, `@heroui/react`, `@heroui/styles`, `react-icons`,
      `@gravity-ui/icons`, `swiper` from `package.json`
- [ ] Confirm zero `@heroui/react` imports remain across `src/`
- [ ] Consolidate icons on `lucide-react` via a ~60-entry mapping table from Material
      Symbols (incl. the `FILL` axis trick for favorite hearts + star ratings)
- [ ] Fix prototype image sources ⚠️ all 11 point at `lh3.googleusercontent.com` and use
      `data-alt` (a no-op attribute — real `alt` is empty). Will likely expire and is
      inaccessible
- [ ] Correct `README.md` — claims TanStack Query + Axios; neither is installed (FIXES #19)
- [ ] Delete dead `.swap` CSS in `globals.css` (FIXES #20)
- [ ] Run `npm run lint`, diff against Phase 0 baseline (FIXES #24)
- [ ] Run `npm run build`
- [ ] Manual pass, both themes, every route — against a checklist written at Phase 11 start
- [ ] Update `DESIGN-old.md`; annotate `DESIGN-tobe.md` with what shipped

---

## Phase 12 — Backend work

**All backend work is confined to this final phase.** Phases 1–11 are frontend/design only and
build entirely against the Phase 1 curated demo data. Nothing in Phases 1–11 requires a
backend change.

This phase replaces the demo data with real endpoints, implements the deferred CTAs, and
closes the security gaps. The backend is a single 181-line `Index.js` with no controllers, no
validation, and no tests — this phase changes that.

### 12a — Cut over from demo data to the live API

- [ ] `AvailableTutors.jsx` — swap `getFeaturedTutors()` for
      `GET /featured-tutors`
- [ ] `tutors/page.jsx` + the §2 filter bar — swap `getDemoTutors()` for `GET /tutors`
- [ ] `my-tutors` — `GET /tutors` + filter on `tutorEmail`, once the field exists server-side
- [ ] `tutors/[id]` — `GET /tutors/:id`
- [ ] §3–§13 sections — replace `content.js` exports with the read endpoints in 12b
- [ ] Remove the `isDemo: true` flag once `/classroom-sessions` returns real data

### 12b — Read APIs to replace demo content

- [ ] `GET /subjects` — powers §4 subject grid + §2 subject filtering
- [ ] `GET /tutors?institution=` — makes §2 college pills a server-side filter
- [ ] `GET /testimonials` — replaces `TESTIMONIALS`
- [ ] `GET /faqs` — replaces `FAQS`
- [ ] `GET /toolkits` — powers §12 file listing
- [ ] `GET /programs` — powers §9 Prof Tracks, with real pricing fields
- [ ] `GET /colleges` — powers §8 college rail
- [ ] `GET /classroom-sessions` — powers §7 Live Classroom Console
- [ ] `GET /trust-metrics` — powers §3
- [ ] Add pagination + response limits to all list endpoints (currently unbounded)
- [ ] Add input validation and correct status codes (a missing tutor currently returns
      `200` + `null`)
- [ ] Data hygiene from the Phase 0 audit: coerce `hourlyFee`/`totalSlot` to numbers,
      clean junk `institution`/`district` values, dedupe `Chattagram`/`Chattogram`,
      backfill `tutorEmail` + `addedBy`

### 12c — Mutating APIs for deferred CTAs

- [ ] `POST /toolkits/:id/download` — implements §12's Download PDF / Slides / Matrix /
      Guide buttons. Needs file storage (S3 or Vercel Blob) and download tracking
- [ ] `POST /enrollments` — implements §9's Enroll in Track buttons. Needs a new
      `enrollments` collection keyed to a program + student + payment state

### 12d — Security — required before 12c ships

These are unauthenticated today. 12c cannot ship until they are closed.

- [ ] ⚠️ `POST /tutors`, `PUT /tutors/:id`, `DELETE /tutors/:id` are **fully
      unauthenticated** — anyone can create, edit, or delete any listing. Add
      `verifyToken` + an ownership check against `addedBy`
- [ ] ⚠️ `GET /tutor-bookings/:userId`, `DELETE /tutor-bookings/:bookingId`,
      `GET /my-tutors/:email` are **fully unauthenticated** — any user's bookings are
      readable by anyone. Add `verifyToken` + ownership checks
- [ ] ⚠️ `PATCH /tutors/:id/decrease-slot` is read-then-write with no atomicity, so
      concurrent bookings can oversubscribe a slot. Make it an atomic
      `findOneAndUpdate` with a `$gte` guard
- [ ] ⚠️ `POST /tutor-bookings` trusts `userId` from the client body rather than
      `req.user`. Read it from the verified token
- [ ] Add `helmet`, a request size limit, and rate limiting (currently none)
- [ ] Add an error-handling middleware — route registration currently happens inside
      `run()`, so a failure there leaves the process listening with zero routes
- [ ] Fix `vercel.json` referencing lowercase `index.js` while the file is `Index.js`
- [ ] Add a test suite. `npm test` currently exits 1 by design
- [ ] ⚠️ `.env` contains a live MongoDB Atlas URI and `BETTER_AUTH_SECRET`, and is on disk
      despite `.env*` being gitignored. Rotate the credentials

### 12e — Payments, if the escrow copy is ever restored

- [ ] bKash / Nagad / Rocket integration (logos already in `public/`)
- [ ] Session-completion release flow

Not required while the escrow copy stays softened per Phase 1.

### 12f — Verification

- [ ] Re-run the Phase 11 manual checklist against the live backend
- [ ] Confirm no demo data module is still imported anywhere in `src/`

---

## Known defects from `FIXES.md` and where they're handled

| # | Defect | Phase |
| --- | --- | --- |
| 1 | Brand font never loads | 2 |
| 3 | Dark mode half-implemented (footer stays light) | 2, 6 |
| 4 | Tutor card footer divider never renders | 4 |
| 5 | Featured section forces full viewport height | 8 |
| 6 | Duplicate `<h1>` and content across `/` and `/tutors` | 8 |
| 7 | Hero slide 3 links to a 404 route | 7 |
| 8 | CTAs hit the auth wall with no signed-out context | 6, 10 |
| 9 | Home page can hard-500 when backend is down | 8 |
| 10 | Theme preference resets on every load | 2, 6 |
| 11 | Every footer link is a dead `#` | 6 |
| 12 | Newsletter form has no handler | 6 |
| 13 | Infinite `animate-bounce`, no reduced-motion fallback | 2, 7 |
| 14 | Icon-only buttons have no accessible name | 4, 6 |
| 16 | Live status conveyed by color + position alone | 6 |
| 19 | README documents dependencies that don't exist | 11 |
| 20 | Dead CSS | 11 |
| 21 | Hero height scale inverted | 7 |
| 22 | Section header block duplicated 4× | 5 |
| 23 | `page.js` interleaves imports with an export | 9 |
| 24 | No lint baseline | 0, 11 |

**Also fixed by Phase 1** (pre-existing bugs found during the Phase 0 API audit, not in
`FIXES.md`): `My Tutors` is broken because `my-tutors/page.jsx` filters on `t.email` and live
documents have no such field. Demo data supplies `tutorEmail` + `addedBy`, so the page has
something real to render from Phase 10 onward.

**Not in scope:** #2 (Montserrat wordmark — dies with the Navbar rewrite), #15 (identical
`alt` — all hero images removed), #17 (divider `::after` — done in the Navbar rewrite),
#18 (icon library consolidation — folded into Phase 11).

---

## Open risks

- [ ] **The light M3 set is ~50 invented tokens** sitting underneath every other phase.
      Nothing in either doc defines a light palette. Review the ramp before Phase 2 ships
- [ ] **Phase 4's exit criterion is partial by design** — 10 HeroUI import sites survive
      until Phase 10. Two systems coexist until then, but each phase's page is fully custom
- [ ] **All 15 sections are demo content, not features**, until Phase 12. Buttons render
      and are clickable; nothing happens yet. This is the accepted cost of matching
      `code.html` closely
- [ ] **`DESIGN-tobe.md` and `code.html` contradict each other on elevation.** Following
      `code.html` per the locked decision — cards use the prototype's shadows, not the
      spec's flat L1
- [ ] **No test suite and no CI** until Phase 12d. Lint + build + manual checklist are the
      only gates through Phase 11
- [ ] **`code.html` has no mobile navigation at all** — the `md`→`xl` dead zone and the
      bottom nav are net-new design work, not a port
- [ ] **Demo tutor portraits must be committed as local files.** The prototype's
      `googleusercontent` URLs will expire and use `data-alt`, which does nothing
- [ ] **The backend is unauthenticated on 7 of 12 routes.** Frontend work is safe because
      it doesn't widen that exposure, but Phase 12c must not ship before 12d
