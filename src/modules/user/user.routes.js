import { Router } from "express";
import { checkEmail } from "../../middlewares/CheckEmailExist.js";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "./user.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "../../validations/user.validation.js";

const userRouter = Router();

userRouter
  .route("/")
  .post(validate(addUserSchema), checkEmail, addUser)
  .get(getAllUsers);

userRouter
  .route("/:id")
  .get(getOneUser)
  .put(validate(updateUserSchema), updateUser)
  .delete(validate(deleteUserSchema), deleteUser);

export { userRouter };
