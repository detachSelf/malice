import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const pool = new pg.Pool({
  max: 100,
  idleTimeoutMillis: 300000,
});

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

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

export default app;
