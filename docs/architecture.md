# ServNOW Architecture

## Overview

ServNOW uses a layered full-stack architecture.

```text
React + Vite
     |
Redux Toolkit / Axios
     |
REST API
     |
Express.js
     |
Routes
     |
Middleware
     |
Controllers
     |
Services
     |
Mongoose
     |
MongoDB Atlas
```

## Frontend

- `pages/` — route-level screens
- `components/` — reusable UI components
- `features/` — Redux Toolkit features/state
- `store/` — Redux store
- `services/` — API client
- `layouts/` — customer and CRM layouts
- `routes/` — public/protected route configuration
- `utils/` — shared utilities

## Backend

- `routes/` — HTTP endpoint definitions
- `controllers/` — request/response handling
- `services/` — business logic
- `models/` — Mongoose models
- `validators/` — Joi validation schemas
- `middleware/` — authentication, authorization, validation, and error handling
- `config/` — database configuration
- `utils/` — shared helpers

## Authentication Flow

```text
Login
  ↓
Express Auth Route
  ↓
Auth Controller
  ↓
Auth Service
  ↓
bcrypt password comparison
  ↓
JWT generation
  ↓
Frontend stores token
  ↓
Axios attaches Bearer token
  ↓
Protected API
```

## Authorization Flow

```text
Request
  ↓
JWT Authentication
  ↓
User identity + role
  ↓
Role Authorization
  ↓
Controller / Service
```

## Customer-to-CRM Flow

```text
Customer
   ↓
Service
   ↓
Booking
   ↓
Mock Payment
   ↓
Transaction
   ↓
CRM
   ↓
Dashboard / Management
```
