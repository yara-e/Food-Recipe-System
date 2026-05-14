import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
     email: {
       type: String,
       required: true,
       unique: true,
       trim: true,
       lowercase: true,
     },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    otp: {
      type: String,
    },
    otpExpire: Date,
  },
  {timestamps: true},
);
 

export const User = model("User", userSchema);
