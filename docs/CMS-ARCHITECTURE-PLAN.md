# MahaPrisons Website — CMS Architecture Plan

**Project:** MahaPrisons React Website (`web`) + Admin Portal (`admin`) + Backend API (`backend`)
**Date:** 1 September 2026
**Goal:** Every piece of content on the public site — every page, every menu item, every piece of site chrome (header/footer/topbar/ticker), every image, every bilingual (mr/en) string — becomes editable from the Admin Portal, with zero code changes or redeploys required for content updates.

---

## 1. Current State (as-is)

`web/` is a pure client-side React 19 + Vite SPA. `admin/` and `backend/` currently contain **only README blueprints — no code**.

All content today lives in static JS/JSON files bundled at build time:

| What | Where | Shape |
|---|---|---|
| Menu (mega menu, all levels) | `web/src/data/mockData.js` → `navigation_menu` | Nested array: `{text, icon, href, title, children[], groups[]}` |
| Site chrome (logo text, topbar links) | `web/src/data/mockData.js` → `mockHomepageData` | Flat object |
| Routes | `web/src/App.jsx` | 40+ hardcoded `<Route>` |
| UI strings (bilingual) | `web/src/data/translations.js` | `{ "मराठी key": {mr, en} }` |
| Administrative dept pages | `web/src/data/administrativeData.js` | `{ [dataId]: {title:{mr,en}, sections:[...]} }` consumed by `pages/administrative/templates/Template{A,B,C,D}.jsx` |
| Agriculture, facilities, social pages | `agricultureData.js`, `facilitiesData.js`, `socialActivitiesData.js` | Same `{mr,en}` pattern |
| Gallery | `galleryData.js` | Media list |
| Homepage sections | `mockData.js` + `extracted_homepage_data.json` | Bespoke, one-off |

**Important finding:** most inner pages already render through 4 shared templates (`TemplateA`–`TemplateD`) keyed by a `dataId`, e.g.:

```jsx
// AdministrationPage.jsx
export const AdministrationPage = () => <TemplateA dataId="administration" />;
```

The template looks up `administrativeData[dataId]`, renders `getTranslation(data.title)` etc. **This is already ~80% of the way to a CMS content shape** — the data object per page is basically a document; it just needs to move from a JS import to a DB record fetched by slug. The homepage and a handful of feature sections (`HeroCarousel`, `NewsTicker`, `HolidayCalendar`, `AnnouncementsTabs`) are more bespoke and need their own block types.

---

## 2. Scope — "everything editable" means

1. **Menu** — every level (top nav, mega-menu groups, children), label (mr/en), icon, href, order, visibility, add/remove items — no redeploy.
2. **Pages** — every route in `App.jsx` today becomes a DB-backed page: title, template choice, ordered content blocks, publish state, slug/URL.
3. **Site chrome** — header logo text, topbar links, footer columns/links, accessibility toolbar labels, news ticker items, sitemap.
4. **Homepage sections** — hero carousel slides, about section, announcements & tenders, holiday calendar, quick services, minister profiles, jail insights stats, photo gallery — each independently editable, reorderable, some may be hide/show toggles.
5. **Media** — every image (portraits, hero images, gallery, product photos) uploadable/replaceable via admin, not committed to the repo.
6. **Translations** — every bilingual string editable as a mr/en pair, including ones outside page content (button labels, toolbar text).
7. **Structured collections** — Announcements/Tenders, Products, Facility officer lists, Gallery albums — full CRUD, not just page text.
8. **Global settings** — site title, contact info, social links, department metadata — single editable "Site Settings" record.

Non-goal for v1: fully arbitrary drag-drop page builder (Wix-style free layout). We use a **fixed template + typed content blocks** approach — matches existing `TemplateA–D` pattern, far less to build than a generic page builder, and keeps design consistent (important for GIGW govt-site compliance already flagged in `docs/GIGW-COMPLIANCE-AUDIT.md`).

---

## 3. Content Model (Database Schema)

Postgres + Prisma, per `backend/README.md`'s stack recommendation.

### 3.1 Core CMS tables

