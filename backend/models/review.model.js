import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);
