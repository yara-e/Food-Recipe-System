import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "../utils/catchError.js";

export const checkEmail = catchError(async (req, res, next) => {
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) {
    return next(new AppError("Email already exists", 409));
  }
  next();
});
