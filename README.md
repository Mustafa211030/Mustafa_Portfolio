# Mustafa Saeed — Portfolio (Full Stack MERN)

Premium production-ready portfolio with animated preloader, Cal.com-style booking, contact form with email notifications to `cmustafasaeed665@gmail.com`, and full Express + MongoDB backend.

---

## Quick Start (3 steps)

### 1. Install
```bash
cd mustafa-portfolio
npm run install:all
```

### 2. Set up environment
```bash
cd server
copy .env.example .env      # Windows
# OR: cp .env.example .env  # Mac/Linux
```

Open `server/.env` and set:
```env
MONGODB_URI=mongodb://localhost:27017/mustafa_portfolio
EMAIL_USER=cmustafasaeed665@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Gmail App Password:** Google Account → Security → 2-Step Verification → App Passwords → Create one for "Mail"

### 3. Run
```bash
npm run dev
# Client → http://localhost:5173
# Server → http://localhost:5000
# Book a call → http://localhost:5173/book-call
```

---

## Project Structure

```
mustafa-portfolio/
├── client/src/
│   ├── components/
│   │   ├── layout/   Navbar, Footer
│   │   ├── sections/ Hero, Marquee, Services, Philosophy,
│   │   │             CaseStudy, Projects, Process,
│   │   │             Testimonials, GetStarted, BookCall
│   │   └── ui/       Preloader, ScrollToTop
│   ├── hooks/        useTypewriter, useInView, useScrollProgress
│   ├── lib/          constants.ts, animations.ts
│   └── context/      store.ts (Zustand)
└── server/
    ├── routes/       contact, bookings, projects, auth, analytics
    ├── models/       Contact, Booking, Project
    ├── utils/        logger.js, email.js
    └── middleware/   auth.js, sanitize.js
```

---

## Key Features

| Feature | Details |
|---------|---------|
| **Preloader** | 3-phase: progress bar → letter reveal → cinematic exit |
| **Navbar** | Transparent on load → animated floating pill on scroll |
| **Philosophy** | Scroll-locked, word-by-word highlight driven by scroll delta |
| **Projects** | 10 projects, AnimatePresence transitions, thumbnail strip |
| **Book a Call** | Cal.com-style, 3-step, double-booking prevention |
| **Email notifications** | All bookings + contacts → `cmustafasaeed665@gmail.com` |
| **Container** | `site-container` = max-width 1024px, centered, every section |

---

## Email Flow

Every **booking** triggers:
1. Notification to `cmustafasaeed665@gmail.com` with full details + action prompt
2. Confirmation email to the client

Every **contact form** triggers:
1. Notification to `cmustafasaeed665@gmail.com` with message
2. Auto-reply to the sender

---

## Deployment

**Frontend → Vercel:**
```bash
cd client && vercel --prod
```

**Backend → Railway:**
- Connect repo, set root to `server/`, add all env vars from `.env.example`

**Database → MongoDB Atlas (free):**
- cloud.mongodb.com → free cluster → get connection string → paste as `MONGODB_URI`

---

## Customise

- `client/src/lib/constants.ts` — your name, stats, projects, testimonials, social links
- `server/.env` — MongoDB URI, Gmail credentials
- `client/public/favicon.svg` — replace with your own icon
- Hero background — replace Unsplash URL in `Hero.tsx`

---

© 2026 Mustafa Saeed. All rights reserved.
