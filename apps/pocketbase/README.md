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
| name | text | required |
| summary | text | required |
| author | text | optional contributor |
| type | select | printable, presentation, talk, video |
| link | url | file URL (R2/PocketBase) or external link (YouTube, Church site). **Do not upload video files** — paste a video URL instead. |
| file | file | optional PocketBase-hosted upload (≤ 50MB); import script sets `link` from the file URL |
| disabilities | relation (multi) | tags from `disabilities` collection |
| audiences | relation (multi) | tags from `audiences` collection |
| status | select | draft, published |
| created | autodate | set automatically on create |
| updated | autodate | set on create and every update |

### `disabilities`

| Field | Type | Notes |
|-------|------|--------|
| name | text | required |
| description | text | required |
| sortOrder | number | optional display order |

Seeded by migration `1756401600_add_taxonomy_collections.js`.

### `audiences`

| Field | Type | Notes |
|-------|------|--------|
| name | text | required |
| description | text | optional (e.g. age range) |
| sortOrder | number | optional display order |

Prepopulated: Primary, Youth, Young Adult, Young Single Adults, Parents, Leaders.

## Importing resource files

Bulk-import local files from the contributor folders:

```bash
# PocketBase must be running (npm run dev:pb)
npm run import:resources
```

Defaults:

- Source folder: `C:\Users\cjrja\Downloads\Disability Specialist Site Images\resources`
- PocketBase: `http://127.0.0.1:8090` with local superuser credentials from `serve.bat`

Override with env vars:

```bash
set RESOURCES_DIR=D:\path\to\resources
set POCKETBASE_URL=http://127.0.0.1:8090
npm run import:resources
```

The script:

- Imports files from author subfolders (`jolynn_atkinson`, `melissa_mabey`, `pheobe_blackham`, etc.)
- Skips `contribute_form/` (submission form — handled separately on the site)
- Parses `links.md` for official Church URLs (deduped)
- Uploads files to PocketBase storage and sets `link` to the file URL
- Infers `type` from file extension/name; tags disabilities/audiences when keywords match
- Skips records that already exist (matched by `name` + `author`)

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
