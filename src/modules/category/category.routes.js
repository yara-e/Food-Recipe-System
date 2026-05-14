import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} from "./category.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  addCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from "../../validations/category.validation.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(validate(addCategorySchema), addCategory)
  .get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(getOneCategory)
  .put(validate(updateCategorySchema), updateCategory)
  .delete(validate(deleteCategorySchema), deleteCategory);

export { categoryRouter };
