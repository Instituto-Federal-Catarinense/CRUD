const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.usuario && req.usuario.role === 'admin') {
    return res.render('index-admin', { title: 'Express' });
  }
  res.render('index-user', { title: 'Express' });
});

module.exports = router;