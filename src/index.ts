import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import authRoutes from './routes/auth.routes';
import { authenticateJWT } from './middleware/authenticateJWT';

const pool = new pg.Pool({
  max: 100, // Maximum number of clients
  idleTimeoutMillis: 300000, // Close idle clients after 5 minutes
});

const app = express();
const port = process.env.PORT || 3333;

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


app.listen(port, () => {
  console.log(`Hithere! App listening at http://localhost:${port}`);
});

export default app;
