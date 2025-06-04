# Book Review API Backend

A Node.js/Express backend for a Book Review application, using MongoDB and Mongoose for data storage. This project is modular, uses environment variables for configuration, and is well-commented for clarity.

## Project Structure

```
backend/
  index.js              # Main server entry point
  package.json          # Project dependencies and scripts
  .env                  # Environment variables (not committed)
  config/
    db.js               # MongoDB connection logic
  controllers/
    auth.controller.js  # Auth logic (signup/login)
    book.controller.js  # Book CRUD logic
    review.controller.js# Review CRUD logic
  middleware/
    authMiddleware.js   # JWT authentication middleware
  models/
    user.model.js       # User schema/model
    book.model.js       # Book schema/model
    review.model.js     # Review schema/model
  routes/
    auth.routes.js      # Auth routes
    book.routes.js      # Book routes
    review.routes.js    # Review routes
frontend/
  ...                   # (Frontend not covered here)
```

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**

```bash
cd backend
npm install
```

3. **Create a `.env` file** in the `backend/` directory:

```
PORT=5000
MONGO_URI="mongodb://localhost:27017/bookreview"
JWT_SECRET="your_jwt_secret_here"
```

4. **Start the server**

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## Example API Requests

### Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "password123"}'
```

### Add a new book (requires JWT token)

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "Book Title", "author": "Author Name", "genre": "Fiction"}'
```

### Add a review (requires JWT token)

```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"bookId": "<book_id>", "content": "Great book!", "rating": 5}'
```

## Database Schema

### User

- `username`: String, required, unique
- `password`: String, required (hashed)

### Book

- `title`: String
- `author`: String
- `genre`: String
- `reviews`: [ObjectId] (references Review)

### Review

- `book`: ObjectId (references Book)
- `user`: ObjectId (references User)
- `content`: String
- `rating`: Number (1-5)
- `createdAt`, `updatedAt`: Date (auto-managed)

## Design Decisions & Assumptions

- Passwords are hashed using bcryptjs before storage.
- JWT is used for authentication; secret is stored in `.env`.
- All API endpoints are prefixed with `/api/`.
- Reviews are linked to both books and users.
- Error messages are intentionally generic for security.

---

For any questions or issues, please open an issue or contact the maintainer.
