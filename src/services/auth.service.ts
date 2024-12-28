import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { ENV } from "../config/env"; // Use a named import for ENV

interface AuthData {
  username: string;
  password: string;
}

export const authenticateUser = async (data: AuthData): Promise<string | null> => {
  const user = await User.findOne({ where: { username: data.username } });

  // Type guard to narrow down the type
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    return null;
  }

  // Sign and return the JWT
  return jwt.sign(
    { id: user.id, username: user.username },
    ENV.JWT_SECRET, // Use the ENV object here
    { expiresIn: "1h" }
  );
};

// Export authenticateUser as login
export const login = authenticateUser;
