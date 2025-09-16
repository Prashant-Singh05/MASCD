# MASCD Frontend (Vite + React + Tailwind)

This is the frontend for Medicine Authenticity & Supply Chain (MASCD).

## Local Build

```
cd frontend
npm install
npm run build
```
This produces `frontend/dist/`.

## Deploy on Vercel (from repo root)

- Connect the GitHub repo on Vercel.
- Ensure repo root contains `vercel.json` with static build of `frontend/`.
- Build Command: `npm run build`
- Output Directory: `frontend/dist`
- Environment Variable:
  - `VITE_API_URL = https://<your-backend-url>` (Render/other backend)

After deploy, all SPA routes will serve `index.html` as configured in root `vercel.json`.

## API Base URL

All API requests use `VITE_API_URL` via the axios instance at `src/services/api.js`.
