import { Category } from "../../models/category.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";

export const addCategory = catchError(async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return next(new AppError("Name and description are required", 400));
  }

  const category = new Category({ name, description });
  await category.save();
  res.status(201).json({ message: "success", data: category });
}); 

export const getAllCategories = catchError(async (req, res, next) => {
 
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const totalResults = await Category.countDocuments();

  const categories = await Category.find()
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalResults / limit) || 1;

  res.status(200).json({
    message: "success",
    currentPage: page,
    totalPages: totalPages,
    totalResults: totalResults,
    data: categories,
  });
});

export const getOneCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({ message: "success", data: category });
});

export const updateCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { name, description },
    { new: true },
  );

  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({ message: "success", data: category });
});

export const deleteCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({ message: "success" });
});
