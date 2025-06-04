// authentication routes for user signup and login
import express from "express";
const router = express.Router();
import { signup, login } from "../controllers/auth.controller.js";

router.post("/signup", signup); // POST /api/auth/signup - Register a new user
router.post("/login", login); // POST /api/auth/login - Login a user

export default router;
