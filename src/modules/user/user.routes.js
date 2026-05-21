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
import { allowedTo } from "../../middlewares/role.middleware.js";

const userRouter = Router();
userRouter.use(protectedRoutes);

// ==========================================
// ADMIN ONLY ROUTES
// ==========================================
userRouter.get("/", allowedTo("admin"), getAllUsers);

userRouter.delete(
  "/:id",
  allowedTo("admin"),
  validate(UserIdSchema),
  deleteUser,
);
userRouter.put(
  "/:id",
  allowedTo("admin"),
  validate(updateUserSchema),
  updateUser,
);

// ==========================================
// ALL USERS ACCESS ROUTE (USER PROFILE / ADMIN LOOKUP)
// ==========================================

userRouter.get("/:id", protectedRoutes, getOneUser);

export { userRouter };
