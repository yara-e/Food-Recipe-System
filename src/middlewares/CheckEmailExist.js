import { User } from "../models/user.model.js";
 
import { hashPassword } from "../utils/hashPassword.js";

export const checkEmail = async (req, res, next) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(409).json({ message: "Email already exists" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
