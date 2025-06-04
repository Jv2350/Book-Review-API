// controller for review-related operations (add, update, delete)
import { Review } from "../models/review.model.js";
import { Book } from "../models/book.model.js";

// add a new review to a book
export const addReview = async (req, res) => {
  const { content, rating } = req.body;
  const { id } = req.params;

  const existing = await Review.findOne({ book: id, user: req.user });
  if (existing) return res.status(400).json({ msg: "Already reviewed" });

  const review = await Review.create({
    book: id,
    user: req.user,
    content,
    rating,
  });
  await Book.findByIdAndUpdate(id, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

// update an existing review
export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user)
    return res.status(403).json({ msg: "Not allowed" });

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

// delete a review
export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user)
    return res.status(403).json({ msg: "Not allowed" });

  await review.deleteOne();
  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  res.json({ msg: "Deleted" });
};
