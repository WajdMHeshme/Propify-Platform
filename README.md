# <p align="center"><img src="assets/logo.png" alt="Propefy Logo" width="140" /></p>

<h1 align="center" style="color:#5659f9; margin-top: 0;">Propefy</h1>
<p align="center" style="color:#4f46e5; margin-top: 0;">A modern property booking + management platform — React + TypeScript + Vite</p>

---

## 🔖 Project overview
**Propefy** is a full-featured property booking and management platform with a clean, user-centric UI and a robust admin/employee dashboard.  
Built with modern front-end tooling for fast development and great DX (developer experience).

Key highlights:
- Admin & Employee dashboards with precise RBAC (roles & permissions)  
- Customers browse properties, send booking requests, message staff, and manage favorites/history  
- File attachments (contracts, receipts) and an internal messaging system  
- i18n support for multiple languages  
- Built to be fast and responsive using caching + React Query (TANStack)

---

## 🎨 Brand colors (use these in your UI / docs)
```css
:root {
  --color-primary: #5659f9;      /* primary */
  --color-primary-dark: #4f46e5; /* primary dark */
  --color-white: #ffffff;
}
🛠️ Tech stack (short)

Framework: React.js + TypeScript

Build: Vite (fast HMR & builds)

Styling: Tailwind CSS

Data / caching: React Query (TANStack), Axios, REST APIs, client caching

i18n: translation-ready (i18n)

Linting & tooling: ESLint (config examples below)

Deployment: any static hosting + API backend (Node/Express, etc.)

✨ Features

Multi-role dashboards: Admin / Employee / Customer

Booking lifecycle: pending → approved | rejected | needs_reschedule → confirmed → completed | cancelled

Internal messaging & file attachments (secure storage + expiring download links)

Favorites & booking history for customers

Reports & analytics for admin (occupancy, revenue, conversions)

Responsive, mobile-first UX

👩‍💻 Customer flow (concise scenario)

Discover — Customer browses property listings, views gallery, specs, map, and availability.

Request booking — Customer signs in, selects dates, clicks Request Booking (creates pending booking).

Review — Employee/Admin receives notification and reviews request.

Decision — Employee chooses to approve, reject, or request reschedule.

If approved, customer receives confirmation and (optionally) a payment link.

If reschedule requested, customer gets proposed slots and can accept one.

Confirmed — Booking becomes confirmed and appears in customer bookings & admin reports.

Communication — Any clarifications or file exchanges happen via the internal messaging system.

⚙️ Vite / React notes
React + Vite

This template uses Vite for fast dev server and builds. Two official React plugins are commonly used:

@vitejs/plugin-react — uses Babel (or oxc when used in rolldown-vite) for Fast Refresh.

@vitejs/plugin-react-swc — uses SWC for Fast Refresh and faster transforms.

React Compiler

The React Compiler is not enabled by default in this repo because it can affect dev & build performance. To add it, follow the official React Compiler installation docs: https://react.dev/learn/react-compiler/installation

🧰 ESLint (recommended expansion)

If you plan to ship a production app, enable type-aware linting. Example eslint config snippet:

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])

Optionally add React-specific lint plugins:

// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
🚀 Quick start
# clone
git clone https://github.com/your-username/propefy.git
cd propefy

# install deps
npm install

# dev
npm run dev

# build
npm run build

# preview production build
npm run preview

Open: http://localhost:3000

🧩 Recommended folder structure (example)
/src
  /api            # Axios clients, typed API services
  /components     # shared UI components (cards, buttons, chips)
  /features       # pages / feature slices (properties, bookings, messages)
  /hooks          # custom hooks (useBooking, useAuth)
  /i18n           # translations
  /styles         # global css / tailwind config
  main.tsx
🔒 Security & best practices (brief)

Validate booking dates & availability on backend to prevent double-booking.

Store attachments in secure blob storage (S3/Azure) and serve via expiring signed URLs.

Enforce RBAC server-side (never trust client role checks).

Use rate limiting and monitoring for critical endpoints.

Add unit & e2e tests for core flows (booking lifecycle, auth, file uploads).

✅ Contributing

Contributions, issue reports, and PRs are welcome. Please:

Fork the repo

Create a feature branch feature/your-feature

Open a clear PR with description & screenshots if UI changes

📄 License

Choose an appropriate license for your repo (e.g., MIT). Add a LICENSE file.

<p align="center"> <sub style="color:#4f46e5">Made with ❤️ • Propefy — React + TypeScript + Vite</sub> </p> `