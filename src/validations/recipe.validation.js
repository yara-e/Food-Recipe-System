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
  params: Joi.object().optional(),
  query: Joi.object().optional(),
}).unknown(false);

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
  query: Joi.object().optional(),
}).unknown(false);

export const recipeIdSchema = Joi.object({
  params: Joi.object({
    id: objectIdValidation.required(),
  }).unknown(false),
  query: Joi.object().optional(),
  body: Joi.object().optional(),
}).unknown(false);

export const getAllRecipesSchema = Joi.object({
  body: Joi.object().optional(),
  params: Joi.object().optional(),

  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    category: Joi.string().min(2).max(50).optional(),
    fields: Joi.string().optional()
  }).unknown(false),
}).unknown(false);
