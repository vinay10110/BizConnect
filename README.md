# BizConnect

A bridge between business people and investors. This monorepo contains a React (Vite) frontend and an Express/MongoDB backend.

## Live Demo
https://biz-connect.vercel.app

## Potential Impact
- __Faster investor–founder matchmaking__: Structured idea listings and filters help investors quickly find relevant opportunities.
- __Lower barrier to outreach__: One‑click email contact enables immediate conversations, reducing friction and time‑to‑first‑contact.
- __Accelerated iteration for founders__: Direct, fast feedback from investors supports quicker refinement of ideas and proposals.
- __Broader financing options__: Separate domains for ideas, proposals, and loans surface both equity and debt paths.
- __Up‑to‑date, authenticated content__: Owners perform authenticated updates/removals, helping keep information accurate.
- __Less confusion during server cold starts__: A guided loading experience sets expectations and keeps users engaged while services wake up.
- __Clear session lifecycle__: Token‑expiry handling prevents silent failures and prompts clean re‑authentication when needed.

## Tech Stack
- Frontend: React 18, Vite, Ant Design, React Router
- Backend: Node.js, Express, Mongoose, JWT

## Monorepo Structure
- `client/` — React frontend
- `server/` — Express API server

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- A MongoDB connection string

### 1) Backend setup (`server/`)
1. Create `server/.env` using these keys:
   - `MONGO_URL` — your MongoDB URI
   - `HOST_ADDRESS` — origin allowed for CORS (e.g., `http://localhost:5173` during local dev)
   - `SECRET` — JWT secret

   Example:
   ```env
   MONGO_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
   HOST_ADDRESS=http://localhost:5173
   SECRET=change_me_to_a_strong_secret
   ```

2. Install and run:
   ```bash
   npm install
   npm run dev     # runs on port 4000 by default
   ```

The server listens on `http://localhost:4000` (see `server/server.js`).

### 2) Frontend setup (`client/`)
1. Create `client/.env`:
   - `VITE_API_URL` — your backend base URL (e.g., `http://localhost:4000`)

   Example:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

2. Install and run:
   ```bash
   npm install
   npm run dev     # Vite dev server (default: http://localhost:5173)
   ```

## API Overview
The server mounts route groups in `server/server.js`:
- `/user`
- `/idea`
- `/loan`
- `/intrest`
- `/proposal`
- `/query`
- `/solution`

## Scripts
- Backend (`server/package.json`):
  - `npm run dev` — start with nodemon
  - `npm start` — start with node
- Frontend (`client/package.json`):
  - `npm run dev` — Vite dev server
  - `npm run build` — production build
  - `npm run preview` — preview production build

## Environment Files
- See examples:
  - `server/.env.example`
  - `client/.env.example`

