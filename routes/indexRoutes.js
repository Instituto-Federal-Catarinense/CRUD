var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    isAuthenticated: Boolean(req.session && req.session.user),
    currentUser: req.session ? req.session.user || null : null,
  });
});

module.exports = router;
