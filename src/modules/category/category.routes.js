import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.route("/").post(addCategory).get(getAllCategories);
categoryRouter.route("/:id")
  .get(getOneCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export { categoryRouter };
