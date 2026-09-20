# ServNOW — Service Marketplace + CRM Management Platform

ServNOW is a full-stack Service Marketplace and CRM Management Platform built as a technical assessment project. It combines a customer-facing service marketplace with an integrated CRM for managing customers, providers, services, bookings, leads, transactions, support tickets, notifications, and users.

## Live Deployment

**Frontend:** https://servnow-proj.vercel.app/

**Backend API:** https://servnow-api.onrender.com

**GitHub Repository:** https://github.com/ojas-awasthi/servnow-proj

**Database:** MongoDB Atlas

---

## Project Overview

```text
Customer / CRM Frontend
        |
        v
React + Vite + Redux Toolkit
        |
        v
Axios / REST API
        |
        v
Node.js + Express.js
        |
        +-- Authentication / JWT
        +-- Role-Based Access Control
        +-- Validation
        +-- Controllers
        +-- Services
        +-- Error Handling
        |
        v
Mongoose
        |
        v
MongoDB Atlas
```

---

## Key Features

### Customer Marketplace

- Responsive homepage
- Service discovery
- Service search
- Category filtering
- Price filtering
- Rating filtering
- Sorting
- Pagination
- Service details
- Provider information
- Featured and trending services
- User registration and login
- JWT authentication
- Wishlist
- Service booking
- Date/time selection
- Address and booking notes
- Mock payment
- Booking confirmation
- Booking history
- Booking status tracking
- Customer dashboard
- Customer profile
- Service reviews and ratings

### CRM / Admin Platform

- CRM dashboard
- KPI statistics
- Revenue analytics
- Booking analytics
- Lead analytics
- Ticket analytics
- Customer management
- Provider management
- Service management
- Category management
- Booking management
- Booking/payment status management
- Lead management
- Lead assignment
- Lead follow-up dates
- Lead status workflow
- Kanban lead management
- Transaction management
- Support ticket management
- Notification management
- User management
- Role management
- User status management

---

## User Roles

| Role | Purpose |
|---|---|
| Customer | Browse services, book services, manage wishlist, view bookings and submit reviews |
| Provider | Service provider account associated with marketplace services |
| Sales | CRM sales and lead management |
| Support | Customer support and ticket management |
| Admin | Full administrative and CRM access |

---

# Demo Credentials

**Password for all demo accounts:**

```text
Test123456
```

| Name | Email | Role | Password |
|---|---|---|---|
| Aru | `aru22@gmail.com` | Customer | `Test123456` |
| Pankaj Yadav | `ada@servnow.com` | Customer | `Test123456` |
| Ojas Test | `ojastest@servnow.com` | Customer | `Test123456` |
| ServNOW Support | `support@servnow.com` | Support | `Test123456` |
| ServNOW Sales | `sales@servnow.test` | Sales | `Test123456` |
| Ojas Customer | `customer@servnow.com` | Customer | `Test123456` |
| Raj Services | `provider@servnow.com` | Provider | `Test123456` |
| ServNOW Admin | `admin@servnow.com` | Admin | `Test123456` |

> **Production note:** `sales@servnow.test` uses a reserved `.test` domain. If the production email validator rejects this address during login, update that account in MongoDB Atlas to a valid domain such as `sales@servnow.com` before using the Sales demo account.

---

# Tech Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Lucide React
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- REST APIs

## Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database
- GitHub — Source control

---

# Architecture

The application follows a layered MVC / clean-architecture-oriented structure.

```text
Frontend
|
+-- Pages
+-- Components
+-- Layouts
+-- Redux Store / Features
+-- Routes
+-- API Service
        |
        v
Backend
|
+-- Routes
+-- Middleware
|   +-- Authentication
|   +-- Authorization
|   +-- Validation
|   +-- Error Handling
|
+-- Controllers
+-- Services
+-- Validators
+-- Models
+-- Utilities
        |
        v
MongoDB Atlas
```

---

# Authentication & Authorization

Authentication is implemented using:

- JWT access tokens
- bcrypt password hashing
- Protected routes
- Role-based authorization
- Joi request validation
- Centralized error handling

The frontend stores the authentication token locally and Axios automatically attaches the token to protected API requests.

CRM routes are protected by role-based authorization.

---

# Database Models

The backend uses Mongoose models for:

1. **User**
2. **Category**
3. **Service**
4. **Booking**
5. **Transaction**
6. **Wishlist**
7. **Review**
8. **Lead**
9. **SupportTicket**
10. **Notification**

Detailed database model documentation is available in:

```text
docs/database-schema.md
```

The schema documentation describes fields, types, constraints, references, and model relationships.

## Main Relationships

```text
User
 +-- Customer
 +-- Provider
 +-- Sales
 +-- Support
 +-- Admin

Category
 +-- Service

Provider
 +-- Service

Customer
 +-- Booking
 +-- Wishlist
 +-- Review

Service
 +-- Booking
 +-- Wishlist
 +-- Review

Booking
 +-- Transaction

Lead
 +-- Service Interest
 +-- Assigned User
 +-- Converted Customer

SupportTicket
 +-- Customer
 +-- Assigned User

Notification
 +-- User
```

---

# Customer Workflow

```text
Homepage
   |
Browse Services
   |
Search / Filter / Sort
   |
Service Details
   |
Login / Register
   |
Book Service
   |
Checkout
   |
Mock Payment
   |
Booking Confirmation
   |
Customer Dashboard
   |
Booking Tracking
   |
Review
```

