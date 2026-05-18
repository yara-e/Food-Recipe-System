import { Router } from "express";
import {
  addRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
} from "./recipe.controller.js";
import { upload } from "../../utils/upload.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  addRecipeSchema,
  recipeIdSchema,
  updateRecipeSchema,
} from "./../../validations/recipe.validation.js";
import { protectedRoutes } from "../../middlewares/auth.middleware.js";

const recipeRouter = Router();

recipeRouter
  .route("/")
  .post(protectedRoutes, upload, validate(addRecipeSchema), addRecipe)
  .get(getAllRecipes);

recipeRouter
  .route("/:id")
  .get(validate(recipeIdSchema), getOneRecipe)
  .put(protectedRoutes, validate(updateRecipeSchema), upload, updateRecipe)
  .delete(protectedRoutes, validate(recipeIdSchema), deleteRecipe);

export { recipeRouter };
