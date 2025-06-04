import mongoose from "mongoose";

// function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    // log error and exit process if connection fails
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
