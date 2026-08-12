var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const { ensureGuest } = require('../middleware/authMiddleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    isAuthenticated: Boolean(req.session && req.session.user),
    currentUser: req.session ? req.session.user || null : null,
  });
});

router.get('/login', ensureGuest, authController.renderLoginForm);
router.post('/login', ensureGuest, authController.login);
router.post('/logout', authController.logout);

module.exports = router;
