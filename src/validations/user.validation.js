import Joi from "joi";

export const addUserSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin").default("user"),
  }).unknown(false),
   params: Joi.object().optional(),
  query: Joi.object().optional(),
}).unknown(false);

 
export const updateUserSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  }).unknown(false),
  
  body: Joi.object({
    name: Joi.string().min(3).max(50),
  }).min(1).unknown(false),  
  
    query: Joi.object().optional(),
}).unknown(false);

export const UserIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }).unknown(false),
  body: Joi.object().optional(),
  query: Joi.object().optional(),
}).unknown(false);

export const getAllUsersSchema = Joi.object({
  body: Joi.object().optional(),
  params: Joi.object().optional(),
 
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional()
  }).unknown(false)
}).unknown(false);