import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
console.log("Loaded DATABASE_URL:", databaseUrl);  // This should log the database URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in the environment");
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false, // Disable logging
});

export default sequelize;
