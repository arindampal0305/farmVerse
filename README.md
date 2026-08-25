# FarmVerse - Intelligent farm operations platform with smart Argo precision system

---
## Problem Statement

Traditional agriculture relies heavily on manual labor, intuition, and outdated practices, leading to reduced crop yields, inefficient resource utilization, and significant economic losses for farmers. Farmers lack real-time access to actionable insights regarding soil health, weather patterns, crop management, and market trends. This gap in agricultural technology creates barriers to optimizing farm operations and achieving sustainable productivity.

FarmVerse addresses this challenge by providing a comprehensive digital platform that empowers farmers with data-driven decision-making tools, precision farming guidance, and resource management capabilities.

---

## Application Overview

FarmVerse is a full-stack web application designed to modernize agriculture through technology. It provides farmers with real-time farm management, crop monitoring, soil analysis, and decision support systems. Administrators can oversee platform activities, manage user accounts, and monitor system health.

The platform bridges the gap between traditional farming practices and modern agriculture technology, enabling farmers to make informed decisions based on data insights rather than experience alone.

A key highlight of FarmVerse is **Krishi AI** : an intelligent, agriculture-focused chatbot powered by Google Gemini that provides farmers with instant, context-aware answers to their farming queries.

---
## Team Details

**Team A - Infosys Springboard Virtual Internship 7.0 (Java Fullstack Developer Track)**

**Mentor: Mr. Vinay Prashant**
- Ananya C.Y (Frontend | UI/UX Design)
- Arindam Pal (Backend | UI/UX Design)
- Arfa (Database/Schema)
- Bhagyesh (Backend)
- Kousar Bee (AI Implementation)

___

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.5
- Spring Security with JWT (jjwt 0.13.0)
- Spring Data JPA with Hibernate
- Maven
- PostgreSQL (via Supabase)
- Google Gemini API (AI Integration)

### Frontend
- React.js
- HTML/CSS

### Database
- PostgreSQL (Supabase)
- Session Pooler for connection management

---
## Features

### For Farmers
- Dashboard with farm overview and statistics
- Crop management and monitoring
- Soil health tracking and analysis
- Weather-based farming recommendations
- Farm resource management
- Historical data and analytics
- Profile management
- **Krishi AI** : AI-powered chatbot for instant farming guidance

### For Administrators
- Dashboard with platform statistics
- User (farmer) account management
    - Add/Edit/Delete farmer accounts
    - View all registered farmers
- System monitoring and management
- Data analytics and reporting

### Core Features
- Secure JWT-based authentication
- Role-based access control (Farmer, Admin roles)
- Real-time data updates
- Input validation on all requests
- Standardized API response format
- Exception handling with meaningful error messages
- RESTful API architecture
- AI-powered conversational assistant (Krishi AI)

## Krishi AI: Intelligent Farming Assistant

**Krishi AI** is FarmVerse's built-in AI chatbot powered by the **Google Gemini API**. It is designed specifically to assist farmers by answering agricultural queries in real time, bridging the knowledge gap between traditional farming practices and modern agronomy.

### What Krishi AI Can Help With
- Crop selection and seasonal planting guidance
- Soil health and fertilizer recommendations
- Pest and disease identification and management
- Weather-based farming advice
- Irrigation and water management tips
- Harvest timing and post-harvest practices
- General agronomy and best practices

### How It Works
Farmers can interact with Krishi AI through a chat interface within the FarmVerse platform. Queries are sent to the backend, which constructs a prompt and forwards it to the Google Gemini API. The AI response is returned and displayed to the farmer in a conversational format, scoped strictly to agriculture-related topics.

### API Endpoint
```
POST /farmverse/chat/sendMessage
```
**Request Body:**
```json
{
  "message": "What fertilizers can I use in my farm?"
}
```
**Response:**
```json
{
  "response": "Based on your registered wheat crop and loamy soil, you can use vermicompost or well-decomposed farmyard manure.",
  "timestamp": "2026-08-08T03:45:21.123456",
  "success": true,
  "error": null
}
```
---
### Configuration
The Gemini API key must be set as an environment variable:
```
GEMINI_API_KEY=your_gemini_api_key
```

And referenced in `application.properties`:
```properties
gemini.api.key=${GEMINI_API_KEY}
```

> **Note:** Never commit the API key directly into source code or `application.properties`. Always use environment variable placeholders.


---

## Project Structure

```
farmVerse/
├── backend/
│   ├── src/main/java/com/farmverse/backend/
│   │   ├── config/
│   │   ├── controller/
│   │   │   └── AIChatController.java
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── enums/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── service/
│   │   │   └── AIChatService.java
│   │   ├── exception/
│   │   └── Application.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/
│   ├── pom.xml
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md
```

---

## Database Schema

### Core Tables

#### User
- id (UUID, Primary Key)
- username (String, Unique)
- fullName (String)
- email (String, Unique)
- password (String, Hashed with BCrypt)
- role (Enum: FARMER, ADMIN)
- createdAt (Timestamp)
- updatedAt (Timestamp)

#### Farm
- id (UUID, Primary Key)
- farmerId (UUID, Foreign Key to User)
- farmName (String)
- location (String)
- areaInAcres (Double)
- soilType (String)
- createdAt (Timestamp)
- updatedAt (Timestamp)

#### Crop
- id (UUID, Primary Key)
- farmId (UUID, Foreign Key to Farm)
- cropName (String)
- plantedDate (Date)
- expectedHarvestDate (Date)
- quantity (Double)
- createdAt (Timestamp)
- updatedAt (Timestamp)

