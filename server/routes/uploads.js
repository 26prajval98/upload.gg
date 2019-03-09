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
            name: file.originalname,
            owner: req.user._id
        })
            .then(ft => {
                cb(null, ft._id.toString())
            })
            .catch(err => {
                throw err;
            })
    }
})

var encrypt = (file) => {
    var fileKey = path.join(__dirname, '../public/files/', file.filename + '.key');
    var fn = path.join(__dirname, '../public/files/', file.filename);
    var encryptedFile = path.join(__dirname, '../public/files/', file.filename + '.dat');
    var key = new oid().toString();

    fs.writeFileSync(fileKey, key)
    encryptor.encryptFile(fn, encryptedFile, key, (err) => fs.unlink(fn))
}


var FileFilter = (req, file, cb) => {
    return cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: FileFilter });


router.post('/', authenticate.verifyUser, upload.single('file'), (req, res, next) => {
    encrypt(req.file);
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json({ success: true });
})

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/files/userPH.png'));
})

router.get('/:id', (req, res, next) => {
    if (fs.existsSync(path.join(__dirname, '../public/files', req.params.id))) {
        res.sendFile(path.join(__dirname, '../public/files', req.params.id));
    }
    else {
        res.sendFile(path.join(__dirname, '../public/files/userPH.png'));
    }
})

module.exports = router;