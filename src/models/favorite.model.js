import mongoose, { model, Schema, Types } from "mongoose";

const favoriteSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipeId: {
    type: Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
});

favoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const Favorite = model("Favorite", favoriteSchema);
