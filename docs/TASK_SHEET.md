# MahaPrisons CMS Task Sheet

## Step 1: Next.js Frontend Foundation Migration
- [x] Rename existing `web/` directory to `web-legacy/`.
- [x] Initialize a brand new Next.js 15 project in `web/` using `npx create-next-app@latest`. Configure it to use App Router and TypeScript.
- [x] Port over all existing `assets`, Tailwind CSS v4 configurations, and global CSS.
- [x] Port the static data store (`mockData.js`, `translations.js`).
- [x] Port universal layout components (`MegaMenu.jsx`, `Footer.jsx`) and context hooks (`useAccessibility.jsx`).
- [x] Recreate the client-side React Router routing logic using Next.js App Router dynamic routes (`app/[...slug]/page.tsx`).
- [x] Port over the 22 semantic templates (`HeroStatsGrid.jsx`, `ContactInfoGrid.jsx`, etc.).
- [x] **Verification:** Run `npm run dev`. Verify the site renders identically to the Vite version.

## Step 2: Backend & Unified Database Skeleton
- [x] Provision local PostgreSQL and Redis containers using `docker-compose.yml`. (Mapped to port 5435 to avoid conflict)
- [x] Initialize an Express.js backend in `backend/` with Prisma ORM.
- [x] Define the Prisma schema focused on the Unified Architecture (`PageNode`, `ContentBlock`).
- [x] Run `npx prisma db push` to generate the database schema in the Docker container.
- [x] **Verification:** Start the Express server. Hit `GET /api/health`. Connect to PostgreSQL and verify the schema.

## Step 3: Dynamic Navigation & Universal Settings
- [ ] **Backend API:** Create REST endpoint `GET /api/v1/menu`.
- [ ] **Backend API:** Create `GET /api/v1/settings` to fetch global configuration.
- [ ] **Database Seed:** Write a Node.js seed script to parse the static `mockData.js` object. Download external physical image files.
- [ ] **Next.js Integration:** Update `MegaMenu.jsx` and `Footer.jsx` to execute a server-side `fetch()` against the backend API.
- [ ] **Verification:** Start the Next.js app and Express backend to confirm Mega Menu loads dynamically.

## Step 4: Admin Portal Base & Editing Universals
- [ ] **Admin Scaffold:** Run `npm create vite@latest admin -- --template react-ts`. Configure Tailwind CSS, React Router, React Hook Form.
- [ ] **Authentication:** Build a secure login screen with JWT token storage.
- [ ] **Hook Development:** `usePhoneticInput` and `useTranslation`.
- [ ] **Menu Editor:** Build an interactive drag-and-drop tree view.
- [ ] **Settings Form:** Build the bilingual Site Settings editor.
- [ ] **Backend Integration:** Build secure `POST`/`PUT` endpoints for the menu and settings with RBAC middleware.
- [ ] **Verification:** Log into the Admin panel, edit phonetically, translate, save, and see live updates.

## Step 5: Live Preview Page Editor (Iterative Feature Rollout)
### Iteration 1: The Homepage
- [ ] **Database:** Expand `ContentBlock` schema. Seed the Homepage content.
- [ ] **Admin Split-Pane UI:** Left Pane (iframe), Right Pane (Zod forms). Establish `postMessage` communication.
- [ ] **Next.js Integration:** Update `app/page.tsx` to fetch `ContentBlock` records.
- [ ] **Verification:** Edit Homepage Hero section in Admin UI and see iframe preview update.

### Iteration 2: Structured Data (Gallery & Officers)
- [ ] **Database:** Create `Media`, `Gallery`, and `Officer` tables.
- [ ] **Admin UI:** Build Media Uploader and Officer managers.
- [ ] **Next.js Integration:** Update Photo Gallery and Administration pages.
- [ ] **Verification:** Upload photo in Admin portal and verify on live gallery.

### Iteration 3+: Content Pages
- [ ] Systematically loop through all remaining static pages, seed data, verify rendering, ensure fully editable.
