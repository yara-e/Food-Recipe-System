import { AppError } from "../utils/AppError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    let { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message);

      next(new AppError(messages, 401));
    } else {
      next();
    }
  };
};
