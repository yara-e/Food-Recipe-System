import Joi from "joi";

export const addUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(3).max(30),
});

export const UserIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }).unknown(false),
});
