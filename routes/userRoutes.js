const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/middlewares/authMiddleware');
const adminMiddleware = require('../middleware/middlewares/adminMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers);
router.get('/new', userController.renderCreateForm);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/:id/edit', userController.renderEditForm);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
