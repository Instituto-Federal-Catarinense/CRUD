const express = require('express');
const vendaController = require('../controllers/vendaController');
const router = express.Router();

router.get('/', vendaController.getAllVendas);
router.get('/search', (req, res) => {
    res.status(501).send('Search feature not implemented yet');
});

router.get('/new', vendaController.renderCreateForm);
router.post('/', vendaController.createVenda);
router.get('/:id', vendaController.getVendaById);
router.get('/:id/edit', vendaController.renderEditForm);
router.put('/:id', vendaController.updateVenda);
router.delete('/:id', vendaController.deleteVenda);

module.exports = router;
