import { AppError } from "../utils/AppError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const dataToValidate = {};

    if (req.body && Object.keys(req.body).length > 0)
      dataToValidate.body = req.body;
    if (req.params && Object.keys(req.params).length > 0)
      dataToValidate.params = req.params;
    if (req.query && Object.keys(req.query).length > 0)
      dataToValidate.query = req.query;
    if (req.files && Object.keys(req.files).length > 0)
      dataToValidate.image = req.files;

    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return next(new AppError(messages, 400));
    }

    next();
  };
};
