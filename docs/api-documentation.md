# ServNOW API Documentation

Local base URL:

```text
http://localhost:5000/api
```

Protected endpoints use:

```http
Authorization: Bearer <JWT>
```

## Authentication

```text
POST /auth/register
POST /auth/login
GET  /auth/me
```

## Services

```text
GET /services
GET /services/:id
```

## Categories

```text
GET /categories
```

CRM category management provides administrative operations.

## Bookings

```text
GET  /bookings
GET  /bookings/:id
POST /bookings
```

CRM booking management provides administrative booking operations and status management.

## Transactions

```text
POST /transactions/pay
```

CRM transaction management provides transaction listing and detail operations.

## Wishlist

```text
GET    /wishlist
POST   /wishlist
DELETE /wishlist/:serviceId
```

## Reviews

```text
GET    /reviews/service/:serviceId
POST   /reviews
PUT    /reviews/:reviewId
DELETE /reviews/:reviewId
```

## Leads

CRM lead management supports listing, creation, editing, deletion, assignment, follow-up, status changes, and Kanban workflow.

## Support Tickets

CRM support ticket management provides ticket listing, details, assignment, and status management.

## Notifications

Notification endpoints support notification management and read/unread state.

## Users

User management is restricted to administrators.

```text
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
PATCH  /users/:id/role
PATCH  /users/:id/status
DELETE /users/:id
```

These endpoints require JWT authentication and admin authorization.

## Dashboard

```text
GET /dashboard/summary
GET /dashboard/bookings
GET /dashboard/revenue
GET /dashboard/leads
GET /dashboard/tickets
```

## Response Pattern

Successful responses generally use:

```json
{
  "success": true,
  "data": {}
}
```

Errors generally use:

```json
{
  "success": false,
  "message": "Error message"
}
```

The Postman collection contains the detailed request/response examples.
