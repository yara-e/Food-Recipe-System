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
import { allowedTo } from "../../middlewares/role.middleware.js";

const categoryRouter = Router();
// ==========================================
// PUBLIC ROUTES
// ==========================================

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", validate(categoryIdSchema), getOneCategory);

// ==========================================
// PROTECTED ROUTES
// ==========================================
categoryRouter.post(
  "/",
  protectedRoutes,
  allowedTo("admin"),
  validate(addCategorySchema),
  addCategory,
);
categoryRouter.put(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  validate(updateCategorySchema),
  updateCategory,
);

categoryRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  validate(categoryIdSchema),
  deleteCategory,
);

export { categoryRouter };
