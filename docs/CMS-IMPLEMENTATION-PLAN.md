# MahaPrisons CMS — Step-by-Step Implementation Plan

**Companion to:** [`CMS-ARCHITECTURE-PLAN.md`](./CMS-ARCHITECTURE-PLAN.md) (read that first for schema/API/rationale — this doc is the task checklist to execute it).

Each phase ships a working, deployable state. Don't start phase N+1 until phase N's "Done when" criteria pass.

---

## Phase 0 — Setup

- [ ] Create `backend/package.json`, init Node project (Express or NestJS — pick one, README lists both as options).
- [ ] Install: `prisma`, `@prisma/client`, `express`, `zod`, `jsonwebtoken`, `bcrypt`, `cors`, `helmet`, `express-rate-limit`, `ioredis`.
- [ ] Provision Postgres (local Docker for dev) + Redis (local Docker for dev).
- [ ] `backend/.env` from `.env.example` — `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `CORS_ORIGINS`.
- [ ] `docker-compose.yml` for local Postgres+Redis+backend.
- [ ] `admin/package.json`, init Vite+React+TS project, install Tailwind v4, React Router, TanStack Query, React Hook Form, Zod, Radix UI.

**Done when:** `docker-compose up` starts Postgres+Redis, `npm run dev` in `backend/` boots an empty Express server, `npm run dev` in `admin/` serves blank Vite app.

---

## Phase 1 — Schema, Migrations, Seed

- [ ] Write `backend/prisma/schema.prisma` — all tables from architecture doc §3: `Page`, `ContentBlock`, `MenuItem`, `Translation`, `Media`, `SiteSettings`, `Announcement`, `Product`, `Facility`, `GalleryAlbum`, `GalleryImage`, `Officer`, `User`, `AuditLog`.
- [ ] `npx prisma migrate dev --name init` — generates first migration.
- [ ] Write `backend/database/seeds/seedFromLegacyData.js`:
  - [ ] Parse `web/src/data/translations.js` → bulk insert `Translation`.
  - [ ] Parse `web/src/data/mockData.js` `navigation_menu` → recursive insert `MenuItem` tree (preserve order, href, icon).
  - [ ] Parse `administrativeData.js` → one `Page` + `ContentBlock` per `dataId`, `template_key` = which `Template{A-D}` currently used (check each page component's import).
  - [ ] Parse `agricultureData.js`, `facilitiesData.js`, `socialActivitiesData.js` → same pattern.
  - [ ] Parse `galleryData.js` → `GalleryAlbum`/`GalleryImage`.
  - [ ] Copy images referenced from `web/src/assets` + `web/public` into `backend`'s media storage dir, insert `Media` rows, capture URL mapping.
  - [ ] Hand-author homepage `Page(slug="/")` blocks (hero, about, announcements, calendar, services, gallery) — homepage isn't template-driven, needs manual mapping from `mockData.js` + `extracted_homepage_data.json`.
  - [ ] Create 1 `User` row (SUPER_ADMIN) for initial admin login.
- [ ] Run seed, spot-check row counts match source file entry counts.

**Done when:** `npm run db:seed` completes with no errors; every route currently in `App.jsx` has a matching `Page.slug` row; every `navigation_menu` entry has a matching `MenuItem` row.

---

## Phase 2 — Public Read API + Cache

- [ ] `GET /api/v1/public/pages/:slug` — join `Page` + ordered `ContentBlock[]`, 404 if not published.
- [ ] `GET /api/v1/public/menu` — return full `MenuItem` tree (nest by `parent_id` server-side).
- [ ] `GET /api/v1/public/translations` — return `{ [key]: {mr, en} }` map.
- [ ] `GET /api/v1/public/settings` — `SiteSettings` singleton.
- [ ] `GET /api/v1/public/announcements`, `/products`, `/gallery`, `/facilities` — list endpoints, basic filtering (category, language).
- [ ] Redis caching middleware on all public GETs (short TTL, e.g. 60s, so admin edits show up fast without hammering DB).
- [ ] CORS whitelist restricted to `web` dev/prod origins.
- [ ] Zod-validate all query params.

**Done when:** every endpoint above returns real seeded data via `curl`; response matches shapes `web/` components expect (verify against `mockHomepageData` / `administrativeData` shapes).

---

## Phase 3 — Frontend Swap (web/)

- [ ] Add React Query (or SWR) to `web/`.
- [ ] Build `src/lib/api.js` — thin fetch wrapper for public endpoints, base URL from `VITE_API_BASE_URL`.
- [ ] `PageRenderer.jsx` — new component: reads slug from route, fetches `/pages/:slug`, dispatches to `Template{A-D}` (or block registry) based on `template_key`.
- [ ] Collapse `App.jsx`: replace 40+ `<Route>` entries with `<Route path="/*" element={<PageRenderer />} />` (keep `/` separate if homepage stays bespoke for now).
- [ ] `MegaMenu.jsx` — replace `mockHomepageData.navigation_menu` import with `useQuery(['menu'], fetchMenu)`.
- [ ] `useAccessibility.jsx` — replace static `translations` import with translations fetched once at boot, exposed via context; `t()` reads from context state instead of static object.
- [ ] Homepage sections (`HeroCarousel`, `AnnouncementsTabs`, `HolidayCalendar`, `NewsTicker`, `QuickServices`, `MinisterProfiles`, `JailInsights`, `PhotoGallery`) — swap each component's data source from static import to API fetch (`/pages/home`'s blocks, or dedicated collection endpoints for announcements/gallery).
- [ ] `Footer.jsx` — pull footer columns/links from `/settings`.
- [ ] Add loading/error/empty states everywhere a static import is replaced by a fetch.
- [ ] Manual QA: click every nav item, compare rendered page to pre-migration screenshot — content and layout must match.
- [ ] Delete `web/src/data/*.js` (except keep as historical reference in git history) once QA passes.

**Done when:** site is visually identical to current static version but every string/image/menu item now comes from the API; stopping the backend breaks the site (proof nothing static remains).

---

## Phase 4 — Auth + RBAC + Admin CRUD API

- [ ] `POST /api/v1/auth/login`, `/logout`, `/refresh-token` — JWT, bcrypt password check, httpOnly cookie.
- [ ] `authMiddleware` — verify JWT, attach `req.user`.
- [ ] `rbacMiddleware(allowedRoles)` — per-route role check (`SUPER_ADMIN`, `PRISON_SUPERINTENDENT`, `CONTENT_EDITOR`, `AUDITOR`).
- [ ] `auditLogger` middleware — on every mutating admin request, write `AuditLog` row (user, action, resource, before/after diff).
- [ ] CRUD routes under `/api/v1/admin/*`:
  - [ ] `pages` — list/get/create/update/delete, `POST /pages/:id/publish`, `POST /pages/:id/unpublish`.
  - [ ] `content-blocks` — create/update/delete/reorder within a page.
  - [ ] `menu` — CRUD + `PUT /menu/reorder` (batch parent/order update for drag-drop tree).
  - [ ] `translations` — CRUD (mostly update, keys rarely added).
  - [ ] `media` — `POST /media/upload` (multipart, store file, create `Media` row).
  - [ ] `settings` — `GET`/`PUT` singleton.
  - [ ] `announcements`, `products`, `facilities`, `gallery`, `officers` — full CRUD each.
  - [ ] `users` — CRUD (SUPER_ADMIN only).
  - [ ] `audit-logs` — read-only list, filterable.
- [ ] Rate limiting on `/auth/login` (brute-force protection).
- [ ] Input sanitization on all rich-text/HTML fields (strip/escape to prevent stored XSS).

**Done when:** Postman/curl script can log in, create a page, add a block, publish it, and see it appear on the live `web` site within cache TTL; unauthorized role gets 403; every mutation produces an `AuditLog` row.

---

## Phase 5 — Admin Portal UI

- [ ] Auth: login page, JWT stored httpOnly cookie, route guard, auto-logout on token expiry.
- [ ] Layout: sidebar nav, header, breadcrumbs (per `admin/README.md` structure).
- [ ] **Dashboard** — counts (pages, announcements, pending drafts), recent audit log feed.
- [ ] **Menu Builder** — tree view (drag-reorder library, e.g. `@dnd-kit`), add/edit/delete node, icon picker (from existing `iconMap` list), mr/en label fields, `PUT /menu/reorder` on drop.
- [ ] **Page list** — table, filter by section/status, search by title/slug.
- [ ] **Page editor**:
  - [ ] Page meta form (title mr/en, slug, template, status, last-reviewed date).
  - [ ] Block list — add block (type picker from registry), reorder (drag), edit-in-place per block type's form, delete.
  - [ ] Each block form auto-generated from block's Zod schema (shared registry from architecture doc §4) — mr/en side-by-side inputs for every text field.
  - [ ] Preview pane (iframe to `web` dev/staging rendering the draft).
  - [ ] Publish / unpublish / save-draft actions.
- [ ] **Collections** — generic CRUD table+form per collection (Announcements w/ PDF upload+metadata, Products, Gallery albums/images, Officers, Facilities).
- [ ] **Media Library** — grid view, upload (drag-drop), alt-text mr/en editor, usage lookup (which pages reference this media), delete-guard if in use.
- [ ] **Translations** — searchable/sortable table, inline mr/en edit, add-new-key form.
- [ ] **Site Settings** — single form: logo, topbar links, footer columns, contact info, social links.
- [ ] **Users & Roles** — list/create/edit/deactivate, role assignment (SUPER_ADMIN only).
- [ ] **Audit Logs** — filterable table (user, resource, date range), diff viewer.

**Done when:** a non-technical user can log in, edit a page's text, reorder the menu, upload a new gallery image, and see all three reflected on the live site without any developer involvement.

---

## Phase 6 — Compliance & Hardening

- [ ] XSS: sanitize all rich-text fields server-side (e.g. `sanitize-html`) before storing and before rendering.
- [ ] CSRF protection on admin mutating routes (if using cookies).
- [ ] SQL injection: confirmed n/a (Prisma parameterizes) — verify no raw queries.
- [ ] CORS: lock to exact `web`/`admin` production origins.
- [ ] Rate limiting on all `/admin/*` and `/auth/*` routes.
- [ ] Session timeout / auto-logout after inactivity (admin).
- [ ] HTTPS/TLS enforced at hosting layer — document requirement.
- [ ] Re-run `docs/GIGW-COMPLIANCE-AUDIT.md` checklist — update statuses now that CMS backs Content Review / Archival / Last-updated-date items.
- [ ] Load test public API endpoints (basic — confirm Redis cache actually reduces DB hits under repeat requests).
- [ ] Backup strategy documented for Postgres (schedule, retention) and Media storage.

**Done when:** GIGW audit doc's "Lifecycle" and "Security" rows move from Pending → Done/Mitigated; a basic pen-test checklist (XSS, auth bypass, IDOR on admin routes) passes.

---

## Phase 7 (follow-up, post-launch) — SSR / Prerendering

- [ ] Evaluate Vite SSR vs prerender-on-publish (generate static HTML snapshot per page when admin hits Publish, serve snapshot + hydrate).
- [ ] Prerender-on-publish is simpler given CMS already knows exactly when content changes (publish event) — recommended over full SSR infra.
- [ ] Addresses GIGW audit's flagged crawlability gap without giving up "instant edit, no redeploy" (snapshot regenerates automatically on publish, not on a build pipeline).

**Done when:** search engine crawler (test via `curl` with no JS execution) receives full page content, not empty `<div id="root">`.

---

## Sequencing Notes

- Phases 0–3 can ship with **zero admin UI** — content is editable via direct SQL/API calls in the meantime, which unblocks Phase 3's frontend QA before Phase 5's UI is built.
- Phase 4 (auth/CRUD API) and Phase 5 (admin UI) can run in parallel once Phase 4's route contracts are stable — admin UI team builds against a documented API spec (OpenAPI/Swagger, per backend README) while backend finishes remaining CRUD endpoints.
- Do not skip Phase 6 before public launch — it's compliance-required, not optional polish, given this is a government site.
