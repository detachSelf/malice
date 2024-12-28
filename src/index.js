"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const pg_1 = __importDefault(require("pg"));
// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
// TESTING the thing right now!
const pool = new pg_1.default.Pool({
    max: 100, // Maximum number of clients
    idleTimeoutMillis: 300000, // Close idle clients after 5 min
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.raw({ type: "application/vnd.custom-type" }));
app.use(body_parser_1.default.text({ type: "text/html" }));
app.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT NOW()");
        res.send(`Hello, World! The time from the DB is ${rows[0].now}`);
    }
    catch (error) {
        console.error("Database query error:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
