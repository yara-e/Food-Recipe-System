import { User } from "../models/user.model.js";
 
import { hashPassword } from "../utils/hashPassword.js";

export const checkEmail = async (req, res, next) => {
  let isExist = await User.findOne({ email: req.body.email });
  if (isExist) return res.json({ message: "Email is Exist" });
  next();
};
