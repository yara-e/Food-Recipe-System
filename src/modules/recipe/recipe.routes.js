import { Router } from "express";
import {
  addRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
} from "./recipe.controller.js";
import { upload } from "../../middlewares/multer.js";

const recipeRouter = Router();

 
recipeRouter
  .route("/")
  .post(upload.single("image"), addRecipe)
  .get(getAllRecipes);

 
recipeRouter
  .route("/:id")
  .get(getOneRecipe)
  .put(upload.single("image"), updateRecipe)
  .delete(deleteRecipe);

export { recipeRouter };
