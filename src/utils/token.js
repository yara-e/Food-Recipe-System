import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}
export const generateToken = (payload) => {
  const expiry = process.env.JWT_EXPIRES_IN || "60m";
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiry });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
