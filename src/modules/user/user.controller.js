import { User } from "../../models/user.model.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";

export const addUser = catchError(async (req, res, next) => {
  req.body.password = await hashPassword(req.body.password);

  let data = new User(req.body);
  await data.save();

  const { password, ...dataWithoutPassword } = data._doc;
  res.status(201).json({ message: "success", data: dataWithoutPassword });
});

export const getAllUsers = catchError(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const totalResults = await User.countDocuments();
  const users = await User.find().select("-password").skip(skip).limit(limit);

  const totalPages = Math.ceil(totalResults / limit) || 1;

  res.status(200).json({
    message: "success",
    currentPage: page,
    totalPages: totalPages,
    totalResults: totalResults,
    data: users,
  });
});

export const getOneUser = catchError(async (req, res, next) => {
  let { id } = req.params;

  const loggedInUser = req.user;

  if (loggedInUser.role !== "admin" && loggedInUser._id.toString() !== id) {
    return next(
      new AppError("Access denied. You can only view your own profile.", 403),
    );
  }
  let data = await User.findById(id).select("-password");

  if (!data) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({ message: "success", data });
});

export const updateUser = catchError(async (req, res, next) => {
  let { id } = req.params;
  const loggedInUser = req.user;

  if (loggedInUser.role !== "admin" && loggedInUser._id.toString() !== id) {
    return next(
      new AppError("Access denied. You can only update your own profile.", 403),
    );
  }
  const { name, email } = req.body;

  let data = await User.findByIdAndUpdate(
    id,
    { name, email },
    {
      new: true,
      projection: { password: 0 },
    },
  );

  if (!data) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({ message: "success", data });
});

export const deleteUser = catchError(async (req, res, next) => {
  let { id } = req.params;
  let data = await User.findByIdAndDelete(id);

  if (!data) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({ message: "success" });
});
