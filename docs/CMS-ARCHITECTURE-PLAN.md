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
Template
  key                 text PK          -- "TemplateA" | "TemplateB" | "TemplateC" | "TemplateD" | "Homepage"
  name                text             -- shown in template picker
  thumbnail_media_id  uuid FK -> Media -- preview shown when admin picks a template
  allowed_block_types text[]           -- whitelist, e.g. ["hero","stat_grid","officer_list"] — admin can only add these
  slot_rules          jsonb            -- optional: {block_type: {min, max}} e.g. hero max 1, required

Page
  id            uuid PK
  slug          text UNIQUE           -- "administrative/administration" (matches current route path)
  menu_item_id  uuid FK -> MenuItem NULLABLE  -- set when page was created from "Add Menu Item -> Create Page"
  template_key  text FK -> Template
  status        enum(draft, in_review, approved, published, rejected, archived)  -- maker-checker states, see §3.4
  title_mr      text
  title_en      text
  meta          jsonb                 -- SEO meta, GIGW required fields (last-reviewed date, owner)
  created_by    uuid FK -> User
  updated_by    uuid FK -> User
  created_at, updated_at, published_at

ContentBlock
  id            uuid PK
  page_id       uuid FK -> Page
  block_type    text                  -- must be in Page.template.allowed_block_types (server-validated)
  order         int                   -- admin can reorder (move up/down/drag) within the page
  data          jsonb                 -- shape validated per block_type (zod schema, includes maxLength per field — see §4)
  created_at, updated_at

PageVersion                            -- maker-checker snapshot/approval trail
  id            uuid PK
  page_id       uuid FK -> Page
  blocks_snapshot jsonb               -- full ContentBlock[] at time of submission
  submitted_by  uuid FK -> User        -- maker
  submitted_at  timestamp
  reviewed_by   uuid FK -> User NULLABLE  -- checker
  reviewed_at   timestamp NULLABLE
  decision      enum(pending, approved, rejected) default pending
  comments      text                  -- checker's rejection reason / notes

MenuItem
  id            uuid PK
  parent_id     uuid FK -> MenuItem (nullable, self-referencing)
  label_mr      text
  label_en      text
  href          text                  -- internal slug (/administrative/administration) or external URL
  page_id       uuid FK -> Page NULLABLE  -- linked page, set via "Create Page" step in menu builder
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

### 3.3 Auth / audit

```
User        -- id, email, password_hash, role(SUPER_ADMIN|CONTENT_EDITOR|AUDITOR), active, created_at
AuditLog    -- id, user_id, action, resource_type, resource_id, ip, user_agent, timestamp, diff(jsonb)
```

Every mutating admin action writes an `AuditLog` row — required per backend README's compliance section and GIGW lifecycle requirements.

### 3.4 Permissions & Maker-Checker Workflow

Two separate concerns, both needed per requirement:

**a) Scoped access ("limited menu")** — a user isn't just "CONTENT_EDITOR" globally, they're scoped to specific menu sections (e.g. only Agriculture, not Administrative):

```
UserMenuPermission
  id            uuid PK
  user_id       uuid FK -> User
  menu_item_id  uuid FK -> MenuItem     -- top-level or any-level node; grants access to it + all descendants
  can_write     boolean                 -- MAKER: create/edit/submit pages+menu items under this scope
  can_approve   boolean                 -- CHECKER: approve/reject/publish under this scope
```

A user with no `UserMenuPermission` row for a subtree cannot see or edit it in the admin UI. `SUPER_ADMIN` bypasses scoping entirely (implicit full access). One user can be maker on one section and checker on another (e.g. Editor for Agriculture, Approver for Facilities) — just two rows with different flags.

**b) Maker-checker page lifecycle** — `Page.status` transitions:

```
draft ──(maker submits)──> in_review ──(checker approves)──> approved ──(publish action)──> published
                                │                                                              │
                                └──(checker rejects, writes comments)──> draft (edit + resubmit)  │
                                                                                                  ▼
                                                                                          (edit again later
                                                                                           → new draft → in_review …,
                                                                                           previous published version
                                                                                           stays live until re-approved)
```

- **Maker** (`can_write`): create page, add/remove/reorder content blocks, edit content within field limits, submit for review. Cannot self-approve or publish.
- **Checker** (`can_approve`): reviews the `PageVersion` diff (blocks_snapshot vs currently-published version), approves (→ publish, or queue publish) or rejects with comments (→ back to draft, maker notified).
- `SUPER_ADMIN` can act as both maker and checker (break-glass), always logged in `AuditLog` either way.

