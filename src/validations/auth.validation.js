import Joi from "joi";

const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;

export const signUpSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 3 characters long",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().pattern(passwordRegex).required().messages({
      "string.pattern.base":
        "Password must start with an uppercase letter and be at least 6 characters long",
      "any.required": "Password is required",
    }),
  }).unknown(false),
});

export const signInSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(false),
});
