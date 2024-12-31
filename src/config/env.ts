import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:mLgrWVfuhgZIdGXkNWFTkTfNLtOqPZDe@postgres.railway.internal:5432/railway",
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  NODE_ENV: process.env.NODE_ENV || "development",
};
