// Mongoose schema and model for User
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true }, // unique username for the user
  password: { type: String, required: true }, // hashed password
});

export const User = model("User", userSchema);
