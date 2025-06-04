import jwt from "jsonwebtoken";

// middleware to authenticate requests using JWT
const auth = (req, res, next) => {
  // checks for a valid JWT token in the Authorization header
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export default auth;
