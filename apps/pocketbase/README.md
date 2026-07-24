# PocketBase (local SQLite + Fly.io)

PocketBase ships with **SQLite**. You don’t configure a separate database server for local development—running PocketBase creates and uses `pb_data/data.db` automatically.

## Local development (Windows)

### 1. Binary

`pocketbase.exe` should already be in this folder (gitignored). If missing, download the Windows amd64 zip from [PocketBase releases](https://github.com/pocketbase/pocketbase/releases) and unzip here.

### 2. Start the backend

From the repo root:

```bash
npm run dev:pb
```

Or from this directory:

```bash
serve.bat
```

That will:

- Ensure a local admin exists: `dev@localhost.local` / `LocalDevPass123!`
- Apply committed migrations under `pb_migrations/` (creates `users`, `resources`, `faqs`, `pages`)
- Serve API + Admin UI on **http://127.0.0.1:8090**

| | |
|--|--|
| Admin UI | http://127.0.0.1:8090/_/ |
| REST API | http://127.0.0.1:8090/api/ |
| SQLite file | `apps/pocketbase/pb_data/data.db` |

> Change the local admin password in the dashboard after first login. Do not reuse this password in production.

### 3. Point the React app at it

`apps/web/.env` (gitignored) should contain:

```env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

Copy from `.env.example` if needed. Restart Vite after changing env vars.

In a second terminal:

```bash
npm run dev
```

### 4. Add content

1. Open http://127.0.0.1:8090/_/
2. Sign in with the local admin
3. Open **Collections → resources → New record**
4. Set **status** to `published` so the public API can list it

Public list/view rules only allow `status = "published"`. Authenticated users with `isAdmin = true` can list drafts and create/update/delete resources (for the site admin UI). PocketBase `_superusers` still have full dashboard access.

## Schema (migrations)

Collections are defined in `pb_migrations/` and are safe to commit. On `serve` / `migrate up`, PocketBase applies any new files.

### `users` (auth)

Extends PocketBase’s default `users` auth collection (separate from `_superusers`).

| Field | Type | Notes |
|-------|------|--------|
| email | email | system auth field |
| name | text | already present on default users |
| avatar | file | already present on default users |
| isAdmin | bool | `true` for site admins who manage resources |

API rules:

- Users can view/update themselves; they cannot change `isAdmin` via the API
- Admins (`isAdmin = true`) can list/view all users and manage records (including granting admin)
- Account creation is superuser-only for now (create via Admin UI)

To create a site admin: open **Collections → users → New record**, check **isAdmin**, then sign in from the web app with that email/password.

### `resources`

| Field | Type | Notes |
|-------|------|--------|
| title | text | required |
| summary | text | required |
| body | editor | optional |
| type | select | how-to, idea, presentation, printable, external-link, video |
| settings | select (multi) | church, home, community |
| topics | select (multi) | autism, chronic-illness, hearing, … |
| audiences | select (multi) | ward-specialist, stake-specialist, leaders, families, caregivers |
| file | file | optional upload (≤ 50MB) |
| externalUrl | url | optional |
| contributorCredit | text | optional |
| status | select | draft, published |

### `faqs` / `pages`

See migration `1730000000_init_collections.js`.

## What is gitignored

- `pocketbase.exe` / `pocketbase`
- `pb_data/` (your local SQLite + uploads)

Commit migrations and Docker/Fly config; never commit `pb_data`.

## Production (Fly.io)

From this directory (after `fly auth login`):

```bash
fly apps create cds-pocketbase
fly volumes create pb_data --region slc --size 1
# enable mounts in fly.toml, then:
fly deploy
```

Point Vercel `VITE_POCKETBASE_URL` at the Fly HTTPS URL and allow that origin in PocketBase settings (CORS / app URL).
