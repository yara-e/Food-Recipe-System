import mongoose from "mongoose";
import { catchError } from "../utils/catchError.js";
import { User } from "../models/user.model.js";
import { hashPassword } from './../utils/hashPassword.js';

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
    seedAdmin();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    const admin = await User.findOne({ role: "admin" });
    
    if (!admin) {
      const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD
      );
      
      await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
        age: 23
      });
      console.log("Admin Done");
    }  
  } catch (error) {
     
    console.error("Failed to seed admin user:", error);
  }
};
