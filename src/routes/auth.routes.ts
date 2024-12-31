// routes/auth.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

const router = Router();

// Mock user database
const users: { [key: string]: { password: string } } = {};

// User registration route
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };
  res.status(201).json({ message: 'User registered successfully' });
});

// User login route
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, ENV.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
