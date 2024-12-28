import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false, // Disable logging
});

export default sequelize;
