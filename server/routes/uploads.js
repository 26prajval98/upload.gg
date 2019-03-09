var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var encryptor = require('file-encryptor');
var oid = require('mongoose').Types.ObjectId;
var File = require('../models/files');

var authenticate = require('../authenticate');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        File.create({
            name: file.filename,
            owner: req.user._id
        })
            .then(file => {
                console.log(file.name);
                cb(null, "abcd")
            })
            .catch(err => {
                throw err;
            })
    }
})

var encrypt = (file) => {
    var fileKey = file.filename + '.key';
    var encryptedFile = file.filename + '.dat';
    var key = new oid();
    fs.writeFile(fileKey, key);
    encryptor.encryptFile(file, encryptedFile, key, (err) => fs.unlink(file));
}


// var imageFileFilter = (req, file, cb)=>{
//     return cb(null, true);
// };

var upload = multer({ storage: storage });


router.post('/', authenticate.verifyUser, upload.single('file'), (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json({ success: true });
})

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/images/userPH.png'));
})

router.get('/:id', (req, res, next) => {
    if (fs.existsSync(path.join(__dirname, '../public/images', req.params.id))) {
        res.sendFile(path.join(__dirname, '../public/images', req.params.id));
    }
    else {
        res.sendFile(path.join(__dirname, '../public/images/userPH.png'));
    }
})

module.exports = router;