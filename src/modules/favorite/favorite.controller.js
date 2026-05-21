import { Favorite } from "../../models/favorite.model.js";
import { catchError } from "../../utils/catchError.js";

export const toggleFavorite = catchError(async (req, res, next) => {
  const userId = req.user._id;
  const { recipeId } = req.body;

  const existingFavorite = await Favorite.findOneAndDelete({
    userId,
    recipeId,
  });

  if (existingFavorite) {
    return res.status(200).json({ message: "Removed from favorites" });
  }

  const newFavorite = new Favorite({ userId, recipeId });
  await newFavorite.save();

  res.status(201).json({ message: "Added to favorites", data: newFavorite });
});

export const getUserFavorites = catchError(async (req, res, next) => {
  const { userId } = req.user._id;

  const favorites = await Favorite.find({ userId }).populate(
    "recipeId",
    "title image description",
  );

  res.status(200).json({ message: "success", data: favorites });
});
