"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContatoController_1 = require("./controllers/ContatoController");
const AuthController_1 = require("./controllers/AuthController");
const auth_1 = require("./middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("API online");
});
router.post("/contato", ContatoController_1.ContatoController.enviar);
router.post("/login", AuthController_1.AuthController.login);
// rota protegida
router.get("/admin", auth_1.auth, (req, res) => {
    res.json({ status: "Área protegida" });
});
exports.default = router;
