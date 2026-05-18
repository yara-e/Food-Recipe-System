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
  categoryIdSchema,
} from "../../validations/category.validation.js";
import { protectedRoutes } from "../../middlewares/auth.middleware.js";

const categoryRouter = Router();
categoryRouter.use(protectedRoutes);
categoryRouter
  .route("/")
  .post(validate(addCategorySchema), addCategory)
  .get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(validate(categoryIdSchema), getOneCategory)
  .put(validate(updateCategorySchema), updateCategory)
  .delete(validate(categoryIdSchema), deleteCategory);

export { categoryRouter };
