import { AppError } from "../utils/AppError.js";
import { verifyToken } from "../utils/token.js";
import { User } from "../models/user.model.js";
import { catchError } from "../utils/catchError.js";

export const protectedRoutes = catchError(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AppError("Access denied. Token missing or invalid.", 401));
  }

  const token = authorization.split(" ")[1];
  let decoded;

  try {
    decoded = verifyToken(token);
  } catch (error) {
    return next(new AppError("Invalid or expired token. Please sign in again.", 401));
  }

  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(new AppError("Please sign up first.", 401));
  }

  if (currentUser.passwordChangedAt) {
    const changedAtTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);
    
    if (decoded.iat < changedAtTimestamp) {
      return next(new AppError("Password recently changed. Please sign in again.", 401));
    }
  }

  req.user = currentUser;
  next();
});