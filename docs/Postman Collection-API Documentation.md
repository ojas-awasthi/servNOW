# Postman API Collection

Place the exported ServNOW Postman collection in this directory.

Recommended organization:

```text
ServNOW API
├── Auth
├── Services
├── Categories
├── Bookings
├── Transactions
├── Wishlist
├── Reviews
├── Leads
├── Support Tickets
├── Notifications
├── Users
└── Dashboard
```

Recommended environment variable:

```text
baseUrl = http://localhost:5000/api
```

Protected requests use:

```text
Authorization: Bearer {{token}}
```

Do not export or commit real secrets, production credentials, MongoDB URIs, or private JWT secrets.
