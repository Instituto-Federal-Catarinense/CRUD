const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  res.render('index', { title: 'Express', user: req.session.user });
});

module.exports = router;
