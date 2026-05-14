import Joi from "joi";

export const addRecipeSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  ingredients: Joi.array().items(Joi.string()).min(1).required(),
  instructions: Joi.string().required(),
  categoryId: Joi.string().hex().length(24).required(),
  image: Joi.string(),
});

export const updateRecipeSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  ingredients: Joi.array().items(Joi.string()),
  instructions: Joi.string(),
  categoryId: Joi.string().hex().length(24).required(),
});

export const deleteRecipeSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
