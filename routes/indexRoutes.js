var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET sobre page. */
router.get('/sobre', function(req, res, next) {
  res.render('sobre', { titulo: 'Sobre o Sistema' });
});

module.exports = router;
