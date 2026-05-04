import { Favorite } from "../../models/favorite.model.js";

export const toggleFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await Favorite.find({ userId }).populate(
      "recipeId",
      "title image description",
    );

    res.status(200).json({ message: "success", data: favorites });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
