# Detailed Iterative Implementation Plan for MahaPrisons CMS

**Date:** September 2026
**Target Architecture:** Next.js 15 (Frontend), Express.js + Prisma + PostgreSQL (Backend API), Vite + React + TypeScript (Admin Dashboard)
**Execution Strategy:** Iterative Agile Vertical Slices

---

## 1. Core Architectural Pillars

1. **Unified Menu & Page Hierarchy:** Navigation menus and pages are identical entities. The database uses a unified `PageNode` table with hierarchical attributes (`parent_id`, `order_index`, `is_menu_item`). Building the menu simply involves querying visible nodes in this tree.
2. **Live-Preview Split-Pane Admin:** The Admin Dashboard features an interactive, real-time live preview of the Next.js frontend on the left, and dynamic editing forms on the right. Clicking an element in the preview instantly focuses its respective edit form.
3. **Bilingual Phonetic Input & Bidirectional Translation:** All forms enforce bilingual inputs (Marathi/English). Marathi is the primary input, featuring **phonetic transliteration** (typing "namaskar" yields "नमस्कार"). A manual **Auto-Translate button** situated between the fields allows bidirectional translation across Marathi and English without forced auto-population.

---

## 2. Step-by-Step Implementation Strategy

This roadmap avoids large "floating" work phases. Every single step must be built, integrated, and verified to be working live before proceeding to the next step.

### Step 1: Next.js Frontend Foundation Migration
**Objective:** Port the existing static Vite application to Next.js 15 App Router without connecting to a database yet.

#### Tasks:
- Rename existing `web/` directory to `web-legacy/`.
- Initialize a brand new Next.js 15 project in `web/` using `npx create-next-app@latest`. Configure it to use App Router and TypeScript.
- Port over all existing `assets`, Tailwind CSS v4 configurations, and global CSS.
- Port the static data store (`mockData.js`, `translations.js`).
- Port universal layout components (`MegaMenu.jsx`, `Footer.jsx`) and context hooks (`useAccessibility.jsx`). Ensure these are marked as `"use client"` where interactivity is required, but data fetching remains Server-Side (SSR).
- Recreate the client-side React Router routing logic using Next.js App Router dynamic routes (`app/[...slug]/page.tsx`).
- Port over the 22 semantic templates (`HeroStatsGrid.jsx`, `ContactInfoGrid.jsx`, etc.).
- **Verification:** Run `npm run dev`. Verify the site renders identically to the Vite version, utilizing SSR, with zero console errors.

---

### Step 2: Backend & Unified Database Skeleton
**Objective:** Stand up the backend infrastructure and construct the unified Page/Menu architecture.

#### Tasks:
- Provision local PostgreSQL and Redis containers using `docker-compose.yml`.
- Initialize an Express.js backend in `backend/` with Prisma ORM.
- Define the Prisma schema focused on the Unified Architecture:
  ```prisma
  model PageNode {
    id              String     @id @default(uuid())
    parentId        String?
    parent          PageNode?  @relation("MenuHierarchy", fields: [parentId], references: [id])
    children        PageNode[] @relation("MenuHierarchy")
    slug            String     @unique
    titleMr         String
    titleEn         String
    isMenuItem      Boolean    @default(true)
    orderIndex      Int        @default(0)
    templateKey     String?    // E.g., 'HeroStatsGrid'
    status          String     @default("DRAFT")
    contentBlocks   ContentBlock[]
  }
  ```
- Run `npx prisma migrate dev` to generate the database.
- **Verification:** Start the Express server. Hit `GET /api/health` and confirm a 200 OK response. Connect to PostgreSQL using pgAdmin or Prisma Studio and verify the schema.

---

### Step 3: Dynamic Navigation & Universal Settings
**Objective:** Replace the static `mockData.js` menu and settings with live data fetched from the Express backend.

#### Tasks:
- **Backend API:** Create a REST endpoint `GET /api/v1/menu` that recursively fetches the `PageNode` table where `isMenuItem = true`, structured as a nested JSON tree.
- **Backend API:** Create `GET /api/v1/settings` to fetch global configuration (site logos, accessibility links).
- **Database Seed:** Write a Node.js seed script to parse the static `mockData.js` object.
  - **Important Data Seeding Requirement:** If any image paths in the static data (e.g., hero carousels, galleries, officer profiles) are defined as external HTTP links or remote URLs, the seed script must automatically download the physical image files, save them locally into the backend's media storage, and link the new `Media` database record to the local file path. No external hotlinking should remain after seeding.
