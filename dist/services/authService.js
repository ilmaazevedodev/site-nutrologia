"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = loginService;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function loginService(email, senha) {
    if (email === "admin@email.com" && senha === "123456") {
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    return null;
}
