import dotenv from "dotenv";
import express from "express";
import testRoutes from "./routes/test.routes";
import app from './index';

dotenv.config();

// const app = express(); // imported from .index
const port = process.env.PORT || 3333;

// Middleware to parse JSON
app.use(express.json());

// Add global request logging middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Define a test route directly in server.ts for quick testing
app.post("/test/echo", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  res.json({ echoedMessage: `Server received: ${message}` });
});

// Use the test route from routes/test.routes.ts
app.use("/test", testRoutes);

// Middleware error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err.stack || err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Debugging environment variables
console.log("Loaded PORT:", process.env.PORT);
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
