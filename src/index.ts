import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
// TESTING the thing right now!
const pool = new pg.Pool({
  max: 100, // Maximum number of clients
  idleTimeoutMillis: 300000, // Close idle clients after 5 min
});

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    res.send(`Hello, World! The time from the DB is ${rows[0].now}`);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
