import { Router } from "express";
import { signIn, signUp, forgetPassword ,  verifyOtp, resetPassword } from "./auth.controller.js";
import { checkEmail } from "../../middlewares/CheckEmailExist.js";
import {
  signUpSchema,
  signInSchema,
} from "../../validations/auth.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  forgetPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from "../../validations/auth.validation.js";
const authRouter = Router();

authRouter.post("/signup", validate(signUpSchema), checkEmail, signUp);
authRouter.post("/signin", validate(signInSchema), signIn);
authRouter.post(
  "/forget-password",
  validate(forgetPasswordSchema),
  forgetPassword,
);
authRouter.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);
authRouter.put("/reset-password", validate(resetPasswordSchema), resetPassword);
export default authRouter;
