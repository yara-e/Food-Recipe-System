import Joi from "joi";

export const dashboardSchema = Joi.object({
  body: Joi.object().optional(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
}).unknown(false);