**c) What actually needs gating — not everything.** Maker-checker exists to catch public-facing, consequential mistakes before they go live. Gating every action (including trivial, reversible, or non-public ones) adds friction with no real risk reduction. Split:

| Content / action | Maker-checker gated? | Why |
|---|---|---|
| Page publish (content edits going live) | **Yes** | Public-facing, factual/compliance weight |
| Announcements & Tenders | **Yes** | Legal/financial consequence if wrong or fake |
| Menu **structural** change — add/remove/re-nest item, change `href` | **Yes** | Broken nav or wrong link is site-wide impact |
| Site Settings (contact info, official links) | **Yes** | High-visibility, rarely changed, worth gatekeeping |
| Menu **label-only** edit or reorder within existing structure | No — direct write | Cosmetic, instantly visible if wrong, trivial to revert |
| Translations | No — direct write | Wording polish, high frequency, low individual impact |
| Media Library upload | No — direct write | File isn't live until *referenced* by gated content; exposure is caught at that gate, not at upload |
| Gallery images, Officer photos | No — direct write | Low-consequence, high-frequency updates; gating slows routine dept work for no real gain |
| Products (catalog) | No — direct write | Same reasoning as gallery; revisit if pricing/payment gets attached later |

Rule of thumb: **gate the publish/live action, not every edit.** A maker is always free to draft/save/experiment without review; the gate sits only at the point content becomes public and only where the content type is public-facing + consequential. Every action — gated or not — still writes an `AuditLog` row; direct-write items rely on audit trail + revert instead of pre-publish approval.

`Page.status` and the submit/approve/reject flow above therefore apply to: **Pages, Announcements, menu structural changes, Site Settings.** Everything else in the admin (Translations, Media, Gallery, Officers, Products, menu label/reorder) is a plain scoped CRUD — `can_write` required to change it, no `in_review` step, change is live immediately and logged.

---

## 4. Block Type Registry (frontend)

Define one place mapping `block_type` → React component, shared between `web` (render) and `admin` (edit form + validation schema):

```js
// shared/blockRegistry.js  (published as small internal package, or duplicated + kept in sync initially)
export const blockRegistry = {
  hero: {
    component: HeroBlock,
    schema: z.object({
      title_mr: z.string().max(80),        // matches Tailwind heading line-clamp in design
      title_en: z.string().max(100),
      subtitle_mr: z.string().max(160).optional(),
      subtitle_en: z.string().max(200).optional(),
      image_media_id: z.string().uuid(),
    }),
  },
  richtext:     { component: RichTextBlock,    schema: richtextSchema },   // max length matched to card/section design
  officer_list: { component: OfficerListBlock, schema: officerListSchema }, // each officer: name maxLength, designation maxLength
  stat_grid:    { component: StatGridBlock,    schema: statGridSchema },   // label maxLength, value numeric/short string
  gallery:      { component: GalleryBlock,     schema: gallerySchema },
  table:        { component: TableBlock,       schema: tableSchema },
  cta:          { component: CtaBlock,         schema: ctaSchema },
};
```

Every text field in every block schema carries a `maxLength` (and often `minLength`) chosen to match the actual UI constraint already baked into the design (line-clamp, card height, hero title size) — enforced **both** client-side in the admin form (character counter, hard stop) and server-side (reject on save). This is what keeps "fixed component, fixed style" true even though content is editable: the admin literally cannot type text that would break the layout.

`PageRenderer` (web) walks `page.contentBlocks` sorted by `order`, renders `blockRegistry[block.block_type].component` with `block.data`. Admin's page editor walks the same registry to render the correct edit form + Zod validation per block type — add a new block type once, both sides get it.

**Component whitelist per template:** each `Template` row lists `allowed_block_types` (§3.1). The admin's "Add Component" picker only shows types in that list for the page's chosen template — a `TemplateB` page can't add a block type that only exists for `TemplateD`. Style is 100% owned by the block's React component (fixed CSS/layout); admin only ever touches `data` (text/image fields), never markup or style. Add/remove/reorder operate only on which whitelisted components are present and their `order` — not on their internal layout.

Existing `TemplateA–D` layouts become **either**:
- (a) kept as fixed template shells that accept a page's blocks in a fixed slot order (fastest migration, matches current design exactly), or
- (b) fully generalized into `hero` + `stat_grid` + `richtext` blocks composed freely (more flexible, more migration work).

Recommend **(a) first**, migrate to (b) opportunistically per page later — ships CMS sooner without a redesign. Either way, the whitelist + maxLength rules above apply.

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

