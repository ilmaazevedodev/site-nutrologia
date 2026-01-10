import { Request, Response } from "express";
// import { db } from "../database/connection"; // Removido para evitar erros

export class PostsController {
  static async criar(req: Request, res: Response) {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ erro: "Título e conteúdo são obrigatórios" });
    }

    // Sempre simular sucesso já que não temos banco de dados
    console.log("Simulando criação de post:", { title, content });
    return res.json({
      status: "Post criado com sucesso",
      message: "Post foi criado (modo simulação)",
      id: Date.now() // ID simulado
    });
  }
}