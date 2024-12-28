"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool({
    max: 100,
    idleTimeoutMillis: 300000,
});
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.raw({ type: "application/vnd.custom-type" }));
app.use(body_parser_1.default.text({ type: "text/html" }));
// Routes
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
exports.default = app;
