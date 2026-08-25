# FarmVerse Backend

Backend service for FarmVerse, an Intelligent farm operations platform with smart Argo precision system built as part of the Infosys Springboard Virtual Internship 7.0, Java Developer Track.
BACKEND DEVELOPERS: ARINDAM PAL, BHAGYESH PATIL.

---

### Overview

This backend provides authentication and core CRUD functionality for Farmers, Farms, and Crops, along with an AI-powered farming assistant called Krishi AI. It is built with Spring Boot and connects to a PostgreSQL database hosted on Supabase.

---

### Tech Stack

- Java 17
- Spring Boot 3.5
- Spring Security
- Spring Data JPA (Hibernate)
- PostgreSQL (Supabase)
- JWT (jjwt 0.13.0)
- Maven
- Lombok
- Google Gemini API (AI Integration)

---

### Project Structure

```
backend/src/main/java/com/farmverse/backend
    config       Security and application configuration
    controller   REST controllers exposing API endpoints
    dto          Request and response objects
    entity       JPA entities mapped to database tables
    enums        Enum types such as Role
    exception    Custom exception handling
    repository   Spring Data JPA repositories
    security     JWT authentication filter
    service      Business logic
```

---

### Prerequisites

- Java 17 or later
- Maven (or use the included wrapper, `mvnw`)
- Access to the project's Supabase PostgreSQL instance
- Google Gemini API key

---

### Environment Variables

The application requires the following environment variables to be set before running:

```
DB_HOST
DB_PORT
DB_NAME
DB_USERNAME
DB_PASSWORD
JWT_SECRET
GEMINI_API_KEY
```

Never hardcode these values in `application.properties`. Always use environment variable placeholders.

---

### Running the Application

From the `backend` folder:

```
./mvnw spring-boot:run
```

The application starts on `http://localhost:8080` by default.

---

### Authentication

The API uses JWT based authentication. After a successful login, the client receives a token that must be included in the `Authorization` header for all protected endpoints:

```
Authorization: Bearer <token>
```

Registration only allows self signup as Farmer or Guest. Admin accounts are provisioned manually in the database.

---

### API Endpoints

All response bodies follow a consistent shape:

```json
{
  "status": "ok",
  "statusCode": "200",
  "message": "Description of result",
  "id": "id of affected resource, if applicable"
}
```

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new Farmer or Guest account |
| POST | /api/auth/login | Log in and receive a JWT |

### Farms

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /farmverse/farms/addFarm | Add a new farm |
| PUT | /farmverse/farms/editFarm/{farmId} | Edit an existing farm |
| DELETE | /farmverse/farms/deleteFarm/{farmId} | Delete a farm and its crops |
| GET | /farmverse/farms/viewFarm/{farmId} | View a single farm and its crops |
| GET | /farmverse/farms/viewAllFarms | List all farms for the logged in farmer |

### Crops

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /farmverse/crops/addCrop | Add a new crop to a farm |
| PUT | /farmverse/crops/editCrop/{cropId} | Edit an existing crop |
| DELETE | /farmverse/crops/deleteCrop/{cropId} | Delete a crop |
| GET | /farmverse/crops/viewCrop/{cropId} | View a single crop, including its farm name |

### Krishi AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /farmverse/chat/sendMessage | Send a farming query to Krishi AI and receive an AI-generated response |

**Request Body:**
```json
{
  "message": "What fertilizer is best for sandy soil?"
}
```

**Response:**
```json
{
  "status": "ok",
  "statusCode": "200",
  "message": "Response generated successfully",
  "id": null
}
```

The response data field carries the AI-generated answer from the Gemini API, scoped to agriculture-related topics.

Farmer Dashboard and Admin endpoints are documented separately in the team's shared API contract document.

---

### Database Schema

Core tables used by this service:

**users**: id, full_name, username, email, password, role, created_at

**farms**: id, farm_name, farm_type, area_sq_mt, soil_type, location, farmer_id, created_at

**crops**: id, crop_name, crop_type, quantity, sowing_date, harvest_date, farm_id, created_at

Deleting a farm cascades and deletes all of its associated crops. Deleting a user cascades and deletes all of their farms and crops.

---

### Ownership and Access Control

All Farm and Crop endpoints identify the current user from the JWT token, not from the request body. A farmer can only view, edit, or delete their own farms and crops. Admin only endpoints are restricted at the security configuration level.

---

### Testing

All endpoints listed above have been manually tested using Postman, covering both success and failure cases such as invalid input, duplicate records, unauthorized access, and ownership violations.

---

Drafted by Arindam Pal | Infosys SpringBoard Virtual Internship 7.0 Batch 1 : TEAM A

---