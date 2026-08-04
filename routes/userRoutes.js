const express = require('express');
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', ensureAuthenticated, userController.getAllUsers);
router.get('/search', ensureAuthenticated, userController.searchUsers); // Adicione esta rota
router.get('/new', userController.renderCreateForm);
router.post('/', userController.createUser);
router.get('/:id', ensureAuthenticated, userController.getUserById);
router.get('/:id/edit', ensureAuthenticated, userController.renderEditForm);
router.put('/:id', ensureAuthenticated, userController.updateUser);
router.delete('/:id', ensureAuthenticated, userController.deleteUser);

module.exports = router;