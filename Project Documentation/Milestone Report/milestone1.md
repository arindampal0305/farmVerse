# FarmVerse: Precision Agriculture Management Platform
## Milestone 1 Progress Report
**Duration:** 2 weeks | **Status:**  Completed

---

## Executive Summary

Milestone 1 established the foundational infrastructure for FarmVerse, including project governance, cloud database deployment, and backend/frontend scaffolding. The team successfully set up a collaborative development environment, created project documentation, deployed a PostgreSQL instance on Supabase, developed a prototype UI, and implemented the complete authentication flow for the Spring Boot backend.

**Team Velocity:** 6 core objectives completed | **Code Freeze:** Final PR merged to main

---

## Objectives & Deliverables

### 1. GitHub Repository Setup with MIT License
**Owner:** Arindam Pal  
**Status:**  Completed

**Details:**
- Created centralized group GitHub repository for version control and collaboration
- Applied MIT License for open-source contribution framework
- Configured repository with branch protection rules:
  - Main branch: PR-based merges only
  - Development branch (mainbackup): staging environment for code review
- Added .gitignore for Java/Spring Boot projects (excludes Maven target/, IDE configs, sensitive files)
- Established code review workflow: all PRs require approval before merge to main

**Deliverables:**
- Public GitHub repository with MIT License badge
- Branch protection policies enforced
- Initial commit with repository structure and license file

**Impact:** Enables asynchronous collaboration, code traceability, and professional version control practices.

---

### 2. Project Documentation
**Owner:** Ananya  
**Status:**  Completed

**Details:**
- Created comprehensive README.md with project overview, objectives, and tech stack
- Documented project structure and directory layout
- Prepared user stories and feature list aligned with precision agriculture use cases
- Defined API contract specifications (endpoints, request/response models)
- Added setup instructions for local development and deployment

**Key Documentation:**
- **Project Vision:** Precision agriculture platform enabling data-driven farm management
- **Core Features:** Farm registration, crop tracking, yield predictions, resource optimization
- **Tech Stack:** Spring Boot (backend), React (frontend), PostgreSQL (database), JWT (auth)
- **Development Guidelines:** Code standards, naming conventions, PR process

**Deliverables:**
- README.md (project overview)
- CONTRIBUTING.md (development guidelines)
- API_SPECIFICATION.md (endpoint contracts)
- Feature documentation and user stories

**Impact:** Onboards new team members quickly, clarifies project scope, and standardizes development practices.

---

### 3. Cloud Database Instance Setup & Hosting
**Owner:** Arfa  
**Status:**  Completed

**Details:**
- Provisioned PostgreSQL database on Supabase (managed Postgres service)
- Configured connection pooling (Session Pooler mode) for optimal connection management
- Resolved IPv6/DNS connectivity issues during initial setup
- Created initial schema with core tables: `users`, `farms`, `crops`
- Set up environment variables for database credentials (connection string, pooling parameters)
- Configured auto-backup and disaster recovery settings

**Database Configuration:**
- **Provider:** Supabase (PostgreSQL 15.x)
- **Connection Mode:** Session Pooler (resolves connection timeout issues at scale)
- **Region:** Default Supabase region (optimized for India-based development team)
- **Security:** Encrypted credentials, environment-based configuration

**Schema Overview:**
```
users (id, email, password_hash, role, created_at, updated_at)
farms (id, user_id, name, location, area, created_at, updated_at)
crops (id, farm_id, name, planting_date, expected_harvest, status, created_at, updated_at)
```

**Deliverables:**
- Live PostgreSQL instance on Supabase
- Connection pooling configured and tested
- Initial schema deployed
- .env configuration template for team use

**Challenges Faced:**
- **IPv6/DNS Resolution:** Initial connection attempts failed due to regional DNS routing
- **Solution:** Switched to Session Pooler mode, which bypasses direct connection issues and provides connection pooling at the application layer

**Impact:** Enables persistent data storage, eliminates schema setup overhead, and provides managed backup/recovery infrastructure.

---

### 4. Prototype Frontend UI
**Owner:** Ananya  
**Status:**  Completed

**Details:**
- Designed and built component-based prototype UI showcasing all planned application components
- Created responsive mockups for key user flows:
  - User authentication (login/registration)
  - Farm management dashboard (CRUD operations)
  - Crop tracking interface
  - Admin dashboard (user/farm oversight)
- Used React with modern UI libraries for rapid prototyping
- Documented component hierarchy and reusable patterns

**UI Components Built:**
- **Auth Components:** LoginForm, RegisterForm, PasswordReset
- **Farm Components:** FarmList, FarmCard, FarmForm, FarmDetail
- **Crop Components:** CropList, CropForm, CropDetail, PlantingSchedule
- **Admin Components:** UserManagement, FarmApproval, SystemMetrics
- **Shared Components:** Navbar, Sidebar, Modal, DataTable, FormField

