const express = require('express');
const capivaraController = require('../controllers/capivaraController');
const router = express.Router();

router.get('/', capivaraController.getAllcapivara);
router.get('/search', capivaraController.searchcapivara);
router.get('/new', capivaraController.renderCreateForm);
router.post('/', capivaraController.createcapivara);
router.get('/:id', capivaraController.getcapivaraById);
router.get('/:id/edit', capivaraController.renderEditForm);
router.put('/:id', capivaraController.updatecapivara);
router.delete('/:id', capivaraController.deletecapivara);

module.exports = router;
