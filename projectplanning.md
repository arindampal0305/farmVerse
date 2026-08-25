# Project Planning Document

| Field                 | Details                                  |
|-----------------------|------------------------------------------|
| **Name**              | Arindam Pal                              |
| **Project**           | FarmVerse Precision Agriculture Platform |
---
## Problem Statement
Farmers managing large agricultural operations face significant challenges in keeping track of multiple farms and diverse crop portfolios. The absence of a centralised digital system leads to inefficient farming practices, poor resource allocation, missed harvest windows, and financial losses due to uninformed pricing decisions. Small and medium-scale farmers in particular lack accessible tools to monitor crop health, track growth stages, and make data-driven decisions across their operations.

---
## Proposed Solution
FarmVerse is a full-stack web platform that enables farmers to digitally manage their farms and crops from a single dashboard.
Built using React, Spring Boot and MySQL/MongoDBm the platform provides:
- Farm registration and management with location, size, and soil type details
- Crop tracking with sowing dates, growth stages, and expected harvest timelines
- Periodic crop photo uploads to visually monitor crop health over time
- Market price reference for crops to support informed selling decisions
- Separate dashboards for farmers (User) and platform administrators (Admin)
- Secure authentication via JWT with optional Google OAuth login
---
## Platform Architecture

| Layer | Technology | Responsibility                                                  |
|---|---|-----------------------------------------------------------------|
| **Frontend** | React.js | User interface:  landing page, login, user and admin dashboards |
| **Backend** | Spring Boot | REST API, business logic, JWT auth, role-based access control   |
| **Database** | MySQL / MongoDB | Persistent storage for users, farms, crops, payments (optional) |

---

## Deeper Architecture

### Database Design

#### Core Entities


| User                                                                                        |
|---------------------------------------------------------------------------------------------|
| user_id<br/>name<br/>ph_numer<br/>password_hash<br/>role(Farmer/Admin/Guest)<br/>created_at |

| Farm                                                                  |
|-----------------------------------------------------------------------|
| farm_id<br/>user_id (FK)<br/>name<br/>location<br/>size<br/>soil_type |

| Crop                                                                                          |
|-----------------------------------------------------------------------------------------------|
| crop_id<br/>farm_id (FK)<br/>crop_name<br/>sowing_date<br/>harvest_date<br/>growth_stage<br/> |

| CropImage                                        |
|--------------------------------------------------|
| image_id<br/>crop_id (FK)<br/>image_url (GDrive) |

| CropPrice                                                                      |
|--------------------------------------------------------------------------------|
| price_id<br/>crop_name<br/>price_per_unit<br/>unit (kg/quintal)<br/>updated_at |

| Payment  (optional) |
|-----------------------------------------------------------|
| payment_id<br/>user_id (FK)<br/>amount<br/>timestamp      |

#### Key Relationships
- One User can own many Farms (one-to-many)
- One Farm can have many Crops (one-to-many)
- One Crop can have many CropImages (one-to-many)
- CropPrice is a reference table, not linked to a specific user or farm

---

### Backend Design (Spring Boot)

#### Authentication
- `POST /api/auth/register` : register new farmer
- `POST /api/auth/login` : returns JWT token
- Google OAuth 2.0 login (optional)
- Role-based access: FARMER vs ADMIN vs GUEST enforced via Spring Security

#### Farm Module
- `POST /api/farms` : add a new farm *(Farmer only)*
- `GET /api/farms` : get all farms owned by logged-in farmer
- `PUT /api/farms/{id}` : update farm details
- `DELETE /api/farms/{id}` : remove a farm

#### Crop Module
- `POST /api/farms/{farmId}/crops` : add crop to a farm
- `GET /api/farms/{farmId}/crops` : list all crops on a farm
- `PUT /api/crops/{id}` : update crop stage or details
- `DELETE /api/crops/{id}` : remove a crop

#### Crop Image Module
- `POST /api/crops/{cropId}/images` : upload a crop photo
- `GET /api/crops/{cropId}/images` : view all photos for a crop

#### Pricing Module
- `GET /api/prices` : view reference crop prices *(accessible to all users)*
- `POST /api/prices` : add or update crop price *(Admin only)*

#### Admin Module
- `GET /api/admin/users` : view all registered farmers
- `GET /api/admin/farms` : view all farms on the platform
- `DELETE /api/admin/users/{id}` : remove a user

---

### Frontend Design (React.js)

#### Landing Page
- Dashboard with platform overview and call to action
- Features section highlighting Farm, Crop, Pricing, and Monitoring modules
- How it works section (3-step guide)
- Navigation with Login and Sign Up buttons

#### Login / Register Page
- Fields: User ID / Phone number, Password
- Optional: Continue with Google (OAuth)
- On success: JWT stored, redirect based on role

#### User Dashboard (Farmer)
- Overview: total farms, crops and market prices
- Farm list with add, edit, delete actions
- Crop list per farm
- Photo upload section per crop
- Crop price reference table
- Time-to-harvest data

#### Admin Dashboard
- Overview: total users, total farms, total crops on platform
- User management table: view, deactivate, delete farmers
- Farm and crop oversight across all users
- Ability to add or update crop market prices

---

### Optional Module: Payments

If the project scope expands to a marketplace model, a Payment module can be added. This would track transactions between farmers and buyers, with payment status PENDING/COMPLETED/FAILED stored in the Payment entity.


---

### *Extra: Crop Prediction Model (AI/ML)*
A machine learning model can be trained to predict future crop prices, enabling farmers to make data-driven decisions on when to harvest and sell their produce. This moves the platform from a static price reference to an intelligent forecasting tool, justifying the "Precision" in FarmVerse's name.

#### Likely Inputs for the model:
- Crop type
- Current Month
- Historical price data for the same crop over past years
- Location or state/region

#### Flow
1. Farmer selects a crop for price prediction
2. Frontend sends request to backend
3. Backend calls the ML with crop type, location, and date
4. ML service returns predicted price
5. Backend forwards prediction to frontend for display
---
