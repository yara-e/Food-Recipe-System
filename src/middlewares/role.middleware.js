import { AppError } from "../utils/AppError.js";

export const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Please Sign in First.", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`Access Denied for your role : '${req.user.role}'`, 403),
      );
    }

    next();
  };
};
