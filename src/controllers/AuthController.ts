import { Request, Response } from "express";
import { loginService } from "../services/authService";

export class AuthController {

  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    const token = await loginService(email, senha);

    if (!token) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    return res.json({ token });
  }
}
