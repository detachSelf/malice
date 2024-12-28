"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.authenticateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const env_1 = require("../config/env"); // Use a named import for ENV
const authenticateUser = async (data) => {
    const user = await user_model_1.default.findOne({ where: { username: data.username } });
    // Type guard to narrow down the type
    if (!user || !(await bcrypt_1.default.compare(data.password, user.password))) {
        return null;
    }
    // Sign and return the JWT
    return jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, env_1.ENV.JWT_SECRET, // Use the ENV object here
    { expiresIn: "1h" });
};
exports.authenticateUser = authenticateUser;
// Export authenticateUser as login
exports.login = exports.authenticateUser;
