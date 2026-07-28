# Church Disability Specialist Resources

Monorepo for a community hub that inspires, trains, and equips ward and stake Disability Specialists.

> **Independent site:** Not officially provided, approved, or endorsed by Intellectual Reserve, Inc. or The Church of Jesus Christ of Latter-day Saints.

## Architecture

| Piece | Location | Host |
|-------|----------|------|
| React + TypeScript frontend | `apps/web` | Vercel |
| PocketBase (SQLite + admin) | `apps/pocketbase` | Fly.io (recommended) |
| Shared types | `packages/shared` | — |
| Planning docs | `ai/roadmaps` | — |

## Prerequisites

- Node.js 20+ (22 recommended)
- npm 10+
- PocketBase binary for local backend (see `apps/pocketbase/README.md`)

## Quick start (frontend mock)

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

All MVP routes are available with seed resource data (no PocketBase required yet):

- `/` Home  
- `/getting-started`  
- `/disabilities`  
- `/resources` (+ detail pages)  
- `/about` `/faq` `/contact`  

## PocketBase (local SQLite)

PocketBase uses SQLite automatically (`apps/pocketbase/pb_data/data.db`).

```bash
npm run dev:pb
```

- Admin UI: http://127.0.0.1:8090/_/
- Default local admin: `dev@localhost.local` / `LocalDevPass123!` (change after first login)
- Frontend env: `apps/web/.env` → `VITE_POCKETBASE_URL=http://127.0.0.1:8090`

See [apps/pocketbase/README.md](apps/pocketbase/README.md) for migrations and Fly deploy.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server for `apps/web` |
| `npm run dev:pb` | Start local PocketBase (SQLite) on :8090 |
| `npm run build` | Production build for `apps/web` |
| `npm run preview` | Preview the production build |

## Vercel

- Set **Root Directory** to `apps/web`
- Enable **Include source files outside of the Root Directory in the Build Step** (needed for `packages/shared` and the root lockfile)
- Framework preset: Vite
- Install/build commands and SPA rewrites are in `apps/web/vercel.json` (they run from the monorepo root so workspaces resolve)

## Roadmap

See [ai/roadmaps/church-disability-specialist-resources-roadmap.md](ai/roadmaps/church-disability-specialist-resources-roadmap.md).
