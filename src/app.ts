import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import routes from "./routes";

dotenv.config();

// Nota: Conexão com banco de dados removida para permitir que o servidor inicie sem MySQL
// Todas as operações que dependem do banco agora funcionam em modo simulação

const app = express();

app.use(cors());
app.use(express.json());

// Montagem do caminho de imagens (sem usar import.meta)
// Prioridade:
// 1) IMAGE_PATH (variável de ambiente / .env)
// 2) ./site-nutrologia/img a partir do diretório onde o processo foi iniciado (process.cwd())
// 3) ./img a partir de process.cwd()
// 4) caminhos relativos ao arquivo atual (útil quando roda a partir de dist/)
const candidates: string[] = [];

if (process.env.IMAGE_PATH) candidates.push(path.resolve(process.env.IMAGE_PATH));

candidates.push(path.resolve(__dirname, "..", "..", "img"));
candidates.push(path.resolve(process.cwd(), "site-nutrologia", "img"));
candidates.push(path.resolve(process.cwd(), "img"));

// caminhos relativos ao arquivo (suporta quando rodar a partir de dist/)
candidates.push(path.resolve(__dirname, "..", "site-nutrologia", "img"));
candidates.push(path.resolve(__dirname, "..", "..", "site-nutrologia", "img"));

console.log("Image path candidates:");
candidates.forEach((c) => console.log(" -", c));

const imagesPath = candidates.find((c) => fs.existsSync(c)) || candidates[0];

if (!fs.existsSync(imagesPath)) {
  console.warn(
    "Nenhuma das paths candidatas existe. Verifique onde está a pasta `site-nutrologia/img` ou defina IMAGE_PATH no .env."
  );
} else {
  console.log("Usando imagesPath:", imagesPath);
  try {
    console.log("Arquivos em imagesPath:", fs.readdirSync(imagesPath));
  } catch (err) {
    console.error("Erro ao listar arquivos em imagesPath:", err);
  }
}

// Servir imagens em /img
app.use(
  "/img",
  express.static(imagesPath, {
    maxAge: process.env.NODE_ENV === "production" ? "1d" : 0,
  })
);

// Servir frontend estático
app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

// Rota de debug (útil para verificar rapidamente)
app.get("/debug/img-list", (req, res) => {
  if (!fs.existsSync(imagesPath)) {
    return res.status(404).json({ message: "img path not found", imagesPath, candidates });
  }
  try {
    const files = fs.readdirSync(imagesPath);
    return res.json({ imagesPath, files });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao ler pasta img", error: String(err) });
  }
});

// Rota de boas-vindas
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1 style="color: #2c3e50;">--- API DA DRA. GLAICE ATIVA ---</h1>
      <p style="color: #7f8c8d; font-size: 1.2em;">O servidor do Método RESET-60 está rodando perfeitamente.</p>
    </div>
  `);
});

// Suas outras rotas (mantive como antes)
app.use(routes);

export default app;