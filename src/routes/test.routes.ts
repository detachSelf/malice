import { Router } from "express";

const router = Router();

router.post("/echo", (req, res) => {
  console.log("Received body:", req.body);
  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  res.json({ echoedMessage: `Server received: ${message}` });
});


router.all("*", (req, res) => {
  res.status(404).send(`Route ${req.method} ${req.originalUrl} not found.`);
});


export default router;