```
Page
  id            uuid PK
  slug          text UNIQUE           -- "administrative/administration" (matches current route path)
  template_key  text                  -- "TemplateA" | "TemplateB" | "TemplateC" | "TemplateD" | "Homepage" | "Custom:<key>"
  status        enum(draft, published, archived)
  title_mr      text
  title_en      text
  meta          jsonb                 -- SEO meta, GIGW required fields (last-reviewed date, owner)
  created_by    uuid FK -> User
  updated_by    uuid FK -> User
  created_at, updated_at, published_at

ContentBlock
  id            uuid PK
  page_id       uuid FK -> Page
  block_type    text                  -- "hero" | "richtext" | "officer_list" | "stat_grid" | "gallery" | "cta" | "table" | ...
  order         int
  data          jsonb                 -- shape validated per block_type (zod schema in backend), always carries {mr, en} on text fields
  created_at, updated_at

MenuItem
  id            uuid PK
  parent_id     uuid FK -> MenuItem (nullable, self-referencing)
  label_mr      text
  label_en      text
  href          text                  -- internal slug (/administrative/administration) or external URL
  icon          text                  -- lucide-react icon name, matches existing iconMap
  order         int
  is_mega_group boolean               -- marks a "groupTitle" node in mega-menu
  visible       boolean default true
  created_at, updated_at

Translation
  id            uuid PK
  key           text UNIQUE           -- the current Marathi string used as key in translations.js
  mr            text
  en            text
  namespace     text                  -- "global" | "toolbar" | "footer" | ...

Media
  id            uuid PK
  filename      text
  url           text                  -- storage path (S3/local per backend README's storageService)
  alt_mr        text
  alt_en        text
  uploaded_by   uuid FK -> User
  created_at

SiteSettings
  id            uuid PK (singleton row)
  logo_h1       text
  logo_spans    jsonb
  topbar_links  jsonb
  footer_columns jsonb
  contact_info  jsonb
  social_links  jsonb
```

### 3.2 Collection tables (structured, not free-form blocks)

```
Announcement   -- id, title_mr/en, category(notice/tender/recruitment), pdf_media_id, publish_date, valid_until, status
Product        -- id, name_mr/en, category, description_mr/en, price, images[], jail_unit, stock_status
Facility       -- id, name_mr/en, category, description_mr/en, officers[] (jsonb or child table), page_id (optional link)
GalleryAlbum / GalleryImage
Officer        -- id, name_mr/en, designation_mr/en, photo_media_id, department, order
```

Reuse the existing `translations.js` key/mr/en shape directly as the `Translation` table — smallest possible migration.

### 3.3 Auth / audit (per backend README, unchanged)

```
User        -- id, email, password_hash, role(SUPER_ADMIN|PRISON_SUPERINTENDENT|CONTENT_EDITOR|AUDITOR)
AuditLog    -- id, user_id, action, resource_type, resource_id, ip, user_agent, timestamp, diff(jsonb)
```

Every mutating admin action writes an `AuditLog` row — required per backend README's compliance section and GIGW lifecycle requirements.

---

## 4. Block Type Registry (frontend)

Define one place mapping `block_type` → React component, shared between `web` (render) and `admin` (edit form + validation schema):

```js
// shared/blockRegistry.js  (published as small internal package, or duplicated + kept in sync initially)
export const blockRegistry = {
  hero:        { component: HeroBlock,       schema: heroSchema },
  richtext:    { component: RichTextBlock,   schema: richtextSchema },
  officer_list:{ component: OfficerListBlock, schema: officerListSchema },
  stat_grid:   { component: StatGridBlock,   schema: statGridSchema },
  gallery:     { component: GalleryBlock,    schema: gallerySchema },
  table:       { component: TableBlock,      schema: tableSchema },
  cta:         { component: CtaBlock,        schema: ctaSchema },
};
```

`PageRenderer` (web) walks `page.contentBlocks` sorted by `order`, renders `blockRegistry[block.block_type].component` with `block.data`. Admin's page editor walks the same registry to render the correct edit form + Zod validation per block type — add a new block type once, both sides get it.

Existing `TemplateA–D` layouts become **either**:
- (a) kept as fixed template shells that accept a page's blocks in a fixed slot order (fastest migration, matches current design exactly), or
- (b) fully generalized into `hero` + `stat_grid` + `richtext` blocks composed freely (more flexible, more migration work).

Recommend **(a) first**, migrate to (b) opportunistically per page later — ships CMS sooner without a redesign.

---

## 5. API Design

`/api/v1/public/*` — unauthenticated, cached (Redis, per backend README):
```
GET  /pages/:slug              -> Page + ContentBlock[]
GET  /menu                     -> full MenuItem tree
GET  /translations             -> { [key]: {mr, en} }   (fetched once, cached client-side)
GET  /settings                 -> SiteSettings singleton
GET  /announcements?category=  -> Announcement[]
GET  /products                 -> Product[]
GET  /gallery                  -> GalleryAlbum[]
```

`/api/v1/admin/*` — JWT + RBAC protected, full CRUD on every table above, plus:
```
POST /pages/:id/publish
POST /media/upload
GET  /audit-logs
PUT  /menu/reorder              -- batch order+parent update for drag-drop tree
```

---

## 6. Frontend (`web/`) Rework

1. **Routing** — collapse the 40+ static routes in `App.jsx` into:
   ```jsx
   <Route path="/*" element={<PageRenderer />} />
   ```
   `PageRenderer` reads `location.pathname`, strips leading slash → slug, fetches `/api/v1/public/pages/:slug`, picks template/blocks. Keep `/` (home) as a distinct route if its layout stays bespoke.

2. **Menu** — [MegaMenu.jsx](../web/src/components/MegaMenu.jsx) replaces `mockHomepageData.navigation_menu` static import with a fetch to `/api/v1/public/menu` on mount (React Query, cached, short TTL so edits propagate without full redeploy).

