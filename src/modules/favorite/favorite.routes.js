import { Router } from "express";
import {
     toggleFavorite,
    getUserFavorites
} from "./favorite.controller.js";

const favoriteRouter = Router();

 
favoriteRouter.route("/").post(toggleFavorite);

favoriteRouter.route("/:userId").get(getUserFavorites);

 

export { favoriteRouter };