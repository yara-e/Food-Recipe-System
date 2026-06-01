import Joi from "joi";
import { objectIdValidation } from "../utils/validationHelpers.js";

export const addCategorySchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
  }).unknown(false),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
}).unknown(false);

export const updateCategorySchema = Joi.object({
  params: Joi.object({
    id: objectIdValidation.required(),
  }).unknown(false),
  body: Joi.object({
    name: Joi.string().min(2).max(50),
    description: Joi.string().min(10).max(500),
  })
    .min(1)
    .unknown(false),
  query: Joi.object().optional(),
}).unknown(false);

export const categoryIdSchema = Joi.object({
  params: Joi.object({
    id: objectIdValidation.required(),
  }).unknown(false),
  body: Joi.object().optional(),
  query: Joi.object().optional(),
}).unknown(false);

export const getAllCategoriesSchema = Joi.object({
  body: Joi.object().optional(),
  params: Joi.object().optional(),
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
  }).unknown(false),
}).unknown(false);
