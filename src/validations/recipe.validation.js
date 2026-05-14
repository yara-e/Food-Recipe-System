import Joi from "joi";

export const addRecipeSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  categoryId: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).required(),
  image: Joi.string(),
});

export const updateRecipeSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  categoryId: Joi.string().hex().length(24),
  createdBy: Joi.string().hex().length(24),
});

export const deleteRecipeSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
