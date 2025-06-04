// Main entry point for the Book Review API backend server
// Sets up Express, connects to MongoDB, and defines API routes

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import reviewRoutes from "./routes/review.routes.js";

// load environment variables and connect to database
dotenv.config();
connectDB();

const app = express();

// middleware setup
app.use(cors());
app.use(express.json());

// API route handlers
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);
app.get("/", (req, res) => res.send("Book Review API Running"));

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
