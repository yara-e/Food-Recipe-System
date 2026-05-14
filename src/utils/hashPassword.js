import bcrypt from "bcrypt";

const rounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, rounds);
};
