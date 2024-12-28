"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Missing token" });
    try {
        req.user = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};
exports.authenticateJWT = authenticateJWT;
