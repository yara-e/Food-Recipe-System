import { Router } from "express";
import {
  addRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
} from "./recipe.controller.js";
import { upload } from "../../utils/upload.js";

const recipeRouter = Router();

recipeRouter
  .route("/")
  .post(upload , addRecipe)
  .get(getAllRecipes);

recipeRouter
  .route("/:id")
  .get(getOneRecipe)
  .put(upload , updateRecipe)
  .delete(deleteRecipe);

export { recipeRouter };
