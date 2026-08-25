# MahaPrisons Backend API Service (`backend`)

The **MahaPrisons Backend API Service** is the server-side API application and database management service for the **Maharashtra Prisons & Correctional Services Department** (Government of Maharashtra).

This service acts as the central backend engine, providing secure RESTful/GraphQL endpoints, data persistence, authentication, authorization, external government portal integrations, and file management for both:
1. **Public Web Portal (`web`)**: Public announcements, prison products catalog, visitor information, photo/video gallery, and GIGW 3.0 compliance data.
2. **Admin Portal (`admin`)**: Content management system, role-based access control, prison inventory management, and audit logging.

---

## 📌 Core Responsibilities & Features

- **Public API Gateway**: Serves high-performance cached endpoints for public notices, news tickers, tenders, recruitment, product showcases, and holiday calendars.
- **Admin Management API**: Handles authenticated CRUD operations for department staff, notice publishing, product catalog management, and administrative metrics.
- **Authentication & Authorization**: Implements secure JWT / OAuth2 authentication, multi-factor authentication (MFA) for government administrators, and fine-grained Role-Based Access Control (RBAC).
- **Data Persistence & Database Management**: Manages relational data schemas (Announcements, Products, Facilities, Users, Audit Logs, Visitor Request Metadata).
- **Government Integrations**:
  - **National e-Prisons Portal**: Inter-service integration for inmate status lookups and e-Mulakat (visitor interview booking).
  - **Payment Gateway Integration**: Processing public purchases of inmate-crafted products (galicha, handlooms, woodwork).
  - **SMS / Email Notification Services**: Citizen notification alerts for service updates and staff notifications.
- **File Storage & Asset Management**: Secure document upload, verification, PDF metadata tagging (file size, language, upload date), and media asset management.
- **Security & Compliance**: GIGW 3.0 standards support, CERT-In security guidelines, rate limiting, SQL injection protection, CORS configuration, and complete audit trail logging.

---

## 🏗 Recommended Architecture & Tech Stack

### Technology Options
- **Runtime / Framework**: Node.js (Express.js / NestJS) or Python (FastAPI / Django)
- **Database**: PostgreSQL / MySQL (Relational DB)
- **ORM / Query Builder**: Prisma / TypeORM / Sequelize
- **Cache & Session Store**: Redis (for API response caching, rate limiting, session store)
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only cookies & bcrypt password hashing
- **Documentation**: Swagger / OpenAPI 3.0
- **Containerization**: Docker & Docker Compose

---

## 📁 Directory Structure Blueprint

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
│   ├── models/             # Database ORM models/schemas (Prisma/TypeORM)
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
│   ├── utils/              # Helper utilities, logger (Winston/Pino), validators
│   ├── app.js              # Express app setup & middleware attachment
│   └── server.js           # Server initialization & database connection
├── database/
│   ├── migrations/         # Database migration scripts
│   └── seeds/              # Initial seed data (default roles, sample notices)
├── docs/                   # OpenAPI / Swagger specification files
├── .env.example            # Environment variables template
├── Dockerfile              # Docker container configuration
├── docker-compose.yml      # Local development multi-container orchestration
├── package.json            # Node.js dependencies and scripts
└── README.md               # Backend API service documentation
```

---

## 📡 Key API Routes Specification

### 1. Public Routes (`/api/v1/public`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/announcements` | Retrieve official notices, tenders, and recruitments (filtered by language/category) |
| `GET` | `/products` | List correctional industry products (galicha, handloom, bakery) |
| `GET` | `/products/:id` | Detailed product information and availability |
| `GET` | `/facilities` | Information on prison sections (Judicial, Canteen, Hospital, etc.) |
| `GET` | `/calendar` | Departmental holiday and event calendar |

### 2. Authentication Routes (`/api/v1/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/login` | Staff login with credentials & optional MFA |
| `POST` | `/logout` | Invalidate current JWT session |
| `POST` | `/refresh-token` | Obtain new access token using refresh token |

### 3. Admin Routes (`/api/v1/admin` - Protected)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/announcements` | Create a new notice/tender with PDF metadata |
| `PUT` | `/announcements/:id` | Update notice content or validity date |
| `DELETE` | `/announcements/:id` | Soft-delete / archive an announcement |
| `POST` | `/products` | Add a new inmate product to catalog |
| `GET` | `/audit-logs` | Retrieve system action logs for compliance auditing |
| `GET` | `/users` | Manage admin portal user roles & permissions |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0+)
- PostgreSQL / MySQL (or Docker Desktop)
- Redis (optional, for caching & rate limiting)

### Quick Start (Local Setup)

1. **Navigate to the `backend` directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
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

4. **Run Database Migrations & Seeders**:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Docker Setup
To launch the backend along with PostgreSQL and Redis:
```bash
docker-compose up -d --build
```

---

## 🛡 Security & Compliance Standards

- **GIGW 3.0 & CERT-In Compliance**:
  - All file downloads (PDFs) include full metadata (file size, language, creation date).
  - Inputs sanitized using parameterization and schema validators (Zod/Joi) to eliminate SQL injection and XSS vulnerabilities.
  - Strict CORS whitelist allowing requests only from verified `web` and `admin` domain origins.
- **Audit Logging**: Every mutating action (`POST`, `PUT`, `DELETE`) writes an entry to `audit_logs` containing User ID, IP, User-Agent, Resource ID, and timestamp.
- **Transport Security**: TLS 1.3 / HTTPS enforcement for production deployment.

---

## 🤝 Contributing & Maintenance

Maintained by the **Maharashtra Prisons & Correctional Services Department IT Team** / Authorized Technical Partners.
For bug reports or API enhancements, refer to internal development guidelines.
