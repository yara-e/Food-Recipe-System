import { Router } from "express";
import { checkEmail } from "../../middlewares/CheckEmailExist.js";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "./user.controller.js";

const userRouter = Router();

userRouter.route("/").post(checkEmail, addUser).get(getAllUsers);
userRouter.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

export { userRouter };
