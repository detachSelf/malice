import app from "./app";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
