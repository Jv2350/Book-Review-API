// routes for book operations and adding reviews
import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import {
  createBook,
  getBooks,
  getBookById,
  searchBooks,
} from "../controllers/book.controller.js";
import { addReview } from "../controllers/review.controller.js";

router.post("/", auth, createBook); // POST /api/books/ - Create a new book (auth required)
router.get("/", getBooks);          // GET /api/books/ - Get all books
router.get("/search", searchBooks); // GET /api/books/search - Search books
router.get("/:id", getBookById);    // GET /api/books/:id - Get book by ID
router.post("/:id/reviews", auth, addReview); // POST /api/books/:id/reviews - Add a review to a book (auth required)

export default router;
