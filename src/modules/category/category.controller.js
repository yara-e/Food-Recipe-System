import { Category } from "../../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ message: "success", data: category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: "success", data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "success", data: category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      {
        returnDocument: "after",
      },
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "success", data: category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
