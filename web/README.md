# MahaPrisons Public Web Application (`web`)

| Attribute | Details |
| :--- | :--- |
| **System** | Public Citizen & Departmental Web Portal |
| **Department** | Maharashtra Prisons & Correctional Services Department |
| **Framework** | React 19 + Vite SPA Architecture |
| **Styling** | Tailwind CSS v4 |
| **Accessibility** | GIGW 3.0 & WCAG 2.1 AA Compliant |

---

> [!NOTE]
> **Application Overview**
> The **MahaPrisons Public Web Portal** delivers bilingual (Marathi & English) public information, official notices, recruitment drives, tenders, jail industry showcase catalogs, e-services access, and departmental insights to citizens.

---

## Technology Stack & Core Tools

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + Vite | Fast HMR, ultra-light build bundle size |
| **Styling Engine** | Tailwind CSS v4 | Flexible utility styling with custom design tokens |
| **State & Data** | TanStack Query (React Query) | Asynchronous state management & caching from dynamic API |
| **Icons & Motion** | Lucide React + Framer Motion | Accessible icons and smooth micro-animations |
| **Routing** | React Router v7 | Dynamic client-side SPA routing (`PageRenderer`) |

---

## Directory Structure Blueprint

```text
web/
├── public/                 # Static assets, logos, PDF document downloads
├── src/
│   ├── assets/             # Brand logos, hero graphics, media assets
│   ├── components/         # Modular UI components
│   │   ├── common/         # Buttons, Modals, Accessibility Toolbar
│   │   ├── layout/         # Header, MegaMenu, Footer, Breadcrumbs
│   │   └── homepage/       # HeroCarousel, NewsTicker, AnnouncementsTabs, Gallery
│   ├── context/            # Accessibility & Language context providers
│   ├── data/               # Legacy data modules (transitioning to backend API seed)
│   ├── hooks/              # Custom React hooks (useAccessibility, useQuery hooks)
│   ├── pages/              # Route views and layout templates (TemplateA - TemplateD)
│   ├── services/           # Backend API connector service layer
│   ├── App.jsx             # Main Router dispatcher configuration
│   ├── main.jsx            # React root application bootstrap
│   └── index.css           # Global typography, colors, and Tailwind imports
├── package.json            # Node.js dependencies and build scripts
├── vite.config.js          # Vite bundler configuration
└── README.md               # Web Portal documentation
```

---

## Key Features & User Capabilities

- **Bilingual Interface**: Instant real-time language switching between Marathi and English across all site pages and navigation menus.
- **Accessibility Toolbar**: Text resizing (A-, A, A+), High Contrast dark mode toggle, screen reader landmarks, and keyboard focus states.
- **Dynamic Content Renderer**: Template-driven page dispatcher rendering structured content blocks fetched from the backend CMS.
- **Notices & Tenders Hub**: Category-filtered announcements featuring downloadable document metadata (file format, size, upload date).
- **Inmate Products Showcase**: Visual catalog of products crafted in prison industries (woodwork, textiles, leather, bakery).
- **E-Services Portal Links**: Quick access to national e-Prisons portals, visitor interview bookings (e-Mulakat), and legal assistance resources.

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn package manager

### Local Setup & Development Commands

1. Navigate to the `web` directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_APP_NAME="MahaPrisons Public Portal"
   ```

4. Launch Development Server:
   ```bash
   npm run dev
   ```

5. Build Production Distribution:
   ```bash
   npm run build
   ```

---

## Security & Accessibility Compliance

> [!IMPORTANT]
> **Government Guidelines Compliance**
> - **GIGW 3.0 Accessibility**: Standardized contrast ratios, visible focus indicators, explicit ARIA labels, semantic HTML5 structure.
> - **CORS Lockdown**: Strictly restricted to authorized backend domain endpoints.
> - **Data Sanitization**: All content blocks rendered safely preventing cross-site scripting (XSS).