#### Additional Tables
- SoilAnalysis
- WeatherData
- FarmActivity
- AdminAuditLog

---
## Backend Setup

### Prerequisites
- Java 17 or higher
- Maven 3.8.0 or higher
- PostgreSQL database (or Supabase account)
- Google Gemini API key
- Git

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/Infosys-SpringBoard-Batch-1/farmVerse_team_a.git
cd farmVerse_team_a/backend
```

2. Configure environment variables
   Create a `.env` file in the backend root directory or configure system environment variables:
```
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000
GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file in the backend root directory or configure system environment variables:
```
VITE_OPENWEATHER_API_KEY=your_key_here
VITE_GROQ_API_KEY=your_key_here
```

3. Update application.properties
```properties
spring.datasource.url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
gemini.api.key=${GEMINI_API_KEY}
```

4. Build the project
```bash
mvn clean install
```

5. Run migrations (if using Flyway)
```bash
mvn flyway:migrate
```

6. Start the application
```bash
mvn spring-boot:run
```

The backend will start on http://localhost:8080

---
## Frontend Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Installation Steps

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure API endpoints
   Create a `.env` file in the frontend root:
```
REACT_APP_API_URL=http://localhost:8080/farmverse
```

4. Start development server
```bash
npm start
```

The frontend will be available at http://localhost:3000

5. Build for production
```bash
npm run build
```

---

## API Endpoints

### Authentication
- `POST /farmverse/auth/register`: Register new user
- `POST /farmverse/auth/login`: User login
- `POST /farmverse/auth/refresh`: Refresh JWT token

### Farmer
- `GET /farmverse/farmer/dashboard`: Get farmer dashboard data

### Admin
- `GET /farmverse/admin/dashboard`: Get admin dashboard
- `GET /farmverse/admin/viewFarmers`: Get all farmers
- `POST /farmverse/admin/addFarmer`: Add new farmer
- `PUT /farmverse/admin/editFarmer/{username}`: Edit farmer details
- `DELETE /farmverse/admin/deleteFarmer/{username}`: Delete farmer account

### AI (Krishi AI)
- `POST /farmverse/chat/sendMessage` : Send a farming query to Krishi AI and receive an AI-generated response

## Response Format

All API responses follow a standardized format:

### Success Response
```json
{
  "status": "ok",
  "statusCode": "200",
  "message": "Operation successful",
  "id": "id of object"
}
```

### Error Response
```json
{
  "status": "error",
  "statusCode": "400",
  "message": "Error description",
  "id": null
}
```

---
## Validation

The application implements comprehensive input validation:
- Required field validation (`@NotBlank`)
- Email format validation (`@Email`)
- Password strength validation (`@Size`)
- Custom validation rules where applicable

All validation errors return HTTP 400 with detailed error messages.

---
## Authentication & Security

- JWT token-based authentication
- BCrypt password hashing
- Role-based access control (RBAC)
- Secure password constraints (minimum 8 characters)
- HTTPS recommended for production deployment
- SQL injection prevention through parameterized queries
- CORS configuration for frontend integration
- Sensitive credentials (DB password, JWT secret, Gemini API key) managed via environment variables, never hardcoded

## Error Handling

The application uses a global exception handler to provide consistent error responses:

- `IllegalArgumentException`: Returns 400 Bad Request
- `EntityNotFoundException` : Returns 404 Not Found
- `DuplicateResourceException` : Returns 409 Conflict
- Generic exceptions : Returns 500 Internal Server Error
---
## Development Workflow

1. Create feature branch from mainbackup
```bash
git checkout mainbackup
git pull origin mainbackup
git checkout -b feature/your-feature-name
```

2. Commit changes with descriptive messages
```bash
git commit -m "feat: add farmer dashboard endpoint"
```

3. Push to remote and create pull request
```bash
git push origin feature/your-feature-name
```

4. Code review and merge into mainbackup
5. Merge mainbackup into main for production deployment

---
## Deployment

### Backend Deployment
- Platform: TBD
- Deployment URL: TBD

### Frontend Deployment
- Platform: TBD
- Deployment URL: TBD

## Known Issues & Limitations

- Currently the application focuses on basic CRUD operations for the present entities.
- Krishi AI responses are scoped to agriculture-related topics; off-topic queries are gracefully handled.

## Contributing

1. Follow the established code structure and naming conventions
2. Write clear commit messages
3. Include validation and error handling
4. Test your changes locally before pushing
5. Create pull requests with detailed descriptions
6. Ensure code review approval before merging to mainbackup
7. Never commit API keys, passwords, or secrets, use environment variable placeholders

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support & Contact

For issues, questions, or contributions, contact the development team through the project's GitHub issues or reach out to the team members directly.

## Acknowledgments

This project is developed as part of the Infosys Springboard Virtual Internship 7.0, Java Developer Track. Special thanks to mentor Mr. Vinay Prashant and all team members who contributed to this initiative.

## Version History

- **v2.0.0 (Current)**: Krishi AI integration
    - AI-powered farming chatbot (Krishi AI) via Google Gemini API
    - POST `/farmverse/chat/SendMessage` endpoint
    - Agriculture-scoped conversational query handling

- **v1.0.0**: Initial release with core features
    - JWT authentication
    - Farmer and Admin modules
    - Farm and Crop management
    - Dashboard functionality

---

Last Updated: 08-08-2026 \
Maintained By: Team A - Infosys Springboard
