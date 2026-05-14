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
  deleteRecipeSchema,
  updateRecipeSchema,
} from "./../../validations/recipe.validation";

const recipeRouter = Router();

recipeRouter
  .route("/")
  .post(upload, validate(addRecipeSchema), addRecipe)
  .get(getAllRecipes);

recipeRouter
  .route("/:id")
  .get(getOneRecipe)
  .put(upload, validate(updateRecipeSchema), updateRecipe)
  .delete(validate(deleteRecipeSchema), deleteRecipe);

export { recipeRouter };
