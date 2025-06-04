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

- The project uses [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables from `.env`.
- **Never commit your real `.env` file to version control.**
- Example variables:
  - `PORT`: Port for the backend server (default: 5000)
  - `MONGO_URI`: MongoDB connection string
  - `JWT_SECRET`: Secret key for JWT authentication

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

### Add a review to a book (requires JWT token)

```bash
curl -X POST http://localhost:5000/api/books/<book_id>/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"content": "Great book!", "rating": 5}'
```

### Update a review (requires JWT token)

```bash
curl -X PUT http://localhost:5000/api/reviews/<review_id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"content": "Updated review!", "rating": 4}'
```

### Delete a review (requires JWT token)

```bash
curl -X DELETE http://localhost:5000/api/reviews/<review_id> \
  -H "Authorization: Bearer <token>"
```

---

## Postman Collection

For proper testing, use the public Postman collection:
[Book Review API Postman Collection](https://www.postman.com/research-geoscientist-16890172/workspace/public/collection/34171321-1b2a597e-9d48-415f-8b83-9bf09cee145d?action=share&creator=34171321)

---

## Live Demo

You can directly test the deployed Book Review API backend at:

**API Base URL:** [https://book-review-api-d5yk.onrender.com](https://book-review-api-d5yk.onrender.com)

- All endpoints are available under `/api`, e.g. `https://book-review-api-d5yk.onrender.com/api/books`.
- You can use this URL with Postman, curl, or your own frontend.

---

## Database Schema

See [`DB_SCHEMA.md`](./DB_SCHEMA.md) for a detailed schema and ER diagram.

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
- Modular code structure for maintainability.
- Environment variables are used for all sensitive config.
- Comments are provided throughout the code for clarity.

---

## Frontend (Optional)

A simple React-based frontend is included in the `frontend/` directory. This frontend was generated with the help of ChatGPT and is provided for convenience if you want to interact with the Book Review API visually.

### To run the frontend locally:

1. Open a new terminal and navigate to the `frontend/` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to use the app.

- The frontend expects the backend API to be running at `http://localhost:5000` by default.
- You can register, log in, add books, and add reviews through the UI.

---

For any questions or issues, please open an issue or contact the maintainer.