`/api/v1/admin/*` — JWT + scoped RBAC protected. Two access patterns (see §3.4c for which content uses which):

**Gated (maker-checker: submit → review → approve/reject)** — Pages, Announcements, menu structural changes, Site Settings:
```
POST /pages/:id/submit-for-review
POST /pages/:id/approve            -- checker only
POST /pages/:id/reject             -- checker only, requires comments
GET  /review-queue                 -- items awaiting caller's approval
```

**Direct write (scoped can_write, live immediately, audit-logged)** — Translations, Media, Gallery, Officers, Products, menu label/reorder:
```
PUT  /translations/:id
POST /media/upload
PUT  /gallery/:id
PUT  /officers/:id
PUT  /products/:id
PUT  /menu/:id                     -- label/order only; structural changes go through the gated path instead
```

Common to both:
```
GET  /audit-logs
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

Per `admin/README.md`'s blueprint, expanded for full editability + maker-checker:

```
Dashboard              -- stats, GIGW compliance status, my pending drafts, items awaiting my approval, recent audit log
Menu Builder           -- tree view (scoped to user's UserMenuPermission)
  ├─ Relabel (mr/en) or drag-reorder within existing structure -- direct write, live immediately, audit-logged only
  └─ "Add Menu Item" / remove item / re-nest / change href -- STRUCTURAL, goes through review:
       1. Enter label (mr/en), icon, position in tree
       2. "Create Page for this item?" toggle
          └─ if yes: "Select Template" gallery (thumbnail + name per Template row) → creates linked Page(status=draft)
       3. Save → menu item (+ page, if created) queued as in_review for checker approval before appearing in live nav
Pages
  ├─ Page list          (filter by section/status; scoped to user's permitted menu subtrees)
  ├─ Page editor
  │    ├─ Page meta form (title mr/en, slug read-only after create, "last reviewed" date)
  │    ├─ Component list — shows only components already on the page, in order
  │    │    ├─ "Add Component" → picker limited to this page's Template.allowed_block_types
  │    │    ├─ Move up / move down (or drag) — reorder only
  │    │    ├─ Remove — with confirm (soft: block removed from page, not hard-deleted, recoverable from PageVersion history)
  │    │    └─ Edit — opens component's form (fields from its Zod schema, mr/en side-by-side, live character counter against maxLength, image picker for media fields)
  │    └─ Actions: Save Draft | Submit for Review (maker) — disabled/hidden if user has no can_write on this scope
  └─ Review Queue (checker only) — list of Pages/MenuItems with status=in_review in the checker's scope
       ├─ Diff view: current published version vs submitted PageVersion, block by block
       └─ Approve (→ publish) | Reject (comments required → back to maker as draft)
Collections
  ├─ Announcements & Tenders (+ PDF upload w/ metadata: size, format, language) -- GATED: maker submits, checker approves
  ├─ Products (Jail Industries catalog)                                       -- direct write, scoped can_write, audit-logged
  ├─ Gallery (albums/images)                                                  -- direct write, scoped can_write, audit-logged
  └─ Officers (used by officer_list blocks + facility pages)                  -- direct write, scoped can_write, audit-logged
Site Settings           -- logo, topbar, footer, contact, social links (singleton form) — GATED, SUPER_ADMIN + can_approve only
Translations            -- searchable key/mr/en table, inline edit, character limit shown where key is used in a fixed-layout string — direct write, audit-logged
Media Library           -- upload, browse, alt-text (mr/en) editor, usage tracker — direct write, not gated (exposure controlled at the gate of whatever content references it)
Users & Roles           -- SUPER_ADMIN only:
  ├─ Create/deactivate user
  ├─ Assign base role (SUPER_ADMIN | CONTENT_EDITOR | AUDITOR)
  └─ Per-user UserMenuPermission grid: pick menu subtree(s), toggle can_write (maker) / can_approve (checker) per subtree
     (a user can be maker on one section and checker on another)
Audit Logs              -- filterable by user/resource/date, includes maker-checker decisions (submit/approve/reject) with comments
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
- Who are the actual admin users, how many, and how do they map to menu subtrees (needed to seed initial `UserMenuPermission` rows)?
- Approval workflow: confirmed maker-checker, scoped to Pages/Announcements/menu-structural-changes/Site Settings only — not applied to Translations/Media/Gallery/Officers/Products/menu-relabel (§3.4c). Confirm this split matches department risk appetite, and whether a single checker can approve their own section's makers or whether cross-section approval (e.g. central PRO office approves everything) is required.
- SSR/prerendering (Phase 7) — priority now vs later, given GIGW crawlability requirement already flagged as a gap?
