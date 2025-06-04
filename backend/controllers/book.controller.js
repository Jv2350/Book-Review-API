// controller for book-related operations (CRUD, search, etc.)
import { Book } from "../models/book.model.js";

// create a new book
export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

// get a list of books with optional filters
export const getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, "i");
  if (genre) query.genre = genre;

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(books);
};

// get a single book by ID, including reviews and average rating
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("reviews");
  if (!book) return res.status(404).json({ msg: "Not found" });

  const avgRating =
    book.reviews.reduce((acc, r) => acc + r.rating, 0) /
    (book.reviews.length || 1);
  res.json({ ...book.toObject(), avgRating });
};

// search for books by title or author (additional functionality)
export const searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [{ title: new RegExp(q, "i") }, { author: new RegExp(q, "i") }],
  });
  res.json(books);
};
