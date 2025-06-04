import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // array of review references
});

export const Book = model("Book", bookSchema);
