const express = require('express');

const userController = require('../controllers/userController');
const verificarLogin = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarLogin, userController.getAllUsers);

router.get('/search', verificarLogin, userController.searchUsers);

router.get('/new', verificarLogin, userController.renderCreateForm);

router.post('/', verificarLogin, userController.createUser);

router.get('/:id', verificarLogin, userController.getUserById);

router.get('/:id/edit', verificarLogin, userController.renderEditForm);

router.put('/:id', verificarLogin, userController.updateUser);

router.delete('/:id', verificarLogin, userController.deleteUser);

module.exports = router;