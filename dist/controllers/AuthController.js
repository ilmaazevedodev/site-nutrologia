"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    static async login(req, res) {
        const { email, senha } = req.body;
        const token = await (0, authService_1.loginService)(email, senha);
        if (!token) {
            return res.status(401).json({ erro: "Credenciais inválidas" });
        }
        return res.json({ token });
    }
}
exports.AuthController = AuthController;
