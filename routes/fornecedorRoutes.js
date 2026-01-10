const express = require("express");
const fornecedorController = require("../controllers/fornecedorController");
const router = express.Router();

router.get("/", fornecedorController.listarFornecedores); // GET /fornecedores → index.ejs
router.get("/new", fornecedorController.exibirFormularioCriacao); // GET /fornecedores/new → criar.ejs
router.post("/", fornecedorController.criarFornecedor); // POST /fornecedores

router.get("/:id", fornecedorController.exibirDetalhesFornecedor); // GET /fornecedores/:id → show.ejs
router.get("/:id/edit", fornecedorController.exibirFormularioEdicao); // GET /fornecedores/:id/edit → editar.ejs
router.post("/:id", fornecedorController.atualizarFornecedor); // POST /fornecedores/:id
router.post("/:id/delete", fornecedorController.deletarFornecedor); // POST /fornecedores/:id/delete

module.exports = router;
