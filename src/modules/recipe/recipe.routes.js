import { Router } from "express";
import {
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
  getOneRecipe,
} from "./recipe.controller.js";
import { protectedRoutes } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  addRecipeSchema,
  updateRecipeSchema,
  recipeIdSchema,
  getAllRecipesSchema,
} from "../../validations/recipe.validation.js";
import { upload } from "../../utils/upload.js";
import { allowedTo } from "../../middlewares/role.middleware.js";

const recipeRouter = Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================
recipeRouter.route("/").get(validate(getAllRecipesSchema),getAllRecipes);
recipeRouter.route("/:id").get(validate(recipeIdSchema), getOneRecipe);

// ==========================================
// PROTECTED ROUTES
// ==========================================
recipeRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    upload,
    validate(addRecipeSchema),
    addRecipe,
  );
recipeRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    upload,
    validate(updateRecipeSchema),
    updateRecipe,
  );
recipeRouter
  .route("/:id")
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(recipeIdSchema),
    deleteRecipe,
  );



export { recipeRouter };
