import { Router } from "express";
import { toggleFavorite, getUserFavorites } from "./favorite.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  toggleFavoriteSchema,
  getFavoritesSchema,
} from "../../validations/favorite.validation.js";
import { protectedRoutes } from "../../middlewares/auth.middleware.js";

const favoriteRouter = Router();
favoriteRouter.use(protectedRoutes);

favoriteRouter.post("/", validate(toggleFavoriteSchema), toggleFavorite);
favoriteRouter.get("/", validate(getFavoritesSchema), getUserFavorites);

export { favoriteRouter };
