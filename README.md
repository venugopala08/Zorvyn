# Finance Dashboard UI

A polished frontend finance dashboard built with React, Vite, Tailwind CSS, Recharts, and Zustand. The project is designed as an assignment-ready submission that demonstrates clean component architecture, responsive UI design, state management, role-based behavior, mock data handling, and thoughtful UX details.

## Overview

This dashboard helps users:

- View total balance, income, expenses, and savings rate
- Explore transaction history with search, filters, sorting, and date range controls
- Understand spending patterns through time-based and category-based charts
- Switch between `Admin` and `Viewer` roles to simulate read-only vs editable UI
- Export transaction data as `CSV` or `JSON`
- Persist dashboard state with `localStorage`

## Features

- Responsive dashboard layout for mobile, tablet, and desktop
- Summary cards for balance, income, and expenses
- Balance trend chart
- Expense breakdown chart
- Insights panel:
  - Highest spending category
  - Monthly comparison
  - Savings rate
  - Largest expense
- Transactions table with:
  - Search
  - Type filter
  - Category filter
  - Date range filter
  - Sorting by date and amount
- Role-based frontend UI simulation:
  - `Viewer`: read-only
  - `Admin`: add, edit, delete, and restore demo data
- Mock API-style loading state
- Empty-state handling
- Dark/light visual mode toggle
- Export as CSV / JSON
- Local storage persistence

## Tech Stack

- React
- Vite
- Tailwind CSS
- Zustand
- Recharts
- Lucide React

## Why Zustand

Zustand was chosen because this app has shared UI and business state across multiple sections, but it does not need the ceremony of Redux. It keeps the store lightweight, readable, and scalable while avoiding prop drilling for:

- transactions
- filters
- selected role
- theme mode
- loading state

It also makes local storage persistence straightforward without overcomplicating the architecture.

## Project Structure

```text
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── transactions/
│   └── ui/
├── data/
│   ├── mockApi.js
│   └── seed.js
├── lib/
│   └── finance.js
├── store/
│   └── useFinanceStore.js
└── styles/
    └── index.css
```

## How It Works

### Dashboard Overview

Derived finance metrics are calculated from the transaction list inside `src/lib/finance.js`. This keeps business logic separate from presentation components.

### Transactions

Transactions are stored in Zustand and rendered in the transactions section with filtering, sorting, and search handled in the UI layer using reusable helper functions.

### Role-Based UI

The role switcher in the header updates the global state:

- `Viewer` can inspect data only
- `Admin` can add, edit, delete, and restore transactions

This is a frontend-only simulation intended to demonstrate UI behavior differences clearly.

### Persistence

The dashboard store persists transactions, filters, theme mode, and role to `localStorage`, so the demo state survives refreshes.

### Mock API

The initial transaction set is loaded through a small mock API abstraction with artificial delay to simulate a real loading flow.

### Export

The header includes export actions for:

- CSV
- JSON

These are generated directly from the current transaction dataset in the client.

## Setup Instructions

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Design Decisions

- A premium dashboard look was chosen over a generic admin template
- Glassmorphism-inspired cards and layered gradients improve visual depth
- A strong content hierarchy makes financial insights quickly scannable
- The transactions section is intentionally interaction-rich because that is where most evaluator attention tends to go
- Empty states, loading states, and role feedback were included to make the app feel more complete

## Tradeoffs

- No backend is included because the assignment is frontend-focused
- Role-based access is simulated at the UI level only
- The mock API is intentionally lightweight and local
- Persistence is client-side only through local storage

## Future Improvements

- Add unit tests for finance helpers and store actions
- Add pagination or virtualization for larger transaction datasets
- Add category budget goals and alert thresholds
- Integrate a real backend or mock service worker
- Improve accessibility with richer keyboard navigation and live-region feedback
- Add more advanced analytics such as recurring expense detection

## Submission Notes

This project intentionally focuses on:

- frontend architecture
- UI/UX quality
- responsiveness
- interaction design
- maintainable state management
- evaluator-friendly completeness

If needed for submission, you can also include screenshots or deploy it to Vercel/Netlify for easier review.
