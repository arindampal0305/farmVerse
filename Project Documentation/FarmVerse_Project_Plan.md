# FarmVerse – Project Planning Document

| Field | Details |
|--------|---------|
| **Project Name** | FarmVerse: Precision Agriculture Management Platform |
| **Team** | Team A |
| **Team Members** | Ananya, Arfa, Arindam, Bhagyesh, Divija |
| **Project Type** | Full Stack Web Application |
| **Technology Stack** | React.js, Spring Boot, PostgreSQL |

---

# 1. Problem Statement

Farmers often face difficulties in managing multiple farms, tracking crop growth, maintaining farm records, and accessing market information. Most small and medium-scale farmers still rely on manual methods, which can lead to inefficient resource utilization, delayed decision-making, and reduced productivity.

There is a need for a centralized digital platform that helps farmers manage farming activities efficiently while maintaining all farm-related information in one place.

---

# 2. Proposed Solution

FarmVerse is a full-stack web application that enables farmers to digitally manage their farms and crops through a centralized platform.

The platform allows farmers to:

- Register and manage farms.
- Maintain crop information.
- Track crop growth stages.
- Upload crop images for monitoring.
- View crop market prices.
- Access the platform through secure authentication.

The application also provides an administrative dashboard for managing users and platform data.

---

# 3. Objectives

- Digitize farm and crop management.
- Simplify agricultural record keeping.
- Help farmers monitor crop growth.
- Provide crop market price information.
- Enable secure user authentication.
- Build a scalable platform for future enhancements.

---

# 4. Project Scope

The initial version of FarmVerse focuses on digital farm management by providing features for farm registration, crop management, crop monitoring, and market price reference through an easy-to-use web application.

Future versions may include AI-based recommendations, weather forecasting, and smart farming features.

---

# 5. Platform Architecture

| Layer | Technology | Responsibility |
|--------|------------|----------------|
| Frontend | React.js | User Interface |
| Backend | Spring Boot | REST APIs and Business Logic |
| Database | PostgreSQL | Data Storage |
| Authentication | JWT | Secure Login and Authorization |

---

# 6. System Architecture

```
            Farmer / Admin
                   │
                   ▼
          React.js Frontend
                   │
            Spring Boot API
                   │
      ┌────────────┼────────────┐
      │            │            │
      ▼            ▼            ▼
 Authentication  Farm Module  Crop Module
                   │
                   ▼
          Crop Image Module
                   │
                   ▼
          Market Price Module
                   │
                   ▼
              PostgreSQL
```

---

# 7. Database Design

## User

- user_id
- name
- phone_number
- email
- password
- role

---

## Farm

- farm_id
- user_id (FK)
- farm_name
- location
- size
- soil_type

---

## Crop

- crop_id
- farm_id (FK)
- crop_name
- sowing_date
- expected_harvest_date
- growth_stage

---

## Crop Image

- image_id
- crop_id (FK)
- image_url
- uploaded_at

---

## Crop Price

- price_id
- crop_name
- price_per_unit
- unit
- updated_at

---

### Relationships

- One User can own multiple Farms.
- One Farm can contain multiple Crops.
- One Crop can have multiple Images.
- Crop Price serves as a reference table for all users.

---

# 8. Backend Modules

### Authentication

- User Registration
- User Login
- JWT Authentication

### Farm Management

- Add Farm
- View Farms
- Update Farm
- Delete Farm

### Crop Management

- Add Crop
- View Crops
- Update Crop
- Delete Crop

### Crop Images

- Upload Crop Images
- View Uploaded Images

### Market Prices

- View Crop Prices
- Update Crop Prices (Admin)

### Admin

- Manage Users
- Monitor Farms
- Manage Crop Prices

---

# 9. Frontend Modules

### Landing Page

- Introduction
- Features
- Login
- Register

### Farmer Dashboard

- Farm Overview
- Farm Management
- Crop Management
- Crop Images
- Market Prices

### Admin Dashboard

- User Management
- Farm Monitoring
- Crop Price Management

---

# 10. Functional Requirements

- User Registration and Login
- Farm Management
- Crop Management
- Crop Image Upload
- Market Price Display
- Admin Dashboard
- Role-Based Access

---

# 11. Non-Functional Requirements

- Responsive User Interface
- Secure Authentication
- Reliable Data Storage
- Easy Maintenance
- Scalable Architecture

---

# 12. Future Enhancements

- AI-based Crop Price Prediction
- Weather Forecast Integration
- Crop Disease Detection
- Smart Farming Recommendations

---

# 13. Expected Outcomes

- Digital management of farms and crops.
- Improved record keeping.
- Better crop monitoring.
- Easy access to market price information.
- Improved decision-making for farmers.

---

# 14. Conclusion

FarmVerse aims to simplify agricultural management by providing farmers with a centralized digital platform for managing farms, tracking crops, and accessing market information. The platform establishes a strong foundation for modern and technology-driven farming while allowing future enhancements such as AI and smart agriculture features.