3. **Translations** — `useAccessibility()`'s `t()` currently reads the static `translations` object; swap to a context populated once from `/api/v1/public/translations` at app boot.

4. **Data files retirement** — `mockData.js`, `translations.js`, `administrativeData.js`, `agricultureData.js`, `facilitiesData.js`, `socialActivitiesData.js`, `galleryData.js`, `extracted_homepage_data.json` all become **seed input only** (see §8), then deleted from the bundle once migration verified.

5. **Rendering mode** — stays CSR (fetch at runtime), *not* build-time static generation. This is the core requirement: admin publishes → content changes on next page load, no rebuild/redeploy needed. Tradeoff: flagged already in `docs/GIGW-COMPLIANCE-AUDIT.md` — CSR-only hurts SEO/crawlability. **Recommend a follow-up phase**: add SSR or prerendering (e.g. Vite SSR, or a lightweight prerender-on-publish step) once the CMS core is stable — out of scope for this plan but note it so it isn't forgotten.

---

## 7. Admin Portal (`admin/`) IA

Per `admin/README.md`'s blueprint, expanded for full editability:

```
Dashboard              -- stats, GIGW compliance status, recent audit log
Menu Builder           -- tree view, drag-reorder, add/remove/hide items, icon picker
Pages
  ├─ Page list          (filter by section: administrative/agriculture/facilities/social/home)
  ├─ Page editor         -- block list, add/reorder/edit block, mr+en side-by-side per field
  └─ Publish/draft toggle, "last reviewed" date (GIGW requirement)
Collections
  ├─ Announcements & Tenders (+ PDF upload w/ metadata: size, format, language)
  ├─ Products (Jail Industries catalog)
  ├─ Gallery (albums/images)
  └─ Officers (used by officer_list blocks + facility pages)
Site Settings           -- logo, topbar, footer, contact, social links (singleton form)
Translations            -- searchable key/mr/en table, inline edit
Media Library           -- upload, browse, alt-text (mr/en) editor, usage tracker
Users & Roles           -- RBAC per backend README's 4 roles
Audit Logs              -- filterable by user/resource/date
```

---

## 8. Migration Strategy

One-off Node script, run once against the new backend:

1. Import every `web/src/data/*.js` module.
2. `translations.js` → bulk-insert into `Translation` table (key/mr/en as-is).
3. `mockData.js.navigation_menu` → recursively insert `MenuItem` tree, preserving order and `href`.
4. `administrativeData.js`, `agricultureData.js`, `facilitiesData.js`, `socialActivitiesData.js` → one `Page` + block(s) per `dataId`, `slug` derived from the matching `App.jsx` route path, `template_key` derived from which `Template{A-D}` the page currently uses.
5. `galleryData.js` → `GalleryAlbum`/`GalleryImage` rows; existing images in `web/public`/`assets` uploaded to media storage, `Media` rows created, URLs rewritten.
6. Homepage bespoke sections → hand-authored `Page(slug="/")` with one block per section (hero, about, announcements, calendar, gallery, services) — needs manual authoring since homepage isn't template-driven today.
7. Verify: diff rendered output (old static site vs new DB-driven site) page by page before deleting the source data files.

---

## 9. Phased Rollout

| Phase | Deliverable | Outcome |
|---|---|---|
| 1 | Backend schema + migrations + seed script from existing `data/*.js` | DB holds all current content |
| 2 | Public read API (`/public/*`) + Redis cache | Backend serves what frontend needs |
| 3 | Frontend swap: `MegaMenu`, `PageRenderer`, translations context → fetch from API | Site is now 100% DB-driven, content edits possible via direct DB/API calls even before admin UI exists |
| 4 | Auth + RBAC + admin CRUD API (`/admin/*`) | Backend fully supports editing |
| 5 | Admin Portal UI: Menu Builder, Page Editor, Collections, Media Library, Site Settings, Translations | Non-technical staff can edit everything |
| 6 | Audit logging + GIGW/CERT-in hardening pass (input sanitization, CORS whitelist, rate limiting, session timeout) | Compliance-ready before go-live |
| 7 (follow-up) | SSR/prerendering for SEO | Addresses CSR crawlability gap noted in GIGW audit |

Each phase ships a working state — site never breaks mid-migration since Phase 3 only swaps data source, not visual output.

---

## 10. Open Questions (need department/stakeholder input)

- Hosting: self-hosted Postgres/Redis vs managed (matches govt hosting policy?).
- File storage for media: local disk, S3-compatible, or NIC-provided storage?
- Who are the actual admin users / how many roles in practice (README lists 4; confirm with department)?
- Approval workflow needed before publish (draft → review → publish) or is direct-publish acceptable for a government site?
- SSR/prerendering (Phase 7) — priority now vs later, given GIGW crawlability requirement already flagged as a gap?
