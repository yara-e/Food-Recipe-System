import { Router } from "express";
import { toggleFavorite, getUserFavorites } from "./favorite.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { toggleFavoriteSchema } from "../../validations/favorite.validation.js";

const favoriteRouter = Router();

favoriteRouter.post("/", validate(toggleFavoriteSchema), toggleFavorite);
favoriteRouter.get("/:userId", getUserFavorites);

export { favoriteRouter };
