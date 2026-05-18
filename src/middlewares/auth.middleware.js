import { AppError } from "../utils/AppError.js";
import { verifyToken } from "../utils/token.js";
import { User } from "../models/user.model.js";
import { catchError } from "../utils/catchError.js";

export const protectedRoutes = catchError(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AppError("Please sign in first.", 401));
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(new AppError("Please sign up first.", 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return next(
      new AppError("Invalid or expired token. Please sign in again.", 401),
    );
  }
});