**Design Principles:**
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA compliance)
- Dark mode support
- Consistent spacing and typography

**Deliverables:**
- React component library (Storybook-style documentation)
- Figma/design mockups for all key screens
- Component API documentation
- Demo deployment with placeholder data

**Impact:** Provides visual design reference for backend integration, enables parallel development, and validates UX before API completion.

---

### 5. Spring Boot Backend Initialization
**Owners:** Arindam Pal (lead), Bhagyesh (support)  
**Status:**  Completed

**Details:**

**Project Setup (Arindam):**
- Initialized Spring Boot 3.x project using Spring Boot Initializr
- Selected essential dependencies:
  - `spring-boot-starter-web` (REST API framework)
  - `spring-boot-starter-data-jpa` (ORM layer)
  - `spring-boot-starter-security` (authentication/authorization)
  - `postgresql` (database driver)
  - `lombok` (reduce boilerplate)
  - `springdoc-openapi-starter-webmvc-ui` (Swagger/OpenAPI documentation)

**Project Structure:**
```
src/main/java/com/farmverse/
├── config/
│   ├── SecurityConfig.java
│   └── JwtConfig.java
├── controller/
│   ├── AuthController.java
│   ├── FarmController.java
│   └── CropController.java
├── service/
│   ├── AuthService.java
│   ├── FarmService.java
│   └── CropService.java
├── entity/
│   ├── User.java
│   ├── Farm.java
│   └── Crop.java
├── repository/
│   ├── UserRepository.java
│   ├── FarmRepository.java
│   └── CropRepository.java
├── dto/
│   ├── AuthRequest.java
│   ├── AuthResponse.java
│   └── FarmDTO.java
├── security/
│   ├── JwtService.java
│   └── JwtAuthenticationFilter.java
└── exception/
    └── GlobalExceptionHandler.java
```

**Dependencies Configuration (Bhagyesh):**
- Verified Maven POM.xml configuration
- Ensured version compatibility across all dependencies
- Set up build profiles for different environments (dev, staging, prod)
- Configured application.yml for Supabase PostgreSQL connection

**Key Configuration (application.yml):**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://<supabase-host>:<port>/<db-name>
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
```

**Deliverables:**
- Fully configured Spring Boot project
- Maven POM.xml with all dependencies
- application.yml with environment variables
- Maven clean build passing (no errors)
- Initial project structure ready for feature development

**Build Verification:**
```bash
mvn clean install
# Output: BUILD SUCCESS
```

**Impact:** Provides production-ready project structure, eliminates dependency conflicts, and standardizes the development environment.

---

### 6. Backend Authentication Flow Implementation
**Owner:** Arindam Pal  
**Status:**  Completed

**Details:**

**Architecture:**
- Implemented JWT (JSON Web Token) based stateless authentication
- Integrated with Spring Security for request filtering and role-based access control
- Designed for scalability without server-side session storage


**Security Measures Implemented:**
-  Password hashing with BCrypt (11-round salt)
-  JWT signature verification (HS512 algorithm)
-  Token expiration enforcement
-  Email uniqueness validation
-  Environment-based secret management (no hardcoded secrets)

**Testing:**
- Postman collection created with auth flow endpoints
- Manual testing: registration → login → token validation
- Verified token persistence and refresh logic
- Tested unauthorized access rejection (401 Unauthorized)

## Team Contributions

| Team Member | Role | Deliverables |
|-------------|------|--------------|
| **Arindam Pal** | Backend  | GitHub setup, Spring Boot initialization, Auth flow implementation, JWT service |
| **Bhagyesh** | Backend | Dependencies verification, Build configuration |
| **Ananya** | Frontend/Documentation | Project documentation, Prototype UI components |
| **Arfa** | Database | Cloud database setup, Supabase configuration, Schema design |

---

## Testing & Validation

### Backend Testing
-  Spring Boot application boots successfully
-  Database connection verified via test query
-  Auth endpoints respond with correct status codes
-  JWT token generation verified
-  Token validation rejects expired/invalid tokens

### Frontend Testing
-  UI components render without errors
-  Responsive design
-  Component hierarchy matches specification

### Integration Testing
-  Manual end-to-end: registration → login → token retrieval
-  Postman collection verified all auth endpoints
-  Frontend prototype can integrate with auth API (pending actual integration)

---

## Deployment & Access

### Development Environment
- **Backend:** Local Spring Boot (port 8080)
- **Database:** Supabase cloud instance
- **Frontend:** Local React dev server (port 3000)

### Code Access
- **Repository:** GitHub (group access via organization)
- **Branch:** `main` (production-ready), `mainbackup` (staging)

### Database Access
- Credentials stored in `.env` (never committed)
- Connection string: `jdbc:postgresql://<supabase-host>/<db-name>`


--- 
