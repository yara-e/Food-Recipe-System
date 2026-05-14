import Joi from "joi";

export const addCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(10).max(500).required(),
});

export const updateCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(50),
  description: Joi.string().min(10).max(500),
});

export const deleteCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
