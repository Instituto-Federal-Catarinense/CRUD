const express = require('express');
const quizController = require('../controllers/quizController');
const router = express.Router();

router.get('/', quizController.getAllquiz);
router.get('/new', quizController.renderCreateForm);
router.post('/', quizController.createquiz);
router.get('/:id', quizController.getquizById);
router.get('/:id/edit', quizController.renderEditForm);
router.put('/:id', quizController.updatequiz);
router.delete('/:id', quizController.deletequiz);

module.exports = router;
