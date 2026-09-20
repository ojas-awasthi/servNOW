# ServNOW Database Schema

ServNOW uses MongoDB Atlas with Mongoose.

## User

```text
User
 ├── name
 ├── email
 ├── password
 ├── role
 ├── phone
 ├── status
 └── avatar
```

Roles:

```text
customer
provider
sales
support
admin
```

## Category

```text
Category
 ├── name
 ├── description
 ├── image
 └── isActive
```

## Service

```text
Service
 ├── title
 ├── description
 ├── category → Category
 ├── provider → User
 ├── price
 ├── duration
 ├── images
 ├── rating
 ├── reviewCount
 ├── isFeatured
 ├── isTrending
 └── status
```

## Booking

```text
Booking
 ├── customer → User
 ├── provider → User
 ├── service → Service
 ├── bookingDate
 ├── address
 ├── notes
 ├── amount
 ├── status
 └── paymentStatus
```

Booking statuses:

```text
pending
confirmed
in_progress
completed
cancelled
```

Payment statuses:

```text
pending
paid
failed
refunded
```

## Transaction

```text
Transaction
 ├── booking → Booking
 ├── customer → User
 ├── transactionId
 ├── amount
 ├── paymentMethod
 ├── status
 └── paidAt
```

## Wishlist

```text
Wishlist
 ├── user → User
 └── services → Service[]
```

## Review

```text
Review
 ├── user → User
 ├── service → Service
 ├── booking → Booking
 ├── rating
 └── comment
```

## Lead

```text
Lead
 ├── name
 ├── email
 ├── phone
 ├── source
 ├── serviceInterest → Service
 ├── assignedTo → User
 ├── status
 ├── priority
 ├── notes
 ├── followUpDate
 └── convertedCustomer → User
```

Lead statuses:

```text
new
contacted
qualified
proposal
converted
lost
```

## SupportTicket

```text
SupportTicket
 ├── customer → User
 ├── assignedTo → User
 ├── subject
 ├── description
 ├── priority
 ├── status
 ├── category
 └── resolution
```

## Notification

```text
Notification
 ├── user → User
 ├── title
 ├── message
 ├── type
 ├── isRead
 └── relatedId
```

## Main Relationships

```text
User
 ├───────────────< Booking
 ├───────────────< Review
 ├───────────────< Wishlist
 ├───────────────< Lead assignment
 ├───────────────< SupportTicket
 └───────────────< Notification

Category
 └───────────────< Service

Service
 ├───────────────< Booking
 ├───────────────< Review
 └───────────────< Wishlist

Booking
 └───────────────< Transaction
```
