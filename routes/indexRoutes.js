const express = require('express');
const router = express.Router();

// Rota principal
router.get('/', (req, res) => {
    res.render('index', { 
        title: 'Create Read Update Delete System'
    });
});

module.exports = router;