---

# CRM Workflow

```text
CRM Dashboard
      |
      +-- Customers
      +-- Providers
      +-- Services
      +-- Categories
      +-- Bookings
      +-- Leads
      +-- Transactions
      +-- Support Tickets
      +-- Notifications
      +-- Users & Roles
```

### Lead Lifecycle

```text
New -> Contacted -> Qualified -> Proposal -> Converted
                                      |
                                      +-> Lost
```

### Booking Lifecycle

```text
Pending -> Confirmed -> In Progress -> Completed

Alternative:
Pending / Confirmed / In Progress -> Cancelled
```

### Payment Lifecycle

```text
Pending -> Paid

Other supported states:
Failed
Refunded
```

### Support Ticket Lifecycle

```text
Open -> Assigned -> In Progress -> Resolved -> Closed
```

---

# API Documentation

API documentation is available at:

```text
docs/api-documentation.md
```

The API is organized into the following major resource groups:

```text
/api/auth
/api/services
/api/categories
/api/bookings
/api/transactions
/api/wishlist
/api/reviews
/api/leads
/api/tickets
/api/notifications
/api/users
/api/dashboard
```

The backend follows RESTful JSON API conventions.

---

# Postman

Postman resources are located in:

```text
postman/
```

The API collection can be imported into Postman for testing the backend endpoints.

---

# Project Structure

```text
ServNOW/
|
+-- client/
|   +-- public/
|   +-- src/
|   |   +-- assets/
|   |   +-- components/
|   |   |   +-- common/
|   |   |   +-- customer/
|   |   |   +-- crm/
|   |   +-- layouts/
|   |   +-- pages/
|   |   |   +-- customer/
|   |   |   +-- auth/
|   |   |   +-- crm/
|   |   +-- features/
|   |   +-- store/
|   |   +-- services/
|   |   +-- hooks/
|   |   +-- utils/
|   |   +-- routes/
|   |   +-- App.jsx
|   |   +-- main.jsx
|   |   +-- index.css
|   +-- package.json
|   +-- vite.config.js
|   +-- vercel.json
|
+-- server/
|   +-- src/
|   |   +-- config/
|   |   +-- controllers/
|   |   +-- middleware/
|   |   +-- models/
|   |   +-- routes/
|   |   +-- services/
|   |   +-- validators/
|   |   +-- utils/
|   |   +-- app.js
|   |   +-- server.js
|   +-- .env.example
|   +-- package.json
|
+-- docs/
|   +-- architecture.md
|   +-- database-schema.md
|   +-- api-documentation.md
|
+-- postman/
|   +-- README.md
|
+-- .gitignore
+-- README.md
+-- package.json
```

---

# Environment Variables

## Backend

Create:

```text
server/.env
```

Example:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## Frontend

For local development:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://servnow-api.onrender.com/api
```

**Never commit production secrets or `.env` files to GitHub.**

---

# Local Development

## Prerequisites

- Node.js
- npm
- MongoDB Atlas account/database
- Git
- Postman (optional, for API testing)

## Clone

```bash
git clone https://github.com/ojas-awasthi/servnow-proj.git
cd servnow-proj
```

## Backend

```bash
cd server
npm install
```

Create `server/.env` using the environment variables described above.

Start the backend:

```bash
npm run dev
```

The backend runs locally on:

```text
http://localhost:5000
```

## Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

# Production Build

From the project root:

```bash
npm run build
```

The frontend production build is generated in:

```text
client/dist/
```

---

# Deployment

## Frontend — Vercel

The frontend is deployed from:

```text
client/
```

Configuration:

```text
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

The application uses a Vercel rewrite configuration for React Router SPA routes.

## Backend — Render

The backend is deployed from:

```text
server/
```

Configuration:

```text
Root Directory: server
Build Command: npm install
Start Command: npm start
```

Production environment variables are configured through Render.

## Database — MongoDB Atlas

The application uses MongoDB Atlas with Mongoose.

Database:

```text
service_marketplace
```

---

# Security

The application includes:

- JWT-based authentication
- bcrypt password hashing
- Protected routes
- Role-based access control
- Joi request validation
- Centralized API error handling
- Environment-based secrets
- MongoDB authentication
- No production `.env` files committed to GitHub

The mock payment flow is intentionally a test/demo payment implementation and does not process real financial transactions.

---

# UI / UX

The interface is designed to be:

- Responsive across mobile, tablet, laptop, and desktop
- Accessible with semantic HTML and accessible labels
- Consistent through reusable components
- Focused on clear information hierarchy
- Supported by loading and error states
- Enhanced with subtle micro-interactions
- Optimized for a smooth customer and CRM workflow

The interface uses Lucide React icons and Recharts for analytics visualization.

---

# Assessment Submission

This repository contains the complete ServNOW implementation along with:

- Frontend source code
- Backend source code
- Database models
- Architecture documentation
- API documentation
- Postman resources
- Setup instructions
- Deployment information

## Live Links

**Application:**  
https://servnow-proj.vercel.app/

**Backend API:**  
https://servnow-api.onrender.com

**Source Code:**  
https://github.com/ojas-awasthi/servnow-proj

---

## License

This project was developed as a technical assessment submission.
