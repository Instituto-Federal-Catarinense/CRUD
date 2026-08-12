const express = require("express");
const produtoController = require("../controllers/produtoController");
const authMiddleware = require("../middleware/middlewares/authMiddleware");
const adminMiddleware = require("../middleware/middlewares/adminMiddleware");
const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", produtoController.getAllProdutos);
router.get("/new", produtoController.renderCreateForm);
router.post("/", produtoController.createProduto);
router.get("/:id", produtoController.getProdutoById);
router.get("/:id/edit", produtoController.renderEditForm);
router.put("/:id", produtoController.updateProduto);
router.delete("/:id", produtoController.deleteProduto);

module.exports = router;
