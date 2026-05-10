import { User } from "../../models/user.model.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";

export const addUser = catchError(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(new AppError("Name, email, and password are required", 400));
  }

  req.body.password = await hashPassword(req.body.password);

  let data = new User(req.body);
  await data.save();

  const { password, ...dataWithoutPassword } = data._doc;
  res.status(201).json({ message: "success", data: dataWithoutPassword });
});

export const getAllUsers = catchError(async (req, res, next) => {
  let data = await User.find().select("-password");
  res.status(200).json({ message: "success", data });
});

export const getOneUser = catchError(async (req, res, next) => {
  let { id } = req.params;
  let data = await User.findById(id).select("-password");

  if (!data) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({ message: "success", data });
});

export const updateUser = catchError(async (req, res, next) => {
  let { id } = req.params;
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
