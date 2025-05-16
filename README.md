# Secure-Notes – Full-Stack Microservice Platform

A production-ready, end-to-end **password & notes manager** built as a teaching example for the ITRI 615 micro-services project.
The stack is intentionally opinionated so that every rubric line item is visible in code, from containerisation and gateway routing to field-level encryption and metrics.

---

## 1  Key Features

| Layer             | Control                                               | What we implemented                     
| ----------------- | ----------------------------------------------------- | --------------------------------------- 
| **Auth**          | JWT access tokens (1 h) with `role` + `id` claims     | `src/routes/auth.js`                    
|                   | Password hashing (bcrypt ×12 rounds)                  | `User.js`                               
| **Authorisation** | RBAC middleware (`admin`, `user`)                     | `middleware/rbac.js`                    
| **Input safety**  | `express-validator` + `.escape()` sanitisation        | `middleware/validate.js`                
| **Data-at-rest**  | Field-level AES-256 on `Note.title` & `Note.body`     | `Note.js` (`mongoose-field-encryption`) 
| **Transport**     | HTTPS off-loaded to reverse-proxy (cloud deploy)      | gateway is TLS-agnostic                 
| **Rate-limit**    | 100 req / 15 min / IP                                 | `middleware/rateLimit.js`               
| **Logging**       | Winston JSON logs + Prometheus histograms             | `logger.js`, `server.js`                
| **Monitoring**    | `/metrics` + Prometheus container                     | `prometheus.yml`                        
| **Build**         | Multi-stage Dockerfiles, one-shot `docker compose up` | `docker-compose.yml`                    
| **Front-end**     | React + Vite + Tailwind served via Nginx              | `frontend/`                             

---

## 2  High-Level Architecture

```text
┌────────────────┐      JWT       ┌────────────────┐
│  React/Vite    │ ───────────▶   │ Express Gateway│   /api/* goes to backend
│ (localhost:5173│               │  (localhost:8085│
└────────────────┘               └────────────────┘
                                         │
                                         ▼
                                     ┌────────┐   SCRAM-SHA-256
                                     │ API    │ ──► MongoDB
                                     │ (5000) │
                                     └────────┘
                                         ▲
                                         │ /metrics
                                         ▼
                                   Prometheus (9090)
```

---

## 3  Repository Layout

```
/
├─ docker-compose.yml           # spin up all five services
├─ prometheus.yml               # scrape secure-notes:5000/metrics
├─ .env                         # secrets & URLs for local dev
│
├─ src/                         # microservice source
│  ├─ models/   User.js, Note.js
│  ├─ routes/   auth.js, notes.js
│  ├─ middleware/ auth.js, rbac.js, rateLimit.js, validate.js
│  ├─ validators/ authRules.js, noteRules.js
│  ├─ logger.js
│  └─ server.js
│
├─ secure-notes-gw/             # Express-Gateway
│  ├─ Dockerfile
│  └─ config/
│       gateway.config.yml
│       system.config.yml
│
└─ frontend/                    # React + Tailwind
   ├─ Dockerfile
   ├─ vite.config.ts
   ├─ src/
   └─ …
```

---

## 4  Quick-start (Docker)

```bash
# clone and cd into repo
docker compose up -d --build        # first run: builds images
docker compose logs -f gateway      # wait for "gateway http server listening"
open http://localhost:5173          # front-end (Nginx)
open http://localhost:8085/api/docs # optional Swagger if enabled
open http://localhost:9090          # Prometheus UI
```

> **Tip:** if port 5173 is busy, change the host-side port in `docker-compose.yml` (`"5174:80"`).

---

## 5  Local Development (without Docker)

```bash
# Backend
cd src
cp ../.env .env                     # same vars work
npm install
npm run dev                         # nodemon on :5000

# Front-end
cd ../frontend
npm install
VITE_API_URL=http://localhost:8085/api npm run dev  # Vite HMR on :5173

# Gateway
cd ../secure-notes-gw
npm install
node server.js                      # :8085
```

MongoDB must be running locally on `mongodb://localhost:27017/secure-notes`
(or tweak `MONGODB_URI`).

---


## 6  API Cheat-Sheet

| Method | URL                  | Body / Params            | Auth                  | Purpose                         |
| ------ | -------------------- | ------------------------ | --------------------- | ------------------------------- |
| POST   | `/api/auth/register` | `{ username, password }` | –                     | Create user                     |
| POST   | `/api/auth/login`    | `{ username, password }` | –                     | Returns `{ token }`             |
| GET    | `/api/notes`         | –                        | Bearer                | List my notes                   |
| POST   | `/api/notes`         | `{ title, body }`        | Bearer                | Create (title & body encrypted) |
| PUT    | `/api/notes/:id`     | `{ title?, body? }`      | Bearer                | Update                          |
| DELETE | `/api/notes/:id`     | –                        | Bearer (`admin` only) | Delete                          |

All requests must include:
`Authorization: Bearer <jwt>` (except login/register).

---

## 7  Security Controls – Implementation Pointers

| Control               | Where implemented                     | Notes                                 |
| --------------------- | ------------------------------------- | ------------------------------------- |
| **Password hashing**  | `User.js` → `bcrypt.hash(12)`         | Argon2id available as TODO if desired |
| **Field encryption**  | `Note.js` plugin, secret in `.env`    | AES-256-CBC                           |
| **Rate-limiting**     | `middleware/rateLimit.js`             | 100 req / 15 min                      |
| **Input validation**  | `validators/*`, used via `validate()` | `.escape()` guards XSS                |
| **RBAC**              | `middleware/rbac.js`                  | route-level guard                     |
| **JWT**               | HS256, 1 h TTL                        | add refresh-token flow as future work |
| **Logging**           | `logger.js` + Prometheus histogram    | request/response & error logs         |
| **Secret management** | Only via env                          | *Add Husky + gitleaks if required*    |

---

## 8  Monitoring

1. **API metrics** – `/api/metrics` (inside Docker `secure-notes:5000/metrics`)
2. **Prometheus** – service `prometheus`, UI on `:9090`
3. **Grafana (optional)** – drop a Grafana service and import the official NodeJS dashboard JSON.

---

## 9  Testing

```bash
# unit tests (Jest)
npm test

# lint
npm run lint
```

*Add integration tests under `src/tests/` – supertest + jest are already configured.*

---

## 10  Roadmap / TODO

* [ ] Implement Husky + gitleaks pre-commit hook
* [ ] Evaluate Argon2id migration for password hashes
* [ ] Add circuit-breaker policy at gateway (if required by rubric)
* [ ] Optional: enable WiredTiger at-rest encryption (`--enableEncryption`)

---

## 11  Contributing

1. Fork the repo, create a feature branch.
2. Ensure `npm test` passes and `npm run lint` shows no errors.
3. Submit a PR explaining **why** the change improves security or maintainability.

---

## 12  Licence

MIT – see `LICENCE` file.

---

## 13  Acknowledgements

* MongoDB ransom research by @Chickowski (2017)
* Evernote breach analysis by Brian Krebs (2013)
* `mongoose-field-encryption` by @alexkotz
* Tailwind CSS, Vite, Express-Gateway, Prometheus

---

