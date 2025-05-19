import express from "express";
import EditoraController from "../controllers/editorasController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/editoras/paginado", EditoraController.listarEditorasPaginado, paginar)
  .get("/editoras", EditoraController.listarEditorasCompleto)
  .get("/editoras/busca", EditoraController.listarEditoraPorFiltro, paginar)
  .get("/editoras/:id", EditoraController.listarEditoraPorId)
  .post("/editoras", EditoraController.cadastrarEditora)
  .put("/editoras/:id", EditoraController.atualizarEditora)
  .delete("/editoras/:id", EditoraController.excluirEditora);

export default router;   