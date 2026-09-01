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

- [ ] Write `backend/prisma/schema.prisma` — all tables from architecture doc §3: `Template`, `Page`, `ContentBlock`, `PageVersion`, `MenuItem`, `Translation`, `Media`, `SiteSettings`, `Announcement`, `Product`, `Facility`, `GalleryAlbum`, `GalleryImage`, `Officer`, `User`, `UserMenuPermission`, `AuditLog`.
- [ ] `npx prisma migrate dev --name init` — generates first migration.
- [ ] Seed `Template` rows for `TemplateA`–`TemplateD` + `Homepage`, each with `allowed_block_types` whitelist derived from what that template's JSX currently renders (read each `Template{A-D}.jsx` to enumerate its actual sections).
- [ ] Write `backend/database/seeds/seedFromLegacyData.js`:
  - [ ] Parse `web/src/data/translations.js` → bulk insert `Translation`.
  - [ ] Parse `web/src/data/mockData.js` `navigation_menu` → recursive insert `MenuItem` tree (preserve order, href, icon).
  - [ ] Parse `administrativeData.js` → one `Page` + `ContentBlock`(s) per `dataId`, `template_key` = which `Template{A-D}` currently used (check each page component's import), link `Page.menu_item_id` to the matching seeded `MenuItem`.
  - [ ] Parse `agricultureData.js`, `facilitiesData.js`, `socialActivitiesData.js` → same pattern.
  - [ ] Parse `galleryData.js` → `GalleryAlbum`/`GalleryImage`.
  - [ ] Copy images referenced from `web/src/assets` + `web/public` into `backend`'s media storage dir, insert `Media` rows, capture URL mapping.
  - [ ] Hand-author homepage `Page(slug="/")` blocks (hero, about, announcements, calendar, services, gallery) — homepage isn't template-driven, needs manual mapping from `mockData.js` + `extracted_homepage_data.json`.
  - [ ] Set every seeded `Page.status = published` (legacy content is trusted as-is; maker-checker applies only to future edits).
  - [ ] Create 1 `User` row (SUPER_ADMIN) for initial admin login.
- [ ] Run seed, spot-check row counts match source file entry counts.

**Done when:** `npm run db:seed` completes with no errors; every route currently in `App.jsx` has a matching `Page.slug` row; every `navigation_menu` entry has a matching `MenuItem` row; every seeded `Page.template_key` has a `Template` row whose `allowed_block_types` covers every `block_type` actually used on that page.

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

## Phase 4 — Auth + Scoped RBAC + Maker-Checker API

- [ ] `POST /api/v1/auth/login`, `/logout`, `/refresh-token` — JWT, bcrypt password check, httpOnly cookie.
- [ ] `authMiddleware` — verify JWT, attach `req.user`.
- [ ] `rbacMiddleware(allowedRoles)` — coarse role check (`SUPER_ADMIN`, `CONTENT_EDITOR`, `AUDITOR`).
- [ ] `scopeMiddleware(action)` — fine-grained check: given `req.user` + target `menu_item_id` (or a page/menu row's own `menu_item_id`), look up `UserMenuPermission` (walking up `parent_id` so a grant on a parent covers descendants), require `can_write` for maker actions, `can_approve` for checker actions. `SUPER_ADMIN` bypasses.
- [ ] `auditLogger` middleware — on every mutating admin request, write `AuditLog` row (user, action, resource, before/after diff).
- [ ] Template routes: `GET /templates` (list, for template picker), `GET /templates/:key` (returns `allowed_block_types` + block schemas, for admin form generation).
- [ ] CRUD routes under `/api/v1/admin/*`, all gated by `scopeMiddleware`:
  - [ ] `pages` — list/get/create/update (maker, requires `can_write`); create validates `menu_item_id` ownership and, if set, auto-links `MenuItem.page_id`.
  - [ ] `content-blocks` — create/update/delete/reorder within a page; **create/update reject if `block_type` not in the page's `Template.allowed_block_types`**, and reject if `data` fails the block's Zod schema (maxLength etc.).
  - [ ] `pages/:id/submit-for-review` (maker) — snapshots current blocks into a new `PageVersion(decision=pending)`, sets `Page.status = in_review`.
  - [ ] `pages/:id/approve` (checker, `can_approve`) — sets `PageVersion.decision = approved`, `Page.status = published`, `published_at = now`.
  - [ ] `pages/:id/reject` (checker, `can_approve`, requires `comments`) — sets `PageVersion.decision = rejected`, `Page.status = draft`.
  - [ ] `review-queue` — `GET /admin/review-queue` list of Pages/MenuItems with `status = in_review` within caller's checker scope.
  - [ ] `menu` — CRUD (maker within scope) + `PUT /menu/reorder` (batch parent/order update) — same submit/approve/reject flow as pages, or simpler direct-write for `SUPER_ADMIN`-scoped top-level restructuring (confirm with department per architecture doc's open question).
  - [ ] `translations` — CRUD (mostly update, keys rarely added).
  - [ ] `media` — `POST /media/upload` (multipart, store file, create `Media` row).
  - [ ] `settings` — `GET`/`PUT` singleton, `SUPER_ADMIN` + `can_approve` only.
  - [ ] `announcements`, `products`, `facilities`, `gallery`, `officers` — full CRUD each, same maker-checker + scope pattern as pages.
  - [ ] `users` — CRUD (SUPER_ADMIN only).
  - [ ] `user-permissions` — `GET`/`PUT /users/:id/menu-permissions` (SUPER_ADMIN only) — assign/revoke `UserMenuPermission` rows (menu subtree + can_write/can_approve flags).
  - [ ] `audit-logs` — read-only list, filterable.
- [ ] Rate limiting on `/auth/login` (brute-force protection).
- [ ] Input sanitization on all rich-text/HTML fields (strip/escape to prevent stored XSS).

**Done when:** a maker-scoped user can create a page, add a whitelisted block, submit for review; a checker-scoped user (different account) sees it in the review queue, approves it, and it appears on the live `web` site within cache TTL; the maker cannot self-approve (403); a block type outside the template's whitelist is rejected (400); a field exceeding its `maxLength` is rejected (400); every action produces an `AuditLog` row.

---

## Phase 5 — Admin Portal UI

- [ ] Auth: login page, JWT stored httpOnly cookie, route guard, auto-logout on token expiry.
- [ ] Layout: sidebar nav (items filtered by caller's `UserMenuPermission` scope — a maker-only user doesn't see Site Settings/Users), header, breadcrumbs (per `admin/README.md` structure).
- [ ] **Dashboard** — counts (pages, announcements), **My Drafts** (maker's own in-progress items), **Awaiting My Approval** (checker's queue count), recent audit log feed.
- [ ] **Menu Builder** — tree view scoped to caller's permitted subtrees, drag-reorder (`@dnd-kit`), icon picker (existing `iconMap` list), mr/en label fields, `PUT /menu/reorder` on drop.
  - [ ] "Add Menu Item" wizard: step 1 label/icon/position → step 2 "Create a page for this?" toggle → if yes, **Template Gallery** (card grid, thumbnail + name per `Template`, fetched from `GET /templates`) → select → creates `Page(status=draft)` linked via `menu_item_id`, opens Page Editor.
- [ ] **Page list** — table, filter by section/status (scoped), search by title/slug.
- [ ] **Page editor**:
  - [ ] Page meta form (title mr/en, slug read-only after create, template — read-only after create, "last reviewed" date).
  - [ ] Component list — only components currently on the page, in `order`.
    - [ ] **Add Component** button → picker shows only `block_type`s in this page's `Template.allowed_block_types` that respect `slot_rules` (e.g. hides "hero" once max-1 already present).
    - [ ] **Move up / move down** (or drag) per component — reorder only, no layout change.
    - [ ] **Remove** per component — confirm dialog, removes from page (recoverable via `PageVersion` history).
    - [ ] **Edit** per component — form auto-generated from the block's Zod schema (shared registry, architecture doc §4): mr/en fields side-by-side, **live character counter** against each field's `maxLength`, hard-stops input at the limit, image fields open Media Library picker.
  - [ ] Preview pane (iframe to `web` dev/staging rendering the current draft state).
  - [ ] Actions: **Save Draft** (any `can_write`), **Submit for Review** (maker) — button hidden entirely if caller lacks `can_write` on this page's scope, forms render read-only instead.
- [ ] **Review Queue** (visible only to `can_approve` users) — list of in-review Pages/MenuItems in caller's scope; opening one shows a **block-by-block diff** (submitted `PageVersion.blocks_snapshot` vs currently-published blocks) plus **Approve** / **Reject** (comments required on reject).
- [ ] **Collections** — generic CRUD table+form per collection (Announcements w/ PDF upload+metadata, Products, Gallery albums/images, Officers, Facilities) — same maker Save/Submit + checker Review Queue pattern as pages.
- [ ] **Media Library** — grid view, upload (drag-drop), alt-text mr/en editor, usage lookup (which pages reference this media), delete-guard if in use.
- [ ] **Translations** — searchable/sortable table, inline mr/en edit, character-limit indicator shown per key where it's used in a fixed-layout slot, add-new-key form.
- [ ] **Site Settings** — single form: logo, topbar links, footer columns, contact info, social links. `SUPER_ADMIN` + `can_approve` only.
- [ ] **Users & Roles** (SUPER_ADMIN only):
  - [ ] User list/create/edit/deactivate, base role assignment.
  - [ ] Per-user **permission grid**: pick one or more menu subtrees, toggle **Maker** (`can_write`) / **Checker** (`can_approve`) per subtree — same user can be Maker on one section, Checker on another.
- [ ] **Audit Logs** — filterable table (user, resource, date range), diff viewer, shows submit/approve/reject events with checker comments.

**Done when:** a maker-only user can log in, sees only their permitted menu sections, adds a menu item, picks a template, creates a page, adds/removes/reorders only whitelisted components, hits a character limit and is blocked from exceeding it, and submits for review — with no Publish button ever visible to them. A separate checker-only user sees it in their Review Queue, sees a diff, approves it, and it goes live on the public site. A `SUPER_ADMIN` can grant/revoke this scoping from Users & Roles without a developer.

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
