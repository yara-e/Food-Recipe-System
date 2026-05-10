import { Recipe } from "../../models/recipe.model.js";
import { deleteFiles } from "../../utils/deleteFile.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";

export const addRecipe = catchError(async (req, res, next) => {
  const { title, description, createdBy, categoryId } = req.body;

  if (!title || !description || !createdBy || !categoryId) {
    return next(
      new AppError(
        "title, description, createdBy, and categoryId are required",
        400,
      ),
    );
  }

  let imagePath =
    req.files && req.files.length > 0
      ? req.files.map((file) => file.path)
      : ["uploads/recipes/default.png"];

  const recipe = new Recipe({
    ...req.body,
    image: imagePath,
  });

  await recipe.save();
  res.status(201).json({ message: "success", data: recipe });
});

export const getAllRecipes = catchError(async (req, res, next) => {
  const recipes = await Recipe.find()
    .populate("categoryId", "name")
    .populate("createdBy", "name email");

  res.status(200).json({ message: "success", data: recipes });
});

export const getOneRecipe = catchError(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id)
    .populate("categoryId", "name")
    .populate("createdBy", "name email");

  if (!recipe) {
    return next(new AppError("Recipe not found", 404));
  }
  res.status(200).json({ message: "success", data: recipe });
});

export const updateRecipe = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, categoryId } = req.body;

  const oldRecipe = await Recipe.findById(id);
  if (!oldRecipe) {
    if (req.files?.length > 0) await deleteFiles(req.files.map((f) => f.path));
    return next(new AppError("Recipe not found", 404));
  }

  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (categoryId !== undefined) updateData.categoryId = categoryId;

  if (req.files?.length > 0) {
    updateData.image = req.files.map((file) => file.path);
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (req.files?.length > 0 && oldRecipe.image) {
    await deleteFiles(oldRecipe.image);
  }

  res.status(200).json({ message: "success", data: updatedRecipe });
});

export const deleteRecipe = catchError(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findByIdAndDelete(id);

  if (!recipe) {
    return next(new AppError("Recipe not found", 404));
  }

  if (recipe.image && recipe.image.length > 0) {
    await deleteFiles(recipe.image);
  }

  res.status(200).json({ message: "success" });
});
