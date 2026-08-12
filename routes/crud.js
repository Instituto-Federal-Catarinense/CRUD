const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const controller = require('../controllers/crudController');

// READ - Aberto a qualquer usuário autenticado
router.get('/', isAuthenticated, controller.getAll);
router.get('/:id', isAuthenticated, controller.getById);

// CREATE - Qualquer usuário autenticado pode criar
router.post('/', isAuthenticated, controller.create);

// UPDATE - Apenas usuários com papel 'admin' ou 'editor'
router.put('/:id', isAuthenticated, authorizeRoles('admin', 'editor'), controller.update);

// DELETE - Apenas administradores
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), controller.delete);

module.exports = router;