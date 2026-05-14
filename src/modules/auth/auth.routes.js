import { Router } from "express";
import { signIn, signUp } from "./auth.controller.js";
import { checkEmail } from "../../middlewares/CheckEmailExist.js";
import { signUpSchema, signInSchema } from "../../validations/auth.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";
const authRouter = Router();

authRouter.post("/signup",validate(signUpSchema), checkEmail, signUp);
authRouter.post("/signin",validate(signInSchema), signIn);

export default authRouter;
