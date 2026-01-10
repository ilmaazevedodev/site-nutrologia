"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// CONFIGURAÇÃO DE IMAGENS:
// O process.cwd() aponta para a pasta 'backend'. 
// O '..' sobe uma pasta para a raiz onde está a 'img'.
app.use('/img', express_1.default.static(path_1.default.join(__dirname, '..', 'img')));
// Rota de boas-vindas
app.get('/', (req, res) => {
    res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1 style="color: #2c3e50;">--- API DA DRA. GLAICE ATIVA ---</h1>
      <p style="color: #7f8c8d; font-size: 1.2em;">O servidor do Método RESET-60 está rodando perfeitamente.</p>
    </div>
  `);
});
app.use(routes_1.default);
exports.default = app;
