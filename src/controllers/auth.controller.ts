import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  const token = await AuthService.login(req.body);
  res.json({ token });
};
