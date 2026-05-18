import Joi from "joi";

export const objectIdValidation = Joi.string().hex().length(24).messages({
  "string.hex": "ID must be a valid hexadecimal string",
  "string.length": "ID must be exactly 24 characters long",
  "any.required": "ID is a required field",
});
