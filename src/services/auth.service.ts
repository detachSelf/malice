import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import User from "../models/user.model";

export const login = async (data: { username: string; password: string }) => {
  const user = await User.findOne({ where: { username: data.username } });
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error("Invalid credentials");
  }
  return jwt.sign({ id: user.id, username: user.username }, ENV.JWT_SECRET, {
    expiresIn: "1h",
  });
};