- **Next.js Integration:** Update `MegaMenu.jsx` and `Footer.jsx` to execute a server-side `fetch()` against the backend API, replacing imports from `mockData.js`.
- **Verification:** Start the Next.js app and Express backend. The Mega Menu must load properly. Shut down the Express backend—the menu should break or show a loading error. Restart it to confirm connectivity.

---

### Step 4: Admin Portal Base & Editing Universals
**Objective:** Scaffold the Vite Admin dashboard, implement phonetic typing, and build the UI to edit Universal Components (Settings and Menu tree).

#### Tasks:
- **Admin Scaffold:** Run `npm create vite@latest admin -- --template react-ts`. Configure Tailwind CSS, React Router, and React Hook Form.
- **Authentication:** Build a secure login screen with JWT token storage.
- **Hook Development:**
  - `usePhoneticInput`: Integrate a transliteration library (e.g., Google Input Tools API or `pramukhime`) to intercept keystrokes in Marathi textareas and convert English phonetic spelling to Marathi script.
  - `useTranslation`: Build a manual bidirectional translator hook connected to a Translation API.
- **Menu Editor:** Build an interactive drag-and-drop tree view allowing users to rename, move, and hide menu items (`PageNode` rows).
- **Settings Form:** Build the bilingual Site Settings editor featuring the translation button between fields.
- **Backend Integration:** Build secure `POST`/`PUT` endpoints for the menu and settings with RBAC middleware.
- **Verification:** Log into the Admin panel. Use phonetic typing to rename a menu item in Marathi. Click "Translate" to populate the English field. Save. Refresh the Next.js frontend to see the menu instantly updated.

---

### Step 5: Live Preview Page Editor (Iterative Feature Rollout)
**Objective:** Convert static page bodies to dynamic database blocks using the Live Preview editor, one page type at a time.

#### Iteration 1: The Homepage
- **Database:** Expand `ContentBlock` schema to store JSON payloads mapping to specific Semantic Templates. Seed the Homepage content.
- **Admin Split-Pane UI:**
  - Left Pane: Embed the Next.js frontend using an `<iframe>` targeting a draft URL preview route.
  - Right Pane: Render dynamic Zod-validated forms based on the selected block.
  - Integration: Establish `postMessage` communication between the Next.js iframe and the Vite admin to detect when a user clicks a section (like the Hero Carousel) to trigger the opening of its respective form on the right.
- **Next.js Integration:** Update `app/page.tsx` to fetch its `ContentBlock` records and dynamically map them to the 22 Semantic Templates (e.g., `<HeroStatsGrid data={block.data} />`).
- **Verification:** In the Admin UI, click the Homepage Hero section. Edit the title phonetically. Save. The iframe preview updates instantly without a page refresh.

#### Iteration 2: Structured Data (Gallery & Officers)
- **Database:** Create dedicated `Media`, `Gallery`, and `Officer` tables.
- **Admin UI:** Build a robust Media Uploader with drag-and-drop support and mandatory bilingual alt-text. Build grid-based managers for Officer profiles.
- **Next.js Integration:** Update the Photo Gallery and Administration pages to fetch from these new endpoints.
- **Verification:** Upload a new photo in the Admin portal. Verify it appears on the live Next.js gallery page immediately.

#### Iteration 3+: Content Pages (Facilities, Agriculture, Social)
- Systematically loop through all remaining static pages. For each, seed its current static data into `PageNode` and `ContentBlock` records, verify its rendering in Next.js, and ensure it is fully editable within the Live Preview Admin interface.

---

## 3. Technology Stack & Tooling

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Public Frontend** | Next.js 15 (App Router) | SEO crawlability, Server-Side Rendering, GIGW 3.0 accessibility compliance. |
| **Admin Dashboard** | Vite + React + TS | Fast CSR performance, complex state management for split-pane live preview. |
| **Backend API** | Express.js (Node.js) | Lightweight REST architecture, middleware flexibility for RBAC. |
| **Database** | PostgreSQL + Prisma ORM | Relational integrity for hierarchical Page trees and structured content blocks. |
| **Caching** | Redis | Instant sub-millisecond read times for public API endpoints. |
| **Transliteration** | Google Input Tools / PramukhIME | Robust English-to-Marathi phonetic conversion for primary inputs. |
| **Auto-Translation** | Google Cloud Translation API | Accurate bidirectional translations triggered manually by the user. |
| **Styling** | Tailwind CSS v4 | Rapid, consistent UI development shared across Admin and Public platforms. |
