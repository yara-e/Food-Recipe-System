import { User } from  "../../models/user.model.js";
import { Recipe } from "../../models/recipe.model.js";
import { Category } from "../../models/category.model.js";
import { Favorite } from "../../models/favorite.model.js";
import { catchError } from "../../utils/catchError.js";

export const getDashboardStats = catchError(async (req, res, next) => {
  const [totalUsers, totalRecipes, totalCategories, totalFavorites] = await Promise.all([
    User.countDocuments(),
    Recipe.countDocuments(),
    Category.countDocuments(),
    Favorite.countDocuments(),
  ]);

  res.status(200).json({
    message: "success",
    data: {
      totalUsers,
      totalRecipes,
      totalCategories,
      totalFavorites,
    },
  });
});