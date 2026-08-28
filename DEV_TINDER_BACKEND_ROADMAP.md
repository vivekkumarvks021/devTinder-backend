# DevTinder Backend — Final Stack and Roadmap

## Final Technology Stack

1. **Runtime:** Node.js
2. **Language:** TypeScript
3. **Framework:** Express.js
4. **Database:** MongoDB Atlas
5. **ODM:** Mongoose
6. **Authentication:** JWT
7. **JWT Storage:** HTTP-only cookie
8. **Password Hashing:** bcrypt
9. **Request Validation:** Zod
10. **API Documentation:** Swagger / OpenAPI
11. **API Testing:** Postman / Thunder Client
12. **Environment Configuration:** `.env` and `.env.example`
13. **CORS:** Configured for the separate frontend repository
14. **Real-time Communication:** Socket.IO in Phase 2, when chat is implemented

## Backend Architecture

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

## Repositories

```text
devtinder-backend
devtinder-frontend
```

- Backend and frontend will remain in separate repositories.
- Frontend development will not start yet.
- The frontend will be created after the backend APIs are complete.

## Backend Development Order

1. Project Setup
2. Express Server
3. MongoDB Connection
4. User Model
5. Signup
6. Login
7. JWT Authentication
8. Auth Middleware
9. Profile APIs
10. Developer Feed
11. Interested / Ignored
12. Match / Connection
13. Connection APIs
14. Error Handling
15. Validation
16. Swagger
17. Testing
18. Socket.IO + Chat
19. Production Optimization
20. Deployment

## Current Status

- Final backend stack decided.
- Layered architecture decided.
- Separate frontend and backend repositories decided.
- Backend implementation has not started yet.
- Next step: **Project Setup** in `devtinder-backend`.
