import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import authRoutes from './routes/auth.routes';
import { authenticateJWT } from './middleware/authenticateJWT';

const pool = new pg.Pool({
  max: 100,
  idleTimeoutMillis: 300000,
});

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use('/auth', authRoutes);

// Routes
app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    res.send(`Hello, World! The time from the DB is ${rows[0].now}`);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Protected route example
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
