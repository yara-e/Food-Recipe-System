import Joi from "joi";
import { objectIdValidation } from "../utils/validationHelpers.js";

export const toggleFavoriteSchema = Joi.object({
  body: Joi.object({
    recipeId: objectIdValidation.required(),
  }).unknown(false),
});

export const getFavoritesSchema = Joi.object({
  params: Joi.object({
    userId: objectIdValidation.required(),
  }).unknown(false),
});
