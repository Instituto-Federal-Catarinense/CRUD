const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/new', postController.renderCreateForm);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.get('/:id/edit', postController.renderEditForm);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;