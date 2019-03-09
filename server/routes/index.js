var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/',(req, res, next)=> {
    console.log(req.user)
    res.sendFile(path.join(__dirname, '../','index.html'));
});

module.exports = router;