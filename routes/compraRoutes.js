const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.get('/compras', compraController.getAllCompras);
router.get('/compras/new', compraController.renderCreateForm);
router.post('/compras', compraController.createCompra);
router.get('/compras/:id', compraController.getCompraById);
router.get('/compras/:id/edit', compraController.renderEditForm);
router.post('/compras/:id', compraController.updateCompra);
router.post('/compras/:id/delete', compraController.deleteCompra);

module.exports = router;
