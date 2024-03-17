import bcrypt from "bcrypt";

async function hashPassword(password: string, saltRounds: number = 10) {
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export default {
  hashPassword,
  comparePassword,
};