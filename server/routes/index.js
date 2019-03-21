var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.json({
        success: true
    })
});

module.exports = router;