# EventMaster 🎟️

A responsive event management web application built with **React + TypeScript** and **Vite**.

🔗 **Live Demo**: [https://event-planner-mehfil.netlify.app/](https://event-planner-mehfil.netlify.app/)

---

## Features

- **Animated Landing Page** — hero blob animations, staggered card reveals via IntersectionObserver, pulse-ring CTAs
- **Fuzzy Search** — typo-tolerant event search powered by [Fuse.js](https://fusejs.io/) with weighted keys (title, artist, type)
- **Event Discovery** — multi-dimensional filtering (type, location, date, price range, time status)
- **Ticket Booking & Checkout** — 4-step wizard with card, UPI, and net banking payment flows + QR code confirmation
- **Recommendation Engine** — content-based scoring on favorited event types and browse history
- **Role-Based Dashboards** — Attendee, Artist, Organizer, and Admin roles with dedicated nav and views
- **User Data Storage** — profiles, favorites, and booking interactions persisted via `localStorage`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | TailwindCSS 3 |
| Routing | React Router v6 |
| Search | Fuse.js |
| Deployment | Netlify |

## Getting Started

```bash
cd project
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Project Structure

```
project/src/
├── components/
│   ├── events/         # EventFeed, RecommendedEvents
│   └── shared/         # Modal, ResponsiveLayout, RoleBasedNav
├── contexts/           # AuthContext, FavoritesContext
├── data/               # events.ts — shared mock data
├── layouts/            # DashboardLayout (role-aware sidebar)
├── pages/
│   ├── admin/          # Admin event/sponsor/financial pages
│   ├── dashboards/     # Attendee, Artist, Organizer, Admin dashboards
│   └── events/         # EventDetails, TicketPurchase
└── utils/
    └── recommendations.ts  # Content-based recommendation engine
```

## Deployment

Deployed on Netlify via GitHub integration. The `netlify.toml` handles SPA routing:

```toml
[build]
  base    = "project"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```
