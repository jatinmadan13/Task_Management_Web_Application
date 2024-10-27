import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connection established");
  } catch (error) {
    console.error("DB Error:", error.message || error);
    process.exit(1); 
  }
};

export const createJWT = (res, userId) => {
 
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }


  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

 
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", 
    sameSite: "strict", 
    maxAge: 24 * 60 * 60 * 1000, 
  });
};
