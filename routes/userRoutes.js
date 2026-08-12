const express = require('express');
const userController = require('../controllers/userController');
const { requireLogin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers);
router.get('/new', requireLogin, userController.renderCreateForm);
router.post('/', requireLogin, userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/:id/edit', requireLogin, userController.renderEditForm);
router.put('/:id', requireLogin, userController.updateUser);
router.delete('/:id', requireLogin, userController.deleteUser);

module.exports = router;