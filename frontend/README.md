# MASCD Frontend (Vite + React + Tailwind)

This is the frontend for Medicine Authenticity & Supply Chain (MASCD).

## Local Development

1. Create `.env` with:

```
VITE_API_URL=http://localhost:3000
```

2. Install and run:

```
npm install
npm run dev
```

Open http://localhost:5173

## Deployment on Vercel

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable:
  - `VITE_API_URL = <your Render backend URL>` (e.g., `https://mascd-api.onrender.com`)

SPA routing is configured via `frontend/vercel.json` so all routes serve `index.html`.

## API Base URL

All API requests use `VITE_API_URL` via the axios instance at `src/services/api.js`.
