# Product Requirements Document (PRD): MahaPrisons CMS Platform

## 1. Product Vision & Target Goal
The objective is to transform the existing MahaPrisons public web platform into a 100% dynamic, CMS-driven architecture. Every piece of content—including pages, navigation menus, site chrome (headers/footers/news tickers), media assets, and bilingual (Marathi/English) strings—must be fully editable via an Admin Portal. This will eliminate the need for manual code modifications and redeployments for content updates, ensuring operational efficiency and strict compliance with GIGW 3.0 accessibility standards.

## 2. Target Audience
- **Public Users (Citizens/Stakeholders):** Visitors seeking information on prison facilities, policies, tenders, announcements, and inmate products. They require a fast, accessible, and SEO-optimized bilingual experience.
- **Internal Users (Department Staff):** 
  - **Makers (Content Creators):** Staff responsible for drafting content, managing media, and proposing navigation changes.
  - **Checkers (Approvers):** Senior staff responsible for reviewing, approving, and publishing critical content changes to ensure accuracy and compliance.

## 3. Scope & Key Features

### 3.1. Complete Content Editability
- **Page Management:** Database-backed pages with dynamic URLs (slugs), titles, and ordered content blocks.
- **Navigation Tree:** Fully manageable hierarchy for top bar, mega-menus, and footers, including bilingual labels and external/internal links.
- **Site Chrome & Global Settings:** Editable headers, logos, marquees, accessibility toolbars, and official contact information.
- **Bilingual Dictionary:** Global registry for UI strings and system messages (Marathi/English) allowing direct updates.
- **Structured Collections:** Dedicated modules for Announcements/Tenders (with PDFs), Inmate Products, Facility Rosters, and Photo Galleries.
- **Media Asset Management:** Centralized media library replacing hardcoded assets, enforcing mandatory bilingual alt-text.

### 3.2. Template-Driven Content Modeling
- **Fixed Templates:** To preserve strict design and GIGW 3.0 compliance, pages use predefined templates (e.g., Template A-D, Homepage).
- **Typed Content Blocks:** Content is assembled using restricted blocks (e.g., hero, rich text, stat grid, gallery). Admins can add, reorder, and remove blocks within template constraints (whitelists and slot rules).
- **Data-Only Editing:** Admins only provide content data via structured forms with strict validation (e.g., character limits). Markup and styling remain locked in the developer-owned codebase.

### 3.3. Maker-Checker Governance & RBAC
- **Scoped Access:** Users are assigned permissions based on menu item subtrees (`can_write`, `can_approve`).
- **Gated Workflow (Maker-Checker):** High-impact changes (Page publications, Navigation structure, Site Settings, Tenders) require dual authorization. A Maker submits a draft, and a Checker must approve it before it goes live.
- **Direct-Write Workflow:** Low-risk operational changes (Cosmetic relabeling, Translations, Galleries, Product Inventory) apply immediately with automated audit logging.

## 4. System Architecture
- **Frontend (Public Web - `web/`):** Migrating from Vite/CSR to **Next.js 15 (App Router)**. Utilizes Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) to ensure SEO crawlability and GIGW compliance without sacrificing performance.
- **Admin Dashboard (`admin/`):** A **Vite + React + TS (CSR)** application serving as the UI for the CMS. Features form builders, review queues, and navigation managers.
- **Backend API (`backend/`):** **Express.js** service providing:
  - Unauthenticated, Redis-cached Public Read APIs.
  - Authenticated, RBAC-protected Admin APIs.
- **Data Persistence:** **PostgreSQL** database managed via **Prisma ORM**. Stores pages, blocks, settings, audit logs, and user permissions.
- **Revalidation Webhook:** Admin backend triggers Next.js `/api/revalidate` upon content approval, instantly regenerating affected public pages without cache TTL delays.

## 5. Implementation Roadmap
- **Phase 0 (Infrastructure):** Setup backend, admin, Next.js web apps, and Docker (Postgres/Redis).
- **Phase 1 (Database & Seeding):** Define Prisma schemas and execute scripts to migrate existing static data into the DB.
- **Phase 2 (Public API):** Build fast, Redis-cached read endpoints for the frontend.
- **Phase 3 (Frontend Integration):** Rebuild the public `web` app on Next.js, integrating dynamic routing and ISR.
- **Phase 4 (Auth & Governance):** Implement JWT auth, RBAC middlewares, maker-checker workflows, and the revalidation webhook.
- **Phase 5 (Admin Portal):** Develop the Vite-based Admin UI, including the block editor and review queue.
- **Phase 6 (Security & Audit):** Enforce input sanitization, CSRF protection, rate limiting, and validate GIGW 3.0 compliance (accessibility, forms, metadata).

## 6. Non-Functional Requirements
- **Accessibility & Compliance:** Strict adherence to GIGW 3.0 and WCAG 2.1 AA. Requires semantic HTML, proper contrast, keyboard navigability, and dynamic language attributes.
- **Performance:** Sub-second page loads achieved through Next.js ISR and backend Redis caching.
- **Security:** JWT-based stateless authentication, strict CORS, HTML sanitization against XSS, and comprehensive audit trails for all administrative actions.
- **Resilience:** Primary pages (Home, About Us) are protected against accidental deletion or URL modification.
