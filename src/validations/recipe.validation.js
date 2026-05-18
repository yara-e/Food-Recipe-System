import Joi from "joi";
import { objectIdValidation } from "../utils/validationHelpers.js";

const singleFileSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "image/jpg")
    .required()
    .messages({
      "any.only": "Only JPEG, JPG, and PNG images are allowed",
    }),
  size: Joi.number()
    .max(2 * 1024 * 1024)
    .required()
    .messages({
      "number.max": "Each image size cannot exceed 2MB",
    }),
  destination: Joi.string().required(),
  filename: Joi.string().required(),
  path: Joi.string().required(),
});

export const addRecipeSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    categoryId: objectIdValidation.required(),
  }).unknown(false),

  image: Joi.array().items(singleFileSchema).min(1).messages({
    "array.min": "At least one recipe image is required",
    "any.required": "Recipe image files are required",
  }),
});

export const updateRecipeSchema = Joi.object({
  params: Joi.object({
    id: objectIdValidation.required(),
  }).unknown(false),
  body: Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(10),
    categoryId: objectIdValidation,
  })
    .min(1)
    .unknown(false),
});

export const recipeIdSchema = Joi.object({
  params: Joi.object({
    id: objectIdValidation.required(),
  }).unknown(false),
});
