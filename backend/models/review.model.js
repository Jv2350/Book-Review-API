// Mongoose schema and model for Review
import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book" }, // reference to the reviewed book
    user: { type: Schema.Types.ObjectId, ref: "User" }, // reference to the user who wrote the review
    content: String,
    rating: { type: Number, min: 1, max: 5 }, // rating (1-5)
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);
