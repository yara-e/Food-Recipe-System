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
    passwordChangedAt: {
      type: Date,
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
    otpCode: { type: String, select: false },
    otpExpiresAt: { type: Date, select: false },
    isOtpVerified: { type: Boolean, default: false, select: false }
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
