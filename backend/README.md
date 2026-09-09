# MahaPrisons Backend API Service (`backend`)

| Attribute | Details |
| :--- | :--- |
| **System** | Core Server-Side API & Database Persistence Service |
| **Department** | Maharashtra Prisons & Correctional Services Department |
| **Stack** | Node.js (Express.js) / PostgreSQL / Prisma ORM / Redis |
| **Security** | JWT HTTP-Only Cookies, Scoped RBAC, Audit Logging |
| **Compliance** | GIGW 3.0 & CERT-In IT Security Guidelines |

---

> [!NOTE]
> **Service Architecture**
> The **MahaPrisons Backend API Service** powers the central server infrastructure. It provides cached, high-performance RESTful APIs to the **Public Web Portal (`web`)** and authenticated, governance-enforced management endpoints to the **Admin Portal (`admin`)**.

---

## Core Responsibilities & Capabilities

- **Public Gateway**: Delivers high-speed cached endpoints for notices, news ticker items, recruitment drives, tenders, jail industry showcase products, and departmental calendars.
- **Admin Management API**: Executes authenticated CRUD operations, page content drafting, versioning snapshots, and maker-checker approval workflows.
- **Authentication & Security**: Implements JWT authentication, httpOnly cookie sessions, multi-factor authentication (MFA) support, and scoped role-based access control (RBAC).
- **Data Persistence**: Manages relational models via Prisma ORM for PostgreSQL (Pages, Content Blocks, Navigation, Users, Audit Logs, Announcements, Products).
- **External Integrations**: Connects with national e-Prisons portals for visitor interviews (e-Mulakat) and legal aid application tracking.
- **Asset Storage & Verification**: Secure PDF and image uploads with metadata processing (file format, size, language, upload date) and alt-text storage.
- **Audit Logging**: Comprehensive activity tracking capturing user ID, IP address, request method, target resource, timestamp, and before/after diff snapshots.

---

## Recommended Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Runtime / Framework** | Node.js (Express.js) | Light, asynchronous event-driven I/O engine |
| **Database** | PostgreSQL | Relational consistency, JSONB payload support, ACID compliance |
| **ORM Layer** | Prisma ORM | Type-safe query builder, auto-migrations, database seeding |
| **Caching Layer** | Redis | In-memory response caching for public endpoints and rate limiting |
| **Authentication** | JWT + bcrypt | Secure token sessions with HTTP-only cookies |
| **Documentation** | Swagger / OpenAPI 3.0 | Standardized API endpoint contract specification |
| **Containerization** | Docker & Docker Compose | Containerized local development and production deployment |

---

## Directory Structure Blueprint

```text
backend/
├── config/                 # Environment configuration, database config, CORS settings
├── src/
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── announcementController.js
│   │   ├── productController.js
│   │   ├── facilityController.js
│   │   └── adminController.js
│   ├── middlewares/        # Custom middlewares
│   │   ├── authMiddleware.js      # JWT & RBAC verification
│   │   ├── errorHandler.js        # Centralized error handling
│   │   ├── rateLimiter.js         # API rate limiting
│   │   └── auditLogger.js         # Log actions to audit table
│   ├── models/             # Database ORM models/schemas (Prisma)
│   │   ├── User.js
│   │   ├── Announcement.js
│   │   ├── Product.js
│   │   ├── Facility.js
│   │   └── AuditLog.js
│   ├── routes/             # API route definitions
│   │   ├── v1/
│   │   │   ├── publicRoutes.js    # Unauthenticated public portal routes
│   │   │   ├── adminRoutes.js     # Authenticated admin routes
│   │   │   └── authRoutes.js      # Login/Logout/Refresh token routes
│   │   └── index.js
│   ├── services/           # Business logic & third-party integrations
│   │   ├── authService.js
│   │   ├── announcementService.js
│   │   ├── ePrisonsIntegration.js # External e-Prisons API connector
│   │   └── storageService.js      # PDF & media file management
│   ├── utils/              # Helper utilities, logger, validators
│   ├── app.js              # Express app setup & middleware attachment
│   └── server.js           # Server initialization & database connection
├── database/
│   ├── migrations/         # Database migration scripts
│   └── seeds/              # Initial seed data
├── docs/                   # OpenAPI / Swagger specification files
├── .env.example            # Environment variables template
├── Dockerfile              # Docker container configuration
├── docker-compose.yml      # Local development multi-container orchestration
├── package.json            # Node.js dependencies and scripts
└── README.md               # Backend API service documentation
```

---

## API Endpoint Specifications

### 1. Public Endpoints (`/api/v1/public`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/pages/:slug` | Retrieve published page data and ordered content blocks |
| `GET` | `/menu` | Retrieve hierarchical navigation tree |
| `GET` | `/translations` | Retrieve global translation key-value map |
| `GET` | `/announcements` | Retrieve official notices, tenders, and recruitment drives |
| `GET` | `/products` | List correctional industry catalog items |
| `GET` | `/facilities` | Information on prison administrative sections |
| `GET` | `/calendar` | Departmental holiday and event calendar |

### 2. Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/login` | Staff login with credentials & optional MFA verification |
| `POST` | `/logout` | Invalidate current JWT session |
| `POST` | `/refresh-token` | Obtain new access token using refresh token |

### 3. Admin Governance Endpoints (`/api/v1/admin` - Protected)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/pages/:id/submit-for-review` | Submit drafted page version for checker review |
| `POST` | `/pages/:id/approve` | Checker approves version snapshot for publication |
| `POST` | `/pages/:id/reject` | Checker rejects version with required review notes |
| `GET` | `/review-queue` | Retrieve pending items awaiting review in user scope |
| `POST` | `/announcements` | Create notice or tender with PDF metadata |
| `GET` | `/audit-logs` | Retrieve system action logs for compliance auditing |
| `GET` | `/users` | Manage admin portal user roles and subtree permissions |

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0+)
- PostgreSQL (or Docker Desktop)
- Redis server

### Quick Start (Local Setup)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=postgresql://user:password@localhost:5432/mahaprisons_db
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=8h
   CORS_ORIGINS=http://localhost:5173,http://localhost:5174
   ```

4. Run Database Migrations & Seeders:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Start Development Server:
   ```bash
   npm run dev
   ```

### Docker Multi-Container Launch
To boot the Backend API, PostgreSQL database, and Redis cache simultaneously:
```bash
docker-compose up -d --build
```

---

## Security & Compliance Guidelines

> [!WARNING]
> **Security Audit Mandate**
> - **Input Validation & Sanitization**: All rich-text inputs are sanitized server-side using HTML sanitization to prevent Stored XSS attacks. Prisma parameterization handles SQL injection protection.
> - **CORS Protection**: Access control headers are locked strictly to authorized `web` and `admin` domains.
> - **Audit Trails**: All mutating calls (`POST`, `PUT`, `DELETE`) write mandatory entries to `AuditLog`.

---

## Maintenance & Support

Maintained by the **Maharashtra Prisons & Correctional Services Department IT Team** / Authorized Technical Partners.
For bug reports or API enhancements, refer to internal development guidelines.
