# Medicine Authenticity & Supply Chain (MASCD)

A fullstack web app to track medicine batches across the supply chain and allow public verification.

- Backend: Node.js, Express, Sequelize (MySQL), JWT, bcrypt, rate limiting
- Frontend: React (Vite), Tailwind CSS, QR scanning
- Docker: mysql + backend + frontend

## Quick Start (Docker)

1. Copy env file and adjust values:

```bash
cp .env.example .env
```

2. Start services:

```bash
make up
```

3. Run DB migration and seed (first time):

```bash
make migrate
make seed
```

4. Open frontend at `http://localhost:5173` and backend at `http://localhost:3001`.

## Services
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173`
- MySQL: `localhost:3306`

## Environment Variables
See `.env.example` for all variables: DB connection, JWT, rate limits, ports.

## Database
- MySQL 8 (InnoDB, utf8mb4)
- Sequelize ORM in app
- Also includes `backend/sql/migration.sql` and `backend/seeders/seed.sql`

## Scripts
- `make up` / `make down` — start/stop stack
- `make migrate` / `make seed` — run SQL migration/seed helpers
- `make test-backend` — run backend tests

## API Overview
- POST `/api/auth/register` — register user
- POST `/api/auth/login` — login
- POST `/api/medicines` — manufacturer-only create medicine
- POST `/api/batches` — manufacturer-only create batch, returns batch_code + QR data URL
- GET `/api/batches/:batch_code` — batch details + current owner
- GET `/api/batches/:batch_code/history` — batch history
- POST `/api/transactions/transfer` — transfer batch (transactional)
- POST `/api/verify` — public verify (rate limited)
- GET `/api/reports/expired` — admin-only

## Development (without Docker)
- Backend: `cd backend && npm install && npm run dev`
- Frontend: `cd frontend && npm install && npm run dev`

Configure DB in `.env` first.

## Testing
- Backend tests: `cd backend && npm test`

## Sample curl commands

1) Register a customer and capture token
```bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice","email":"alice@example.com","password":"password123","role":"customer"}' | jq -r .token)
```

2) Login (any user)
```bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"mfg@example.com","password":"manufacturer123"}' | jq -r .token)
```

3) Create a medicine (manufacturer-only)
```bash
curl -X POST http://localhost:3001/api/medicines \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"name":"PainAway","generic_name":"Ibuprofen","composition":"Ibuprofen 200mg"}'
```

4) Create a batch (manufacturer-only)
```bash
curl -X POST http://localhost:3001/api/batches \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"medicine_id":1,"manufacture_date":"2024-01-01","expiry_date":"2026-01-01","quantity_produced":1000}'
```

5) Get batch details
```bash
curl http://localhost:3001/api/batches/DEMO1234
```

6) Get batch history
```bash
curl http://localhost:3001/api/batches/DEMO1234/history
```

7) Transfer (org user) — to distributor org_id=2
```bash
curl -X POST http://localhost:3001/api/transactions/transfer \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"batch_code":"DEMO1234","to_org_id":2,"note":"Ship to FastDist"}'
```

8) Public verify (rate-limited)
```bash
curl -X POST http://localhost:3001/api/verify \
  -H 'Content-Type: application/json' \
  -d '{"batch_code":"DEMO1234"}'
```

9) Expired batches report (admin-only)
```bash
ADMINTOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"admin123"}' | jq -r .token)

curl -H "Authorization: Bearer $ADMINTOKEN" http://localhost:3001/api/reports/expired
```

## Notes
- Rate limit for verify endpoint is configurable via `VERIFY_RATE_LIMIT_PER_MIN`.
- JWT tokens are short-lived; adjust `JWT_EXPIRES_IN` as needed.
- All batch transfers use DB transactions to ensure consistency.
