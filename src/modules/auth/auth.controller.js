import { User } from "../../models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import { generateToken } from "../../utils/token.js";
import { hashPassword } from "../../utils/hashPassword.js";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.js";
import bcrypt from "bcrypt";

export const signUp = catchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  

  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({
    message: "success",
    data: {
      name: user.name,
      email: user.email,
    },
  });
});

export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = generateToken({ userId: user._id, email: user.email });

  res.status(200).json({ message: "success", token });
});


export const forgetPassword = catchError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("No account found with this email address.", 404));
  }
 
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
   
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
 
  user.otpCode = hashedOtp;
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000; 
  user.isOtpVerified = false;  
  await user.save();

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset OTP Code",
      message: `Your secure password recovery code is: ${otp}.\nIt expires in 10 minutes. If you did not request this change, please ignore this email.`,
    });

    res.status(200).json({ message: "success", description: "OTP sent to your email address." });
  } catch (error) {
    user.otpCode = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    return next(new AppError("Email delivery failed. Please try again later.", 500));
  }
});

 
export const verifyOtp = catchError(async (req, res, next) => {
  const { email, otp } = req.body;

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  const user = await User.findOne({
    email,
    otpCode: hashedOtp,
    otpExpiresAt: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError("Invalid or expired OTP code.", 400));
  }

  user.isOtpVerified = true;
  await user.save();

  res.status(200).json({ message: "success", description: "OTP verified. Proceed to password reset." });
});

 
export const resetPassword = catchError(async (req, res, next) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email, isOtpVerified: true });
  if (!user) {
    return next(new AppError("Unauthorized action. Please verify your OTP first.", 403));
  }

  user.password = await hashPassword(newPassword);

  user.otpCode = undefined;
  user.otpExpiresAt = undefined;
  user.isOtpVerified = false; 
  await user.save();

  res.status(200).json({ message: "success", description: "Password reset completed successfully. You can now login." });
});