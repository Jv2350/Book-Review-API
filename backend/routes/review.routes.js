import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import {
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

// routes for updating and deleting reviews

router.put("/:id", auth, updateReview);     // PUT /api/reviews/:id - Update a review (auth required)
router.delete("/:id", auth, deleteReview);  // DELETE /api/reviews/:id - Delete a review (auth required)

export default router;
