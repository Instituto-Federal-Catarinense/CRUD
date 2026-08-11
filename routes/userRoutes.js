const express = require('express');
const userController = require('../controllers/userController');
const { ensureAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', ensureAdmin, userController.getAllUsers);
router.get('/search', ensureAdmin, userController.searchUsers);
router.get('/new', userController.renderCreateForm);
router.post('/', userController.createUser);
router.get('/:id', ensureAdmin, userController.getUserById);
router.get('/:id/edit', ensureAdmin, userController.renderEditForm);
router.put('/:id', ensureAdmin, userController.updateUser);
router.delete('/:id', ensureAdmin, userController.deleteUser);

module.exports = router;