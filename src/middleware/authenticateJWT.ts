import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";

// Extend the Express Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or malformed token" });
    return; // Ensure the function exits after sending a response
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET as string); // Verify token using the secret
    req.user = decoded; // Attach the decoded token to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
    return; // Ensure the function exits after sending a response
  }
};
