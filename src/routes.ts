import { Router } from "express";
import { ContatoController } from "./controllers/ContatoController";
import { AuthController } from "./controllers/AuthController";
import { PostsController } from "./controllers/PostsController";
import { auth } from "./middlewares/auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("API online");
});

router.post("/contato", ContatoController.enviar);
router.post("/login", AuthController.login);
router.post("/posts", auth, PostsController.criar);

// rota protegida
router.get("/admin", auth, (req, res) => {
  res.json({ status: "Área protegida" });
});

export default router;
