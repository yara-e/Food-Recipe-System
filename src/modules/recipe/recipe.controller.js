import { Recipe } from "../../models/recipe.model.js";

export const addRecipe = async (req, res) => {
  try {
    const { title, description, createdBy, categoryId } = req.body;

    if (!title || !description || !createdBy || !categoryId) {
      return res.status(400).json({
        message: "title, description, createdBy, and categoryId are required",
      });
    }

    const imagePath = req.file ? req.file.path : "src/uploads/default.png";

    const recipe = new Recipe({
      ...req.body,
      image: imagePath,
    });

    await recipe.save();
    res.status(201).json({ message: "success", data: recipe });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("categoryId", "name")
      .populate("createdBy", "name email");

    res.status(200).json({ message: "success", data: recipes });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getOneRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id)
      .populate("categoryId", "name")
      .populate("createdBy", "name email");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "success", data: recipe });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.file) {
      req.body.image = req.file.path;
    }

    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    }).populate("categoryId", "name");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "success", data: recipe });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
