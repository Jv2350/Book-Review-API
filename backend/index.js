import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// load environment variables
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", (req, res) =>
  res.status(200).send("auth route placeholder")
);
app.use("/api/books", (req, res) =>
  res.status(200).send("books route placeholder")
);
app.use("/api/reviews", (req, res) =>
  res.status(200).send("reviews route placeholder")
);

// root endpoint
app.get("/", (req, res) => {
  res.send("Book Review API Running");
});

const PORT = process.env.PORT;
// start the server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
