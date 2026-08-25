# MahaPrisons Admin Portal (`admin`)

The **MahaPrisons Admin Portal** is the administration and content management dashboard for the **Maharashtra Prisons & Correctional Services Department** (Government of Maharashtra). 

This portal provides a secure, role-based management environment for prison superintendents, departmental officers, and system administrators to manage public announcements, correctional industry products, visitor logistics, departmental metrics, and portal content.

---

## 📌 Objectives & Scope

- **Content Management System (CMS)**: Create, update, publish, and archive official announcements, notices, recruitment drives, tenders, and press releases for the public website (`web`).
- **Correctional Industry & Product Management**: Catalog and manage inmate-crafted products (handlooms, carpentry, leatherwork, bakery, agricultural products), inventory levels, pricing, and public showcase data.
- **Facility & Administration Management**: Oversee prison administrative details across categories (Judicial, Hospital, Canteen, Internal Security, Agriculture, and Social Services).
- **Security & Role-Based Access Control (RBAC)**: Manage user permissions for Super Administrators, Prison Wardens, Department Editors, and Compliance Auditors.
- **Integration & E-Services Monitoring**: Track external e-Prisons service requests, e-Mulakat (visitor interviews), and legal aid applications.
- **GIGW 3.0 & Compliance Auditing**: Ensure content adherence to Guidelines for Indian Government Websites (GIGW 3.0) and maintain audit trails of all administrative actions.

---

## 🏗 System Architecture & Tech Stack

### Recommended Stack
- **Framework**: React 19 / Next.js (App Router) or Vite + TypeScript
- **Styling**: Tailwind CSS v4
- **Icons & Motion**: Lucide React, Framer Motion
- **State Management & Data Fetching**: TanStack Query (React Query) / Redux Toolkit
- **Form Handling & Validation**: React Hook Form + Zod
- **UI Components**: Radix UI / Headless UI / Custom Accessible Components

---

## 📁 Directory Structure Blueprint

```text
admin/
├── public/                 # Static assets (logos, icons, government emblems)
├── src/
│   ├── assets/             # Branding assets, styles, fonts
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Buttons, Modals, Tables, Form fields
│   │   ├── layout/         # Admin Sidebar, Header, Breadcrumbs
│   │   ├── cms/            # Announcement Editor, Media Uploader
│   │   └── products/       # Product Form, Stock Manager
│   ├── context/            # AuthContext, NotificationContext
│   ├── hooks/              # Custom React hooks (useAuth, useFetch)
│   ├── pages/              # Page routes
│   │   ├── Dashboard.jsx   # Overview statistics & quick actions
│   │   ├── Announcements/  # Notice & Tender management
│   │   ├── Products/       # Inmate Product catalog & stock
│   │   ├── Facilities/     # Prison section administration
│   │   ├── Users/          # Admin user management & RBAC
│   │   └── AuditLogs/      # System logs & GIGW compliance reports
│   ├── services/           # Backend API integration layer (Axios/Fetch)
│   ├── utils/              # Helper functions, formatting, validators
│   ├── App.jsx             # Main Router & Provider wrapper
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles & Tailwind imports
├── .env.example            # Environment variables template
├── package.json            # Node.js dependencies and scripts
├── vite.config.js          # Vite build configuration
└── README.md               # Admin Portal documentation
```

---

## 🔑 Key Features & Modules

### 1. Dashboard Overview
- Real-time statistics: Total public announcements, active tenders, inmate product catalog status, pending visitor requests.
- System health alerts and GIGW 3.0 compliance status.

### 2. Notice & Announcement CMS
- Rich Text Editor for drafting bilingual announcements (Marathi & English).
- Metadata management: Document publication date, validity date, download size, format (PDF/DOCX), and archival tags.
- Direct synchronization with the public `web` application.

### 3. Prison Industry & Product Catalog
- Inventory tracking for Jail Industries (Yerawada, Nagpur, Nashik, etc.).
- Category management: Furniture, Handlooms, Agriculture/Nursery, Bakery, Leather products.
- High-resolution image uploads with mandatory accessible ALT text.

### 4. Role-Based Access Control (RBAC)
- User roles: `SUPER_ADMIN`, `PRISON_SUPERINTENDENT`, `CONTENT_EDITOR`, `AUDITOR`.
- Granular permissions per module (Read, Write, Approve, Publish).

### 5. Audit Logging & Security
- Comprehensive logging of IP address, timestamp, user ID, and action taken for all updates.
- Session timeout enforcement (auto-logout after inactivity) as per government IT security standards.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Setup

1. **Navigate to the `admin` directory**:
   ```bash
   cd admin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and configure the backend API endpoint:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_APP_NAME="MahaPrisons Admin Portal"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🛡 Security & Compliance

- **GIGW 3.0 Standards**: High contrast mode, keyboard navigable controls, explicit labels, dynamic font sizing.
- **Data Protection**: Sanitized inputs to prevent XSS, CSRF token validation, secure HTTP-only cookies.
- **Authentication**: JWT token storage in secure cookies with auto-refresh mechanism.

---

## 🤝 Contributing & Maintenance

Maintained by the **Maharashtra Prisons & Correctional Services Department IT Team** / Authorized Technical Partners.
For technical issues or feature requests, consult the internal project repository documentation.
