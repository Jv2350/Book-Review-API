import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// load environment variables
dotenv.config();
connectDB();

const app = express();

// root endpoint
app.get("/", (req, res) => {
  res.send("Book Review API Running");
});

const PORT = process.env.PORT;
// start the server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
