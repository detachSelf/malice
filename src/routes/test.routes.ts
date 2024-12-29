import { Router } from "express";

const testRouter = Router();

testRouter.post("/echo", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  const modifiedMessage = `API received: ${message}`;
  res.json({ original: message, modified: modifiedMessage });
});

export default testRouter;
