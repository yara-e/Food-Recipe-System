import { Router } from "express";
import { toggleFavorite, getUserFavorites } from "./favorite.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  toggleFavoriteSchema,
  getFavoritesSchema,
} from "../../validations/favorite.validation.js";
import { protectedRoutes } from "../../middlewares/auth.middleware.js";

const favoriteRouter = Router();

favoriteRouter.post(
  "/",
  protectedRoutes,
  validate(toggleFavoriteSchema),
  toggleFavorite,
);
favoriteRouter.get("/:userId", validate(getFavoritesSchema), getUserFavorites);

export { favoriteRouter };
