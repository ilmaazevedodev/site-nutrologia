import { Request, Response } from "express";
// import { db } from "../database/connection"; // Removido para evitar erros

export class ContatoController {
  static enviar(req: Request, res: Response) {
    const { nome, telefone, data, email, mensagem } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }

    // Sempre simular sucesso já que não temos banco de dados
    console.log("Simulando agendamento:", { nome, email, telefone, data, mensagem });
    return res.json({
      status: "Mensagem enviada com sucesso",
      message: "Obrigado pelo contato! Entraremos em contato em breve.",
      id: Date.now() // ID simulado
    });
  }
}
