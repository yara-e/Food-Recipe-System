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
  UserIdSchema,
} from "../../validations/user.validation.js";
import { protectedRoutes } from "../../middlewares/auth.middleware.js";
const userRouter = Router();
userRouter.use(protectedRoutes);
userRouter
  .route("/")
  .post(validate(addUserSchema), checkEmail, addUser)
  .get(getAllUsers);

userRouter
  .route("/:id")
  .get(validate(UserIdSchema), getOneUser)
  .put(validate(updateUserSchema), updateUser)
  .delete(validate(UserIdSchema), deleteUser);

export { userRouter };
