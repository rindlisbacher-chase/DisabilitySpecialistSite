# PocketBase

Local SQLite backend + admin UI for Church Disability Specialist Resources.

## Quick start (Windows)

1. Download the latest Windows amd64 release from
   [PocketBase releases](https://github.com/pocketbase/pocketbase/releases).
2. Unzip `pocketbase.exe` into this folder (`apps/pocketbase/`).
3. From this directory, run:

```bash
./pocketbase serve
```

4. Open the admin UI: http://127.0.0.1:8090/_/
5. Create the first admin user when prompted.

`pb_data/` is created automatically and is gitignored.

## Suggested collections (create in Admin UI)

### `resources`

| Field | Type | Notes |
|-------|------|--------|
| title | text | required |
| summary | text | required |
| body | editor / text | optional |
| type | select | how-to, idea, presentation, printable, external-link, video |
| settings | select (multiple) | church, home, community |
| topics | select (multiple) | autism, chronic-illness, hearing, … |
| audiences | select (multiple) | ward-specialist, stake-specialist, leaders, families, caregivers |
| file | file | optional upload |
| externalUrl | url | optional |
| contributorCredit | text | optional |
| status | select | draft, published |

**API rules (MVP):** public can list/view when `status = "published"`; only admins create/update/delete.

### `faqs`

| Field | Type |
|-------|------|
| question | text |
| answer | editor / text |
| sortOrder | number |

### `pages` (optional editorial blobs)

| Field | Type |
|-------|------|
| slug | text (unique) |
| title | text |
| body | editor |

## Production (Fly.io)

From this directory (after `fly auth login`):

```bash
fly apps create cds-pocketbase
fly volumes create pb_data --region slc --size 1
# enable mounts in fly.toml, then:
fly deploy
```

Point the Vercel frontend env `VITE_POCKETBASE_URL` at the Fly HTTPS URL and allow that origin in PocketBase settings → application → URL / CORS.
