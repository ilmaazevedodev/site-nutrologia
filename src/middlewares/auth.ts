import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ erro: "Token ausente" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido" });
  }
}
