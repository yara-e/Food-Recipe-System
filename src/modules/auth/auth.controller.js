import { User } from "../../models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import { generateToken } from "../../utils/token.js";
import { hashPassword } from "../../utils/hashPassword.js";
import bcrypt from "bcrypt";

export const signUp = catchError(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(new AppError("Name, email, and password are required", 400));
  }

  req.body.password = await hashPassword(req.body.password);

  let data = new User(req.body);
  await data.save();

  res
    .status(201)
    .json({ message: "success", data: { name: data.name, email: data.email } });
});

export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
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
