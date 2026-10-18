# 🩺 MediQueue — Medical Tutoring Marketplace

MediQueue is a specialized Next.js web application designed for medical students to find, book, and manage 1-on-1 tutoring sessions with expert medical mentors in core subjects like Anatomy, Physiology, Biochemistry, and more.

The platform connects seamlessly to an external REST API and uses Better Auth paired with MongoDB to ensure secure, reliable account and session management.

🔗 **Live Deployment:** [https://b13-a9-client.vercel.app](https://b13-a9-client.vercel.app)

---

## 🚀 Key Features

### 📡 Home & Marketing

- **Hero Carousel:** Interactive banner built with Swiper featuring autoplay, smooth navigation, and direct call-to-actions (CTAs).
- **Featured Tutors:** Dynamic showcase highlighting top-rated medical mentors loaded straight from the API.
- **3-Step Workflow:** Interactive guide illustrating the core user journey: _Find Specialist → Book Date → Live Learning_.
- **Trust Badges:** Highlights verification status, automated scheduling, and high-quality mentorship.

### 🔍 Browse & Discover Tutors

- **Advanced Search:** Real-time search filtered by tutor name, subject, or institution with built-in query debouncing.
- **Dynamic Filters:** Refine choices effortlessly by Subject, City (District), Price Range (BDT), and Teaching Mode (_Online / Offline / Both_).
- **Detailed Profiles:** In-depth tutor detail pages featuring stats, biographical about section, and an integrated booking widget.
- **Favorites System:** Interactive "Favorite" toggle directly on tutor cards (UI-state).

### 📅 Booking & Slot Management

- **Appointment Modal:** Modal with date selection and session confirmation.
- **Automated Slot Deductions:** Real-time update that automatically decreases available tutor slots upon successful booking.
- **Student Dashboard:** "My Booked Sessions" tab to track active bookings, fees, and reservation statuses.
- **Cancellation Support:** Immediate booking cancellation with built-in confirmation dialogs.

### 👩‍🏫 Tutor Listings (Authenticated Users)

- **Creation Form:** Add comprehensive tutor listings including image URL, experience, subjects, location, and fees.
- **Personal Management Panel:** "My Tutors" hub displaying all active listings published by the logged-in user.
- **Full CRUD Operations:** Edit listing details via inline modals and safely delete listings with confirmation states.

### 🔐 Authentication & Security

- **Credential Sign-In:** Standard Email and Password registration/login flow.
- **Social Auth:** One-click Google OAuth login integration.
- **Route Protection:** `proxy.js` redirects unauthenticated hits on `/add-tutor`, `/my-tutors`, `/booked-sessions`, and `/tutors/[id]` to `/sign-in`. The matcher uses `/tutors/:path` (one segment), so the `/tutors` listing stays public. The redirect carries no `callbackUrl`, so a signed-out user loses their intended destination — tracked for Phase 12.

---

## 🛠️ Tech Stack

| Layer                    | Technology                                                            |
| :----------------------- | :-------------------------------------------------------------------- |
| **Framework**            | Next.js 16 (App Router), React 19                                     |
| **Styling & UI**         | Tailwind CSS 4 tokens (`@theme` in `globals.css`), local primitives in `src/components/ui/` |
| **Authentication**       | Better Auth + MongoDB adapter                                         |
| **State & API Handling** | React Server Components for reads; `fetch` + `useState` / `useMemo` on the client. No query cache, no HTTP client |
| **UI Enhancements**      | Lucide React (icons), React Hot Toast (notifications)                  |

---

## 💻 Getting Started

### Prerequisites

Make sure you have an `.env` file in the client root folder with the following variables:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_BETTER_AUTH_URL=your_auth_base_url
```

### Installation Steps

1. Clone the repository:

```bash
   git clone [https://github.com/your-username/mediqueue-client.git](https://github.com/your-username/mediqueue-client.git)

```

2. Install the necessary dependencies:

```bash
   npm install
   # or
   yarn install

```

3. Run the development server:

```bash
   npm run dev
   # or
   yarn dev



Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) inside your browser to explore the app locally!

---

## 🌐 Deployment & Scripts

- **Build:** `npm run build` — Compiles the production application.
- **Start:** `npm run start` — Starts a Next.js production server.
- **Lint:** `npm run lint` — Runs integrated ESLint checks.

This project is fully optimized for hosting on the **Vercel Platform**.

```
