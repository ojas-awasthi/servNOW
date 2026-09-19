# ServNOW

ServNOW is a full-stack **Service Marketplace + CRM Management Platform** built as an end-to-end web application.

The platform combines a customer-facing service marketplace with a CRM system for managing customers, providers, services, bookings, leads, transactions, support tickets, notifications, and users.

---

## Features

### Customer Platform

- Responsive customer-facing website
- Service discovery
- Service search
- Category filtering
- Price filtering
- Rating filtering
- Sorting
- Pagination
- Service details
- Provider information
- Wishlist
- Customer registration and login
- JWT-based authentication
- Service booking
- Appointment date/time selection
- Address and booking notes
- Mock payment flow
- Booking confirmation
- Booking history
- Booking status tracking
- Customer dashboard
- Profile view
- Service reviews and ratings
- Responsive mobile/tablet/desktop UI
- Loading, empty, and error states

### CRM Platform

- CRM dashboard
- Dashboard statistics
- Revenue analytics
- Booking analytics
- Lead analytics
- Support ticket analytics
- Customer management
- Provider management
- Service management
- Category management
- Booking management
- Lead management
- Lead assignment
- Lead follow-up
- Lead status management
- Kanban lead workflow
- Transaction management
- Support ticket management
- Notifications
- User management
- Role management
- User status management
- Role-based access control

---

## User Roles

ServNOW supports the following roles:

| Role | Purpose |
|---|---|
| Customer | Browse and book services |
| Provider | Service provider account |
| Sales | CRM sales and lead management |
| Support | Support ticket management |
| Admin | Full CRM/user management |

---

## Technology Stack

### Frontend

- React.js
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- shadcn/ui
- Lucide React
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- CORS
- dotenv

### Development & Documentation

- Git
- GitHub
- Postman
- MongoDB Atlas

---

## Architecture

ServNOW follows a frontend → REST API → database architecture with separation between routes, controllers, services, middleware, validators, and models.

```text
                    ServNOW
                       |
          +------------+------------+
          |                         |
          v                         v
   Customer Frontend          CRM Frontend
     React + Vite             React + Vite
          |                         |
          +------------+------------+
                       |
                  Axios / REST
                       |
                       v
              Node.js + Express
                       |
          +------------+------------+
          |            |            |
       Routes      Middleware   Controllers
                       |
                  Services
                       |
                  Validation
                       |
                    Mongoose
                       |
                       v
                MongoDB Atlas
